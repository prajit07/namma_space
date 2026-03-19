import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-[#f0f0f0] border-b-4 border-foreground">
      {/* Background geometric accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] border-4 border-foreground bg-secondary rotate-12" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] border-4 border-foreground bg-accent -rotate-12" />
      </div>

      <div className="container relative z-10 py-20 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 border-2 border-foreground bg-white font-bold uppercase text-sm mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Shield className="w-4 h-4" />
              <span>DIGITAL SAFETY FOR EVERYONE</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-6xl md:text-8xl font-black text-foreground mb-6 leading-none"
          >
            YOUR SAFE SPACE
            <br />
            <span className="bg-primary text-white border-4 border-foreground px-4 inline-block mt-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              AGAINST HARM
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-bold text-foreground/80 mb-12 max-w-2xl mx-auto uppercase tracking-tight"
          >
            Report harassment, collect evidence, and connect with 
            cybercrime support. Your safety matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              size="lg"
              className="brutalist-button safety-orange h-16 px-10 text-xl"
              onClick={() => document.getElementById("report-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              REPORT AN INCIDENT
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="brutalist-button bg-white h-16 px-10 text-xl"
              onClick={() => document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })}
            >
              LEARN MORE
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
