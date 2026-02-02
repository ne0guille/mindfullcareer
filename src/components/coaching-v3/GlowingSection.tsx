import { motion } from "framer-motion";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface GlowingSectionProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  color: "blue" | "violet" | "emerald" | "amber" | "rose";
  children: ReactNode;
  delay?: number;
}

const GlowingSection = ({
  title,
  subtitle,
  icon: Icon,
  color,
  children,
  delay = 0,
}: GlowingSectionProps) => {
  const colorMap = {
    blue: {
      bg: "bg-accent-blue/10",
      border: "border-accent-blue/30",
      text: "text-accent-blue",
      glow: "shadow-accent-blue/20",
      gradient: "from-accent-blue/20 to-transparent",
    },
    violet: {
      bg: "bg-accent-violet/10",
      border: "border-accent-violet/30",
      text: "text-accent-violet",
      glow: "shadow-accent-violet/20",
      gradient: "from-accent-violet/20 to-transparent",
    },
    emerald: {
      bg: "bg-accent-emerald/10",
      border: "border-accent-emerald/30",
      text: "text-accent-emerald",
      glow: "shadow-accent-emerald/20",
      gradient: "from-accent-emerald/20 to-transparent",
    },
    amber: {
      bg: "bg-accent-amber/10",
      border: "border-accent-amber/30",
      text: "text-accent-amber",
      glow: "shadow-accent-amber/20",
      gradient: "from-accent-amber/20 to-transparent",
    },
    rose: {
      bg: "bg-accent-rose/10",
      border: "border-accent-rose/30",
      text: "text-accent-rose",
      glow: "shadow-accent-rose/20",
      gradient: "from-accent-rose/20 to-transparent",
    },
  };

  const styles = colorMap[color];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Background glow */}
      <motion.div
        className={`absolute -inset-4 rounded-[2rem] bg-gradient-to-br ${styles.gradient} opacity-0 blur-2xl`}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 1 }}
      />

      <div className="relative">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.1 }}
        >
          <motion.div
            className={`p-3 rounded-2xl ${styles.bg} ${styles.border} border shadow-lg ${styles.glow}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className={`w-6 h-6 ${styles.text}`} />
          </motion.div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>

          {/* Animated line */}
          <motion.div
            className={`flex-1 h-px bg-gradient-to-r ${styles.gradient}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GlowingSection;
