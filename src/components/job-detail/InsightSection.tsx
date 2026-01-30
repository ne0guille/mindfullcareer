import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface InsightSectionProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  iconColor: "emerald" | "violet" | "amber" | "blue" | "rose";
  children: ReactNode;
  defaultOpen?: boolean;
  delay?: number;
}

const colorConfig = {
  emerald: {
    iconBg: "bg-accent-emerald/15",
    iconText: "text-accent-emerald",
    border: "border-accent-emerald/20",
    glow: "group-hover:shadow-[0_0_30px_-8px_hsl(var(--accent-emerald)/0.3)]",
    accent: "from-accent-emerald/5",
  },
  violet: {
    iconBg: "bg-accent-violet/15",
    iconText: "text-accent-violet",
    border: "border-accent-violet/20",
    glow: "group-hover:shadow-[0_0_30px_-8px_hsl(var(--accent-violet)/0.3)]",
    accent: "from-accent-violet/5",
  },
  amber: {
    iconBg: "bg-accent-amber/15",
    iconText: "text-accent-amber",
    border: "border-accent-amber/20",
    glow: "group-hover:shadow-[0_0_30px_-8px_hsl(var(--accent-amber)/0.3)]",
    accent: "from-accent-amber/5",
  },
  blue: {
    iconBg: "bg-accent-blue/15",
    iconText: "text-accent-blue",
    border: "border-accent-blue/20",
    glow: "group-hover:shadow-[0_0_30px_-8px_hsl(var(--accent-blue)/0.3)]",
    accent: "from-accent-blue/5",
  },
  rose: {
    iconBg: "bg-accent-rose/15",
    iconText: "text-accent-rose",
    border: "border-accent-rose/20",
    glow: "group-hover:shadow-[0_0_30px_-8px_hsl(var(--accent-rose)/0.3)]",
    accent: "from-accent-rose/5",
  },
};

const InsightSection = ({
  title,
  subtitle,
  icon,
  iconColor,
  children,
  defaultOpen = true,
  delay = 0,
}: InsightSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = colorConfig[iconColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`group relative bg-card/80 backdrop-blur-sm rounded-3xl border ${config.border}
        overflow-hidden transition-all duration-500 ${config.glow}`}
    >
      {/* Gradient accent top bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.accent} to-transparent`} />
      
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-6 text-left hover:bg-muted/30 transition-colors"
      >
        <div className={`w-12 h-12 rounded-2xl ${config.iconBg} ${config.iconText} 
          flex items-center justify-center transition-transform duration-300
          ${isOpen ? "rotate-0" : "rotate-[-5deg]"}`}
        >
          {icon}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InsightSection;
