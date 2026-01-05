import { Sparkles, Heart, Star, Sun } from "lucide-react";

interface MotivationalMessageProps {
  matchPercentage: number;
  skillsMatched?: number;
  totalSkills?: number;
  variant?: "inline" | "banner" | "tooltip";
  className?: string;
}

const getMotivationalData = (matchPercentage: number) => {
  // High match (80%+)
  if (matchPercentage >= 80) {
    return {
      messages: [
        "Your path and this opportunity are aligned",
        "Trust the journey — this feels right",
        "The universe has something beautiful here",
        "Breathe deeply. This is your moment.",
      ],
      icon: Star,
      color: "text-primary",
      bgColor: "bg-primary/10",
      celebration: true,
    };
  }

  // Good match (60-79%)
  if (matchPercentage >= 60) {
    return {
      messages: [
        "A gentle opportunity awaits",
        "This could be a beautiful fit",
        "Your skills shine here",
        "Progress, one step at a time",
      ],
      icon: Heart,
      color: "text-primary",
      bgColor: "bg-primary/5",
      celebration: false,
    };
  }

  // Moderate match (40-59%)
  if (matchPercentage >= 40) {
    return {
      messages: [
        "Growth is a beautiful journey",
        "Every experience teaches us something",
        "Be gentle with yourself today",
        "Small steps lead to great destinations",
      ],
      icon: Sun,
      color: "text-muted-foreground",
      bgColor: "bg-muted/50",
      celebration: false,
    };
  }

  // Low match (<40%)
  return {
    messages: [
      "Not every flower blooms in the same garden",
      "Your perfect role is still unfolding",
      "Rest, reset, and continue",
      "Trust the timing of your life",
    ],
    icon: Heart,
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
  const data = getMotivationalData(matchPercentage);
  const Icon = data.icon;

  // Pick a message (seeded by match percentage for consistency)
  const messageIndex = Math.floor(matchPercentage % data.messages.length);
  const message = data.messages[messageIndex];

  if (variant === "banner") {
    return (
      <div className={`
        relative overflow-hidden p-4 rounded-lg border border-border
        ${data.bgColor} ${data.color}
        ${data.celebration ? "animate-fade-in" : ""}
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
            p-2 rounded-full bg-primary/10
            ${data.celebration ? "animate-scale-in" : ""}
          `}>
            <Icon className={`w-5 h-5 ${data.celebration ? "animate-pulse" : ""}`} />
          </div>
          <div className="flex-1">
            <p className="font-medium">
              {message}
            </p>
            {skillsMatched !== undefined && totalSkills !== undefined && (
              <p className="text-sm mt-1 opacity-75">
                {skillsMatched} of {totalSkills} skills matched
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
      <span className="text-sm">
        {message}
      </span>
    </div>
  );
};

export default MotivationalMessage;
