import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Quote, X } from "lucide-react";

interface FloatingInsightOrbProps {
  insight: string;
  color: "violet" | "blue" | "emerald" | "amber" | "rose";
  position: { x: string; y: string };
  delay?: number;
}

const FloatingInsightOrb = ({ insight, color, position, delay = 0 }: FloatingInsightOrbProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorMap = {
    violet: {
      bg: "bg-accent-violet/20",
      border: "border-accent-violet/40",
      text: "text-accent-violet",
      glow: "shadow-accent-violet/30",
    },
    blue: {
      bg: "bg-accent-blue/20",
      border: "border-accent-blue/40",
      text: "text-accent-blue",
      glow: "shadow-accent-blue/30",
    },
    emerald: {
      bg: "bg-accent-emerald/20",
      border: "border-accent-emerald/40",
      text: "text-accent-emerald",
      glow: "shadow-accent-emerald/30",
    },
    amber: {
      bg: "bg-accent-amber/20",
      border: "border-accent-amber/40",
      text: "text-accent-amber",
      glow: "shadow-accent-amber/30",
    },
    rose: {
      bg: "bg-accent-rose/20",
      border: "border-accent-rose/40",
      text: "text-accent-rose",
      glow: "shadow-accent-rose/30",
    },
  };

  const styles = colorMap[color];

  return (
    <>
      {/* Floating orb */}
      <motion.button
        className={`
          absolute z-20 w-12 h-12 rounded-full
          ${styles.bg} ${styles.border} border-2
          flex items-center justify-center
          cursor-pointer hover:scale-110 transition-transform
          shadow-lg ${styles.glow}
        `}
        style={{ left: position.x, top: position.y }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: [0, -8, 0],
        }}
        transition={{ 
          scale: { delay, duration: 0.5, type: "spring" },
          y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={() => setIsExpanded(true)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <Quote className={`w-5 h-5 ${styles.text}`} />
      </motion.button>

      {/* Expanded insight modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsExpanded(false)}
            />

            {/* Content */}
            <motion.div
              className={`
                relative max-w-md p-6 rounded-3xl
                bg-card/95 backdrop-blur-md border ${styles.border}
                shadow-2xl ${styles.glow}
              `}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className={`inline-flex p-3 rounded-2xl ${styles.bg} mb-4`}>
                <Quote className={`w-6 h-6 ${styles.text}`} />
              </div>

              <p className="text-foreground font-medium leading-relaxed">
                {insight}
              </p>

              <motion.div
                className={`mt-4 h-1 rounded-full ${styles.bg}`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingInsightOrb;
