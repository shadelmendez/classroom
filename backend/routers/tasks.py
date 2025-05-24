from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import database
from schemas import *
from crud import *

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/", response_model=TaskSchemas)
def create_task(task: TaskCreateSchemas, db: Session = Depends(database.get_db)):
    return crud_create_task(db, task)


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(database.get_db)):
    deleted = crud_delete_task(db, task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"message": "Tarea eliminada correctamente"}


@router.get("/by-student/{student_id}", response_model=List[TaskSchemas])
def get_tasks_for_student(student_id: int, db: Session = Depends(database.get_db)):
    student = db.query(AuthUser).filter(AuthUser.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")
    return student.assigned_tasks


@router.get("/student/{student_id}/pending", response_model=List[TaskSchemas])
def get_ungraded_tasks(student_id: int, db: Session = Depends(database.get_db)):
    tasks = (
        db.query(Task)
        .join(StudentTask, Task.id == StudentTask.task_id)
        .filter(
            StudentTask.student_id == student_id,
            Task.is_scored == False,
        )
        .all()
    )
    return tasks


@router.get("/")
def get_tasks(db: Session = Depends(database.get_db)):
    return crud_get_tasks(db)
