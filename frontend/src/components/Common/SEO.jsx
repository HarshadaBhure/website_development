import React, { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    const defaultTitle = "Swaraj Asia Technologies | Enterprise Technology & Intelligent Solutions";
    const defaultDesc = "Empowering global enterprises with SAP, Oracle, Cloud Migration, Business Intelligence, CRM, and End-to-End Digital Transformation Solutions.";

    document.title = title ? `${title} | Swaraj Asia Technologies` : defaultTitle;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDesc);
    }
  }, [title, description]);

  return null;
}
