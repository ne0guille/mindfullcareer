import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb, Quote } from "lucide-react";

interface Priority {
  keyword: string;
  count: number;
  color: "emerald" | "violet" | "amber" | "blue" | "rose";
  context: string;
  insight: string;
}

interface PriorityRankedBarsProps {
  priorities: Priority[];
}

const PriorityRankedBars = ({ priorities }: PriorityRankedBarsProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const colorMap = {
    emerald: {
      bar: "bg-gradient-to-r from-accent-emerald to-accent-emerald/70",
      bg: "bg-accent-emerald/10",
      border: "border-accent-emerald/30",
      text: "text-accent-emerald",
      badge: "bg-accent-emerald/20 text-accent-emerald border-accent-emerald/40",
    },
    violet: {
      bar: "bg-gradient-to-r from-accent-violet to-accent-violet/70",
      bg: "bg-accent-violet/10",
      border: "border-accent-violet/30",
      text: "text-accent-violet",
      badge: "bg-accent-violet/20 text-accent-violet border-accent-violet/40",
    },
    amber: {
      bar: "bg-gradient-to-r from-accent-amber to-accent-amber/70",
      bg: "bg-accent-amber/10",
      border: "border-accent-amber/30",
      text: "text-accent-amber",
      badge: "bg-accent-amber/20 text-accent-amber border-accent-amber/40",
    },
    blue: {
      bar: "bg-gradient-to-r from-accent-blue to-accent-blue/70",
      bg: "bg-accent-blue/10",
      border: "border-accent-blue/30",
      text: "text-accent-blue",
      badge: "bg-accent-blue/20 text-accent-blue border-accent-blue/40",
    },
    rose: {
      bar: "bg-gradient-to-r from-accent-rose to-accent-rose/70",
      bg: "bg-accent-rose/10",
      border: "border-accent-rose/30",
      text: "text-accent-rose",
      badge: "bg-accent-rose/20 text-accent-rose border-accent-rose/40",
    },
  };

  // Sort by count descending
  const sortedPriorities = [...priorities].sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...priorities.map((p) => p.count));

  return (
    <div className="space-y-3">
      {sortedPriorities.map((priority, index) => {
        const colors = colorMap[priority.color];
        const percentage = (priority.count / maxCount) * 100;
        const isExpanded = expandedIndex === index;
        const rank = index + 1;

        return (
          <motion.div
            key={priority.keyword}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <motion.div
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              className={`relative rounded-2xl border ${colors.border} ${colors.bg} 
                backdrop-blur-sm cursor-pointer overflow-hidden
                transition-all duration-300 hover:shadow-lg`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Main row */}
              <div className="p-4">
                <div className="flex items-center gap-4">
                  {/* Rank number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 + 0.2, type: "spring" }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                      font-bold text-sm ${colors.badge} border shrink-0`}
                  >
                    #{rank}
                  </motion.div>

                  {/* Keyword and bar */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground truncate">
                        "{priority.keyword}"
                      </h4>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-sm font-bold ${colors.text}`}>
                          {priority.count}×
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-3 rounded-full bg-muted/30 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.08 + 0.3,
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`absolute inset-y-0 left-0 ${colors.bar} rounded-full`}
                      >
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{
                            duration: 1.5,
                            delay: index * 0.08 + 1,
                            repeat: Infinity,
                            repeatDelay: 5,
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable insight section */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={`px-4 pb-4 pt-2 border-t ${colors.border}`}>
                      {/* Context quote */}
                      <div className="flex items-start gap-2 mb-3">
                        <Quote className={`w-4 h-4 ${colors.text} shrink-0 mt-0.5`} />
                        <p className="text-sm text-muted-foreground italic">
                          {priority.context}
                        </p>
                      </div>

                      {/* Insight */}
                      <div
                        className={`flex items-start gap-2 p-3 rounded-xl 
                          bg-background/50 border ${colors.border}`}
                      >
                        <Lightbulb className={`w-4 h-4 ${colors.text} shrink-0 mt-0.5`} />
                        <p className="text-sm text-foreground leading-relaxed">
                          {priority.insight}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Summary footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: sortedPriorities.length * 0.08 + 0.2 }}
        className="flex items-center justify-center gap-2 pt-4 text-sm text-muted-foreground"
      >
        <span>Click any row to reveal insights</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </div>
  );
};

export default PriorityRankedBars;
