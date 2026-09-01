import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, Layers, Database, 
  Cloud, BarChart3, Users, Cpu, UserCheck, ArrowLeft, Zap
} from 'lucide-react';
import SEO from '../../components/Common/SEO';
import LoadingSkeleton from '../../components/Common/LoadingSkeleton';
import { fetchServiceBySlug } from '../../services/api';

const iconMap = {
  Database: Database,
  Users: Users,
  Cloud: Cloud,
  BarChart3: BarChart3,
  Cpu: Cpu,
  UserCheck: UserCheck,
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchServiceBySlug(slug);
        setService(data);
      } catch (err) {
        console.error("Failed to load service detail:", err);
        setError("Service details could not be found.");
      } finally {
        setLoading(false);
      }
    };
    loadService();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <LoadingSkeleton count={3} />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="text-2xl font-bold text-white">Service Not Found</h2>
        <p className="text-slate-400">{error || "The requested service practice could not be located."}</p>
        <Link to="/services" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-royal text-white font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  const IconComp = iconMap[service.icon_name] || Layers;

  return (
    <>
      <SEO 
        title={`${service.title} | Swaraj Asia Technologies`}
        description={service.short_description}
      />

      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-b from-brand-dark via-slate-900 to-brand-dark border-b border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link to="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-brand-cyan hover:text-white transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center text-brand-cyan">
              <IconComp className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full uppercase tracking-wider">
                {service.category}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
                {service.title}
              </h1>
            </div>
          </div>

          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
            {service.short_description}
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Overview & Problem / Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display text-2xl font-bold text-white">Practice Overview</h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {service.overview || service.short_description}
              </p>

              {service.problem_statement && (
                <div className="glass-card rounded-2xl p-6 border border-rose-500/30 bg-rose-950/10 space-y-2">
                  <h3 className="font-display font-bold text-rose-300 text-base">The Business Challenge</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{service.problem_statement}</p>
                </div>
              )}

              {service.solution_description && (
                <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/10 space-y-2">
                  <h3 className="font-display font-bold text-emerald-300 text-base">The Swaraj Asia Solution</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{service.solution_description}</p>
                </div>
              )}
            </div>

            {/* Sidebar CTA & Platforms */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6">
                <h3 className="font-display font-bold text-white text-lg">Supported Technologies & Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {service.tech_stack?.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-800 text-brand-cyan border border-slate-700 text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <h4 className="font-display font-bold text-white text-sm">Need a Solution Architecture Audit?</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Speak with our practice leads to evaluate your existing architecture and receive a tailored implementation plan.
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-royal to-brand-cyan text-white font-semibold text-sm shadow-lg shadow-brand-royal/20"
                  >
                    Request Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.features && service.features.length > 0 && (
              <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-4">
                <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-brand-cyan" />
                  <span>Key Practice Capabilities</span>
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-1" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.benefits && service.benefits.length > 0 && (
              <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-4">
                <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Measurable Business Outcomes</span>
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((ben, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* FAQs Section */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <h3 className="font-display text-2xl font-bold text-white text-center">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
                    <h4 className="font-display font-bold text-white text-base flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-brand-cyan shrink-0" />
                      <span>{faq.question}</span>
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed pl-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
