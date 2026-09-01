from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.models import Service, User
from app.schemas.schemas import ServiceCreate, ServiceOut
from app.utils.auth import get_current_user

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("", response_model=List[ServiceOut])
def get_services(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Service)
    if category:
        query = query.filter(Service.category == category)
    return query.order_by(Service.order_index.asc(), Service.id.asc()).all()

@router.get("/{slug_or_id}", response_model=ServiceOut)
def get_service_detail(slug_or_id: str, db: Session = Depends(get_db)):
    if slug_or_id.isdigit():
        service = db.query(Service).filter(Service.id == int(slug_or_id)).first()
    else:
        service = db.query(Service).filter(Service.slug == slug_or_id).first()
        
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.post("", response_model=ServiceOut, status_code=status.HTTP_201_CREATED)
def create_service(service_in: ServiceCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    existing = db.query(Service).filter(Service.slug == service_in.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Service with this slug already exists")
    db_service = Service(**service_in.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(service_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(service)
    db.commit()
    return None
