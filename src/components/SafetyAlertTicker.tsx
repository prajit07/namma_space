import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const alerts = [
  "🚨 ALERT: NEW PHISHING CAMPAIGN TARGETING BANKING USERS IN THE REGION.",
  "⚠️ SAFETY TIP: ENABLE TWO-FACTOR AUTHENTICATION ON ALL SOCIAL MEDIA ACCOUNTS.",
  "🛑 WARNING: NEVER SHARE YOUR OTP WITH ANYONE CLAIMING TO BE FROM 'NAMMA SPACE'.",
  "🔍 INFO: WE'VE FLAGGED 5 NEW SUSPICIOUS ACCOUNTS IN THE LAST 24 HOURS.",
  "💻 TECH TIP: KEEP YOUR BROWSER AND ANTIVIRUS SOFTWARE UP TO DATE.",
];

const SafetyAlertTicker = () => {
  return (
    <div className="bg-black text-white py-3 border-b-4 border-foreground overflow-hidden whitespace-nowrap relative z-40">
      <div className="container flex items-center">
        <div className="flex items-center gap-2 bg-destructive px-3 py-1 border-2 border-white mr-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex-shrink-0">
          <AlertCircle className="w-4 h-4 text-white" />
          <span className="font-display font-black text-xs uppercase tracking-widest">LIVE ALERTS</span>
        </div>
        
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="flex gap-12 whitespace-nowrap"
          >
            {alerts.map((alert, index) => (
              <span key={index} className="font-bold text-sm uppercase tracking-tight text-white/90">
                {alert}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {alerts.map((alert, index) => (
              <span key={`loop-${index}`} className="font-bold text-sm uppercase tracking-tight text-white/90">
                {alert}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SafetyAlertTicker;
