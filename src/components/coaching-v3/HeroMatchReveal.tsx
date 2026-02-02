import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Trophy, Zap } from "lucide-react";

interface HeroMatchRevealProps {
  matchScore: number;
  jobTitle: string;
  company: string;
}

const HeroMatchReveal = ({ matchScore, jobTitle, company }: HeroMatchRevealProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const controls = animate(count, matchScore, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => setShowCelebration(true),
    });

    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [matchScore, count, rounded]);

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  const getScoreColor = () => {
    if (displayValue >= 80) return "hsl(var(--accent-emerald))";
    if (displayValue >= 60) return "hsl(var(--accent-blue))";
    if (displayValue >= 40) return "hsl(var(--accent-amber))";
    return "hsl(var(--accent-rose))";
  };

  const getScoreMessage = () => {
    if (matchScore >= 85) return "Exceptional Match!";
    if (matchScore >= 70) return "Strong Match!";
    if (matchScore >= 55) return "Good Match";
    return "Potential Match";
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated background gradients */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, hsl(var(--accent-violet) / 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, hsl(var(--accent-blue) / 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, hsl(var(--accent-emerald) / 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, hsl(var(--accent-violet) / 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {showCelebration && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0 
                  ? "hsl(var(--accent-violet))" 
                  : i % 3 === 1 
                    ? "hsl(var(--accent-emerald))" 
                    : "hsl(var(--accent-amber))",
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0.5],
                opacity: [0, 1, 0],
                y: [0, -100 - Math.random() * 100],
                x: [0, (Math.random() - 0.5) * 100],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-10 text-center">
        {/* Score Ring */}
        <motion.div
          className="relative mx-auto mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="280" height="280" className="transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="140"
              cy="140"
              r="120"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
            />
            {/* Animated progress ring */}
            <motion.circle
              cx="140"
              cy="140"
              r="120"
              fill="none"
              stroke={getScoreColor()}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
              className="drop-shadow-lg"
              filter="url(#glow)"
            />
            {/* Glow filter */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-7xl font-bold"
              style={{ color: getScoreColor() }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              {displayValue}
              <span className="text-4xl">%</span>
            </motion.div>
            <motion.p
              className="text-sm font-medium text-muted-foreground mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              MATCH SCORE
            </motion.p>
          </div>

          {/* Orbiting icons */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ width: 280, height: 280 }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 p-2 rounded-full bg-accent-violet/20"
              whileHover={{ scale: 1.2 }}
            >
              <Trophy className="w-5 h-5 text-accent-violet" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 mb-4"
            animate={showCelebration ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: showCelebration ? 2 : 0 }}
          >
            <Sparkles className="w-4 h-4 text-accent-amber" />
            <span className="text-sm font-semibold" style={{ color: getScoreColor() }}>
              {getScoreMessage()}
            </span>
            <Zap className="w-4 h-4 text-accent-amber" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {jobTitle}
          </h1>
          <p className="text-lg text-muted-foreground">
            at <span className="font-semibold text-foreground">{company}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroMatchReveal;
