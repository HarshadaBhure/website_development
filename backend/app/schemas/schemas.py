from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any
from datetime import datetime

# --- Auth Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str = Field(..., min_length=8)
    full_name: Optional[str] = None

class UserOut(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str] = None
    is_active: bool
    is_superuser: bool

    class Config:
        from_attributes = True

# --- Service Schemas ---
class ServiceBase(BaseModel):
    title: str
    slug: str
    category: str
    short_description: str
    overview: Optional[str] = None
    problem_statement: Optional[str] = None
    solution_description: Optional[str] = None
    icon_name: Optional[str] = "Briefcase"
    features: Optional[List[str]] = []
    benefits: Optional[List[str]] = []
    tech_stack: Optional[List[str]] = []
    faqs: Optional[List[dict]] = []
    order_index: Optional[int] = 0

class ServiceCreate(ServiceBase):
    pass

class ServiceOut(ServiceBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Job & Application Schemas ---
class JobBase(BaseModel):
    title: str
    department: str
    location: str
    employment_type: str
    experience_level: str
    skills_required: List[str]
    description: str
    responsibilities: Optional[List[str]] = []
    qualifications: Optional[List[str]] = []
    is_active: bool = True

class JobCreate(JobBase):
    pass

class JobOut(JobBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class JobApplicationCreate(BaseModel):
    full_name: str = Field(..., min_length=2)
    email: EmailStr
    phone: str = Field(..., min_length=5)
    linkedin_url: Optional[str] = None
    cover_letter: Optional[str] = None

class JobApplicationOut(BaseModel):
    id: int
    job_id: int
    full_name: str
    email: str
    phone: str
    linkedin_url: Optional[str] = None
    cover_letter: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# --- Case Study Schemas ---
class CaseStudyBase(BaseModel):
    title: str
    slug: str
    industry: str
    client_type: str
    challenge: str
    solution: str
    results: List[str]
    technologies_used: List[str]
    summary: str
    image_url: Optional[str] = None

class CaseStudyCreate(CaseStudyBase):
    pass

class CaseStudyOut(CaseStudyBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Testimonial Schemas ---
class TestimonialBase(BaseModel):
    client_name: str
    position: str
    company: str
    industry: Optional[str] = None
    content: str
    rating: int = 5
    company_logo_text: Optional[str] = None

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialOut(TestimonialBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Contact Inquiry Schemas ---
class ContactInquiryCreate(BaseModel):
    full_name: str = Field(..., min_length=2)
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service_interested: str
    subject: Optional[str] = None
    message: str = Field(..., min_length=5)
    source: Optional[str] = "Contact Form"
    consent: Optional[bool] = True

class ContactInquiryOut(BaseModel):
    id: int
    full_name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    service_interested: str
    subject: Optional[str] = None
    message: str
    source: Optional[str] = "Contact Form"
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# --- Chatbot Schemas ---
class ChatMessage(BaseModel):
    role: str # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    lead_collected: Optional[bool] = False
    inquiry_id: Optional[int] = None
    suggested_actions: Optional[List[str]] = []
