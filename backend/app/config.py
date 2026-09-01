import os
from dotenv import load_dotenv
load_dotenv()  # Load .env file from backend directory
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Swaraj Asia Technologies API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "swaraj_asia_super_secret_jwt_key_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Defaults to SQLite for instant local out-of-the-box execution, or loads MySQL from env
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./swaraj_asia.db")

    # Admin registration — only this email domain is allowed
    ALLOWED_ADMIN_EMAIL_DOMAIN: str = os.getenv("ALLOWED_ADMIN_EMAIL_DOMAIN", "swarajasia.com")
    
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "*"
    ]

    class Config:
        case_sensitive = True

settings = Settings()
