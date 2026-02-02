import { motion } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";

interface Priority {
  keyword: string;
  count: number;
  color: "emerald" | "violet" | "amber" | "blue" | "rose";
  context: string;
  insight: string;
}

interface HiddenPrioritiesGridProps {
  priorities: Priority[];
}

const HiddenPrioritiesGrid = ({ priorities }: HiddenPrioritiesGridProps) => {
  const colorMap = {
    emerald: {
      bg: "bg-accent-emerald/10",
      border: "border-accent-emerald/30",
      text: "text-accent-emerald",
      glow: "shadow-accent-emerald/30",
      bar: "bg-accent-emerald",
      gradient: "from-accent-emerald/20 to-accent-emerald/5",
    },
    violet: {
      bg: "bg-accent-violet/10",
      border: "border-accent-violet/30",
      text: "text-accent-violet",
      glow: "shadow-accent-violet/30",
      bar: "bg-accent-violet",
      gradient: "from-accent-violet/20 to-accent-violet/5",
    },
    amber: {
      bg: "bg-accent-amber/10",
      border: "border-accent-amber/30",
      text: "text-accent-amber",
      glow: "shadow-accent-amber/30",
      bar: "bg-accent-amber",
      gradient: "from-accent-amber/20 to-accent-amber/5",
    },
    blue: {
      bg: "bg-accent-blue/10",
      border: "border-accent-blue/30",
      text: "text-accent-blue",
      glow: "shadow-accent-blue/30",
      bar: "bg-accent-blue",
      gradient: "from-accent-blue/20 to-accent-blue/5",
    },
    rose: {
      bg: "bg-accent-rose/10",
      border: "border-accent-rose/30",
      text: "text-accent-rose",
      glow: "shadow-accent-rose/30",
      bar: "bg-accent-rose",
      gradient: "from-accent-rose/20 to-accent-rose/5",
    },
  };

  const maxCount = Math.max(...priorities.map((p) => p.count));

  return (
    <div className="space-y-4">
      {priorities.map((priority, i) => {
        const colors = colorMap[priority.color];
        const percentage = (priority.count / maxCount) * 100;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              className={`relative overflow-hidden rounded-2xl border ${colors.border} 
                bg-gradient-to-r ${colors.gradient} backdrop-blur-sm
                p-5 cursor-pointer group transition-all duration-300`}
            >
              {/* Animated background glow on hover */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl ${colors.bg}`}
              />

              <div className="relative z-10">
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                      className={`p-2 rounded-xl ${colors.bg} ${colors.border} border`}
                    >
                      <TrendingUp className={`w-4 h-4 ${colors.text}`} />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground text-lg">
                        "{priority.keyword}"
                      </h4>
                      <p className="text-xs text-muted-foreground">{priority.context}</p>
                    </div>
                  </div>

                  {/* Count badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, type: "spring" }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border`}
                  >
                    <Sparkles className={`w-3 h-3 ${colors.text}`} />
                    <span className={`text-sm font-bold ${colors.text}`}>
                      {priority.count}×
                    </span>
                  </motion.div>
                </div>

                {/* Progress bar */}
                <div className="relative h-2 rounded-full bg-muted/50 overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute inset-y-0 left-0 ${colors.bar} rounded-full`}
                  >
                    {/* Shine animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, delay: i * 0.15 + 0.8, repeat: Infinity, repeatDelay: 4 }}
                    />
                  </motion.div>
                </div>

                {/* Insight */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.5 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  💡 {priority.insight}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HiddenPrioritiesGrid;
