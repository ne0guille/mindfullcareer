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

// Newspaper components
import BreakingNewsTicker from "@/components/newspaper/BreakingNewsTicker";
import WeatherWidget from "@/components/newspaper/WeatherWidget";
import EditionInfo from "@/components/newspaper/EditionInfo";
import ClassifiedAd from "@/components/newspaper/ClassifiedAd";
import NewspaperArticle from "@/components/newspaper/NewspaperArticle";
import PullQuote from "@/components/newspaper/PullQuote";
import AdvertisementBox from "@/components/newspaper/AdvertisementBox";
import ContinuedMarker from "@/components/newspaper/ContinuedMarker";

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

  // Newspaper-specific layout
  if (theme === "newspaper") {
    return (
      <ThemedLayout>
        <ThemedMasthead />
        <BreakingNewsTicker />
        
        <main className="container max-w-6xl mx-auto px-4 py-8">
          {/* Main headline section */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left column - Edition info */}
            <aside className="col-span-12 md:col-span-3 space-y-4 order-2 md:order-1">
              <EditionInfo />
              <WeatherWidget />
              
              <AdvertisementBox 
                title="CV Analysis"
                description="Let our experts review your resume today!"
                link="/jobs"
                linkText="Get Started"
                variant="vintage"
              />
              
              {/* Quick classified listings */}
              <div className="border border-rule-dark p-3 bg-card">
                <h4 className="font-display font-bold text-sm uppercase tracking-wider text-center border-b border-rule-dark pb-2 mb-3">
                  Quick Positions
                </h4>
                {mockJobs.slice(0, 3).map((job) => (
                  <ClassifiedAd key={job.id} job={job} size="small" />
                ))}
                <ContinuedMarker to="/jobs" page="Classifieds" className="mt-3 block text-center" />
              </div>
            </aside>
            
            {/* Center column - Main content */}
            <div className="col-span-12 md:col-span-6 order-1 md:order-2">
              <NewspaperArticle
                headline="Revolutionary Tools Transform the Art of Job Seeking"
                subheadline="New methods promise to revolutionize how professionals find their next opportunity"
                byline="Career Correspondent"
                featured
              >
                <p className="newspaper-drop-cap mb-4">
                  In an age where opportunities abound yet competition grows ever fiercer, 
                  a new approach to the job hunt has emerged from the offices of The Career Chronicle.
                  This innovative system promises to transform the weary job seeker into a 
                  prepared, confident candidate.
                </p>
                
                <p className="mb-4">
                  The method consists of three primary pillars: thorough resume analysis, 
                  intelligent job matching, and comprehensive company research. Together, 
                  these tools form an arsenal that would make even the most seasoned 
                  career counselor envious.
                </p>
                
                <PullQuote 
                  quote="This is the future of job hunting — methodical, intelligent, and remarkably effective."
                  attribution="A Satisfied Subscriber"
                />
                
                <p className="mb-4">
                  Subscribers to our service have reported remarkable success rates, 
                  with many securing interviews within days of utilizing our comprehensive 
                  toolkit. The secret, they say, lies in the preparation.
                </p>
              </NewspaperArticle>
              
              {/* Tools section styled as classified ads */}
              <div className="mt-8 pt-6 border-t-4 border-double border-headline">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-rule-dark" />
                  <h2 className="font-display text-2xl font-black uppercase tracking-wide text-center">
                    The Daily Toolkit
                  </h2>
                  <div className="h-px flex-1 bg-rule-dark" />
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <CVUploadCard />
                  <JobPostingCard />
                  <CompanyResearchCard />
                </div>
              </div>
            </div>
            
            {/* Right column - Featured jobs */}
            <aside className="col-span-12 md:col-span-3 order-3">
              <div className="border-4 border-double border-headline p-4 bg-card mb-4">
                <div className="text-center mb-4">
                  <span className="stamp">Featured</span>
                  <h3 className="font-display text-xl font-black uppercase mt-2">
                    Top Positions
                  </h3>
                  <p className="font-typewriter text-xs text-ink-faded mt-1">
                    This Week's Best Opportunities
                  </p>
                </div>
                
                <div className="space-y-4">
                  {mockJobs.slice(0, 2).map((job, index) => (
                    <ClassifiedAd 
                      key={job.id} 
                      job={job} 
                      featured={index === 0}
                    />
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-rule-dark text-center">
                  <Link to="/jobs">
                    <Button variant="outline" className="w-full font-typewriter uppercase tracking-wider">
                      View All Classifieds
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <AdvertisementBox 
                title="Company Research"
                description="Know thy employer before the interview!"
                link="/company/felix-pago"
                linkText="Investigate Now"
                variant="bold"
              />
              
              {/* Features list in old style */}
              <div className="mt-4 border border-rule-dark p-4 bg-paper-aged">
                <h4 className="font-display font-bold text-center uppercase tracking-wider border-b border-rule-dark pb-2 mb-3">
                  Why Choose Us?
                </h4>
                <ul className="space-y-2 text-sm font-serif">
                  {currentFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="font-display font-bold text-stamp-red">{feature.number}.</span>
                      <div>
                        <span className="font-semibold">{feature.title}</span>
                        <p className="text-xs text-ink-faded italic mt-0.5">
                          {feature.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </main>
        
        <ThemedFooter />
      </ThemedLayout>
    );
  }

  // Default layout for other themes (zen, cyber)
  return (
    <ThemedLayout>
      {/* Masthead */}
      <ThemedMasthead />

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
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
            {theme === "zen" ? "Find Your Perfect Path" : "OPTIMIZE YOUR CAREER"}
          </h2>
          
          <p className={`text-xl max-w-2xl mx-auto ${theme === "cyber" ? "text-muted-foreground cyber-mono" : "text-muted-foreground"}`}>
            {theme === "zen" && "Take a breath. Let go of stress. We are here to guide you gently toward opportunities that resonate with your spirit."}
            {theme === "cyber" && "> Deploying advanced neural networks to maximize your career potential. Stand by for optimization."}
          </p>
        </div>

        {/* Feature columns */}
        {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8" />}
        
        <div className="grid md:grid-cols-3 gap-6">
          {currentFeatures.map((feature, index) => (
            <ThemedCard 
              key={feature.number} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className={`text-3xl font-bold ${theme === "cyber" ? "text-primary cyber-text-glow cyber-mono" : "text-primary"}`}>
                  {feature.number}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <feature.icon className={`w-5 h-5 ${theme === "cyber" ? "text-primary" : "text-primary"}`} />
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
        title={theme === "cyber" ? "TOOLKIT.exe" : "Your Tools"} 
        subtitle={theme === "cyber" ? "Select module to initialize" : "Choose your next step with intention"}
        badge={theme === "cyber" ? "MODULES" : "Ready"}
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
        {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8" />}
        
        <div className="flex items-center justify-between mb-6">
          <div>
            {theme === "cyber" && <span className="cyber-mono text-xs text-primary uppercase">[RECENT_JOBS]</span>}
            <h2 className={`mt-2 ${theme === "cyber" ? "text-2xl font-bold text-primary cyber-text-glow cyber-mono uppercase" : "headline-secondary"}`}>
              {theme === "zen" ? "Recent Opportunities" : "JOB_LISTINGS.db"}
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
                      : "bg-primary/10 rounded-full text-primary"
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
