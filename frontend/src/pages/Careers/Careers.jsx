import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import SEO from '../../components/Common/SEO';
import JobCard from '../../components/Cards/JobCard';
import LoadingSkeleton from '../../components/Common/LoadingSkeleton';
import { fetchJobs, submitJobApplication } from '../../services/api';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Application Form State
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    linkedin_url: '',
    cover_letter: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        console.error("Failed to load jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setErrorMessage('');
    setFormData({ full_name: '', email: '', phone: '', linkedin_url: '', cover_letter: '' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    try {
      await submitJobApplication(selectedJob.id, formData);
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Failed to submit job application:", err);
      setErrorMessage(err.response?.data?.detail || "Application submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Careers | Swaraj Asia Technologies" 
        description="Join Swaraj Asia Technologies — Explore opportunities for SAP Solution Architects, Cloud Infrastructure Engineers, and Data Analytics Consultants."
      />

      {/* Hero Header */}
      <section className="py-20 bg-white border-b border-slate-200 text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-pink-400/8 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="badge-pink">
            Join Our Team
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3">
            Build the Future <span className="text-pink-gradient">With Us</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            We are looking for passionate technologists, SAP experts, cloud architects, and data engineers to solve high-impact enterprise challenges.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Cutting-Edge Projects", desc: "Work directly on enterprise SAP S/4HANA, AWS/Azure, and Power BI implementations for top global clients." },
              { title: "Continuous Growth", desc: "Access platform certification support, specialized workshops, and clear leadership pathways." },
              { title: "Flexible Culture", desc: "Collaborative remote & hybrid workspace options with competitive compensation packages." }
            ].map((culture, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xs hover:border-brand-pink/40 hover:shadow-soft-pink transition-all">
                <div className="w-10 h-10 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-brand-pink font-bold font-display">
                  0{i + 1}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg">{culture.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{culture.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold text-slate-900">Current Open Positions</h2>
            <span className="badge-pink">
              {jobs.length} Positions Available
            </span>
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-600">
              No active job openings currently available. Please check back soon or send your resume directly to{' '}
              <a href="mailto:sales@swarajasia.com" className="text-brand-pink font-bold hover:underline">sales@swarajasia.com</a>.
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job, idx) => (
                <JobCard key={job.id || idx} job={job} onApply={handleApplyClick} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl space-y-6"
            >
              {/* Pink accent strip at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-pink rounded-t-3xl" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="badge-pink">
                  {selectedJob.department}
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-900 mt-2">
                  Apply for {selectedJob.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{selectedJob.location} — {selectedJob.employment_type}</p>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="font-display text-xl font-bold text-slate-900">Application Received!</h4>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
                    Thank you for applying to Swaraj Asia Technologies. Our recruiting team will review your application and reach out shortly.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="btn-pink px-6 py-2.5 hover:scale-105 transition-all"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-pink transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-pink transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-pink transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile / Portfolio URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-pink transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Cover Note / Relevant Experience</label>
                    <textarea
                      rows={3}
                      placeholder="Summarize your key technical experience..."
                      value={formData.cover_letter}
                      onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-pink transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-pink w-full hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Job Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
