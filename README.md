# Swaraj Asia Technologies — Professional Corporate Platform

An enterprise-grade, high-performance corporate web platform built for **Swaraj Asia Technologies**. Featuring a modern React + Vite frontend styled with Tailwind CSS, Framer Motion animations, Lucide React icons, and a RESTful Python FastAPI backend backed by SQLAlchemy with SQLite/MySQL flexibility.

---

## 🌟 Key Features

1. **Enterprise Design System**:
   - Deep Navy (`#0F172A`), Royal Blue (`#2563EB`), and Tech Glow Cyan (`#06B6D4`) palette.
   - Glassmorphic panels, animated viewport counters, responsive mobile drawer menu, sticky navbar.
2. **Complete Page Suite**:
   - **Home**: Dynamic Hero, Animated Metrics Counter, Practice Cards, Industry Solutions Grid, Ecosystem Logos, Process Timeline (01-06), Testimonials Carousel, CTA Banner.
   - **About Us**: Mission, Vision, Driving Principles, and ISO Compliance.
   - **Services & Dynamic Detail View (`/services/:slug`)**: Detailed practice overviews, problem statements, solutions, key capabilities, measured benefits, and FAQs.
   - **Industries**: Manufacturing, Retail, Healthcare, Logistics, Finance, Education, Professional Services, Wholesale.
   - **Solutions**: ERP Transformation, Cloud Migration, BI Telemetry, CRM Implementation, Process Automation, Digital Engineering.
   - **Technologies & Partners**: Comprehensive grid featuring SAP, Oracle, Microsoft Azure, AWS, Salesforce, Zoho, Odoo, Power BI, Tableau, Snowflake.
   - **Case Studies**: Real-world metrics and outcome-focused project cards.
   - **Careers**: Live job openings fetched from FastAPI with interactive candidate application modal.
   - **Contact Us**: Form connecting to FastAPI `POST /api/contact` with instant validation and status response.
   - **Admin Portal (`/admin/login` & `/admin/dashboard`)**: Authenticated JWT dashboard to review client inquiries, candidate applications, services, and active job postings.
   - **Legal Pages**: Privacy Policy & Terms of Service.
   - **404 Not Found Page**.

---

## 🏗️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios, React Router v6.
- **Backend**: Python 3.10+, FastAPI, SQLAlchemy, Pydantic, Passlib (Bcrypt), PyJWT / python-jose.
- **Database**: SQLite (default zero-config out-of-the-box) or MySQL (via `DATABASE_URL` environment variable).

---

## 🚀 Local Setup & Run Instructions

### 1. Backend Setup (FastAPI)

Navigate to the `backend/` directory:

```bash
cd backend
```

Create and activate a Python virtual environment:

```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux / MacOS
python3 -m venv venv
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

*(Optional)* Configure MySQL Database:
By default, the backend runs on SQLite (`swaraj_asia.db`) for instant execution. To connect your local MySQL server, set the environment variable:

```bash
# Windows PowerShell
$env:DATABASE_URL="mysql+pymysql://username:password@localhost:3306/swaraj_asia"
```

Seed the database with initial enterprise content & admin user:

```bash
python seed.py
```

Start the FastAPI backend server:

```bash
uvicorn app.main:app --reload --port 8000
```

- **Interactive API Docs**: `http://localhost:8000/api/docs`
- **ReDoc**: `http://localhost:8000/api/redoc`

---

### 2. Frontend Setup (React + Vite)

Open a new terminal window and navigate to the `frontend/` directory:

```bash
cd frontend
```

Install frontend packages:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

- **Frontend Web Application**: `http://localhost:3000` (or `http://localhost:5173`)

---

## 🔐 Executive Admin Portal

Access the admin dashboard at: `http://localhost:3000/admin/login`

- **Username**: `admin`
- **Password**: `admin123`

The dashboard allows executives to:
- Review & manage client contact inquiries and change status (`New`, `In Progress`, `Contacted`, `Closed`).
- Review candidate job applications submitted through the Careers page.
- Inspect configured service practices and active recruitment postings.
