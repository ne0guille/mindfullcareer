import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb, Quote, Sparkles } from "lucide-react";

interface Priority {
  keyword: string;
  count: number;
  color: "emerald" | "violet" | "amber" | "blue" | "rose";
  context: string;
  insight: string;
}

interface PriorityGlassCardsProps {
  priorities: Priority[];
}

const PriorityGlassCards = ({ priorities }: PriorityGlassCardsProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const colorMap = {
    emerald: {
      gradient: "from-accent-emerald/20 via-accent-emerald/10 to-transparent",
      border: "border-accent-emerald/30",
      glow: "shadow-accent-emerald/20",
      text: "text-accent-emerald",
      badge: "bg-accent-emerald/20 text-accent-emerald",
      ring: "ring-accent-emerald/40",
    },
    violet: {
      gradient: "from-accent-violet/20 via-accent-violet/10 to-transparent",
      border: "border-accent-violet/30",
      glow: "shadow-accent-violet/20",
      text: "text-accent-violet",
      badge: "bg-accent-violet/20 text-accent-violet",
      ring: "ring-accent-violet/40",
    },
    amber: {
      gradient: "from-accent-amber/20 via-accent-amber/10 to-transparent",
      border: "border-accent-amber/30",
      glow: "shadow-accent-amber/20",
      text: "text-accent-amber",
      badge: "bg-accent-amber/20 text-accent-amber",
      ring: "ring-accent-amber/40",
    },
    blue: {
      gradient: "from-accent-blue/20 via-accent-blue/10 to-transparent",
      border: "border-accent-blue/30",
      glow: "shadow-accent-blue/20",
      text: "text-accent-blue",
      badge: "bg-accent-blue/20 text-accent-blue",
      ring: "ring-accent-blue/40",
    },
    rose: {
      gradient: "from-accent-rose/20 via-accent-rose/10 to-transparent",
      border: "border-accent-rose/30",
      glow: "shadow-accent-rose/20",
      text: "text-accent-rose",
      badge: "bg-accent-rose/20 text-accent-rose",
      ring: "ring-accent-rose/40",
    },
  };

  // Sort by count descending
  const sortedPriorities = [...priorities].sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...priorities.map((p) => p.count));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedPriorities.map((priority, index) => {
        const colors = colorMap[priority.color];
        const isExpanded = expandedIndex === index;
        const rank = index + 1;

        return (
          <motion.div
            key={priority.keyword}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            layout
            className={`relative ${isExpanded ? "md:col-span-2 lg:col-span-2" : ""}`}
          >
            <motion.div
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              className={`relative rounded-3xl border ${colors.border} cursor-pointer 
                overflow-hidden backdrop-blur-xl bg-card/40
                shadow-xl ${colors.glow} hover:shadow-2xl
                transition-all duration-500`}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} pointer-events-none`}
              />

              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full ${colors.badge}`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>

              {/* Main content */}
              <div className="relative p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  {/* Rank badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center
                      font-bold text-sm ${colors.badge} backdrop-blur-sm
                      ring-2 ${colors.ring} shrink-0`}
                  >
                    #{rank}
                  </motion.div>

                  {/* Count indicator */}
                  <div className="flex items-center gap-1.5">
                    <Sparkles className={`w-4 h-4 ${colors.text}`} />
                    <span className={`text-lg font-bold ${colors.text}`}>
                      {priority.count}×
                    </span>
                  </div>
                </div>

                {/* Keyword */}
                <h4 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                  "{priority.keyword}"
                </h4>

                {/* Frequency bar */}
                <div className="relative h-2 rounded-full bg-muted/30 overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(priority.count / maxCount) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${colors.gradient.replace('/20', '/60').replace('/10', '/40')}`}
                  />
                </div>

                {/* Expand indicator */}
                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                      bg-background/50 backdrop-blur-sm`}
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </div>
              </div>

              {/* Expanded insight section */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={`relative px-5 pb-5 pt-3 border-t ${colors.border}`}>
                      {/* Context quote */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-start gap-3 mb-4"
                      >
                        <Quote className={`w-5 h-5 ${colors.text} shrink-0 mt-0.5`} />
                        <p className="text-sm text-muted-foreground italic leading-relaxed">
                          {priority.context}
                        </p>
                      </motion.div>

                      {/* Insight card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`flex items-start gap-3 p-4 rounded-2xl 
                          bg-background/60 backdrop-blur-sm border ${colors.border}`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center
                          ${colors.badge} shrink-0`}>
                          <Lightbulb className="w-4 h-4" />
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          {priority.insight}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PriorityGlassCards;
