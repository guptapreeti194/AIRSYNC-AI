import os
import subprocess
import atexit
from pathlib import Path

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, Request, Response
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

NODE_PORT = os.environ.get("NODE_BACKEND_PORT", "8002")
NODE_BASE_URL = f"http://127.0.0.1:{NODE_PORT}"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

client = httpx.AsyncClient(base_url=NODE_BASE_URL, timeout=30.0)

HOP_BY_HOP_HEADERS = {
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailers", "transfer-encoding", "upgrade", "content-length", "host",
}


@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def proxy_to_express(path: str, request: Request):
    body = await request.body()
    forward_headers = {
        k: v for k, v in request.headers.items() if k.lower() not in HOP_BY_HOP_HEADERS
    }
    target_path = f"/{path}"
    upstream = await client.request(
        request.method,
        target_path,
        params=request.query_params,
        headers=forward_headers,
        content=body,
    )
    response_headers = {
        k: v for k, v in upstream.headers.items() if k.lower() not in HOP_BY_HOP_HEADERS
    }
    return Response(content=upstream.content, status_code=upstream.status_code, headers=response_headers)


@app.get("/api")
async def api_root():
    return {"message": "AirSync AI API Gateway"}
