import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/Common/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found | Swaraj Asia Technologies" description="The requested page could not be found." />
      <section className="min-h-[70vh] flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="font-display font-black text-8xl text-transparent bg-clip-text bg-gradient-to-r from-brand-royal via-blue-500 to-brand-cyan">
            404
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Page Not Found</h1>
          <p className="text-slate-400 text-sm">
            The page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-royal to-brand-cyan text-white font-bold text-sm shadow-lg shadow-brand-royal/25"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
