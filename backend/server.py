from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import logging
from datetime import datetime, timezone, timedelta
from typing import Annotated, Optional, List

import bcrypt
import jwt
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field

# -----------------------------------------------------------------------------
# Config
# -----------------------------------------------------------------------------
JWT_ALGORITHM = "HS256"

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("bloommama")


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


# -----------------------------------------------------------------------------
# Auth helpers
# -----------------------------------------------------------------------------
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# -----------------------------------------------------------------------------
# Pydantic models
# -----------------------------------------------------------------------------
PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]


class LoginInput(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    email: EmailStr
    name: str
    role: str


class BookingCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=4, max_length=40)
    email: Optional[EmailStr] = None
    wechat: Optional[str] = Field(default=None, max_length=120)
    service: str = Field(min_length=1, max_length=80)
    package: Optional[str] = Field(default=None, max_length=40)
    preferred_date: Optional[str] = Field(default=None, max_length=40)
    preferred_time: Optional[str] = Field(default=None, max_length=40)
    suburb: Optional[str] = Field(default=None, max_length=120)
    postpartum_stage: Optional[str] = Field(default=None, max_length=120)
    notes: Optional[str] = Field(default=None, max_length=1500)


class BookingStatusUpdate(BaseModel):
    status: str  # pending | confirmed | completed | cancelled


class BookingOut(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: str
    name: str
    phone: str
    email: Optional[str] = None
    wechat: Optional[str] = None
    service: str
    package: Optional[str] = None
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    suburb: Optional[str] = None
    postpartum_stage: Optional[str] = None
    notes: Optional[str] = None
    status: str
    created_at: str


def booking_to_out(doc: dict) -> BookingOut:
    return BookingOut(
        id=str(doc["_id"]),
        name=doc.get("name", ""),
        phone=doc.get("phone", ""),
        email=doc.get("email"),
        wechat=doc.get("wechat"),
        service=doc.get("service", ""),
        package=doc.get("package"),
        preferred_date=doc.get("preferred_date"),
        preferred_time=doc.get("preferred_time"),
        suburb=doc.get("suburb"),
        postpartum_stage=doc.get("postpartum_stage"),
        notes=doc.get("notes"),
        status=doc.get("status", "pending"),
        created_at=doc.get("created_at", ""),
    )


# -----------------------------------------------------------------------------
# App + Router
# -----------------------------------------------------------------------------
app = FastAPI(title="Bloommama Postpartum Care API")
api = APIRouter(prefix="/api")


@api.get("/")
async def root():
    return {"name": "Bloommama API", "status": "ok"}


# ---- Auth ----
@api.post("/auth/login")
async def auth_login(payload: LoginInput, response: Response):
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(str(user["_id"]), email)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=12 * 3600,
        path="/",
    )
    return {
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "email": user["email"],
            "name": user.get("name", "Admin"),
            "role": user.get("role", "admin"),
        },
    }


@api.post("/auth/logout")
async def auth_logout(response: Response, user: dict = Depends(get_current_user)):
    response.delete_cookie("access_token", path="/")
    return {"ok": True}


@api.get("/auth/me", response_model=UserOut)
async def auth_me(user: dict = Depends(get_current_user)):
    return UserOut(
        id=user["_id"],
        email=user["email"],
        name=user.get("name", "Admin"),
        role=user.get("role", "admin"),
    )


# ---- Bookings ----
@api.post("/bookings", response_model=BookingOut)
async def create_booking(payload: BookingCreate):
    doc = payload.model_dump()
    doc["status"] = "pending"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.bookings.insert_one(doc)
    doc["_id"] = result.inserted_id
    return booking_to_out(doc)


@api.get("/bookings", response_model=List[BookingOut])
async def list_bookings(user: dict = Depends(get_current_user)):
    cursor = db.bookings.find().sort("created_at", -1)
    items = await cursor.to_list(1000)
    return [booking_to_out(d) for d in items]


@api.patch("/bookings/{booking_id}", response_model=BookingOut)
async def update_booking_status(
    booking_id: str,
    payload: BookingStatusUpdate,
    user: dict = Depends(get_current_user),
):
    if payload.status not in {"pending", "confirmed", "completed", "cancelled"}:
        raise HTTPException(status_code=400, detail="Invalid status")
    try:
        oid = ObjectId(booking_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid booking id")
    result = await db.bookings.find_one_and_update(
        {"_id": oid},
        {"$set": {"status": payload.status}},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Booking not found")
    # find_one_and_update with return_document=True returns updated when ReturnDocument.AFTER passed; motor default returns updated when True.
    doc = await db.bookings.find_one({"_id": oid})
    return booking_to_out(doc)


@api.delete("/bookings/{booking_id}")
async def delete_booking(booking_id: str, user: dict = Depends(get_current_user)):
    try:
        oid = ObjectId(booking_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid booking id")
    result = await db.bookings.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"ok": True}


app.include_router(api)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------------------------------------------------
# Startup
# -----------------------------------------------------------------------------
async def seed_admin():
    email = os.environ.get("ADMIN_EMAIL", "admin@bloommama.com").lower()
    password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": email})
    if not existing:
        await db.users.insert_one(
            {
                "email": email,
                "password_hash": hash_password(password),
                "name": "Bloommama Admin",
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
        )
        logger.info("Seeded admin user %s", email)
    elif not verify_password(password, existing.get("password_hash", "")):
        await db.users.update_one(
            {"email": email}, {"$set": {"password_hash": hash_password(password)}}
        )
        logger.info("Updated admin password for %s", email)


@app.on_event("startup")
async def on_startup():
    try:
        await db.users.create_index("email", unique=True)
        await db.bookings.create_index("created_at")
        await seed_admin()
    except Exception as e:
        logger.error("Startup error: %s", e)


@app.on_event("shutdown")
async def on_shutdown():
    client.close()
