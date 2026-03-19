import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Disclaimer
          </h1>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Warning: Not a Law Enforcement Agency</h2>
              <p>
                Namma Space is a community-driven awareness platform. It is <strong>not</strong> a law 
                enforcement agency or a substitute for reporting crimes to official authorities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">No Guarantee of Outcome</h2>
              <p>
                Reporting an incident on Namma Space does not guarantee that law enforcement 
                actions will be taken or that the reported content will be removed from external platforms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Accuracy of Information</h2>
              <p>
                While we strive for accuracy through admin review, Namma Space does not 
                independently investigate every claim to its fullest extent. Information is 
                provided "as is" and should be used with caution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">External Links</h2>
              <p>
                Our platform may contain links to government portals and external resources. 
                We are not responsible for the content or availability of these third-party sites.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;
