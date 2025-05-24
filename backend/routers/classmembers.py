from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database
from schemas import *
from crud import *
from sqlalchemy.exc import IntegrityError

router = APIRouter(prefix="/class-members", tags=["Class Members"])

@router.post("/", response_model=ClassMemberReadSchema)
def add_user_to_class(membership: ClassMemberCreateSchema, db: Session = Depends(database.get_db)):
    try:
        return crud.add_user_to_class(db, membership)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="El usuario ya se encuentra en esta clase")

@router.get("/by-subject/{subject_id}", response_model=list[ClassMemberReadSchema])
def list_members_by_subject(subject_id: int, db: Session = Depends(database.get_db)):
    return crud.get_class_members(db, subject_id)
