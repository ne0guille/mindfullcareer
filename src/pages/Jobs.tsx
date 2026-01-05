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

const Jobs = () => {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterCoverLetter, setFilterCoverLetter] = useState(false);

  const filteredJobs = filterCoverLetter 
    ? mockJobs.filter(job => job.hasCoverLetter)
    : mockJobs;

  return (
    <ThemedLayout>
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {theme === "newspaper" && <span className="stamp">Classifieds</span>}
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
                {theme === "newspaper" ? "Employment Opportunities" : theme === "zen" ? "Career Opportunities" : "JOB_LISTINGS"}
              </h1>
              <p className={`${theme === "cyber" ? "text-muted-foreground cyber-mono" : "text-muted-foreground italic"}`}>
                {theme === "cyber" 
                  ? `> ${mockJobs.length} records found in database`
                  : `${mockJobs.length} positions await in today's edition`
                }
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 border transition-all ${
                  viewMode === "grid" 
                    ? theme === "cyber" 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 border transition-all ${
                  viewMode === "list" 
                    ? theme === "cyber" 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "bg-primary text-primary-foreground border-primary"
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
          
          {theme === "newspaper" && <div className="newspaper-rule-double mt-6" />}
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
                      <FileText className={`w-4 h-4 ${theme === "cyber" ? "text-primary" : "text-primary"}`} />
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
                        : theme === "zen"
                          ? "bg-primary/10 rounded-full text-primary"
                          : "bg-primary text-primary-foreground"
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
                    variant={theme === "cyber" ? "default" : "default"} 
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
          {theme === "newspaper" && <div className="newspaper-rule-ornate mb-4" />}
          {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4" />}
          <p className={`text-xs ${theme === "cyber" ? "cyber-mono text-primary uppercase" : "text-muted-foreground uppercase tracking-widest"}`}>
            {theme === "cyber" ? "— END_OF_QUERY —" : "— End of Classifieds Section —"}
          </p>
        </div>
      </main>
      
      <ThemedFooter />
    </ThemedLayout>
  );
};

export default Jobs;
