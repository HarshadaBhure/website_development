from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.models import ContactInquiry, User
from app.schemas.schemas import ContactInquiryCreate, ContactInquiryOut
from app.utils.auth import get_current_user

router = APIRouter(prefix="/contact", tags=["Contact Inquiries"])

@router.post("", response_model=ContactInquiryOut, status_code=status.HTTP_201_CREATED)
def submit_contact_inquiry(inquiry: ContactInquiryCreate, db: Session = Depends(get_db)):
    db_inquiry = ContactInquiry(
        full_name=inquiry.full_name,
        email=inquiry.email,
        phone=inquiry.phone,
        company=inquiry.company,
        service_interested=inquiry.service_interested,
        subject=inquiry.subject,
        message=inquiry.message,
        source=inquiry.source or "Contact Form",
        status="New"
    )
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    return db_inquiry

@router.get("", response_model=List[ContactInquiryOut])
def get_all_inquiries(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(ContactInquiry).order_by(ContactInquiry.created_at.desc()).all()

@router.get("/{inquiry_id}", response_model=ContactInquiryOut)
def get_inquiry_by_id(inquiry_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    inquiry = db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return inquiry

@router.patch("/{inquiry_id}/status", response_model=ContactInquiryOut)
def update_inquiry_status(inquiry_id: int, status_str: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    inquiry = db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    inquiry.status = status_str
    db.commit()
    db.refresh(inquiry)
    return inquiry

@router.delete("/{inquiry_id}", status_code=status.HTTP_200_OK)
def delete_inquiry(inquiry_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    inquiry = db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    db.delete(inquiry)
    db.commit()
    return {"message": f"Inquiry #{inquiry_id} deleted successfully"}
