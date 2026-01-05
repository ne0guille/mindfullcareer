import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Leaf, Sparkles, ArrowRight, Wind, Flower2, MountainSnow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";
import MindfulCard from "./MindfulCard";
import ZenContainer from "./ZenContainer";
import AffirmationBanner from "./AffirmationBanner";

/**
 * Design 1: "Floating Garden"
 * Ethereal, spacious design with floating cards and nature-inspired elements
 */
const ZenHomeDesign1 = () => {
  return (
    <ZenContainer className="min-h-screen">
      {/* Hero - Breathing Circle */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/20"
              style={{ width: 200 + i * 150, height: 200 + i * 150 }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ 
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>

        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 rounded-full text-primary mb-8">
              <Wind className="w-4 h-4" />
              <span className="text-sm font-medium">Take a moment. Breathe.</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light text-foreground mb-6 leading-tight">
              Your career journey
              <span className="block text-primary font-medium">begins with calm</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Release the anxiety of job searching. We're here to guide you gently 
              toward opportunities that truly resonate with your spirit.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/jobs">
                <Button size="lg" className="rounded-full px-8 text-base shadow-lg hover:shadow-xl transition-all">
                  Explore Opportunities
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/company/felix-pago">
                <Button variant="ghost" size="lg" className="rounded-full px-8 text-base">
                  Learn About Companies
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Affirmation */}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <AffirmationBanner />
      </div>

      {/* Features - Floating Cards */}
      <section className="container max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { icon: Heart, title: "Mindful Analysis", desc: "Your resume reviewed with care and attention", color: "from-rose-400/20 to-pink-400/20" },
            { icon: Leaf, title: "Peaceful Matching", desc: "Opportunities that align with your values", color: "from-emerald-400/20 to-teal-400/20" },
            { icon: Sparkles, title: "Gentle Preparation", desc: "Interview prep with calm confidence", color: "from-amber-400/20 to-orange-400/20" },
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
                <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center mb-6 shadow-sm">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Jobs Preview - Horizontal Scroll */}
      <section className="py-16 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Flower2 className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Fresh Opportunities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Positions waiting for you
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockJobs.slice(0, 4).map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/jobs/${job.id}`}>
                  <MindfulCard glowOnHover className="hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                        {job.companyInitial}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{job.title}</h3>
                        <p className="text-sm text-primary">{job.company}</p>
                        <p className="text-xs text-muted-foreground mt-1">{job.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-light text-primary">{job.matchPercentage}%</div>
                        <div className="text-xs text-muted-foreground">match</div>
                      </div>
                    </div>
                  </MindfulCard>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                View All Opportunities
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container max-w-4xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-[3rem] blur-3xl" />
          <div className="relative bg-card/50 backdrop-blur-sm rounded-[3rem] p-12 md:p-16 border border-primary/10">
            <MountainSnow className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Ready to begin?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Your next chapter awaits. Take the first step with peace of mind.
            </p>
            <Link to="/jobs">
              <Button size="lg" className="rounded-full px-10 text-base">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </ZenContainer>
  );
};

export default ZenHomeDesign1;
