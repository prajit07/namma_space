import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SafetyWorkflow from "@/components/SafetyWorkflow";
import AwarenessFeed from "@/components/AwarenessFeed";
import ReportForm from "@/components/ReportForm";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <section id="workflow">
          <SafetyWorkflow />
        </section>
        <AwarenessFeed />
        <ReportForm />
        <section id="resources">
          <ResourcesSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
