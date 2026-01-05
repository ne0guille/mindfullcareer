import { useState } from "react";
import { Wind, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreathingExerciseProps {
  onClose?: () => void;
  compact?: boolean;
}

const BreathingExercise = ({ onClose, compact = false }: BreathingExerciseProps) => {
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
          flex items-center gap-2 px-3 py-2 rounded-full transition-all
          bg-primary/5 hover:bg-primary/10 text-sm
          ${isActive ? "animate-pulse" : ""}
        `}
      >
        <Wind className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
        {isActive ? getPhaseText() : "Take a breath"}
      </button>
    );
  }

  return (
    <div className="relative p-6 rounded-2xl text-center bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-muted rounded"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <h3 className="font-semibold mb-4">
        Breathe with me
      </h3>

      {/* Breathing circle */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className={`
          absolute inset-0 rounded-full border-4 border-primary transition-all duration-[4000ms]
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
          absolute inset-4 rounded-full flex items-center justify-center bg-primary/10
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
            w-8 h-8 text-primary
            ${isActive ? "animate-pulse" : ""}
          `} />
        </div>
      </div>

      {/* Phase text */}
      <p className={`
        text-lg mb-4 h-8
        ${isActive ? "animate-fade-in" : "opacity-50"}
      `}>
        {isActive ? getPhaseText() : "Ready when you are"}
      </p>

      {!isActive && (
        <Button onClick={startBreathing} variant="outline">
          Begin
        </Button>
      )}

      {isActive && (
        <p className="text-xs text-muted-foreground italic">
          3 calming cycles
        </p>
      )}
    </div>
  );
};

export default BreathingExercise;
