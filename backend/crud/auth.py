from sqlalchemy.orm import Session
from models import AuthUser
from schemas import *
from fastapi import (
    HTTPException,
)
import bcrypt
from collections import OrderedDict
from cryptography.fernet import Fernet
from dotenv import load_dotenv
import os
import logging

load_dotenv()

# Create a cipher suite
cipher_suite = Fernet(os.getenv("SECRET_KEY"))


async def create_user(db: Session, user: AuthUserSchema):
    user.password = cipher_suite.encrypt(user.password.encode("utf-8")).decode()
    print(f"user {user}")
    try:
        user_dict = OrderedDict(user)

        user_record = AuthUser(**user_dict)

        db.add(user_record)
        db.commit()
        db.refresh(user_record)
        user_record.password = cipher_suite.decrypt(user_record.password).decode()
        return user_record

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error: {e}")


async def login(db: Session, user: Login):
    email = user.email
    # is_student = user.is_student

    user_record = db.query(AuthUser).filter(AuthUser.email == email).first()

    if not user_record:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if not cipher_suite.decrypt(user_record.password).decode():
        raise HTTPException(status_code=401, detail="Clave incorrecta")
    return user_record


async def get_users(db: Session):
    user_record = db.query(AuthUser).all()
    return user_record


async def delete_user(db: Session, user_id: int):
    print(f"user_id {user_id}")
    logging.info(f"user_id {user_id}")
    user = db.query(AuthUser).filter(AuthUser.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(user)
    db.commit()
    return {"message": "Usuario eliminado"}
