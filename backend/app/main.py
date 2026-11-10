from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import health, subjects, publications, journals, submissions, ai

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(subjects.router)
app.include_router(publications.router)
app.include_router(journals.router)
app.include_router(submissions.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"name": settings.app_name, "docs": "/docs", "note": "AWS S3 integration deferred; other modules scaffolded."}
