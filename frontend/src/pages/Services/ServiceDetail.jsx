import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, ShieldCheck, HelpCircle, Layers, Database, 
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
      <div className="max-w-7xl mx-auto px-4 py-20 bg-white">
        <LoadingSkeleton count={3} />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6 bg-white">
        <h2 className="text-2xl font-bold text-slate-900">Service Not Found</h2>
        <p className="text-slate-600">{error || "The requested service practice could not be located."}</p>
        <Link to="/services" className="btn-yellow inline-flex items-center gap-2">
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
      <section className="py-20 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5 text-brand-yellow stroke-[2.5]" />
            <span>All Services</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-100 border border-yellow-200 flex items-center justify-center text-slate-900 shadow-sm">
              <IconComp className="w-7 h-7" />
            </div>
            <div>
              <span className="badge-yellow">
                {service.category}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2">
                {service.title}
              </h1>
            </div>
          </div>

          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            {service.short_description}
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Overview & Problem / Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display text-2xl font-bold text-slate-900">Practice Overview</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {service.overview || service.short_description}
              </p>

              {service.problem_statement && (
                <div className="bg-rose-50/80 rounded-2xl p-6 border border-rose-200/80 space-y-2">
                  <h3 className="font-display font-bold text-rose-900 text-base">The Business Challenge</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{service.problem_statement}</p>
                </div>
              )}

              {service.solution_description && (
                <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200/80 space-y-2">
                  <h3 className="font-display font-bold text-emerald-900 text-base">The Swaraj Asia Solution</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{service.solution_description}</p>
                </div>
              )}
            </div>

            {/* Sidebar CTA & Platforms */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-6 shadow-sm">
                <h3 className="font-display font-bold text-slate-900 text-lg">Supported Technologies &amp; Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {service.tech_stack?.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-white text-slate-800 border border-slate-200 text-xs font-semibold hover:border-brand-yellow/60 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <h4 className="font-display font-bold text-slate-900 text-sm">Need a Solution Architecture Audit?</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Speak with our practice leads to evaluate your existing architecture and receive a tailored implementation plan.
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="btn-yellow w-full hover:scale-[1.02] transition-transform"
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
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-4 shadow-2xs">
                <h3 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-brand-yellow stroke-[2.5]" />
                  <span>Key Practice Capabilities</span>
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-yellow shrink-0 mt-1 stroke-[2.5]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.benefits && service.benefits.length > 0 && (
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-4 shadow-2xs">
                <h3 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Measurable Business Outcomes</span>
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((ben, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
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
              <h3 className="font-display text-2xl font-bold text-slate-900 text-center">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-2">
                    <h4 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-brand-yellow shrink-0 stroke-[2.5]" />
                      <span>{faq.question}</span>
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed pl-6">{faq.answer}</p>
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
