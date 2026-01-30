import { ReactNode, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineSectionProps {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  iconColor: "blue" | "violet" | "amber" | "rose" | "emerald" | "slate";
  children: ReactNode;
  index: number;
  onInView?: (id: string) => void;
}

const colorConfig = {
  blue: {
    bg: "bg-accent-blue/10",
    border: "border-accent-blue/20",
    text: "text-accent-blue",
    glow: "shadow-accent-blue/10",
    gradient: "from-accent-blue/5 to-transparent",
  },
  violet: {
    bg: "bg-accent-violet/10",
    border: "border-accent-violet/20",
    text: "text-accent-violet",
    glow: "shadow-accent-violet/10",
    gradient: "from-accent-violet/5 to-transparent",
  },
  amber: {
    bg: "bg-accent-amber/10",
    border: "border-accent-amber/20",
    text: "text-accent-amber",
    glow: "shadow-accent-amber/10",
    gradient: "from-accent-amber/5 to-transparent",
  },
  rose: {
    bg: "bg-accent-rose/10",
    border: "border-accent-rose/20",
    text: "text-accent-rose",
    glow: "shadow-accent-rose/10",
    gradient: "from-accent-rose/5 to-transparent",
  },
  emerald: {
    bg: "bg-accent-emerald/10",
    border: "border-accent-emerald/20",
    text: "text-accent-emerald",
    glow: "shadow-accent-emerald/10",
    gradient: "from-accent-emerald/5 to-transparent",
  },
  slate: {
    bg: "bg-accent-slate/10",
    border: "border-accent-slate/20",
    text: "text-accent-slate",
    glow: "shadow-accent-slate/10",
    gradient: "from-accent-slate/5 to-transparent",
  },
};

const TimelineSection = ({
  id,
  title,
  subtitle,
  icon,
  iconColor,
  children,
  index,
  onInView,
}: TimelineSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const colors = colorConfig[iconColor];

  useEffect(() => {
    if (isInView && onInView) {
      onInView(id);
    }
  }, [isInView, id, onInView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="scroll-mt-24"
    >
      <div className={`relative rounded-3xl border ${colors.border} bg-card overflow-hidden
        shadow-xl ${colors.glow} transition-all duration-500
        ${isInView ? "ring-2 ring-offset-2 ring-offset-background" : ""}
        ${isInView ? colors.border.replace("/20", "/40") : ""}`}
      >
        {/* Gradient accent */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} pointer-events-none`} />

        {/* Header */}
        <div className="relative p-6 md:p-8 border-b border-border/50">
          <div className="flex items-start gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}
            >
              <span className={colors.text}>{icon}</span>
            </motion.div>
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-foreground mb-1"
              >
                {title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground"
              >
                {subtitle}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 md:p-8">
          {children}
        </div>
      </div>
    </motion.section>
  );
};

export default TimelineSection;
