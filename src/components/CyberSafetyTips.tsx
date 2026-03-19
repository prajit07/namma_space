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
    <section id="safety-tips" className="py-24 bg-secondary/30 border-y border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Education Hub</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cyber Safety Guidelines
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay one step ahead of cyber threats. Keep these essential practices in mind while navigating the digital space.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 card-shadow border border-border hover:elevated-shadow transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:-translate-y-1 ${tip.bg}`}>
                <tip.icon className={`w-7 h-7 ${tip.color}`} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {tip.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
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
