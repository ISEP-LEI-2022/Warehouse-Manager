from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import random

class Route(BaseModel):
    idStart: str
    idEnd: str

class Trip(BaseModel):
    idTrip: str
    registration: str
    date: datetime
    routes: list[Route]
    deliveries: list[str]



app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/optimize")
async def create_item(trip: Trip):
    random.shuffle(trip.routes)
    return trip
    