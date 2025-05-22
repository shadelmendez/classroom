from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base


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
    educator_id = Column(Integer, ForeignKey("users.id"))  # NEW FIELD
    educator = relationship("AuthUser")  # NEW RELATIONSHIP
    activities = relationship(
        "Activity", back_populates="subject", cascade="all, delete"
    )


class AuthUser(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    password = Column(String)
    is_student = Column(Boolean, default=False)
