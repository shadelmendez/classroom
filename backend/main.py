from fastapi import FastAPI
from database import Base, engine
from routers import subject, activity

app = FastAPI(title="School API")

# Create tables
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(subject.router)
app.include_router(activity.router)
