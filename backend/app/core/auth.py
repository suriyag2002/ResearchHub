from fastapi import Header, HTTPException
from typing import Optional

# NOTE: Replace with Supabase JWT verification in integration phase.
# This scaffold enforces presence/shape expectations only when configured.

async def get_current_user(authorization: Optional[str] = Header(default=None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authentication required")
    if not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split(" ", 1)[1]
    # TODO: verify token with Supabase and load profile/role from DB
    return {"sub": "unknown", "token_present": bool(token), "role": "registered_user"}

async def require_roles(user, roles: list[str]):
    if user.get("role") not in roles:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    return user
