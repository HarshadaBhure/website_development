import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandLogo — Reusable enterprise logo + wordmark component.
 * Supports light and dark modes with prominent, high-resolution rendering.
 *
 * Props:
 *   size: 'sm' | 'md' | 'lg' | 'navbar' (default: 'navbar')
 *   showTagline: boolean                (default: true)
 *   asLink: boolean                     (default: true)
 *   variant: 'light' | 'dark'           (default: 'light')
 *   className: string
 */
export default function BrandLogo({ 
  size = 'navbar', 
  showTagline = true, 
  asLink = true, 
  variant = 'light', 
  className = '' 
}) {
  const sizes = {
    sm: { 
      logo: 'w-9 h-9', 
      title: 'text-lg', 
      tag: 'text-[9px] tracking-[0.18em]' 
    },
    md: { 
      logo: 'w-12 h-12 lg:w-13 lg:h-13', 
      title: 'text-xl lg:text-2xl', 
      tag: 'text-[10px] lg:text-[11px] tracking-[0.2em]' 
    },
    navbar: { 
      logo: 'w-11 h-11 sm:w-12 sm:h-12 md:w-[54px] md:h-[54px] lg:w-[60px] lg:h-[60px]', 
      title: 'text-xl sm:text-2xl lg:text-[26px]', 
      tag: 'text-[9.5px] sm:text-[10px] lg:text-[11px] tracking-[0.22em]' 
    },
    lg: { 
      logo: 'w-16 h-16 lg:w-20 lg:h-20', 
      title: 'text-2xl lg:text-3xl', 
      tag: 'text-xs tracking-[0.24em]' 
    },
  };

  const s = sizes[size] || sizes.navbar;
  const isDark = variant === 'dark';

  const content = (
    <div className={`flex items-center gap-3 sm:gap-3.5 group select-none ${className}`}>
      {/* Logo Icon Asset (High-Res 1024x1024 rendered cleanly with maintained aspect ratio) */}
      <div 
        className={`${s.logo} rounded-2xl overflow-hidden shrink-0 border border-slate-200/90 shadow-md shadow-pink-500/10 group-hover:shadow-pink-500/25 group-hover:scale-105 transition-all duration-300 bg-[#07172e] flex items-center justify-center p-0.5`}
      >
        <img
          src="/logo.png"
          alt="Swaraj Asia Technologies Official Logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            // Graceful fallback if image is missing
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.classList.add(
              'bg-gradient-to-tr', 'from-brand-pink', 'to-brand-cyan',
              'flex', 'items-center', 'justify-center'
            );
            const span = document.createElement('span');
            span.className = 'font-display font-black text-white text-xl tracking-wider';
            span.textContent = 'SA';
            e.currentTarget.parentElement.appendChild(span);
          }}
        />
      </div>

      {/* Distinctive Company Wordmark Typography */}
      <div className="flex flex-col justify-center">
        <div className={`font-display font-extrabold ${s.title} tracking-tight leading-none flex items-center`}>
          <span className={isDark ? 'text-white' : 'text-slate-900'}>
            SWARAJ
          </span>
          <span className="text-brand-pink ml-1.5">
            ASIA
          </span>
          <span className="text-[10px] font-normal text-slate-400 ml-0.5 -top-1.5 relative select-none">
            ™
          </span>
        </div>

        {showTagline && (
          <p className={`${s.tag} ${isDark ? 'text-slate-400' : 'text-slate-500'} uppercase font-bold mt-1 text-left leading-none`}>
            TECHNOLOGIES
          </p>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" aria-label="Swaraj Asia Technologies Home" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-xl">
        {content}
      </Link>
    );
  }
  return content;
}
