import { motion } from "framer-motion";
import { ShieldAlert, Info } from "lucide-react";

export type ThreatLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

interface ThreatLevelIndicatorProps {
  level?: ThreatLevel;
}

const ThreatLevelIndicator = ({ level = "HIGH" }: ThreatLevelIndicatorProps) => {
  const getLevelColor = (l: ThreatLevel) => {
    switch (l) {
      case "LOW": return "bg-green-400";
      case "MODERATE": return "safety-yellow";
      case "HIGH": return "safety-orange";
      case "CRITICAL": return "bg-red-600";
    }
  };

  const getLevelValue = (l: ThreatLevel) => {
    switch (l) {
      case "LOW": return 25;
      case "MODERATE": return 50;
      case "HIGH": return 75;
      case "CRITICAL": return 100;
    }
  };

  return (
    <div className="brutalist-card bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col gap-4">
      <div className="flex items-center justify-between border-b-2 border-foreground pb-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-foreground" />
          <h3 className="font-display font-black uppercase text-xl tracking-tight">CYBER THREAT LEVEL</h3>
        </div>
        <div className="p-1 border-2 border-foreground bg-accent hover:rotate-6 transition-transform cursor-help">
          <Info className="w-4 h-4 text-accent-foreground" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between font-black uppercase tracking-widest text-sm">
          <span>NORMAL</span>
          <span className={level === "CRITICAL" ? "text-red-600 animate-pulse" : ""}>CRITICAL</span>
        </div>
        
        <div className="h-10 border-4 border-foreground bg-muted relative overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getLevelValue(level)}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className={`h-full ${getLevelColor(level)} border-r-4 border-foreground`}
          />
        </div>
        
        <div className="flex items-center justify-center bg-black text-white p-2 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(255,255,100,0.5)]">
          <span className="font-display font-black text-2xl uppercase tracking-tighter italic mr-2">
            {level}:
          </span>
          <span className="font-bold text-xs uppercase tracking-tight leading-none max-w-[150px]">
            ELEVATED RISK OF PHISHING & IDENTITY THEFT DETECTED IN THE REGION.
          </span>
        </div>
      </div>

      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2 border-t border-foreground/10 pt-2">
        LAST UPDATED: MARCH 19, 2026 | DO NOT SHARE PASSWORDS OR OTP.
      </p>
    </div>
  );
};

export default ThreatLevelIndicator;
