import Header from "@/components/Header";
import ReportForm from "@/components/ReportForm";
import Footer from "@/components/Footer";

const Report = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black mb-8 border-4 border-black p-4 bg-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase">
              Report an Incident
            </h1>
            <p className="text-xl font-bold mb-12 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Submit a report of cyber harassment, scam, or online threat. Your contribution helps make the community safer for everyone.
            </p>
            <ReportForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Report;
