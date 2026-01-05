import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Compass, FileUp, Chrome, 
  ChevronRight, Star, Heart, Sparkles,
  FileText, Target, Building2, Wind, Leaf
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
                  Begin When You're Ready
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                  Explore Gently
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

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm text-primary uppercase tracking-widest mb-4 block">Your Journey</span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Simple steps, no pressure
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Move at your own pace. There's no timer, no competition—just you and your path.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                icon: FileUp, 
                title: "Share Your Story",
                desc: "Upload your CV—every experience you have is valuable",
                step: "1",
                affirmation: "You've accomplished so much"
              },
              { 
                icon: Chrome, 
                title: "Curate With Care",
                desc: "Save jobs that genuinely resonate with you",
                step: "2",
                affirmation: "Trust your instincts"
              },
              { 
                icon: Target, 
                title: "Understand Gently",
                desc: "See alignment insights, not harsh judgments",
                step: "3",
                affirmation: "Gaps are just growth areas"
              },
              { 
                icon: Heart, 
                title: "Move Forward",
                desc: "Prepare with confidence and self-compassion",
                step: "4",
                affirmation: "You belong in the right place"
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative h-full p-6 rounded-3xl bg-card/60 border border-primary/10 text-center"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {card.step}
                  </div>
                  
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mt-4 mb-4">
                    <card.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{card.desc}</p>
                  <p className="text-xs text-primary italic">✧ {card.affirmation}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Cards */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm text-primary uppercase tracking-widest mb-4 block">Mindful Tools</span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Designed to reduce anxiety
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every feature is built with your emotional wellbeing in mind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Target, 
                title: "Gentle Compatibility",
                desc: "See skill alignment presented with compassion, not as pass/fail",
                color: "from-emerald-500/20 to-teal-500/20",
                link: "/jobs",
                features: ["Encouraging insights", "Growth opportunities", "No harsh judgments"],
                motivation: "You are more than a percentage"
              },
              { 
                icon: FileText, 
                title: "Authentic Letters",
                desc: "Generate cover letters that sound like you—warm and genuine",
                color: "from-rose-500/20 to-pink-500/20",
                link: "/jobs",
                features: ["Your unique voice", "Confident tone", "Easy customization"],
                motivation: "Your story matters"
              },
              { 
                icon: Building2, 
                title: "Calm Preparation",
                desc: "Research companies so you walk into interviews feeling at ease",
                color: "from-violet-500/20 to-purple-500/20",
                link: "/company/felix-pago",
                features: ["Culture insights", "Interview readiness", "Peace of mind"],
                motivation: "Knowledge brings confidence"
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Link to={card.link}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`group relative h-full p-8 rounded-3xl bg-gradient-to-br ${card.color} border border-white/50 cursor-pointer overflow-hidden`}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/30 transition-all duration-500 rounded-3xl" />
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                        <card.icon className="w-8 h-8 text-primary" />
                      </div>
                      
                      <h3 className="text-2xl font-medium text-foreground mb-3">{card.title}</h3>
                      <p className="text-muted-foreground mb-4">{card.desc}</p>
                      
                      <ul className="space-y-2 mb-4">
                        {card.features.map((feature, fi) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 + fi * 0.1 }}
                            className="flex items-center gap-2 text-sm text-foreground/70"
                          >
                            <Star className="w-3 h-3 text-primary" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      <p className="text-sm text-primary italic mb-4">✧ {card.motivation}</p>

                      <div className="flex items-center text-primary font-medium">
                        <span>Explore</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
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
              Remember: The best job for you is one that sees your <span className="text-primary font-medium">whole self</span>—
              not just your skills, but your potential, your values, your humanity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Saved Jobs Preview */}
      <section className="py-24 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <span className="text-sm text-primary uppercase tracking-widest mb-2 block">Your Curated Opportunities</span>
              <h2 className="text-3xl md:text-4xl font-light text-foreground">
                Jobs you've chosen
              </h2>
            </div>
            <Link to="/jobs">
              <Button variant="ghost" className="rounded-full">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockJobs.slice(0, 4).map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/jobs/${job.id}`}>
                  <MindfulCard 
                    glowOnHover 
                    className="hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-semibold text-lg flex-shrink-0">
                        {job.companyInitial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-foreground text-lg mb-1">{job.title}</h3>
                            <p className="text-primary">{job.company}</p>
                          </div>
                          <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
                            <Heart className="w-3 h-3 text-primary" />
                            <span className="text-sm font-medium text-primary">{job.matchPercentage}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{job.location} • {job.type}</p>
                      </div>
                    </div>
                  </MindfulCard>
                </Link>
              </motion.div>
            ))}
          </div>
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
              Whenever you're ready—no rush, no pressure. We'll be here to support 
              every step of your journey with calm and compassion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/jobs">
                <Button size="lg" className="rounded-full px-10 text-base shadow-lg">
                  <FileUp className="w-4 h-4 mr-2" />
                  Begin Your Journey
                </Button>
              </Link>
              <Link to="/company/felix-pago">
                <Button variant="outline" size="lg" className="rounded-full px-10 text-base">
                  <Building2 className="w-4 h-4 mr-2" />
                  Explore Gently
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
