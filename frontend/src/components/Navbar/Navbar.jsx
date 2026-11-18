import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Facebook,
  Building2,
  Users,
  Handshake,
  Sparkles,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '../Common/BrandLogo';
import ExpertModal from '../Common/ExpertModal';

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/swaraj-asia/', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/', icon: Twitter },
  { name: 'Facebook', href: 'https://facebook.com/', icon: Facebook },
];

const contactDropdownItems = [
  {
    title: 'General Inquiries',
    description: 'Corporate headquarters, email, and direct telephone lines',
    path: '/contact',
    icon: MapPin,
  },
  {
    title: 'Talk to an Expert',
    description: 'Schedule a tailored architecture & staffing consultation session',
    path: '/contact/expert',
    isActionModal: true,
    icon: Sparkles,
    badge: 'Popular',
  },
  {
    title: 'For Companies',
    description: 'Request enterprise tech talent and bespoke Oracle solutions',
    path: '/contact/companies',
    icon: Building2,
  },
  {
    title: 'For Candidates',
    description: 'Submit your profile for top enterprise tech opportunities',
    path: '/contact/candidates',
    icon: Users,
  },
  {
    title: 'For Partnerships',
    description: 'Explore strategic alliances, vendor tie-ups, and ecosystem programs',
    path: '/contact/partnerships',
    icon: Handshake,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [mobileContactExpanded, setMobileContactExpanded] = useState(false);
  const [expertModalOpen, setExpertModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page route transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setContactDropdownOpen(false);
  }, [location.pathname]);

  const handleDropdownEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setContactDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setContactDropdownOpen(false);
    }, 180);
  };

  const isHomeActive = location.pathname === '/';
  const isServicesActive = location.pathname.startsWith('/services');
  const isCareersActive = location.pathname.startsWith('/careers');
  const isContactActive = location.pathname.startsWith('/contact');

  return (
    <>
      {/* ── Top Info Strip (Phone, Email, Social Channels) ── */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300 py-2 hidden md:block z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a
              href="tel:+918014503503"
              className="flex items-center gap-1.5 hover:text-brand-pink transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-brand-pink" />
              <span>+91 80145 03503</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="mailto:sales@swarajasia.com"
              className="flex items-center gap-1.5 hover:text-brand-pink transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-brand-pink" />
              <span>sales@swarajasia.com</span>
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-slate-400 text-[11px] font-medium mr-1">Connect with us:</span>
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Swaraj Asia on ${s.name}`}
                  className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-pink hover:border-brand-pink transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Sticky Header ── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-3'
            : 'bg-white border-b border-slate-100 py-4 lg:py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* 1. Left Visual Anchor: Official Prominent Brand Logo */}
          <div className="shrink-0 flex items-center">
            <BrandLogo variant="light" size="navbar" />
          </div>

          {/* 2. Center: Desktop Navigation Tabs (17-18px font size, semibold, balanced spacing) */}
          <nav 
            className="hidden lg:flex items-center gap-7 xl:gap-9"
            aria-label="Main Navigation"
          >
            {/* Tab: Home */}
            <Link
              to="/"
              className={`text-[17px] xl:text-[18px] font-semibold transition-colors duration-200 relative py-1.5 ${
                isHomeActive 
                  ? 'text-brand-pink font-bold' 
                  : 'text-slate-700 hover:text-brand-pink'
              }`}
            >
              <span>Home</span>
              {isHomeActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-pink rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Tab: Services */}
            <Link
              to="/services"
              className={`text-[17px] xl:text-[18px] font-semibold transition-colors duration-200 relative py-1.5 ${
                isServicesActive 
                  ? 'text-brand-pink font-bold' 
                  : 'text-slate-700 hover:text-brand-pink'
              }`}
            >
              <span>Services</span>
              {isServicesActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-pink rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Tab: Careers */}
            <Link
              to="/careers"
              className={`text-[17px] xl:text-[18px] font-semibold transition-colors duration-200 relative py-1.5 ${
                isCareersActive 
                  ? 'text-brand-pink font-bold' 
                  : 'text-slate-700 hover:text-brand-pink'
              }`}
            >
              <span>Careers</span>
              {isCareersActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-pink rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Tab: Contact Us with Interactive Dropdown */}
            <div
              className="relative py-1.5"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
                aria-expanded={contactDropdownOpen}
                aria-haspopup="true"
                className={`text-[17px] xl:text-[18px] font-semibold transition-colors duration-200 flex items-center gap-1.5 focus:outline-none ${
                  isContactActive 
                    ? 'text-brand-pink font-bold' 
                    : 'text-slate-700 hover:text-brand-pink'
                }`}
              >
                <span>Contact Us</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    contactDropdownOpen ? 'rotate-180 text-brand-pink' : 'text-slate-400'
                  }`} 
                />
              </button>

              {isContactActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-5 h-[3px] bg-brand-pink rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Dropdown Menu Overlay */}
              <AnimatePresence>
                {contactDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80 xl:w-88 z-50"
                  >
                    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/10 p-2 overflow-hidden backdrop-blur-md">
                      <div className="p-2 border-b border-slate-100 bg-slate-50/70 rounded-xl mb-1.5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Direct Communication Portals
                        </p>
                      </div>

                      <div className="space-y-1">
                        {contactDropdownItems.map((item) => {
                          const Icon = item.icon;
                          const isItemActive = location.pathname === item.path;

                          if (item.isActionModal) {
                            return (
                              <button
                                key={item.title}
                                type="button"
                                onClick={() => {
                                  setContactDropdownOpen(false);
                                  setExpertModalOpen(true);
                                }}
                                className="w-full text-left flex items-start gap-3 p-2.5 rounded-xl transition-all group hover:bg-pink-50/60"
                              >
                                <div className="w-8 h-8 rounded-lg bg-pink-100/70 text-brand-pink flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-pink group-hover:text-white transition-colors">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-grow min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-slate-900 group-hover:text-brand-pink transition-colors">
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-pink text-white">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </button>
                            );
                          }

                          return (
                            <Link
                              key={item.title}
                              to={item.path}
                              onClick={() => setContactDropdownOpen(false)}
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition-all group ${
                                isItemActive 
                                  ? 'bg-pink-50/80 text-brand-pink' 
                                  : 'hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isItemActive 
                                  ? 'bg-brand-pink text-white' 
                                  : 'bg-slate-100 text-slate-600 group-hover:bg-brand-pink group-hover:text-white'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-grow min-w-0">
                                <span className={`text-sm font-semibold block transition-colors ${
                                  isItemActive ? 'text-brand-pink' : 'text-slate-900 group-hover:text-brand-pink'
                                }`}>
                                  {item.title}
                                </span>
                                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* 3. Right: Primary CTA Action — Talk to an Expert */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setExpertModalOpen(true)}
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 xl:py-3 rounded-xl bg-brand-pink text-white font-semibold text-[15px] xl:text-[16px] shadow-md shadow-pink-500/20 hover:bg-[#c20279] hover:shadow-lg hover:shadow-pink-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-pink"
              aria-label="Talk to an Expert Consultation"
            >
              <span>Talk to an Expert</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* 4. Mobile Controls (Quick CTA + Menu Toggle) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setExpertModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-brand-pink text-white text-xs font-semibold shadow-sm hover:bg-[#c20279] active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Talk to an Expert</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Drawer Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-x-0 top-[64px] bg-white border-b border-slate-200 z-30 overflow-hidden shadow-2xl max-h-[calc(100vh-64px)] overflow-y-auto"
          >
            <div className="px-5 pt-4 pb-8 space-y-2 max-w-md mx-auto">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isHomeActive
                    ? 'bg-pink-50 text-brand-pink font-bold border border-pink-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              {/* Services */}
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isServicesActive
                    ? 'bg-pink-50 text-brand-pink font-bold border border-pink-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Services</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              {/* Careers */}
              <Link
                to="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isCareersActive
                    ? 'bg-pink-50 text-brand-pink font-bold border border-pink-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Careers</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              {/* Contact Us Accordion */}
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileContactExpanded(!mobileContactExpanded)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-base font-semibold transition-all ${
                    isContactActive
                      ? 'bg-pink-50 text-brand-pink font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Contact Us</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    mobileContactExpanded ? 'rotate-180 text-brand-pink' : 'text-slate-400'
                  }`} />
                </button>

                {mobileContactExpanded && (
                  <div className="bg-slate-50/70 p-2 space-y-1 border-t border-slate-100">
                    {contactDropdownItems.map((item) => {
                      const Icon = item.icon;
                      if (item.isActionModal) {
                        return (
                          <button
                            key={item.title}
                            type="button"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setExpertModalOpen(true);
                            }}
                            className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-brand-pink hover:bg-pink-50/60 transition-all"
                          >
                            <Icon className="w-4 h-4 text-brand-pink" />
                            <span>{item.title}</span>
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={item.title}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-brand-pink hover:bg-pink-50/60 transition-all"
                        >
                          <Icon className="w-4 h-4 text-brand-pink" />
                          <span>{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile CTA Button & Footer Contacts */}
              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setExpertModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-pink text-white font-semibold text-sm shadow-md hover:bg-[#c20279] active:scale-98 transition-all"
                >
                  <span>Talk to an Expert</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2 flex flex-col items-center gap-1.5 text-xs text-slate-600">
                  <a
                    href="tel:+918014503503"
                    className="flex items-center gap-1.5 hover:text-brand-pink transition-colors font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-pink" />
                    +91 80145 03503
                  </a>
                  <a
                    href="mailto:sales@swarajasia.com"
                    className="flex items-center gap-1.5 hover:text-brand-pink transition-colors font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-pink" />
                    sales@swarajasia.com
                  </a>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  {socialLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Swaraj Asia on ${s.name}`}
                        className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white hover:bg-brand-pink hover:border-brand-pink transition-all"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Direct Expert Consultation Modal ── */}
      <ExpertModal
        isOpen={expertModalOpen}
        onClose={() => setExpertModalOpen(false)}
      />
    </>
  );
}
