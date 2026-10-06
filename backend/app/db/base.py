from datetime import datetime, timezone
import uuid
from sqlalchemy import Column, String, DateTime
from app.core.database import Base

def utc_now():
    return datetime.now(timezone.utc)

class TimestampMixin:
    created_at = Column(DateTime(timezone=True), default=utc_now, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now, nullable=False)

def generate_uuid() -> str:
    return str(uuid.uuid4())
