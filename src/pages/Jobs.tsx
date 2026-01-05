import { useState } from "react";
import { Link } from "react-router-dom";
import { Grid3X3, List, RefreshCw, Filter, MapPin, Clock, Check, FileText } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedCard from "@/components/ThemedCard";
import ThemedBadge from "@/components/ThemedBadge";
import ThemedFooter from "@/components/ThemedFooter";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";

// Newspaper components
import BreakingNewsTicker from "@/components/newspaper/BreakingNewsTicker";
import ClassifiedAd from "@/components/newspaper/ClassifiedAd";
import EditionInfo from "@/components/newspaper/EditionInfo";
import AdvertisementBox from "@/components/newspaper/AdvertisementBox";

const Jobs = () => {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterCoverLetter, setFilterCoverLetter] = useState(false);

  const filteredJobs = filterCoverLetter 
    ? mockJobs.filter(job => job.hasCoverLetter)
    : mockJobs;

  // Newspaper-specific layout
  if (theme === "newspaper") {
    return (
      <ThemedLayout>
        <BreakingNewsTicker />
        
        <main className="container max-w-6xl mx-auto px-4 py-8">
          {/* Masthead for classifieds section */}
          <header className="text-center mb-8 pb-6 border-b-4 border-double border-headline">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px flex-1 bg-rule-dark" />
              <span className="stamp">Section B</span>
              <div className="h-px flex-1 bg-rule-dark" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-black tracking-tight text-headline uppercase">
              Employment Classifieds
            </h1>
            <p className="font-serif italic text-lg text-subheadline mt-2">
              "{mockJobs.length} Distinguished Positions Available This Edition"
            </p>
            <div className="flex justify-center gap-8 mt-4 text-xs font-typewriter uppercase tracking-widest text-ink-faded">
              <span>• Full-Time •</span>
              <span>• Remote •</span>
              <span>• On-Site •</span>
            </div>
          </header>
          
          {/* 3-column newspaper layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left sidebar */}
            <aside className="col-span-12 md:col-span-3 space-y-4">
              <EditionInfo />
              
              {/* Filter box */}
              <div className="border border-rule-dark p-3 bg-card">
                <h4 className="font-display font-bold text-sm uppercase tracking-wider text-center border-b border-rule-dark pb-2 mb-3">
                  Refine Search
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilterCoverLetter(!filterCoverLetter)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 border text-xs transition-all font-typewriter ${
                      filterCoverLetter 
                        ? "bg-stamp-red text-card border-stamp-red" 
                        : "border-rule-light hover:border-headline bg-paper-aged"
                    }`}
                  >
                    <Filter className="w-3 h-3" />
                    Has Cover Letter ({mockJobs.filter(j => j.hasCoverLetter).length})
                  </button>
                </div>
              </div>
              
              <AdvertisementBox 
                title="Resume Analysis"
                description="Have your CV reviewed by experts!"
                link="/"
                linkText="Submit Today"
                variant="vintage"
              />
            </aside>
            
            {/* Main content - classified ads */}
            <div className="col-span-12 md:col-span-6">
              {/* Featured position */}
              {filteredJobs.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl">★</span>
                    <h2 className="font-display text-xl font-black uppercase tracking-wider">
                      Featured Position
                    </h2>
                    <span className="text-2xl">★</span>
                  </div>
                  <ClassifiedAd job={filteredJobs[0]} featured />
                </div>
              )}
              
              {/* All positions in 2-column layout */}
              <div className="border-t-4 border-double border-headline pt-6">
                <h2 className="font-display text-xl font-black uppercase tracking-wider text-center mb-6">
                  All Available Positions
                </h2>
                
                <div className="newspaper-columns-2 space-y-4">
                  {filteredJobs.slice(1).map((job) => (
                    <div key={job.id} className="avoid-break mb-4">
                      <ClassifiedAd job={job} size="small" />
                    </div>
                  ))}
                </div>
              </div>
              
              {filteredJobs.length === 0 && (
                <div className="text-center py-16 border-4 border-double border-headline">
                  <h3 className="font-display text-2xl font-black text-headline mb-2">
                    No Listings Found
                  </h3>
                  <p className="font-serif italic text-ink-faded">
                    Check back in tomorrow's edition for new opportunities
                  </p>
                </div>
              )}
            </div>
            
            {/* Right sidebar - more ads */}
            <aside className="col-span-12 md:col-span-3 space-y-4">
              <AdvertisementBox 
                title="Company Intel"
                description="Know your employer before the interview!"
                link="/company/felix-pago"
                linkText="Investigate"
                variant="bold"
              />
              
              {/* Stats box */}
              <div className="border-4 border-double border-headline p-4 bg-card">
                <h4 className="font-display font-bold text-center uppercase tracking-wider mb-4">
                  Market Statistics
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-dashed border-rule-light pb-2">
                    <span className="font-typewriter text-xs uppercase text-ink-faded">Positions</span>
                    <span className="font-display font-black text-headline">{mockJobs.length}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-rule-light pb-2">
                    <span className="font-typewriter text-xs uppercase text-ink-faded">Remote</span>
                    <span className="font-display font-black text-headline">{mockJobs.filter(j => j.location.includes("Remote")).length}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-rule-light pb-2">
                    <span className="font-typewriter text-xs uppercase text-ink-faded">With Cover</span>
                    <span className="font-display font-black text-headline">{mockJobs.filter(j => j.hasCoverLetter).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-typewriter text-xs uppercase text-ink-faded">Avg Match</span>
                    <span className="font-display font-black text-stamp-red">
                      {Math.round(mockJobs.reduce((a, b) => a + b.matchPercentage, 0) / mockJobs.length)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Tips box */}
              <div className="border border-rule-dark p-4 bg-paper-aged">
                <h4 className="font-display font-bold text-center uppercase tracking-wider border-b border-rule-dark pb-2 mb-3">
                  Job Seeker Tips
                </h4>
                <ul className="space-y-2 text-xs font-serif">
                  <li className="flex items-start gap-2">
                    <span className="text-stamp-red font-bold">I.</span>
                    <span>Always tailor your cover letter to the position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stamp-red font-bold">II.</span>
                    <span>Research the company thoroughly before applying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stamp-red font-bold">III.</span>
                    <span>Follow up within one week of application</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
          
          {/* Footer decoration */}
          <div className="mt-12 text-center">
            <div className="newspaper-rule-ornate mb-4" />
            <p className="font-typewriter text-xs text-ink-faded uppercase tracking-[0.3em]">
              — End of Classifieds Section —
            </p>
            <p className="font-serif italic text-sm text-ink-faded mt-2">
              "New opportunities published daily. Subscribe for instant notifications."
            </p>
          </div>
        </main>
        
        <ThemedFooter />
      </ThemedLayout>
    );
  }

  // Default layout for other themes
  return (
    <ThemedLayout>
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {theme === "zen" && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm">
                    Opportunities await
                  </span>
                )}
                {theme === "cyber" && (
                  <span className="cyber-mono text-xs text-primary uppercase border border-primary/30 px-2 py-1 bg-primary/10">
                    [JOBS.db]
                  </span>
                )}
              </div>
              <h1 className={`mb-2 ${theme === "cyber" ? "text-4xl font-bold text-primary cyber-text-glow cyber-mono uppercase" : "headline-primary"}`}>
                {theme === "zen" ? "Career Opportunities" : "JOB_LISTINGS"}
              </h1>
              <p className={`${theme === "cyber" ? "text-muted-foreground cyber-mono" : "text-muted-foreground italic"}`}>
                {theme === "cyber" 
                  ? `> ${mockJobs.length} records found in database`
                  : `${mockJobs.length} positions available`
                }
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 border transition-all ${
                  viewMode === "grid" 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "border-border hover:border-primary"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 border transition-all ${
                  viewMode === "list" 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "border-border hover:border-primary"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <Button variant="outline" size="sm" className={`ml-2 ${theme === "cyber" ? "cyber-mono uppercase" : ""}`}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {theme === "cyber" ? "SYNC" : "Refresh"}
              </Button>
            </div>
          </div>
          
          {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-6" />}
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <span className={`text-sm ${theme === "cyber" ? "cyber-mono text-primary uppercase" : "text-muted-foreground uppercase tracking-wider"}`}>
            {theme === "cyber" ? "[FILTER]:" : "Filter:"}
          </span>
          <button
            onClick={() => setFilterCoverLetter(!filterCoverLetter)}
            className={`flex items-center gap-2 px-3 py-1.5 border text-sm transition-all ${
              filterCoverLetter 
                ? "bg-primary text-primary-foreground border-primary" 
                : "border-border hover:border-primary"
            } ${theme === "cyber" ? "cyber-mono uppercase" : ""}`}
          >
            <Filter className="w-4 h-4" />
            {theme === "cyber" ? "HAS_COVER" : "Has Cover Letter"} ({mockJobs.filter(j => j.hasCoverLetter).length})
          </button>
          
          <div className="ml-auto">
            <select className={`px-3 py-1.5 bg-card border border-border text-sm focus:outline-none focus:border-primary ${theme === "cyber" ? "cyber-mono uppercase" : ""}`}>
              <option>{theme === "cyber" ? "NEWEST" : "Newest First"}</option>
              <option>{theme === "cyber" ? "EXPIRING" : "Expiring Soon"}</option>
              <option>{theme === "cyber" ? "BEST_MATCH" : "Best Match"}</option>
            </select>
          </div>
        </div>
        
        {/* Jobs Grid */}
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredJobs.map((job, index) => (
            <div 
              key={job.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/jobs/${job.id}`}>
                <ThemedCard variant="highlight" className="h-full hover:scale-[1.02] transition-all group">
                  {/* Expiry badge */}
                  <div className="flex items-center justify-between mb-3">
                    <ThemedBadge>
                      {theme === "cyber" ? `EXP: ${job.expiresIn}` : `Expires in ${job.expiresIn}`}
                    </ThemedBadge>
                    {job.hasCoverLetter && (
                      <FileText className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  
                  {/* Job title */}
                  <h3 className={`font-semibold mb-2 group-hover:text-primary transition-colors ${theme === "cyber" ? "cyber-mono uppercase text-sm" : "text-lg"}`}>
                    {job.title}
                  </h3>
                  
                  {/* Company */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 flex items-center justify-center font-bold text-sm ${
                      theme === "cyber" 
                        ? "bg-primary/20 border border-primary/50 text-primary" 
                        : "bg-primary/10 rounded-full text-primary"
                    }`}>
                      {job.companyInitial}
                    </div>
                    <span className={`font-medium ${theme === "cyber" ? "text-primary cyber-mono" : "text-primary"}`}>
                      {job.company}
                    </span>
                    {job.isMatched && (
                      <span className="ml-auto">
                        <ThemedBadge variant="success">
                          <span className="flex items-center gap-1">
                            <Check className="w-3 h-3" /> {theme === "cyber" ? "MATCH" : "Match"}
                          </span>
                        </ThemedBadge>
                      </span>
                    )}
                  </div>
                  
                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.savedAt}
                    </span>
                  </div>
                  
                  {/* Level badge */}
                  <ThemedBadge className="mb-3">{job.level}</ThemedBadge>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.skills.slice(0, 4).map((skill) => (
                      <span 
                        key={skill}
                        className={`px-2 py-0.5 text-xs ${
                          theme === "cyber" 
                            ? "bg-muted border border-border cyber-mono" 
                            : "bg-muted"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="px-2 py-0.5 text-xs text-muted-foreground">
                        +{job.skills.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Match percentage bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={theme === "cyber" ? "cyber-mono uppercase text-muted-foreground" : "text-muted-foreground uppercase tracking-wider"}>
                        {theme === "cyber" ? "MATCH_SCORE" : "Match Score"}
                      </span>
                      <span className={`font-bold ${theme === "cyber" ? "text-primary cyber-text-glow" : "text-primary"}`}>
                        {job.matchPercentage}%
                      </span>
                    </div>
                    <div className={`h-2 overflow-hidden ${theme === "zen" ? "rounded-full" : ""} bg-muted`}>
                      <div 
                        className={`h-full transition-all ${theme === "cyber" ? "bg-primary cyber-glow" : "bg-primary"}`}
                        style={{ width: `${job.matchPercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Action button */}
                  <Button 
                    variant="default"
                    size="sm" 
                    className={`w-full mt-4 ${theme === "cyber" ? "cyber-mono uppercase" : ""}`}
                  >
                    {theme === "cyber" ? "GENERATE COVER" : "Generate Cover Letter"}
                  </Button>
                </ThemedCard>
              </Link>
            </div>
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-2xl mb-2 ${theme === "cyber" ? "text-primary cyber-mono uppercase" : "font-display text-muted-foreground"}`}>
              {theme === "cyber" ? "NO_RECORDS_FOUND" : "No Listings Found"}
            </p>
            <p className="text-muted-foreground">
              {theme === "cyber" ? "> Check back for updated database entries" : "Check back for new opportunities"}
            </p>
          </div>
        )}
        
        {/* Footer decoration */}
        <div className="mt-12 text-center">
          {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4" />}
          <p className={`text-xs ${theme === "cyber" ? "cyber-mono text-primary uppercase" : "text-muted-foreground uppercase tracking-widest"}`}>
            {theme === "cyber" ? "— END_OF_QUERY —" : "— End of Listings —"}
          </p>
        </div>
      </main>
      
      <ThemedFooter />
    </ThemedLayout>
  );
};

export default Jobs;
