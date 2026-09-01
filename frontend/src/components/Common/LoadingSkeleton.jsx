import React from 'react';

export default function LoadingSkeleton({ count = 3, type = "card" }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="glass-card p-6 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800"></div>
          <div className="h-6 bg-slate-800 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-800/60 rounded w-full"></div>
            <div className="h-4 bg-slate-800/60 rounded w-5/6"></div>
          </div>
          <div className="h-8 bg-slate-800/40 rounded w-1/3 pt-2"></div>
        </div>
      ))}
    </div>
  );
}
