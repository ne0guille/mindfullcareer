import { ReactNode, CSSProperties } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemedCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "featured" | "highlight";
  glowing?: boolean;
  style?: CSSProperties;
}

const ThemedCard = ({ children, className, variant = "default", glowing = false, style }: ThemedCardProps) => {
  const { theme } = useTheme();

  const baseStyles = {
    newspaper: {
      default: "bg-card border border-rule-light",
      featured: "bg-paper-aged border-2 border-rule-dark",
      highlight: "bg-card border-t-4 border-t-stamp-red border border-rule-light",
    },
    zen: {
      default: "zen-card",
      featured: "zen-card zen-glow",
      highlight: "zen-card border-l-4 border-l-primary",
    },
    cyber: {
      default: "cyber-card",
      featured: "cyber-card cyber-glow",
      highlight: "cyber-card cyber-border-glow",
    },
  };

  const glowStyles = {
    newspaper: "",
    zen: "zen-glow",
    cyber: "cyber-glow",
  };

  return (
    <div 
      className={cn(
        "p-6 transition-all",
        baseStyles[theme][variant],
        glowing && glowStyles[theme],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default ThemedCard;
