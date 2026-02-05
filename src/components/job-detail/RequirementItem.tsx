import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb, CheckCircle2 } from "lucide-react";
import PriorityBadge from "./PriorityBadge";

interface RequirementItemProps {
  text: string;
  priority: "high" | "medium" | "low";
  matched?: boolean;
  insight?: string;
  delay?: number;
  compact?: boolean;
}

const RequirementItem = ({
  text,
  priority,
  matched = false,
  insight,
  delay = 0,
  compact = false,
}: RequirementItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="group"
    >
      <button
        onClick={() => insight && setIsExpanded(!isExpanded)}
        className={`w-full flex items-center gap-2 ${compact ? "p-3" : "p-4"} rounded-xl text-left
          transition-all duration-300 border border-transparent
          ${isExpanded ? "bg-muted/50 border-border/50" : "hover:bg-muted/30"}
          ${insight ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* Match indicator */}
        {matched ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`${compact ? "w-5 h-5" : "w-6 h-6"} rounded-full bg-accent-emerald/15 flex items-center justify-center flex-shrink-0`}
          >
            <CheckCircle2 className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-accent-emerald`} />
          </motion.div>
        ) : (
          <div className={`${compact ? "w-5 h-5" : "w-6 h-6"} rounded-full border-2 border-border flex-shrink-0`} />
        )}

        {/* Priority badge */}
        <PriorityBadge priority={priority} />

        {/* Text */}
        <span className={`flex-1 ${compact ? "text-xs" : "text-sm"} ${matched ? "text-foreground" : "text-muted-foreground"} line-clamp-2`}>
          "{text}"
        </span>

        {/* Expand icon */}
        {insight && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-muted-foreground"
          >
            <ChevronDown className={`${compact ? "w-3 h-3" : "w-4 h-4"}`} />
          </motion.div>
        )}
      </button>

      {/* Insight panel */}
      <AnimatePresence>
        {isExpanded && insight && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={`${compact ? "ml-7 mr-2 mb-1 p-2" : "ml-9 mr-4 mb-2 p-4"} rounded-xl bg-accent-amber/10 border border-accent-amber/20`}>
              <div className="flex items-start gap-2">
                <Lightbulb className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-accent-amber mt-0.5 flex-shrink-0`} />
                <p className={`${compact ? "text-xs" : "text-sm"} text-foreground/80 italic`}>{insight}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RequirementItem;
