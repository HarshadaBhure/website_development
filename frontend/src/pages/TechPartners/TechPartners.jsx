import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/Common/SEO';

const techPlatforms = [
  { category: "ERP Platforms", items: [{ name: "SAP S/4HANA", level: "Enterprise Core" }, { name: "SAP Business One", level: "SME Suite" }, { name: "Oracle ERP Cloud", level: "Financials Suite" }, { name: "Odoo ERP", level: "Modular ERP" }, { name: "Zoho Enterprise", level: "Business Suite" }] },
  { category: "Cloud Infrastructure", items: [{ name: "Amazon Web Services (AWS)", level: "Premier Cloud" }, { name: "Microsoft Azure", level: "Cloud Platform" }, { name: "Oracle Cloud (OCI)", level: "Infrastructure" }, { name: "Docker & Kubernetes", level: "Containerization" }, { name: "Terraform", level: "DevOps IaC" }] },
  { category: "Analytics & Data", items: [{ name: "Microsoft Power BI", level: "Analytics Leader" }, { name: "Tableau Enterprise", level: "Data Viz" }, { name: "Snowflake", level: "Data Warehouse" }, { name: "Oracle Analytics", level: "BI Engine" }, { name: "Python ML Stack", level: "Predictive AI" }] },
  { category: "CRM & Automation", items: [{ name: "Salesforce Cloud", level: "Sales & Service" }, { name: "Zoho CRM", level: "Omni-Channel" }, { name: "HubSpot Enterprise", level: "Inbound CRM" }, { name: "UiPath RPA", level: "Automation Bot" }, { name: "Microsoft Power Automate", level: "Flow Engine" }] },
];

export default function TechPartners() {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Technologies & Partners | Swaraj Asia Technologies" 
        description="Explore Swaraj Asia's global technology ecosystem: SAP, Oracle, Microsoft Azure, AWS, Salesforce, Zoho, Odoo, and Power BI."
      />

      <section className="py-20 bg-white border-b border-slate-200 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="badge-yellow">
            Ecosystem & Alliances
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3">
            Technology <span className="text-yellow-gradient">Platforms & Partners</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We hold certified technical capability across the world's leading enterprise enterprise software frameworks.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {techPlatforms.map((group, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-slate-900 border-l-4 border-l-brand-yellow pl-4">
                {group.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {group.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm hover:border-brand-yellow/60 group transition-all"
                  >
                    <div className="font-display font-bold text-lg text-slate-900 group-hover:text-slate-800 transition-colors mb-1">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-1 rounded-md inline-block">
                      {item.level}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 text-center space-y-4 max-w-3xl mx-auto shadow-sm">
            <h3 className="font-display text-xl font-bold text-slate-900">Need an Expert Platform Assessment?</h3>
            <p className="text-slate-600 text-sm">
              Our architects will analyze your existing software stack and recommend the optimal technology path forward.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="btn-yellow px-6 py-3 hover:scale-105 transition-all text-sm font-bold"
            >
              Talk to Our Enterprise Architects
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
