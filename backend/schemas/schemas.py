from typing import List, Optional
from pydantic import BaseModel


class ActivityInSubject(BaseModel):
    id: int
    comment: str

    class Config:
        orm_mode = True


class SubjectBase(BaseModel):
    name: str
    description: str
    icon_color: str


class SubjectCreate(SubjectBase):
    pass


class Subject(SubjectBase):
    id: int
    activities: List[ActivityInSubject] = []

    class Config:
        orm_mode = True


class ActivityBase(BaseModel):
    comment: str
    subject_id: int


class ActivityCreate(ActivityBase):
    pass


class Activity(ActivityBase):
    id: int

    class Config:
        orm_mode = True


class AuthUserSchema(BaseModel):
    email: str
    password: str
    is_student: bool


class Login(BaseModel):
    email: str
    password: str
    is_student: bool
