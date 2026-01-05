import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Building2,
  Check,
  ExternalLink,
  Sparkles,
  Heart,
  Target,
  Leaf,
  Star,
  TrendingUp,
  BookOpen,
  Users,
  ChevronRight
} from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import MindfulCard from "@/components/zen/MindfulCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockJobs, mockSkillsAnalysis, mockCompany } from "@/data/mockData";

import MotivationalMessage from "@/components/motivation/MotivationalMessage";
import MatchCelebration from "@/components/motivation/MatchCelebration";
import BreathingExercise from "@/components/motivation/BreathingExercise";
import SkillBadge from "@/components/motivation/SkillBadge";

// Get alignment message based on match percentage
const getAlignmentMessage = (percentage: number) => {
  if (percentage >= 80) return {
    title: "Beautiful alignment",
    message: "Your experience resonates deeply with this opportunity"
  };
  if (percentage >= 60) return {
    title: "Promising connection",
    message: "There's meaningful overlap between your journey and their needs"
  };
  if (percentage >= 40) return {
    title: "Room to grow together",
    message: "Every expert was once a beginner. This could be your growth path"
  };
  return {
    title: "A different path",
    message: "Not every opportunity is meant to be. Trust your journey"
  };
};

const JobDetail = () => {
  const { id } = useParams();
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];
  const alignmentInfo = getAlignmentMessage(job.matchPercentage);

  // Calculate skills data
  const matchedSkills = mockSkillsAnalysis.matched;
  const growthSkills = mockSkillsAnalysis.required.filter(
    skill => !mockSkillsAnalysis.matched.includes(skill)
  );

  return (
    <ThemedLayout>
      <main className="container max-w-4xl mx-auto px-4 py-8">

        {/* Section 1: Gentle Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm mb-8 px-4 py-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-all text-muted-foreground hover:text-foreground group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to your opportunities
          </Link>
        </motion.div>

        {/* Section 2: Job Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Company Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 flex items-center justify-center text-3xl font-bold flex-shrink-0 bg-primary/10 rounded-3xl text-primary shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]"
            >
              {job.companyInitial}
            </motion.div>

            <div className="flex-1">
              {/* Qualified Badge */}
              {job.isMatched && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3"
                >
                  <Check className="w-3.5 h-3.5" />
                  Strong alignment
                </motion.div>
              )}

              <h1 className="text-3xl md:text-4xl font-light text-foreground mb-2">
                {job.title}
              </h1>

              <p className="text-xl text-primary font-medium mb-4">
                {job.company}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-muted/30 rounded-full">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-muted/30 rounded-full">
                  <Clock className="w-4 h-4" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-muted/30 rounded-full">
                  <Building2 className="w-4 h-4" />
                  {job.level}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-3"
            >
              <Link to={`/jobs/${job.id}/cover-letter`}>
                <Button
                  size="lg"
                  className="w-full rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Cover Letter
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="rounded-xl">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Original Post
              </Button>
            </motion.div>
          </div>
        </motion.header>

        {/* Section 3: Alignment Celebration */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <MindfulCard className="overflow-hidden" delay={0.3}>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Match Visualization */}
              <div className="flex-shrink-0">
                <MatchCelebration
                  matchPercentage={job.matchPercentage}
                  size="lg"
                />
              </div>

              {/* Alignment Message */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-light text-foreground mb-2">
                  {alignmentInfo.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {alignmentInfo.message}
                </p>

                <MotivationalMessage
                  matchPercentage={job.matchPercentage}
                  skillsMatched={mockSkillsAnalysis.matchCount}
                  totalSkills={mockSkillsAnalysis.totalCount}
                  variant="inline"
                />
              </div>

              {/* Breathing Exercise */}
              <div className="flex-shrink-0">
                <BreathingExercise compact />
              </div>
            </div>
          </MindfulCard>
        </motion.section>

        {/* Section 4: Content Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="w-full justify-start gap-2 p-1 h-auto bg-muted/30 rounded-2xl">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 px-6 py-3 text-sm rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary font-medium transition-all"
              >
                <Heart className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="requirements"
                className="flex items-center gap-2 px-6 py-3 text-sm rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary font-medium transition-all"
              >
                <BookOpen className="w-4 h-4" />
                What They're Looking For
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">

              {/* Skills Journey Section */}
              <MindfulCard
                title="Your Skills Journey"
                subtitle={`${mockSkillsAnalysis.matchCount} of ${mockSkillsAnalysis.totalCount} skills aligned`}
                icon={<TrendingUp className="w-6 h-6" />}
                delay={0.1}
              >
                {/* Strengths You Bring */}
                {matchedSkills.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs mb-3 text-primary uppercase tracking-wider flex items-center gap-2">
                      <Star className="w-3.5 h-3.5" />
                      Strengths you bring
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {matchedSkills.map((skill) => (
                        <SkillBadge
                          key={skill}
                          skill={skill}
                          matched={true}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Growth Opportunities */}
                {growthSkills.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs mb-3 text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5" />
                      Growth opportunities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {growthSkills.map((skill) => (
                        <SkillBadge
                          key={skill}
                          skill={skill}
                          matched={false}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 italic">
                      Every skill gap is a chance to learn something new
                    </p>
                  </div>
                )}

                {mockSkillsAnalysis.matchCount >= mockSkillsAnalysis.totalCount * 0.6 && (
                  <div className="pt-4 border-t border-border/30">
                    <MotivationalMessage
                      matchPercentage={job.matchPercentage}
                      variant="inline"
                    />
                  </div>
                )}
              </MindfulCard>

              {/* Company Insights Section */}
              <MindfulCard
                title="Getting to know them"
                subtitle="What makes this team special"
                icon={<Users className="w-6 h-6" />}
                delay={0.2}
              >
                <p className="leading-relaxed mb-6 text-foreground/80">
                  {mockCompany.whatTheyDo}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-xs mb-2 flex items-center gap-2 text-primary uppercase tracking-wider">
                      <Target className="w-4 h-4" />
                      Their Focus
                    </p>
                    <p className="text-foreground/80">{mockCompany.keyFocus}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-xs mb-2 flex items-center gap-2 text-primary uppercase tracking-wider">
                      <Heart className="w-4 h-4" />
                      Team Culture
                    </p>
                    <p className="text-foreground/80">{mockCompany.teamStyle}</p>
                  </div>
                </div>
              </MindfulCard>
            </TabsContent>

            {/* Requirements Tab */}
            <TabsContent value="requirements" className="space-y-6">
              <MindfulCard
                title="What they're hoping for"
                subtitle="Remember: job posts often describe ideal candidates"
                icon={<BookOpen className="w-6 h-6" />}
                delay={0.1}
              >
                <ul className="space-y-4">
                  {[
                    "3+ years of experience with React and TypeScript",
                    "Strong understanding of JavaScript fundamentals",
                    "Experience with AWS services (Lambda, S3, EC2)",
                    "Familiarity with Node.js backend development",
                    "Excellent communication skills in English",
                  ].map((req, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{req}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
                  <p className="text-sm text-muted-foreground italic text-center">
                    "You don't need to check every box. What matters is your willingness to learn and grow."
                  </p>
                </div>
              </MindfulCard>

              <MotivationalMessage
                matchPercentage={job.matchPercentage}
                variant="banner"
              />
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Section 8: Closing Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 py-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-full bg-primary/10">
            <Leaf className="w-7 h-7 text-primary" />
          </div>

          <p className="text-xl font-light text-foreground mb-2">
            Take your time with this decision
          </p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Whether you apply today or tomorrow, the right opportunity will wait for the right moment.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to={`/jobs/${job.id}/cover-letter`}>
              <Button className="rounded-xl">
                <Sparkles className="w-4 h-4 mr-2" />
                Create Cover Letter
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="ghost" className="rounded-xl">
                Explore Other Opportunities
              </Button>
            </Link>
          </div>

          {/* Breathing exercise for lower matches */}
          {job.matchPercentage < 60 && (
            <div className="mt-8">
              <MindfulCard className="max-w-md mx-auto text-center" glowOnHover={false}>
                <h3 className="text-lg font-medium mb-4">
                  Take a peaceful moment
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Job searching can feel overwhelming. Remember to breathe.
                </p>
                <BreathingExercise />
              </MindfulCard>
            </div>
          )}
        </motion.section>

        {/* Footer decoration */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground italic">
            "Every step forward is progress, no matter how small"
          </p>
        </div>
      </main>

      <ThemedFooter />
    </ThemedLayout>
  );
};

export default JobDetail;
