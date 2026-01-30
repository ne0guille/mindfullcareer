import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Building2,
  Check,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  Zap,
  Code2,
  BookOpen,
  Sparkles,
  Quote,
} from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import { mockJobs, mockSkillsAnalysis, mockCompany } from "@/data/mockData";

// New colorful components
import InsightSection from "@/components/job-detail/InsightSection";
import SkillChip from "@/components/job-detail/SkillChip";
import RequirementItem from "@/components/job-detail/RequirementItem";
import AnimatedSkillBar from "@/components/job-detail/AnimatedSkillBar";
import FloatingActionCard from "@/components/job-detail/FloatingActionCard";

// Mock data for the new sections
const languageFingerprint = {
  powerVerbs: ["deliver", "design", "develop", "implement", "follow", "work"],
  jargon: ["HTML", "CSS", "JavaScript", "WCAG 2.1", "web accessibility", "cross browser compatibility", "semantic code", "web standards"],
  cultureSignals: ["highly motivated", "team environment", "exchanging ideas", "resourceful and innovative", "quickly adapt", "changing landscape"],
  communicationStyle: "Formal",
};

const hiddenPriorities = [
  { keyword: "web standards", count: 3, color: "emerald" as const },
  { keyword: "team", count: 4, color: "violet" as const },
  { keyword: "hospitality industry", count: 2, color: "amber" as const },
];

const requirements = [
  { text: "ability to quickly and creatively adapt to a changing landscape", priority: "high" as const, matched: true, insight: "This suggests they've had challenges with slow-moving developers. Emphasize your agility in past roles." },
  { text: "team environment is critical to our success", priority: "high" as const, matched: true, insight: "Team collaboration is deeply valued. Highlight pair programming or cross-functional projects." },
  { text: "expert understanding of cross browser compatibility", priority: "medium" as const, matched: false, insight: "They may have legacy browser requirements. Ask about their browser support matrix." },
  { text: "Ability to handle multiple projects simultaneously", priority: "medium" as const, matched: true },
  { text: "Experience with Content Management Systems", priority: "low" as const, matched: false },
];

const JobDetail = () => {
  const { id } = useParams();
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];

  const matchedSkills = mockSkillsAnalysis.matched;
  const growthSkills = mockSkillsAnalysis.required.filter(
    skill => !mockSkillsAnalysis.matched.includes(skill)
  );

  return (
    <ThemedLayout>
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm mb-8 px-4 py-2 rounded-full 
              bg-muted/50 hover:bg-muted transition-all text-muted-foreground hover:text-foreground group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to opportunities
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Job Header Card */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 p-8 overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent-violet/20 via-transparent to-transparent rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                {/* Company Logo */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-20 h-20 flex items-center justify-center text-3xl font-bold flex-shrink-0 
                    bg-gradient-to-br from-accent-violet/20 to-accent-blue/20 
                    rounded-3xl text-foreground
                    shadow-[0_0_40px_-10px_hsl(var(--accent-violet)/0.4)]"
                >
                  {job.companyInitial}
                </motion.div>

                <div className="flex-1">
                  {job.isMatched && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                        bg-accent-emerald/15 text-accent-emerald text-sm font-medium mb-3
                        border border-accent-emerald/30"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Strong alignment
                    </motion.div>
                  )}

                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {job.title}
                  </h1>

                  <p className="text-xl text-accent-violet font-semibold mb-4">
                    {job.company}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-xl text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-xl text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-xl text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      {job.level}
                    </span>
                  </div>
                </div>
              </div>
            </motion.header>

            {/* Language Fingerprint Section */}
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
              </div>
            </InsightSection>

            {/* What They Really Need */}
            <InsightSection
              title="What They Really Need"
              subtitle="Hidden signals decoded"
              icon={<Target className="w-6 h-6" />}
              iconColor="rose"
              delay={0.2}
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
              delay={0.3}
            >
              <div className="space-y-5">
                {hiddenPriorities.map((priority, i) => (
                  <div key={priority.keyword}>
                    <AnimatedSkillBar
                      label={priority.keyword}
                      count={priority.count}
                      color={priority.color}
                      delay={i * 0.15}
                    />
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 + 0.3 }}
                      className="text-xs text-muted-foreground mt-2 ml-1"
                    >
                      {priority.keyword === "web standards" && "Mentioned in technical requirements and code quality expectations"}
                      {priority.keyword === "team" && "Emphasized throughout role description and requirements"}
                      {priority.keyword === "hospitality industry" && "Mentioned in team description and business context"}
                    </motion.p>
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

            {/* Skills Journey */}
            <InsightSection
              title="Your Skills Journey"
              subtitle={`${mockSkillsAnalysis.matchCount} of ${mockSkillsAnalysis.totalCount} skills aligned`}
              icon={<Sparkles className="w-6 h-6" />}
              iconColor="violet"
              delay={0.4}
            >
              <div className="space-y-6">
                {/* Matched Skills */}
                {matchedSkills.length > 0 && (
                  <div>
                    <p className="text-xs mb-3 text-accent-emerald uppercase tracking-wider font-semibold">
                      ✓ Strengths you bring
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {matchedSkills.map((skill, i) => (
                        <SkillChip key={skill} skill={skill} variant="matched" delay={i * 0.05} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Growth Skills */}
                {growthSkills.length > 0 && (
                  <div>
                    <p className="text-xs mb-3 text-muted-foreground uppercase tracking-wider font-semibold">
                      ○ Growth opportunities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {growthSkills.map((skill, i) => (
                        <SkillChip key={skill} skill={skill} variant="growth" delay={i * 0.05} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </InsightSection>

            {/* Company Culture */}
            <InsightSection
              title="Getting to Know Them"
              subtitle="What makes this team special"
              icon={<BookOpen className="w-6 h-6" />}
              iconColor="amber"
              delay={0.5}
            >
              <p className="text-foreground/80 leading-relaxed mb-6">
                {mockCompany.whatTheyDo}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-accent-violet/10 border border-accent-violet/20">
                  <p className="text-xs mb-2 flex items-center gap-2 text-accent-violet uppercase tracking-wider font-semibold">
                    <Target className="w-4 h-4" />
                    Their Focus
                  </p>
                  <p className="text-sm text-foreground/80">{mockCompany.keyFocus}</p>
                </div>
                <div className="p-4 rounded-2xl bg-accent-blue/10 border border-accent-blue/20">
                  <p className="text-xs mb-2 flex items-center gap-2 text-accent-blue uppercase tracking-wider font-semibold">
                    <Users className="w-4 h-4" />
                    Team Culture
                  </p>
                  <p className="text-sm text-foreground/80">{mockCompany.teamStyle}</p>
                </div>
              </div>
            </InsightSection>
          </div>

          {/* Sticky Sidebar */}
          <div className="hidden lg:block">
            <FloatingActionCard jobId={job.id} matchPercentage={job.matchPercentage} />
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

export default JobDetail;
