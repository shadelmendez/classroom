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
