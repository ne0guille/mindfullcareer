import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Wind, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreathingExerciseProps {
  onClose?: () => void;
  compact?: boolean;
}

const BreathingExercise = ({ onClose, compact = false }: BreathingExerciseProps) => {
  const { theme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");

  const startBreathing = () => {
    setIsActive(true);
    setPhase("inhale");
    
    // Breathing cycle: 4s inhale, 4s hold, 4s exhale
    const cycle = () => {
      setPhase("inhale");
      setTimeout(() => setPhase("hold"), 4000);
      setTimeout(() => setPhase("exhale"), 8000);
    };
    
    cycle();
    const interval = setInterval(cycle, 12000);
    
    // Auto-stop after 3 cycles (36 seconds)
    setTimeout(() => {
      clearInterval(interval);
      setIsActive(false);
    }, 36000);
  };

  const getPhaseText = () => {
    if (theme === "newspaper") {
      switch(phase) {
        case "inhale": return "Breathe In...";
        case "hold": return "Hold...";
        case "exhale": return "Release...";
      }
    }
    if (theme === "cyber") {
      switch(phase) {
        case "inhale": return "INTAKE: ACTIVE";
        case "hold": return "BUFFER: HOLD";
        case "exhale": return "OUTPUT: RELEASE";
      }
    }
    // Zen
    switch(phase) {
      case "inhale": return "Breathe in gently...";
      case "hold": return "Hold with peace...";
      case "exhale": return "Let it flow away...";
    }
  };

  if (compact) {
    return (
      <button
        onClick={startBreathing}
        disabled={isActive}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg transition-all
          ${theme === "newspaper" 
            ? "bg-paper-aged border border-rule-light hover:border-headline font-typewriter text-xs uppercase" 
            : theme === "cyber" 
              ? "bg-primary/10 border border-primary/30 hover:bg-primary/20 cyber-mono text-xs uppercase"
              : "bg-primary/5 hover:bg-primary/10 rounded-full text-sm"
          }
          ${isActive ? "animate-pulse" : ""}
        `}
      >
        <Wind className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
        {isActive ? getPhaseText() : (theme === "cyber" ? "BREATHE.exe" : "Take a breath")}
      </button>
    );
  }

  return (
    <div className={`
      relative p-6 rounded-lg text-center
      ${theme === "newspaper" 
        ? "bg-paper-aged border-2 border-double border-headline" 
        : theme === "cyber" 
          ? "bg-card border border-primary/30 cyber-card"
          : "bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg"
      }
    `}>
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-muted rounded"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      <h3 className={`
        font-semibold mb-4
        ${theme === "newspaper" ? "font-display uppercase tracking-wider" : theme === "cyber" ? "cyber-mono uppercase" : ""}
      `}>
        {theme === "newspaper" ? "A Moment of Calm" : theme === "cyber" ? "STRESS_REDUCTION.exe" : "Breathe with me"}
      </h3>
      
      {/* Breathing circle */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className={`
          absolute inset-0 rounded-full border-4 transition-all duration-[4000ms]
          ${theme === "cyber" ? "border-primary" : theme === "newspaper" ? "border-headline" : "border-primary"}
          ${isActive 
            ? phase === "inhale" 
              ? "scale-100 opacity-100" 
              : phase === "hold" 
                ? "scale-100 opacity-80" 
                : "scale-75 opacity-60"
            : "scale-75 opacity-50"
          }
        `} />
        
        <div className={`
          absolute inset-4 rounded-full flex items-center justify-center
          ${theme === "cyber" ? "bg-primary/20" : theme === "newspaper" ? "bg-stamp-red/10" : "bg-primary/10"}
          transition-all duration-[4000ms]
          ${isActive 
            ? phase === "inhale" 
              ? "scale-100" 
              : phase === "hold" 
                ? "scale-100" 
                : "scale-50"
            : "scale-75"
          }
        `}>
          <Wind className={`
            w-8 h-8
            ${theme === "cyber" ? "text-primary" : theme === "newspaper" ? "text-headline" : "text-primary"}
            ${isActive ? "animate-pulse" : ""}
          `} />
        </div>
      </div>
      
      {/* Phase text */}
      <p className={`
        text-lg mb-4 h-8
        ${theme === "newspaper" ? "font-serif italic" : theme === "cyber" ? "cyber-mono" : ""}
        ${isActive ? "animate-fade-in" : "opacity-50"}
      `}>
        {isActive ? getPhaseText() : (theme === "cyber" ? "AWAITING_INITIALIZATION" : "Ready when you are")}
      </p>
      
      {!isActive && (
        <Button 
          onClick={startBreathing}
          variant={theme === "cyber" ? "default" : "outline"}
          className={theme === "cyber" ? "cyber-mono uppercase" : theme === "newspaper" ? "font-typewriter uppercase tracking-wider" : ""}
        >
          {theme === "cyber" ? "INITIALIZE" : "Begin"}
        </Button>
      )}
      
      {isActive && (
        <p className={`text-xs text-muted-foreground ${theme === "cyber" ? "cyber-mono" : "italic"}`}>
          {theme === "cyber" ? "CYCLE: 3x (36 SECONDS)" : "3 calming cycles"}
        </p>
      )}
    </div>
  );
};

export default BreathingExercise;
