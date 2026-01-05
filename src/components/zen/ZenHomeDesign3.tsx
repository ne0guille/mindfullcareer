import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Compass, Palette, BookOpen, Coffee, 
  ChevronRight, Star, Heart, Sparkles,
  FileText, Search, Building2
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
    "Your skills tell a story worth sharing",
    "Every interview is a conversation, not a test",
    "The right opportunity will feel like coming home",
    "Your experience has prepared you for this moment"
  ];

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
              Find your
              <motion.span
                className="block text-primary font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                true direction
              </motion.span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light">
              A mindful approach to discovering career opportunities 
              that align with your authentic self.
            </p>

            {/* Rotating insights */}
            <div className="h-16 flex items-center justify-center mb-12">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeInsight}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-lg text-primary/80 italic"
                >
                  "{insights[activeInsight]}"
                </motion.p>
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

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-muted-foreground"
            >
              <span className="text-sm mb-2">Explore</span>
              <ChevronRight className="w-5 h-5 rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Cards Section */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm text-primary uppercase tracking-widest mb-4 block">Your Toolkit</span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Three paths to clarity
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: FileText, 
                title: "Resume Reflection",
                desc: "See your experience through fresh eyes",
                color: "from-rose-500/20 to-pink-500/20",
                link: "/jobs",
                features: ["Thoughtful analysis", "Strength discovery", "Gentle guidance"]
              },
              { 
                icon: Search, 
                title: "Opportunity Discovery",
                desc: "Find roles that resonate with your values",
                color: "from-emerald-500/20 to-teal-500/20",
                link: "/jobs",
                features: ["Value alignment", "Skill matching", "Culture fit"]
              },
              { 
                icon: Building2, 
                title: "Company Insight",
                desc: "Understand where you might belong",
                color: "from-violet-500/20 to-purple-500/20",
                link: "/company/felix-pago",
                features: ["Culture preview", "Team dynamics", "Growth paths"]
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
                      <p className="text-muted-foreground mb-6">{card.desc}</p>
                      
                      <ul className="space-y-2">
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

                      <div className="mt-6 flex items-center text-primary font-medium">
                        <span>Begin</span>
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

      {/* Featured Opportunities - Card Stack Style */}
      <section className="py-24">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <span className="text-sm text-primary uppercase tracking-widest mb-2 block">Curated for you</span>
              <h2 className="text-3xl md:text-4xl font-light text-foreground">
                Opportunities with purpose
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

      {/* Final CTA - Meditation Style */}
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
              <Sparkles className="w-12 h-12 text-primary" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              Your journey begins
              <span className="block text-primary">with intention</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Close your eyes. Take a breath. When you're ready, 
              we'll be here to guide you forward.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/jobs">
                <Button size="lg" className="rounded-full px-10 text-base shadow-lg">
                  I'm Ready
                </Button>
              </Link>
              <Link to="/company/felix-pago">
                <Button variant="outline" size="lg" className="rounded-full px-10 text-base">
                  <Coffee className="w-4 h-4 mr-2" />
                  Take It Slow
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
