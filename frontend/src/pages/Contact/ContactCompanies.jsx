import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2, CheckCircle2, Send, AlertCircle, ArrowRight,
  MapPin, Mail, Phone, Globe, TrendingUp, ShieldCheck, Award, Users, Zap
} from 'lucide-react';
import { submitContactInquiry } from '../../services/api';

const SERVICE_OPTIONS = [
  "ERP Solutions & Transformation (SAP/Oracle/Odoo)",
  "CRM & Customer Experience (Salesforce/Zoho)",
  "Cloud Architecture & Migration (AWS/Azure)",
  "Analytics, Data & Business Intelligence",
  "Digital Transformation & Automation",
  "IT Staff Augmentation & Consulting",
  "End-to-end Digital Roadmap",
  "Other / Not Sure Yet"
];

const WHY_US = [
  { icon: <Award className="w-5 h-5" />, title: "15+ Years Experience", desc: "Proven enterprise delivery across SAP, Cloud, and Digital." },
  { icon: <Users className="w-5 h-5" />, title: "Dedicated Architects", desc: "Solution architects embedded directly in your team." },
  { icon: <Zap className="w-5 h-5" />, title: "Fast Time-to-Value", desc: "From discovery to go-live faster than industry average." },
  { icon: <TrendingUp className="w-5 h-5" />, title: "ROI-Focused Delivery", desc: "Every engagement tied to measurable business outcomes." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "ISO Certified", desc: "Enterprise-grade security and compliance built-in." },
  { icon: <Globe className="w-5 h-5" />, title: "Global Delivery", desc: "On-shore and off-shore capabilities across Asia and beyond." },
];

