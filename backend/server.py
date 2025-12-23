from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
import uuid
from datetime import datetime

load_dotenv()

app = FastAPI(title="Shree Guru Mess API", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ContactForm(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str

class Reservation(BaseModel):
    name: str
    email: str
    phone: str
    date: str
    time: str
    guests: int
    special_requests: Optional[str] = None

# In-memory storage for demo
contact_messages = []
reservations = []

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "restaurant": "Shree Guru Mess"}

@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    message_id = str(uuid.uuid4())
    contact_data = {
        "id": message_id,
        "name": form.name,
        "email": form.email,
        "phone": form.phone,
        "message": form.message,
        "created_at": datetime.now().isoformat()
    }
    contact_messages.append(contact_data)
    return {"success": True, "message": "Thank you for reaching out! We will get back to you soon.", "id": message_id}

@app.post("/api/reservation")
async def make_reservation(reservation: Reservation):
    reservation_id = str(uuid.uuid4())
    reservation_data = {
        "id": reservation_id,
        "name": reservation.name,
        "email": reservation.email,
        "phone": reservation.phone,
        "date": reservation.date,
        "time": reservation.time,
        "guests": reservation.guests,
        "special_requests": reservation.special_requests,
        "created_at": datetime.now().isoformat()
    }
    reservations.append(reservation_data)
    return {"success": True, "message": "Reservation confirmed! We look forward to serving you.", "id": reservation_id}

@app.get("/api/menu")
async def get_menu():
    return {
        "daily_specials": [
            {"name": "Traditional Rice Meals", "description": "Unlimited rice with sambar, rasam, kootu, poriyal, curd, pickle, papad, and jaggery payasam"},
            {"name": "Ragi Mudde", "description": "Nutritious finger millet balls served with spicy sambar and fresh coconut chutney"},
            {"name": "Chapathi Meals", "description": "Soft whole wheat chapathis with mixed vegetable curry and dal"},
        ],
        "beverages": [
            {"name": "Filter Coffee", "description": "Traditional South Indian filter coffee"},
            {"name": "Buttermilk", "description": "Fresh homemade spiced buttermilk"},
        ],
        "sweets": [
            {"name": "Jaggery Payasam", "description": "Traditional rice kheer made with pure jaggery"},
            {"name": "Jaggery Laddu", "description": "Handmade laddus with roasted gram and jaggery"},
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
