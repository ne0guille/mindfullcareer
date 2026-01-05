import { useState } from "react";
import { Link } from "react-router-dom";
import { Grid3X3, List, RefreshCw, Filter, MapPin, Clock, Check, FileText } from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedCard from "@/components/ThemedCard";
import ThemedBadge from "@/components/ThemedBadge";
import ThemedFooter from "@/components/ThemedFooter";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";

const Jobs = () => {
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
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm">
                  Opportunities await
                </span>
              </div>
              <h1 className="headline-primary mb-2">
                Career Opportunities
              </h1>
              <p className="text-muted-foreground italic">
                {mockJobs.length} positions available
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 border rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 border rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <Button variant="outline" size="sm" className="ml-2">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">
            Filter:
          </span>
          <button
            onClick={() => setFilterCoverLetter(!filterCoverLetter)}
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-full text-sm transition-all ${
              filterCoverLetter
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-primary"
            }`}
          >
            <Filter className="w-4 h-4" />
            Has Cover Letter ({mockJobs.filter(j => j.hasCoverLetter).length})
          </button>

          <div className="ml-auto">
            <select className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
              <option>Newest First</option>
              <option>Expiring Soon</option>
              <option>Best Match</option>
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
                      Expires in {job.expiresIn}
                    </ThemedBadge>
                    {job.hasCoverLetter && (
                      <FileText className="w-4 h-4 text-primary" />
                    )}
                  </div>

                  {/* Job title */}
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors text-lg">
                    {job.title}
                  </h3>

                  {/* Company */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 flex items-center justify-center font-bold text-sm bg-primary/10 rounded-full text-primary">
                      {job.companyInitial}
                    </div>
                    <span className="font-medium text-primary">
                      {job.company}
                    </span>
                    {job.isMatched && (
                      <span className="ml-auto">
                        <ThemedBadge variant="success">
                          <span className="flex items-center gap-1">
                            <Check className="w-3 h-3" /> Match
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
                        className="px-2 py-0.5 text-xs bg-muted rounded-full"
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
                      <span className="text-muted-foreground uppercase tracking-wider">
                        Match Score
                      </span>
                      <span className="font-bold text-primary">
                        {job.matchPercentage}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full transition-all bg-primary"
                        style={{ width: `${job.matchPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Action button */}
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full mt-4"
                  >
                    Generate Cover Letter
                  </Button>
                </ThemedCard>
              </Link>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl mb-2 font-display text-muted-foreground">
              No Listings Found
            </p>
            <p className="text-muted-foreground">
              Check back for new opportunities
            </p>
          </div>
        )}

        {/* Footer decoration */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            — End of Listings —
          </p>
        </div>
      </main>

      <ThemedFooter />
    </ThemedLayout>
  );
};

export default Jobs;
