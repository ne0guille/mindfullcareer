import { cn } from "@/lib/utils";

interface ThemedBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
}

const ThemedBadge = ({ children, variant = "default", className }: ThemedBadgeProps) => {
  const styles = {
    default: "text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground",
    success: "text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700",
    warning: "text-xs font-medium px-3 py-1 rounded-full bg-amber-100 text-amber-700",
    info: "text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary",
  };

  return (
    <span className={cn(styles[variant], className)}>
      {children}
    </span>
  );
};

export default ThemedBadge;
