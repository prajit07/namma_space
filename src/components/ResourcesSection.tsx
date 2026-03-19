import { motion } from "framer-motion";
import { Phone, Globe, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    icon: Phone,
    title: "Cyber Crime Helpline",
    value: "1930",
    description: "24/7 National Helpline for cyber crime incidents",
    action: "Call Now",
    href: "tel:1930",
    highlight: true,
  },
  {
    icon: Globe,
    title: "Official Portal",
    value: "cybercrime.gov.in",
    description: "Government portal for online complaint registration",
    action: "Visit Site",
    href: "https://cybercrime.gov.in",
    highlight: false,
  },
  {
    icon: Shield,
    title: "Women Helpline",
    value: "181",
    description: "Dedicated helpline for women facing online harassment",
    action: "Call Now",
    href: "tel:181",
    highlight: false,
  },
  {
    icon: AlertTriangle,
    title: "Child Safety",
    value: "1098",
    description: "CHILDLINE India for children in distress",
    action: "Call Now",
    href: "tel:1098",
    highlight: false,
  },
];

const ResourcesSection = () => {
  return (
    <section className="py-24 hero-gradient">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Emergency Resources
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Get immediate help from official channels. These resources are available 24/7.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl p-6 ${
                resource.highlight
                  ? "bg-accent text-accent-foreground"
                  : "bg-white/10 backdrop-blur-sm border border-white/20 text-primary-foreground"
              }`}
            >
              <resource.icon className={`w-10 h-10 mb-4 ${resource.highlight ? "text-accent-foreground" : "text-accent"}`} />
              <h3 className="font-display text-lg font-semibold mb-1">
                {resource.title}
              </h3>
              <p className="text-3xl font-display font-bold mb-2">
                {resource.value}
              </p>
              <p className={`text-sm mb-4 ${resource.highlight ? "text-accent-foreground/80" : "text-primary-foreground/60"}`}>
                {resource.description}
              </p>
              <Button
                asChild
                variant={resource.highlight ? "secondary" : "outline"}
                className={`w-full ${!resource.highlight && "border-white/30 text-primary-foreground hover:bg-white/10"}`}
              >
                <a href={resource.href} target="_blank" rel="noopener noreferrer">
                  {resource.action}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
