import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Database, Cloud, BarChart3, Users, ArrowRight } from 'lucide-react';
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

      <section className="py-20 bg-gradient-to-b from-brand-dark via-slate-900 to-brand-dark border-b border-slate-800/80 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full">
            Ecosystem & Alliances
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-3">
            Technology <span className="text-gradient-primary">Platforms & Partners</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            We hold certified technical capability across the world's leading enterprise enterprise software frameworks.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {techPlatforms.map((group, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-l-brand-royal pl-4">
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
                    className="glass-card rounded-2xl p-6 text-center border border-slate-800 hover:border-brand-royal/60 group"
                  >
                    <div className="font-display font-bold text-lg text-white group-hover:text-brand-cyan transition-colors mb-1">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-400 font-medium bg-slate-800/80 px-2.5 py-1 rounded-md inline-block">
                      {item.level}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 text-center space-y-4 max-w-3xl mx-auto">
            <h3 className="font-display text-xl font-bold text-white">Need an Expert Platform Assessment?</h3>
            <p className="text-slate-400 text-sm">
              Our architects will analyze your existing software stack and recommend the optimal technology path forward.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 rounded-xl bg-brand-royal text-white font-bold text-sm shadow-lg shadow-brand-royal/25"
            >
              Talk to Our Enterprise Architects
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
