from typing import List, Optional
from pydantic import BaseModel


# ---------- Opciones (para preguntas) ----------
class OptionBaseSchemas(BaseModel):
    text: str
    identifier: str
    is_correct: bool = False


class OptionCreateSchemas(OptionBaseSchemas):
    pass


class OptionSchemas(OptionBaseSchemas):
    id: int

    class Config:
        orm_mode = True


# ---------- Tareas / Preguntas ----------
class TaskBaseSchemas(BaseModel):
    title: str
    instructions: Optional[str]
    type: str  # 'task' o 'question'
    date: str
    points: Optional[int]
    due_date: Optional[str]


class TaskCreateSchemas(TaskBaseSchemas):
    theme_id: int
    options: List[OptionCreateSchemas] = []


class TaskSchemas(TaskBaseSchemas):
    id: int
    theme_id: int
    options: List[OptionSchemas] = []

    class Config:
        orm_mode = True


# ---------- Temas ----------
class ThemeBaseSchemas(BaseModel):
    title: str


class ThemeCreateSchemas(ThemeBaseSchemas):
    subject_id: int


class ThemeSchemas(ThemeBaseSchemas):
    id: int
    subject_id: int
    tasks: List[TaskSchemas] = []

    class Config:
        orm_mode = True


# ---------- Actividades ----------
class ActivityInSubjectSchemas(BaseModel):
    id: int
    comment: str

    class Config:
        orm_mode = True


class ActivityBaseSchemas(BaseModel):
    comment: str
    subject_id: int


class ActivityCreateSchemas(ActivityBaseSchemas):
    pass


class ActivitySchemas(ActivityBaseSchemas):
    id: int

    class Config:
        orm_mode = True


# ---------- Subjects (clases) ----------
class SubjectBaseSchemas(BaseModel):
    name: str
    description: str
    icon_color: str
    educator_id: int


class SubjectCreateSchemas(SubjectBaseSchemas):
    pass


class SubjectSchemas(SubjectBaseSchemas):
    id: int
    activities: List[ActivityInSubjectSchemas] = []
    themes: List[ThemeSchemas] = []  # relación directa con temas

    class Config:
        orm_mode = True


# ---------- Usuarios ----------
class AuthUserSchema(BaseModel):
    email: str
    password: str
    is_student: bool


class Login(BaseModel):
    email: str
    password: str
    is_student: bool
