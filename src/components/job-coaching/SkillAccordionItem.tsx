import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb, Quote } from "lucide-react";

interface SkillAccordionItemProps {
  text: string;
  evidence?: string;
  hasIdea?: boolean;
  delay?: number;
}

const SkillAccordionItem = ({
  text,
  evidence,
  hasIdea = false,
  delay = 0,
}: SkillAccordionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="group"
    >
      <button
        onClick={() => (evidence || hasIdea) && setIsExpanded(!isExpanded)}
        className={`w-full flex items-center gap-3 p-4 rounded-2xl text-left
          transition-all duration-300 border
          ${isExpanded 
            ? "bg-muted/50 border-border/50" 
            : "bg-card border-border/30 hover:border-border/50 hover:bg-muted/30"}
          ${evidence || hasIdea ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* Text */}
        <span className={`flex-1 text-sm ${evidence ? "text-foreground" : "text-muted-foreground italic"}`}>
          {text}
        </span>

        {/* Idea indicator */}
        {hasIdea && !evidence && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-amber/15 text-accent-amber text-xs">
            <Lightbulb className="w-3 h-3" />
            idea
          </span>
        )}

        {/* Expand icon */}
        {(evidence || hasIdea) && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-muted-foreground"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </button>

      {/* Evidence panel */}
      <AnimatePresence>
        {isExpanded && evidence && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-4 mr-4 mb-2 p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20">
              <div className="flex items-start gap-2">
                <Quote className="w-4 h-4 text-accent-emerald mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground/80 italic">"{evidence}"</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SkillAccordionItem;
