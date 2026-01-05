import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Building2, Check, ExternalLink, Sparkles, Code, Target, Brain, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedCard from "@/components/ThemedCard";
import ThemedBadge from "@/components/ThemedBadge";
import ThemedFooter from "@/components/ThemedFooter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockJobs, mockSkillsAnalysis, mockCompany } from "@/data/mockData";

// Motivational components
import MotivationalMessage from "@/components/motivation/MotivationalMessage";
import MatchCelebration from "@/components/motivation/MatchCelebration";
import BreathingExercise from "@/components/motivation/BreathingExercise";
import SkillBadge from "@/components/motivation/SkillBadge";

const JobDetail = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];

  return (
    <ThemedLayout>
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link 
          to="/jobs" 
          className={`inline-flex items-center gap-2 text-sm mb-6 transition-colors ${
            theme === "cyber" 
              ? "text-primary cyber-mono uppercase hover:text-primary/80" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {theme === "cyber" ? "< BACK_TO_LISTINGS" : "Back to Jobs"}
        </Link>
        
        {/* Job Header */}
        <header className="mb-8">
          <div className="flex items-start gap-4">
            {/* Company initial */}
            <div className={`w-16 h-16 flex items-center justify-center text-2xl font-bold flex-shrink-0 ${
              theme === "cyber" 
                ? "bg-primary/20 border border-primary/50 text-primary cyber-glow" 
                : theme === "zen"
                  ? "bg-primary/10 rounded-2xl text-primary"
                  : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
            }`}>
              {job.companyInitial}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                {job.isMatched && (
                  <ThemedBadge variant="success">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" /> 
                      {theme === "cyber" ? "QUALIFIED" : "Qualified Candidate"}
                    </span>
                  </ThemedBadge>
                )}
              </div>
              <h1 className={`mb-2 ${
                theme === "cyber" 
                  ? "text-2xl font-bold text-primary cyber-text-glow cyber-mono uppercase" 
                  : "headline-primary text-3xl"
              }`}>
                {job.title}
              </h1>
              <p className={`text-xl ${theme === "cyber" ? "text-primary cyber-mono" : "text-primary font-display"}`}>
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
              <Button 
                variant="default"
                size="lg"
                className={theme === "cyber" ? "cyber-mono uppercase cyber-glow" : ""}
              >
                {theme === "cyber" ? <Brain className="w-4 h-4 mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                {theme === "cyber" ? "GENERATE COVER" : "Generate Cover Letter"}
              </Button>
              <Button variant="outline" size="sm" className={theme === "cyber" ? "cyber-mono uppercase" : ""}>
                <ExternalLink className="w-4 h-4 mr-2" />
                {theme === "cyber" ? "SOURCE_LINK" : "Job Post Link"}
              </Button>
            </div>
          </div>
          
          {theme === "newspaper" && <div className="newspaper-rule-double mt-6" />}
          {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-6" />}
        </header>

        {/* Match Celebration Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Match Score with Celebration */}
          <ThemedCard className="md:col-span-1">
            <MatchCelebration 
              matchPercentage={job.matchPercentage} 
              size="lg"
            />
          </ThemedCard>
          
          {/* Motivational Message */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <MotivationalMessage 
              matchPercentage={job.matchPercentage}
              skillsMatched={mockSkillsAnalysis.matchCount}
              totalSkills={mockSkillsAnalysis.totalCount}
              variant="banner"
            />
            
            {/* Breathing exercise for lower matches or zen theme */}
            {(job.matchPercentage < 70 || theme === "zen") && (
              <div className="flex items-center gap-4">
                <BreathingExercise compact />
                <p className={`text-sm text-muted-foreground ${theme === "cyber" ? "cyber-mono" : "italic"}`}>
                  {theme === "cyber" 
                    ? "STRESS_LEVELS: MONITORING" 
                    : "Take a moment if you need it"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className={`w-full justify-start gap-0 p-0 h-auto ${
            theme === "cyber" ? "bg-muted/50 border border-primary/20" : "bg-muted"
          }`}>
            <TabsTrigger 
              value="overview"
              className={`flex items-center gap-2 px-6 py-3 text-sm rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${
                theme === "cyber" ? "cyber-mono uppercase" : "font-medium"
              }`}
            >
              {theme === "cyber" ? <Zap className="w-4 h-4" /> : <Target className="w-4 h-4" />}
              {theme === "cyber" ? "OVERVIEW" : "Overview"}
            </TabsTrigger>
            <TabsTrigger 
              value="requirements"
              className={`flex items-center gap-2 px-6 py-3 text-sm rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${
                theme === "cyber" ? "cyber-mono uppercase" : "font-medium"
              }`}
            >
              <Code className="w-4 h-4" />
              {theme === "cyber" ? "REQUIREMENTS" : "Requirements"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Skills Analysis with motivational badges */}
            <ThemedCard variant="default">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`flex items-center gap-2 text-lg font-semibold ${
                  theme === "cyber" ? "text-primary cyber-mono uppercase" : ""
                }`}>
                  <Code className={`w-5 h-5 ${theme === "cyber" ? "text-primary" : "text-primary"}`} />
                  {theme === "cyber" ? "SKILL_ANALYSIS" : "Skills Analysis"}
                </h3>
                <span className={`text-lg font-bold ${theme === "cyber" ? "text-primary cyber-text-glow cyber-mono" : "text-primary"}`}>
                  {mockSkillsAnalysis.matchCount}/{mockSkillsAnalysis.totalCount} {theme === "cyber" ? "MATCHED" : "skills"}
                </span>
              </div>
              
              <p className={`text-xs mb-3 ${theme === "cyber" ? "cyber-mono text-muted-foreground uppercase" : "text-muted-foreground uppercase tracking-wider"}`}>
                {theme === "cyber" ? "[REQUIRED_SKILLS]" : "Required"}
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
              
              {/* Encouragement based on skill match */}
              {mockSkillsAnalysis.matchCount >= mockSkillsAnalysis.totalCount * 0.6 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <MotivationalMessage 
                    matchPercentage={job.matchPercentage}
                    variant="inline"
                  />
                </div>
              )}
            </ThemedCard>
            
            {/* AI Summary */}
            <ThemedCard variant="highlight">
              <h3 className={`flex items-center gap-2 text-lg font-semibold mb-4 ${
                theme === "cyber" ? "text-primary cyber-mono uppercase" : ""
              }`}>
                {theme === "cyber" ? <Brain className="w-5 h-5 text-primary" /> : <Sparkles className="w-5 h-5 text-primary" />}
                {theme === "cyber" ? "AI_ANALYSIS" : theme === "zen" ? "Insights" : "Chronicle Analysis"}
              </h3>
              
              <p className={`leading-relaxed mb-6 ${
                theme === "newspaper" ? "newspaper-drop-cap font-serif" : theme === "cyber" ? "cyber-mono text-sm" : ""
              }`}>
                {mockCompany.whatTheyDo}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <ThemedCard variant="default" className="p-4">
                  <p className={`text-xs mb-2 flex items-center gap-2 ${
                    theme === "cyber" ? "cyber-mono text-primary uppercase" : "text-primary uppercase tracking-wider"
                  }`}>
                    <Target className="w-4 h-4" />
                    {theme === "cyber" ? "KEY_FOCUS" : "Key Focus"}
                  </p>
                  <p className={theme === "cyber" ? "cyber-mono text-sm" : ""}>{mockCompany.keyFocus}</p>
                </ThemedCard>
                <ThemedCard variant="default" className="p-4">
                  <p className={`text-xs mb-2 flex items-center gap-2 ${
                    theme === "cyber" ? "cyber-mono text-primary uppercase" : "text-primary uppercase tracking-wider"
                  }`}>
                    <Building2 className="w-4 h-4" />
                    {theme === "cyber" ? "TEAM_STYLE" : "Team Style"}
                  </p>
                  <p className={theme === "cyber" ? "cyber-mono text-sm" : ""}>{mockCompany.teamStyle}</p>
                </ThemedCard>
              </div>
            </ThemedCard>
          </TabsContent>
          
          <TabsContent value="requirements" className="space-y-6">
            <ThemedCard variant="default">
              <h3 className={`text-lg font-semibold mb-4 ${theme === "cyber" ? "text-primary cyber-mono uppercase" : ""}`}>
                {theme === "cyber" ? "POSITION_REQUIREMENTS" : "Position Requirements"}
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
                    <span className={theme === "cyber" ? "text-primary" : "text-primary"}>
                      {theme === "cyber" ? ">" : "•"}
                    </span>
                    <span className={theme === "cyber" ? "cyber-mono text-sm" : ""}>{req}</span>
                  </li>
                ))}
              </ul>
            </ThemedCard>
            
            {/* Encouragement after requirements */}
            <MotivationalMessage 
              matchPercentage={job.matchPercentage}
              variant="banner"
            />
          </TabsContent>
        </Tabs>
        
        {/* Calming section for zen theme or when match is lower */}
        {(theme === "zen" || job.matchPercentage < 60) && (
          <div className="mt-8">
            <ThemedCard className="text-center p-8">
              <h3 className={`text-xl font-semibold mb-4 ${theme === "cyber" ? "cyber-mono uppercase text-primary" : ""}`}>
                {theme === "cyber" ? "WELLNESS_MODULE" : theme === "newspaper" ? "A Moment of Reflection" : "Take a Peaceful Moment"}
              </h3>
              <BreathingExercise />
            </ThemedCard>
          </div>
        )}
        
        {/* Footer decoration */}
        <div className="mt-12 text-center">
          {theme === "newspaper" && <div className="newspaper-rule-ornate mb-4" />}
          {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4" />}
          <p className={`text-xs ${theme === "cyber" ? "cyber-mono text-primary uppercase" : "text-muted-foreground uppercase tracking-widest"}`}>
            {theme === "cyber" ? "— END_OF_LISTING —" : "— End of Position Listing —"}
          </p>
        </div>
      </main>
      
      <ThemedFooter />
    </ThemedLayout>
  );
};

export default JobDetail;
