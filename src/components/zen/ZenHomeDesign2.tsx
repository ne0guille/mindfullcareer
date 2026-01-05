import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Droplets, Trees, Sun, Moon, Waves, Feather, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";
import GentleButton from "./GentleButton";

/**
 * Design 2: "Tranquil Stream"
 * Horizontal flow design with water/stream metaphor, very minimalist
 */
const ZenHomeDesign2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero - Full Width with Flowing Lines */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Flowing lines background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              style={{ 
                top: `${20 + i * 15}%`,
                width: '200%',
                left: '-50%'
              }}
              animate={{ x: ['-25%', '25%'] }}
              transition={{ 
                duration: 20 + i * 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Droplets className="w-6 h-6 text-primary" />
                <span className="text-sm text-muted-foreground tracking-widest uppercase">Flow with purpose</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-extralight text-foreground leading-[0.9] mb-8">
                Let your
                <br />
                <span className="text-primary font-normal">career</span>
                <br />
                flow
              </h1>

              <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-10">
                Like water finding its path, we help you discover opportunities 
                that naturally align with who you are.
              </p>

              <div className="flex flex-wrap gap-4">
                <GentleButton onClick={() => window.location.href = '/jobs'}>
                  Begin Flowing
                </GentleButton>
                <Button variant="ghost" size="lg" className="rounded-full" asChild>
                  <Link to="/company/felix-pago">
                    <Feather className="w-4 h-4 mr-2" />
                    Explore Gently
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right side - Zen garden visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative aspect-square max-w-lg mx-auto"
            >
              {/* Concentric ripples */}
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/10"
                  style={{ margin: i * 40 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.2, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
              {/* Center stone */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <Sun className="w-10 h-10 text-primary" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 relative">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-2">
            {[
              { icon: Trees, title: "Ground Yourself", desc: "Your experience is your foundation. We help you recognize and present your unique strengths.", time: "Morning" },
              { icon: Sun, title: "Illuminate", desc: "Clarity comes from understanding. See your career path with fresh perspective.", time: "Midday" },
              { icon: Moon, title: "Rest Easy", desc: "With preparation complete, face interviews with peaceful confidence.", time: "Evening" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="relative group"
              >
                <div className="h-full p-10 bg-card/40 backdrop-blur-sm border-y border-primary/10 first:border-l first:rounded-l-3xl last:border-r last:rounded-r-3xl transition-all duration-500 group-hover:bg-card/80">
                  <span className="text-xs text-primary/60 uppercase tracking-widest">{item.time}</span>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center my-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-light text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities as Stepping Stones */}
      <section className="py-24 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Waves className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-extralight text-foreground mb-4">
              Stepping stones await
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Each opportunity is a stone across the stream. Find the ones that feel right.
            </p>
          </motion.div>

          {/* Staggered job cards */}
          <div className="space-y-4">
            {mockJobs.slice(0, 4).map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                style={{ marginLeft: i % 2 === 0 ? '0' : 'auto', marginRight: i % 2 === 0 ? 'auto' : '0', maxWidth: '80%' }}
              >
                <Link to={`/jobs/${job.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: i % 2 === 0 ? 10 : -10 }}
                    className="p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {job.companyInitial}
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{job.title}</h3>
                          <p className="text-sm text-primary">{job.company} • {job.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-3xl font-extralight text-primary">{job.matchPercentage}%</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="rounded-full px-10">
                Discover All Paths
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Minimal footer CTA */}
      <section className="py-32">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl font-extralight text-foreground leading-relaxed mb-8">
              "The journey of a thousand miles
              <br />
              <span className="text-primary">begins with a single step."</span>
            </p>
            <p className="text-sm text-muted-foreground mb-8">— Lao Tzu</p>
            <GentleButton onClick={() => window.location.href = '/jobs'}>
              Take Your First Step
            </GentleButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ZenHomeDesign2;
