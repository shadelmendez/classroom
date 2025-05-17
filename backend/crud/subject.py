from sqlalchemy.orm import Session
import models, schemas

def create_subject(db: Session, subject: schemas.subject.SubjectCreate):
    db_subject = models.subject.Subject(**subject.dict())
    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)
    return db_subject

def get_subjects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.subject.Subject).offset(skip).limit(limit).all()

def get_subject(db: Session, subject_id: int):
    return db.query(models.subject.Subject).filter(models.subject.Subject.id == subject_id).first()

def delete_subject(db: Session, subject_id: int):
    db_subject = get_subject(db, subject_id)
    if db_subject:
        db.delete(db_subject)
        db.commit()
    return db_subject
