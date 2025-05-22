from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import database
from schemas import *
from crud import *

router = APIRouter(prefix="/themes", tags=["themes"])


@router.post("/", response_model=ThemeSchemas)
def create_theme(theme: ThemeCreateSchemas, db: Session = Depends(database.get_db)):
    return crud_create_theme(db, theme)


# @router.get("/subject/{subject_id}", response_model=list[ThemeBaseSchemas])
# def get_themes(subject_id: int, db: Session = Depends(database.get_db)):
#     return crud_get_themes_by_subject(db, subject_id)
