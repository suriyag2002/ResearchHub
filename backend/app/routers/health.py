from fastapi import APIRouter
from app.core.config import settings

router = APIRouter(tags=["health"])

@router.get("/health")
def health():
    return {
        "status": "ok",
        "service": settings.app_name,
        "env": settings.app_env,
        "storage_provider": settings.storage_provider,
        "ai_provider": settings.ai_provider,
    }
