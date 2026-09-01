import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle,
  ExternalLink, Linkedin, Twitter, Facebook, ChevronRight,
  Users, Zap, ShieldCheck, Award, TrendingUp, Globe, ArrowRight
} from 'lucide-react';
import SEO from '../../components/Common/SEO';
import { submitContactInquiry } from '../../services/api';

const SERVICE_OPTIONS = [
  "ERP Solutions & Transformation",
  "CRM & Customer Experience",
  "Cloud Architecture & Migration",
  "Analytics, Data & BI",
  "Digital Transformation & Automation",
  "IT Consulting & Talent Services",
  "Other"
];

const WHY_CHOOSE = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "15+ Years Enterprise Experience",
    desc: "Trusted by Fortune 500s and growing enterprises across Asia and beyond."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Dedicated Solution Architects",
    desc: "Our experts work directly with your leadership team to craft tailored digital strategies."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Rapid Deployment",
    desc: "From discovery to go-live in record time. We eliminate delays and reduce friction."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Measurable ROI",
    desc: "Every engagement is tied to KPIs — we don't just deliver software, we deliver outcomes."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "ISO Certified & Compliant",
    desc: "Enterprise-grade security and compliance built into every solution we deliver."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Delivery, Local Expertise",
    desc: "On-shore and off-shore capabilities with deep understanding of Indian market dynamics."
  }
];

