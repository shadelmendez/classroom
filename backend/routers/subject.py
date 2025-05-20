from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas, database

router = APIRouter(prefix="/subjects", tags=["subjects"])

@router.post("/", response_model=schemas.subject.Subject)
def create_subject(subject: schemas.subject.SubjectCreate, db: Session = Depends(database.get_db)):
    return crud.create_subject(db, subject)

@router.get("/", response_model=list[schemas.subject.Subject])
def read_subjects(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return crud.get_subjects(db, skip, limit)

@router.get("/{subject_id}", response_model=schemas.subject.Subject)
def read_subject(subject_id: int, db: Session = Depends(database.get_db)):
    db_subject = crud.get_subject(db, subject_id)
    if db_subject is None:
        raise HTTPException(status_code=404, detail="Subject not found")
    return db_subject

@router.delete("/{subject_id}")
def delete_subject(subject_id: int, db: Session = Depends(database.get_db)):
    return crud.delete_subject(db, subject_id)
