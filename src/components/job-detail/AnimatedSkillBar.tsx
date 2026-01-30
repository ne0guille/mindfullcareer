import { motion } from "framer-motion";

interface AnimatedSkillBarProps {
  label: string;
  count: number;
  maxCount?: number;
  color: "emerald" | "violet" | "amber" | "blue" | "rose";
  delay?: number;
}

const colorConfig = {
  emerald: {
    bg: "bg-accent-emerald",
    light: "bg-accent-emerald/20",
  },
  violet: {
    bg: "bg-accent-violet",
    light: "bg-accent-violet/20",
  },
  amber: {
    bg: "bg-accent-amber",
    light: "bg-accent-amber/20",
  },
  blue: {
    bg: "bg-accent-blue",
    light: "bg-accent-blue/20",
  },
  rose: {
    bg: "bg-accent-rose",
    light: "bg-accent-rose/20",
  },
};

const AnimatedSkillBar = ({
  label,
  count,
  maxCount = 5,
  color,
  delay = 0,
}: AnimatedSkillBarProps) => {
  const percentage = Math.min((count / maxCount) * 100, 100);
  const config = colorConfig[color];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-sm text-foreground font-medium tracking-tight">
          {label}
        </span>
        <span className="text-xs text-muted-foreground">
          mentioned {count}×
        </span>
      </div>
      
      <div className={`h-2 rounded-full ${config.light} overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.6, ease: "easeOut" }}
          className={`h-full rounded-full ${config.bg} relative`}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, delay: delay + 0.8, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedSkillBar;
