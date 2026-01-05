import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, RefreshCw, Copy, Heart, Users, Trophy, Target, Sparkles, Brain, Database, Shield, Lightbulb, BookOpen, Star } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedCard from "@/components/ThemedCard";
import ThemedBadge from "@/components/ThemedBadge";
import ThemedFooter from "@/components/ThemedFooter";
import ZenContainer from "@/components/zen/ZenContainer";
import MindfulCard from "@/components/zen/MindfulCard";
import AffirmationBanner from "@/components/zen/AffirmationBanner";
import ProgressJourney from "@/components/zen/ProgressJourney";
import InsightCard from "@/components/zen/InsightCard";
import GentleButton from "@/components/zen/GentleButton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCompany } from "@/data/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CompanyResearch = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const company = mockCompany;

  const handleCopyNotes = () => {
    const notes = `
${company.name} - Company Research
=====================================
Industry: ${company.industry} • ${company.type}
Size: ${company.size}

What They Do:
${company.whatTheyDo}

Problem Solved:
${company.problemSolved}

Value Proposition:
${company.valueProposition}

Target Customers:
${company.targetCustomers.join(", ")}

Core Values:
${company.coreValues.join(", ")}

Interview Tips:
${company.interviewTips.map(tip => `• ${tip}`).join("\n")}
    `;
    navigator.clipboard.writeText(notes);
    toast.success(theme === "cyber" ? "Data copied to clipboard" : theme === "zen" ? "Notes saved to clipboard ✨" : "Notes copied!");
  };

  // ZEN THEME - Complete Redesign
  if (theme === "zen") {
    const researchSteps = [
      { label: "Company Overview", description: "Understand their mission", completed: true },
      { label: "Culture & Values", description: "Find your alignment", completed: true },
      { label: "Team Insights", description: "Know your future colleagues", completed: true },
      { label: "Interview Prep", description: "Feel confident", completed: false, current: true },
    ];

    return (
      <ThemedLayout>
        <ZenContainer className="pb-20">
          <main className="container max-w-5xl mx-auto px-4 py-8">
            {/* Gentle back link */}
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-sm mb-8 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Return home
            </Link>

            {/* Affirmation Banner */}
            <AffirmationBanner className="mb-10" />

            {/* Company Header - Calm & Centered */}
            <motion.header 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl font-light text-foreground mb-2">
                {company.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                "{company.tagline}"
              </p>
              <a 
                href={`https://${company.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                {company.website}
                <ExternalLink className="w-4 h-4" />
              </a>
              
              {/* Progress indicator */}
              <div className="mt-8 max-w-xs mx-auto">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-sm text-primary font-medium">{company.completionPercentage}% explored</span>
                </div>
                <div className="h-2 rounded-full bg-primary/20 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${company.completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </motion.header>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sidebar - Your Journey */}
              <div className="lg:col-span-1 space-y-6">
                <MindfulCard 
                  title="Your Research Journey" 
                  icon={<BookOpen className="w-5 h-5" />}
                  glowOnHover={false}
                >
                  <ProgressJourney steps={researchSteps} />
                  
                  <div className="mt-6 pt-6 border-t border-primary/10">
                    <GentleButton 
                      variant="secondary" 
                      className="w-full"
                      onClick={handleCopyNotes}
                      icon={<Copy className="w-4 h-4" />}
                    >
                      Save notes
                    </GentleButton>
                  </div>
                </MindfulCard>

                {/* Quick Actions */}
                <MindfulCard glowOnHover={false} delay={0.2}>
                  <p className="text-sm text-muted-foreground mb-4">Ready for the next step?</p>
                  <div className="space-y-2">
                    <Link to="/jobs/1/cover-letter">
                      <GentleButton variant="primary" className="w-full" icon={<Sparkles className="w-4 h-4" />}>
                        Write cover letter
                      </GentleButton>
                    </Link>
                    <GentleButton variant="ghost" className="w-full" icon={<RefreshCw className="w-4 h-4" />}>
                      Refresh research
                    </GentleButton>
                  </div>
                </MindfulCard>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* What They Do */}
                <MindfulCard 
                  title="Understanding Their Purpose" 
                  subtitle="What drives this company"
                  icon={<Target className="w-5 h-5" />}
                  delay={0.1}
                >
                  <p className="text-foreground/90 leading-relaxed mb-6">
                    {company.whatTheyDo}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InsightCard
                      title="Problem They Solve"
                      content={company.problemSolved}
                      icon={<Lightbulb className="w-5 h-5" />}
                      delay={0.2}
                    />
                    <InsightCard
                      title="Their Promise"
                      content={company.valueProposition}
                      icon={<Star className="w-5 h-5" />}
                      delay={0.3}
                    />
                  </div>
                </MindfulCard>

                {/* Core Values */}
                <MindfulCard 
                  title="Values That Guide Them" 
                  subtitle="See if they resonate with you"
                  icon={<Heart className="w-5 h-5" />}
                  delay={0.2}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {company.coreValues.map((value, index) => (
                      <motion.div
                        key={value}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center"
                      >
                        <p className="font-medium text-foreground">{value}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent">
                    <p className="text-sm text-muted-foreground italic text-center">
                      "Reflect on which of these values align with your own journey"
                    </p>
                  </div>
                </MindfulCard>

                {/* Team Culture */}
                <MindfulCard 
                  title="The People & Culture" 
                  subtitle="Who you'll be working with"
                  icon={<Users className="w-5 h-5" />}
                  delay={0.3}
                >
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-muted/50">
                      <p className="text-xs text-primary uppercase tracking-wider mb-1">Key Focus</p>
                      <p className="text-foreground">{company.keyFocus}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/50">
                      <p className="text-xs text-primary uppercase tracking-wider mb-1">Team Style</p>
                      <p className="text-foreground">{company.teamStyle}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Who they serve</p>
                    <div className="flex flex-wrap gap-2">
                      {company.targetCustomers.map((customer) => (
                        <span 
                          key={customer}
                          className="px-4 py-2 rounded-full bg-primary/10 text-sm text-foreground"
                        >
                          {customer}
                        </span>
                      ))}
                    </div>
                  </div>
                </MindfulCard>

                {/* Interview Prep */}
                <MindfulCard 
                  title="Prepare with Confidence" 
                  subtitle="Insights to help you shine"
                  icon={<Sparkles className="w-5 h-5" />}
                  delay={0.4}
                >
                  <p className="text-muted-foreground mb-6">
                    These gentle reminders will help you feel prepared and centered.
                  </p>
                  
                  <div className="space-y-4">
                    {company.interviewTips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary"
                      >
                        <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-foreground pt-1">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </MindfulCard>

                {/* Recent News */}
                <MindfulCard 
                  title="Recent Developments" 
                  subtitle="Stay informed"
                  icon={<Trophy className="w-5 h-5" />}
                  delay={0.5}
                >
                  <div className="space-y-4">
                    {company.recentNews.map((news, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <p className="text-foreground">{news}</p>
                      </motion.div>
                    ))}
                  </div>
                </MindfulCard>
              </div>
            </div>

            {/* Footer message */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 text-center"
            >
              <p className="text-muted-foreground italic">
                "Knowledge brings confidence. You're more prepared than you know."
              </p>
            </motion.div>
          </main>
        </ZenContainer>
        <ThemedFooter />
      </ThemedLayout>
    );
  }

  // Original layout for Newspaper and Cyber themes
  return (
    <ThemedLayout>
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link 
          to="/" 
          className={`inline-flex items-center gap-2 text-sm mb-6 transition-colors ${
            theme === "cyber" 
              ? "text-primary cyber-mono uppercase hover:text-primary/80" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {theme === "cyber" ? "< BACK_TO_HQ" : "Back to Home"}
        </Link>
        
        {/* Company Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Company icon */}
              <div className={`w-16 h-16 flex items-center justify-center ${
                theme === "cyber" 
                  ? "bg-primary/20 border border-primary/50 cyber-glow" 
                  : "bg-paper-aged border-2 border-rule-dark"
              }`}>
                {theme === "cyber" 
                  ? <Database className="w-8 h-8 text-primary" />
                  : <Target className="w-8 h-8 text-headline" />
                }
              </div>
              
              <div>
                <h1 className={`mb-1 ${
                  theme === "cyber" 
                    ? "text-3xl font-bold text-primary cyber-text-glow cyber-mono uppercase" 
                    : "headline-primary text-3xl"
                }`}>
                  {company.name}
                </h1>
                <a 
                  href={`https://${company.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 hover:underline ${
                    theme === "cyber" ? "text-primary cyber-mono" : "text-primary"
                  }`}
                >
                  {company.website}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <ThemedBadge variant="success">
                  {theme === "cyber" ? "RESEARCHED" : "Researched"}
                </ThemedBadge>
                <p className="text-xs text-muted-foreground mt-1">{company.researchedAt}</p>
              </div>
              <Button variant="outline" size="sm" className={theme === "cyber" ? "cyber-mono uppercase" : ""}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {theme === "cyber" ? "REFRESH" : "Refresh"}
              </Button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${
                theme === "cyber" ? "text-primary cyber-mono" : "text-green-600"
              }`}>
                {company.completionPercentage}% {theme === "cyber" ? "COMPLETE" : "Complete"}
              </span>
              <div className={`w-32 h-2 overflow-hidden bg-muted`}>
                <div 
                  className={`h-full transition-all ${
                    theme === "cyber" ? "bg-primary cyber-glow" : "bg-green-500"
                  }`}
                  style={{ width: `${company.completionPercentage}%` }}
                />
              </div>
            </div>
            
            <div className="ml-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyNotes}
                className={theme === "cyber" ? "cyber-mono uppercase" : ""}
              >
                <Copy className="w-4 h-4 mr-2" />
                {theme === "cyber" ? "COPY_DATA" : "Copy All Notes"}
              </Button>
            </div>
          </div>
          
          {theme === "newspaper" && <div className="newspaper-rule-double mt-6" />}
          {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-6" />}
        </header>
        
        {/* Tabs */}
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className={`w-full justify-start gap-0 p-0 h-auto flex-wrap ${
            theme === "cyber" ? "bg-muted/50 border border-primary/20" : "bg-muted"
          }`}>
            <TabsTrigger 
              value="interview"
              className={`flex items-center gap-2 px-4 py-3 text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${
                theme === "cyber" ? "cyber-mono uppercase" : ""
              }`}
            >
              {theme === "cyber" ? <Brain className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              {theme === "cyber" ? "INTERVIEW" : "Interview Prep"}
            </TabsTrigger>
            <TabsTrigger 
              value="company"
              className={`flex items-center gap-2 px-4 py-3 text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${
                theme === "cyber" ? "cyber-mono uppercase" : ""
              }`}
            >
              <Target className="w-4 h-4" />
              {theme === "cyber" ? "COMPANY" : "Company"}
            </TabsTrigger>
            <TabsTrigger 
              value="team"
              className={`flex items-center gap-2 px-4 py-3 text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${
                theme === "cyber" ? "cyber-mono uppercase" : ""
              }`}
            >
              <Users className="w-4 h-4" />
              {theme === "cyber" ? "TEAM" : "Team"}
            </TabsTrigger>
            <TabsTrigger 
              value="news"
              className={`flex items-center gap-2 px-4 py-3 text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${
                theme === "cyber" ? "cyber-mono uppercase" : ""
              }`}
            >
              <Trophy className="w-4 h-4" />
              {theme === "cyber" ? "NEWS" : "News"}
            </TabsTrigger>
          </TabsList>
          
          {/* Interview Prep Tab */}
          <TabsContent value="interview" className="space-y-6">
            <ThemedCard variant="highlight">
              <h3 className={`flex items-center gap-2 text-lg font-semibold mb-4 ${
                theme === "cyber" ? "text-primary cyber-mono uppercase" : ""
              }`}>
                {theme === "cyber" ? <Brain className="w-5 h-5 text-primary" /> : <Sparkles className="w-5 h-5 text-primary" />}
                {theme === "cyber" ? "INTERVIEW_PROTOCOL" : "Interview Preparation Guide"}
              </h3>
              
              <p className={`mb-6 ${theme === "cyber" ? "cyber-mono text-sm text-muted-foreground" : "text-muted-foreground italic"}`}>
                {theme === "cyber" 
                  ? "> Compiled preparation data for optimal interview performance."
                  : "Essential tips to help you feel confident and prepared."
                }
              </p>
              
              <div className="space-y-3">
                {company.interviewTips.map((tip, index) => (
                  <div key={index} className={`flex items-start gap-4 p-4 ${
                    theme === "cyber" 
                      ? "bg-primary/5 border-l-2 border-primary" 
                      : "bg-paper-aged border-l-4 border-primary"
                  }`}>
                    <span className={`text-2xl font-bold ${
                      theme === "cyber" ? "text-primary cyber-mono" : "text-primary font-display"
                    }`}>
                      {theme === "cyber" ? `0${index + 1}` : index + 1}
                    </span>
                    <p className={theme === "cyber" ? "cyber-mono text-sm pt-1" : "pt-1"}>{tip}</p>
                  </div>
                ))}
              </div>
            </ThemedCard>
          </TabsContent>
          
          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <ThemedCard variant="default">
              <div className="flex items-center gap-3 mb-4">
                <Target className={`w-6 h-6 ${theme === "cyber" ? "text-primary" : "text-headline"}`} />
                <div>
                  <h3 className={`text-lg font-semibold ${theme === "cyber" ? "text-primary cyber-mono uppercase" : ""}`}>
                    {company.name}
                  </h3>
                  <p className={`text-sm ${theme === "cyber" ? "cyber-mono text-muted-foreground" : "text-muted-foreground"}`}>
                    {company.industry} • {company.type} • "{company.tagline}"
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Users className="w-4 h-4" />
                <span className={theme === "cyber" ? "cyber-mono uppercase text-xs" : "uppercase tracking-wider text-xs"}>
                  {theme === "cyber" ? "SIZE:" : "Size:"}
                </span>
                <span>{company.size}</span>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: theme === "cyber" ? "MISSION" : "What They Do", content: company.whatTheyDo },
                  { label: theme === "cyber" ? "PROBLEM_SOLVED" : "Problem Solved", content: company.problemSolved },
                  { label: theme === "cyber" ? "VALUE_PROP" : "Value Proposition", content: company.valueProposition },
                ].map((section) => (
                  <div key={section.label}>
                    <h4 className={`font-semibold mb-2 ${
                      theme === "cyber" ? "text-primary cyber-mono uppercase text-sm" : "text-primary"
                    }`}>
                      {section.label}
                    </h4>
                    <p className={theme === "cyber" ? "cyber-mono text-sm" : ""}>{section.content}</p>
                  </div>
                ))}
                
                <div>
                  <h4 className={`font-semibold mb-2 ${
                    theme === "cyber" ? "text-primary cyber-mono uppercase text-sm" : "text-primary"
                  }`}>
                    {theme === "cyber" ? "TARGET_CUSTOMERS" : "Target Customers"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {company.targetCustomers.map((customer) => (
                      <ThemedBadge key={customer}>{customer}</ThemedBadge>
                    ))}
                  </div>
                </div>
              </div>
            </ThemedCard>
            
            {/* Core Values */}
            <ThemedCard variant="highlight">
              <h3 className={`flex items-center gap-2 text-lg font-semibold mb-4 ${
                theme === "cyber" ? "text-primary cyber-mono uppercase" : ""
              }`}>
                {theme === "cyber" ? <Shield className="w-5 h-5 text-primary" /> : <Heart className="w-5 h-5 text-primary" />}
                {theme === "cyber" ? "CORE_VALUES" : "Core Values"}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {company.coreValues.map((value) => (
                  <ThemedCard 
                    key={value}
                    variant="default" 
                    className={`text-center p-4 ${theme === "cyber" ? "cyber-pulse" : ""}`}
                  >
                    <p className={`font-semibold ${theme === "cyber" ? "cyber-mono uppercase text-primary text-sm" : ""}`}>
                      {value}
                    </p>
                  </ThemedCard>
                ))}
              </div>
            </ThemedCard>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <ThemedCard variant="default">
              <h3 className={`flex items-center gap-2 text-lg font-semibold mb-4 ${
                theme === "cyber" ? "text-primary cyber-mono uppercase" : ""
              }`}>
                <Users className={`w-5 h-5 ${theme === "cyber" ? "text-primary" : "text-primary"}`} />
                {theme === "cyber" ? "TEAM_CULTURE" : "Team Culture"}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <ThemedCard variant="default" className="p-4">
                  <p className={`text-xs mb-2 flex items-center gap-2 ${
                    theme === "cyber" ? "cyber-mono text-primary uppercase" : "text-primary uppercase tracking-wider"
                  }`}>
                    <Target className="w-4 h-4" />
                    {theme === "cyber" ? "KEY_FOCUS" : "Key Focus"}
                  </p>
                  <p className={theme === "cyber" ? "cyber-mono text-sm" : ""}>{company.keyFocus}</p>
                </ThemedCard>
                <ThemedCard variant="default" className="p-4">
                  <p className={`text-xs mb-2 flex items-center gap-2 ${
                    theme === "cyber" ? "cyber-mono text-primary uppercase" : "text-primary uppercase tracking-wider"
                  }`}>
                    <Users className="w-4 h-4" />
                    {theme === "cyber" ? "TEAM_STYLE" : "Team Style"}
                  </p>
                  <p className={theme === "cyber" ? "cyber-mono text-sm" : ""}>{company.teamStyle}</p>
                </ThemedCard>
              </div>
            </ThemedCard>
          </TabsContent>
          
          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <ThemedCard variant="highlight">
              <h3 className={`flex items-center gap-2 text-lg font-semibold mb-4 ${
                theme === "cyber" ? "text-primary cyber-mono uppercase" : ""
              }`}>
                <Trophy className={`w-5 h-5 ${theme === "cyber" ? "text-primary" : "text-primary"}`} />
                {theme === "cyber" ? "RECENT_DATA" : "Recent Headlines"}
              </h3>
              
              <div className="space-y-4">
                {company.recentNews.map((news, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0 ${
                      theme === "cyber" ? "border-primary/20" : "border-border"
                    }`}
                  >
                    <span className={`text-3xl font-bold ${
                      theme === "cyber" ? "text-primary cyber-mono" : "text-primary font-display"
                    }`}>
                      {theme === "cyber" ? `0${index + 1}` : index + 1}
                    </span>
                    <div>
                      <p className={`font-semibold ${theme === "cyber" ? "cyber-mono uppercase text-sm" : ""}`}>
                        {news}
                      </p>
                      <ThemedBadge variant="info" className="mt-2">
                        {theme === "cyber" ? "RECENT" : "Breaking"}
                      </ThemedBadge>
                    </div>
                  </div>
                ))}
              </div>
            </ThemedCard>
          </TabsContent>
        </Tabs>
        
        {/* Footer decoration */}
        <div className="mt-12 text-center">
          {theme === "newspaper" && <div className="newspaper-rule-ornate mb-4" />}
          {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4" />}
          <p className={`text-xs ${theme === "cyber" ? "cyber-mono text-primary uppercase" : "text-muted-foreground uppercase tracking-widest"}`}>
            {theme === "cyber" ? "— END_OF_INTEL —" : "— End of Investigation Report —"}
          </p>
        </div>
      </main>
      <ThemedFooter />
    </ThemedLayout>
  );
};

export default CompanyResearch;
