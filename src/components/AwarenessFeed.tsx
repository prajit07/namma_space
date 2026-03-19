import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Clock } from "lucide-react";
import { getConfirmedReports, type Report } from "@/lib/reportStore";

const categoryColor: Record<string, string> = {
  "Scam / Fraud": "bg-warning/10 text-warning",
  "Harassment": "bg-destructive/10 text-destructive",
  "Phishing": "bg-orange-500/10 text-orange-600",
  "Impersonation": "bg-purple-500/10 text-purple-600",
  "Spam": "bg-muted text-muted-foreground",
  "Cyberbullying": "bg-destructive/10 text-destructive",
  "Financial Fraud": "bg-accent/10 text-accent",
  "Romance Scam": "bg-purple-500/10 text-purple-600",
  "Pending Review": "bg-blue-500/10 text-blue-600",
};

const AwarenessFeed = () => {
  const [accounts, setAccounts] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      const data = await getConfirmedReports();
      setAccounts(data);
      setLoading(false);
    };
    
    fetchAccounts();

    // Poll for updates every 10 seconds to reduce DB load
    const interval = setInterval(() => {
      fetchAccounts();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section id="awareness" className="py-24 bg-background">
        <div className="container text-center">
          <p className="text-muted-foreground text-lg animate-pulse">Loading awareness feed...</p>
        </div>
      </section>
    );
  }

  if (accounts.length === 0) {
    return (
      <section id="awareness" className="py-24 bg-background">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span>Community Awareness</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Flagged Accounts</h2>
          <p className="text-muted-foreground text-lg">No confirmed flagged accounts yet. Reports are under review.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="awareness" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span>Community Awareness</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Flagged Accounts
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Admin-confirmed flagged usernames. Stay alert and protect yourself.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-card rounded-xl p-5 card-shadow border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-foreground truncate">{account.username}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{account.platform}</span>
                    <span>·</span>
                    <Clock className="w-3 h-3" />
                    <span>{account.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor[account.category] ?? "bg-muted text-muted-foreground"}`}>
                  {account.category}
                </span>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {account.reportCount} reports
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-8 max-w-xl mx-auto"
        >
          Usernames are displayed for awareness only. This list does not constitute an accusation.
          All reports are community-submitted and confirmed by admin review.
        </motion.p>
      </div>
    </section>
  );
};

export default AwarenessFeed;
