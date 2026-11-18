import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/Common/SEO';
import StatCounter from '../../components/Common/StatCounter';

export default function About() {
  return (
    <>
      <SEO 
        title="About Us | Swaraj Asia Technologies" 
        description="Learn about Swaraj Asia Technologies — our mission, leadership, core values, and enterprise technology consulting expertise."
      />

      {/* Hero Header — White background with Cyan glow */}
      <section className="py-20 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/8 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="badge-cyan">
            Corporate Profile
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900">
            Architecting <span className="text-cyan-gradient">Digital Excellence</span> for Global Enterprises
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Swaraj Asia Technologies is a trusted enterprise IT consulting and digital transformation provider. We partner with organizations to modernize core operations, unlock data insights, and achieve measurable growth.
          </p>
        </div>
      </section>

      {/* Corporate Overview — White bg */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-display text-3xl font-bold text-slate-900">
                Who We Are &amp; What Drives Us
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Founded with a vision to deliver world-class enterprise technology solutions, Swaraj Asia combines deep domain mastery in ERP systems (SAP, Oracle, Odoo), Cloud Infrastructure (AWS, Azure), CRM solutions (Salesforce, Zoho), and Business Intelligence.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                We believe enterprise technology should be an accelerator of business strategy — not a bottleneck. Our team of certified solution architects, engineers, and domain consultants collaborate closely with leadership teams to engineer custom, resilient, and scalable digital solutions.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-brand-cyan/40 transition-all shadow-2xs">
                  <div className="text-brand-cyan font-bold text-lg font-display mb-1">100% Client-Centric</div>
                  <div className="text-slate-500 text-xs">Tailored enterprise engagement models</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-brand-cyan/40 transition-all shadow-2xs">
                  <div className="text-brand-cyan font-bold text-lg font-display mb-1">ISO Certified</div>
                  <div className="text-slate-500 text-xs">Rigorous security &amp; quality standards</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl p-8 border border-slate-200 bg-slate-50 space-y-6 shadow-xs">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-4">Our Driving Principles</h3>
                {[
                  { title: "Mission", desc: "Empower businesses through intelligent, seamless, and outcome-oriented technology implementations.", icon: Target },
                  { title: "Vision", desc: "To be globally recognized as the benchmark in enterprise ERP, Cloud, and Data Engineering consulting.", icon: Eye },
                  { title: "Core Values", desc: "Integrity, technical rigor, client obsession, and continuous innovation.", icon: Heart }
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-brand-cyan/40 transition-all shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-brand-cyan shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-slate-900 text-base mb-1">{item.title}</div>
                        <div className="text-slate-600 text-xs leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Banner — Soft off-white */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value="10" suffix="+" label="Years Experience" accent="cyan" />
            <StatCounter value="50" suffix="+" label="Enterprise Clients" accent="cyan" />
            <StatCounter value="100" suffix="%" label="Project SLA Adherence" accent="cyan" />
            <StatCounter value="24" suffix="/7" label="Global SLA Support" accent="cyan" />
          </div>
        </div>
      </section>

      {/* Why Choose Us — White bg */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="badge-cyan">
              Why Choose Swaraj Asia
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              The Swaraj Asia Advantage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Deep Domain Expertise", desc: "Decades of combined leadership experience across SAP, Cloud, Data, and CRM solutions." },
              { title: "End-to-End Delivery", desc: "From strategic discovery and architecture design to continuous post-implementation SLA support." },
              { title: "Agile & Scalable", desc: "Flexible staff augmentation and project delivery models tailored to enterprise timelines." },
              { title: "Data-Driven ROI", desc: "We focus on measurable outcomes: faster closing cycles, reduced inventory hold, higher uptime." }
            ].map((adv, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 hover:border-brand-cyan/50 hover:shadow-soft-cyan transition-all group">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-slate-900 font-bold font-display group-hover:bg-brand-cyan group-hover:text-slate-900 transition-all">
                  0{idx + 1}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg">{adv.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              to="/contact"
              className="btn-cyan hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
