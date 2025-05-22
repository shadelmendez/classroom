from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database
from schemas import *
from crud import *

router = APIRouter(prefix="/activities", tags=["activities"])


@router.post("/", response_model=ActivitySchemas)
def create_activity(
    activity: ActivityCreateSchemas, db: Session = Depends(database.get_db)
):
    return crud_create_activity(db, activity)


@router.get("/", response_model=list[ActivitySchemas])
def read_activities(
    skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)
):
    return crud_get_activities(db, skip, limit)


@router.get("/{activity_id}", response_model=ActivitySchemas)
def read_activity(activity_id: int, db: Session = Depends(database.get_db)):
    db_activity = crud_get_activity(db, activity_id)
    if db_activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")
    return db_activity


@router.delete("/{activity_id}")
def delete_activity(activity_id: int, db: Session = Depends(database.get_db)):
    return crud_delete_activity(db, activity_id)
