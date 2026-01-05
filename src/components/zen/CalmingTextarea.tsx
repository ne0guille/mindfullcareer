import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface CalmingTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  className?: string;
  encouragement?: string;
}

const CalmingTextarea = ({
  value,
  onChange,
  placeholder = "Take your time...",
  minRows = 6,
  maxRows = 12,
  className = "",
  encouragement = "You're doing great. Take all the time you need.",
}: CalmingTextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className={`relative ${className}`}>
      {/* Ambient glow when focused */}
      <motion.div
        animate={{
          opacity: isFocused ? 1 : 0,
          scale: isFocused ? 1 : 0.95,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-primary/10 blur-xl pointer-events-none"
      />
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={minRows}
          className={`w-full bg-background/50 backdrop-blur-sm rounded-2xl p-6 
            border-2 transition-all duration-500 resize-none
            focus:outline-none focus:ring-0
            placeholder:text-muted-foreground/50
            ${isFocused 
              ? "border-primary/30 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.2)]" 
              : "border-primary/10 hover:border-primary/20"
            }`}
          style={{ maxHeight: `${maxRows * 1.5}rem` }}
        />
        
        {/* Encouragement message */}
        <motion.div
          animate={{ opacity: isFocused && wordCount > 0 ? 1 : 0 }}
          className="absolute -bottom-8 left-0 flex items-center gap-2 text-sm text-primary/70"
        >
          <Sparkles className="w-4 h-4" />
          <span>{encouragement}</span>
        </motion.div>
        
        {/* Word count */}
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50">
          {wordCount} words
        </div>
      </div>
    </div>
  );
};

export default CalmingTextarea;
