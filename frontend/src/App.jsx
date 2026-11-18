import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AIChatbot from './components/Chatbot/AIChatbot';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import ServiceDetail from './pages/Services/ServiceDetail';
import Industries from './pages/Industries/Industries';
import Solutions from './pages/Solutions/Solutions';
import TechPartners from './pages/TechPartners/TechPartners';
import CaseStudies from './pages/CaseStudies/CaseStudies';
import Careers from './pages/Careers/Careers';
import Contact from './pages/Contact/Contact';
import ContactCompanies from './pages/Contact/ContactCompanies';
import ContactCandidates from './pages/Contact/ContactCandidates';
import ContactPartnerships from './pages/Contact/ContactPartnerships';
import ContactExpert from './pages/Contact/ContactExpert';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsConditions from './pages/Legal/TermsConditions';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-brand-pink selection:text-white relative">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/technologies" element={<TechPartners />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/expert" element={<ContactExpert />} />
            <Route path="/contact/companies" element={<ContactCompanies />} />
            <Route path="/contact/candidates" element={<ContactCandidates />} />
            <Route path="/contact/partnerships" element={<ContactPartnerships />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </AuthProvider>
  );
}
