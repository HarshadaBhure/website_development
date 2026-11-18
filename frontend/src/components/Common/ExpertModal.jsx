import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
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

export default function ExpertModal({ isOpen, onClose }) {
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validate = () => {
    const e = {};
    if (!formData.full_name.trim()) e.full_name = 'Full name is required.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      e.email = 'Business email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      e.email = 'Valid business email is required.';
    }

    const phoneRegex = /^[\d\s()+-]{7,20}$/;
    if (!formData.phone.trim()) {
      e.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      e.phone = 'Valid phone number is required.';
    }

    if (!formData.company.trim()) e.company = 'Company name is required.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      e.message = 'Please provide brief requirements (at least 10 characters).';
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
        message: `Expert Consultation Modal Request:\nCompany: ${formData.company}\nService Area: ${formData.service_interested}\n\nRequirements:\n${formData.message}`,
        source: 'Expert Consultation Modal'
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
      console.error("Failed to submit expert consultation modal:", err);
      setApiError(
        err.response?.data?.detail || 
        "Could not submit your consultation request. Please verify your details or email sales@swarajasia.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const ic = (f) => `w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-colors ${
    errors[f] ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-brand-pink'
  }`;

  const upd = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Pink Accent Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-pink via-brand-cyan to-brand-yellow rounded-t-3xl" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Expert Consultation Modal"
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-brand-pink text-xs font-bold mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Executive Consultation</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Talk to an Expert
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Share your requirements to schedule a direct session with Swaraj Asia’s solution architects.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Enquiry Submitted Successfully
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                  Thank you for contacting Swaraj Asia. Your enquiry has been submitted successfully. Our team will get back to you.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => { setSubmitted(false); onClose(); }}
                    className="btn-pink px-6 py-2.5 text-xs shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
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
                    required
                    placeholder="e.g. John Doe"
                    value={formData.full_name}
                    onChange={(e) => upd('full_name', e.target.value)}
                    className={ic('full_name')}
                  />
                  {errors.full_name && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.full_name}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => upd('email', e.target.value)}
                      className={ic('email')}
                    />
                    {errors.email && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => upd('phone', e.target.value)}
                      className={ic('phone')}
                    />
                    {errors.phone && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your enterprise or organization"
                    value={formData.company}
                    onChange={(e) => upd('company', e.target.value)}
                    className={ic('company')}
                  />
                  {errors.company && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.company}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service or Area of Interest *
                  </label>
                  <select
                    value={formData.service_interested}
                    onChange={(e) => upd('service_interested', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-pink transition-colors"
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
                    required
                    rows={3}
                    placeholder="Describe your current technology stack, project scope, or talent requirements..."
                    value={formData.message}
                    onChange={(e) => upd('message', e.target.value)}
                    className={ic('message')}
                  />
                  {errors.message && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.message}</span>}
                </div>

                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => upd('consent', e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-pink focus:ring-brand-pink"
                    />
                    <span className="text-xs text-slate-600 leading-tight">
                      I agree to be contacted by Swaraj Asia Technologies regarding this consultation request.
                    </span>
                  </label>
                  {errors.consent && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.consent}</span>}
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
                        <span>Submit Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
