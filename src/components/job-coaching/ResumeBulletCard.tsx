import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Copy, Check, Lightbulb } from "lucide-react";

interface ResumeBulletCardProps {
  original: string;
  enhanced: string;
  keywords: string[];
  category: string;
  delay?: number;
}

const ResumeBulletCard = ({
  original,
  enhanced,
  keywords,
  category,
  delay = 0,
}: ResumeBulletCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(enhanced);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative cursor-pointer perspective-1000"
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="original"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="p-5 rounded-2xl bg-muted/50 border border-border/50 hover:border-border transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-accent-amber">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Tap to enhance
                </span>
              </div>
              <p className="text-foreground/80 leading-relaxed">{original}</p>
              <div className="mt-4 flex justify-end">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-muted-foreground"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="enhanced"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-accent-emerald/10 to-accent-blue/10 
                border border-accent-emerald/30 shadow-lg shadow-accent-emerald/10"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="flex items-center gap-1.5 text-xs font-medium text-accent-emerald uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Enhanced
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background/80 
                    text-xs text-foreground hover:bg-background transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent-emerald" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-foreground leading-relaxed font-medium">{enhanced}</p>
              
              {/* Keywords */}
              <div className="mt-4 flex flex-wrap gap-2">
                {keywords.map((keyword, i) => (
                  <motion.span
                    key={keyword}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="px-2.5 py-1 rounded-full bg-accent-blue/15 text-accent-blue text-xs font-medium"
                  >
                    {keyword}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ResumeBulletCard;
