"""Backend API tests for Bloommama Postpartum Care.

Credentials are loaded from environment variables (TEST_ADMIN_EMAIL /
TEST_ADMIN_PASSWORD) and fall back to the values in /app/backend/.env.
Tests skip cleanly if no credentials are available.
"""
import os
import pytest
import requests
from pathlib import Path
from dotenv import dotenv_values

BASE_URL = os.environ.get(
    "REACT_APP_BACKEND_URL", "http://localhost:8001"
).rstrip("/")
API = f"{BASE_URL}/api"

_env_file = Path(__file__).resolve().parents[1] / ".env"
_env = dotenv_values(_env_file) if _env_file.exists() else {}

ADMIN_EMAIL = os.environ.get("TEST_ADMIN_EMAIL") or _env.get("ADMIN_EMAIL")
ADMIN_PASSWORD = os.environ.get("TEST_ADMIN_PASSWORD") or _env.get("ADMIN_PASSWORD")


# --- fixtures ---
@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def auth_token(session):
    if not ADMIN_EMAIL or not ADMIN_PASSWORD:
        pytest.skip("Admin credentials not configured in env")
    r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    if r.status_code != 200:
        pytest.skip(f"Admin login failed: {r.status_code} {r.text}")
    return r.json()["token"]


@pytest.fixture
def auth_headers(auth_token):
    return {"Authorization": f"Bearer {auth_token}", "Content-Type": "application/json"}


# --- Health ---
class TestHealth:
    def test_root_ok(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "name" in data


# --- Auth ---
class TestAuth:
    def test_login_success(self, session):
        r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        data = r.json()
        assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 0
        assert "user" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"
        assert "id" in data["user"]

    def test_login_wrong_password(self, session):
        r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong-pass-xyz"})
        assert r.status_code == 401

    def test_login_unknown_user(self, session):
        r = session.post(f"{API}/auth/login", json={"email": "nobody@example.com", "password": "whatever"})
        assert r.status_code == 401

    def test_me_no_token(self, session):
        r = requests.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_me_invalid_token(self):
        r = requests.get(f"{API}/auth/me", headers={"Authorization": "Bearer not-a-real-token"})
        assert r.status_code == 401

    def test_me_with_token(self, auth_headers):
        r = requests.get(f"{API}/auth/me", headers=auth_headers)
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert "id" in data


# --- Bookings ---
class TestBookings:
    created_id = None

    def test_create_booking_public(self, session):
        payload = {
            "name": "TEST_Alice",
            "phone": "0451000111",
            "service": "milk-in",
            "package": "single",
            "suburb": "Perth",
        }
        r = session.post(f"{API}/bookings", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["name"] == "TEST_Alice"
        assert d["phone"] == "0451000111"
        assert d["service"] == "milk-in"
        assert d["status"] == "pending"
        assert d["created_at"]
        assert "id" in d and len(d["id"]) > 0
        TestBookings.created_id = d["id"]

    def test_create_booking_missing_required(self, session):
        r = session.post(f"{API}/bookings", json={"name": "x"})
        assert r.status_code == 422

    def test_list_bookings_requires_auth(self):
        r = requests.get(f"{API}/bookings")
        assert r.status_code == 401

    def test_list_bookings_authed_sorted_desc(self, auth_headers):
        r = requests.get(f"{API}/bookings", headers=auth_headers)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert any(b["id"] == TestBookings.created_id for b in items), "Newly created booking missing"
        # sort desc by created_at
        if len(items) >= 2:
            assert items[0]["created_at"] >= items[1]["created_at"]

    def test_patch_invalid_status(self, auth_headers):
        assert TestBookings.created_id
        r = requests.patch(
            f"{API}/bookings/{TestBookings.created_id}",
            headers=auth_headers,
            json={"status": "bogus"},
        )
        assert r.status_code == 400

    def test_patch_valid_status_persists(self, auth_headers):
        assert TestBookings.created_id
        r = requests.patch(
            f"{API}/bookings/{TestBookings.created_id}",
            headers=auth_headers,
            json={"status": "confirmed"},
        )
        assert r.status_code == 200
        assert r.json()["status"] == "confirmed"
        # verify persistence via list
        lst = requests.get(f"{API}/bookings", headers=auth_headers).json()
        match = [b for b in lst if b["id"] == TestBookings.created_id]
        assert match and match[0]["status"] == "confirmed"

    def test_patch_nonexistent(self, auth_headers):
        # valid ObjectId format but not present
        r = requests.patch(
            f"{API}/bookings/507f1f77bcf86cd799439011",
            headers=auth_headers,
            json={"status": "completed"},
        )
        assert r.status_code == 404

    def test_delete_requires_auth(self):
        assert TestBookings.created_id
        r = requests.delete(f"{API}/bookings/{TestBookings.created_id}")
        assert r.status_code == 401

    def test_delete_nonexistent(self, auth_headers):
        r = requests.delete(
            f"{API}/bookings/507f1f77bcf86cd799439011",
            headers=auth_headers,
        )
        assert r.status_code == 404

    def test_delete_success(self, auth_headers):
        assert TestBookings.created_id
        r = requests.delete(
            f"{API}/bookings/{TestBookings.created_id}",
            headers=auth_headers,
        )
        assert r.status_code == 200
        # verify gone
        lst = requests.get(f"{API}/bookings", headers=auth_headers).json()
        assert not any(b["id"] == TestBookings.created_id for b in lst)
