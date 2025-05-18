from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    icon_color = Column(String)
    activities = relationship("Activity", back_populates="subject", cascade="all, delete")
