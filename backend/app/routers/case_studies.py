from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.models import CaseStudy, User
from app.schemas.schemas import CaseStudyCreate, CaseStudyOut
from app.utils.auth import get_current_user

router = APIRouter(prefix="/case-studies", tags=["Case Studies"])

@router.get("", response_model=List[CaseStudyOut])
def get_case_studies(industry: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(CaseStudy)
    if industry:
        query = query.filter(CaseStudy.industry == industry)
    return query.order_by(CaseStudy.created_at.desc()).all()

@router.get("/{slug_or_id}", response_model=CaseStudyOut)
def get_case_study_detail(slug_or_id: str, db: Session = Depends(get_db)):
    if slug_or_id.isdigit():
        cs = db.query(CaseStudy).filter(CaseStudy.id == int(slug_or_id)).first()
    else:
        cs = db.query(CaseStudy).filter(CaseStudy.slug == slug_or_id).first()
    if not cs:
        raise HTTPException(status_code=404, detail="Case Study not found")
    return cs

@router.post("", response_model=CaseStudyOut, status_code=status.HTTP_201_CREATED)
def create_case_study(cs_in: CaseStudyCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    existing = db.query(CaseStudy).filter(CaseStudy.slug == cs_in.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Case study with this slug already exists")
    db_cs = CaseStudy(**cs_in.model_dump())
    db.add(db_cs)
    db.commit()
    db.refresh(db_cs)
    return db_cs
