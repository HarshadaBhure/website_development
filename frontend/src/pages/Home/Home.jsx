import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Database, Cloud, BarChart3, Users, Cpu, UserCheck, 
  CheckCircle2, Layers, Globe2, Sparkles, Server, Zap, Award, Star, Quote, ChevronLeft, ChevronRight
} from 'lucide-react';
import SEO from '../../components/Common/SEO';
import StatCounter from '../../components/Common/StatCounter';
import ServiceCard from '../../components/Cards/ServiceCard';
import CaseStudyCard from '../../components/Cards/CaseStudyCard';
import LoadingSkeleton from '../../components/Common/LoadingSkeleton';
import { fetchServices, fetchCaseStudies, fetchTestimonials } from '../../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [servicesRes, csRes, testRes] = await Promise.all([
          fetchServices(),
          fetchCaseStudies(),
          fetchTestimonials(),
        ]);
        setServices(servicesRes);
        setCaseStudies(csRes);
        setTestimonials(testRes);
      } catch (err) {
        console.error("Failed to load home page data from API:", err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <>
      <SEO 
        title="Transforming Businesses Through Intelligent Technology" 
        description="Empowering global enterprises with SAP, Oracle, Cloud Transformation, Business Intelligence, CRM, and End-to-End Digital Engineering."
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center pt-8 pb-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-brand-royal/15 rounded-full filter blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full filter blur-[120px] pointer-events-none"></div>
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-brand-cyan shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                <span>Enterprise Technology & Digital Consulting</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Transforming Businesses Through <span className="text-gradient-primary">Intelligent Technology</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Empowering global enterprises with ERP, CRM, Cloud Infrastructure, Advanced Analytics, and digital transformation solutions that drive measurable business outcomes.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/services')}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-royal via-blue-600 to-brand-cyan hover:from-blue-600 hover:to-brand-royal text-white font-bold text-sm shadow-xl shadow-brand-royal/30 hover:shadow-brand-royal/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Explore Our Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/contact')}
                  className="px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
                >
                  <span>Talk to an Expert</span>
                </button>
              </div>

              {/* Enterprise Partners Pill Bar */}
              <div className="pt-6 border-t border-slate-800/80">
                <p className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">Trusted Technology Ecosystem Platforms</p>
                <div className="flex flex-wrap items-center gap-4 opacity-80">
                  {['SAP', 'Oracle', 'Microsoft', 'AWS', 'Salesforce', 'Zoho', 'Odoo'].map((brand) => (
                    <span key={brand} className="text-xs font-bold tracking-wider text-slate-300 bg-slate-800/50 px-3 py-1 rounded-md border border-slate-700/50">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Sophisticated Technology-Themed Animated Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="w-full max-w-md relative">
                {/* Outer Glowing Ring */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-royal/30 via-brand-cyan/20 to-purple-600/30 blur-xl animate-pulse"></div>

                {/* Central Dashboard Mock Card */}
                <div className="relative glass-card rounded-3xl p-6 border border-slate-700/80 shadow-2xl space-y-6">
                  
                  {/* Top Dashboard Bar */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-[11px] font-mono text-brand-cyan bg-brand-cyan/10 px-2.5 py-0.5 rounded-full border border-brand-cyan/20">
                      SYS_STATUS // ONLINE
                    </span>
                  </div>

                  {/* Dynamic Nodes Visual */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-navy/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <Database className="w-5 h-5 text-brand-royal" />
                        <span className="text-[10px] text-emerald-400 font-bold">+99.9%</span>
                      </div>
                      <div className="text-xs text-slate-400">SAP ERP Cloud Sync</div>
                      <div className="font-display font-bold text-lg text-white">12.4k Ops/sec</div>
                    </div>

                    <div className="bg-brand-navy/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <BarChart3 className="w-5 h-5 text-brand-cyan" />
                        <span className="text-[10px] text-brand-cyan font-bold">Real-Time</span>
                      </div>
                      <div className="text-xs text-slate-400">Power BI Intelligence</div>
                      <div className="font-display font-bold text-lg text-white">360° Insights</div>
                    </div>
                  </div>

                  {/* Connected Enterprise Architecture Card */}
                  <div className="bg-gradient-to-r from-brand-royal/20 via-slate-900 to-brand-cyan/10 p-4 rounded-2xl border border-brand-royal/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-royal flex items-center justify-center text-white font-bold shadow-md">
                        <Cloud className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Multi-Cloud Migration</div>
                        <div className="text-[11px] text-slate-400">AWS & Azure Architecture</div>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>

                  {/* Live Security Shield Tag */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Enterprise Security Standard ISO 27001
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. TRUST / STATISTICS SECTION */}
      <section className="py-12 bg-slate-900/60 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value="10" suffix="+" label="Years of Excellence" />
            <StatCounter value="50" suffix="+" label="Enterprise Projects" />
            <StatCounter value="15" suffix="+" label="Technology Platforms" />
            <StatCounter value="100" suffix="%" label="Client Focus & Success" />
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Box */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 relative"
            >
              <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-royal/20 rounded-full blur-2xl"></div>
                <div className="w-12 h-12 rounded-2xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center text-brand-cyan">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Empowering Enterprise Transformation Since Day One
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Swaraj Asia Technologies delivers high-impact enterprise technology solutions, bridging the gap between strategic business objectives and modern IT capability.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    "Proven Track Record in SAP & ERP Implementations",
                    "Deep Domain Expertise in Cloud & Business Intelligence",
                    "Client-Centric, Outcome-Driven Delivery Model"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full">
                Who We Are
              </span>
              
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Technology That Moves Business Forward
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                At Swaraj Asia, we assist forward-thinking organizations in modernizing their operational foundation. By combining enterprise ERP systems (SAP, Oracle, Odoo), CRM platforms (Salesforce, Zoho), multi-cloud infrastructure, and custom business intelligence, we build resilient digital ecosystems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  <h4 className="font-display font-bold text-white text-base mb-1">Our Mission</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Deliver seamless, intelligent IT solutions that simplify complex business processes and maximize enterprise ROI.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  <h4 className="font-display font-bold text-white text-base mb-1">Our Vision</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    To be the preferred global digital transformation consulting partner for high-growth and enterprise organizations.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-cyan hover:text-white transition-colors"
                >
                  <span>Learn More About Swaraj Asia</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="py-24 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full">
              Enterprise Services
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              End-to-End Enterprise Technology Offerings
            </h2>
            <p className="text-slate-300 text-base">
              Comprehensive consulting, implementation, and ongoing optimization across industry-leading technology platforms.
            </p>
          </div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <ServiceCard key={service.id || idx} service={service} index={idx} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
            >
              <span>View All Service Practices</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. SOLUTIONS SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full">
                Tailored Solutions
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Solutions Built Around Your Business Architecture
              </h2>
            </div>
            <Link to="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:text-white">
              <span>Explore All Solution Architectures</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "ERP Transformation", desc: "Modernize core ERP with SAP S/4HANA & Oracle Cloud.", icon: Database },
              { title: "Cloud Migration", desc: "Zero-downtime workload migration to AWS & Azure.", icon: Cloud },
              { title: "Business Intelligence", desc: "Interactive executive reporting with Power BI & Tableau.", icon: BarChart3 },
              { title: "CRM Implementation", desc: "Unify sales and customer service on Salesforce & Zoho.", icon: Users },
              { title: "Process Automation", desc: "RPA and middleware API automation for workflow speed.", icon: Cpu },
              { title: "Digital Engineering", desc: "Custom web & enterprise application software development.", icon: Layers },
              { title: "Data & Analytics", desc: "High-throughput Snowflake enterprise data lakes.", icon: Server },
              { title: "Talent Augmentation", desc: "Senior certified technology consultants on demand.", icon: UserCheck }
            ].map((sol, idx) => {
              const IconComp = sol.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-brand-navy/60 border border-slate-800 hover:border-brand-royal/40 rounded-2xl p-6 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-brand-cyan mb-4 group-hover:bg-brand-royal group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{sol.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{sol.desc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. TECHNOLOGY & PARTNERS ECOSYSTEM */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full">
              Technology Partners & Ecosystem
            </span>
            <h2 className="font-display text-3xl font-bold text-white">
              Built on World-Class Technology Platforms
            </h2>
            <p className="text-slate-400 text-sm">
              We leverage market-leading enterprise software engines to construct secure, scalable digital ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { name: "SAP", desc: "Business One & S/4HANA" },
              { name: "Oracle", desc: "Cloud & Financials" },
              { name: "Microsoft", desc: "Azure & Power BI" },
              { name: "AWS", desc: "Cloud Infrastructure" },
              { name: "Salesforce", desc: "Sales & Service Cloud" },
              { name: "Zoho", desc: "CRM & One Suite" },
              { name: "Odoo", desc: "ERP Enterprise" },
              { name: "Tableau", desc: "Data Visualization" },
              { name: "Snowflake", desc: "Data Cloud" },
              { name: "UiPath", desc: "Process Automation" },
            ].map((partner, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center border border-slate-800 hover:border-brand-royal/50 group transition-all"
              >
                <div className="font-display font-extrabold text-xl text-slate-200 group-hover:text-brand-cyan transition-colors mb-1">
                  {partner.name}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">{partner.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. CASE STUDIES SHOWCASE */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full">
                Proven Impact
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Featured Client Success Stories
              </h2>
            </div>
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:text-white">
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((cs, idx) => (
                <CaseStudyCard key={cs.id || idx} caseStudy={cs} index={idx} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 8. PROCESS TIMELINE SECTION */}
      <section className="py-24 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full">
              Our Methodology
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              A Structured Approach to Transformation
            </h2>
            <p className="text-slate-300 text-sm">
              Our 6-step implementation framework guarantees predictability, operational alignment, and rapid time-to-value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {[
              { step: "01", name: "Understand", desc: "Discover enterprise goals & legacy landscape." },
              { step: "02", name: "Analyze", desc: "Map business process gaps & data models." },
              { step: "03", name: "Strategize", desc: "Architect target solution & migration roadmap." },
              { step: "04", name: "Implement", desc: "Agile configuration, custom dev & testing." },
              { step: "05", name: "Optimize", desc: "Go-live deployment, tuning & user adoption." },
              { step: "06", name: "Support", desc: "24/7 SLA maintenance & continuous enhancement." },
            ].map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 border border-slate-800 relative group"
              >
                <div className="text-3xl font-display font-black text-brand-cyan/40 group-hover:text-brand-cyan transition-colors mb-3">
                  {p.step}
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{p.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. TESTIMONIALS CAROUSEL */}
      {testimonials.length > 0 && (
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full">
                Client Testimonials
              </span>
              <h2 className="font-display text-3xl font-bold text-white">
                What Enterprise Leaders Say About Swaraj Asia
              </h2>
            </div>

            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 relative">
              <Quote className="w-12 h-12 text-brand-royal/30 mx-auto mb-6" />
              
              <p className="text-slate-200 text-lg sm:text-xl italic leading-relaxed mb-8 max-w-3xl mx-auto font-sans">
                "{testimonials[activeTestimonialIdx]?.content}"
              </p>

              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center space-x-1 text-amber-400 mb-2">
                  {Array.from({ length: testimonials[activeTestimonialIdx]?.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="font-display font-bold text-white text-base">
                  {testimonials[activeTestimonialIdx]?.client_name}
                </div>
                <div className="text-xs text-brand-cyan font-medium">
                  {testimonials[activeTestimonialIdx]?.position} — <span className="text-slate-300">{testimonials[activeTestimonialIdx]?.company}</span>
                </div>
              </div>

              {/* Carousel Navigation Buttons */}
              <div className="flex items-center justify-center space-x-4 mt-8 pt-6 border-t border-slate-800/80">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-brand-royal transition-all"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-slate-500 font-mono">
                  0{activeTestimonialIdx + 1} / 0{testimonials.length}
                </span>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-brand-royal transition-all"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 10. CALL TO ACTION BANNER */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-brand-navy via-slate-900 to-brand-royal/40 p-10 sm:p-16 border border-brand-royal/30 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Ready to Accelerate Your Enterprise Transformation?
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Connect with our senior technical consultants today to schedule a confidential technology audit and solution consultation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-royal to-brand-cyan hover:from-brand-cyan hover:to-brand-royal text-white font-bold text-sm shadow-xl shadow-brand-royal/30 transition-all transform hover:-translate-y-0.5"
              >
                Let's Transform Your Business
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
