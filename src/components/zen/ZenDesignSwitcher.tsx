import { motion } from "framer-motion";
import { Flower2, Waves, Compass } from "lucide-react";

interface ZenDesignSwitcherProps {
  currentDesign: 1 | 2 | 3;
  onDesignChange: (design: 1 | 2 | 3) => void;
}

const designs = [
  { id: 1 as const, name: "Floating Garden", icon: Flower2, desc: "Ethereal & spacious" },
  { id: 2 as const, name: "Tranquil Stream", icon: Waves, desc: "Flowing & minimal" },
  { id: 3 as const, name: "Inner Compass", icon: Compass, desc: "Guided & interactive" },
];

const ZenDesignSwitcher = ({ currentDesign, onDesignChange }: ZenDesignSwitcherProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 p-2 bg-card/90 backdrop-blur-md rounded-full border border-primary/20 shadow-lg">
        {designs.map((design) => (
          <button
            key={design.id}
            onClick={() => onDesignChange(design.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              currentDesign === design.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
            }`}
          >
            <design.icon className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">{design.name}</span>
            {currentDesign === design.id && (
              <motion.div
                layoutId="activeDesign"
                className="absolute inset-0 bg-primary rounded-full -z-10"
              />
            )}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        {designs.find(d => d.id === currentDesign)?.desc}
      </p>
    </motion.div>
  );
};

export default ZenDesignSwitcher;
