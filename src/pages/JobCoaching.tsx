import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
  Zap,
  Code2,
  Quote,
  Sparkles,
  Trophy,
  Building,
  UserCheck,
} from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import { mockJobs } from "@/data/mockData";

// Reuse existing components
import InsightSection from "@/components/job-detail/InsightSection";
import SkillChip from "@/components/job-detail/SkillChip";
import RequirementItem from "@/components/job-detail/RequirementItem";
import AnimatedSkillBar from "@/components/job-detail/AnimatedSkillBar";

// New coaching-specific components
import SkillAccordionItem from "@/components/job-coaching/SkillAccordionItem";
import SkillCategory from "@/components/job-coaching/SkillCategory";

// Mock coaching data
const languageFingerprint = {
  powerVerbs: ["deliver", "design", "develop", "implement", "follow", "work"],
  jargon: ["HTML", "CSS", "JavaScript", "WCAG 2.1", "web accessibility", "cross browser compatibility", "semantic code", "web standards", "Google Tag Manager", "Google Analytics", "Content Management System"],
  cultureSignals: ["highly motivated", "team environment", "exchanging ideas", "resourceful and innovative", "quickly and creatively adapt", "changing landscape"],
  communicationStyle: "Formal",
  evidence: [
    "highly motivated, experienced front-end developer",
    "team environment is critical to our success",
  ],
};

const requirements = [
  { text: "ability to quickly and creatively adapt to a changing landscape", priority: "high" as const, matched: true, insight: "This suggests they've had challenges with slow-moving developers. Emphasize your agility in past roles." },
  { text: "team environment is critical to our success", priority: "high" as const, matched: true, insight: "Team collaboration is deeply valued. Highlight pair programming or cross-functional projects." },
  { text: "expert understanding of cross browser compatibility", priority: "medium" as const, matched: false, insight: "They may have legacy browser requirements. Ask about their browser support matrix." },
  { text: "Ability to handle multiple projects simultaneously", priority: "medium" as const, matched: true },
];

const hiddenPriorities = [
  { 
    keyword: "web standards", 
    count: 3, 
    color: "emerald" as const,
    context: "Mentioned in technical requirements and code quality expectations",
    insight: "They prioritize maintainable, standards-compliant code over quick fixes"
  },
  { 
    keyword: "team", 
    count: 4, 
    color: "violet" as const,
    context: "Emphasized throughout role description and requirements",
    insight: "Collaboration and team integration are more important than individual brilliance"
  },
  { 
    keyword: "hospitality industry", 
    count: 2, 
    color: "amber" as const,
    context: "Mentioned in team description and business context",
    insight: "Domain knowledge of hotel booking and ecommerce would be valuable"
  },
];

const technicalSkills = [
  { text: "Expert HTML/CSS developer with JavaScript frameworks experience", evidence: "Senior Frontend Developer with Angular/React experience and comprehensive web platform development" },
  { text: "Write clean, semantic, web standards code with cross browser compatibility", evidence: null },
  { text: "Knowledge of WCAG 2.1 and web accessibility importance", hasIdea: true },
  { text: "Experience with Google Tag Manager/Google Analytics and web tracking tools", hasIdea: true },
];

const softSkills = [
  { text: "Work effectively in team environment, exchanging ideas", evidence: null },
  { text: "Resourceful and innovative with ability to quickly adapt to changing landscape", evidence: null },
  { text: "Excellent written and verbal communication skills", evidence: null },
  { text: "Ability to handle multiple projects simultaneously", evidence: null },
];

const domainExpertise = [
  { text: "Experience developing ecommerce and web portal solutions", evidence: null },
  { text: "Understanding of hospitality industry booking systems", hasIdea: true },
  { text: "Experience working within Content Management Systems", hasIdea: true },
];

const achievements = [
  { text: "Deliver state-of-the-art web applications with measurable performance improvements", evidence: null },
];

