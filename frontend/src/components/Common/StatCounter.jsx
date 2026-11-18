import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function StatCounter({ value, label, suffix = "+", prefix = "", accent = "pink" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const textGradientMap = {
    pink: "bg-gradient-to-r from-brand-pink to-pink-500",
    cyan: "bg-gradient-to-r from-brand-cyan to-cyan-500",
    yellow: "bg-gradient-to-r from-[#B0B513] to-brand-yellow",
  };

  const hoverBorderMap = {
    pink: "hover:border-brand-pink/50 hover:shadow-soft-pink",
    cyan: "hover:border-brand-cyan/50 hover:shadow-soft-cyan",
    yellow: "hover:border-brand-yellow/60 hover:shadow-soft-yellow",
  };

  const gradientTextClass = textGradientMap[accent] || textGradientMap.pink;
  const hoverClass = hoverBorderMap[accent] || hoverBorderMap.pink;

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
    <div ref={ref} className={`text-center p-6 rounded-2xl relative overflow-hidden group bg-white border border-slate-200/80 shadow-sm ${hoverClass} transition-all duration-300`}>
      <div className={`font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text ${gradientTextClass} mb-2 relative z-10`}>
        {prefix}{isInView ? count : 0}{suffix}
      </div>
      <div className="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider relative z-10">
        {label}
      </div>
    </div>
  );
}
