import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ZenContainerProps {
  children: ReactNode;
  className?: string;
}

const ZenContainer = ({ children, className = "" }: ZenContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative min-h-screen ${className}`}
    >
      {/* Floating ambient particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 50 
            }}
            animate={{ 
              y: -50,
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3,
            }}
          />
        ))}
      </div>
      
      {/* Main content with soft gradient overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default ZenContainer;
