import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check, Copy, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

interface BulletItem {
  category: string;
  original: string;
  enhanced: string;
  keywords: string[];
}

interface InteractiveResumeBuilderProps {
  bullets: BulletItem[];
}

const InteractiveResumeBuilder = ({ bullets }: InteractiveResumeBuilderProps) => {
  const [selectedBullet, setSelectedBullet] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [transformedBullets, setTransformedBullets] = useState<Set<number>>(new Set());

  const handleTransform = (index: number) => {
    setTransformedBullets((prev) => new Set([...prev, index]));
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
    "Technical Leadership": {
      bg: "bg-accent-blue/10",
      border: "border-accent-blue/30",
      text: "text-accent-blue",
    },
    "Accessibility": {
      bg: "bg-accent-violet/10",
      border: "border-accent-violet/30",
      text: "text-accent-violet",
    },
    "Analytics & Tracking": {
      bg: "bg-accent-emerald/10",
      border: "border-accent-emerald/30",
      text: "text-accent-emerald",
    },
    "Team Collaboration": {
      bg: "bg-accent-amber/10",
      border: "border-accent-amber/30",
      text: "text-accent-amber",
    },
  };

  return (
    <div className="space-y-6">
      {bullets.map((bullet, index) => {
        const isSelected = selectedBullet === index;
        const isTransformed = transformedBullets.has(index);
        const colors = categoryColors[bullet.category] || {
          bg: "bg-muted",
          border: "border-border",
          text: "text-foreground",
        };

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Category badge */}
            <motion.div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} ${colors.border} border mb-3`}
              whileHover={{ scale: 1.02 }}
            >
              <span className={`text-xs font-medium ${colors.text}`}>
                {bullet.category}
              </span>
            </motion.div>

            {/* Main card */}
            <motion.div
              className={`
                relative p-6 rounded-2xl bg-card/80 backdrop-blur-sm border
                ${isSelected ? `${colors.border} shadow-lg` : "border-border/50"}
                cursor-pointer transition-all duration-300
              `}
              onClick={() => setSelectedBullet(isSelected ? null : index)}
              whileHover={{ scale: 1.01 }}
              layout
            >
              {/* Original bullet */}
              <div className="relative">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-muted-foreground">OLD</span>
                  </div>
                  <p className={`text-foreground/70 ${isTransformed ? "line-through" : ""}`}>
                    {bullet.original}
                  </p>
                </div>

                {/* Transform button */}
                {!isTransformed && (
                  <motion.button
                    className={`
                      mt-4 ml-11 inline-flex items-center gap-2 px-4 py-2 rounded-xl
                      ${colors.bg} ${colors.border} border
                      hover:shadow-md transition-all
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTransform(index);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Wand2 className={`w-4 h-4 ${colors.text}`} />
                    <span className={`text-sm font-medium ${colors.text}`}>Transform</span>
                    <Sparkles className={`w-3 h-3 ${colors.text}`} />
                  </motion.button>
                )}

                {/* Enhanced bullet */}
                <AnimatePresence>
                  {isTransformed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-4 ml-11"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowRight className={`w-4 h-4 ${colors.text}`} />
                        <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
                          Enhanced Version
                        </span>
                      </div>

                      <motion.div
                        className={`p-4 rounded-xl ${colors.bg} border ${colors.border}`}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-foreground font-medium">{bullet.enhanced}</p>

                        {/* Keywords */}
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/30">
                          {bullet.keywords.map((keyword, ki) => (
                            <motion.span
                              key={keyword}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + ki * 0.05 }}
                              className={`px-2 py-0.5 rounded-md text-xs font-medium ${colors.bg} ${colors.text}`}
                            >
                              {keyword}
                            </motion.span>
                          ))}
                        </div>

                        {/* Copy button */}
                        <motion.button
                          className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 hover:bg-background transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(bullet.enhanced, index);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-accent-emerald" />
                              <span className="text-xs text-accent-emerald">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Copy to clipboard</span>
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Transform all button */}
      {transformedBullets.size < bullets.length && (
        <motion.button
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-violet to-accent-blue text-white font-semibold
            flex items-center justify-center gap-3 shadow-lg shadow-accent-violet/20
            hover:shadow-xl hover:shadow-accent-violet/30 transition-shadow"
          onClick={() => bullets.forEach((_, i) => handleTransform(i))}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Wand2 className="w-5 h-5" />
          Transform All Bullets
          <Sparkles className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
};

export default InteractiveResumeBuilder;
