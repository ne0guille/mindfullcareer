import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  FileText,
  MessageSquare,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Zap,
} from "lucide-react";

// Layout
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";

// V3 Components
import HeroMatchReveal from "@/components/coaching-v3/HeroMatchReveal";
import SkillMatchCard from "@/components/coaching-v3/SkillMatchCard";
import GlowingSection from "@/components/coaching-v3/GlowingSection";
import AnimatedKeywordCloud from "@/components/coaching-v3/AnimatedKeywordCloud";
import InteractiveResumeBuilder from "@/components/coaching-v3/InteractiveResumeBuilder";
import PriorityGlassCards from "@/components/coaching-v3/PriorityGlassCards";
import LinkedInOutreachV3 from "@/components/coaching-v3/LinkedInOutreachV3";
import FloatingInsightOrb from "@/components/coaching-v3/FloatingInsightOrb";

// Data
import { mockJobs } from "@/data/mockData";
import {
  languageFingerprint,
  hiddenPriorities,
  technicalSkills,
  softSkills,
  domainExpertise,
  resumeBullets,
} from "@/data/coachingData";

const JobCoachingV3 = () => {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === id) || mockJobs[0];

  // Transform keywords for cloud
  const cloudKeywords = [
    ...languageFingerprint.powerVerbs.map((w) => ({ word: w, count: 1, type: "power" as const })),
    ...languageFingerprint.jargon.slice(0, 8).map((w) => ({ word: w, count: 2, type: "jargon" as const })),
    ...languageFingerprint.cultureSignals.slice(0, 4).map((w) => ({ word: w, count: 1, type: "culture" as const })),
  ];


  // Floating insights
  const floatingInsights = [
    { insight: "Job postings are 'scar tissue' — every requirement hints at a past challenge.", color: "violet" as const, position: { x: "5%", y: "30%" } },
    { insight: "Keywords repeated multiple times reveal what matters most to the team.", color: "amber" as const, position: { x: "90%", y: "45%" } },
    { insight: "Mirror their vocabulary naturally to create instant connection.", color: "blue" as const, position: { x: "8%", y: "65%" } },
  ];

  return (
    <ThemedLayout>
      <main className="relative min-h-screen overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 rounded-full bg-accent-violet/5 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-accent-blue/5 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-emerald/3 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating insight orbs - visible on larger screens */}
        <div className="hidden lg:block">
          {floatingInsights.map((insight, i) => (
            <FloatingInsightOrb
              key={i}
              insight={insight.insight}
              color={insight.color}
              position={insight.position}
              delay={2 + i * 0.5}
            />
          ))}
        </div>

        <div className="relative z-10 container max-w-5xl mx-auto px-4 py-8">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to={`/jobs/${id}`}
              className="inline-flex items-center gap-2 text-sm mb-4 px-4 py-2 rounded-full 
                bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card transition-all 
                text-muted-foreground hover:text-foreground group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to job details
            </Link>
          </motion.div>

          {/* Hero Match Reveal */}
          <HeroMatchReveal
            matchScore={85}
            jobTitle={job.title}
            company={job.company}
          />

          {/* Main content */}
          <div className="space-y-20 mt-8">
            {/* Section 1: Why You're a Good Fit (LEAD with this!) */}
            <GlowingSection
              title="Why You're a Great Fit"
              subtitle="Your strengths aligned to their needs"
              icon={UserCheck}
              color="emerald"
              delay={0.1}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {/* Perfect matches */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-accent-emerald flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4" />
                    Perfect Matches
                  </h4>
                  {technicalSkills
                    .filter((s) => s.evidence)
                    .map((skill, i) => (
                      <SkillMatchCard
                        key={i}
                        skill={skill.text}
                        evidence={skill.evidence}
                        matchType="perfect"
                        delay={i * 0.1}
                      />
                    ))}
                  {softSkills.slice(0, 2).map((skill, i) => (
                    <SkillMatchCard
                      key={`soft-${i}`}
                      skill={skill.text}
                      matchType="partial"
                      delay={0.3 + i * 0.1}
                    />
                  ))}
                </div>

                {/* Growth opportunities */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-accent-amber flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4" />
                    Growth Opportunities
                  </h4>
                  {technicalSkills
                    .filter((s) => s.hasIdea)
                    .map((skill, i) => (
                      <SkillMatchCard
                        key={i}
                        skill={skill.text}
                        hasIdea={skill.hasIdea}
                        matchType="opportunity"
                        delay={i * 0.1}
                      />
                    ))}
                  {domainExpertise
                    .filter((s) => s.hasIdea)
                    .map((skill, i) => (
                      <SkillMatchCard
                        key={`domain-${i}`}
                        skill={skill.text}
                        hasIdea={skill.hasIdea}
                        matchType="opportunity"
                        delay={0.2 + i * 0.1}
                      />
                    ))}
                </div>
              </div>
            </GlowingSection>

            {/* Section 2: Hidden Priorities - Glassmorphic Cards */}
            <GlowingSection
              title="Hidden Priorities"
              subtitle="Click any card to reveal insights"
              icon={TrendingUp}
              color="violet"
              delay={0.2}
            >
              <PriorityGlassCards priorities={hiddenPriorities} />
            </GlowingSection>

            {/* Section 3: Language Fingerprint */}
            <GlowingSection
              title="Language Fingerprint"
              subtitle="Mirror their vocabulary naturally"
              icon={MessageSquare}
              color="blue"
              delay={0.3}
            >
              <AnimatedKeywordCloud keywords={cloudKeywords} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-6 p-4 rounded-2xl bg-accent-blue/10 border border-accent-blue/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-accent-blue" />
                  <span className="text-sm font-medium text-accent-blue">
                    Communication Style: {languageFingerprint.communicationStyle}
                  </span>
                </div>
                <div className="space-y-2 mt-3">
                  {languageFingerprint.evidence.map((quote, i) => (
                    <p key={i} className="text-sm text-muted-foreground italic pl-4 border-l-2 border-accent-blue/30">
                      "{quote}"
                    </p>
                  ))}
                </div>
              </motion.div>
            </GlowingSection>

            {/* Section 4: Resume Transformation */}
            <GlowingSection
              title="Resume Transformation"
              subtitle="Click to transform each bullet with their keywords"
              icon={FileText}
              color="amber"
              delay={0.4}
            >
              <InteractiveResumeBuilder bullets={resumeBullets} />
            </GlowingSection>

            {/* Section 5: LinkedIn Outreach */}
            <GlowingSection
              title="LinkedIn Outreach"
              subtitle="Personalized messages to connect with the team"
              icon={Send}
              color="blue"
              delay={0.5}
            >
              <LinkedInOutreachV3
                recipientName="Sarah Chen"
                recipientRole="Engineering Manager"
                companyName={job.company}
                jobTitle={job.title}
              />
            </GlowingSection>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 mb-8 text-center"
          >
            <Link to={`/jobs/${job.id}/cover-letter`}>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px hsl(var(--accent-violet) / 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 rounded-2xl font-semibold text-lg
                  bg-gradient-to-r from-accent-violet via-accent-blue to-accent-emerald text-white
                  shadow-xl shadow-accent-violet/25
                  flex items-center justify-center gap-3 mx-auto
                  relative overflow-hidden"
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <Sparkles className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Create Cover Letter</span>
              </motion.button>
            </Link>

            {/* Version switcher */}
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to={`/jobs/${id}/coaching`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                View Timeline Version
              </Link>
              <span className="text-muted-foreground/30">|</span>
              <Link
                to={`/jobs/${id}/coaching-v2`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                View Dashboard Version
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <ThemedFooter />
    </ThemedLayout>
  );
};

export default JobCoachingV3;
