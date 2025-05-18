from fastapi import FastAPI
from database import Base, engine
from routers import subject, activity, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="School API")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create tables
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(subject.router)
app.include_router(activity.router)
app.include_router(auth.router)
