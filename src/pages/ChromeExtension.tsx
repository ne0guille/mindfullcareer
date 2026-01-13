import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, ChevronDown, Sparkles, Leaf, Heart } from "lucide-react";

const ChromeExtension = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      {/* Extension Popup Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-[360px] bg-card/95 backdrop-blur-sm rounded-3xl shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.3)] border border-primary/20 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">JobMate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Connect</span>
            </div>
            <button className="w-8 h-8 rounded-lg hover:bg-primary/10 flex items-center justify-center text-muted-foreground transition-colors">
              <span className="text-lg">⋮</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-10 flex flex-col items-center text-center">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Link2 className="w-10 h-10 text-primary" />
              </motion.div>
            </div>
            {/* Floating particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/30"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-10, -30],
                  x: [0, (i - 1) * 20],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{ top: "20%", left: "50%" }}
              />
            ))}
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-display font-semibold text-foreground mb-3"
          >
            Ready When You Are
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground leading-relaxed mb-8 max-w-[280px]"
          >
            Let's connect your account so we can help you craft compelling cover letters for jobs you discover.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px -5px hsl(var(--primary))" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium text-lg flex items-center justify-center gap-3 transition-all duration-300"
          >
            <Link2 className="w-5 h-5" />
            Open Web App
          </motion.button>

          {/* How it works toggle */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => setShowHelp(!showHelp)}
            className="mt-6 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm">How does this work?</span>
            <motion.div animate={{ rotate: showHelp ? 180 : 0 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

          {/* Help Content */}
          <AnimatePresence>
            {showHelp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden w-full"
              >
                <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 text-left space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Browse job listings on any website</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Leaf className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Click the extension to save & analyze jobs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Heart className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Get personalized cover letters instantly</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </motion.div>
    </div>
  );
};

export default ChromeExtension;
