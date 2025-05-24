from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime,
    Boolean,
    Table,
)
from datetime import datetime


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    comment = Column(String)
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    subject = relationship("Subject", back_populates="activities")
    user = relationship("AuthUser")


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    icon_color = Column(String)
    section = Column(String)
    educator_id = Column(Integer, ForeignKey("users.id"))
    educator = relationship("AuthUser")
    activities = relationship(
        "Activity", back_populates="subject", cascade="all, delete"
    )


class AuthUser(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    password = Column(String)
    is_student = Column(Boolean, default=False)

    student_tasks = relationship(
        "StudentTask",
        back_populates="student",
        cascade="all, delete-orphan",
        overlaps="assigned_tasks",
    )


class Theme(Base):
    __tablename__ = "themes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"))

    subject = relationship("Subject", back_populates="themes")
    tasks = relationship("Task", back_populates="theme", cascade="all, delete")


# Tabla intermedia para tareas asignadas (por el momento pues)
task_student_association = Table(
    "task_student_association",
    Base.metadata,
    Column("task_id", Integer, ForeignKey("tasks.id")),
    Column("student_id", Integer, ForeignKey("users.id")),
)


class StudentTask(Base):
    __tablename__ = "student_tasks"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    task_id = Column(Integer, ForeignKey("tasks.id"))
    score = Column(Integer, nullable=True)
    task = relationship("Task", back_populates="student_tasks")
    student = relationship("AuthUser", back_populates="student_tasks")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    instructions = Column(Text)
    type = Column(String, nullable=False)
    date = Column(String)
    points = Column(Integer)
    due_date = Column(String)
    theme_id = Column(Integer, ForeignKey("themes.id"))

    theme = relationship("Theme", back_populates="tasks")
    options = relationship("Option", back_populates="task", cascade="all, delete")

    student_tasks = relationship(
        "StudentTask", back_populates="task", cascade="all, delete-orphan"
    )
    is_scored = Column(Boolean, default=False)


class Grade(Base):
    __tablename__ = "grades"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    student_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Integer)

    task = relationship("Task")
    student = relationship("AuthUser")


class Option(Base):
    __tablename__ = "options"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    identifier = Column(String)
    is_correct = Column(Boolean, default=False)
    task_id = Column(Integer, ForeignKey("tasks.id"))

    task = relationship("Task", back_populates="options")


Subject.themes = relationship("Theme", back_populates="subject", cascade="all, delete")
