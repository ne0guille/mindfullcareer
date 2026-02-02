import { motion } from "framer-motion";
import { useState } from "react";

interface Keyword {
  word: string;
  count: number;
  type: "power" | "jargon" | "culture";
}

interface AnimatedKeywordCloudProps {
  keywords: Keyword[];
}

const AnimatedKeywordCloud = ({ keywords }: AnimatedKeywordCloudProps) => {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const getTypeStyles = (type: Keyword["type"]) => {
    switch (type) {
      case "power":
        return {
          bg: "bg-accent-blue/15",
          border: "border-accent-blue/30",
          text: "text-accent-blue",
          glow: "shadow-accent-blue/20",
        };
      case "jargon":
        return {
          bg: "bg-accent-violet/15",
          border: "border-accent-violet/30",
          text: "text-accent-violet",
          glow: "shadow-accent-violet/20",
        };
      case "culture":
        return {
          bg: "bg-accent-emerald/15",
          border: "border-accent-emerald/30",
          text: "text-accent-emerald",
          glow: "shadow-accent-emerald/20",
        };
    }
  };

  const maxCount = Math.max(...keywords.map((k) => k.count));

  return (
    <motion.div
      className="relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-50"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, hsl(var(--accent-blue) / 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, hsl(var(--accent-violet) / 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, hsl(var(--accent-emerald) / 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, hsl(var(--accent-blue) / 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Legend */}
      <div className="relative z-10 flex flex-wrap gap-4 mb-6 pb-4 border-b border-border/30">
        {[
          { type: "power" as const, label: "Power Verbs" },
          { type: "jargon" as const, label: "Industry Jargon" },
          { type: "culture" as const, label: "Culture Signals" },
        ].map(({ type, label }) => {
          const styles = getTypeStyles(type);
          return (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${styles.bg} border ${styles.border}`} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          );
        })}
      </div>

      {/* Word cloud */}
      <div className="relative z-10 flex flex-wrap gap-3 justify-center">
        {keywords.map((keyword, i) => {
          const styles = getTypeStyles(keyword.type);
          const scale = 0.8 + (keyword.count / maxCount) * 0.4;
          const isHovered = hoveredWord === keyword.word;

          return (
            <motion.div
              key={keyword.word}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, type: "spring", stiffness: 200 }}
              onMouseEnter={() => setHoveredWord(keyword.word)}
              onMouseLeave={() => setHoveredWord(null)}
              className={`
                relative px-4 py-2 rounded-xl border cursor-pointer
                ${styles.bg} ${styles.border}
                transition-all duration-300
                ${isHovered ? `shadow-lg ${styles.glow} scale-110` : ""}
              `}
              style={{ fontSize: `${scale}rem` }}
            >
              <span className={`font-medium ${styles.text}`}>{keyword.word}</span>

              {/* Count badge */}
              {keyword.count > 1 && (
                <motion.span
                  className={`
                    absolute -top-2 -right-2 w-5 h-5 rounded-full
                    ${styles.bg} ${styles.border} border
                    flex items-center justify-center
                    text-xs font-bold ${styles.text}
                  `}
                  animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
                >
                  {keyword.count}
                </motion.span>
              )}

              {/* Pulse effect on hover */}
              {isHovered && (
                <motion.div
                  className={`absolute inset-0 rounded-xl ${styles.bg}`}
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AnimatedKeywordCloud;
