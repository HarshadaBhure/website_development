import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StatCounter({ value, label, suffix = "+", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    // Parse target number
    const target = parseInt(value.toString().replace(/\D/g, ''), 10) || 0;
    if (target === 0) return;

    let start = 0;
    const duration = 2000; // ms
    const increment = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6 rounded-2xl glass-card relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-royal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brand-cyan mb-2">
        {prefix}{isInView ? count : 0}{suffix}
      </div>
      <div className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
