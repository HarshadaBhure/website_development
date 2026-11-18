import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Database, Cloud, Users, UserCheck, 
  CheckCircle2, Layers, Sparkles, Building2, Globe2,
  Workflow, Headphones, Wrench, ShieldCheck, TrendingUp,
  Award, Briefcase, ChevronRight, Server, Cpu
} from 'lucide-react';
import SEO from '../../components/Common/SEO';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Oracle Expertise. Technology Talent. Business Results. | Swaraj Asia™ Technologies" 
        description="Swaraj Asia helps organizations implement, optimize, support, and extend Oracle applications while providing experienced technology professionals for critical business initiatives."
      />

      {/* =====================================================
          1. HERO SECTION — Predominantly White with Brand Accents
          ===================================================== */}
      <section className="relative min-h-[85vh] flex items-center pt-8 pb-20 overflow-hidden bg-white">
        {/* Subtle Brand Glows (Predominantly White dominant background) */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-pink-500/5 rounded-full filter blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-400/5 rounded-full filter blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Supporting Text & CTAs */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-brand-pink text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Oracle &amp; Technology Staffing Partner</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Oracle Expertise.{' '}
                <span className="text-pink-gradient">Technology Talent.</span>{' '}
                Business Results.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Swaraj Asia helps organizations implement, optimize, support, and extend Oracle applications while providing experienced technology professionals for critical business initiatives.
              </p>

              {/* Two CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/contact/expert')}
                  className="btn-pink hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-md shadow-pink-500/20"
                >
                  <span>Talk to an Expert</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#core-services"
                  className="btn-outline hover:border-brand-cyan hover:text-brand-cyan hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Our Services</span>
                  <ChevronRight className="w-4 h-4 text-brand-cyan" />
                </a>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 font-semibold mb-3 uppercase tracking-wider">
                  Core Enterprise Focus
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    'Oracle Cloud ERP',
                    'Oracle Applications Support',
                    'IT Staff Augmentation',
                    'Technology Talent Acquisition',
                    'OCI Infrastructure',
                    'Custom Extensions'
                  ].map((item) => (
                    <span 
                      key={item} 
                      className="text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1 rounded-md border border-slate-200 hover:border-brand-pink/50 hover:text-brand-pink transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Clean Enterprise Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="w-full max-w-md relative">
                {/* Subtle soft backdrop accent */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-pink-500/10 via-cyan-400/10 to-yellow-400/10 blur-xl pointer-events-none" />

                {/* Dashboard / Enterprise Card */}
                <div className="relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-5">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-pink" />
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
                      ENTERPRISE ORACLE PORTFOLIO
                    </span>
                  </div>

                  {/* Core Capability Cards */}
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 flex items-start gap-3.5 hover:border-brand-pink/40 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-brand-pink shrink-0">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Oracle Applications Practice</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Implementation, performance optimization &amp; 24/7 SLA application support.
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 flex items-start gap-3.5 hover:border-brand-cyan/40 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-brand-cyan shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Technology Talent &amp; Staffing</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Experienced IT professionals &amp; specialized consultants for critical initiatives.
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 flex items-start gap-3.5 hover:border-brand-yellow/50 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-yellow-100 border border-yellow-200 flex items-center justify-center text-yellow-700 shrink-0">
                        <Cloud className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Cloud &amp; Custom Extensions</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          OCI deployment, integration middleware &amp; tailored business extensions.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Presence Tag */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Globe2 className="w-4 h-4 text-brand-cyan" />
                      <span>Pune, India (HQ) &middot; Columbus, USA</span>
                    </div>
                    <span className="text-[11px] font-semibold text-brand-pink bg-pink-50 px-2 py-0.5 rounded-md">
                      Est. 2019
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          2. COMPANY INTRODUCTION SECTION (White Background)
          ===================================================== */}
      <section id="company-intro" className="py-20 lg:py-24 bg-white border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Company Background & Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="badge-pink">
                About Swaraj Asia
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Technology Expertise Built Around Your Business
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                <strong className="text-slate-900">Swaraj Asia™ Technologies Pvt. Ltd.</strong> is an enterprise software implementation services company established in 2019. Headquartered with its development center in Pune, Maharashtra, India, and an international sales presence in Columbus, Ohio, USA, Swaraj Asia delivers tailored enterprise technology consulting and talent solutions.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We help organizations bridge the gap between strategic business objectives and complex enterprise software. Our core business centers on implementing, optimizing, and supporting Oracle applications, alongside assembling skilled technology teams that drive mission-critical business outcomes.
              </p>

              {/* Verified Company Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-brand-pink flex items-center justify-center mb-2 font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-sm mb-1">Established in 2019</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Founded with a singular commitment to high-rigor enterprise software implementation and long-term client success.
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 text-brand-cyan flex items-center justify-center mb-2 font-bold text-xs">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-sm mb-1">Global Presence</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    HQ &amp; Development Center in Pune, India; dedicated sales presence in Columbus, Ohio, USA and Pune, India.
                  </p>
                </div>
              </div>

              {/* CTA: Learn More About Swaraj Asia */}
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-pink hover:text-pink-700 transition-colors"
                >
                  <span>Learn More About Swaraj Asia</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Values & Core Delivery Model */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200 space-y-5">
                <h3 className="font-display font-bold text-slate-900 text-lg">
                  How We Partner With You
                </h3>

                {[
                  {
                    title: 'Core Business Focus',
                    desc: 'Specialized enterprise software implementation services designed around organizational workflows.',
                    icon: Database,
                    accent: 'text-brand-pink bg-pink-100'
                  },
                  {
                    title: 'Outcome-Oriented Delivery',
                    desc: 'Every milestone is mapped directly to efficiency, system reliability, and measurable business ROI.',
                    icon: TrendingUp,
                    accent: 'text-brand-cyan bg-cyan-100'
                  },
                  {
                    title: 'Flexible Engagement Models',
                    desc: 'From comprehensive turnkey implementations to on-demand technical team augmentation.',
                    icon: Users,
                    accent: 'text-yellow-700 bg-yellow-100'
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white p-4 rounded-2xl border border-slate-200/90 flex items-start gap-3.5 shadow-2xs hover:border-slate-300 transition-colors"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.accent}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-slate-900 text-sm mb-0.5">{item.title}</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Primary Industry Focus:</span>
                  <span className="text-brand-pink font-semibold">Enterprise &amp; Mid-Market</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          3. CORE SERVICES SECTION
          ===================================================== */}
      <section id="core-services" className="py-20 lg:py-24 bg-white relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="badge-cyan">
              Core Services
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Enterprise Services Built for Execution
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              Confirmed capabilities across Oracle applications and specialized technology talent staffing to power your critical initiatives.
            </p>
          </div>

          {/* Subheading A: Oracle Services */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-6 bg-brand-pink rounded-full" />
              <h3 className="font-display text-xl font-bold text-slate-900">
                Oracle Applications Services
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Oracle Application Implementation',
                  desc: 'End-to-end deployment of Oracle ERP applications, system configuration, and data migration tailored to your business processes.',
                  icon: Database,
                  accentColor: 'border-pink-200 text-brand-pink bg-pink-50 hover:border-brand-pink/60'
                },
                {
                  title: 'Oracle Application Optimization',
                  desc: 'Process refinement, performance tuning, and operational workflow enhancement to maximize your current Oracle investment.',
                  icon: Workflow,
                  accentColor: 'border-cyan-200 text-brand-cyan bg-cyan-50 hover:border-brand-cyan/60'
                },
                {
                  title: 'Oracle Application Support',
                  desc: 'Reliable 24/7 SLA-driven technical support, monitoring, functional maintenance, and continuous issue resolution.',
                  icon: Headphones,
                  accentColor: 'border-slate-200 text-slate-800 bg-slate-50 hover:border-brand-pink/50'
                },
                {
                  title: 'Oracle Extensions & Solutions',
                  desc: 'Building custom extensions, OCI cloud capabilities, API integrations, and analytics to extend your enterprise reach.',
                  icon: Wrench,
                  accentColor: 'border-yellow-200 text-yellow-800 bg-yellow-50 hover:border-yellow-400'
                }
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${card.accentColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-base text-slate-900 mb-2 group-hover:text-brand-pink transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-slate-100">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-pink hover:text-pink-700 transition-colors"
                      >
                        <span>Discuss Your Requirements</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subheading B: Talent / IT Staffing */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-6 bg-brand-cyan rounded-full" />
              <h3 className="font-display text-xl font-bold text-slate-900">
                Talent &amp; IT Staffing Services
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Technology Talent Acquisition',
                  desc: 'Strategic sourcing and recruitment of qualified enterprise software professionals for permanent and project-based roles.',
                  icon: Users,
                  accentColor: 'border-cyan-200 text-brand-cyan bg-cyan-50'
                },
                {
                  title: 'Experienced IT Professionals',
                  desc: 'Deployment of vetted Oracle consultants, software engineers, and cloud architects ready to integrate into critical initiatives.',
                  icon: UserCheck,
                  accentColor: 'border-pink-200 text-brand-pink bg-pink-50'
                },
                {
                  title: 'Flexible Staffing Engagements',
                  desc: 'Adaptable engagement models including contract staffing, dedicated project teams, and hybrid on-site / off-shore delivery.',
                  icon: Briefcase,
                  accentColor: 'border-yellow-200 text-yellow-800 bg-yellow-50'
                }
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${card.accentColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-base text-slate-900 mb-2 group-hover:text-brand-cyan transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-slate-100">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-cyan-700 transition-colors"
                      >
                        <span>Request Talent Augmentation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="btn-outline hover:border-brand-pink hover:text-brand-pink transition-all inline-flex items-center gap-2"
            >
              <span>Explore All Company Practices</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* =====================================================
          4. WHY ORGANIZATIONS CHOOSE SWARAJ ASIA
          ===================================================== */}
      <section className="py-20 lg:py-24 bg-slate-50 border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="badge-pink">
              Our Differentiators
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why Organizations Choose Swaraj Asia
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              Enterprises partner with Swaraj Asia because we combine focused technical capability with a disciplined commitment to client outcomes.
            </p>
          </div>

          {/* Differentiators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Oracle-Focused Expertise',
                desc: 'Deep specialization in Oracle application ecosystems, ensuring technical precision from initial planning through continuous operation.',
                icon: Database,
                color: 'text-brand-pink bg-pink-50 border-pink-200'
              },
              {
                title: 'Experienced Technology Professionals',
                desc: 'Talent with proven industry experience who understand complex enterprise data flows, security mandates, and organizational workflows.',
                icon: Award,
                color: 'text-brand-cyan bg-cyan-50 border-cyan-200'
              },
              {
                title: 'Flexible Engagement Models',
                desc: 'Agile collaboration frameworks tailored to your organizational scale — from dedicated pods to on-demand subject matter experts.',
                icon: Workflow,
                color: 'text-yellow-700 bg-yellow-50 border-yellow-200'
              },
              {
                title: 'Implementation & Support Capabilities',
                desc: 'Full lifecycle coverage: architecture assessment, migration execution, and reliable post-go-live managed support.',
                icon: Headphones,
                color: 'text-brand-pink bg-pink-50 border-pink-200'
              },
              {
                title: 'Business-Focused Approach',
                desc: 'We prioritize operational outcomes and tangible value over technology for its own sake, aligning directly with executive goals.',
                icon: TrendingUp,
                color: 'text-brand-cyan bg-cyan-50 border-cyan-200'
              },
              {
                title: 'Long-Term Client Relationships',
                desc: 'Dedicated to building enduring, transparent relationships that adapt as your enterprise technology demands evolve.',
                icon: ShieldCheck,
                color: 'text-yellow-700 bg-yellow-50 border-yellow-200'
              }
            ].map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3 group"
                >
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${diff.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-brand-pink transition-colors">
                    {diff.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Grounded Company Indicator Grid (Grounded layout without fabricated stats) */}
          <div className="mt-14 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Founded</div>
              <div className="font-display font-bold text-xl sm:text-2xl text-slate-900">2019</div>
              <div className="text-[11px] text-slate-500">Corporate Incorporation</div>
            </div>

            <div className="space-y-1 border-l border-slate-100 pl-4 sm:pl-6">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">HQ Center</div>
              <div className="font-display font-bold text-xl sm:text-2xl text-brand-pink">Pune, India</div>
              <div className="text-[11px] text-slate-500">Headquarters &amp; Dev Hub</div>
            </div>

            <div className="space-y-1 border-l border-slate-100 pl-4 sm:pl-6">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Sales Presence</div>
              <div className="font-display font-bold text-xl sm:text-2xl text-brand-cyan">Columbus, USA</div>
              <div className="text-[11px] text-slate-500">Global Sales &amp; Accounts</div>
            </div>

            <div className="space-y-1 border-l border-slate-100 pl-4 sm:pl-6">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Core Practice</div>
              <div className="font-display font-bold text-xl sm:text-2xl text-slate-900">Enterprise Oracle</div>
              <div className="text-[11px] text-slate-500">Implementation &amp; Staffing</div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          5. DEEP ORACLE EXPERTISE ACROSS THE ENTERPRISE
          ===================================================== */}
      <section className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="badge-cyan">
              Oracle Ecosystem
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Deep Oracle Expertise Across the Enterprise
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              Confirmed capabilities across the Oracle product landscape to support your enterprise modernization roadmap.
            </p>
          </div>

          {/* Grouped Oracle Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: 'Oracle ERP Cloud & Financials',
                desc: 'Unifying financial reporting, general ledger, accounts payable, accounts receivable, and automated compliance.',
                modules: ['General Ledger (GL)', 'Accounts Payable (AP)', 'Accounts Receivable (AR)', 'Cash & Revenue Management'],
                icon: Database,
                color: 'border-pink-200 text-brand-pink'
              },
              {
                category: 'Supply Chain Management (SCM)',
                desc: 'Streamlining end-to-end procurement, inventory optimization, order fulfillment, and supplier collaboration.',
                modules: ['Procurement Cloud', 'Inventory Management', 'Order Management', 'Supply Chain Planning'],
                icon: Workflow,
                color: 'border-cyan-200 text-brand-cyan'
              },
              {
                category: 'Human Capital Management (HCM)',
                desc: 'Managing core HR records, talent acquisition, workforce compensation, and self-service employee portals.',
                modules: ['Core HR', 'Talent Management', 'Workforce Scheduling', 'Benefits & Payroll Connectors'],
                icon: Users,
                color: 'border-yellow-200 text-yellow-700'
              },
              {
                category: 'Oracle Cloud Infrastructure (OCI)',
                desc: 'Deploying high-performance compute, resilient storage, and virtual cloud network architectures on OCI.',
                modules: ['OCI Compute & Storage', 'Virtual Cloud Network (VCN)', 'Cloud Security & Governance', 'Backup & Disaster Recovery'],
                icon: Server,
                color: 'border-pink-200 text-brand-pink'
              },
              {
                category: 'Integration & Middleware',
                desc: 'Connecting Oracle applications with third-party ERPs, CRMs, legacy databases, and custom web applications.',
                modules: ['Oracle Integration Cloud (OIC)', 'REST & SOAP API Gateways', 'Autonomous Database Connectors', 'EDI Data Exchange'],
                icon: Cpu,
                color: 'border-cyan-200 text-brand-cyan'
              },
              {
                category: 'Analytics & Reporting',
                desc: 'Delivering real-time operational reporting, executive dashboards, and telemetry for proactive decision-making.',
                modules: ['Oracle Transactional BI (OTBI)', 'Fusion Analytics Warehouse', 'Custom BI Publisher Reports', 'Executive Telemetry'],
                icon: Layers,
                color: 'border-yellow-200 text-yellow-700'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-slate-50 border flex items-center justify-center shrink-0 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-900">
                      {item.category}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Key Capabilities:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.modules.map((m) => (
                        <span 
                          key={m} 
                          className="text-[11px] font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="btn-pink hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <span>Consult an Oracle Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* =====================================================
          6. ENTERPRISE CTA SECTION
          ===================================================== */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-14 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            
            {/* Left Accent Bar */}
            <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-brand-pink via-brand-cyan to-brand-yellow" />

            <div className="space-y-3 max-w-2xl text-center lg:text-left pl-2">
              <span className="badge-pink">
                Start a Conversation
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                Ready to Modernize Your Enterprise with Oracle?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Connect with Swaraj Asia’s senior consultants to discuss your Oracle implementation, support, or talent staffing requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={() => navigate('/contact/expert')}
                className="btn-pink hover:scale-105 transition-all shadow-md shadow-pink-500/20"
              >
                <span>Talk to an Expert</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/services"
                className="btn-outline hover:border-slate-400 transition-all text-sm"
              >
                <span>Explore Services</span>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
