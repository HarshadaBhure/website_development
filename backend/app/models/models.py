import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=False) # e.g. ERP, CRM, Cloud, Analytics, Digital Transformation, IT Consulting
    short_description = Column(Text, nullable=False)
    overview = Column(Text, nullable=True)
    problem_statement = Column(Text, nullable=True)
    solution_description = Column(Text, nullable=True)
    icon_name = Column(String(100), default="Briefcase")
    features = Column(JSON, nullable=True) # List of feature strings
    benefits = Column(JSON, nullable=True) # List of benefit strings
    tech_stack = Column(JSON, nullable=True) # List of tech names e.g. ["SAP", "Oracle", "AWS"]
    faqs = Column(JSON, nullable=True) # List of {question, answer}
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class JobPosition(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    department = Column(String(100), nullable=False) # e.g. SAP Consulting, Cloud Architecture, Full Stack
    location = Column(String(100), default="Remote / Hybrid (Bangalore)")
    employment_type = Column(String(50), default="Full-Time")
    experience_level = Column(String(50), default="3-5 Years")
    skills_required = Column(JSON, nullable=True) # List of skill tags
    description = Column(Text, nullable=False)
    responsibilities = Column(JSON, nullable=True)
    qualifications = Column(JSON, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    applications = relationship("JobApplication", back_populates="job", cascade="all, delete-orphan")

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    linkedin_url = Column(String(255), nullable=True)
    cover_letter = Column(Text, nullable=True)
    status = Column(String(50), default="Pending") # Pending, Reviewed, Interviewing, Rejected, Accepted
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    job = relationship("JobPosition", back_populates="applications")

class CaseStudy(Base):
    __tablename__ = "case_studies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    industry = Column(String(100), nullable=False)
    client_type = Column(String(255), nullable=False) # e.g. Global Manufacturing Leader
    challenge = Column(Text, nullable=False)
    solution = Column(Text, nullable=False)
    results = Column(JSON, nullable=False) # List of metric strings e.g. ["35% Productivity Boost", "99.9% Uptime"]
    technologies_used = Column(JSON, nullable=False)
    summary = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(255), nullable=False)
    position = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    industry = Column(String(100), nullable=True)
    content = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    company_logo_text = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ContactInquiry(Base):
    __tablename__ = "contact_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    company = Column(String(255), nullable=True)
    service_interested = Column(String(100), nullable=False)
    subject = Column(String(255), nullable=True)
    message = Column(Text, nullable=False)
    source = Column(String(50), default="Contact Form") # Contact Form, Chatbot
    status = Column(String(50), default="New") # New, In Progress, Resolved
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
