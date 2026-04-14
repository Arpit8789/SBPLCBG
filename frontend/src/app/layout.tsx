import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivay BioIndhan Pvt Ltd (SBIPL) | Build Your Fuel Empire - CBG (CNG), Biogas & Multi-Energy Stations",
  description:
    "SBPL - India's premier multi-energy fuel infrastructure company. Invest in CBG (CNG), biogas, petrol, diesel and EV charging stations. Rs. 1.6 Crore investment, 50-65% ROI, 18-24 month payback. Partner with Shivay BioIndhan for the future of clean mobility.",
  keywords:
    "SBPL, Shivay BioIndhan, CBG station, CNG station, biogas plant, fuel station franchise, EV charging, petrol pump business, clean energy investment, Bihar CBG, multi-energy station, fuel business opportunity, Shivay Bio Indhan Pvt Ltd",
  openGraph: {
    title: "SBPL - Build Your Fuel Empire | Shivay BioIndhan Pvt Ltd",
    description:
      "India's fastest-growing multi-energy fuel infrastructure. CBG (CNG) + Petrol + Diesel + EV Charging. Invest Rs. 1.6 Crore, Earn Rs. 9-13 Lakhs/month.",
    type: "website",
    locale: "en_IN",
    siteName: "Shivay BioIndhan Pvt Ltd",
  },
  twitter: {
    card: "summary_large_image",
    title: "SBPL - Build Your Fuel Empire | Shivay BioIndhan",
    description: "India's premier multi-energy infrastructure. 50-65% ROI. Partner with SBPL today.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.sbpl.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#050a05" />
        <meta name="author" content="Shivay BioIndhan Pvt Ltd" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="noise-overlay">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
