import React from 'react';
import SEO from '../../components/Common/SEO';

export default function TermsConditions() {
  return (
    <>
      <SEO title="Terms & Conditions | Swaraj Asia Technologies" description="Terms of service and corporate governance." />
      <section className="py-20 max-w-4xl mx-auto px-4 space-y-6 text-slate-300 text-sm leading-relaxed">
        <h1 className="font-display text-4xl font-bold text-white mb-6">Terms & Conditions</h1>
        <p>Welcome to Swaraj Asia Technologies. By accessing our platform and services, you agree to comply with these corporate terms and conditions.</p>
        <h2 className="font-display text-xl font-bold text-white pt-4">1. Intellectual Property</h2>
        <p>All content, solution architecture trademarks, logos, and proprietary software materials displayed on this site are the exclusive property of Swaraj Asia Technologies.</p>
        <h2 className="font-display text-xl font-bold text-white pt-4">2. Service Contracts</h2>
        <p>Engagements for SAP implementation, cloud migration, or consulting are governed by dedicated Master Services Agreements (MSA) executed between Swaraj Asia and the client organization.</p>
      </section>
    </>
  );
}
