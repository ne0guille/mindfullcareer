import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Building2, Check, ExternalLink, Sparkles, Code, Target } from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedCard from "@/components/ThemedCard";
import ThemedBadge from "@/components/ThemedBadge";
import ThemedFooter from "@/components/ThemedFooter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockJobs, mockSkillsAnalysis, mockCompany } from "@/data/mockData";

import MotivationalMessage from "@/components/motivation/MotivationalMessage";
import MatchCelebration from "@/components/motivation/MatchCelebration";
import BreathingExercise from "@/components/motivation/BreathingExercise";
import SkillBadge from "@/components/motivation/SkillBadge";

const JobDetail = () => {
  const { id } = useParams();
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];

  return (
    <ThemedLayout>
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm mb-6 transition-colors text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        {/* Job Header */}
        <header className="mb-8">
          <div className="flex items-start gap-4">
            {/* Company initial */}
            <div className="w-16 h-16 flex items-center justify-center text-2xl font-bold flex-shrink-0 bg-primary/10 rounded-2xl text-primary">
              {job.companyInitial}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                {job.isMatched && (
                  <ThemedBadge variant="success">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Qualified Candidate
                    </span>
                  </ThemedBadge>
                )}
              </div>
              <h1 className="headline-primary text-3xl mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-primary font-display">
                {job.company}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {job.level}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link to={`/jobs/${job.id}/cover-letter`}>
                <Button variant="default" size="lg" className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Cover Letter
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Job Post Link
              </Button>
            </div>
          </div>
        </header>

        {/* Match Celebration Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <ThemedCard className="md:col-span-1">
            <MatchCelebration
              matchPercentage={job.matchPercentage}
              size="lg"
            />
          </ThemedCard>

          <div className="md:col-span-2 flex flex-col gap-4">
            <MotivationalMessage
              matchPercentage={job.matchPercentage}
              skillsMatched={mockSkillsAnalysis.matchCount}
              totalSkills={mockSkillsAnalysis.totalCount}
              variant="banner"
            />

            {(job.matchPercentage < 70) && (
              <div className="flex items-center gap-4">
                <BreathingExercise compact />
                <p className="text-sm text-muted-foreground italic">
                  Take a moment if you need it
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="w-full justify-start gap-0 p-0 h-auto bg-muted rounded-lg">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 px-6 py-3 text-sm rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
            >
              <Target className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="requirements"
              className="flex items-center gap-2 px-6 py-3 text-sm rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
            >
              <Code className="w-4 h-4" />
              Requirements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ThemedCard variant="default">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Code className="w-5 h-5 text-primary" />
                  Skills Analysis
                </h3>
                <span className="text-lg font-bold text-primary">
                  {mockSkillsAnalysis.matchCount}/{mockSkillsAnalysis.totalCount} skills
                </span>
              </div>

              <p className="text-xs mb-3 text-muted-foreground uppercase tracking-wider">
                Required
              </p>
              <div className="flex flex-wrap gap-2">
                {mockSkillsAnalysis.required.map((skill) => {
                  const isMatched = mockSkillsAnalysis.matched.includes(skill);
                  return (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      matched={isMatched}
                    />
                  );
                })}
              </div>

              {mockSkillsAnalysis.matchCount >= mockSkillsAnalysis.totalCount * 0.6 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <MotivationalMessage
                    matchPercentage={job.matchPercentage}
                    variant="inline"
                  />
                </div>
              )}
            </ThemedCard>

            <ThemedCard variant="highlight">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                Insights
              </h3>

              <p className="leading-relaxed mb-6">
                {mockCompany.whatTheyDo}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <ThemedCard variant="default" className="p-4">
                  <p className="text-xs mb-2 flex items-center gap-2 text-primary uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    Key Focus
                  </p>
                  <p>{mockCompany.keyFocus}</p>
                </ThemedCard>
                <ThemedCard variant="default" className="p-4">
                  <p className="text-xs mb-2 flex items-center gap-2 text-primary uppercase tracking-wider">
                    <Building2 className="w-4 h-4" />
                    Team Style
                  </p>
                  <p>{mockCompany.teamStyle}</p>
                </ThemedCard>
              </div>
            </ThemedCard>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <ThemedCard variant="default">
              <h3 className="text-lg font-semibold mb-4">
                Position Requirements
              </h3>

              <ul className="space-y-3">
                {[
                  "3+ years of experience with React and TypeScript",
                  "Strong understanding of JavaScript fundamentals",
                  "Experience with AWS services (Lambda, S3, EC2)",
                  "Familiarity with Node.js backend development",
                  "Excellent communication skills in English",
                ].map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </ThemedCard>

            <MotivationalMessage
              matchPercentage={job.matchPercentage}
              variant="banner"
            />
          </TabsContent>
        </Tabs>

        {/* Breathing exercise section */}
        {job.matchPercentage < 60 && (
          <div className="mt-8">
            <ThemedCard className="text-center p-8">
              <h3 className="text-xl font-semibold mb-4">
                Take a Peaceful Moment
              </h3>
              <BreathingExercise />
            </ThemedCard>
          </div>
        )}

        {/* Footer decoration */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            — End of Position Listing —
          </p>
        </div>
      </main>

      <ThemedFooter />
    </ThemedLayout>
  );
};

export default JobDetail;
