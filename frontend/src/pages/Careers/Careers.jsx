import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, X, CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';
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

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-brand-dark via-slate-900 to-brand-dark border-b border-slate-800/80 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full">
            Join Our Team
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-3">
            Build the Future <span className="text-gradient-primary">With Us</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            We are looking for passionate technologists, SAP experts, cloud architects, and data engineers to solve high-impact enterprise challenges.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Cutting-Edge Projects", desc: "Work directly on enterprise SAP S/4HANA, AWS/Azure, and Power BI implementations for top global clients." },
              { title: "Continuous Growth", desc: "Access platform certification support, specialized workshops, and clear leadership pathways." },
              { title: "Flexible Culture", desc: "Collaborative remote & hybrid workspace options with competitive compensation packages." }
            ].map((culture, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-royal/20 flex items-center justify-center text-brand-cyan font-bold font-display">
                  0{i + 1}
                </div>
                <h3 className="font-display font-bold text-white text-lg">{culture.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{culture.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold text-white">Current Open Positions</h2>
            <span className="text-xs font-semibold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full">
              {jobs.length} Positions Available
            </span>
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-2xl text-slate-400">
              No active job openings currently available. Please check back soon or send your resume directly to <a href="mailto:sales@swarajasia.com" className="text-brand-cyan hover:underline">sales@swarajasia.com</a>.
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-brand-navy border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs font-semibold text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full uppercase">
                  {selectedJob.department}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-2">
                  Apply for {selectedJob.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{selectedJob.location} — {selectedJob.employment_type}</p>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="font-display text-xl font-bold text-white">Application Received!</h4>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                    Thank you for applying to Swaraj Asia Technologies. Our recruiting team will review your application and reach out shortly.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-2.5 rounded-xl bg-brand-royal text-white font-semibold text-sm"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-royal"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-royal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-royal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile / Portfolio URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-royal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Brief Cover Note / Relevant Experience</label>
                    <textarea
                      rows={3}
                      placeholder="Summarize your key technical experience..."
                      value={formData.cover_letter}
                      onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-royal"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-royal to-brand-cyan text-white font-bold text-sm shadow-lg shadow-brand-royal/20 hover:shadow-brand-royal/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
