from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Enterprise Logistics & Inventory System"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./enterprise_ops.db"
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:8080",
        "*"
    ]

    class Config:
        case_sensitive = True

settings = Settings()
