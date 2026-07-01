"""
Backend API tests for AirSync AI (Node/Express backend proxied via FastAPI shim).
Covers: auth (login), roles, live vehicle data, and general API stability.
"""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
ADMIN_EMAIL = "admin@airsyncai.com"
ADMIN_PASSWORD = "Admin@AirSync2026"


@pytest.fixture(scope="module")
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture(scope="module")
def auth_token(api_client):
    resp = api_client.post(f"{BASE_URL}/api/login", json={
        "username": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD,
    })
    if resp.status_code != 200:
        pytest.skip("Login failed - skipping authenticated tests")
    return resp.json()["data"]["token"]


@pytest.fixture(scope="module")
def authenticated_client(api_client, auth_token):
    api_client.headers.update({"Authorization": f"Bearer {auth_token}"})
    return api_client


class TestAuthLogin:
    def test_login_success_valid_credentials(self, api_client):
        resp = api_client.post(f"{BASE_URL}/api/login", json={
            "username": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD,
        })
        assert resp.status_code == 200
        data = resp.json()["data"]
        assert data["email"] == ADMIN_EMAIL
        assert data["roles"] == "Admin"
        assert isinstance(data["token"], str) and len(data["token"]) > 20

    def test_login_invalid_password(self, api_client):
        resp = api_client.post(f"{BASE_URL}/api/login", json={
            "username": ADMIN_EMAIL,
            "password": "WrongPassword123",
        })
        assert resp.status_code == 401
        assert "message" in resp.json()

    def test_login_multiple_attempts_still_works(self, api_client):
        """Verify repeated login attempts don't break subsequent valid login (no crash)."""
        for _ in range(3):
            r = api_client.post(f"{BASE_URL}/api/login", json={
                "username": ADMIN_EMAIL,
                "password": ADMIN_PASSWORD,
            })
            assert r.status_code == 200
            time.sleep(0.3)

    def test_login_username_alias_admin(self, api_client):
        resp = api_client.post(f"{BASE_URL}/api/login", json={
            "username": "admin",
            "password": ADMIN_PASSWORD,
        })
        assert resp.status_code == 200


class TestRolesAndLive:
    def test_roles_by_user_id(self, authenticated_client):
        resp = authenticated_client.get(f"{BASE_URL}/api/roles/user/1")
        assert resp.status_code == 200
        data = resp.json()
        assert "roles" in data
        assert len(data["roles"]) > 0
        assert "tabs_access" in data["roles"][0]

    def test_live_vehicles_post(self, authenticated_client):
        resp = authenticated_client.post(f"{BASE_URL}/api/live/1", json={})
        assert resp.status_code == 200
        vehicles = resp.json()["message"]
        assert isinstance(vehicles, list)
        assert len(vehicles) == 8
        vehicle_numbers = {v["vehicleNumber"] for v in vehicles}
        assert vehicle_numbers == {f"AS-10{i}" for i in range(1, 9)}
        for v in vehicles:
            assert "lat" in v and "lng" in v
            assert "status" in v


class TestBackendStability:
    def test_backend_stays_up_multiple_requests(self, authenticated_client):
        """Hit several endpoints repeatedly over a short window to check for crash-loop."""
        for i in range(5):
            r1 = authenticated_client.get(f"{BASE_URL}/api/roles/user/1")
            r2 = authenticated_client.post(f"{BASE_URL}/api/live/1", json={})
            assert r1.status_code == 200
            assert r2.status_code == 200
            time.sleep(1)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
