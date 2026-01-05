import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedMasthead from "@/components/ThemedMasthead";
import ThemedSection from "@/components/ThemedSection";
import ThemedCard from "@/components/ThemedCard";
import ThemedFooter from "@/components/ThemedFooter";
import CVUploadCard from "@/components/CVUploadCard";
import JobPostingCard from "@/components/JobPostingCard";
import CompanyResearchCard from "@/components/CompanyResearchCard";
import { FileText, Target, Building2, Sparkles, ArrowRight, Brain, Cpu, Leaf, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";

const Index = () => {
  const { theme } = useTheme();

  const features = {
    newspaper: [
      {
        icon: FileText,
        title: "Resume Review",
        description: "Our expert analysis examines every line of your curriculum vitae, identifying strengths and areas for improvement.",
        number: "I",
      },
      {
        icon: Target,
        title: "Job Matching",
        description: "Advanced algorithms match your skills and experience to job postings with remarkable precision.",
        number: "II",
      },
      {
        icon: Building2,
        title: "Company Intel",
        description: "Before any interview, arm yourself with comprehensive company research and insider knowledge.",
        number: "III",
      },
    ],
    zen: [
      {
        icon: Heart,
        title: "Mindful Analysis",
        description: "Your resume, thoughtfully reviewed with care and attention to help you present your authentic self.",
        number: "1",
      },
      {
        icon: Leaf,
        title: "Peaceful Matching",
        description: "Find opportunities that align with your values and bring balance to your professional life.",
        number: "2",
      },
      {
        icon: Sparkles,
        title: "Gentle Preparation",
        description: "Prepare for interviews with calm confidence, knowing you have all the insights you need.",
        number: "3",
      },
    ],
    cyber: [
      {
        icon: Brain,
        title: "Neural Resume Scan",
        description: "AI-powered deep learning algorithms analyze your resume against 10M+ job postings in milliseconds.",
        number: "01",
      },
      {
        icon: Cpu,
        title: "Quantum Matching",
        description: "Precision job matching using advanced ML models with 99.7% accuracy on skill alignment.",
        number: "02",
      },
      {
        icon: Zap,
        title: "Intel Synthesis",
        description: "Real-time company data aggregation from 500+ sources, processed and delivered instantly.",
        number: "03",
      },
    ],
  };

  const currentFeatures = features[theme];

  return (
    <ThemedLayout>
      {/* Masthead */}
      <ThemedMasthead />

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          {theme === "newspaper" && (
            <div className="inline-block mb-4">
              <span className="stamp animate-stamp">Breaking News</span>
            </div>
          )}
          {theme === "zen" && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm mb-4">
              <Heart className="w-4 h-4" />
              Begin your peaceful journey
            </div>
          )}
          {theme === "cyber" && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-sm mb-4 cyber-mono">
              <Zap className="w-4 h-4" />
              INITIALIZING CAREER PROTOCOL...
            </div>
          )}
          
          <h2 className={`headline-primary mb-4 ${theme === "cyber" ? "cyber-text-glow" : ""}`}>
            {theme === "newspaper" && "Your Dream Job Awaits"}
            {theme === "zen" && "Find Your Perfect Path"}
            {theme === "cyber" && "OPTIMIZE YOUR CAREER"}
          </h2>
          
          <p className={`text-xl max-w-2xl mx-auto ${theme === "newspaper" ? "text-subheadline font-serif italic" : theme === "cyber" ? "text-muted-foreground cyber-mono" : "text-muted-foreground"}`}>
            {theme === "newspaper" && "An extraordinary new tool has emerged to revolutionize the way professionals prepare for their next career opportunity."}
            {theme === "zen" && "Take a breath. Let go of stress. We are here to guide you gently toward opportunities that resonate with your spirit."}
            {theme === "cyber" && "> Deploying advanced neural networks to maximize your career potential. Stand by for optimization."}
          </p>
        </div>

        {/* Feature columns */}
        {theme === "newspaper" && <div className="newspaper-rule-double mb-8" />}
        {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8" />}
        
        <div className={`grid md:grid-cols-3 gap-6 ${theme === "newspaper" ? "border-y border-rule-dark py-6" : ""}`}>
          {currentFeatures.map((feature, index) => (
            <ThemedCard 
              key={feature.number} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className={`text-3xl font-bold ${theme === "cyber" ? "text-primary cyber-text-glow cyber-mono" : theme === "zen" ? "text-primary" : "text-stamp-red font-display"}`}>
                  {feature.number}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <feature.icon className={`w-5 h-5 ${theme === "cyber" ? "text-primary" : theme === "zen" ? "text-primary" : "text-headline"}`} />
                    <h3 className={`font-semibold ${theme === "cyber" ? "cyber-mono uppercase text-primary" : ""}`}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className={`text-sm ${theme === "cyber" ? "text-muted-foreground cyber-mono" : "text-muted-foreground"}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </ThemedCard>
          ))}
        </div>
      </section>

      {/* Main Action Cards */}
      <ThemedSection 
        title={theme === "cyber" ? "TOOLKIT.exe" : theme === "zen" ? "Your Tools" : "The Daily Toolkit"} 
        subtitle={theme === "cyber" ? "Select module to initialize" : theme === "zen" ? "Choose your next step with intention" : "Everything you need for your job search"}
        badge={theme === "newspaper" ? "Extra!" : theme === "cyber" ? "MODULES" : "Ready"}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="animate-fade-in delay-100">
              <CVUploadCard />
            </div>
            <div className="animate-fade-in delay-200">
              <JobPostingCard />
            </div>
            <div className="animate-fade-in delay-300">
              <CompanyResearchCard />
            </div>
          </div>
        </div>
      </ThemedSection>

      {/* Recent Jobs Preview */}
      <section className="container max-w-6xl mx-auto px-4 py-12">
        {theme === "newspaper" && <div className="newspaper-rule-ornate mb-8" />}
        {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8" />}
        
        <div className="flex items-center justify-between mb-6">
          <div>
            {theme === "newspaper" && <span className="stamp">Latest</span>}
            {theme === "cyber" && <span className="cyber-mono text-xs text-primary uppercase">[RECENT_JOBS]</span>}
            <h2 className={`mt-2 ${theme === "cyber" ? "text-2xl font-bold text-primary cyber-text-glow cyber-mono uppercase" : "headline-secondary"}`}>
              {theme === "newspaper" ? "From The Classifieds" : theme === "zen" ? "Recent Opportunities" : "JOB_LISTINGS.db"}
            </h2>
          </div>
          <Link to="/jobs">
            <Button variant={theme === "cyber" ? "default" : "outline"} className={theme === "cyber" ? "cyber-mono uppercase" : ""}>
              {theme === "cyber" ? "ACCESS ALL" : "View All"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {mockJobs.slice(0, 2).map((job) => (
            <Link key={job.id} to={`/jobs/${job.id}`} className="group">
              <ThemedCard className="hover:scale-[1.02] transition-transform">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    theme === "cyber" 
                      ? "bg-primary/20 border border-primary/50 text-primary" 
                      : theme === "zen" 
                        ? "bg-primary/10 rounded-full text-primary"
                        : "bg-stamp-red text-primary-foreground"
                  }`}>
                    {job.companyInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold truncate group-hover:text-primary transition-colors ${theme === "cyber" ? "cyber-mono uppercase text-sm" : ""}`}>
                      {job.title}
                    </h3>
                    <p className={`text-sm ${theme === "cyber" ? "text-primary cyber-mono" : "text-primary"}`}>{job.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">{job.location} • {job.type}</p>
                  </div>
                  <span className={`text-lg font-bold ${theme === "cyber" ? "text-primary cyber-text-glow cyber-mono" : "text-primary"}`}>
                    {job.matchPercentage}%
                  </span>
                </div>
              </ThemedCard>
            </Link>
          ))}
        </div>
      </section>

      <ThemedFooter />
    </ThemedLayout>
  );
};

export default Index;
