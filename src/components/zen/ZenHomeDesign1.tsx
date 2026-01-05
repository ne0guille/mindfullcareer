import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileUp, Chrome, Sparkles, ArrowRight, FileText, Building2, Target, Heart, Wind, Leaf, Sun } from "lucide-react";
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
  const journeySteps = [
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
      icon: Chrome, 
      title: "Curate With Intention", 
      desc: "No algorithm pressure. Save jobs that genuinely resonate with your heart.",
      affirmation: "You know what's right for you",
      color: "from-emerald-400/20 to-teal-400/20"
    },
    { 
      step: "3", 
      icon: Target, 
      title: "Understand Your Fit", 
      desc: "See alignment gently, not as judgment. Gaps are just opportunities to grow.",
      affirmation: "You are more than a match percentage",
      color: "from-amber-400/20 to-orange-400/20"
    },
  ];

  const calmingReminders = [
    "Take your time. There's no rush.",
    "You belong in spaces that value you.",
    "The right opportunity will feel like home.",
    "Your worth isn't determined by any job."
  ];

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
              <span className="text-sm font-medium">Take a moment. Breathe. You're exactly where you need to be.</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light text-foreground mb-6 leading-tight">
              Your career journey
              <span className="block text-primary font-medium">begins with calm</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Release the anxiety of job searching. This isn't another job board—it's your 
              personal space to explore opportunities at your own pace, with clarity and confidence.
            </p>

            {/* Breathing prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <p className="text-sm text-muted-foreground italic">
                "{calmingReminders[Math.floor(Date.now() / 10000) % calmingReminders.length]}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/jobs">
                <Button size="lg" className="rounded-full px-8 text-base shadow-lg hover:shadow-xl transition-all">
                  <FileUp className="w-4 h-4 mr-2" />
                  Begin When You're Ready
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="ghost" size="lg" className="rounded-full px-8 text-base">
                  View Saved Jobs
                  <ArrowRight className="w-4 h-4 ml-2" />
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

      {/* Gentle Reminder Section */}
      <section className="container max-w-3xl mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
        >
          <Leaf className="w-8 h-8 text-primary mx-auto mb-4" />
          <p className="text-xl font-light text-foreground leading-relaxed">
            You don't have to apply to everything. You don't have to be perfect. 
            <span className="text-primary font-medium"> You just have to be you.</span>
          </p>
        </motion.div>
      </section>

      {/* Journey Steps - Floating Cards */}
      <section className="container max-w-6xl mx-auto px-4 py-16">
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
          {journeySteps.map((feature, i) => (
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
      </section>

      {/* What You Can Do Section */}
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
                desc: "Generate letters that sound like you—authentic and confident",
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
                title: "Gentle Compatibility",
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
      <section className="container max-w-4xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Sun className="w-10 h-10 text-primary mx-auto mb-6" />
          <p className="text-2xl md:text-3xl font-light text-foreground leading-relaxed">
            Remember: You are <span className="text-primary font-medium">not</span> your job. 
            You are a whole person with unique gifts, and the right place will see that.
          </p>
        </motion.div>
      </section>

      {/* Jobs Preview */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Your saved opportunities
            </h2>
            <p className="text-muted-foreground">Jobs you've chosen, analyzed with care and kindness</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockJobs.slice(0, 4).map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                        <div className="text-xs text-muted-foreground">alignment</div>
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
                Explore All Opportunities
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
            <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              You've got this
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Whenever you're ready—no pressure. We'll be here to support every step of your journey.
            </p>
            <Link to="/jobs">
              <Button size="lg" className="rounded-full px-10 text-base">
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </ZenContainer>
  );
};

export default ZenHomeDesign1;
