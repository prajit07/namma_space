import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p>
                Namma Space is committed to protecting your privacy. When you submit a report, we collect:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Username or profile URL of the reported account.</li>
                <li>Platform details.</li>
                <li>Description of the incident.</li>
                <li>Evidence files (screenshots, PDFs).</li>
                <li>Your contact information (email/phone) ONLY if you choose not to report anonymously.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <p>
                The information collected is used solely for the purpose of community awareness and 
                admin review. Confirmed reports may be listed in our public awareness feed to warn others 
                of potential online harm.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Security</h2>
              <p>
                We use secure industry-standard encryption and protected databases to store your reports. 
                Anonymous reports are truly anonymous—no personal identifiers are linked to the submission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Sharing of Information</h2>
              <p>
                We do not sell or share your personal contact information with third parties. We may, 
                however, share report data with law enforcement agencies if required by law or to 
                prevent serious harm.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
