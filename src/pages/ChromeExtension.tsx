import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, ChevronDown, Sparkles, Leaf, Heart, Star, Building2, MapPin, FileText, Briefcase, ExternalLink, CheckCircle2, Zap, Upload, LayoutDashboard, Linkedin, ArrowRight } from "lucide-react";

type ExtensionView = "connect" | "synced" | "job-detected";

const ChromeExtension = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [view, setView] = useState<ExtensionView>("synced");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");

  // Header component shared between views
  const Header = ({ connected = false }: { connected?: boolean }) => (
    <div className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          <Leaf className="w-5 h-5 text-primary" />
        </div>
        <span className="font-display text-lg font-semibold text-foreground">JobMate</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${connected ? 'bg-primary/10 border-primary/30' : 'bg-primary/10 border-primary/20'}`}>
          <span className={`w-2 h-2 rounded-full ${connected ? 'bg-primary' : 'bg-primary animate-pulse'}`} />
          <span className="text-sm font-medium text-primary">{connected ? 'Connected' : 'Connect'}</span>
        </div>
        <button className="w-8 h-8 rounded-lg hover:bg-primary/10 flex items-center justify-center text-muted-foreground transition-colors">
          <span className="text-lg">⋮</span>
        </button>
      </div>
    </div>
  );

  // Extension Synced Success View
  const SyncedView = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-lg bg-card/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.25)] border border-primary/15 overflow-hidden"
    >
      {/* Success Header with Animated Background */}
      <div className="relative px-8 pt-10 pb-8 text-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Success Icon with Ring Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative mx-auto mb-6 w-20 h-20"
        >
          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
          
          {/* Main icon circle */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            >
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" strokeWidth={2.5} />
            </motion.div>
          </div>
          
          {/* Sparkle accents */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ delay: 0.6 + i * 0.15, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              style={{
                top: i === 0 ? '-8px' : i === 1 ? '50%' : 'auto',
                bottom: i === 2 ? '-8px' : 'auto',
                left: i === 1 ? '-12px' : 'auto',
                right: i === 0 ? '-8px' : i === 2 ? '-10px' : 'auto',
              }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative text-2xl font-display font-bold text-foreground mb-2"
        >
          Extension Connected!
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative text-muted-foreground"
        >
          Ready to generate cover letters
        </motion.p>
      </div>

      {/* CV Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-6 mb-6"
      >
        <div className="p-5 rounded-2xl bg-gradient-to-br from-background/80 to-muted/30 border border-primary/10 backdrop-blur-sm">
          {/* Card Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary/10">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <span className="font-medium text-foreground">Active CV</span>
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="ml-auto px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-medium"
            >
              Synced
            </motion.span>
          </div>
          
          {/* CV Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Name:</span>
              <span className="text-sm font-medium text-foreground">Guillermo Eyherabide</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Skills:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-foreground">23</span>
                <span className="text-xs text-muted-foreground">skill(s)</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Experience:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-foreground">7</span>
                <span className="text-xs text-muted-foreground">position(s)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* What's Next Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mx-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="font-semibold text-foreground">What's Next?</span>
        </div>
        
        <div className="space-y-3">
          {[
            "Navigate to a LinkedIn job posting that interests you",
            "Click the JobMate extension icon in your browser toolbar",
            "The job will be automatically analyzed and ready for generation",
            'Click "Generate Cover Letter" to create your personalized letter'
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/20">
                <span className="text-xs font-semibold text-primary">{i + 1}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 space-y-3">
        {/* Primary CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 40px -8px hsl(var(--primary))" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView("job-detected")}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground font-semibold text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-primary/25"
        >
          <Linkedin className="w-5 h-5" />
          Open LinkedIn Jobs
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* Secondary Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 gap-3"
        >
          <button className="py-3 px-4 rounded-xl border border-border bg-card hover:bg-muted/50 text-foreground font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:border-primary/30">
            <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
            Web Dashboard
          </button>
          <button className="py-3 px-4 rounded-xl border border-border bg-card hover:bg-muted/50 text-foreground font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:border-primary/30">
            <Upload className="w-4 h-4 text-muted-foreground" />
            Upload New CV
          </button>
        </motion.div>
      </div>

      {/* Footer accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </motion.div>
  );

  // Job Detected View
  const JobDetectedView = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-[360px] bg-card/95 backdrop-blur-sm rounded-3xl shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.3)] border border-primary/20 overflow-hidden"
    >
      <Header connected />

      <div className="px-5 py-5">
        {/* Job Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-transparent mb-5"
        >
          <h3 className="text-lg font-semibold text-foreground text-center mb-2">Senior AI Engineer</h3>
          <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Sparq</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Remote</span>
            </div>
          </div>
        </motion.div>

        {/* Tone & Length Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-5"
        >
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Tone</label>
            <div className="relative">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-xl border border-primary/20 bg-card text-foreground font-medium cursor-pointer hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Enthusiastic</option>
                <option>Formal</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Length</label>
            <div className="relative">
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-xl border border-primary/20 bg-card text-foreground font-medium cursor-pointer hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option>Short</option>
                <option>Medium</option>
                <option>Long</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px -5px hsl(var(--primary))" }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium text-lg flex items-center justify-center gap-3 transition-all duration-300 mb-4"
        >
          <Star className="w-5 h-5" />
          Generate Cover Letter
        </motion.button>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-4" />

        {/* Save to Web App Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 rounded-2xl border-2 border-primary/40 text-primary font-medium flex items-center justify-center gap-2 hover:bg-primary/5 transition-all duration-300"
        >
          Save to Web App
          <ExternalLink className="w-4 h-4" />
        </motion.button>

        {/* Helper Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-4 leading-relaxed"
        >
          Take your time exploring company insights and refining your letter
        </motion.p>

        {/* Status Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 mt-5"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">CV Ready</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Job Ready</span>
          </div>
        </motion.div>
      </div>

      {/* Footer accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </motion.div>
  );

  // Connect View (original)
  const ConnectView = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-[360px] bg-card/95 backdrop-blur-sm rounded-3xl shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.3)] border border-primary/20 overflow-hidden"
    >
      <Header />

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
          onClick={() => setView("synced")}
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
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      {view === "connect" ? <ConnectView /> : view === "synced" ? <SyncedView /> : <JobDetectedView />}
    </div>
  );
};

export default ChromeExtension;
