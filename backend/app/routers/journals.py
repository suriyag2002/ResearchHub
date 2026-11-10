from fastapi import APIRouter

router = APIRouter(prefix="/journals", tags=["journals"])

@router.get("")
def list_journals():
    return {"items": []}

@router.get("/{slug}")
def get_journal(slug: str):
    return {"slug": slug, "journal": None, "volumes": [], "issues": []}