export default function ContactCompanies() {
  const [formData, setFormData] = useState({
    full_name: '', email: '', phone: '', company: '',
    service_interested: SERVICE_OPTIONS[0], subject: '', message: '', consent: false
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!formData.full_name.trim()) e.full_name = 'Full name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email is required.';
    if (!formData.phone.trim()) e.phone = 'Phone number is required.';
    if (!formData.subject.trim()) e.subject = 'Subject is required.';
    if (formData.message.trim().length < 10) e.message = 'Please add a message (at least 10 characters).';
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
      await submitContactInquiry({ ...formData, source: 'For Companies' });
      setSubmitted(true);
    } catch (err) {
      setApiError(err.response?.data?.detail || 'Could not submit your enquiry. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const ic = (f) => `w-full px-4 py-3 rounded-xl bg-slate-800/60 border text-white text-sm placeholder:text-slate-500 focus:outline-none transition-colors ${errors[f] ? 'border-rose-500/80' : 'border-slate-700 focus:border-brand-royal'}`;
  const upd = (field, val) => { setFormData(p => ({ ...p, [field]: val })); setErrors(p => ({ ...p, [field]: null })); };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-brand-dark via-slate-900 to-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-royal/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-cyan/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center text-brand-cyan">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/25 px-3.5 py-1.5 rounded-full">For Companies</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] mb-5">
              Enterprise Solutions<br />
              <span className="text-gradient-primary">Tailored for You</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-8">
              Connect with our solution architects for a confidential discussion about your ERP, Cloud, CRM, or Digital Transformation challenges. No obligation — just clarity.
            </p>
            <div className="flex flex-wrap gap-3">
              {['SAP Certified', 'ISO Compliant', '200+ Deployments', '15+ Years'].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 border border-slate-700 px-3.5 py-1.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl font-extrabold text-white">Why Companies Choose <span className="text-gradient-primary">Swaraj Asia</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-brand-royal/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-brand-royal/15 border border-brand-royal/30 flex items-center justify-center text-brand-cyan mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 bg-gradient-to-b from-slate-950/80 to-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            {/* Left Info */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-7">
              <div>
                <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">Business Enquiry</span>
                <h2 className="font-display text-4xl font-extrabold text-white mt-2 leading-tight">Start the<br />Conversation</h2>
                <p className="text-slate-300 text-sm leading-relaxed mt-3">Our senior consultants respond within 24 hours — with actionable insights, not just a sales pitch.</p>
              </div>
              {[
                { icon: <MapPin className="w-5 h-5" />, label: 'Office', content: '211, Leela Grandeur, Hadapsar\nPune, Maharashtra 412307' },
                { icon: <Mail className="w-5 h-5" />, label: 'Email', content: 'sales@swarajasia.com', href: 'mailto:sales@swarajasia.com' },
                { icon: <Phone className="w-5 h-5" />, label: 'Phone', content: '+91 80145 02502', href: 'tel:+918014502502' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center text-brand-cyan shrink-0">{c.icon}</div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="text-white font-semibold text-sm hover:text-brand-cyan transition-colors">{c.content}</a>
                    ) : (
                      <div className="text-white font-medium text-sm whitespace-pre-line">{c.content}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-royal/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative">
                  <h3 className="font-display text-2xl font-bold text-white mb-1">Business Enquiry Form</h3>
                  <p className="text-slate-400 text-sm mb-7">A senior consultant will respond within 24 business hours.</p>

                  {submitted ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-14 text-center space-y-4">
                      <div className="w-18 h-18 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto w-20 h-20">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                      </div>
                      <h4 className="font-display text-2xl font-bold text-white">Enquiry Received!</h4>
                      <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">Thank you for reaching out. Our enterprise team will contact you within 24 hours.</p>
                      <button onClick={() => setSubmitted(false)} className="px-6 py-3 rounded-xl bg-brand-royal text-white font-semibold text-sm shadow-lg transition-all hover:bg-blue-600">
                        Submit Another Enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {apiError && (
                        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" /><span>{apiError}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                          <input type="text" placeholder="Rahul Sharma" value={formData.full_name} onChange={(e) => upd('full_name', e.target.value)} className={ic('full_name')} />
                          {errors.full_name && <span className="text-[11px] text-rose-400 mt-1 block">{errors.full_name}</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Business Email *</label>
                          <input type="email" placeholder="rahul@company.com" value={formData.email} onChange={(e) => upd('email', e.target.value)} className={ic('email')} />
                          {errors.email && <span className="text-[11px] text-rose-400 mt-1 block">{errors.email}</span>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number *</label>
                          <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => upd('phone', e.target.value)} className={ic('phone')} />
                          {errors.phone && <span className="text-[11px] text-rose-400 mt-1 block">{errors.phone}</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company Name</label>
                          <input type="text" placeholder="Your Company Pvt Ltd" value={formData.company} onChange={(e) => upd('company', e.target.value)} className={ic('company')} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Service / Solution Area</label>
                        <select value={formData.service_interested} onChange={(e) => upd('service_interested', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-royal transition-colors">
                          {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subject *</label>
                        <input type="text" placeholder="e.g. SAP S/4HANA Implementation Enquiry" value={formData.subject} onChange={(e) => upd('subject', e.target.value)} className={ic('subject')} />
                        {errors.subject && <span className="text-[11px] text-rose-400 mt-1 block">{errors.subject}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message / Requirements *</label>
                        <textarea rows={4} placeholder="Describe your current challenge or requirement..." value={formData.message} onChange={(e) => upd('message', e.target.value)} className={ic('message')} />
                        {errors.message && <span className="text-[11px] text-rose-400 mt-1 block">{errors.message}</span>}
                      </div>
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={formData.consent} onChange={(e) => upd('consent', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-brand-royal focus:ring-brand-royal" />
                          <span className="text-xs text-slate-300 leading-relaxed">I agree to be contacted by Swaraj Asia Technologies regarding my enquiry and consent to data processing as per the privacy policy.</span>
                        </label>
                        {errors.consent && <span className="text-[11px] text-rose-400 mt-1 block">{errors.consent}</span>}
                      </div>
                      <button type="submit" disabled={submitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-royal via-blue-600 to-brand-cyan text-white font-bold text-sm shadow-xl shadow-brand-royal/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01]">
                        {submitting ? (
                          <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</span>
                        ) : <><Send className="w-4 h-4" /><span>Send Business Enquiry</span><ArrowRight className="w-4 h-4" /></>}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
