# AirSync AI

Real-time fleet and airspace operations platform — live vehicle/drone tracking, geofencing, alerts, trip history and reporting, built on a Node/Express + MySQL backend with a React (Vite) frontend.

Made by Preeti Gupta

---

## Tech Stack

| Layer      | Technology                                              |
|------------|----------------------------------------------------------|
| Frontend   | React 19, TypeScript, Vite, Tailwind CSS, shadcn/radix-ui, Leaflet, Recharts |
| Backend    | Node.js, Express, TypeScript                              |
| Database   | MySQL (Drizzle ORM)                                       |
| Streaming  | Apache Kafka (GPS ping ingestion pipeline)                 |
| Auth       | JWT (bcrypt password hashing)                              |

---

## Architecture Notes

- The frontend talks to the backend at `<BACKEND_URL>/<route>` (e.g. `/login`, `/live/:userId`, `/roles/user/:userId`). All routes are defined in `backend/src/routes/*`.
- Role-based access control gates every page: a user's role (`role` table) is linked to allowed pages via `role_tabs`, and to allowed reports via `role_report`. If a user's role has no `role_tabs` rows, every page will 404 for them — make sure seeding runs in the correct order (tabs/report/usertype **before** the role is created).
- The Kafka pipeline (`GPSProducer` / `GPSConsumer`) ingests GPS pings from an external source configured via `API_URL`. If `API_URL` is not set, the producer simply idles (no crash) — you can still seed demo data directly into MySQL for local development (see `backend/scripts/seed_demo_fleet.py`).

---

## Prerequisites

- Node.js 18+
- MySQL 8 or MariaDB 10.6+
- Yarn
- Java 17+ and Apache Kafka (or Docker, to use the provided `docker-compose.yml` for Kafka + Zookeeper)

---

## 1. Backend Setup

```bash
cd backend
npm i --legacy-peer-deps
```

### Start Kafka (choose one)

**Option A — Docker Compose (simplest):**
```bash
docker-compose up -d
```

**Option B — Local Kafka (KRaft mode, no Docker):**
```bash
# download & extract Kafka, then:
bin/kafka-storage.sh format -t $(bin/kafka-storage.sh random-uuid) -c config/kraft/server.properties --standalone
bin/kafka-server-start.sh config/kraft/server.properties
```

### Start MySQL and create the database

```sql
CREATE DATABASE udaan_ai;
CREATE USER 'udaan_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON udaan_ai.* TO 'udaan_user'@'localhost';
```

Apply the schema:
```bash
mysql -u udaan_user -p udaan_ai < drizzle/0000_black_violations.sql
```

> Note: this schema has very wide tables. If you hit a `Row size too large` error, start MySQL with `--innodb-strict-mode=0`.

### Configure environment

Create `backend/.env`:
```env
PORT=8002
DATABASE_URL="mysql://udaan_user:your_password@localhost:3306/udaan_ai"
DB_HOST=localhost
DB_PORT=3306
DB_USER=udaan_user
DB_PASSWORD=your_password
DB_NAME=udaan_ai

JWT_SECRET="replace_with_a_long_random_string"

KAFKA_BROKERS=localhost:9092
KAFKA_TOPIC=api-data-topic

DEFAULT_ADMIN_USER=admin@airsyncai.com
DEFAULT_ADMIN_PASSWORD=Admin@AirSync2026

# Optional
API_URL=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=
```

### Run the backend

```bash
npm run dev
```

The API starts on `http://localhost:8002`. On first boot it seeds default lookup tables, an `Admin` role with full page/report access, and a default admin user.

---

## 2. Frontend Setup

```bash
cd frontend
npm i --legacy-peer-deps   # or: yarn
```

Create `frontend/.env`:
```env
VITE_BACKEND_URL=http://localhost:8002
```

Run:
```bash
yarn dev
```

The app starts on `http://localhost:5173` (default Vite port) or `http://localhost:3000` if configured via `--port`.

---

## 3. Seed Demo Fleet Data (optional, for a populated dashboard)

The `entity`/`gps_schema` tables are empty on a fresh install. To see live data on the dashboard/map:

```bash
python3 backend/scripts/seed_demo_fleet.py
```

This inserts 8 demo vehicles with GPS pings around Delhi, plus a "Main Fleet" group linking your admin user to them so `/live/:userId` returns data.

---

## 4. Default Login

| Field    | Value                     |
|----------|---------------------------|
| Email    | admin@airsyncai.com       |
| Username | admin                     |
| Password | Admin@AirSync2026          |

Change `DEFAULT_ADMIN_PASSWORD` in `.env` before first run if you want a different password (only applied on first seed).

---

## Folder Structure

```
backend/
  src/
    controller/     # business logic (auth, roles, live tracking, alarms, reports...)
    routes/         # Express route definitions
    db/             # Drizzle schema + connection
    kafka/          # GPS producer/consumer
    scripts/        # migration + seed scripts
  drizzle/          # SQL migrations

frontend/
  src/
    pages/          # top-level routed pages (Dashboard, Sign In, Live, Reports, ...)
    components/     # feature components grouped by domain (dashboard, live, geofence, manage...)
    context/        # Auth + Theme providers
    data/           # API call functions grouped by domain
```

---

## Troubleshooting

- **All pages 404 after login**: your user's role has no `role_tabs` rows. Re-run the seed (drop the `role` row and restart the backend, or manually insert `role_tabs`/`user_role` rows).
- **Backend keeps restarting**: check `KAFKA_BROKERS` is reachable, and that `API_URL` is either unset or points to a valid GPS data source.
- **Map/dashboard show 0 vehicles**: your user isn't linked to a vehicle group containing any entities — see `seed_demo_fleet.py` for the group/user_group/group_entity setup required.
