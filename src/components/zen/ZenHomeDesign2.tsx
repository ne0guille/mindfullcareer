import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileUp, Chrome, ClipboardPaste, Target, FileText, Building2, ArrowRight, Feather, Waves, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";
import GentleButton from "./GentleButton";

/**
 * Design 2: "Tranquil Stream"
 * Horizontal flow design with water/stream metaphor, very minimalist
 */
const ZenHomeDesign2 = () => {
  const affirmations = [
    "You are capable of amazing things",
    "Your experience has prepared you for this",
    "The right opportunity is looking for you too",
    "Trust your journey"
  ];

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
                <Feather className="w-6 h-6 text-primary" />
                <span className="text-sm text-muted-foreground tracking-widest uppercase">Breathe. You're safe here.</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-extralight text-foreground leading-[0.9] mb-8">
                Let your
                <br />
                <span className="text-primary font-normal">search</span>
                <br />
                flow gently
              </h1>

              <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-6">
                No endless scrolling. No algorithmic pressure. You choose what matters to you, 
                and we help you understand your fit with compassion and clarity.
              </p>

              {/* Rotating affirmation */}
              <motion.div
                className="mb-10 p-4 rounded-2xl bg-primary/5 border border-primary/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-primary italic text-center">
                  ✧ {affirmations[Math.floor(Date.now() / 10000) % affirmations.length]} ✧
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <GentleButton onClick={() => window.location.href = '/jobs'}>
                  <FileUp className="w-4 h-4 mr-2" />
                  Begin When Ready
                </GentleButton>
                <Button variant="ghost" size="lg" className="rounded-full" asChild>
                  <Link to="/jobs">
                    Explore Gently
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right side - Journey visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="space-y-6">
                {[
                  { icon: FileUp, label: "Share Your Story", desc: "Your experience matters", encouragement: "You've accomplished so much" },
                  { icon: Chrome, label: "Curate With Care", desc: "Save what resonates", encouragement: "Trust your instincts" },
                  { icon: Target, label: "Understand Gently", desc: "Insights, not judgments", encouragement: "Gaps are growth areas" },
                  { icon: Heart, label: "Move Forward", desc: "Prepared and confident", encouragement: "You belong here" },
                ].map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-card/40 backdrop-blur-sm border border-primary/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{step.label}</div>
                      <div className="text-sm text-muted-foreground">{step.desc}</div>
                      <div className="text-xs text-primary italic mt-1">✧ {step.encouragement}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calming Reminder */}
      <section className="py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
          >
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-xl font-light text-foreground leading-relaxed">
              Job searching can feel overwhelming. That's okay. 
              <span className="block mt-2 text-primary font-medium">Here, you set the pace. Here, you're in control.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative">
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
              No pressure. Choose what feels natural to you.
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
                desc: "Found a job anywhere? Paste the description and let us gently extract insights. Simple, calm, effective.", 
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

      {/* Features */}
      <section className="py-24 relative">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-foreground mb-4">
              Tools designed for your peace of mind
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-2">
            {[
              { icon: Target, title: "Gentle Analysis", desc: "See how your skills align without harsh judgment. We show possibilities, not shortcomings.", time: "Clarity", motivation: "You are more than metrics" },
              { icon: FileText, title: "Authentic Letters", desc: "Create cover letters that sound like you—genuine, warm, and confident.", time: "Confidence", motivation: "Your voice is powerful" },
              { icon: Building2, title: "Calm Preparation", desc: "Research companies so you walk into interviews feeling informed and at ease.", time: "Peace", motivation: "Preparation breeds confidence" },
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
                  <p className="text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                  <p className="text-sm text-primary italic">✧ {item.motivation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Preview */}
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
              Opportunities you've chosen
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Each one handpicked by you, analyzed with care
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
                          <div className="text-xs text-muted-foreground">alignment</div>
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
                Explore All Your Jobs
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
            <Heart className="w-10 h-10 text-primary mx-auto mb-6" />
            <p className="text-2xl md:text-3xl font-extralight text-foreground leading-relaxed mb-4">
              You deserve a job search that
              <br />
              <span className="text-primary">respects your peace.</span>
            </p>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Take your time. Trust the process. You're doing better than you think.
            </p>
            <GentleButton onClick={() => window.location.href = '/jobs'}>
              <FileUp className="w-4 h-4 mr-2" />
              Begin Your Journey
            </GentleButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ZenHomeDesign2;
