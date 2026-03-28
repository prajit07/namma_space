import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users, ShieldCheck, AlertTriangle, Globe } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: AlertTriangle,
    label: "THREATS REPORTED",
    value: 1247,
    suffix: "+",
    color: "safety-orange",
  },
  {
    icon: ShieldCheck,
    label: "THREATS CONFIRMED",
    value: 892,
    suffix: "+",
    color: "safety-green",
  },
  {
    icon: Users,
    label: "COMMUNITY MEMBERS",
    value: 5300,
    suffix: "+",
    color: "safety-yellow",
  },
  {
    icon: Globe,
    label: "PLATFORMS MONITORED",
    value: 12,
    suffix: "",
    color: "bg-white",
  },
];

const useCountUp = (target: number, duration: number, shouldStart: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, shouldStart]);

  return count;
};

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const count = useCountUp(stat.value, 2000, isVisible);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="brutalist-card p-8 bg-white dark:bg-card transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] text-center"
    >
      <div
        className={`w-16 h-16 border-2 border-foreground ${stat.color} flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
      >
        <Icon className="w-8 h-8 text-black" />
      </div>
      <p className="font-display text-5xl md:text-6xl font-black text-foreground mb-2 tracking-tighter">
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="font-black text-sm uppercase tracking-widest text-foreground/60">
        {stat.label}
      </p>
    </motion.div>
  );
};

const CommunityStats = () => {
  return (
    <section className="py-24 bg-[#f0f0f0] dark:bg-background border-b-4 border-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 border-2 border-foreground bg-accent font-bold uppercase text-sm mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Users className="w-4 h-4" />
            <span>COMMUNITY IMPACT</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4 uppercase tracking-tighter">
            OUR IMPACT IN NUMBERS
          </h2>
          <p className="text-foreground font-bold text-lg max-w-2xl mx-auto uppercase tracking-tight">
            Together, we are building a safer digital world. Here is what our community has achieved.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;
