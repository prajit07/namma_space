import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThreatLevelIndicator from "./ThreatLevelIndicator";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-[#f0f0f0] border-b-4 border-foreground py-20">
      {/* Background geometric accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] border-4 border-foreground bg-secondary rotate-12" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] border-4 border-foreground bg-accent -rotate-12" />
      </div>

      <div className="container relative z-10 pt-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-8 text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 border-2 border-foreground bg-white font-bold uppercase text-sm mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Shield className="w-4 h-4" />
                <span>COMMUNITY DRIVEN DIGITAL SAFETY</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-7xl md:text-8xl xl:text-9xl font-black text-foreground uppercase leading-[0.8] tracking-tighter text-left"
            >
              RECLAIM <br />
              <span className="text-primary italic">YOUR</span> SPACE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl font-bold text-foreground max-w-xl uppercase tracking-tight leading-tight text-left"
            >
              The digital world belongs to all of us. Report harassment, collect evidence, and keep the community safe from cyber threats.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              <Button
                size="lg"
                className="brutalist-button safety-orange h-20 px-10 text-2xl font-black -rotate-1 hover:rotate-0"
                onClick={() => document.getElementById("report-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                REPORT NOW
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="brutalist-button bg-white h-20 px-10 text-2xl font-black rotate-1 hover:rotate-0"
                onClick={() => document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })}
              >
                LEARN MORE
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <ThreatLevelIndicator />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
