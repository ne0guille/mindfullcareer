import { useState } from "react";
import { Grid3X3, List, RefreshCw, Filter } from "lucide-react";
import NewspaperNav from "@/components/NewspaperNav";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";

const Jobs = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterCoverLetter, setFilterCoverLetter] = useState(false);

  const filteredJobs = filterCoverLetter 
    ? mockJobs.filter(job => job.hasCoverLetter)
    : mockJobs;

  return (
    <div className="min-h-screen bg-background paper-texture">
      <NewspaperNav />
      
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="stamp">Classifieds</span>
              </div>
              <h1 className="headline-primary mb-2">Employment Opportunities</h1>
              <p className="text-ink-faded font-serif italic">
                {mockJobs.length} positions await in today&apos;s edition
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 border ${viewMode === "grid" ? "bg-headline text-card border-headline" : "border-rule-light hover:border-rule-dark"}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 border ${viewMode === "list" ? "bg-headline text-card border-headline" : "border-rule-light hover:border-rule-dark"}`}
              >
                <List className="w-5 h-5" />
              </button>
              <Button variant="outline" size="sm" className="ml-2">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
          
          {/* Decorative rule */}
          <div className="newspaper-rule-double mt-6" />
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-ink-faded font-typewriter uppercase">Filter:</span>
          <button
            onClick={() => setFilterCoverLetter(!filterCoverLetter)}
            className={`
              flex items-center gap-2 px-3 py-1.5 border text-sm font-serif transition-all
              ${filterCoverLetter 
                ? "bg-stamp-red text-primary-foreground border-stamp-red" 
                : "border-rule-light hover:border-rule-dark"
              }
            `}
          >
            <Filter className="w-4 h-4" />
            Has Cover Letter ({mockJobs.filter(j => j.hasCoverLetter).length})
          </button>
          
          <div className="ml-auto">
            <select className="px-3 py-1.5 bg-paper-aged border border-rule-light font-serif text-sm focus:outline-none focus:border-rule-dark">
              <option>Newest First</option>
              <option>Expiring Soon</option>
              <option>Best Match</option>
            </select>
          </div>
        </div>
        
        {/* Jobs Grid */}
        <div className={`
          ${viewMode === "grid" 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }
        `}>
          {filteredJobs.map((job, index) => (
            <div 
              key={job.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="font-display text-2xl text-subheadline mb-2">No Listings Found</p>
            <p className="text-ink-faded font-serif italic">
              Check back tomorrow&apos;s edition for new opportunities
            </p>
          </div>
        )}
        
        {/* Footer decoration */}
        <div className="mt-12 text-center">
          <div className="newspaper-rule-ornate mb-4" />
          <p className="text-xs text-ink-faded font-typewriter uppercase tracking-widest">
            — End of Classifieds Section —
          </p>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
