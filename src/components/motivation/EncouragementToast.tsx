import { useTheme } from "@/contexts/ThemeContext";
import { Sparkles, Heart, Star, Coffee, Sun, Zap, Trophy, Target } from "lucide-react";

interface EncouragementToastProps {
  type: "high_match" | "skill_found" | "application_ready" | "research_complete" | "general";
  matchPercentage?: number;
  className?: string;
}

const encouragements = {
  newspaper: {
    high_match: [
      { icon: Trophy, text: "FLASH! An exceptional opportunity!" },
      { icon: Star, text: "BULLETIN: You're a top candidate!" },
      { icon: Sparkles, text: "EXTRA! Perfect match discovered!" },
    ],
    skill_found: [
      { icon: Star, text: "Another skill in your arsenal!" },
      { icon: Trophy, text: "Your expertise shines through!" },
    ],
    application_ready: [
      { icon: Sparkles, text: "Ready to make headlines!" },
      { icon: Star, text: "Your application is front-page worthy!" },
    ],
    research_complete: [
      { icon: Trophy, text: "Intel gathered! You're prepared!" },
      { icon: Star, text: "Knowledge is power — and you have it!" },
    ],
    general: [
      { icon: Coffee, text: "Take a moment. You're doing great." },
      { icon: Sun, text: "Every step forward counts!" },
      { icon: Star, text: "Success is just around the corner!" },
    ],
  },
  zen: {
    high_match: [
      { icon: Heart, text: "What a beautiful alignment ✨" },
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
  },
  cyber: {
    high_match: [
      { icon: Zap, text: "CRITICAL: EXCEPTIONAL MATCH DETECTED" },
      { icon: Target, text: "TARGET ACQUIRED: HIGH COMPATIBILITY" },
      { icon: Sparkles, text: "ALGORITHM: OPTIMAL CANDIDATE" },
    ],
    skill_found: [
      { icon: Zap, text: "SKILL_SYNC: SUCCESSFUL" },
      { icon: Target, text: "COMPETENCY: VERIFIED" },
    ],
    application_ready: [
      { icon: Zap, text: "PAYLOAD: READY FOR DEPLOYMENT" },
      { icon: Target, text: "TRANSMISSION: AUTHORIZED" },
    ],
    research_complete: [
      { icon: Sparkles, text: "DATA_HARVEST: COMPLETE" },
      { icon: Zap, text: "INTEL: FULLY COMPILED" },
    ],
    general: [
      { icon: Zap, text: "SYSTEM_STATUS: OPTIMAL" },
      { icon: Target, text: "PROGRESS: ON_TRACK" },
      { icon: Sparkles, text: "PROBABILITY: SUCCESS_IMMINENT" },
    ],
  },
};

const EncouragementToast = ({ type, matchPercentage, className = "" }: EncouragementToastProps) => {
  const { theme } = useTheme();
  
  const themeEncouragements = encouragements[theme as keyof typeof encouragements] || encouragements.zen;
  const typeEncouragements = themeEncouragements[type] || themeEncouragements.general;
  
  // Pick based on match percentage or randomly
  const index = matchPercentage 
    ? Math.floor(matchPercentage % typeEncouragements.length)
    : Math.floor(Math.random() * typeEncouragements.length);
  
  const { icon: Icon, text } = typeEncouragements[index];

  return (
    <div className={`
      flex items-center gap-3 p-3 rounded-lg animate-fade-in
      ${theme === "newspaper" 
        ? "bg-paper-aged border border-rule-dark" 
        : theme === "cyber" 
          ? "bg-primary/10 border border-primary/30"
          : "bg-primary/5 rounded-xl"
      }
      ${className}
    `}>
      <div className={`
        p-2 rounded-full
        ${theme === "newspaper" ? "bg-stamp-red/10" : theme === "cyber" ? "bg-primary/20" : "bg-primary/10"}
      `}>
        <Icon className={`
          w-5 h-5
          ${theme === "newspaper" ? "text-stamp-red" : "text-primary"}
          ${type === "high_match" ? "animate-pulse" : ""}
        `} />
      </div>
      <p className={`
        flex-1 text-sm
        ${theme === "newspaper" ? "font-typewriter uppercase tracking-wider" : theme === "cyber" ? "cyber-mono uppercase" : ""}
      `}>
        {text}
      </p>
    </div>
  );
};

export default EncouragementToast;
