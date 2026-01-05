import { Sparkles, Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface MatchCelebrationProps {
  matchPercentage: number;
  animate?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const MatchCelebration = ({
  matchPercentage,
  animate = true,
  size = "md",
  showLabel = true,
  className = ""
}: MatchCelebrationProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (animate && matchPercentage >= 70) {
      setHasAnimated(true);
    }
  }, [animate, matchPercentage]);

  const isExcellent = matchPercentage >= 85;
  const isGreat = matchPercentage >= 70;
  const isGood = matchPercentage >= 50;

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  const getLabel = () => {
    if (isExcellent) return "Beautiful alignment";
    if (isGreat) return "Wonderful match";
    if (isGood) return "Good potential";
    return "Keep exploring";
  };

  const getStars = () => {
    if (isExcellent) return 5;
    if (isGreat) return 4;
    if (isGood) return 3;
    if (matchPercentage >= 30) return 2;
    return 1;
  };

  return (
    <div className={`text-center ${className}`}>
      <div className={`
        font-semibold ${sizeClasses[size]} text-primary
        ${hasAnimated ? "animate-scale-in zen-breathing" : ""}
      `}>
        {matchPercentage}%
      </div>

      {/* Hearts for rating */}
      <div className="flex justify-center gap-1 my-2">
        {[...Array(5)].map((_, i) => (
          <Heart
            key={i}
            className={`
              w-4 h-4 transition-all
              ${i < getStars()
                ? "fill-primary text-primary"
                : "text-muted"
              }
              ${hasAnimated && i < getStars() ? "animate-scale-in" : ""}
            `}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {showLabel && (
        <div className={`
          text-sm text-muted-foreground italic
          ${hasAnimated ? "animate-fade-in" : ""}
        `}>
          {getLabel()}
        </div>
      )}

      {/* Gentle sparkle for excellent */}
      {isExcellent && (
        <div className="flex justify-center gap-2 mt-3 text-primary">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-sm">You're ready for this</span>
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default MatchCelebration;
