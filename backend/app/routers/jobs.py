from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.models import JobPosition, JobApplication, User
from app.schemas.schemas import JobCreate, JobOut, JobApplicationCreate, JobApplicationOut
from app.utils.auth import get_current_user

router = APIRouter(prefix="/jobs", tags=["Careers & Jobs"])

@router.get("", response_model=List[JobOut])
def get_jobs(department: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(JobPosition).filter(JobPosition.is_active == True)
    if department:
        query = query.filter(JobPosition.department == department)
    return query.order_by(JobPosition.created_at.desc()).all()

@router.get("/{job_id}", response_model=JobOut)
def get_job_detail(job_id: int, db: Session = Depends(get_db)):
    job = db.query(JobPosition).filter(JobPosition.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job position not found")
    return job

@router.post("", response_model=JobOut, status_code=status.HTTP_201_CREATED)
def create_job(job_in: JobCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_job = JobPosition(**job_in.model_dump())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

@router.post("/{job_id}/apply", response_model=JobApplicationOut, status_code=status.HTTP_201_CREATED)
def apply_for_job(job_id: int, application_in: JobApplicationCreate, db: Session = Depends(get_db)):
    job = db.query(JobPosition).filter(JobPosition.id == job_id, JobPosition.is_active == True).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job position not found or no longer active")
        
    db_app = JobApplication(
        job_id=job_id,
        **application_in.model_dump(),
        status="Pending"
    )
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    return db_app

@router.get("/admin/applications", response_model=List[JobApplicationOut])
def get_all_applications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(JobApplication).order_by(JobApplication.created_at.desc()).all()
