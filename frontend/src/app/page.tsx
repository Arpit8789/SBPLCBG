import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import InfrastructureSection from '@/components/InfrastructureSection';
import WhySBPLSection from '@/components/WhySBPLSection';
import InvestmentSection from '@/components/InvestmentSection';
import TrustSection from '@/components/TrustSection';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      
      {/* Hero with the high-impact animation */}
      <HeroSection />
      
      {/* Snapshot Sections */}
      <AboutSection />
      <WhySBPLSection />
      <InfrastructureSection />
      <InvestmentSection />
      <TrustSection />

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Shivay BioIndhan Pvt Ltd",
            "alternateName": "SBPL",
            "url": "https://www.sbpl.in",
            "description": "India's premier multi-energy fuel infrastructure company offering CBG (CNG), biogas, petrol, diesel and EV charging station franchise opportunities.",
            "foundingDate": "2024",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Bihar",
              "addressCountry": "IN"
            },
            "sameAs": [],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Partnership Enquiry",
              "email": "info@sbpl.in"
            },
            "makesOffer": {
              "@type": "Offer",
              "name": "Multi-Energy Fuel Station Franchise",
              "description": "CBG (CNG) + Petrol + Diesel + EV Charging station franchise with 50-65% ROI",
              "priceCurrency": "INR"
            }
          })
        }}
      />
    </>
  );
}
