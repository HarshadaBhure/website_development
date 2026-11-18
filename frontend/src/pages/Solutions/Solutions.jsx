import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cloud, BarChart3, Users, Cpu, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/Common/SEO';

const solutionCategories = [
  {
    title: "ERP Transformation Solutions",
    icon: Database,
    description: "Consolidate multi-subsidiary financials, supply chain, and procurement into an intelligent SAP or Oracle digital core.",
    features: ["SAP S/4HANA Migration", "Oracle Financials Cloud", "Odoo Enterprise Customization", "Automated Compliance & Closing"]
  },
  {
    title: "Multi-Cloud Migration & FinOps",
    icon: Cloud,
    description: "Zero-downtime workload migration to AWS and Azure, complete with microservice containerization and cost governance.",
    features: ["Cloud FinOps Optimization", "Kubernetes & Docker Orchestration", "Infrastructure as Code (Terraform)", "24/7 Security SOC Monitoring"]
  },
  {
    title: "Business Intelligence & Telemetry",
    icon: BarChart3,
    description: "Transform raw transactional data into interactive executive reporting using Power BI, Tableau, and Snowflake data lakes.",
    features: ["Executive C-Suite Dashboards", "Snowflake Data Warehousing", "Automated ETL Pipelines", "Predictive Machine Learning"]
  },
  {
    title: "CRM & Omni-Channel Automation",
    icon: Users,
    description: "Streamline sales pipelines, lead scoring, and customer support desks on Salesforce, Zoho, and HubSpot platforms.",
    features: ["Salesforce Sales & Service Cloud", "Zoho CRM Customization", "Automated Lead Routing", "WhatsApp & Email API Integrations"]
  },
  {
    title: "Robotic Process Automation (RPA)",
    icon: Cpu,
    description: "Eliminate repetitive manual document entries with UiPath bot automation and enterprise REST middleware.",
    features: ["UiPath & Power Automate", "Invoice OCR Automation", "Legacy System API Connectors", "Near Zero Error Processing"]
  },
  {
    title: "Full Stack Digital Engineering",
    icon: Layers,
    description: "Custom web applications, microservices, and mobile enterprise software engineered with React, FastAPI, and Python.",
    features: ["React & Vite Architecture", "FastAPI & Python Microservices", "High Performance SQL / NoSQL", "Scalable Enterprise APIs"]
  }
];

export default function Solutions() {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Enterprise Solutions | Swaraj Asia Technologies" 
        description="Explore Swaraj Asia's tailored solutions: ERP Transformation, Cloud Migration, BI Telemetry, CRM Automation, and Digital Engineering."
      />

      <section className="py-20 bg-white border-b border-slate-200 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="badge-pink">
            Targeted Architecture
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3">
            Solutions Built Around <span className="text-pink-gradient">Your Business</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Enterprise-ready frameworks designed for rapid deployment, high resilience, and measurable return on investment.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionCategories.map((sol, idx) => {
              const IconComp = sol.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white rounded-2xl p-7 flex flex-col justify-between border border-slate-200 shadow-sm hover:border-brand-pink/50 hover:shadow-soft-pink group transition-all"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-brand-pink transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {sol.description}
                    </p>
                    <div className="space-y-2 pt-2">
                      {sol.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <button
                      onClick={() => navigate('/contact')}
                      className="btn-pink w-full py-2.5 hover:scale-[1.01] text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <span>Request Solution Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
