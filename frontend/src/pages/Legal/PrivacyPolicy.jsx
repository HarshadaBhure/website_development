import React from 'react';
import SEO from '../../components/Common/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy | Swaraj Asia Technologies" description="Privacy policy and data governance." />
      <section className="py-20 max-w-4xl mx-auto px-4 space-y-6 text-slate-300 text-sm leading-relaxed">
        <h1 className="font-display text-4xl font-bold text-white mb-6">Privacy Policy</h1>
        <p>At Swaraj Asia Technologies, we are committed to safeguarding the privacy and confidential information of our enterprise clients and website visitors.</p>
        <h2 className="font-display text-xl font-bold text-white pt-4">1. Data Collection</h2>
        <p>We collect information submitted directly through our inquiry forms, candidate job application forms, and analytics telemetry to optimize software performance.</p>
        <h2 className="font-display text-xl font-bold text-white pt-4">2. Use of Information</h2>
        <p>Enterprise contact details are strictly utilized to respond to project inquiries, deliver SLA services, and evaluate recruitment applications. We do not sell or monetize client information to third parties.</p>
        <h2 className="font-display text-xl font-bold text-white pt-4">3. Data Security & ISO Compliance</h2>
        <p>All stored data is protected under enterprise-grade encryption standards, strictly adhering to ISO 27001 security protocols and relevant regional data protection regulations.</p>
      </section>
    </>
  );
}
