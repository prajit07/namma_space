import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Clock, Search, Filter } from "lucide-react";
import { getConfirmedReports, type Report } from "@/lib/reportStore";
import { Input } from "@/components/ui/input";

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

const categories = [
  "All",
  "Scam / Fraud",
  "Harassment",
  "Phishing",
  "Impersonation",
  "Spam",
  "Cyberbullying",
  "Financial Fraud",
  "Romance Scam",
];

const AwarenessFeed = () => {
  const [accounts, setAccounts] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const matchesSearch =
        searchQuery === "" ||
        account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.platform.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || account.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [accounts, searchQuery, selectedCategory]);

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
    <section id="awareness" className="py-24 bg-white dark:bg-card border-b-4 border-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 border-2 border-foreground bg-destructive text-white font-bold uppercase text-sm mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <AlertTriangle className="w-4 h-4" />
            <span>COMMUNITY AWARENESS</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4 uppercase tracking-tighter">
            FLAGGED ACCOUNTS
          </h2>
          <p className="text-foreground font-bold text-lg max-w-2xl mx-auto uppercase tracking-tight">
            Admin-confirmed flagged usernames. Stay alert and protect yourself.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                placeholder="SEARCH BY USERNAME OR PLATFORM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="brutalist-input h-14 pl-12 uppercase font-bold"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-14 pl-12 pr-6 brutalist-input bg-background font-bold uppercase w-full sm:w-auto min-w-[200px]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {filteredAccounts.length === 0 && accounts.length > 0 && (
            <p className="text-center text-foreground/60 font-bold uppercase tracking-tight mt-6">
              No flagged accounts match your search.
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {filteredAccounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="brutalist-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
            >
              <div className="flex items-center gap-5 min-w-0">
                <div className="w-12 h-12 border-2 border-foreground bg-destructive/10 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xl font-black text-foreground truncate uppercase">{account.username}</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground/60 uppercase tracking-tight">
                    <span>{account.platform}</span>
                    <span>·</span>
                    <Clock className="w-4 h-4" />
                    <span>{account.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className={`px-4 py-1 border-2 border-foreground font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${categoryColor[account.category]?.replace('/10', '') ?? "bg-muted text-muted-foreground"}`}>
                  {account.category}
                </span>
                <span className="text-sm font-black text-foreground uppercase tracking-tight">
                  {account.reportCount} REPORTS
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
          className="text-center text-xs font-bold text-foreground/40 mt-12 max-w-xl mx-auto uppercase tracking-widest"
        >
          Usernames are displayed for awareness only. This list does not constitute an accusation.
          All reports are community-submitted and confirmed by admin review.
        </motion.p>
      </div>
    </section>
  );
};

export default AwarenessFeed;
