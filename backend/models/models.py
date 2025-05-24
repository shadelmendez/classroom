from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean, UniqueConstraint
from datetime import datetime


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    comment = Column(String)
    subject_id = Column(Integer, ForeignKey("subjects.id"))

    subject = relationship("Subject", back_populates="activities")


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    icon_color = Column(String)
    activities = relationship(
        "Activity", back_populates="subject", cascade="all, delete"
    )
    members = relationship("ClassMembers", back_populates="subject", cascade="all, delete")



class AuthUser(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    password = Column(String)
    is_student = Column(Boolean, default=False)
    class_memberships = relationship("ClassMembers", back_populates="user", cascade="all, delete")

class ClassMembers(Base):
    __tablename__ = "class_members"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    role = Column(String, default="student", nullable=False)  # "teacher" o "student ( por ahora student >:) )"

    user = relationship("AuthUser", back_populates="class_memberships")
    subject = relationship("Subject", back_populates="members")
    
    __table_args__ = (UniqueConstraint("user_id", "subject_id", name="_user_subject_uc"),)
    
class Theme(Base):
    __tablename__ = "themes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"))

    subject = relationship("Subject", back_populates="themes")
    tasks = relationship("Task", back_populates="theme", cascade="all, delete")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    instructions = Column(Text)
    type = Column(String, nullable=False)  # 'task' o 'question'
    date = Column(String)
    points = Column(Integer)
    due_date = Column(String)
    theme_id = Column(Integer, ForeignKey("themes.id"))

    theme = relationship("Theme", back_populates="tasks")
    options = relationship("Option", back_populates="task", cascade="all, delete")


class Option(Base):
    __tablename__ = "options"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    identifier = Column(String)  # 'a', 'b', 'c', etc.
    is_correct = Column(Boolean, default=False)
    task_id = Column(Integer, ForeignKey("tasks.id"))

    task = relationship("Task", back_populates="options")


# Actualiza el modelo Subject para que relacione con Theme
Subject.themes = relationship("Theme", back_populates="subject", cascade="all, delete")


