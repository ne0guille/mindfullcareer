import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Sun, Star } from "lucide-react";

const affirmations = [
  { text: "You are exactly where you need to be", icon: Heart },
  { text: "Every step forward is progress", icon: Star },
  { text: "Your unique skills are valuable", icon: Sparkles },
  { text: "The right opportunity is waiting for you", icon: Sun },
  { text: "You have everything you need within you", icon: Heart },
  { text: "Trust the journey you're on", icon: Star },
  { text: "Your experiences make you perfect for this", icon: Sparkles },
  { text: "Breathe. You've got this", icon: Sun },
];

interface AffirmationBannerProps {
  className?: string;
  autoRotate?: boolean;
  rotateInterval?: number;
}

const AffirmationBanner = ({ 
  className = "", 
  autoRotate = true,
  rotateInterval = 8000 
}: AffirmationBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % affirmations.length);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotateInterval]);

  const current = affirmations[currentIndex];
  const Icon = current.icon;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl" />
      
      <div className="relative py-6 px-8 flex items-center justify-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-lg font-light text-foreground/80 italic">
              "{current.text}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Progress dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {affirmations.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex 
                ? "bg-primary w-4" 
                : "bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AffirmationBanner;
