import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const TermsOfUse = () => {
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
            Terms of Use
          </h1>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By using Namma Space, you agree to these terms. If you do not agree, please do not use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Responsible Reporting</h2>
              <p>
                Users must provide accurate and truthful information when submitting reports. 
                False reporting or malicious use of the platform is strictly prohibited and may 
                result in legal consequences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Content Review</h2>
              <p>
                Namma Space reserves the right to review, edit, or remove any reported content 
                deemed inappropriate or inaccurate. The platform is a community awareness tool 
                and does not constitute a final legal judgment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Limitation of Liability</h2>
              <p>
                Namma Space is not responsible for any actions taken by third parties based on 
                the information provided on the platform. Users are encouraged to verify 
                information and contact authorities for serious matters.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
