import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, CheckCircle2, Send, AlertCircle, ArrowRight,
  Briefcase, MapPin, Clock, Star, Heart, Zap, BookOpen
} from 'lucide-react';
import { submitContactInquiry, fetchJobs } from '../../services/api';

const CULTURES = [
  { icon: <Zap className="w-5 h-5" />, title: "High-Impact Projects", desc: "Work directly on SAP S/4HANA, AWS/Azure, and Power BI deployments for enterprise clients." },
  { icon: <BookOpen className="w-5 h-5" />, title: "Continuous Learning", desc: "Platform certifications, workshops, and leadership development paths." },
  { icon: <Heart className="w-5 h-5" />, title: "Collaborative Culture", desc: "Flexible remote and hybrid work options with competitive packages." },
  { icon: <Star className="w-5 h-5" />, title: "Recognition & Growth", desc: "Clear career pathways and performance-based progression." },
];

export default function ContactCandidates() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '', email: '', phone: '', company: '',
    service_interested: 'Career Opportunity', subject: '', message: '', consent: false
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    fetchJobs().then(setJobs).catch(() => {}).finally(() => setLoadingJobs(false));
  }, []);

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
      await submitContactInquiry({ ...formData, source: 'For Candidates' });
      setSubmitted(true);
    } catch (err) {
      setApiError(err.response?.data?.detail || 'Submission failed. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const ic = (f) => `w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-colors ${errors[f] ? 'border-rose-500' : 'border-slate-200 focus:border-brand-cyan'}`;
  const upd = (field, val) => { setFormData(p => ({ ...p, [field]: val })); setErrors(p => ({ ...p, [field]: null })); };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-brand-cyan">
                <Users className="w-6 h-6" />
              </div>
              <span className="badge-cyan">For Candidates</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-5">
              Build Your Career<br />
              <span className="text-cyan-gradient">With Swaraj Asia</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mb-8">
              Join a team of enterprise technology leaders. We're looking for passionate SAP architects, cloud engineers, data scientists, and consultants who want to make a real impact.
            </p>
            <div className="flex flex-wrap gap-3">
              {['SAP Experts', 'Cloud Engineers', 'BI Consultants', 'Remote/Hybrid'].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl font-extrabold text-slate-900">Why Join <span className="text-cyan-gradient">Our Team</span></h2>
            <p className="text-slate-600 text-sm mt-3 max-w-xl mx-auto">We invest in our people as much as we invest in our clients.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CULTURES.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-brand-cyan/50 hover:shadow-soft-cyan transition-all group text-center">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-brand-cyan mx-auto mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="font-bold text-slate-900 text-sm mb-1">{item.title}</div>
                <div className="text-slate-600 text-xs leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      {!loadingJobs && jobs.length > 0 && (
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
              <h2 className="font-display text-3xl font-bold text-slate-900">Current <span className="text-cyan-gradient">Open Positions</span></h2>
              <p className="text-slate-600 text-sm mt-2">{jobs.length} position{jobs.length !== 1 ? 's' : ''} available</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job, i) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand-cyan/50 shadow-xs transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-base">{job.title}</div>
                      <div className="text-brand-cyan text-xs font-semibold mt-0.5">{job.department}</div>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full uppercase">Hiring</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-cyan" />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-cyan" />{job.employment_type}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-brand-cyan" />{job.experience_level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Candidate Enquiry Form */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <div>
                <span className="badge-cyan">Candidate Enquiry</span>
                <h2 className="font-display text-4xl font-extrabold text-slate-900 mt-2 leading-tight">Ready to Join<br />Our Team?</h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Fill the form below and our HR team will review your profile and reach out with suitable opportunities.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-xs">
                <div className="text-slate-900 font-semibold text-sm">Direct Contact for Candidates</div>
                <a href="mailto:sales@swarajasia.com" className="text-brand-cyan text-sm hover:underline block font-semibold">sales@swarajasia.com</a>
                <a href="tel:+918014503503" className="text-slate-700 text-sm hover:text-brand-cyan transition-colors block font-medium">+91 80145 03503</a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md relative overflow-hidden">
                <div className="relative">
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">Candidate Enquiry Form</h3>
                  <p className="text-slate-600 text-sm mb-7">Our HR team will respond within 48 hours.</p>

                  {submitted ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-14 text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                      </div>
                      <h4 className="font-display text-2xl font-bold text-slate-900">Application Received!</h4>
                      <p className="text-slate-600 text-sm max-w-sm mx-auto">Thank you for your interest! Our HR team will review your profile and get back to you.</p>
                      <button onClick={() => setSubmitted(false)} className="btn-cyan px-6 py-3 hover:scale-105 transition-all">Submit Another</button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {apiError && <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" /><span>{apiError}</span></div>}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                          <input type="text" placeholder="Your Name" value={formData.full_name} onChange={(e) => upd('full_name', e.target.value)} className={ic('full_name')} />
                          {errors.full_name && <span className="text-[11px] text-rose-500 mt-1 block">{errors.full_name}</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
                          <input type="email" placeholder="you@email.com" value={formData.email} onChange={(e) => upd('email', e.target.value)} className={ic('email')} />
                          {errors.email && <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number *</label>
                          <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => upd('phone', e.target.value)} className={ic('phone')} />
                          {errors.phone && <span className="text-[11px] text-rose-500 mt-1 block">{errors.phone}</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Company (optional)</label>
                          <input type="text" placeholder="Current Employer" value={formData.company} onChange={(e) => upd('company', e.target.value)} className={ic('company')} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Role / Position Interested In *</label>
                        <input type="text" placeholder="e.g. SAP FICO Consultant, Cloud Architect" value={formData.subject} onChange={(e) => upd('subject', e.target.value)} className={ic('subject')} />
                        {errors.subject && <span className="text-[11px] text-rose-500 mt-1 block">{errors.subject}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">About You / Key Skills *</label>
                        <textarea rows={4} placeholder="Briefly describe your experience, skills, and what you're looking for..." value={formData.message} onChange={(e) => upd('message', e.target.value)} className={ic('message')} />
                        {errors.message && <span className="text-[11px] text-rose-500 mt-1 block">{errors.message}</span>}
                      </div>
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={formData.consent} onChange={(e) => upd('consent', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-cyan focus:ring-brand-cyan" />
                          <span className="text-xs text-slate-600 leading-relaxed">I agree to be contacted by Swaraj Asia Technologies regarding career opportunities.</span>
                        </label>
                        {errors.consent && <span className="text-[11px] text-rose-500 mt-1 block">{errors.consent}</span>}
                      </div>
                      <button type="submit" disabled={submitting}
                        className="btn-cyan w-full hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                        {submitting
                          ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />Submitting...</span>
                          : <><Send className="w-4 h-4 text-slate-900" /><span>Submit Candidate Enquiry</span><ArrowRight className="w-4 h-4 text-slate-900" /></>}
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
