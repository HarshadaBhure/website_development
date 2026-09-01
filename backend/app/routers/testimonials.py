from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.models import Testimonial, User
from app.schemas.schemas import TestimonialCreate, TestimonialOut
from app.utils.auth import get_current_user

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])

@router.get("", response_model=List[TestimonialOut])
def get_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()

@router.post("", response_model=TestimonialOut, status_code=status.HTTP_201_CREATED)
def create_testimonial(t_in: TestimonialCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_t = Testimonial(**t_in.model_dump())
    db.add(db_t)
    db.commit()
    db.refresh(db_t)
    return db_t
