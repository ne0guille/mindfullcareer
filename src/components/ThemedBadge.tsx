import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemedBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
}

const ThemedBadge = ({ children, variant = "default", className }: ThemedBadgeProps) => {
  const { theme } = useTheme();

  const styles = {
    newspaper: {
      default: "font-typewriter text-xs uppercase tracking-wider px-2 py-1 bg-paper-aged border border-rule-light",
      success: "font-typewriter text-xs uppercase tracking-wider px-2 py-1 bg-green-50 border border-green-300 text-green-800",
      warning: "font-typewriter text-xs uppercase tracking-wider px-2 py-1 bg-yellow-50 border border-yellow-300 text-yellow-800",
      info: "stamp",
    },
    zen: {
      default: "text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground",
      success: "text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700",
      warning: "text-xs font-medium px-3 py-1 rounded-full bg-amber-100 text-amber-700",
      info: "text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary",
    },
    cyber: {
      default: "cyber-mono text-xs uppercase px-2 py-1 bg-muted border border-border text-muted-foreground",
      success: "cyber-mono text-xs uppercase px-2 py-1 bg-green-900/30 border border-green-500/50 text-green-400",
      warning: "cyber-mono text-xs uppercase px-2 py-1 bg-yellow-900/30 border border-yellow-500/50 text-yellow-400",
      info: "cyber-mono text-xs uppercase px-2 py-1 bg-primary/10 border border-primary/50 text-primary cyber-pulse",
    },
  };

  return (
    <span className={cn(styles[theme][variant], className)}>
      {children}
    </span>
  );
};

export default ThemedBadge;
