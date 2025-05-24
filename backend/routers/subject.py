from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database
from schemas import *
from crud import *

router = APIRouter(prefix="/subjects", tags=["subjects"])


@router.post("/", response_model=SubjectSchemas)
def create_subject(
    subject: SubjectCreateSchemas, db: Session = Depends(database.get_db)
):
    return crud_create_subject(db, subject)


@router.get("/", response_model=list[SubjectSchemas])
def read_subjects(
    skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)
):
    return crud_get_subjects(db, skip, limit)


@router.get("/{subject_id}", response_model=SubjectSchemas)
def read_subject(subject_id: int, db: Session = Depends(database.get_db)):
    db_subject = crud_get_subject(db, subject_id)
    if not db_subject:
        raise HTTPException(status_code=404, detail="Clase no encontrada")
    return db_subject


@router.delete("/{subject_id}")
def delete_subject(subject_id: int, db: Session = Depends(database.get_db)):
    return crud_delete_subject(db, subject_id)


@router.get("/by-name/{name}", response_model=SubjectSchemas)
def get_subject_by_name(name: str, db: Session = Depends(database.get_db)):
    return crud_get_subject_by_name(db, name)

@router.get("/by-educator/{educator_id}", response_model=list[SubjectSchemas])
def get_subjects_by_educator_id(educator_id: int, db: Session = Depends(database.get_db)):
    return crud_get_subjects_by_educator_id(db, educator_id)



@router.post("/themes/", response_model=ThemeSchemas)
def create_theme(theme: ThemeCreateSchemas, db: Session = Depends(database.get_db)):
    return crud_create_theme(db, theme)


@router.post("/tasks/", response_model=TaskSchemas)
def create_task(task: TaskCreateSchemas, db: Session = Depends(database.get_db)):
    return crud_create_task(db, task)
