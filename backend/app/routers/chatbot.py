import os
import json
import re
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import ContactInquiry, Service, CaseStudy, JobPosition
from app.schemas.schemas import ChatRequest, ChatResponse
import urllib.request
import urllib.parse

router = APIRouter(prefix="/chatbot", tags=["AI Chatbot"])

SWARAJ_KNOWLEDGE = """
You are "Swaraj AI", the intelligent enterprise assistant for Swaraj Asia Technologies Private Limited.

## About Swaraj Asia Technologies
- Full Legal Name: Swaraj Asia Technologies Private Limited
- Headquarters: 211, Leela Grandeur, Pune - Solapur Rd, Laxmi Colony, Hadapsar, Pune, Maharashtra 412307, India
- Email: sales@swarajasia.com
- Phone: +91 80145 03503
- Business Hours: Monday to Friday, 9:00 AM – 7:00 PM IST
- LinkedIn: https://www.linkedin.com/company/swaraj-asia/
- ISO Certified enterprise IT consulting and digital transformation company.
- Serving clients across India, Southeast Asia, the Middle East, and globally.

## Core Services & Practices

### 1. ERP Solutions & Transformation
Comprehensive ERP implementations and migrations:
- SAP S/4HANA: Full lifecycle implementation, migration from legacy SAP ECC, RISE with SAP
- SAP Business One: Mid-market ERP for growing companies
- Oracle ERP Cloud: Finance, procurement, supply chain modules
- Odoo ERP: Open-source ERP customization and deployment
- Legacy ERP Migration: Structured migration from older systems to modern ERP platforms
- Industries: Manufacturing, Distribution, Retail, Healthcare

### 2. CRM & Customer Experience
- Salesforce Sales Cloud, Service Cloud, Marketing Cloud
- Zoho CRM: Implementation, workflow automation, lead routing
- CRM integration with ERP (SAP + Salesforce connectors)
- Customer lifecycle management, pipeline visibility, customer retention analytics

### 3. Cloud Architecture & Migration
- AWS: Architecture design, EC2/EKS/Lambda, RDS, S3, cloud-native apps
- Microsoft Azure: Azure DevOps, App Services, Azure SQL, Active Directory
- Cloud migration: Lift-and-shift, re-platforming, cloud-native refactoring
- Infrastructure as Code (Terraform, Ansible), CI/CD pipelines, containerization (Docker/Kubernetes)
- FinOps: Cloud cost optimization and governance

### 4. Analytics, Data & Business Intelligence
- Power BI: Dashboard design, enterprise reporting, data modeling, DAX
- Tableau: Visual analytics, telemetry, executive dashboards
- Snowflake: Cloud data warehouse architecture and implementation
- ETL/ELT pipelines: Python, Azure Data Factory, AWS Glue
- Real-time operational reporting for C-suite decision-making

### 5. Digital Transformation & Automation
- Robotic Process Automation (RPA): UiPath, Power Automate
- Enterprise API integration and middleware
- Workflow automation: ServiceNow, Jira, custom solutions
- Process optimization and digital operations consulting

### 6. IT Staff Augmentation & Consulting
- SAP architects, functional consultants, technical consultants
- Cloud engineers (AWS/Azure certified)
- Full-stack developers, DevOps engineers
- Data engineers, BI developers
- Flexible engagement: short-term projects, long-term augmentation

## Industries We Serve
- Manufacturing & Automotive
- Retail & E-Commerce
- Healthcare & Life Sciences / Pharma
- Logistics & Supply Chain
- Financial Services & BFSI
- Education & EdTech
- Wholesale & Distribution

## Solutions & Offerings
- Enterprise Digital Transformation Roadmap
- SAP Centre of Excellence (CoE) setup
- Data-Driven Organization programs
- Cloud-First Infrastructure strategy
- Customer 360 implementation
- End-to-end ERP rollout programs

## Contact & Engagement Process
When a user wants to contact or get a consultation:
1. Ask: "Could you share your name?"
2. Ask: "And your business email address?"
3. Ask: "Your phone number or best contact?"
4. Ask: "What is your company name and primary challenge or requirement?"
Then confirm: "Thank you! I've captured your details — a Swaraj Asia consultant will reach out within 24 hours."

## Response Guidelines
- Be conversational, helpful, and concise. Do NOT write essays.
- Use bullet points when listing multiple items.
- Ask follow-up questions to understand the user's specific context.
- Recommend specific Swaraj Asia services based on the user's described challenge.
- If asked about pricing, say: "Pricing depends on scope and requirements. I'd recommend a quick discovery call — I can connect you with our team."
- If you genuinely don't know something specific, say: "I don't have that specific detail verified. Let me connect you with our team who can answer precisely."
- Never invent client names, case study outcomes, certifications, or achievements not mentioned here.
- End responses with a relevant suggestion or question to continue the conversation.
"""

