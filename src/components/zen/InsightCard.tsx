import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface InsightCardProps {
  title: string;
  content: string;
  icon?: ReactNode;
  highlight?: boolean;
  delay?: number;
  className?: string;
}

const InsightCard = ({
  title,
  content,
  icon,
  highlight = false,
  delay = 0,
  className = "",
}: InsightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`relative p-6 rounded-2xl ${
        highlight 
          ? "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20" 
          : "bg-muted/50"
      } ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          highlight ? "bg-primary/20 text-primary" : "bg-background text-muted-foreground"
        }`}>
          {icon || <Lightbulb className="w-5 h-5" />}
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default InsightCard;
