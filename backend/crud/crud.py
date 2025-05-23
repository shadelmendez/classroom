from sqlalchemy.orm import Session
from schemas import *
from models import *
from fastapi import HTTPException

from models import AuthUser
from schemas import *

# import bcrypt
from collections import OrderedDict
from cryptography.fernet import Fernet
from dotenv import load_dotenv
import os
import logging

load_dotenv()

# Create a cipher suite
cipher_suite = Fernet(os.getenv("SECRET_KEY"))


# region SUBJECTS
def crud_create_subject(db: Session, subject: SubjectCreateSchemas):
    existing = db.query(Subject).filter(Subject.name == subject.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="La clase ya existe")
    db_subject = Subject(**subject.dict())
    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)
    return db_subject


def crud_get_subjects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Subject).offset(skip).limit(limit).all()


def crud_get_subject(db: Session, subject_id: int):
    return db.query(Subject).filter(Subject.id == subject_id).first()


def crud_get_subject_by_name(db: Session, name: str):
    return db.query(Subject).filter(Subject.name == name).first()

def crud_get_subjects_by_educator_id(db: Session, educator_id: int, skip: int = 0, limit: int = 100):
    return db.query(Subject).filter(Subject.educator_id == educator_id).offset(skip).limit(limit).all()

def crud_delete_subject(db: Session, subject_id: int):
    subject = crud_get_subject(db, subject_id)
    if subject:
        db.delete(subject)
        db.commit()
    return subject


# endregion SUBJECTS


# region THEMES
def crud_create_theme(db: Session, theme: ThemeCreateSchemas):
    db_theme = Theme(**theme.dict())
    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return db_theme


# endregion THEMES


# region TASKS
def crud_create_task(db: Session, task_data: TaskCreateSchemas):
    db_task = Task(
        title=task_data.title,
        instructions=task_data.instructions,
        type=task_data.type,
        date=task_data.date,
        points=task_data.points,
        due_date=task_data.due_date,
        theme_id=task_data.theme_id,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    for opt in task_data.options:
        db_option = Option(
            text=opt.text,
            identifier=opt.identifier,
            is_correct=opt.is_correct,
            task_id=db_task.id,
        )
        db.add(db_option)

    db.commit()
    db.refresh(db_task)
    return db_task


def crud_delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        return None

    db.delete(task)
    db.commit()
    return task


# endregion TASKS


# region AUTH
async def crud_create_user(db: Session, user: AuthUserSchema):
    user.password = cipher_suite.encrypt(user.password.encode("utf-8")).decode()
    print(f"user {user}")
    try:
        user_dict = OrderedDict(user)

        user_record = AuthUser(**user_dict)

        db.add(user_record)
        db.commit()
        db.refresh(user_record)
        user_record.password = cipher_suite.decrypt(user_record.password).decode()
        return user_record

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error: {e}")


async def crud_login(db: Session, user: Login):
    email = user.email
    # is_student = user.is_student

    user_record = db.query(AuthUser).filter(AuthUser.email == email).first()

    if not user_record:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if not cipher_suite.decrypt(user_record.password).decode():
        raise HTTPException(status_code=401, detail="Clave incorrecta")
    return user_record


async def crud_get_users(db: Session):
    user_record = db.query(AuthUser).all()
    return user_record


async def crud_delete_user(db: Session, user_id: int):
    print(f"user_id {user_id}")
    logging.info(f"user_id {user_id}")
    user = db.query(AuthUser).filter(AuthUser.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(user)
    db.commit()
    return {"message": "Usuario eliminado"}


# endregion AUTH


# region ACTIVITY
def crud_create_activity(db: Session, activity: ActivityCreateSchemas):
    db_activity = Activity(**activity.dict())
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity


def crud_get_activities(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Activity).offset(skip).limit(limit).all()


def crud_get_activity(db: Session, activity_id: int):
    return db.query(Activity).filter(Activity.id == activity_id).first()

def crud_get_activity_by_subject_id(db: Session, subject_id: int):
    return db.query(Activity).filter(Activity.subject_id == subject_id).all()


def crud_delete_activity(db: Session, activity_id: int):
    db_activity = crud_get_activity(db, activity_id)
    if db_activity:
        db.delete(db_activity)
        db.commit()
    return db_activity


# endregion ACTIVITY
