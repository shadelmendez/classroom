from sqlalchemy.orm import Session
import models, schemas

def create_activity(db: Session, activity: schemas.activity.ActivityCreate):
    db_activity = models.activity.Activity(**activity.dict())
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

def get_activities(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.activity.Activity).offset(skip).limit(limit).all()

def get_activity(db: Session, activity_id: int):
    return db.query(models.activity.Activity).filter(models.activity.Activity.id == activity_id).first()

def delete_activity(db: Session, activity_id: int):
    db_activity = get_activity(db, activity_id)
    if db_activity:
        db.delete(db_activity)
        db.commit()
    return db_activity
