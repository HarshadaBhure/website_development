import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
        title="Enterprise Services | Swaraj Asia Technologies" 
        description="Explore Swaraj Asia's service practices: SAP ERP, Oracle, Salesforce CRM, Cloud Architecture, Power BI Analytics, and IT Consulting."
      />

      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-brand-dark via-slate-900 to-brand-dark border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full">
            Our Offerings
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
            Enterprise Technology <span className="text-gradient-primary">Practices</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering robust end-to-end IT solutions engineered to accelerate digital transformation and optimize business operations.
          </p>
        </div>
      </section>

      {/* Category Tabs & Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilteredCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filteredCategory === cat
                    ? 'bg-brand-royal text-white shadow-lg shadow-brand-royal/25'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : displayedServices.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No services found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedServices.map((service, idx) => (
                <ServiceCard key={service.id || idx} service={service} index={idx} />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
