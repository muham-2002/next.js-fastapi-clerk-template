from fastapi import APIRouter, Depends
from core.clerk import get_clerk_payload

router = APIRouter()

@router.get("/public")
async def public():
    return {"message": "This is a public endpoint!"}

@router.get("/private")
async def private(clerk_payload: dict = Depends(get_clerk_payload)):
    return {"message": "This is a private endpoint!", "clerk_payload": clerk_payload}

@router.get("/greet")
async def greet_user(clerk_payload: dict = Depends(get_clerk_payload)):
    user_id = clerk_payload.get("sub")
    first_name = clerk_payload.get("first_name")
    greeting_name = first_name if first_name else f"User {user_id}"
    return {"message": f"Hello, {greeting_name}! Your JWT was successfully verified."}