const PROCESS_STEPS = [
  { step: "01", title: "Schedule a Call", desc: "Fill the form below and one of our senior consultants will reach out within 24 hours." },
  { step: "02", title: "Discovery Session", desc: "We deep-dive into your business challenges, technology landscape, and goals." },
  { step: "03", title: "Custom Proposal", desc: "Receive a detailed, no-obligation proposal tailored to your requirements." },
  { step: "04", title: "Kickoff & Delivery", desc: "Project kicks off with a dedicated team and transparent milestone tracking." }
];

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    service_interested: 'ERP Solutions & Transformation',
    subject: '',
    message: '',
    consent: false
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.full_name.trim()) errors.full_name = "Full name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) errors.email = "Email address is required.";
    else if (!emailRegex.test(formData.email.trim())) errors.email = "Please enter a valid email address.";
    const phoneRegex = /^[\d\s()+-]{7,20}$/;
    if (!formData.phone.trim()) errors.phone = "Phone number is required.";
    else if (!phoneRegex.test(formData.phone.trim())) errors.phone = "Please enter a valid phone number.";
    if (!formData.subject.trim()) errors.subject = "Subject is required.";
    if (!formData.message.trim() || formData.message.trim().length < 10) errors.message = "Please enter a message (at least 10 characters).";
    if (!formData.consent) errors.consent = "You must agree to be contacted to submit your enquiry.";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      await submitContactInquiry({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || undefined,
        service_interested: formData.service_interested,
        subject: formData.subject,
        message: formData.message,
        source: "Contact Form"
      });
      setSubmitted(true);
      setFormData({
        full_name: '', email: '', phone: '', company: '',
        service_interested: 'ERP Solutions & Transformation',
        subject: '', message: '', consent: false
      });
      setValidationErrors({});
    } catch (err) {
      console.error("Failed to submit contact inquiry:", err);
      setApiError(err.response?.data?.detail || "Could not process your enquiry. Please verify your details or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-slate-800/60 border text-white text-sm placeholder:text-slate-500 focus:outline-none transition-colors ${
      validationErrors[field]
        ? 'border-rose-500/80 focus:border-rose-500'
        : 'border-slate-700 focus:border-brand-royal'
    }`;

  return (
    <>
      <SEO
        title="Contact Us | Swaraj Asia Technologies"
        description="Connect with Swaraj Asia Technologies enterprise consulting team for SAP ERP, Cloud Migration, Power BI Analytics, and Digital Engineering."
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-dark via-slate-900 to-[#0a1628]">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-royal/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-royal/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/25 px-4 py-2 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  Enterprise Consulting
                </span>
                <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-white leading-[1.1]">
                  Let's Build Your{' '}
                  <span className="text-gradient-primary">Digital Future</span>
                  {' '}Together
                </h1>
                <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                  Reach out to our solution architects for a confidential discussion about your enterprise technology transformation. 
                  No obligation — just clarity and a path forward.
                </p>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3">
                {['SAP Certified', 'ISO Compliant', '200+ Deployments', '15+ Years'].map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 border border-slate-700 px-3.5 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToForm}
                  className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-brand-royal to-brand-cyan text-white font-bold text-sm shadow-xl shadow-brand-royal/30 hover:shadow-brand-cyan/30 transition-all hover:scale-[1.03]"
                >
                  Talk to an Expert
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="tel:+918014502502"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-royal text-white font-semibold text-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-brand-cyan" />
                  +91 80145 02502
                </a>
              </div>

              {/* Quick contact strip */}
              <div className="flex flex-wrap gap-6 text-sm text-slate-400 pt-2 border-t border-slate-800">
                <a href="mailto:sales@swarajasia.com" className="flex items-center gap-2 hover:text-brand-cyan transition-colors">
                  <Mail className="w-4 h-4" /> sales@swarajasia.com
                </a>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Mon–Fri, 9AM–7PM IST
                </span>
              </div>
            </motion.div>

            {/* RIGHT — Stats / Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { value: "200+", label: "Enterprise Projects Delivered", color: "from-brand-royal/20 to-brand-royal/5" },
                { value: "98%", label: "Client Satisfaction Rate", color: "from-brand-cyan/20 to-brand-cyan/5" },
                { value: "15+", label: "Years of Industry Expertise", color: "from-purple-500/20 to-purple-500/5" },
                { value: "50+", label: "Technology Consultants", color: "from-emerald-500/20 to-emerald-500/5" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`glass-card rounded-2xl p-6 border border-slate-800 bg-gradient-to-br ${stat.color} flex flex-col justify-between min-h-[140px]`}
                >
                  <div className="font-display text-4xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-slate-300 text-sm leading-snug mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="py-24 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase">Why Partner With Us</span>
            <h2 className="font-display text-4xl font-extrabold text-white">
              What Makes Swaraj Asia <span className="text-gradient-primary">Different</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base">
              We don't just implement software — we engineer transformation that sticks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group glass-card rounded-2xl p-6 border border-slate-800 hover:border-brand-royal/50 transition-all hover:shadow-lg hover:shadow-brand-royal/10"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-royal/15 border border-brand-royal/30 flex items-center justify-center text-brand-cyan mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase">The Process</span>
            <h2 className="font-display text-4xl font-extrabold text-white">
              From First Call to <span className="text-gradient-primary">Go-Live</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative glass-card rounded-2xl p-6 border border-slate-800 text-center group"
              >
                {/* connector line */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-6 h-[2px] bg-gradient-to-r from-brand-royal/60 to-transparent z-10" />
                )}
                <div className="font-display text-5xl font-black text-brand-royal/20 mb-3 group-hover:text-brand-royal/40 transition-colors">
                  {s.step}
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-royal to-brand-cyan text-white font-bold text-sm shadow-xl shadow-brand-royal/25 hover:shadow-brand-cyan/20 transition-all hover:scale-[1.03]"
            >
              Get Started Today
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TALK TO AN EXPERT FORM ───────────────────────────────── */}
      <section ref={formRef} id="talk-to-expert" className="py-24 bg-gradient-to-b from-slate-950/80 via-slate-900 to-brand-dark scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            {/* LEFT — sticky info panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
              <div>
                <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">Talk to an Expert</span>
                <h2 className="font-display text-4xl font-extrabold text-white mt-2 leading-tight">
                  Ready to Transform<br />Your Enterprise?
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mt-4">
                  Our leadership and consulting teams collaborate directly with enterprise executives 
                  to engineer scalable, outcome-driven solutions. Let's start the conversation.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-2xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center text-brand-cyan shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Our Office</div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Swaraj+Asia+Technologies+Private+Limited+211+Leela+Grandeur+Pune+Solapur+Rd+Laxmi+Colony+Hadapsar+Pune+Maharashtra+412307"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm leading-relaxed text-slate-300 hover:text-brand-cyan transition-colors"
                    >
                      <span className="block font-semibold text-white">Swaraj Asia Technologies Private Limited</span>
                      211, Leela Grandeur, Pune - Solapur Rd<br />
                      Laxmi Colony, Hadapsar, Pune<br />
                      Maharashtra 412307, India
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center text-brand-cyan shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Email</div>
                    <a href="mailto:sales@swarajasia.com" className="text-white font-semibold hover:text-brand-cyan transition-colors">
                      sales@swarajasia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center text-brand-cyan shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Phone</div>
                    <a href="tel:+918014502502" className="text-white font-semibold hover:text-brand-cyan transition-colors">
                      +91 80145 02502
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center text-brand-cyan shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Business Hours</div>
                    <div className="text-white font-medium text-sm">Monday – Friday: 9:00 AM – 7:00 PM IST</div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Connect With Us</div>
                <div className="flex gap-3">
                  {[
                    { href: "https://linkedin.com", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
                    { href: "https://twitter.com", icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                    { href: "https://facebook.com", icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-royal hover:border-brand-royal transition-all"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-royal/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />

                <div className="relative">
                  <h3 className="font-display text-2xl font-bold text-white">Send an Enquiry</h3>
                  <p className="text-slate-400 text-sm mt-1 mb-6">
                    A senior enterprise consultant will respond within 24 hours.
                  </p>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-16 text-center space-y-4"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                      </div>
                      <h4 className="font-display text-2xl font-bold text-white">Enquiry Received!</h4>
                      <p className="text-slate-300 text-base leading-relaxed max-w-md mx-auto">
                        Thank you for reaching out to Swaraj Asia. Our team will get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-2 px-6 py-3 rounded-xl bg-brand-royal hover:bg-blue-600 text-white font-semibold text-sm shadow-lg transition-all"
                      >
                        Submit Another Enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {apiError && (
                        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{apiError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rahul Sharma"
                            value={formData.full_name}
                            onChange={(e) => { setFormData({ ...formData, full_name: e.target.value }); if (validationErrors.full_name) setValidationErrors({ ...validationErrors, full_name: null }); }}
                            className={inputClass('full_name')}
                          />
                          {validationErrors.full_name && <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.full_name}</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Business Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="rahul@company.com"
                            value={formData.email}
                            onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (validationErrors.email) setValidationErrors({ ...validationErrors, email: null }); }}
                            className={inputClass('email')}
                          />
                          {validationErrors.email && <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.email}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: null }); }}
                            className={inputClass('phone')}
                          />
                          {validationErrors.phone && <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.phone}</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company / Organization</label>
                          <input
                            type="text"
                            placeholder="Global Tech Pvt Ltd"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className={inputClass('company')}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Service Interested In</label>
                        <select
                          value={formData.service_interested}
                          onChange={(e) => setFormData({ ...formData, service_interested: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-royal transition-colors"
                        >
                          {SERVICE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subject *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Request for SAP S/4HANA Migration Proposal"
                          value={formData.subject}
                          onChange={(e) => { setFormData({ ...formData, subject: e.target.value }); if (validationErrors.subject) setValidationErrors({ ...validationErrors, subject: null }); }}
                          className={inputClass('subject')}
                        />
                        {validationErrors.subject && <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.subject}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Details / Message *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Describe your current business challenges or technology requirements..."
                          value={formData.message}
                          onChange={(e) => { setFormData({ ...formData, message: e.target.value }); if (validationErrors.message) setValidationErrors({ ...validationErrors, message: null }); }}
                          className={inputClass('message')}
                        />
                        {validationErrors.message && <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.message}</span>}
                      </div>

                      <div className="pt-1">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(e) => { setFormData({ ...formData, consent: e.target.checked }); if (validationErrors.consent) setValidationErrors({ ...validationErrors, consent: null }); }}
                            className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-brand-royal focus:ring-brand-royal"
                          />
                          <span className="text-xs text-slate-300 leading-relaxed">
                            I agree to be contacted by Swaraj Asia Technologies regarding my enquiry and consent to the processing of my data as per the privacy policy.
                          </span>
                        </label>
                        {validationErrors.consent && <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.consent}</span>}
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          id="contact-submit-btn"
                          disabled={submitting}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-royal via-blue-600 to-brand-cyan hover:from-brand-cyan hover:to-brand-royal text-white font-bold text-sm shadow-xl shadow-brand-royal/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
                        >
                          {submitting ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Talk to an Expert</span>
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
        </div>
      </section>

      {/* ── GOOGLE MAP ───────────────────────────────────────────── */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl border border-slate-800 overflow-hidden"
          >
            {/* Map header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center text-brand-cyan shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Swaraj Asia Technologies Private Limited</div>
                  <div className="text-slate-400 text-xs">211, Leela Grandeur, Hadapsar, Pune, Maharashtra 412307</div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Swaraj+Asia+Technologies+Private+Limited+211+Leela+Grandeur+Pune+Solapur+Rd+Laxmi+Colony+Hadapsar+Pune+Maharashtra+412307"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-brand-cyan hover:text-white border border-brand-cyan/30 hover:border-brand-cyan bg-brand-cyan/10 hover:bg-brand-cyan/20 px-3 py-1.5 rounded-lg transition-all font-medium shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open in Google Maps
              </a>
            </div>

            {/* Embedded Map */}
            <div className="relative w-full" style={{ height: '420px' }}>
              <iframe
                title="Swaraj Asia Technologies Private Limited - Office Location"
                src="https://maps.google.com/maps?q=Leela+Grandeur+211+Hadapsar+Pune+Maharashtra+412307&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.9) brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
