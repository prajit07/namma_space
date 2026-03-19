import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const INITIAL_ALERTS = [
  "🚨 ALERT: NEW APPLE IOS EXPLOIT 'DARKSWORD' DETECTED TARGETING VERSIONS 18.4 - 18.7.",
  "⚠️ WARNING: CISA ISSUES URGENT PATCH FOR CRITICAL MICROSOFT SHAREPOINT VULNERABILITY.",
  "🛑 RANSOMWARE: INTERLOCK GROUP EXPLOITED HIGH-SEVERITY CISCO FIREWALL FLAW FOR WEEKS.",
  "🔍 SUCCESS: OKTA THREAT INTEL DISMANTLES 'SHIELDGUARD' MALICIOUS CRYPTO SCAM.",
  "🤖 AI THREAT: 96% OF SECURITY LEADERS SEE AI-ENABLED ATTACKS AS A SIGNIFICANT RISK.",
];

const SafetyAlertTicker = () => {
  const [news, setNews] = useState<string[]>(INITIAL_ALERTS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using a public RSS-to-JSON converter for The Hacker News feed
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://thehackernews.com/feeds/posts/default"
        );
        const data = await response.json();
        
        if (data.status === "ok" && data.items && data.items.length > 0) {
          const latestHeadlines = data.items.slice(0, 5).map((item: any) => 
            `📰 LATEST: ${item.title.toUpperCase()}.`
          );
          setNews(latestHeadlines);
          setIsLive(true);
        }
      } catch (error) {
        console.error("Failed to fetch live cyber news, using fallbacks:", error);
        setIsLive(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 600000); // Refresh every 10 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white py-3 border-b-4 border-foreground overflow-hidden whitespace-nowrap relative z-40">
      <div className="container flex items-center">
        <div className="flex items-center gap-2 bg-destructive px-3 py-1 border-2 border-white mr-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex-shrink-0">
          {isLive ? (
            <RefreshCw className="w-4 h-4 text-white animate-spin-slow" />
          ) : (
            <AlertCircle className="w-4 h-4 text-white" />
          )}
          <span className="font-display font-black text-xs uppercase tracking-widest">
            {isLive ? "LIVE NEWS" : "CAUTION"}
          </span>
        </div>
        
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
            className="flex gap-12 whitespace-nowrap"
          >
            {news.map((alert, index) => (
              <span key={index} className="font-bold text-sm uppercase tracking-tight text-white/90">
                {alert}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {news.map((alert, index) => (
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
