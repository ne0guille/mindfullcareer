import { motion } from "framer-motion";
import { Check, Circle, Sparkles } from "lucide-react";

interface Step {
  label: string;
  description?: string;
  completed?: boolean;
  current?: boolean;
}

interface ProgressJourneyProps {
  steps: Step[];
  className?: string;
}

const ProgressJourney = ({ steps, className = "" }: ProgressJourneyProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Connecting line */}
      <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative flex items-start gap-4 pl-2"
          >
            {/* Step indicator */}
            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
              step.completed 
                ? "bg-primary text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary))]" 
                : step.current
                  ? "bg-primary/20 text-primary border-2 border-primary animate-pulse"
                  : "bg-muted text-muted-foreground"
            }`}>
              {step.completed ? (
                <Check className="w-4 h-4" />
              ) : step.current ? (
                <Sparkles className="w-4 h-4" />
              ) : (
                <Circle className="w-3 h-3" />
              )}
            </div>
            
            {/* Step content */}
            <div className="flex-1 pt-1">
              <p className={`font-medium ${
                step.completed || step.current 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              }`}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressJourney;
