from fastapi import APIRouter, Query

router = APIRouter(prefix="/publications", tags=["publications"])

@router.get("")
def list_publications(q: str | None = Query(default=None), page: int = 1, page_size: int = 20):
    # Public: only approved+published; authenticated: per policy. Backed by Supabase.
    return {"items": [], "total": 0, "page": page, "page_size": page_size, "query": q}

@router.get("/{paper_id}")
def get_publication(paper_id: str):
    return {"id": paper_id, "detail": None, "message": "Not found or not accessible. Connect database."}
