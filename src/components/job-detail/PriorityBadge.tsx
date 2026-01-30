import { motion } from "framer-motion";

type Priority = "high" | "medium" | "low";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const priorityConfig = {
  high: {
    bg: "bg-accent-rose/15",
    text: "text-accent-rose",
    border: "border-accent-rose/30",
    glow: "shadow-[0_0_12px_-2px_hsl(var(--accent-rose)/0.4)]",
  },
  medium: {
    bg: "bg-accent-amber/15",
    text: "text-accent-amber",
    border: "border-accent-amber/30",
    glow: "shadow-[0_0_12px_-2px_hsl(var(--accent-amber)/0.4)]",
  },
  low: {
    bg: "bg-accent-emerald/15",
    text: "text-accent-emerald",
    border: "border-accent-emerald/30",
    glow: "shadow-[0_0_12px_-2px_hsl(var(--accent-emerald)/0.4)]",
  },
};

const PriorityBadge = ({ priority, className = "" }: PriorityBadgeProps) => {
  const config = priorityConfig[priority];

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
        ${config.bg} ${config.text} ${config.border} border ${config.glow}
        transition-all duration-200 cursor-default ${className}`}
    >
      {priority}
    </motion.span>
  );
};

export default PriorityBadge;
