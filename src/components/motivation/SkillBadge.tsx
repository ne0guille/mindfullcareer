import { useTheme } from "@/contexts/ThemeContext";
import { Check, Star, Sparkles, Zap } from "lucide-react";

interface SkillBadgeProps {
  skill: string;
  matched?: boolean;
  highlighted?: boolean;
  className?: string;
}

const SkillBadge = ({ skill, matched = false, highlighted = false, className = "" }: SkillBadgeProps) => {
  const { theme } = useTheme();

  // Newspaper style
  if (theme === "newspaper") {
    return (
      <span className={`
        inline-flex items-center gap-1 px-2 py-1 text-xs transition-all
        ${matched 
          ? "bg-stamp-red text-card font-bold border border-stamp-red" 
          : highlighted
            ? "bg-highlight-yellow border border-headline text-headline"
            : "bg-paper-aged border border-rule-light text-ink-faded"
        }
        ${matched ? "animate-scale-in" : ""}
        font-typewriter uppercase
        ${className}
      `}>
        {matched && <Check className="w-3 h-3" />}
        {highlighted && !matched && <Star className="w-3 h-3" />}
        {skill}
      </span>
    );
  }

  // Cyber style
  if (theme === "cyber") {
    return (
      <span className={`
        inline-flex items-center gap-1 px-2 py-1 text-xs transition-all
        ${matched 
          ? "bg-primary text-primary-foreground border border-primary cyber-glow" 
          : highlighted
            ? "bg-primary/20 border border-primary/50 text-primary"
            : "bg-muted border border-border text-muted-foreground"
        }
        ${matched ? "animate-scale-in" : ""}
        cyber-mono uppercase
        ${className}
      `}>
        {matched && <Zap className="w-3 h-3" />}
        {highlighted && !matched && <Sparkles className="w-3 h-3" />}
        {skill}
      </span>
    );
  }

  // Zen style
  return (
    <span className={`
      inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-all
      ${matched 
        ? "bg-primary text-primary-foreground" 
        : highlighted
          ? "bg-primary/20 text-primary border border-primary/30"
          : "bg-muted text-muted-foreground"
      }
      ${matched ? "animate-scale-in" : ""}
      ${className}
    `}>
      {matched && <Check className="w-3 h-3" />}
      {highlighted && !matched && <Sparkles className="w-3 h-3" />}
      {skill}
    </span>
  );
};

export default SkillBadge;
