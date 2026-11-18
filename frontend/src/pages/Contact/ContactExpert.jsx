import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, CheckCircle2, AlertCircle, Send, ArrowRight,
  ShieldCheck, Clock, Users, Building2, MapPin, Mail, Phone, Globe2
} from 'lucide-react';
import SEO from '../../components/Common/SEO';
import { submitContactInquiry } from '../../services/api';

const SERVICE_OPTIONS = [
  "Oracle Cloud ERP Implementation",
  "Oracle Application Optimization & Performance",
  "Oracle 24/7 SLA Technical Support",
  "Oracle Extensions & Cloud Infrastructure (OCI)",
  "Technology Talent Acquisition & Staffing",
  "IT Staff Augmentation & Dedicated Squads",
  "Enterprise Architecture & Digital Roadmap",
  "Other Technology Requirements"
];

export default function ContactExpert() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    service_interested: SERVICE_OPTIONS[0],
    message: '',
    consent: true
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!formData.full_name.trim()) e.full_name = 'Full name is required.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      e.email = 'Business email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      e.email = 'Please enter a valid business email address.';
    }

    const phoneRegex = /^[\d\s()+-]{7,20}$/;
    if (!formData.phone.trim()) {
      e.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      e.phone = 'Please enter a valid phone number.';
    }

    if (!formData.company.trim()) e.company = 'Company name is required.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      e.message = 'Please provide a brief description of your requirements (at least 10 characters).';
    }
    if (!formData.consent) e.consent = 'You must agree to be contacted.';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setSubmitting(true);

    try {
      await submitContactInquiry({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service_interested: formData.service_interested,
        subject: `Expert Consultation: ${formData.service_interested} - ${formData.company}`,
        message: `Expert Consultation Request:\nCompany: ${formData.company}\nService Area: ${formData.service_interested}\n\nRequirements:\n${formData.message}`,
        source: 'Expert Consultation'
      });
      setSubmitted(true);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company: '',
        service_interested: SERVICE_OPTIONS[0],
        message: '',
        consent: true
      });
      setErrors({});
    } catch (err) {
      console.error("Failed to submit expert consultation request:", err);
      setApiError(
        err.response?.data?.detail || 
        "Could not submit your consultation request. Please verify your details or email sales@swarajasia.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const ic = (f) => `w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-colors ${
    errors[f] ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-brand-pink'
  }`;

  const upd = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  return (
    <>
      <SEO 
        title="Talk to an Expert | Swaraj Asia™ Technologies" 
        description="Schedule a confidential consultation with Swaraj Asia's senior Oracle and enterprise technology specialists."
      />

      {/* Header Strip */}
      <section className="relative py-16 lg:py-20 bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-pink-500/5 rounded-full filter blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="badge-pink">
              Executive Consultation
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Talk to a Technology{' '}
              <span className="text-pink-gradient">Expert</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Connect directly with our senior Oracle architects and technology talent advisors to explore solutions tailored to your operational landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Form & Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: What to expect */}
            <div className="lg:col-span-5 space-y-7 lg:sticky lg:top-24">
              <div>
                <span className="badge-cyan">Consultation Process</span>
                <h2 className="font-display text-3xl font-bold text-slate-900 mt-2">
                  What Happens Next?
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Our consultations are conducted by seasoned solution practitioners, not high-pressure sales scripts.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Requirements Review",
                    desc: "A principal consultant reviews your submitted business context and technology parameters."
                  },
                  {
                    step: "02",
                    title: "Technical Discovery Call",
                    desc: "A focused 30-minute discovery session exploring architecture options, timelines, and talent fits."
                  },
                  {
                    step: "03",
                    title: "Actionable Roadmap",
                    desc: "You receive an objective project breakdown, staffing timeline, or architectural recommendation."
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
                    <span className="font-display font-extrabold text-2xl text-brand-pink shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Reach */}
              <div className="pt-4 border-t border-slate-200 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-pink shrink-0" />
                  <a href="tel:+918014503503" className="hover:text-brand-pink font-semibold">+91 80145 03503</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                  <a href="mailto:sales@swarajasia.com" className="hover:text-brand-cyan font-semibold">sales@swarajasia.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Response SLA: Within 24 business hours</span>
                </div>
              </div>
            </div>

            {/* Right: Expert Consultation Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-xl">
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
                  Schedule Your Consultation
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Fill in your details below to connect with the Swaraj Asia team.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-display text-2xl font-bold text-slate-900">
                      Consultation Request Received
                    </h4>
                    <p className="text-slate-600 text-base leading-relaxed max-w-md mx-auto">
                      Thank you for contacting Swaraj Asia. Your enquiry has been submitted successfully. Our team will get back to you.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline text-xs mt-3"
                    >
                      Submit Another Consultation Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {apiError && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{apiError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. John Doe"
                        value={formData.full_name}
                        onChange={(e) => upd('full_name', e.target.value)}
                        className={ic('full_name')}
                      />
                      {errors.full_name && <span className="text-[11px] text-rose-500 mt-1 block">{errors.full_name}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Business Email *
                        </label>
                        <input 
                          type="email" 
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => upd('email', e.target.value)}
                          className={ic('email')}
                        />
                        {errors.email && <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input 
                          type="tel" 
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => upd('phone', e.target.value)}
                          className={ic('phone')}
                        />
                        {errors.phone && <span className="text-[11px] text-rose-500 mt-1 block">{errors.phone}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name *
                      </label>
                      <input 
                        type="text" 
                        placeholder="Your enterprise or organization"
                        value={formData.company}
                        onChange={(e) => upd('company', e.target.value)}
                        className={ic('company')}
                      />
                      {errors.company && <span className="text-[11px] text-rose-500 mt-1 block">{errors.company}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service or Area of Interest *
                      </label>
                      <select
                        value={formData.service_interested}
                        onChange={(e) => upd('service_interested', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-pink transition-colors"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Brief Description of Requirements *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Summarize your project goals, current technology stack, or specific talent needs..."
                        value={formData.message}
                        onChange={(e) => upd('message', e.target.value)}
                        className={ic('message')}
                      />
                      {errors.message && <span className="text-[11px] text-rose-500 mt-1 block">{errors.message}</span>}
                    </div>

                    <div>
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input 
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => upd('consent', e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-pink focus:ring-brand-pink"
                        />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          I agree to be contacted by Swaraj Asia Technologies regarding this consultation request.
                        </span>
                      </label>
                      {errors.consent && <span className="text-[11px] text-rose-500 mt-1 block">{errors.consent}</span>}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-pink w-full hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-md shadow-pink-500/25 disabled:opacity-50"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            <span>Submitting Consultation Request...</span>
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Schedule Consultation</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
