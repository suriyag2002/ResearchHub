from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.core.config import settings

router = APIRouter(prefix="/ai", tags=["ai"])

@router.post("/chat")
async def chat(payload: dict, user=Depends(get_current_user)):
    query = payload.get("query", "")
    return {
        "answer": "AI/RAG backend not fully configured. When enabled, responses will be grounded in approved publications with citations/page references.",
        "citations": [],
        "provider": settings.ai_provider,
        "query": query,
    }

@router.get("/conversations")
async def conversations(user=Depends(get_current_user)):
    return {"items": []}
