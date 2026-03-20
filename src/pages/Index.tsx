import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SafetyWorkflow from "@/components/SafetyWorkflow";
import AwarenessFeed from "@/components/AwarenessFeed";
import ChatApplication from "@/components/ChatApplication";
import CyberSafetyTips from "@/components/CyberSafetyTips";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";
import SafetyAlertTicker from "@/components/SafetyAlertTicker";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <SafetyAlertTicker />
      </div>
      <main>
        <HeroSection />
        <section id="workflow">
          <SafetyWorkflow />
        </section>
        <AwarenessFeed />
        <ChatApplication />

        <CyberSafetyTips />
        <section id="resources">
          <ResourcesSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
