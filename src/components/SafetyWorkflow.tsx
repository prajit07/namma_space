import { motion } from "framer-motion";
import { Ban, Flag, FileText, Send } from "lucide-react";

const steps = [
  {
    icon: Ban,
    title: "Block",
    description: "Block the harasser immediately to stop further contact",
    color: "bg-red-500/10 text-red-600",
  },
  {
    icon: Flag,
    title: "Report",
    description: "Report the account on the platform where the incident occurred",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: FileText,
    title: "Collect Proof",
    description: "Screenshot messages, profiles, and any evidence before it's deleted",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Send,
    title: "Submit",
    description: "Submit your report to authorities through our secure portal",
    color: "bg-accent/10 text-accent",
  },
];

const SafetyWorkflow = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Safety Workflow
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow these steps to protect yourself and report harmful online behavior effectively
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-xl p-6 card-shadow h-full border border-border hover:elevated-shadow transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${step.color}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-display font-bold text-muted-foreground/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyWorkflow;
