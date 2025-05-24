from fastapi import APIRouter, Depends
from schemas import *
from sqlalchemy.orm import Session
import database
from crud import *


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
async def create_user(user: AuthUserSchema, db: Session = Depends(database.get_db)):
    return await crud_create_user(db, user)


@router.post("/login")
async def login(user: Login, db: Session = Depends(database.get_db)):
    return await crud_login(db, user)


@router.get("/users")
async def get_users(db: Session = Depends(database.get_db)):
    return await crud_get_users(db)


@router.delete("/user/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(database.get_db)):
    return await crud_delete_user(db, user_id)
