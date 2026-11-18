import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Users, Cloud, BarChart3, Cpu, UserCheck, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  Database: Database,
  Users: Users,
  Cloud: Cloud,
  BarChart3: BarChart3,
  Cpu: Cpu,
  UserCheck: UserCheck,
};

export default function ServiceCard({ service, index = 0 }) {
  const IconComponent = iconMap[service.icon_name] || Layers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card glass-card-yellow rounded-2xl p-7 flex flex-col justify-between group relative overflow-hidden bg-white border border-slate-200/80 shadow-sm"
    >
      {/* Soft Lime-Yellow ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full filter blur-2xl group-hover:bg-brand-yellow/20 transition-all duration-500" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-yellow-50 border border-yellow-200/80 flex items-center justify-center text-slate-800 group-hover:bg-brand-yellow group-hover:scale-110 transition-all duration-300 shadow-sm">
            <IconComponent className="w-7 h-7 stroke-[1.75]" />
          </div>
          <span className="badge-yellow">
            {service.category}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
          {service.title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {service.short_description}
        </p>

        {/* Tech Badges */}
        {service.tech_stack && service.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {service.tech_stack.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {tech}
              </span>
            ))}
            {service.tech_stack.length > 3 && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                +{service.tech_stack.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-slate-700 transition-colors"
        >
          <span>Explore Service Details</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-brand-yellow stroke-[2.5]" />
        </Link>
      </div>
    </motion.div>
  );
}
