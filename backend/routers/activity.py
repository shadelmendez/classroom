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


@router.get("/read-by-subject-id/{subject_id}", response_model=list[ActivitySchemas])
def read_activity_by_subject_id(subject_id: int, db: Session = Depends(database.get_db)):
    db_activities = crud_get_activity_by_subject_id(db, subject_id)
    if not db_activities:
        raise HTTPException(status_code=404, detail="No activities found for the given subject ID")
    return db_activities


@router.delete("/{activity_id}")
def delete_activity(activity_id: int, db: Session = Depends(database.get_db)):
    return crud_delete_activity(db, activity_id)
