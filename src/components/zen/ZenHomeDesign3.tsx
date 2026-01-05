import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Compass, FileUp, Chrome, ClipboardPaste, 
  ChevronRight, Star, Heart, Sparkles,
  FileText, Target, Building2
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
    "You curate the opportunities, not algorithms",
    "Understand your fit before you apply",
    "Interview with confidence, not anxiety",
    "Your unique journey deserves thoughtful tools"
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
              Not a job board.
              <motion.span
                className="block text-primary font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Your job companion.
              </motion.span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light">
              You save jobs that interest you. We help you understand your fit, 
              craft cover letters, and research companies—all without the stress.
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/jobs">
                <Button size="lg" className="rounded-full px-8 text-base shadow-lg">
                  <FileUp className="w-4 h-4 mr-2" />
                  Upload Your CV
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                  Explore Your Jobs
                </Button>
              </Link>
            </div>
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
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Simple steps, peaceful process
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                icon: FileUp, 
                title: "Upload CV",
                desc: "Share your experience and skills with us",
                step: "1"
              },
              { 
                icon: Chrome, 
                title: "Save Jobs",
                desc: "Use our Chrome extension on LinkedIn or paste descriptions",
                step: "2"
              },
              { 
                icon: Target, 
                title: "See Your Fit",
                desc: "Understand compatibility without judgment",
                step: "3"
              },
              { 
                icon: Sparkles, 
                title: "Prepare",
                desc: "Generate cover letters and research companies",
                step: "4"
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
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
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
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Everything to reduce anxiety
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Target, 
                title: "Compatibility Insights",
                desc: "See skill matches presented gently, not as pass/fail",
                color: "from-emerald-500/20 to-teal-500/20",
                link: "/jobs",
                features: ["Skill alignment", "Gap awareness", "Growth opportunities"]
              },
              { 
                icon: FileText, 
                title: "Cover Letter Studio",
                desc: "Generate authentic letters tailored to each role",
                color: "from-rose-500/20 to-pink-500/20",
                link: "/jobs",
                features: ["Personalized tone", "Key highlights", "Easy editing"]
              },
              { 
                icon: Building2, 
                title: "Company Research",
                desc: "Understand culture before the interview",
                color: "from-violet-500/20 to-purple-500/20",
                link: "/company/felix-pago",
                features: ["Culture insights", "Interview prep", "Calm confidence"]
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
              <span className="text-sm text-primary uppercase tracking-widest mb-2 block">Your Jobs</span>
              <h2 className="text-3xl md:text-4xl font-light text-foreground">
                Opportunities you've saved
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
              <FileUp className="w-12 h-12 text-primary" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              Ready to take control
              <span className="block text-primary">of your job search?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Upload your CV and start building your curated collection of opportunities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/jobs">
                <Button size="lg" className="rounded-full px-10 text-base shadow-lg">
                  <FileUp className="w-4 h-4 mr-2" />
                  Upload CV & Begin
                </Button>
              </Link>
              <Link to="/company/felix-pago">
                <Button variant="outline" size="lg" className="rounded-full px-10 text-base">
                  <Building2 className="w-4 h-4 mr-2" />
                  See Company Research
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
