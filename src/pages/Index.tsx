
import HeroSection from "@/components/HeroSection";
import FloatingElements from "@/components/FloatingElements";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CallToActionSection from "@/components/CallToActionSection";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CallToActionSection />
      </div>
    </div>
  );
};

export default Index;
