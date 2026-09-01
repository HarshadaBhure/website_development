import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Twitter, Facebook, ShieldCheck } from 'lucide-react';
import BrandLogo from '../Common/BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-slate-800 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-royal/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <BrandLogo size="md" showTagline={true} />

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Empowering global enterprises with SAP, Oracle, Cloud Transformation, Business Intelligence, CRM, and Next-Gen Digital Engineering Solutions.
            </p>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                <a href="tel:+918014502502" className="hover:text-brand-cyan hover:underline transition-colors">+91 80145 02502</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <a href="mailto:sales@swarajasia.com" className="hover:text-brand-cyan hover:underline transition-colors">sales@swarajasia.com</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-1" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Swaraj+Asia+Technologies+Private+Limited+211+Leela+Grandeur+Pune+Solapur+Rd+Laxmi+Colony+Hadapsar+Pune+Maharashtra+412307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-cyan hover:underline transition-colors leading-relaxed"
                >
                  <span className="block font-medium text-white text-xs">Swaraj Asia Technologies Private Limited</span>
                  <span className="block">211, Leela Grandeur, Pune - Solapur Rd,</span>
                  <span className="block">Laxmi Colony, Hadapsar, Pune,</span>
                  <span className="block">Maharashtra 412307, India</span>
                </a>
              </div>
            </div>

            {/* Social Links — LinkedIn updated to official page */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.linkedin.com/company/swaraj-asia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swaraj Asia on LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-royal hover:border-brand-royal transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swaraj Asia on Twitter"
                className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-royal hover:border-brand-royal transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swaraj Asia on Facebook"
                className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-royal hover:border-brand-royal transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold font-display uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-brand-cyan transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-cyan transition-colors">Services Overview</Link></li>
              <li><Link to="/industries" className="hover:text-brand-cyan transition-colors">Industries We Serve</Link></li>
              <li><Link to="/solutions" className="hover:text-brand-cyan transition-colors">Solutions</Link></li>
              <li><Link to="/technologies" className="hover:text-brand-cyan transition-colors">Tech Ecosystem</Link></li>
              <li><Link to="/case-studies" className="hover:text-brand-cyan transition-colors">Case Studies</Link></li>
              <li><Link to="/careers" className="hover:text-brand-cyan transition-colors">Careers</Link></li>
              <li><Link to="/contact/companies" className="hover:text-brand-cyan transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Enterprise Services */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold font-display uppercase tracking-wider text-xs">Services &amp; Practices</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services/erp-solutions" className="hover:text-brand-cyan transition-colors">SAP &amp; Oracle ERP</Link></li>
              <li><Link to="/services/crm-solutions" className="hover:text-brand-cyan transition-colors">Salesforce &amp; Zoho CRM</Link></li>
              <li><Link to="/services/cloud-solutions" className="hover:text-brand-cyan transition-colors">AWS &amp; Azure Cloud</Link></li>
              <li><Link to="/services/analytics-bi" className="hover:text-brand-cyan transition-colors">Power BI Analytics</Link></li>
              <li><Link to="/services/digital-transformation" className="hover:text-brand-cyan transition-colors">Process Automation</Link></li>
              <li><Link to="/services/it-staffing-consulting" className="hover:text-brand-cyan transition-colors">IT Talent Augmentation</Link></li>
            </ul>
          </div>

          {/* Column 4: Technology Ecosystem */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold font-display uppercase tracking-wider text-xs">Platforms</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {['SAP S/4HANA', 'Oracle ERP', 'Salesforce', 'AWS', 'Azure', 'Zoho CRM', 'Odoo', 'Power BI', 'Tableau', 'Snowflake', 'Python'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-4">
              <Link to="/contact/companies" className="inline-flex items-center gap-1.5 text-xs text-brand-cyan hover:text-white transition-colors font-medium">
                <span>Request Platform Evaluation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>&copy; {new Date().getFullYear()} Swaraj Asia Technologies. All Rights Reserved. Enterprise ISO Certified.</span>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
            <Link to="/admin/login" className="hover:text-slate-200 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
