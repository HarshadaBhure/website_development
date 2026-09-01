import React from 'react';
import { motion } from 'framer-motion';
import { Factory, ShoppingBag, Stethoscope, Truck, Building, GraduationCap, DollarSign, Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/Common/SEO';

const industriesList = [
  { name: "Manufacturing & Industrial", icon: Factory, desc: "IoT plant tracking, SAP S/4HANA ERP consolidation, real-time inventory management, and automated supply chain telemetry." },
  { name: "Retail & E-Commerce", icon: ShoppingBag, desc: "Omni-channel POS integrations, real-time inventory syncing, Power BI demand forecasting, and customer analytics." },
  { name: "Healthcare & Life Sciences", icon: Stethoscope, desc: "HIPAA-compliant data architecture, hospital ERP optimization, electronic health records integration, and patient telemetry." },
  { name: "Logistics & Supply Chain", icon: Truck, desc: "Fleet tracking, Salesforce logistics quote automation, warehouse management systems, and automated EDI middleware." },
  { name: "Finance & Banking", icon: DollarSign, desc: "High-security financial reporting, automated regulatory compliance, cloud FinOps, and fraud detection analytics." },
  { name: "Education & Public Sector", icon: GraduationCap, desc: "University ERP systems, student information portals, automated fee collection, and digital campus analytics." },
  { name: "Professional Services", icon: Briefcase, desc: "Resource utilization tracking, automated project invoicing, Zoho/Salesforce CRM, and business intelligence." },
  { name: "Wholesale & Distribution", icon: Building, desc: "Multi-warehouse stock control, automated order dispatch, supplier portals, and multi-currency accounting." },
];

export default function Industries() {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Industries We Serve | Swaraj Asia Technologies" 
        description="Specialized enterprise IT solutions for Manufacturing, Retail, Healthcare, Logistics, Finance, Education, and Professional Services."
      />

      <section className="py-20 bg-gradient-to-b from-brand-dark via-slate-900 to-brand-dark border-b border-slate-800/80 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full">
            Vertical Focus
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-3">
            Industries <span className="text-gradient-primary">We Empower</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Deep domain knowledge tailored to solve the unique operational challenges of modern industry sectors.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industriesList.map((ind, idx) => {
              const IconComp = ind.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="glass-card rounded-2xl p-7 flex flex-col justify-between group border border-slate-800 hover:border-brand-royal/50"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-navy border border-slate-700 flex items-center justify-center text-brand-cyan group-hover:bg-brand-royal group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                  <div className="pt-6">
                    <button
                      onClick={() => navigate('/contact')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:text-white transition-colors"
                    >
                      <span>Discuss Vertical Case Study</span>
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
