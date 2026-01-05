import { Check, Sparkles } from "lucide-react";

interface SkillBadgeProps {
  skill: string;
  matched?: boolean;
  highlighted?: boolean;
  className?: string;
}

const SkillBadge = ({ skill, matched = false, highlighted = false, className = "" }: SkillBadgeProps) => {
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
