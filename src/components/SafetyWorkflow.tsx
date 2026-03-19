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
    <section id="workflow" className="py-24 bg-white border-b-4 border-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4 uppercase tracking-tighter">
            SAFETY WORKFLOW
          </h2>
          <p className="text-foreground font-bold text-lg max-w-2xl mx-auto uppercase tracking-tight">
            Follow these steps to protect yourself and report harmful behavior effectively
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="brutalist-card p-8 h-full bg-white transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 border-2 border-foreground flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${step.color.replace('/10', '')}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <span className="text-4xl font-black text-foreground/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-black text-foreground mb-3 uppercase">
                  {step.title}
                </h3>
                <p className="text-foreground/80 font-bold text-sm leading-tight uppercase tracking-tight">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyWorkflow;
