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
    <section id="resources" className="py-24 bg-[#f0f0f0] dark:bg-background border-b-4 border-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4 uppercase tracking-tighter">
            EMERGENCY RESOURCES
          </h2>
          <p className="text-foreground font-bold text-lg max-w-2xl mx-auto uppercase tracking-tight">
            Get immediate help from official channels. These resources are available 24/7.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`brutalist-card p-8 h-full transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                resource.highlight ? "safety-green" : "bg-white"
              }`}
            >
              <div className="w-14 h-14 border-2 border-foreground bg-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <resource.icon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="font-display text-base font-black mb-1 uppercase tracking-tight truncate">
                {resource.title}
              </h3>
              <p className={`font-black mb-4 uppercase leading-none break-all ${resource.value.length > 15 ? 'text-2xl' : 'text-4xl'}`}>
                {resource.value}
              </p>
              <p className="text-sm font-bold opacity-80 mb-6 uppercase tracking-tight leading-tight">
                {resource.description}
              </p>
              <Button
                asChild
                className={`w-full brutalist-button ${resource.highlight ? "bg-white text-black" : "safety-yellow"}`}
              >
                <a href={resource.href} target="_blank" rel="noopener noreferrer">
                  {resource.action.toUpperCase()}
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
