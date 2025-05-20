from pydantic import BaseModel


class ActivityBase(BaseModel):
    comment: str
    subject_id: int


class ActivityCreate(ActivityBase):
    pass


class Activity(ActivityBase):
    id: int

    class Config:
        from_attributes = True
