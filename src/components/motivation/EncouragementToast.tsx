import { Sparkles, Heart, Star, Sun } from "lucide-react";

interface EncouragementToastProps {
  type: "high_match" | "skill_found" | "application_ready" | "research_complete" | "general";
  matchPercentage?: number;
  className?: string;
}

const encouragements = {
  high_match: [
    { icon: Heart, text: "What a beautiful alignment" },
    { icon: Sparkles, text: "The universe is working with you" },
    { icon: Star, text: "Trust this feeling" },
  ],
  skill_found: [
    { icon: Heart, text: "Your talents are recognized" },
    { icon: Sparkles, text: "You bring unique gifts" },
  ],
  application_ready: [
    { icon: Heart, text: "You are ready. Believe in yourself." },
    { icon: Star, text: "Send with confidence and peace" },
  ],
  research_complete: [
    { icon: Sparkles, text: "Wisdom gathered with intention" },
    { icon: Heart, text: "Prepared and peaceful" },
  ],
  general: [
    { icon: Heart, text: "Be gentle with yourself today" },
    { icon: Sun, text: "You are exactly where you need to be" },
    { icon: Sparkles, text: "One mindful step at a time" },
  ],
};

const EncouragementToast = ({ type, matchPercentage, className = "" }: EncouragementToastProps) => {
  const typeEncouragements = encouragements[type] || encouragements.general;

  // Pick based on match percentage or randomly
  const index = matchPercentage
    ? Math.floor(matchPercentage % typeEncouragements.length)
    : Math.floor(Math.random() * typeEncouragements.length);

  const { icon: Icon, text } = typeEncouragements[index];

  return (
    <div className={`
      flex items-center gap-3 p-3 rounded-xl animate-fade-in bg-primary/5
      ${className}
    `}>
      <div className="p-2 rounded-full bg-primary/10">
        <Icon className={`
          w-5 h-5 text-primary
          ${type === "high_match" ? "animate-pulse" : ""}
        `} />
      </div>
      <p className="flex-1 text-sm">
        {text}
      </p>
    </div>
  );
};

export default EncouragementToast;
