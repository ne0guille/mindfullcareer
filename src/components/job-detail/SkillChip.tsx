import { motion } from "framer-motion";

interface SkillChipProps {
  skill: string;
  variant: "matched" | "growth" | "power-verb" | "jargon" | "culture";
  delay?: number;
}

const variantConfig = {
  matched: {
    bg: "bg-accent-emerald/15",
    text: "text-accent-emerald",
    border: "border-accent-emerald/30",
    hoverBg: "hover:bg-accent-emerald/25",
  },
  growth: {
    bg: "bg-muted/50",
    text: "text-muted-foreground",
    border: "border-border",
    hoverBg: "hover:bg-muted",
  },
  "power-verb": {
    bg: "bg-accent-blue/15",
    text: "text-accent-blue",
    border: "border-accent-blue/30",
    hoverBg: "hover:bg-accent-blue/25",
  },
  jargon: {
    bg: "bg-card",
    text: "text-foreground",
    border: "border-border",
    hoverBg: "hover:bg-muted/50",
  },
  culture: {
    bg: "bg-accent-violet/15",
    text: "text-accent-violet",
    border: "border-accent-violet/30",
    hoverBg: "hover:bg-accent-violet/25",
  },
};

const SkillChip = ({ skill, variant, delay = 0 }: SkillChipProps) => {
  const config = variantConfig[variant];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay, duration: 0.2 }}
      className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium
        border transition-all duration-200 cursor-default
        ${config.bg} ${config.text} ${config.border} ${config.hoverBg}`}
    >
      {skill}
    </motion.span>
  );
};

export default SkillChip;
