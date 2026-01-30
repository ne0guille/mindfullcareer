import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Target, 
  TrendingUp, 
  UserCheck, 
  FileText, 
  Send,
  Check
} from "lucide-react";

interface TimelineSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: "blue" | "rose" | "emerald" | "violet" | "amber" | "slate";
}

const sections: TimelineSection[] = [
  { id: "language", label: "Language", icon: <MessageSquare className="w-4 h-4" />, color: "blue" },
  { id: "requirements", label: "Requirements", icon: <Target className="w-4 h-4" />, color: "rose" },
  { id: "priorities", label: "Priorities", icon: <TrendingUp className="w-4 h-4" />, color: "emerald" },
  { id: "fit", label: "Your Fit", icon: <UserCheck className="w-4 h-4" />, color: "violet" },
  { id: "bullets", label: "Resume", icon: <FileText className="w-4 h-4" />, color: "amber" },
  { id: "outreach", label: "Outreach", icon: <Send className="w-4 h-4" />, color: "slate" },
];

const colorConfig = {
  blue: {
    bg: "bg-accent-blue",
    text: "text-accent-blue",
    border: "border-accent-blue",
    glow: "shadow-accent-blue/30",
  },
  rose: {
    bg: "bg-accent-rose",
    text: "text-accent-rose",
    border: "border-accent-rose",
    glow: "shadow-accent-rose/30",
  },
  emerald: {
    bg: "bg-accent-emerald",
    text: "text-accent-emerald",
    border: "border-accent-emerald",
    glow: "shadow-accent-emerald/30",
  },
  violet: {
    bg: "bg-accent-violet",
    text: "text-accent-violet",
    border: "border-accent-violet",
    glow: "shadow-accent-violet/30",
  },
  amber: {
    bg: "bg-accent-amber",
    text: "text-accent-amber",
    border: "border-accent-amber",
    glow: "shadow-accent-amber/30",
  },
  slate: {
    bg: "bg-accent-slate",
    text: "text-accent-slate",
    border: "border-accent-slate",
    glow: "shadow-accent-slate/30",
  },
};

interface TimelineProgressProps {
  activeSection: string;
  completedSections: string[];
}

const TimelineProgress = ({ activeSection, completedSections }: TimelineProgressProps) => {
  const activeIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <div className="hidden lg:flex flex-col items-center gap-0 py-8">
      {sections.map((section, index) => {
        const isActive = section.id === activeSection;
        const isCompleted = completedSections.includes(section.id);
        const isPast = index < activeIndex;
        const colors = colorConfig[section.color];

        return (
          <div key={section.id} className="flex flex-col items-center">
            {/* Connector line above */}
            {index > 0 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`w-0.5 h-8 origin-top ${
                  isPast || isCompleted ? colors.bg : "bg-border"
                }`}
              />
            )}

            {/* Node */}
            <motion.button
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.1, type: "spring", stiffness: 300 }}
              className={`relative group flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 cursor-pointer
                ${isActive 
                  ? `${colors.border} ${colors.bg} text-white shadow-lg ${colors.glow}` 
                  : isCompleted || isPast
                    ? `${colors.border} bg-background ${colors.text}`
                    : "border-border bg-muted text-muted-foreground"
                }`}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                section.icon
              )}

              {/* Tooltip */}
              <span className={`absolute left-14 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                bg-card border border-border shadow-lg ${colors.text}`}>
                {section.label}
              </span>

              {/* Active pulse */}
              {isActive && (
                <motion.span
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`absolute inset-0 rounded-full ${colors.bg}`}
                />
              )}
            </motion.button>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineProgress;
export { sections };
export type { TimelineSection };
