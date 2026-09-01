import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown, ChevronRight, Phone, Mail, Building2, Users, Handshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '../Common/BrandLogo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Technologies', path: '/technologies' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Careers', path: '/careers' },
];

const CONTACT_OPTIONS = [
  {
    name: 'For Companies',
    path: '/contact/companies',
    icon: <Building2 className="w-4 h-4" />,
    desc: 'Enterprise enquiries & solutions',
  },
  {
    name: 'For Candidates',
    path: '/contact/candidates',
    icon: <Users className="w-4 h-4" />,
    desc: 'Join our team — career enquiries',
  },
  {
    name: 'For Partnerships',
    path: '/contact/partnerships',
    icon: <Handshake className="w-4 h-4" />,
    desc: 'Strategic & technology partnerships',
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setContactDropdownOpen(false);
    setMobileContactOpen(false);
  }, [location.pathname]);

  // Keyboard: close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setContactDropdownOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDropdownMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setContactDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => setContactDropdownOpen(false), 120);
  };

  const isContactActive = location.pathname.startsWith('/contact');

  return (
    <>
      {/* Top Corporate Info Bar */}
      <div className="bg-brand-navy border-b border-slate-800 text-xs text-slate-400 py-2 hidden md:block z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+918014502502" className="flex items-center gap-2 hover:text-brand-cyan transition-colors">
              <Phone className="w-3.5 h-3.5 text-brand-royal" />
              <span>+91 80145 02502</span>
            </a>
            <a href="mailto:sales@swarajasia.com" className="flex items-center gap-2 hover:text-brand-cyan transition-colors">
              <Mail className="w-3.5 h-3.5 text-brand-royal" />
              <span>sales@swarajasia.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-royal/10 text-brand-royal text-[11px] font-medium border border-brand-royal/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              Enterprise SAP &amp; Cloud Partners
            </span>
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-dark/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3.5'
            : 'bg-brand-dark/50 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

          {/* Logo */}
          <BrandLogo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-brand-royal to-brand-cyan rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Contact Us Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <button
                aria-haspopup="true"
                aria-expanded={contactDropdownOpen}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  isContactActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Contact Us
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${contactDropdownOpen ? 'rotate-180' : ''}`}
                />
                {isContactActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-brand-royal to-brand-cyan rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {contactDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-brand-navy/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-50"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <div className="p-2">
                      {CONTACT_OPTIONS.map((opt) => {
                        const isOptActive = location.pathname === opt.path;
                        return (
                          <Link
                            key={opt.path}
                            to={opt.path}
                            className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-all group ${
                              isOptActive
                                ? 'bg-brand-royal/20 text-white'
                                : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-brand-royal/20 border border-brand-royal/30 flex items-center justify-center text-brand-cyan shrink-0 group-hover:scale-110 transition-transform">
                              {opt.icon}
                            </div>
                            <div>
                              <div className="text-sm font-semibold">{opt.name}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="border-t border-slate-800 px-4 py-2.5 bg-slate-900/60">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        Response within 24 hours · sales@swarajasia.com
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => navigate('/contact/companies')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-royal to-blue-600 hover:from-blue-600 hover:to-brand-royal text-white text-sm font-semibold shadow-lg shadow-brand-royal/25 hover:shadow-brand-royal/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Talk to an Expert</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => navigate('/contact/companies')}
              className="px-3 py-1.5 rounded-lg bg-brand-royal/20 text-brand-royal border border-brand-royal/30 text-xs font-semibold"
            >
              Contact
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-x-0 top-[60px] bg-brand-dark/95 backdrop-blur-xl border-b border-slate-800 z-30 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2 max-w-md mx-auto">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-brand-royal/15 text-brand-cyan border border-brand-royal/30'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                );
              })}

              {/* Mobile Contact Us Accordion */}
              <div className="rounded-xl border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setMobileContactOpen(!mobileContactOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-all ${
                    isContactActive
                      ? 'bg-brand-royal/15 text-brand-cyan'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>Contact Us</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${mobileContactOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileContactOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-slate-900/60"
                    >
                      {CONTACT_OPTIONS.map((opt) => (
                        <Link
                          key={opt.path}
                          to={opt.path}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 border-t border-slate-800/60 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-brand-royal/20 flex items-center justify-center text-brand-cyan shrink-0">
                            {opt.icon}
                          </div>
                          <div>
                            <div className="font-semibold">{opt.name}</div>
                            <div className="text-[11px] text-slate-500">{opt.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <button
                  onClick={() => navigate('/contact/companies')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-royal to-brand-cyan text-white font-semibold text-sm shadow-lg shadow-brand-royal/20"
                >
                  <span>Talk to an Expert</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-center pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <a href="tel:+918014502502" className="hover:text-brand-cyan hover:underline transition-colors">
                    +91 80145 02502
                  </a>
                  <span>|</span>
                  <a href="mailto:sales@swarajasia.com" className="hover:text-brand-cyan hover:underline transition-colors">
                    sales@swarajasia.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
