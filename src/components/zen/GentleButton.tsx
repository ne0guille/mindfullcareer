import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GentleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

const GentleButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  disabled = false,
  className = "",
}: GentleButtonProps) => {
  const baseStyles = "relative overflow-hidden rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:shadow-[0_0_30px_-5px_hsl(var(--primary))]",
    secondary: "bg-primary/10 text-primary hover:bg-primary/20",
    ghost: "text-primary hover:bg-primary/10",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
      
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default GentleButton;
