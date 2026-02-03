import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, TrendingUp, Lightbulb } from "lucide-react";

interface Priority {
  keyword: string;
  count: number;
  color: "emerald" | "violet" | "amber" | "blue" | "rose";
  context: string;
  insight: string;
}

interface PriorityBubbleCloudProps {
  priorities: Priority[];
}

const PriorityBubbleCloud = ({ priorities }: PriorityBubbleCloudProps) => {
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const colorMap = {
    emerald: {
      bg: "bg-accent-emerald/20",
      border: "border-accent-emerald/40",
      text: "text-accent-emerald",
      glow: "shadow-[0_0_30px_hsl(var(--accent-emerald)/0.4)]",
      gradient: "from-accent-emerald/30 to-accent-emerald/10",
      ring: "ring-accent-emerald/30",
    },
    violet: {
      bg: "bg-accent-violet/20",
      border: "border-accent-violet/40",
      text: "text-accent-violet",
      glow: "shadow-[0_0_30px_hsl(var(--accent-violet)/0.4)]",
      gradient: "from-accent-violet/30 to-accent-violet/10",
      ring: "ring-accent-violet/30",
    },
    amber: {
      bg: "bg-accent-amber/20",
      border: "border-accent-amber/40",
      text: "text-accent-amber",
      glow: "shadow-[0_0_30px_hsl(var(--accent-amber)/0.4)]",
      gradient: "from-accent-amber/30 to-accent-amber/10",
      ring: "ring-accent-amber/30",
    },
    blue: {
      bg: "bg-accent-blue/20",
      border: "border-accent-blue/40",
      text: "text-accent-blue",
      glow: "shadow-[0_0_30px_hsl(var(--accent-blue)/0.4)]",
      gradient: "from-accent-blue/30 to-accent-blue/10",
      ring: "ring-accent-blue/30",
    },
    rose: {
      bg: "bg-accent-rose/20",
      border: "border-accent-rose/40",
      text: "text-accent-rose",
      glow: "shadow-[0_0_30px_hsl(var(--accent-rose)/0.4)]",
      gradient: "from-accent-rose/30 to-accent-rose/10",
      ring: "ring-accent-rose/30",
    },
  };

  const maxCount = Math.max(...priorities.map((p) => p.count));
  const minCount = Math.min(...priorities.map((p) => p.count));

  // Calculate bubble size based on count (range: 80px - 140px)
  const getBubbleSize = (count: number) => {
    const normalized = (count - minCount) / (maxCount - minCount || 1);
    return 80 + normalized * 60;
  };

  // Arrange bubbles in a natural-looking cloud pattern
  const getBubblePosition = (index: number, total: number) => {
    // Create a more organic arrangement
    const positions = [
      { x: 50, y: 30 },   // Center top
      { x: 20, y: 50 },   // Left middle
      { x: 80, y: 45 },   // Right middle
      { x: 35, y: 70 },   // Lower left
      { x: 65, y: 75 },   // Lower right
      { x: 10, y: 25 },   // Far left top
      { x: 90, y: 20 },   // Far right top
      { x: 50, y: 55 },   // Center
      { x: 25, y: 85 },   // Bottom left
      { x: 75, y: 90 },   // Bottom right
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="relative">
      {/* Bubble Cloud Container */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/30">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 rounded-full bg-accent-violet/5 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-accent-blue/5 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Bubbles */}
        {priorities.map((priority, index) => {
          const colors = colorMap[priority.color];
          const size = getBubbleSize(priority.count);
          const position = getBubblePosition(index, priorities.length);
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: isHovered ? 0 : [0, 5, -5, 0],
                y: isHovered ? 0 : [0, -5, 5, 0],
              }}
              transition={{
                scale: { delay: index * 0.1, duration: 0.5, type: "spring" },
                opacity: { delay: index * 0.1, duration: 0.3 },
                x: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
              onClick={() => setSelectedPriority(priority)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="absolute cursor-pointer"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
              }}
            >
              <div
                className={`relative w-full h-full rounded-full border-2 ${colors.border} ${colors.bg}
                  backdrop-blur-sm flex flex-col items-center justify-center p-3
                  transition-all duration-300 group
                  ${isHovered ? colors.glow : ""}`}
              >
                {/* Count badge */}
                <motion.div
                  className={`absolute -top-1 -right-1 w-7 h-7 rounded-full ${colors.bg} ${colors.border} border
                    flex items-center justify-center`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <span className={`text-xs font-bold ${colors.text}`}>
                    {priority.count}×
                  </span>
                </motion.div>

                {/* Sparkle effect on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -top-2 -left-2"
                    >
                      <Sparkles className={`w-4 h-4 ${colors.text}`} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Keyword */}
                <span
                  className={`text-center font-semibold leading-tight ${colors.text}`}
                  style={{ fontSize: size > 100 ? "0.875rem" : "0.75rem" }}
                >
                  {priority.keyword}
                </span>

                {/* Tap hint */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="text-[10px] text-muted-foreground mt-1"
                >
                  Click for insight
                </motion.span>
              </div>
            </motion.div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
            <span>Less frequent</span>
          </div>
          <span>→</span>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-muted-foreground/50" />
            <span>More frequent</span>
          </div>
        </div>
      </div>

      {/* Insight Modal */}
      <AnimatePresence>
        {selectedPriority && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPriority(null)}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                w-[90%] max-w-md"
            >
              <div
                className={`relative rounded-3xl border ${colorMap[selectedPriority.color].border}
                  bg-gradient-to-br ${colorMap[selectedPriority.color].gradient}
                  backdrop-blur-xl p-6 shadow-2xl`}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedPriority(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted
                    transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-2xl ${colorMap[selectedPriority.color].bg}
                      ${colorMap[selectedPriority.color].border} border`}
                  >
                    <TrendingUp className={`w-6 h-6 ${colorMap[selectedPriority.color].text}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      "{selectedPriority.keyword}"
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Mentioned {selectedPriority.count} times
                    </p>
                  </div>
                </div>

                {/* Context */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground italic border-l-2 border-border pl-3">
                    {selectedPriority.context}
                  </p>
                </div>

                {/* Insight */}
                <div
                  className={`p-4 rounded-2xl bg-background/50 border ${colorMap[selectedPriority.color].border}`}
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className={`w-5 h-5 ${colorMap[selectedPriority.color].text} shrink-0 mt-0.5`} />
                    <p className="text-sm text-foreground leading-relaxed">
                      {selectedPriority.insight}
                    </p>
                  </div>
                </div>

                {/* Frequency indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Frequency:</span>
                  <div className="flex-1 h-2 rounded-full bg-muted/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(selectedPriority.count / maxCount) * 100}%`,
                      }}
                      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                      className={`h-full ${colorMap[selectedPriority.color].bg.replace("/20", "")} rounded-full`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriorityBubbleCloud;
