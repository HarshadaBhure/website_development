import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe2, Linkedin, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import BrandLogo from '../Common/BrandLogo';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact Us', to: '/contact' },
];

const serviceLinks = [
  { label: 'Oracle Application Implementation', to: '/services' },
  { label: 'Oracle Application Optimization', to: '/services' },
  { label: 'Oracle Application Support', to: '/services' },
  { label: 'Oracle Extensions & Cloud Solutions', to: '/services' },
  { label: 'Technology Talent Acquisition', to: '/contact' },
  { label: 'IT Staff Augmentation', to: '/contact' },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/swaraj-asia/', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/', icon: Twitter },
  { name: 'Facebook', href: 'https://facebook.com/', icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle brand ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cyan/10 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Column 1: Brand Info & Bio */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo size="md" showTagline={true} variant="dark" />

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Swaraj Asia™ Technologies Pvt. Ltd. is an enterprise software implementation services company specializing in Oracle applications and experienced technology talent staffing.
            </p>

            {/* Contact Details */}
            <div className="space-y-3 text-sm text-slate-300 pt-1">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-pink shrink-0" />
                <a 
                  href="tel:+918014503503" 
                  className="hover:text-brand-pink hover:underline transition-colors font-medium"
                >
                  +91 80145 03503
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <a 
                  href="mailto:sales@swarajasia.com" 
                  className="hover:text-brand-cyan hover:underline transition-colors font-medium"
                >
                  sales@swarajasia.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-yellow shrink-0 mt-1" />
                <div className="leading-relaxed text-xs">
                  <span className="block font-semibold text-white">Pune HQ &amp; Development Center:</span>
                  <span className="block text-slate-400">211, Leela Grandeur, Pune - Solapur Rd, Hadapsar, Pune 412307, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 className="w-4 h-4 text-brand-cyan shrink-0 mt-1" />
                <div className="leading-relaxed text-xs">
                  <span className="block font-semibold text-white">US Sales Presence:</span>
                  <span className="block text-slate-400">Columbus, Ohio, United States</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 pt-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Swaraj Asia on ${s.name}`}
                    className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-pink hover:border-brand-pink transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold font-display uppercase tracking-wider text-xs">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="hover:text-brand-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact/expert" className="hover:text-brand-pink transition-colors font-medium">
                  Talk to an Expert
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-cyan transition-colors">
                  About Swaraj Asia
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Enterprise Services */}
          <div className="space-y-4">
            <h3 className="text-white font-bold font-display uppercase tracking-wider text-xs">
              Oracle &amp; Staffing Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.to} 
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Focus & CTA */}
          <div className="space-y-4">
            <h3 className="text-white font-bold font-display uppercase tracking-wider text-xs">
              Oracle Focus Areas
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Oracle ERP Cloud',
                'Financials',
                'SCM Cloud',
                'HCM Cloud',
                'OCI Cloud',
                'OIC Integration',
                'IT Staffing',
                'Database'
              ].map((tech) => (
                <span 
                  key={tech} 
                  className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:border-brand-pink hover:text-brand-pink transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-3">
              <Link
                to="/contact/expert"
                className="inline-flex items-center gap-1.5 text-xs text-brand-pink hover:text-white transition-colors font-semibold"
              >
                <span>Talk to an Oracle Expert</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Swaraj Asia™ Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
