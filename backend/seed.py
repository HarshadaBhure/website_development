from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
from app.models.models import User, Service, JobPosition, CaseStudy, Testimonial, ContactInquiry
from app.utils.auth import get_password_hash

def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    
    try:
        # 1. Seed Admin User
        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            admin_user = User(
                email="admin@swarajasia.com",
                username="admin",
                hashed_password=get_password_hash("admin123"),
                full_name="Swaraj Asia Executive Admin",
                is_active=True,
                is_superuser=True
            )
            db.add(admin_user)
            print("[+] Seeded Admin user: admin / admin123")

        # 2. Seed Enterprise Services
        if db.query(Service).count() == 0:
            services_data = [
                {
                    "title": "ERP Solutions & Transformation",
                    "slug": "erp-solutions",
                    "category": "Enterprise Services",
                    "order_index": 1,
                    "icon_name": "Database",
                    "short_description": "Transform operational efficiency with SAP Business One, S/4HANA, Oracle ERP, Odoo, and Zoho ERP implementations.",
                    "overview": "Swaraj Asia Technologies delivers end-to-end ERP implementation, customization, and integration services. We help global organizations unify finance, supply chain, procurement, manufacturing, and inventory into a single intelligent digital platform.",
                    "problem_statement": "Legacy disconnected enterprise software systems lead to data silos, delayed financial reporting, inventory inaccuracies, and high maintenance costs.",
                    "solution_description": "Our ERP experts streamline mission-critical business processes through agile deployment of SAP, Oracle, and Odoo systems customized to specific vertical workflows.",
                    "features": [
                        "SAP S/4HANA & SAP Business One Migration",
                        "Oracle Cloud Infrastructure & Financials Integration",
                        "Odoo & Zoho Enterprise ERP Customization",
                        "Automated Supply Chain & Inventory Control",
                        "Multi-Currency Financial Consolidation"
                    ],
                    "benefits": [
                        "Up to 40% reduction in supply chain processing time",
                        "Real-time executive dashboard visibility",
                        "100% compliance with international financial standards",
                        "Seamless third-party EDI and CRM API integrations"
                    ],
                    "tech_stack": ["SAP Business One", "SAP S/4HANA", "Oracle ERP", "Odoo", "Zoho Enterprise"],
                    "faqs": [
                        {"question": "How long does a standard SAP ERP migration take?", "answer": "Typical implementation ranges from 12 to 24 weeks depending on customized workflows and data migration complexity."},
                        {"question": "Do you provide post-implementation maintenance?", "answer": "Yes, we offer 24/7 SLA-driven technical support, system health monitoring, and continuous optimization."}
                    ]
                },
                {
                    "title": "CRM & Customer Experience",
                    "slug": "crm-solutions",
                    "category": "Enterprise Services",
                    "order_index": 2,
                    "icon_name": "Users",
                    "short_description": "Elevate customer engagement and sales growth via Salesforce, Zoho CRM, and tailored customer data platforms.",
                    "overview": "Accelerate revenue pipelines and deliver personalized customer journeys across sales, marketing, and customer service touchpoints.",
                    "problem_statement": "Inability to track customer interactions across channels leads to lost sales leads, low conversion rates, and fragmented customer service.",
                    "solution_description": "We configure intelligent CRM solutions with automated lead routing, predictive sales forecasting, and omni-channel customer service desks.",
                    "features": [
                        "Salesforce Sales Cloud & Service Cloud Setup",
                        "Zoho CRM Enterprise Customization & Automation",
                        "Automated Lead Scoring & Pipeline Analytics",
                        "Omni-channel Support Ticket Automation"
                    ],
                    "benefits": [
                        "30% increase in lead-to-opportunity conversion rate",
                        "Comprehensive 360-degree customer activity history",
                        "Automated sales follow-ups and renewal reminders"
                    ],
                    "tech_stack": ["Salesforce", "Zoho CRM", "HubSpot", "Microsoft Dynamics 365"],
                    "faqs": [
                        {"question": "Can CRM integrate with our existing ERP?", "answer": "Yes, we build bi-directional synchronization between Salesforce/Zoho CRM and SAP/Oracle ERP systems."}
                    ]
                },
                {
                    "title": "Cloud Architecture & Migration",
                    "slug": "cloud-solutions",
                    "category": "Cloud Services",
                    "order_index": 3,
                    "icon_name": "Cloud",
                    "short_description": "Secure, scalable, high-performance cloud infrastructure deployment on AWS, Microsoft Azure, and Oracle Cloud.",
                    "overview": "Migrate your enterprise workloads to modern multi-cloud environments with optimized cost governance, zero downtime, and bulletproof security.",
                    "problem_statement": "On-premise hardware constraints, unexpected server outages, and high capital expenditures limit enterprise scaling capability.",
                    "solution_description": "Swaraj Asia designs cloud architecture tailored for resilience, utilizing microservices, serverless computing, and continuous automated backups.",
                    "features": [
                        "AWS & Azure Lift-and-Shift / Re-architecting",
                        "Cloud FinOps & Cost Optimization Audits",
                        "DevOps Infrastructure as Code (Terraform, Kubernetes)",
                        "24/7 Security Operations & Compliance Governance"
                    ],
                    "benefits": [
                        "99.99% system uptime SLA assurance",
                        "35% operational cloud cost optimization",
                        "Instant automated auto-scaling during traffic peaks"
                    ],
                    "tech_stack": ["AWS", "Microsoft Azure", "Oracle Cloud", "Docker", "Kubernetes", "Terraform"],
                    "faqs": [
                        {"question": "Will cloud migration interrupt our live business operations?", "answer": "No. We utilize zero-downtime blue-green deployment strategies to guarantee uninterrupted business continuity."}
                    ]
                },
                {
                    "title": "Analytics, Data & BI",
                    "slug": "analytics-bi",
                    "category": "Business Intelligence",
                    "order_index": 4,
                    "icon_name": "BarChart3",
                    "short_description": "Turn raw enterprise data into actionable executive insights with Power BI, Tableau, and Snowflake data warehouses.",
                    "overview": "Empower boardrooms and operational managers with interactive data visualization, real-time telemetry, and predictive machine learning models.",
                    "problem_statement": "Decision-makers spend hours aggregating manual Excel spreadsheets with stale, error-prone insights.",
                    "solution_description": "We architect centralized enterprise data lakes and build interactive real-time BI dashboards customized for decision executives.",
                    "features": [
                        "Power BI & Tableau Dashboard Development",
                        "Automated ETL Pipelines & Data Warehousing",
                        "Predictive Sales & Financial Forecasting Models",
                        "Embedded Analytics for Web & Mobile Platforms"
                    ],
                    "benefits": [
                        "Instant executive reporting reduced from days to seconds",
                        "Single source of data truth across all business units",
                        "Enhanced data security and role-based access governance"
                    ],
                    "tech_stack": ["Power BI", "Tableau", "Snowflake", "Oracle Analytics", "Python ML"],
                    "faqs": [
                        {"question": "Can Power BI connect directly to legacy databases?", "answer": "Yes, we connect directly via custom SQL connectors and automated gateway refresh schedule tools."}
                    ]
                },
                {
                    "title": "Digital Transformation & Automation",
                    "slug": "digital-transformation",
                    "category": "Innovation",
                    "order_index": 5,
                    "icon_name": "Cpu",
                    "short_description": "Reinvent business operations through Robotic Process Automation (RPA), system integration, and workflow optimization.",
                    "overview": "Modernize legacy manual workflows with intelligent automation, API microservices integration, and custom software application development.",
                    "problem_statement": "Repetitive manual entry across multiple legacy applications causes human error and slows down business processing.",
                    "solution_description": "We streamline operations with custom software integrations, workflow engines, and automated bot processing.",
                    "features": [
                        "Robotic Process Automation (UiPath / Power Automate)",
                        "RESTful API & Middleware Microservice Integration",
                        "Custom Web & Enterprise Mobile App Engineering",
                        "Legacy Application Modernization"
                    ],
                    "benefits": [
                        "80% reduction in manual data processing tasks",
                        "Near zero error rate in document processing",
                        "Faster time-to-market for digital services"
                    ],
                    "tech_stack": ["React", "FastAPI", "Node.js", "Python", "UiPath", "PostgreSQL"],
                    "faqs": [
                        {"question": "What business processes are best suited for RPA?", "answer": "Invoice processing, customer onboarding, data reconciliation, and high-volume repetitive data tasks."}
                    ]
                },
                {
                    "title": "IT Consulting & Talent Services",
                    "slug": "it-staffing-consulting",
                    "category": "Talent Services",
                    "order_index": 6,
                    "icon_name": "UserCheck",
                    "short_description": "Access specialized domain experts, technical architects, and dedicated engineering teams to accelerate project delivery.",
                    "overview": "Scale your technical capabilities rapidly with Swaraj Asia's top 2% technology talent, specialized in SAP, Cloud, Data, and Full Stack development.",
                    "problem_statement": "Scarcity of elite domain talent delays strategic IT initiatives and increases hiring overhead costs.",
                    "solution_description": "We provide flexible staff augmentation, managed dedicated project teams, and enterprise IT strategy advisory.",
                    "features": [
                        "Dedicated SAP & ERP Technical Consultants",
                        "Cloud & Cyber Security Architects",
                        "Full Stack Software Development Squads",
                        "Direct Staff Augmentation & Project Management"
                    ],
                    "benefits": [
                        "Deploy senior technical experts within 5 business days",
                        "Flexible engagement models (Time & Material / Fixed Price)",
                        "Rigorous pre-vetted technical quality screening"
                    ],
                    "tech_stack": ["SAP", "AWS", "React", "Python", "Java", "DevOps"],
                    "faqs": [
                        {"question": "Can we hire talent on a project basis?", "answer": "Yes, we support short-term project consultancies, long-term staff augmentation, and full team handovers."}
                    ]
                }
            ]
            for s in services_data:
                db.add(Service(**s))
            print("[+] Seeded 6 Enterprise Services")

        # 3. Seed Case Studies
        if db.query(CaseStudy).count() == 0:
            case_studies_data = [
                {
                    "title": "Global SAP S/4HANA ERP Migration for Multi-Plant Manufacturer",
                    "slug": "sap-migration-manufacturing",
                    "industry": "Manufacturing",
                    "client_type": "Tier-1 Industrial Equipment Manufacturer",
                    "summary": "Unified 12 manufacturing facilities across Asia under a single SAP S/4HANA core, optimizing inventory turnover and financial reporting speed.",
                    "challenge": "Fragmented inventory tracking across multiple regional plants resulted in overstocking, 4-day delays in monthly financial closing, and frequent stockouts.",
                    "solution": "Swaraj Asia designed and deployed a consolidated SAP S/4HANA Cloud solution with real-time IoT plant machine monitoring and automated procurement integration.",
                    "results": ["42% Reduction in Inventory Holding Costs", "Same-Day Monthly Financial Closing", "99.8% Order Fulfillment Accuracy"],
                    "technologies_used": ["SAP S/4HANA", "Oracle DB", "Fiori UX", "AWS Cloud"]
                },
                {
                    "title": "Enterprise Cloud Data Warehouse & Power BI Telemetry for Retail Giant",
                    "slug": "cloud-bi-retail-analytics",
                    "industry": "Retail & E-Commerce",
                    "client_type": "Omni-Channel Retail Network (300+ Stores)",
                    "summary": "Engineered real-time POS and e-commerce analytical telemetry, delivering executive decision insights across 5 million daily customer transactions.",
                    "challenge": "Retail management lacked real-time store performance visibility, relying on delayed daily reports to adjust pricing and store inventory.",
                    "solution": "Built a high-throughput Snowflake data warehouse fed by Azure Event Hubs, with interactive Power BI executive dashboards.",
                    "results": ["5M+ Daily Transactions Processed", "3.2x Faster Demand Forecasting", "18% Increase in Sales Margin"],
                    "technologies_used": ["Power BI", "Snowflake", "Microsoft Azure", "Python ETL"]
                },
                {
                    "title": "Salesforce CRM & Omni-Channel Automation for Logistics Leader",
                    "slug": "salesforce-crm-logistics",
                    "industry": "Logistics & Supply Chain",
                    "client_type": "Cross-Border Cargo & Logistics Provider",
                    "summary": "Automated customer shipment inquiry workflows and consolidated international freight sales teams onto Salesforce CRM.",
                    "challenge": "Slow response time for custom freight quotes resulted in customer drop-offs and poor sales tracking.",
                    "solution": "Implemented Salesforce Service Cloud with automated freight calculator APIs and real-time WhatsApp shipment notification integrations.",
                    "results": ["65% Faster Quote Turnaround", "28% Rise in Customer Retention", "100% Tracking Transparency"],
                    "technologies_used": ["Salesforce", "Zoho API", "Node.js", "AWS Lambda"]
                }
            ]
            for cs in case_studies_data:
                db.add(CaseStudy(**cs))
            print("[+] Seeded 3 Case Studies")

        # 4. Seed Job Openings
        if db.query(JobPosition).count() == 0:
            jobs_data = [
                {
                    "title": "Senior SAP S/4HANA Solution Architect",
                    "department": "Enterprise ERP",
                    "location": "Hybrid / Bangalore",
                    "employment_type": "Full-Time",
                    "experience_level": "8+ Years",
                    "skills_required": ["SAP S/4HANA", "Fiori", "ABAP", "MM/SD/FI", "Solution Design"],
                    "description": "We are seeking an experienced SAP S/4HANA Architect to lead multi-country ERP implementations for enterprise manufacturing and distribution clients.",
                    "responsibilities": [
                        "Architect end-to-end SAP solution designs aligned with client business objectives",
                        "Lead technical workshop sessions with C-suite stakeholders",
                        "Oversee data migration, custom ABAP enhancements, and third-party API integrations"
                    ],
                    "qualifications": [
                        "Bachelor's / Master's degree in Computer Science or Management",
                        "SAP S/4HANA Certified Professional",
                        "Minimum 3 full lifecycle SAP S/4HANA implementations"
                    ]
                },
                {
                    "title": "Principal Cloud Infrastructure & DevOps Engineer",
                    "department": "Cloud & Operations",
                    "location": "Remote / India",
                    "employment_type": "Full-Time",
                    "experience_level": "5+ Years",
                    "skills_required": ["AWS", "Azure", "Terraform", "Kubernetes", "CI/CD", "FinOps"],
                    "description": "Join our Cloud Practice team to design, automate, and manage resilient AWS and Azure multi-cloud infrastructure environments.",
                    "responsibilities": [
                        "Write scalable Infrastructure as Code using Terraform and CloudFormation",
                        "Build automated CI/CD deployment pipelines for enterprise web applications",
                        "Enforce cloud security benchmarks and optimize infrastructure spend"
                    ],
                    "qualifications": [
                        "AWS Solutions Architect Certified / Azure Solutions Architect",
                        "Hands-on expertise with Docker, Kubernetes, and Linux administration",
                        "Strong scripting skills in Python or Bash"
                    ]
                },
                {
                    "title": "Senior Power BI & Data Analytics Consultant",
                    "department": "Business Intelligence",
                    "location": "Hybrid / Bangalore",
                    "employment_type": "Full-Time",
                    "experience_level": "4-6 Years",
                    "skills_required": ["Power BI", "DAX", "SQL", "Snowflake", "Data Modeling"],
                    "description": "Looking for a data storyteller with expert DAX and SQL skills to craft interactive executive analytics solutions for global enterprise clients.",
                    "responsibilities": [
                        "Design highly performant relational data models in Power BI and Snowflake",
                        "Write complex DAX measures and optimize SQL query execution time",
                        "Collaborate directly with business leaders to capture KPIs and reporting requirements"
                    ],
                    "qualifications": [
                        "Microsoft Certified: Data Analyst Associate (PL-300)",
                        "Strong proficiency in SQL data manipulation and DW concepts",
                        "Excellent communication and presentation skills"
                    ]
                }
            ]
            for j in jobs_data:
                db.add(JobPosition(**j))
            print("[+] Seeded 3 Job Openings")

        # 5. Seed Testimonials
        if db.query(Testimonial).count() == 0:
            testimonials_data = [
                {
                    "client_name": "Rajesh V. Sharma",
                    "position": "Chief Information Officer",
                    "company": "Apex Global Manufacturing",
                    "industry": "Manufacturing",
                    "rating": 5,
                    "company_logo_text": "APEX MFG",
                    "content": "Swaraj Asia Technologies transformed our legacy ERP operations into a unified SAP S/4HANA cloud ecosystem. Their technical rigor, speed of execution, and deep understanding of manufacturing processes were second to none."
                },
                {
                    "client_name": "Sarah Jenkins",
                    "position": "VP of Supply Chain & Technology",
                    "company": "Horizon OmniRetail Logistics",
                    "industry": "Retail & Supply Chain",
                    "rating": 5,
                    "company_logo_text": "HORIZON",
                    "content": "The Power BI analytics platform developed by Swaraj Asia gave our executive leadership live visibility across 300+ distribution nodes. We reduced demand forecasting cycles from days to minutes!"
                },
                {
                    "client_name": "Arun Kumar",
                    "position": "Managing Director",
                    "company": "Starlight Enterprise Solutions",
                    "industry": "Technology Services",
                    "rating": 5,
                    "company_logo_text": "STARLIGHT",
                    "content": "Swaraj Asia's IT consulting and dedicated engineering team bridged our critical skill gaps seamlessly. Their senior cloud architects helped us deliver our SaaS solution 2 months ahead of schedule."
                }
            ]
            for t in testimonials_data:
                db.add(Testimonial(**t))
            print("[+] Seeded 3 Testimonials")

        db.commit()
        print("====== DATABASE SEEDING COMPLETED SUCCESSFULLY ======")
    except Exception as e:
        db.rollback()
        print(f"[!] Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
