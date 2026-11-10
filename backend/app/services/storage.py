"""Storage abstraction. AWS S3 integration is intentionally deferred.
Implement S3 presign/upload/download here later without changing API contracts."""

from app.core.config import settings

class StorageService:
    def provider(self) -> str:
        return settings.storage_provider

    def can_upload(self) -> bool:
        return settings.storage_provider == "aws" and bool(settings.s3_bucket)

    def presign_upload(self, *, key: str, content_type: str):
        if not self.can_upload():
            return {"enabled": False, "message": "Storage provider not configured. AWS S3 integration deferred."}
        # TODO: boto3 generate_presigned_post/url
        raise NotImplementedError

storage = StorageService()
