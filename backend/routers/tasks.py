from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import database
from schemas import *
from crud import *

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/", response_model=TaskSchemas)
def create_task(task: TaskCreateSchemas, db: Session = Depends(database.get_db)):
    return crud_create_task(db, task)


# @router.get("/theme/{theme_id}", response_model=list[TaskSchemas])
# def get_tasks(theme_id: int, db: Session = Depends(database.get_db)):
#     return crud_get_tasks_by_theme(db, theme_id)


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(database.get_db)):
    deleted = crud_delete_task(db, task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"message": "Tarea eliminada correctamente"}

@router.get("/calendar", response_model=list[TaskForCalendar])
def get_tasks_for_calendar(db: Session = Depends(database.get_db)):
    tasks = db.query(Task.title, Task.due_date).all()
    return [TaskForCalendar(title=t[0], due_date=t[1]) for t in tasks]