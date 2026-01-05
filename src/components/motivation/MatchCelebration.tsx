import { useTheme } from "@/contexts/ThemeContext";
import { Star, Sparkles, Trophy, Zap, Heart, Target } from "lucide-react";
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
  const { theme } = useTheme();
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
    if (theme === "newspaper") {
      if (isExcellent) return "EXCEPTIONAL!";
      if (isGreat) return "EXCELLENT!";
      if (isGood) return "PROMISING!";
      return "OPPORTUNITY";
    }
    if (theme === "cyber") {
      if (isExcellent) return "OPTIMAL_MATCH";
      if (isGreat) return "HIGH_COMPAT";
      if (isGood) return "VIABLE_MATCH";
      return "ANALYZING...";
    }
    // Zen
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

  // Newspaper theme celebration
  if (theme === "newspaper") {
    return (
      <div className={`text-center ${className}`}>
        <div className={`
          font-display font-black ${sizeClasses[size]} text-headline
          ${hasAnimated ? "animate-scale-in" : ""}
        `}>
          {matchPercentage}%
        </div>
        
        {/* Star rating */}
        <div className="flex justify-center gap-1 my-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={`
                w-5 h-5 transition-all
                ${i < getStars() 
                  ? "fill-stamp-red text-stamp-red" 
                  : "text-rule-light"
                }
                ${hasAnimated && i < getStars() ? "animate-scale-in" : ""}
              `}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
        
        {showLabel && (
          <div className={`
            font-typewriter text-xs uppercase tracking-widest
            ${isExcellent ? "text-stamp-red" : "text-ink-faded"}
            ${hasAnimated ? "animate-fade-in" : ""}
          `}>
            {getLabel()}
          </div>
        )}
        
        {/* Decorative stamp for excellent matches */}
        {isExcellent && (
          <div className="mt-2 inline-block">
            <span className="stamp text-xs animate-stamp">★ TOP MATCH ★</span>
          </div>
        )}
      </div>
    );
  }

  // Cyber theme celebration
  if (theme === "cyber") {
    return (
      <div className={`text-center ${className}`}>
        <div className={`
          relative cyber-mono font-bold ${sizeClasses[size]}
          ${isExcellent ? "text-primary cyber-text-glow" : isGreat ? "text-primary" : "text-muted-foreground"}
          ${hasAnimated ? "animate-scale-in" : ""}
        `}>
          {/* Glitch effect for high matches */}
          {isExcellent && (
            <>
              <span className="absolute inset-0 text-cyber-pink opacity-50 animate-pulse" style={{ transform: "translateX(2px)" }}>
                {matchPercentage}%
              </span>
              <span className="absolute inset-0 text-cyber-neon opacity-50" style={{ transform: "translateX(-2px)" }}>
                {matchPercentage}%
              </span>
            </>
          )}
          <span className="relative">{matchPercentage}%</span>
        </div>
        
        {/* Progress bars as "systems" */}
        <div className="flex justify-center gap-1 my-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className={`
                h-2 w-6 transition-all
                ${i < getStars() 
                  ? "bg-primary cyber-glow" 
                  : "bg-muted"
                }
                ${hasAnimated && i < getStars() ? "animate-scale-in" : ""}
              `}
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
        
        {showLabel && (
          <div className={`
            cyber-mono text-xs uppercase
            ${isExcellent ? "text-primary cyber-text-glow" : "text-muted-foreground"}
            ${hasAnimated ? "animate-fade-in" : ""}
          `}>
            [{getLabel()}]
          </div>
        )}
        
        {/* Floating indicators for excellent */}
        {isExcellent && (
          <div className="flex justify-center gap-2 mt-2">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="cyber-mono text-xs text-primary">PRIORITY_CANDIDATE</span>
            <Zap className="w-4 h-4 text-primary animate-pulse" />
          </div>
        )}
      </div>
    );
  }

  // Zen theme celebration
  return (
    <div className={`text-center ${className}`}>
      <div className={`
        font-semibold ${sizeClasses[size]} text-primary
        ${hasAnimated ? "animate-scale-in zen-breathing" : ""}
      `}>
        {matchPercentage}%
      </div>
      
      {/* Hearts/leaves for rating */}
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