def call_gemini_api(user_message: str, history_list: list) -> tuple[str, list]:
    """Call Google Gemini API. Returns (reply_text, suggested_actions)."""
    api_key = os.getenv("AI_API_KEY") or os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "", []

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"

    contents = []
    # System context as first user/model exchange
    contents.append({
        "role": "user",
        "parts": [{"text": f"SYSTEM INSTRUCTIONS (always follow these):\n\n{SWARAJ_KNOWLEDGE}"}]
    })
    contents.append({
        "role": "model",
        "parts": [{"text": "Understood. I am Swaraj AI, the enterprise assistant for Swaraj Asia Technologies. I'm ready to help users with ERP, CRM, Cloud, Analytics, Digital Transformation, and any other questions about Swaraj Asia's services."}]
    })

    # Include recent conversation history (last 10 turns)
    for h in history_list[-10:]:
        role = "user" if h.role == "user" else "model"
        contents.append({"role": role, "parts": [{"text": h.content}]})

    contents.append({"role": "user", "parts": [{"text": user_message}]})

    req_data = json.dumps({
        "contents": contents,
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 600,
            "topP": 0.9
        }
    }).encode("utf-8")

    req = urllib.request.Request(
        url, data=req_data,
        headers={"Content-Type": "application/json"}
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            res_json = json.loads(response.read().decode("utf-8"))
            candidates = res_json.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    text = parts[0].get("text", "")
                    actions = extract_suggested_actions(text, user_message)
                    return text, actions
    except Exception as e:
        print(f"Gemini API call failed: {e}")
    return "", []


def extract_suggested_actions(reply: str, user_msg: str) -> list:
    """Dynamically determine relevant action buttons based on context."""
    reply_lower = reply.lower()
    msg_lower = user_msg.lower()
    actions = []

    if any(k in reply_lower + msg_lower for k in ["contact", "consultant", "speak", "call", "reach", "expert", "team"]):
        actions.append("Talk to an Expert")
    if any(k in reply_lower + msg_lower for k in ["erp", "sap", "oracle", "odoo"]):
        actions.append("Explore ERP Solutions")
    if any(k in reply_lower + msg_lower for k in ["crm", "salesforce", "zoho", "customer"]):
        actions.append("Explore CRM Solutions")
    if any(k in reply_lower + msg_lower for k in ["cloud", "aws", "azure", "migration"]):
        actions.append("Explore Cloud Services")
    if any(k in reply_lower + msg_lower for k in ["analytics", "bi", "power bi", "tableau", "data", "report"]):
        actions.append("Explore Analytics & BI")
    if any(k in reply_lower + msg_lower for k in ["job", "career", "hiring", "join", "candidate"]):
        actions.append("View Open Positions")
    if not actions:
        actions = ["Talk to an Expert", "View Our Services"]
    return actions[:3]  # max 3 buttons


def fallback_knowledge_engine(query: str, db: Session) -> tuple[str, list]:
    """Grounded rule-based fallback when AI API is unavailable."""
    q = query.lower()

    if any(k in q for k in ["location", "where are you", "address", "office", "pune"]):
        return (
            "Swaraj Asia Technologies is headquartered at:\n\n**211, Leela Grandeur, Pune - Solapur Rd, Laxmi Colony, Hadapsar, Pune, Maharashtra 412307, India**\n\nYou can also reach us at sales@swarajasia.com or call +91 80145 03503.",
            ["Talk to an Expert", "Contact Us"]
        )

    if any(k in q for k in ["email", "phone", "contact info", "call", "reach", "number"]):
        return (
            "You can reach Swaraj Asia Technologies through:\n\n- **Email**: sales@swarajasia.com\n- **Phone**: +91 80145 03503\n- **Hours**: Monday–Friday, 9 AM–7 PM IST\n\nWould you like me to help you submit an enquiry?",
            ["Talk to an Expert", "Contact Us"]
        )

    if any(k in q for k in ["service", "what do you do", "offer", "provide", "capabilities", "help"]):
        services = db.query(Service).all()
        if services:
            svc_list = "\n".join([f"• **{s.title}**: {s.short_description}" for s in services])
            return (
                f"Swaraj Asia Technologies offers the following enterprise practices:\n\n{svc_list}\n\nWhich of these aligns with your current business challenge?",
                ["ERP Solutions", "Cloud Services", "Talk to an Expert"]
            )
        return (
            "We offer: **ERP Solutions** (SAP/Oracle/Odoo), **CRM** (Salesforce/Zoho), **Cloud** (AWS/Azure), **Business Intelligence** (Power BI/Tableau), **Process Automation**, and **IT Staff Augmentation**.\n\nWhat business problem are you trying to solve?",
            ["Explore ERP", "Explore Cloud", "Talk to an Expert"]
        )

    if any(k in q for k in ["erp", "sap", "oracle", "odoo", "enterprise resource"]):
        return (
            "Our **ERP Practice** specializes in:\n\n• SAP S/4HANA implementation & migration\n• SAP Business One for mid-market\n• Oracle ERP Cloud\n• Odoo ERP customization\n\nWe handle everything from system design to go-live and post-implementation support.\n\nWhat is your current ERP situation — are you on a legacy system or starting fresh?",
            ["Talk to an Expert", "View ERP Services"]
        )

    if any(k in q for k in ["crm", "salesforce", "zoho", "customer relationship", "pipeline"]):
        return (
            "Our **CRM Practice** delivers:\n\n• Salesforce Sales & Service Cloud\n• Zoho CRM automation\n• CRM-ERP integration\n• Pipeline management & lead routing\n\nCould you tell me more about your sales process or what challenge you're facing with customer management?",
            ["Talk to an Expert", "Explore CRM"]
        )

    if any(k in q for k in ["cloud", "aws", "azure", "migration", "infrastructure"]):
        return (
            "Our **Cloud Practice** covers:\n\n• AWS & Microsoft Azure architecture\n• Cloud migration (lift-and-shift, re-platforming)\n• Kubernetes, CI/CD, DevOps\n• Cloud cost optimization (FinOps)\n\nAre you looking to migrate an existing system or build cloud-native infrastructure?",
            ["Talk to an Expert", "Explore Cloud Services"]
        )

    if any(k in q for k in ["analytics", "bi", "power bi", "tableau", "snowflake", "report", "dashboard", "data"]):
        return (
            "Our **Analytics & BI Practice** helps enterprises:\n\n• Build Power BI & Tableau dashboards\n• Design Snowflake data warehouses\n• Build ETL/ELT data pipelines\n• Create real-time executive reporting\n\nWhat data challenge are you currently facing?",
            ["Talk to an Expert", "Explore Analytics"]
        )

    if any(k in q for k in ["job", "career", "hiring", "vacancy", "join us"]):
        jobs = db.query(JobPosition).filter(JobPosition.is_active == True).all()
        if jobs:
            j_list = "\n".join([f"• **{j.title}** ({j.department}) — {j.location}" for j in jobs])
            return (
                f"We're hiring! Current open positions:\n\n{j_list}\n\nYou can apply on our Careers page or email your CV to sales@swarajasia.com.",
                ["View Open Positions", "Contact HR"]
            )
        return (
            "We're always looking for talented SAP architects, Cloud engineers, and BI consultants.\n\nPlease visit our **Careers page** or send your CV to sales@swarajasia.com.",
            ["View Careers", "Talk to an Expert"]
        )

    if any(k in q for k in ["about", "who are you", "swaraj asia", "company", "background"]):
        return (
            "Swaraj Asia Technologies is an **ISO Certified** enterprise IT consulting firm based in Pune, India.\n\nWe specialize in ERP modernization (SAP/Oracle/Odoo), Cloud engineering (AWS/Azure), Business Intelligence (Power BI/Tableau), CRM (Salesforce/Zoho), and Digital Transformation.\n\nOur team works with enterprise clients across Manufacturing, Healthcare, Retail, Logistics, and Financial Services.\n\nHow can we help your organization today?",
            ["Our Services", "Contact Us", "Talk to an Expert"]
        )

    return (
        "I don't have enough verified information to answer that accurately. I can help you connect with the Swaraj Asia team who can assist you directly.\n\nWould you like to reach out?",
        ["Talk to an Expert", "Contact Us"]
    )


def extract_lead_from_message(message: str):
    """Detect if message contains email + phone for lead capture."""
    email_match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', message)
    phone_match = re.search(r'[\+\d\s()-]{8,20}', message)

    if email_match and (phone_match or len(message) > 20):
        email = email_match.group(0)
        phone = phone_match.group(0).strip() if phone_match else None
        words = message.split()
        name = "Chatbot Lead"
        if len(words) >= 2:
            potential_name = " ".join([w for w in words[:3] if "@" not in w and not any(c.isdigit() for c in w)])
            if len(potential_name) > 3:
                name = potential_name
        return {"full_name": name, "email": email, "phone": phone, "message": message}
    return None


@router.post("/chat", response_model=ChatResponse)
def handle_chatbot_interaction(chat_req: ChatRequest, db: Session = Depends(get_db)):
    user_msg = chat_req.message.strip()
    if not user_msg:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # Lead detection — if user shared email + phone, capture the lead
    lead_info = extract_lead_from_message(user_msg)
    inquiry_id = None
    lead_collected = False

    if lead_info:
        try:
            db_inquiry = ContactInquiry(
                full_name=lead_info["full_name"],
                email=lead_info["email"],
                phone=lead_info["phone"] or "Provided via Chat",
                company="Chatbot Lead",
                service_interested="AI Chatbot Inquiry",
                subject="Chatbot Consultation Request",
                message=f"Lead submitted via AI Chatbot:\n\n{user_msg}",
                source="Chatbot",
                status="New"
            )
            db.add(db_inquiry)
            db.commit()
            db.refresh(db_inquiry)
            inquiry_id = db_inquiry.id
            lead_collected = True
        except Exception as err:
            print("Failed saving chatbot lead:", err)

    if lead_collected:
        return ChatResponse(
            reply="Thank you! I've captured your contact details. A Swaraj Asia enterprise consultant will get back to you within 24 hours. Is there anything else I can help you with?",
            lead_collected=True,
            inquiry_id=inquiry_id,
            suggested_actions=["Talk to an Expert", "View Our Services"]
        )

    # Try Gemini AI first
    ai_reply, suggested_actions = call_gemini_api(user_msg, chat_req.history)

    # Fallback to grounded knowledge engine
    if not ai_reply:
        ai_reply, suggested_actions = fallback_knowledge_engine(user_msg, db)

    return ChatResponse(
        reply=ai_reply,
        lead_collected=False,
        suggested_actions=suggested_actions
    )
