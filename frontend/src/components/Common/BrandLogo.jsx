import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandLogo — Reusable premium logo + wordmark component.
 * Uses the official Swaraj Asia logo image with professional typographic treatment.
 *
 * Props:
 *   size: 'sm' | 'md' | 'lg'  (default: 'md')
 *   showTagline: boolean        (default: true)
 *   asLink: boolean             (default: true — wraps in <Link to="/">)
 *   className: string
 */
export default function BrandLogo({ size = 'md', showTagline = true, asLink = true, className = '' }) {
  const sizes = {
    sm: { logo: 'w-7 h-7', title: 'text-base', tag: 'text-[9px]' },
    md: { logo: 'w-10 h-10', title: 'text-xl',  tag: 'text-[10px]' },
    lg: { logo: 'w-14 h-14', title: 'text-2xl', tag: 'text-xs' },
  };
  const s = sizes[size] || sizes.md;

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Image */}
      <div className={`${s.logo} rounded-xl overflow-hidden shrink-0 shadow-lg shadow-brand-royal/30 group-hover:shadow-brand-royal/50 transition-shadow`}>
        <img
          src="/logo.png"
          alt="Swaraj Asia Technologies Logo"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback: gradient monogram if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.classList.add(
              'bg-gradient-to-tr', 'from-brand-royal', 'via-blue-600', 'to-brand-cyan',
              'flex', 'items-center', 'justify-center'
            );
            const span = document.createElement('span');
            span.className = 'font-display font-black text-white text-xl tracking-wider';
            span.textContent = 'SA';
            e.currentTarget.parentElement.appendChild(span);
          }}
        />
      </div>

      {/* Wordmark */}
      <div>
        <div className={`font-display font-extrabold ${s.title} tracking-tight leading-none flex items-center gap-1`}>
          {/* SWARAJ in white, ASIA in accent cyan — premium typographic separation */}
          <span className="text-white">SWARAJ</span>
          <span className="text-brand-cyan">&nbsp;ASIA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan ml-0.5 shrink-0 group-hover:scale-110 transition-transform" />
        </div>
        {showTagline && (
          <p className={`${s.tag} text-slate-400 uppercase tracking-widest font-semibold mt-0.5`}>
            Technologies
          </p>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return <Link to="/">{content}</Link>;
  }
  return content;
}
