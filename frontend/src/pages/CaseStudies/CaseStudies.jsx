import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/Common/SEO';
import CaseStudyCard from '../../components/Cards/CaseStudyCard';
import LoadingSkeleton from '../../components/Common/LoadingSkeleton';
import { fetchCaseStudies } from '../../services/api';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [filteredIndustry, setFilteredIndustry] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCaseStudies();
        setCaseStudies(data);
      } catch (err) {
        console.error("Failed to load case studies:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const industries = ['All', 'Manufacturing', 'Retail & E-Commerce', 'Logistics & Supply Chain', 'Healthcare', 'Finance'];

  const displayedList = filteredIndustry === 'All'
    ? caseStudies
    : caseStudies.filter(cs => cs.industry.toLowerCase().includes(filteredIndustry.toLowerCase()));

  return (
    <>
      <SEO 
        title="Case Studies & Impact | Swaraj Asia Technologies" 
        description="Explore real-world enterprise success stories across Manufacturing SAP S/4HANA ERP, Retail Power BI Telemetry, and Salesforce CRM."
      />

      <section className="py-20 bg-gradient-to-b from-brand-dark via-slate-900 to-brand-dark border-b border-slate-800/80 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full">
            Proven Results
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-3">
            Enterprise <span className="text-gradient-primary">Case Studies</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover how we partner with global enterprise clients to overcome complex business challenges and achieve quantifiable outcomes.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setFilteredIndustry(ind)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filteredIndustry === ind
                    ? 'bg-brand-royal text-white shadow-lg shadow-brand-royal/25'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : displayedList.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No case studies found for this industry filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedList.map((cs, idx) => (
                <CaseStudyCard key={cs.id || idx} caseStudy={cs} index={idx} />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
