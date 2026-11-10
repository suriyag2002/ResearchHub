from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    app_name: str = "ResearchHub API"
    app_env: str = "development"
    cors_origins: str = "http://localhost:5173"

    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""

    storage_provider: str = "disabled"  # aws deferred
    s3_bucket: str = ""
    s3_region: str = ""
    max_upload_mb: int = 25

    ai_provider: str = "ollama"
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.1"
    embedding_model: str = "bge-m3"
    qdrant_url: str = "http://localhost:6333"
    qdrant_collection: str = "researchhub_chunks"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origin_list(self) -> List[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

settings = Settings()
