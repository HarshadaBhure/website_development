import React from 'react';
import { MapPin, Briefcase, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JobCard({ job, onApply, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-brand-royal/40"
    >
      <div className="space-y-3 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-royal/10 text-brand-royal border border-brand-royal/20">
            {job.department}
          </span>
          <span className="px-2.5 py-0.5 rounded text-xs bg-slate-800 text-slate-300 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-brand-cyan" />
            {job.location}
          </span>
          <span className="px-2.5 py-0.5 rounded text-xs bg-slate-800 text-slate-300 flex items-center gap-1">
            <Clock className="w-3 h-3 text-brand-cyan" />
            {job.employment_type}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-white">
          {job.title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
          {job.description}
        </p>

        {job.skills_required && job.skills_required.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {job.skills_required.map((skill, i) => (
              <span key={i} className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
        <button
          onClick={() => onApply(job)}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-royal to-blue-600 hover:from-blue-600 hover:to-brand-royal text-white font-semibold text-sm shadow-md shadow-brand-royal/20 transition-all transform hover:-translate-y-0.5"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
