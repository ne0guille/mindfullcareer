import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileUp, Chrome, ClipboardPaste, Target, FileText, Building2, ArrowRight, Feather, Waves } from "lucide-react";
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
                <Feather className="w-6 h-6 text-primary" />
                <span className="text-sm text-muted-foreground tracking-widest uppercase">A calmer way to job search</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-extralight text-foreground leading-[0.9] mb-8">
                You
                <br />
                <span className="text-primary font-normal">choose</span>
                <br />
                the jobs
              </h1>

              <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-10">
                No endless scrolling through irrelevant listings. Save jobs that speak to you, 
                and we'll help you understand your fit with each one.
              </p>

              <div className="flex flex-wrap gap-4">
                <GentleButton onClick={() => window.location.href = '/jobs'}>
                  <FileUp className="w-4 h-4 mr-2" />
                  Upload Your CV
                </GentleButton>
                <Button variant="ghost" size="lg" className="rounded-full" asChild>
                  <Link to="/jobs">
                    View Saved Jobs
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
                  { icon: FileUp, label: "Upload CV", desc: "Share your experience" },
                  { icon: Chrome, label: "Save Jobs", desc: "From LinkedIn or paste descriptions" },
                  { icon: Target, label: "See Your Fit", desc: "Skill matching & compatibility" },
                  { icon: FileText, label: "Cover Letters", desc: "Tailored for each role" },
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
                    <div>
                      <div className="font-medium text-foreground">{step.label}</div>
                      <div className="text-sm text-muted-foreground">{step.desc}</div>
                    </div>
                    {i < 3 && (
                      <motion.div
                        className="ml-auto"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4 text-primary/50" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
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
              Two ways to add jobs
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Choose what feels right for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: Chrome, 
                title: "Chrome Extension", 
                desc: "Browse LinkedIn naturally. When you find a job that interests you, click our extension to save it instantly. No copying, no switching tabs.", 
                tag: "Effortless" 
              },
              { 
                icon: ClipboardPaste, 
                title: "Paste Job Description", 
                desc: "Found a job somewhere else? Simply paste the description and we'll extract all the important details and analyze your compatibility.", 
                tag: "Flexible" 
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
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-2">
            {[
              { icon: Target, title: "Compatibility Analysis", desc: "See how your skills align with each job. Understand gaps without judgment, find opportunities that truly fit.", time: "Clarity" },
              { icon: FileText, title: "Cover Letter Generation", desc: "Create personalized cover letters for each opportunity. Authentic, tailored, and true to your voice.", time: "Confidence" },
              { icon: Building2, title: "Company Research", desc: "Learn about company culture before interviews. Go in prepared, calm, and informed.", time: "Preparation" },
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
              Your curated opportunities
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Jobs you've saved, ready for your review
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
                View All Your Jobs
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
              Job searching doesn't have to be
              <br />
              <span className="text-primary">stressful.</span>
            </p>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Take control of your search. Save only what matters. Move at your own pace.
            </p>
            <GentleButton onClick={() => window.location.href = '/jobs'}>
              <FileUp className="w-4 h-4 mr-2" />
              Start With Your CV
            </GentleButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ZenHomeDesign2;
