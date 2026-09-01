import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CaseStudyCard({ caseStudy, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-7 flex flex-col justify-between group relative border-l-4 border-l-brand-royal"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-semibold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full uppercase tracking-wider">
            {caseStudy.industry}
          </span>
          <span className="text-xs text-slate-400 font-medium truncate max-w-[180px]">
            {caseStudy.client_type}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors leading-snug">
          {caseStudy.title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
          {caseStudy.summary}
        </p>

        {/* Highlighted Results */}
        {caseStudy.results && caseStudy.results.length > 0 && (
          <div className="bg-slate-900/80 rounded-xl p-4 mb-6 border border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Key Measured Outcomes</span>
            </div>
            {caseStudy.results.slice(0, 2).map((res, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-emerald-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{res}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {caseStudy.technologies_used?.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>
        <Link
          to={`/case-studies`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-royal group-hover:text-brand-cyan transition-colors shrink-0"
        >
          <span>View Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
