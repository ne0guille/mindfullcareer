import { useState } from "react";
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
  FileText,
  Send,
} from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import { mockJobs } from "@/data/mockData";

// Job detail components
import SkillChip from "@/components/job-detail/SkillChip";
import RequirementItem from "@/components/job-detail/RequirementItem";
import AnimatedSkillBar from "@/components/job-detail/AnimatedSkillBar";

// Coaching components
import SkillAccordionItem from "@/components/job-coaching/SkillAccordionItem";
import SkillCategory from "@/components/job-coaching/SkillCategory";
import TimelineProgress from "@/components/job-coaching/TimelineProgress";
import TimelineSection from "@/components/job-coaching/TimelineSection";
import ResumeBulletCard from "@/components/job-coaching/ResumeBulletCard";
import LinkedInOutreach from "@/components/job-coaching/LinkedInOutreach";

// Mock data
import {
  languageFingerprint,
  requirements,
  hiddenPriorities,
  technicalSkills,
  softSkills,
  domainExpertise,
  achievements,
  resumeBullets,
} from "@/data/coachingData";

const JobCoaching = () => {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === id) || mockJobs[0];
  const [activeSection, setActiveSection] = useState("language");
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const handleSectionInView = (sectionId: string) => {
    setActiveSection(sectionId);
    // Mark previous sections as completed
    const sectionOrder = ["language", "requirements", "priorities", "fit", "bullets", "outreach"];
    const currentIndex = sectionOrder.indexOf(sectionId);
    const completed = sectionOrder.slice(0, currentIndex);
    setCompletedSections(completed);
  };

  return (
    <ThemedLayout>
      <main className="relative min-h-screen">
        {/* Fixed Timeline Progress */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40">
          <TimelineProgress
            activeSection={activeSection}
            completedSections={completedSections}
          />
        </div>

        <div className="container max-w-4xl mx-auto px-4 py-8 lg:pl-24">
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
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-accent-violet/10 border border-accent-violet/20">
              <Sparkles className="w-5 h-5 text-accent-violet" />
              <span className="text-sm font-medium text-accent-violet">Your Coaching Journey</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Job Coaching Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Personalized coaching for{" "}
              <span className="font-semibold text-foreground">{job.title}</span>
              {" "}at{" "}
              <span className="font-semibold text-foreground">{job.company}</span>
            </p>
          </motion.header>

          {/* Timeline Sections */}
          <div className="space-y-12">
            {/* Section 1: Language Fingerprint */}
            <TimelineSection
              id="language"
              title="Language Fingerprint"
              subtitle="Mirror their vocabulary naturally to connect"
              icon={<MessageSquare className="w-7 h-7" />}
              iconColor="blue"
              index={0}
              onInView={handleSectionInView}
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
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="text-sm text-muted-foreground italic pl-4 border-l-2 border-border"
                      >
                        "{quote}"
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </TimelineSection>

            {/* Section 2: What They Really Need */}
            <TimelineSection
              id="requirements"
              title="What They Really Need"
              subtitle="Hidden signals decoded from the job posting"
              icon={<Target className="w-7 h-7" />}
              iconColor="rose"
              index={1}
              onInView={handleSectionInView}
            >
              <div className="space-y-3">
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
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-6 p-4 rounded-2xl bg-accent-amber/10 border border-accent-amber/20"
              >
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80 italic">
                    Job postings are "scar tissue" — every requirement hints at a past challenge or current need.
                  </p>
                </div>
              </motion.div>
            </TimelineSection>

            {/* Section 3: Hidden Priorities */}
            <TimelineSection
              id="priorities"
              title="Hidden Priorities"
              subtitle="What they emphasize through repetition"
              icon={<TrendingUp className="w-7 h-7" />}
              iconColor="emerald"
              index={2}
              onInView={handleSectionInView}
            >
              <div className="space-y-8">
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
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
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
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="mt-6 text-sm text-accent-rose font-medium italic"
              >
                Keywords repeated multiple times reveal what matters most to the team.
              </motion.p>
            </TimelineSection>

            {/* Section 4: Why You're a Good Fit */}
            <TimelineSection
              id="fit"
              title="Why You're a Good Fit"
              subtitle="Your strengths in their language"
              icon={<UserCheck className="w-7 h-7" />}
              iconColor="violet"
              index={3}
              onInView={handleSectionInView}
            >
              <div className="space-y-8">
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
            </TimelineSection>

            {/* Section 5: Enhanced Resume Bullets */}
            <TimelineSection
              id="bullets"
              title="Enhanced Resume Bullets"
              subtitle="Tap any bullet to see the enhanced version"
              icon={<FileText className="w-7 h-7" />}
              iconColor="amber"
              index={4}
              onInView={handleSectionInView}
            >
              <div className="space-y-4">
                {resumeBullets.map((bullet, i) => (
                  <ResumeBulletCard
                    key={i}
                    original={bullet.original}
                    enhanced={bullet.enhanced}
                    keywords={bullet.keywords}
                    category={bullet.category}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </TimelineSection>

            {/* Section 6: LinkedIn Outreach */}
            <TimelineSection
              id="outreach"
              title="LinkedIn Outreach"
              subtitle="Personalized message ready to send"
              icon={<Send className="w-7 h-7" />}
              iconColor="slate"
              index={5}
              onInView={handleSectionInView}
            >
              <LinkedInOutreach
                recipientName="Sarah Chen"
                recipientRole="Engineering Manager"
                companyName={job.company}
                jobTitle={job.title}
              />
            </TimelineSection>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 mb-8 text-center"
          >
            <Link to={`/jobs/${job.id}/cover-letter`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-2xl font-semibold text-lg
                  bg-gradient-to-r from-accent-violet to-accent-blue text-white
                  shadow-xl shadow-accent-violet/25
                  flex items-center justify-center gap-3 mx-auto"
              >
                <Sparkles className="w-5 h-5" />
                Create Cover Letter
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>

      <ThemedFooter />
    </ThemedLayout>
  );
};

export default JobCoaching;
