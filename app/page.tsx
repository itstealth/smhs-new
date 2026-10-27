import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Home/Hero";
import ModernHero from "@/components/Home/ModernHero";
import AboutModernSection from "@/components/Home/AboutModernSection";
import InfrastructureSection from "@/components/Home/InfrastructureSection";
import AcademicsSection from "@/components/Home/AcademicsSection";
import TrendingUpdates from "@/components/Home/TrendingUpdates";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import CTABanner from "@/components/CTA/CTABanner";
import QuoteStrip from "@/components/QuoteStrip";

export default function Home() {
  return (
    <div className="bg-white overflow-x-clip">
      <Header />
      <Hero />
      <ModernHero />
      <InfrastructureSection />
      <AboutModernSection />
      <QuoteStrip
        quote="Educating minds, shaping character, and inspiring lifelong success."
        highlight="inspiring lifelong success."
      />
      <AcademicsSection />
      <QuoteStrip
        quote="Inspiring young minds to think, create, and achieve beyond limits."
        highlight="achieve beyond limits."
      />
      <TrendingUpdates />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
