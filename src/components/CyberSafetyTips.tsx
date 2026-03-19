import { motion } from "framer-motion";
import { ShieldCheck, Lock, Smartphone, GlobeLock } from "lucide-react";

const tips = [
  {
    icon: GlobeLock,
    title: "Beware of Phishing",
    description: "Never click on suspicious links from unknown sources. Always verify the sender's email address and look for HTTPS in URLs.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Lock,
    title: "Strong & Unique Passwords",
    description: "Use a mix of letters, numbers, and symbols. Avoid using the same password across multiple platforms to protect your accounts.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Smartphone,
    title: "Enable 2-Factor Auth (2FA)",
    description: "Adds an extra layer of security. Even if someone steals your password, they cannot access your account without the second factor.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Social Media Privacy",
    description: "Regularly review your privacy settings. Do not share sensitive personal information (like your home address or phone number) publicly.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const CyberSafetyTips = () => {
  return (
    <section id="safety-tips" className="py-24 bg-white border-b-4 border-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 border-2 border-foreground bg-secondary font-bold uppercase text-sm mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="w-4 h-4" />
            <span>EDUCATION HUB</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4 uppercase tracking-tighter">
            CYBER SAFETY GUIDELINES
          </h2>
          <p className="text-foreground font-bold text-lg max-w-2xl mx-auto uppercase tracking-tight">
            Stay one step ahead of cyber threats with essential digital practices
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="brutalist-card p-8 h-full bg-white transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group"
            >
              <div className={`w-14 h-14 border-2 border-foreground flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${tip.bg.replace('/10', '')}`}>
                <tip.icon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="font-display text-2xl font-black text-foreground mb-3 uppercase tracking-tight">
                {tip.title}
              </h3>
              <p className="text-foreground/80 font-bold text-sm leading-tight uppercase tracking-tight">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CyberSafetyTips;
