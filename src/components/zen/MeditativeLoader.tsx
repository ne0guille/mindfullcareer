import { motion } from "framer-motion";

interface MeditativeLoaderProps {
  message?: string;
  submessage?: string;
  className?: string;
}

const MeditativeLoader = ({ 
  message = "Preparing your path...",
  submessage = "Take a deep breath while we work on this",
  className = "" 
}: MeditativeLoaderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      {/* Breathing circles */}
      <div className="relative w-24 h-24 mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="absolute inset-4 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg font-light text-foreground/80 text-center"
      >
        {message}
      </motion.p>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-muted-foreground mt-2 text-center"
      >
        {submessage}
      </motion.p>
    </div>
  );
};

export default MeditativeLoader;
