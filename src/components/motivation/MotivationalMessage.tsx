import { useTheme } from "@/contexts/ThemeContext";
import { Sparkles, Heart, Star, Trophy, Zap, Coffee, Sun, Target, Award } from "lucide-react";

interface MotivationalMessageProps {
  matchPercentage: number;
  skillsMatched?: number;
  totalSkills?: number;
  variant?: "inline" | "banner" | "tooltip";
  className?: string;
}

const getMotivationalData = (matchPercentage: number, theme: string) => {
  // High match (80%+)
  if (matchPercentage >= 80) {
    const messages = {
      newspaper: [
        "STOP THE PRESSES! A perfect match!",
        "EXTRA! EXTRA! You're a star candidate!",
        "BREAKING: This position was made for you!",
        "HEADLINE WORTHY! Outstanding match!",
      ],
      zen: [
        "Your path and this opportunity are aligned ✨",
        "Trust the journey — this feels right",
        "The universe has something beautiful here",
        "Breathe deeply. This is your moment.",
      ],
      cyber: [
        "CRITICAL MATCH DETECTED. PROCEED.",
        "COMPATIBILITY: EXCEPTIONAL",
        "NEURAL SCAN: PERFECT ALIGNMENT",
        "SYSTEM OVERRIDE: TOP CANDIDATE IDENTIFIED",
      ],
    };
    return {
      messages: messages[theme as keyof typeof messages] || messages.zen,
      icon: theme === "newspaper" ? Trophy : theme === "cyber" ? Zap : Star,
      color: "text-primary",
      bgColor: "bg-primary/10",
      celebration: true,
    };
  }
  
  // Good match (60-79%)
  if (matchPercentage >= 60) {
    const messages = {
      newspaper: [
        "A promising prospect indeed!",
        "The editors are impressed!",
        "Worth serious consideration!",
        "A fine opportunity awaits!",
      ],
      zen: [
        "A gentle opportunity awaits",
        "This could be a beautiful fit",
        "Your skills shine here",
        "Progress, one step at a time",
      ],
      cyber: [
        "MATCH QUALITY: FAVORABLE",
        "ANALYSIS: STRONG CANDIDATE",
        "PROBABILITY: HIGH SUCCESS RATE",
        "STATUS: RECOMMENDED PURSUIT",
      ],
    };
    return {
      messages: messages[theme as keyof typeof messages] || messages.zen,
      icon: theme === "newspaper" ? Award : theme === "cyber" ? Target : Heart,
      color: "text-primary",
      bgColor: "bg-primary/5",
      celebration: false,
    };
  }
  
  // Moderate match (40-59%)
  if (matchPercentage >= 40) {
    const messages = {
      newspaper: [
        "Every journey starts with a single step",
        "Room to grow — and that's exciting!",
        "A chance to expand your horizons",
        "New skills await discovery!",
      ],
      zen: [
        "Growth is a beautiful journey",
        "Every experience teaches us something",
        "Be gentle with yourself today",
        "Small steps lead to great destinations",
      ],
      cyber: [
        "OPPORTUNITY FOR SKILL EXPANSION",
        "LEARNING POTENTIAL: DETECTED",
        "GROWTH VECTOR: POSITIVE",
        "DEVELOPMENT PATH: AVAILABLE",
      ],
    };
    return {
      messages: messages[theme as keyof typeof messages] || messages.zen,
      icon: theme === "newspaper" ? Coffee : theme === "cyber" ? Sparkles : Sun,
      color: "text-muted-foreground",
      bgColor: "bg-muted/50",
      celebration: false,
    };
  }
  
  // Low match (<40%) - still encouraging!
  const messages = {
    newspaper: [
      "The right opportunity is out there!",
      "Keep searching — your match awaits!",
      "Today's 'no' leads to tomorrow's 'yes'",
      "Persistence makes headlines!",
    ],
    zen: [
      "Not every flower blooms in the same garden",
      "Your perfect role is still unfolding",
      "Rest, reset, and continue",
      "Trust the timing of your life",
    ],
    cyber: [
      "RECALIBRATING SEARCH PARAMETERS",
      "ALTERNATIVE MATCHES: SCANNING",
      "OPTIMIZATION: IN PROGRESS",
      "BETTER MATCHES: LOADING...",
    ],
  };
  return {
    messages: messages[theme as keyof typeof messages] || messages.zen,
    icon: theme === "newspaper" ? Coffee : theme === "cyber" ? Sparkles : Heart,
    color: "text-muted-foreground",
    bgColor: "bg-muted/30",
    celebration: false,
  };
};

const MotivationalMessage = ({ 
  matchPercentage, 
  skillsMatched,
  totalSkills,
  variant = "inline",
  className = "" 
}: MotivationalMessageProps) => {
  const { theme } = useTheme();
  const data = getMotivationalData(matchPercentage, theme);
  const Icon = data.icon;
  
  // Pick a random message (seeded by match percentage for consistency)
  const messageIndex = Math.floor(matchPercentage % data.messages.length);
  const message = data.messages[messageIndex];

  if (variant === "banner") {
    return (
      <div className={`
        relative overflow-hidden p-4 rounded-lg border
        ${data.bgColor} ${data.color}
        ${data.celebration ? "animate-fade-in" : ""}
        ${theme === "newspaper" ? "border-rule-dark" : theme === "cyber" ? "border-primary/30" : "border-border"}
        ${className}
      `}>
        {/* Celebration sparkles for high matches */}
        {data.celebration && (
          <>
            <Sparkles className="absolute top-2 right-2 w-4 h-4 animate-pulse opacity-50" />
            <Sparkles className="absolute bottom-2 left-2 w-3 h-3 animate-pulse opacity-30 delay-100" />
          </>
        )}
        
        <div className="flex items-center gap-3">
          <div className={`
            p-2 rounded-full
            ${theme === "cyber" ? "bg-primary/20 cyber-glow" : theme === "newspaper" ? "bg-stamp-red/10" : "bg-primary/10"}
            ${data.celebration ? "animate-scale-in" : ""}
          `}>
            <Icon className={`w-5 h-5 ${data.celebration ? "animate-pulse" : ""}`} />
          </div>
          <div className="flex-1">
            <p className={`
              font-medium
              ${theme === "newspaper" ? "font-display" : theme === "cyber" ? "cyber-mono uppercase text-sm" : ""}
            `}>
              {message}
            </p>
            {skillsMatched !== undefined && totalSkills !== undefined && (
              <p className={`text-sm mt-1 opacity-75 ${theme === "cyber" ? "cyber-mono" : ""}`}>
                {theme === "cyber" 
                  ? `SKILLS_MATCHED: ${skillsMatched}/${totalSkills}`
                  : `${skillsMatched} of ${totalSkills} skills matched`
                }
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Inline variant (default)
  return (
    <div className={`
      flex items-center gap-2 ${data.color}
      ${data.celebration ? "animate-fade-in" : ""}
      ${className}
    `}>
      <Icon className={`w-4 h-4 ${data.celebration ? "animate-pulse" : ""}`} />
      <span className={`
        text-sm
        ${theme === "newspaper" ? "font-serif italic" : theme === "cyber" ? "cyber-mono" : ""}
      `}>
        {message}
      </span>
    </div>
  );
};

export default MotivationalMessage;
