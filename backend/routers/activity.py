from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas, database

router = APIRouter(prefix="/activities", tags=["activities"])

@router.post("/", response_model=schemas.activity.Activity)
def create_activity(activity: schemas.activity.ActivityCreate, db: Session = Depends(database.get_db)):
    return crud.activity.create_activity(db, activity)

@router.get("/", response_model=list[schemas.activity.Activity])
def read_activities(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return crud.activity.get_activities(db, skip, limit)

@router.get("/{activity_id}", response_model=schemas.activity.Activity)
def read_activity(activity_id: int, db: Session = Depends(database.get_db)):
    db_activity = crud.activity.get_activity(db, activity_id)
    if db_activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")
    return db_activity

@router.delete("/{activity_id}")
def delete_activity(activity_id: int, db: Session = Depends(database.get_db)):
    return crud.activity.delete_activity(db, activity_id)
