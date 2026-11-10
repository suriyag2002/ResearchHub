from fastapi import APIRouter

router = APIRouter(prefix="/subjects", tags=["subjects"])

@router.get("")
def list_subjects():
    # Should be loaded from Supabase `subjects` table (dynamic). Empty until connected.
    return {"items": [], "message": "Connect Supabase to load subjects from database."}
