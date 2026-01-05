import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ThemedCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "featured" | "highlight";
  glowing?: boolean;
  style?: CSSProperties;
}

const ThemedCard = ({ children, className, variant = "default", glowing = false, style }: ThemedCardProps) => {
  const baseStyles = {
    default: "zen-card",
    featured: "zen-card zen-glow",
    highlight: "zen-card border-l-4 border-l-primary",
  };

  return (
    <div
      className={cn(
        "p-6 transition-all",
        baseStyles[variant],
        glowing && "zen-glow",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default ThemedCard;
