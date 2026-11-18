import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle,
  ExternalLink, Globe2, Building2, Check, ArrowRight
} from 'lucide-react';
import SEO from '../../components/Common/SEO';
import { submitContactInquiry } from '../../services/api';

const SERVICE_OPTIONS = [
  "Oracle Application Implementation",
  "Oracle Application Optimization",
  "Oracle Application Support",
  "Oracle Extensions & Cloud Solutions",
  "Technology Talent Acquisition & Staffing",
  "Enterprise Architecture Consulting",
  "Other"
];

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Singapore",
  "Canada",
  "Australia",
  "Germany",
  "Other"
];

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    job_title: '',
    phone: '',
    country: 'India',
    interested_in: 'Oracle Application Implementation',
    message: '',
    consent: true
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
    if (!formData.name.trim()) errors.name = "Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Business email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid business email address.";
    }
    
    if (!formData.company.trim()) errors.company = "Company name is required.";
    if (!formData.job_title.trim()) errors.job_title = "Job title is required.";

    const phoneRegex = /^[\d\s()+-]{7,20}$/;
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (!formData.country.trim()) errors.country = "Country is required.";
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please share a brief description of your requirements (at least 10 characters).";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validateForm()) return;
    setSubmitting(true);

    try {
      // Package metadata into inquiry fields
      const inquiryPayload = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: `${formData.company} (${formData.job_title}, ${formData.country})`,
        service_interested: formData.interested_in,
        subject: `Inquiry: ${formData.interested_in} - ${formData.company}`,
        message: `Job Title: ${formData.job_title}\nCountry: ${formData.country}\nInterested In: ${formData.interested_in}\n\nProject Requirements:\n${formData.message}`,
        source: "Contact Page Lead Form"
      };

      await submitContactInquiry(inquiryPayload);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        job_title: '',
        phone: '',
        country: 'India',
        interested_in: 'Oracle Application Implementation',
        message: '',
        consent: true
      });
      setValidationErrors({});
    } catch (err) {
      console.error("Failed to submit contact inquiry:", err);
      setApiError(
        err.response?.data?.detail || 
        "Unable to send your inquiry. Please verify your details or email our team directly at sales@swarajasia.com."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-colors ${
      validationErrors[field]
        ? 'border-rose-500 focus:border-rose-500'
        : 'border-slate-200 focus:border-brand-cyan'
    }`;

  return (
    <>
      <SEO
        title="Contact Us | Swaraj Asia™ Technologies"
        description="Let's talk about your technology needs. Connect with Swaraj Asia for Oracle applications implementation, support, and technology staffing."
      />

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-400/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <span className="badge-cyan">
              Connect With Us
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Let's Talk About Your{' '}
              <span className="text-cyan-gradient">Technology Needs</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Tell us about your business requirements, and our team can help you explore the right technology services and solutions.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={scrollToForm}
                className="btn-pink hover:scale-105 transition-all shadow-md shadow-pink-500/20"
              >
                <span>Submit Your Requirements</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+918014503503"
                className="btn-outline flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-cyan" />
                <span>+91 80145 03503</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN LEAD GENERATION SECTION ─────────────────────────── */}
      <section ref={formRef} id="contact-form-section" className="py-20 lg:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* LEFT: Office Details & Verified Company Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="badge-pink">Direct Assistance</span>
                <h2 className="font-display text-3xl font-bold text-slate-900 mt-2">
                  Headquarters &amp; Global Contact
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Reach our enterprise delivery center in Pune or our international sales desk in Columbus. We respond to verified business inquiries within 24 hours.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-brand-pink flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      India Headquarters &amp; Development Center
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      Swaraj Asia™ Technologies Pvt. Ltd.
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed mt-1">
                      211, Leela Grandeur, Pune - Solapur Rd, Laxmi Colony, Hadapsar, Pune, Maharashtra 412307, India
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-brand-cyan flex items-center justify-center shrink-0">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      United States Sales Presence
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      Columbus, Ohio, USA
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed mt-1">
                      Enterprise Client Engagements &amp; Account Operations
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-pink" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Phone Number
                    </div>
                    <a
                      href="tel:+918014503503"
                      className="text-sm font-bold text-slate-900 hover:text-brand-pink transition-colors mt-0.5 block"
                    >
                      +91 80145 03503
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Inquiry Email
                    </div>
                    <a
                      href="mailto:sales@swarajasia.com"
                      className="text-sm font-bold text-slate-900 hover:text-brand-cyan transition-colors mt-0.5 block"
                    >
                      sales@swarajasia.com
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Business Hours: Monday &ndash; Friday, 9:00 AM &ndash; 7:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* RIGHT: B2B Lead Generation Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-xl">
                
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Share Your Requirements
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Please provide your business information below. Required fields are marked with an asterisk (*).
                  </p>
                </div>

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
                      Request Submitted Successfully
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
                      Thank you for contacting Swaraj Asia Technologies. Our enterprise solutions team has received your submission and will get in touch shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline text-xs mt-3"
                    >
                      Submit Another Inquiry
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

                    {/* Field 1: Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (validationErrors.name) setValidationErrors({ ...validationErrors, name: null });
                        }}
                        className={inputClass('name')}
                      />
                      {validationErrors.name && (
                        <span className="text-[11px] text-rose-500 mt-1 block">{validationErrors.name}</span>
                      )}
                    </div>

                    {/* Field 2 & 3: Business Email & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                          Business Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (validationErrors.email) setValidationErrors({ ...validationErrors, email: null });
                          }}
                          className={inputClass('email')}
                        />
                        {validationErrors.email && (
                          <span className="text-[11px] text-rose-500 mt-1 block">{validationErrors.email}</span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-company" className="block text-xs font-semibold text-slate-700 mb-1">
                          Company *
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          required
                          placeholder="Company name"
                          value={formData.company}
                          onChange={(e) => {
                            setFormData({ ...formData, company: e.target.value });
                            if (validationErrors.company) setValidationErrors({ ...validationErrors, company: null });
                          }}
                          className={inputClass('company')}
                        />
                        {validationErrors.company && (
                          <span className="text-[11px] text-rose-500 mt-1 block">{validationErrors.company}</span>
                        )}
                      </div>
                    </div>

                    {/* Field 4 & 5: Job Title & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-job-title" className="block text-xs font-semibold text-slate-700 mb-1">
                          Job Title *
                        </label>
                        <input
                          id="contact-job-title"
                          type="text"
                          required
                          placeholder="e.g. IT Director, VP Operations"
                          value={formData.job_title}
                          onChange={(e) => {
                            setFormData({ ...formData, job_title: e.target.value });
                            if (validationErrors.job_title) setValidationErrors({ ...validationErrors, job_title: null });
                          }}
                          className={inputClass('job_title')}
                        />
                        {validationErrors.job_title && (
                          <span className="text-[11px] text-rose-500 mt-1 block">{validationErrors.job_title}</span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: null });
                          }}
                          className={inputClass('phone')}
                        />
                        {validationErrors.phone && (
                          <span className="text-[11px] text-rose-500 mt-1 block">{validationErrors.phone}</span>
                        )}
                      </div>
                    </div>

                    {/* Field 6 & 7: Country & I Am Interested In */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-country" className="block text-xs font-semibold text-slate-700 mb-1">
                          Country *
                        </label>
                        <select
                          id="contact-country"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contact-interested-in" className="block text-xs font-semibold text-slate-700 mb-1">
                          I am interested in *
                        </label>
                        <select
                          id="contact-interested-in"
                          value={formData.interested_in}
                          onChange={(e) => setFormData({ ...formData, interested_in: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Field 8: Message / Project Details */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                        Requirements / Project Overview *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        placeholder="Tell us about your Oracle application landscape, timeline, or talent requirements..."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (validationErrors.message) setValidationErrors({ ...validationErrors, message: null });
                        }}
                        className={inputClass('message')}
                      />
                      {validationErrors.message && (
                        <span className="text-[11px] text-rose-500 mt-1 block">{validationErrors.message}</span>
                      )}
                    </div>

                    {/* Submit Button (Prominent Pink) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        id="contact-submit-btn"
                        disabled={submitting}
                        className="btn-pink w-full hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-md shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Submitting Request...
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Request</span>
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

      {/* ── GOOGLE MAP SECTION ───────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b border-slate-200 bg-white gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-100 text-brand-pink flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-900 font-bold text-sm">
                    Swaraj Asia™ Technologies Pvt. Ltd. — Pune Office
                  </div>
                  <div className="text-slate-500 text-xs">
                    211, Leela Grandeur, Hadapsar, Pune, Maharashtra 412307
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Swaraj+Asia+Technologies+Private+Limited+211+Leela+Grandeur+Pune+Solapur+Rd+Laxmi+Colony+Hadapsar+Pune+Maharashtra+412307"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-800 font-bold border border-slate-300 hover:border-slate-400 bg-slate-50 px-3.5 py-1.5 rounded-lg transition-all shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open in Google Maps
              </a>
            </div>

            <div className="relative w-full" style={{ height: '380px' }}>
              <iframe
                title="Swaraj Asia Technologies - Office Location"
                src="https://maps.google.com/maps?q=Leela+Grandeur+211+Hadapsar+Pune+Maharashtra+412307&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
