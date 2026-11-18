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

      <section className="py-20 bg-white border-b border-slate-200 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="badge-cyan">
            Vertical Focus
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3">
            Industries <span className="text-cyan-gradient">We Empower</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Deep domain knowledge tailored to solve the unique operational challenges of modern industry sectors.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
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
                  className="bg-white rounded-2xl p-7 flex flex-col justify-between group border border-slate-200 shadow-sm hover:border-brand-cyan/50 hover:shadow-soft-cyan transition-all"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-slate-900 transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-brand-cyan transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                  <div className="pt-6">
                    <button
                      onClick={() => navigate('/contact')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-brand-cyan transition-colors"
                    >
                      <span>Discuss Vertical Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-cyan stroke-[2.5]" />
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