const JobCoaching = () => {
  const { id } = useParams();
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];

  return (
    <ThemedLayout>
      <main className="container max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to={`/jobs/${id}`}
            className="inline-flex items-center gap-2 text-sm mb-8 px-4 py-2 rounded-full 
              bg-muted/50 hover:bg-muted transition-all text-muted-foreground hover:text-foreground group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to job details
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-violet/20 to-accent-blue/20 
              flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent-violet" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Job Coaching Insights
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Personalized coaching for{" "}
            <span className="font-semibold text-foreground">{job.title}</span>
            {" "}at{" "}
            <span className="font-semibold text-foreground">{job.company}</span>
          </p>
        </motion.header>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Language Fingerprint */}
            <InsightSection
              title="Language Fingerprint"
              subtitle="Mirror their vocabulary naturally"
              icon={<MessageSquare className="w-6 h-6" />}
              iconColor="blue"
              delay={0.1}
            >
              <div className="space-y-6">
                {/* Power Verbs */}
                <div>
                  <p className="text-xs mb-3 text-accent-blue uppercase tracking-wider font-semibold flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" />
                    Power Verbs
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {languageFingerprint.powerVerbs.map((verb, i) => (
                      <SkillChip key={verb} skill={verb} variant="power-verb" delay={i * 0.05} />
                    ))}
                  </div>
                </div>

                {/* Industry Jargon */}
                <div>
                  <p className="text-xs mb-3 text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5" />
                    Industry Jargon
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {languageFingerprint.jargon.map((term, i) => (
                      <SkillChip key={term} skill={term} variant="jargon" delay={i * 0.03} />
                    ))}
                  </div>
                </div>

                {/* Culture Signals */}
                <div>
                  <p className="text-xs mb-3 text-accent-violet uppercase tracking-wider font-semibold flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    Culture Signals
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {languageFingerprint.cultureSignals.map((signal, i) => (
                      <SkillChip key={signal} skill={signal} variant="culture" delay={i * 0.05} />
                    ))}
                  </div>
                </div>

                {/* Communication Style */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">Communication Style:</span>
                  <span className="px-3 py-1 rounded-lg bg-muted text-sm font-medium text-foreground">
                    {languageFingerprint.communicationStyle}
                  </span>
                </div>

                {/* Evidence */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs mb-3 text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-2">
                    <Quote className="w-3.5 h-3.5" />
                    Evidence
                  </p>
                  <div className="space-y-2">
                    {languageFingerprint.evidence.map((quote, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="text-sm text-muted-foreground italic pl-4 border-l-2 border-border"
                      >
                        "{quote}"
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </InsightSection>

            {/* Why You're a Good Fit */}
            <InsightSection
              title="Why You're a Good Fit"
              subtitle="Your strengths in their language"
              icon={<UserCheck className="w-6 h-6" />}
              iconColor="emerald"
              delay={0.2}
            >
              <div className="space-y-6">
                {/* Technical Skills */}
                <SkillCategory
                  title="Technical Skills"
                  icon={<Code2 className="w-4 h-4" />}
                  iconColor="blue"
                  delay={0.1}
                >
                  {technicalSkills.map((skill, i) => (
                    <SkillAccordionItem
                      key={i}
                      text={skill.text}
                      evidence={skill.evidence}
                      hasIdea={skill.hasIdea}
                      delay={i * 0.05}
                    />
                  ))}
                </SkillCategory>

                {/* Soft Skills */}
                <SkillCategory
                  title="Soft Skills"
                  icon={<Users className="w-4 h-4" />}
                  iconColor="violet"
                  delay={0.2}
                >
                  {softSkills.map((skill, i) => (
                    <SkillAccordionItem
                      key={i}
                      text={skill.text}
                      evidence={skill.evidence}
                      delay={i * 0.05}
                    />
                  ))}
                </SkillCategory>

                {/* Domain Expertise */}
                <SkillCategory
                  title="Domain Expertise"
                  icon={<Building className="w-4 h-4" />}
                  iconColor="amber"
                  delay={0.3}
                >
                  {domainExpertise.map((skill, i) => (
                    <SkillAccordionItem
                      key={i}
                      text={skill.text}
                      evidence={skill.evidence}
                      hasIdea={skill.hasIdea}
                      delay={i * 0.05}
                    />
                  ))}
                </SkillCategory>

                {/* Achievements */}
                <SkillCategory
                  title="Achievements"
                  icon={<Trophy className="w-4 h-4" />}
                  iconColor="rose"
                  delay={0.4}
                >
                  {achievements.map((skill, i) => (
                    <SkillAccordionItem
                      key={i}
                      text={skill.text}
                      evidence={skill.evidence}
                      delay={i * 0.05}
                    />
                  ))}
                </SkillCategory>
              </div>
            </InsightSection>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* What They Really Need */}
            <InsightSection
              title="What They Really Need"
              subtitle="Hidden signals decoded"
              icon={<Target className="w-6 h-6" />}
              iconColor="rose"
              delay={0.15}
            >
              <div className="space-y-2">
                {requirements.map((req, i) => (
                  <RequirementItem
                    key={i}
                    text={req.text}
                    priority={req.priority}
                    matched={req.matched}
                    insight={req.insight}
                    delay={i * 0.1}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-4 rounded-2xl bg-accent-amber/10 border border-accent-amber/20"
              >
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80 italic">
                    Job postings are "scar tissue" — every requirement hints at a past challenge or current need.
                  </p>
                </div>
              </motion.div>
            </InsightSection>

            {/* Hidden Priorities */}
            <InsightSection
              title="Hidden Priorities"
              subtitle="What they emphasize through repetition"
              icon={<TrendingUp className="w-6 h-6" />}
              iconColor="emerald"
              delay={0.25}
            >
              <div className="space-y-6">
                {hiddenPriorities.map((priority, i) => (
                  <div key={priority.keyword} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-lg bg-muted font-mono text-sm text-foreground">
                        {priority.keyword}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        mentioned {priority.count}×
                      </span>
                    </div>
                    
                    <AnimatedSkillBar
                      label=""
                      count={priority.count}
                      color={priority.color}
                      delay={i * 0.15}
                    />
                    
                    <p className="text-xs text-muted-foreground">
                      {priority.context}
                    </p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 + 0.3 }}
                      className="p-3 rounded-xl bg-muted/50 border border-border/30"
                    >
                      <p className="text-sm text-foreground/80">
                        {priority.insight}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-6 text-sm text-accent-rose font-medium italic"
              >
                Keywords repeated multiple times reveal what matters most to the team.
              </motion.p>
            </InsightSection>
          </div>
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border z-50"
        >
          <Link to={`/jobs/${job.id}/cover-letter`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 rounded-2xl font-semibold text-base
                bg-gradient-to-r from-accent-violet to-accent-blue text-white
                shadow-lg shadow-accent-violet/25
                flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Create Cover Letter
            </motion.button>
          </Link>
        </motion.div>
      </main>

      <ThemedFooter />
    </ThemedLayout>
  );
};

export default JobCoaching;
