from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas import GradeCreateSchemas, GradeSchemas
from crud import crud_create_grade, crud_get_grades_by_task
import database
from typing import List


router = APIRouter(prefix="/grades", tags=["grades"])


@router.post("/", response_model=GradeSchemas)
def create_grade(grade: GradeCreateSchemas, db: Session = Depends(database.get_db)):
    return crud_create_grade(db, grade)


@router.get("/task/{task_id}", response_model=List[GradeSchemas])
def get_grades_by_task(task_id: int, db: Session = Depends(database.get_db)):
    return crud_get_grades_by_task(db, task_id)
