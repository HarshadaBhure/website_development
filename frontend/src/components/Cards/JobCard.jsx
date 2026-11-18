import React from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JobCard({ job, onApply, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="glass-card glass-card-pink rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white border border-slate-200/80 shadow-sm hover:border-brand-pink/50 transition-all"
    >
      <div className="space-y-3 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-pink">
            {job.department}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-brand-pink" />
            {job.location}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1">
            <Clock className="w-3 h-3 text-brand-pink" />
            {job.employment_type}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-slate-900">
          {job.title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
          {job.description}
        </p>

        {job.skills_required && job.skills_required.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {job.skills_required.map((skill, i) => (
              <span key={i} className="text-xs px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200 hover:border-brand-pink/40 hover:text-brand-pink transition-colors">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
        <button
          onClick={() => onApply(job)}
          className="btn-pink w-full md:w-auto hover:scale-105 transition-transform"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
