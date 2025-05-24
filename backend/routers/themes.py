from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import database
from schemas import *
from crud import *

router = APIRouter(prefix="/themes", tags=["themes"])


@router.post("/", response_model=ThemeSchemas)
def create_theme(theme: ThemeCreateSchemas, db: Session = Depends(database.get_db)):
    return crud_create_theme(db, theme)
