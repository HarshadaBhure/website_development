import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Users, Cloud, BarChart3, Cpu, UserCheck, ArrowRight, Layers, Shield, Zap } from 'lucide-react';
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
      className="glass-card rounded-2xl p-7 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-royal/10 rounded-full filter blur-2xl group-hover:bg-brand-cyan/20 transition-all duration-500"></div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-navy border border-slate-700/80 flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:border-brand-royal/60 group-hover:bg-brand-royal/20 transition-all duration-300 shadow-inner">
            <IconComponent className="w-7 h-7 stroke-[1.75]" />
          </div>
          <span className="text-[11px] font-semibold tracking-wider text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full uppercase">
            {service.category}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
          {service.title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
          {service.short_description}
        </p>

        {/* Tech Badges */}
        {service.tech_stack && service.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {service.tech_stack.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                {tech}
              </span>
            ))}
            {service.tech_stack.length > 3 && (
              <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-400">
                +{service.tech_stack.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800/80">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-royal group-hover:text-brand-cyan transition-colors"
        >
          <span>Explore Service Details</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
