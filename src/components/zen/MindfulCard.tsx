import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface MindfulCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  delay?: number;
  glowOnHover?: boolean;
}

const MindfulCard = ({ 
  children, 
  title, 
  subtitle, 
  icon,
  className = "",
  delay = 0,
  glowOnHover = true,
}: MindfulCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-primary/10 
        transition-all duration-500 ${glowOnHover ? "hover:shadow-[0_0_60px_-15px_hsl(var(--primary)/0.3)]" : ""} 
        ${className}`}
    >
      {/* Subtle glow effect */}
      {isHovered && glowOnHover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"
        />
      )}
      
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-6">
          {icon && (
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <div>
            {title && (
              <h3 className="text-xl font-medium text-foreground">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
      )}
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default MindfulCard;
