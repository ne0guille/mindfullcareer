import { motion } from "framer-motion";
import { Check, Lightbulb, Sparkles } from "lucide-react";
import { useState } from "react";

interface SkillMatchCardProps {
  skill: string;
  evidence?: string | null;
  hasIdea?: boolean;
  matchType: "perfect" | "partial" | "opportunity";
  delay?: number;
}

const SkillMatchCard = ({ skill, evidence, hasIdea, matchType, delay = 0 }: SkillMatchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);

  const getMatchStyles = () => {
    switch (matchType) {
      case "perfect":
        return {
          bg: "bg-accent-emerald/10",
          border: "border-accent-emerald/30",
          icon: "text-accent-emerald",
          glow: "shadow-accent-emerald/20",
        };
      case "partial":
        return {
          bg: "bg-accent-blue/10",
          border: "border-accent-blue/30",
          icon: "text-accent-blue",
          glow: "shadow-accent-blue/20",
        };
      case "opportunity":
        return {
          bg: "bg-accent-amber/10",
          border: "border-accent-amber/30",
          icon: "text-accent-amber",
          glow: "shadow-accent-amber/20",
        };
    }
  };

  const styles = getMatchStyles();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => evidence && setShowEvidence(!showEvidence)}
      className={`
        relative p-4 rounded-2xl border cursor-pointer
        ${styles.bg} ${styles.border}
        transition-all duration-300
        ${isHovered ? `shadow-lg ${styles.glow}` : ""}
      `}
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${
            matchType === "perfect" 
              ? "hsl(var(--accent-emerald) / 0.1)" 
              : matchType === "partial"
                ? "hsl(var(--accent-blue) / 0.1)"
                : "hsl(var(--accent-amber) / 0.1)"
          } 100%)`,
        }}
      />

      <div className="relative z-10 flex items-start gap-3">
        <motion.div
          className={`p-1.5 rounded-lg ${styles.bg}`}
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {matchType === "perfect" && <Check className={`w-4 h-4 ${styles.icon}`} />}
          {matchType === "partial" && <Sparkles className={`w-4 h-4 ${styles.icon}`} />}
          {matchType === "opportunity" && <Lightbulb className={`w-4 h-4 ${styles.icon}`} />}
        </motion.div>

        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{skill}</p>
          
          {/* Evidence reveal */}
          <motion.div
            initial={false}
            animate={{ 
              height: showEvidence && evidence ? "auto" : 0,
              opacity: showEvidence && evidence ? 1 : 0 
            }}
            className="overflow-hidden"
          >
            <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50 italic">
              "{evidence}"
            </p>
          </motion.div>

          {hasIdea && !evidence && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-accent-amber mt-1 flex items-center gap-1"
            >
              <Lightbulb className="w-3 h-3" />
              Click for tips to strengthen this
            </motion.p>
          )}

          {evidence && (
            <motion.p
              className="text-xs text-muted-foreground mt-1"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {showEvidence ? "Click to hide evidence" : "Click to see evidence"}
            </motion.p>
          )}
        </div>
      </div>

      {/* Match indicator pulse */}
      {matchType === "perfect" && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-emerald"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default SkillMatchCard;
