import React, { useEffect, useState } from 'react';
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

      <section className="py-20 bg-white border-b border-slate-200 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="badge-yellow">
            Proven Results
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3">
            Enterprise <span className="text-yellow-gradient">Case Studies</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover how we partner with global enterprise clients to overcome complex business challenges and achieve quantifiable outcomes.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setFilteredIndustry(ind)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filteredIndustry === ind
                    ? 'bg-brand-yellow text-slate-900 shadow-md shadow-yellow-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : displayedList.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
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
