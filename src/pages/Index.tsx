import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SafetyWorkflow from "@/components/SafetyWorkflow";
import CommunityStats from "@/components/CommunityStats";
import AwarenessFeed from "@/components/AwarenessFeed";
import ChatApplication from "@/components/ChatApplication";
import CyberSafetyTips from "@/components/CyberSafetyTips";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";
import SafetyAlertTicker from "@/components/SafetyAlertTicker";
import ScrollToTop from "@/components/ScrollToTop";

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
        <CommunityStats />
        <AwarenessFeed />
        <ChatApplication />

        <CyberSafetyTips />
        <section id="resources">
          <ResourcesSection />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
