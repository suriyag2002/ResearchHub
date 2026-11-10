from fastapi import APIRouter, Depends, HTTPException
from app.core.auth import get_current_user

router = APIRouter(prefix="/submissions", tags=["submissions"])

@router.get("/me")
async def my_submissions(user=Depends(get_current_user)):
    return {"items": [], "note": "Returns submissions owned by the authenticated researcher."}

@router.post("")
async def create_submission(payload: dict, user=Depends(get_current_user)):
    # Enforce researcher/admin roles in real implementation; persist to Supabase.
    if payload.get("role_override"):
        raise HTTPException(status_code=403, detail="Role assignment is not permitted")
    return {"status": "draft", "message": "Submission scaffold created (not persisted). AWS S3 upload deferred.", "payload_keys": list(payload.keys())}
