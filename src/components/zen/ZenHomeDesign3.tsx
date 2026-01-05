import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Compass, FileUp, Chrome, ClipboardPaste,
  ChevronRight, Star, Heart, Sparkles,
  FileText, Target, Building2, Wind, Leaf, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";
import MindfulCard from "./MindfulCard";

/**
 * Design 3: "Inner Compass"
 * Interactive, guided experience with focus on self-discovery
 */
const ZenHomeDesign3 = () => {
  const [activeInsight, setActiveInsight] = useState(0);

  const insights = [
    "You are exactly where you need to be right now",
    "Your skills and experience tell a beautiful story",
    "The right opportunity is also searching for you",
    "Trust your instincts—they've guided you this far"
  ];

  // Auto-rotate insights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInsight((prev) => (prev + 1) % insights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Immersive Hero with Gradient Orbs */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
              top: '-20%',
              right: '-10%'
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(45 70% 85% / 0.2) 0%, transparent 70%)',
              bottom: '-10%',
              left: '-5%'
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, -40, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center"
          >
            {/* Compass icon with rotation */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-10"
            >
              <Compass className="w-10 h-10 text-primary" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[1.1] mb-8">
              Find your way
              <motion.span
                className="block text-primary font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                with peace of mind
              </motion.span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light">
              This isn't a job board. It's your personal sanctuary for career exploration—
              where you curate opportunities and we help you understand your fit without anxiety.
            </p>

            {/* Rotating insights */}
            <div className="h-20 flex items-center justify-center mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInsight}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <Wind className="w-5 h-5 text-primary/60 mx-auto mb-2" />
                  <p className="text-lg text-primary/80 italic">
                    "{insights[activeInsight]}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Insight dots */}
            <div className="flex items-center justify-center gap-2 mb-12">
              {insights.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveInsight(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeInsight ? 'bg-primary w-8' : 'bg-primary/30'
                  }`}
                />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/jobs">
                <Button size="lg" className="rounded-full px-8 text-base shadow-lg">
                  <FileUp className="w-4 h-4 mr-2" />
                  Begin Your Journey
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calming Affirmation Section */}
      <section className="py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center p-10 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
          >
            <Leaf className="w-10 h-10 text-primary mx-auto mb-6" />
            <p className="text-2xl font-light text-foreground leading-relaxed mb-4">
              Breathe. You don't have to have it all figured out today.
            </p>
            <p className="text-muted-foreground">
              Job searching is hard. We're here to make it gentler, one step at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two Ways to Add Jobs - from Tranquil Stream */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extralight text-foreground mb-4">
              Two gentle ways to add jobs
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Choose what feels natural to you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: Chrome, 
                title: "Chrome Extension", 
                desc: "Browse LinkedIn at your own pace. When something sparks interest, save it with one click. No rushing, no FOMO.", 
                tag: "Effortless",
                motivation: "Stay in your flow state"
              },
              { 
                icon: ClipboardPaste, 
                title: "Paste & Analyze", 
                desc: "Found a job anywhere? Paste the description and let us extract insights. Simple, calm, effective.", 
                tag: "Flexible",
                motivation: "Every path is valid"
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="relative group"
              >
                <div className="h-full p-10 bg-card/40 backdrop-blur-sm border border-primary/10 rounded-3xl transition-all duration-500 group-hover:bg-card/80 group-hover:border-primary/30">
                  <span className="text-xs text-primary uppercase tracking-widest">{item.tag}</span>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center my-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-light text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                  <p className="text-sm text-primary italic">✧ {item.motivation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Gentle Journey - Floating Cards from Design 1 */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-foreground mb-4">Your gentle journey</h2>
            <p className="text-muted-foreground">Three simple steps, no pressure, no judgment</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { 
                step: "1", 
                icon: FileUp, 
                title: "Share Your Story", 
                desc: "Your experience is valuable. Upload your CV and let us celebrate your unique journey.",
                affirmation: "Every skill you have was earned",
                color: "from-rose-400/20 to-pink-400/20"
              },
              { 
                step: "2", 
                icon: Target, 
                title: "Understand Your Fit", 
                desc: "See how your skills align without harsh judgment. Gaps are just opportunities to grow.",
                affirmation: "You are more than a match percentage",
                color: "from-emerald-400/20 to-teal-400/20"
              },
              { 
                step: "3", 
                icon: Heart, 
                title: "Move Forward With Confidence", 
                desc: "Research companies so you walk into interviews feeling informed and at ease.",
                affirmation: "You belong in spaces that value you",
                color: "from-amber-400/20 to-orange-400/20"
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="zen-float"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-white/50`}>
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {feature.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center mb-6 shadow-sm">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{feature.desc}</p>
                  <p className="text-sm text-primary italic">✧ {feature.affirmation}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mindful Tools */}
      <section className="py-16 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Mindful Tools</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Everything to support you, nothing to overwhelm
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each tool is designed with your peace of mind first
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: FileText,
                title: "Thoughtful Cover Letters",
                desc: "Generate letters that sound like you, authentic and confident.",
                motivation: "Your voice matters",
                link: "/jobs"
              },
              {
                icon: Building2,
                title: "Company Research",
                desc: "Enter interviews feeling informed, prepared, and calm",
                motivation: "Knowledge brings peace",
                link: "/company/felix-pago"
              },
              {
                icon: Target,
                title: "Skill Analysis",
                desc: "Understand your fit without harsh judgment or anxiety",
                motivation: "Gaps are growth areas, not failures",
                link: "/jobs"
              },
              {
                icon: Chrome,
                title: "Effortless Saving",
                desc: "Save jobs from LinkedIn or paste descriptions—simple and quick",
                motivation: "Stay focused on what matters",
                link: "/jobs"
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={feature.link}>
                  <MindfulCard glowOnHover className="hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{feature.desc}</p>
                        <p className="text-xs text-primary italic">✧ {feature.motivation}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </MindfulCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational Break */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-6" />
            <p className="text-2xl md:text-3xl font-light text-foreground leading-relaxed">
              Remember: The best job for you is one that sees your <span className="text-primary font-medium">whole self</span> 
              not just your skills, but your potential, your values, your humanity.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
        
        <div className="container max-w-3xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-10"
            >
              <Heart className="w-12 h-12 text-primary" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              You've got this
              <span className="block text-primary">and we've got you</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Take your time. Trust the process. You're doing better than you think.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/jobs">
                <Button size="lg" className="rounded-full px-10 text-base shadow-lg">
                  <FileUp className="w-4 h-4 mr-2" />
                  I'm ready!
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ZenHomeDesign3;
