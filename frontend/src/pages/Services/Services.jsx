import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../../components/Common/SEO';
import ServiceCard from '../../components/Cards/ServiceCard';
import LoadingSkeleton from '../../components/Common/LoadingSkeleton';
import { fetchServices } from '../../services/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const categories = ['All', 'Enterprise Services', 'Cloud Services', 'Business Intelligence', 'Innovation', 'Talent Services'];

  const displayedServices = filteredCategory === 'All' 
    ? services 
    : services.filter(s => s.category === filteredCategory);

  return (
    <>
      <SEO 
        title="Enterprise Services & Practices | Swaraj Asia™ Technologies" 
        description="Explore Swaraj Asia's service practices: Oracle ERP Cloud, Application Support & Optimization, IT Staff Augmentation, and Enterprise Consulting."
      />

      {/* Header */}
      <section className="py-20 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-pink-500/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="badge-pink">
            Our Offerings
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Enterprise Technology <span className="text-pink-gradient">Practices</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering robust end-to-end enterprise software implementations, Oracle application optimization, and specialized technology staffing.
          </p>
        </div>
      </section>

      {/* Category Tabs & Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilteredCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filteredCategory === cat
                    ? 'bg-brand-pink text-white shadow-md shadow-pink-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : displayedServices.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
              No services found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedServices.map((service, idx) => (
                <ServiceCard key={service.id || idx} service={service} index={idx} />
              ))}
            </div>
          )}

          {/* Bottom CTA Strip */}
          <div className="mt-16 bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 text-center max-w-4xl mx-auto space-y-4">
            <span className="badge-cyan">Tailored Engagements</span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Have a Specific Requirement in Mind?
            </h3>
            <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
              Our enterprise solution architects can evaluate your existing Oracle or enterprise application estate and propose a structured implementation or staffing roadmap.
            </p>
            <div className="pt-2">
              <Link
                to="/contact/expert"
                className="btn-pink hover:scale-105 transition-all inline-flex items-center gap-2 shadow-md shadow-pink-500/20"
              >
                <span>Talk to an Expert</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
