import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  FileText,
  Bookmark,
  Star,
  X,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Building2,
  Calendar
} from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";

// Determine card size based on match percentage
const getCardSize = (matchPercentage: number, index: number): "large" | "medium" | "small" => {
  if (matchPercentage >= 85) return "large";
  if (matchPercentage >= 70) return "medium";
  // Vary small cards for visual interest
  return index % 3 === 0 ? "medium" : "small";
};

// Bento Card Component
const BentoJobCard = ({ 
  job, 
  index, 
  isSelected, 
  onSelect 
}: { 
  job: typeof mockJobs[0]; 
  index: number;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}) => {
  const size = getCardSize(job.matchPercentage, index);
  
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small: "md:col-span-1 md:row-span-1"
  };

  return (
    <motion.div
      layoutId={`card-${job.id}`}
      onClick={() => onSelect(job.id)}
      className={`
        ${sizeClasses[size]}
        cursor-pointer group relative
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.4,
        layout: { type: "spring", stiffness: 300, damping: 30 }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`
        h-full min-h-[180px] p-6 rounded-3xl
        bg-gradient-to-br from-card/90 to-card/60
        backdrop-blur-sm border border-primary/10
        transition-all duration-500
        hover:border-primary/30 hover:shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.3)]
        ${size === "large" ? "min-h-[320px]" : size === "medium" ? "min-h-[280px]" : "min-h-[180px]"}
      `}>
        
        {/* Match indicator - floating badge */}
        <motion.div 
          className="absolute -top-2 -right-2 z-10"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
        >
          <div className={`
            px-3 py-1.5 rounded-full text-xs font-medium
            ${job.matchPercentage >= 85 
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
              : job.matchPercentage >= 70
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-muted text-muted-foreground"
            }
          `}>
            {job.matchPercentage}% match
          </div>
        </motion.div>

        {/* Content */}
        <div className="h-full flex flex-col">
          
          {/* Company Logo Area */}
          <div className="flex items-start gap-3 mb-4">
            <div className={`
              rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 
              flex items-center justify-center font-semibold text-primary
              ${size === "large" ? "w-14 h-14 text-xl" : "w-10 h-10 text-sm"}
            `}>
              {job.companyInitial}
            </div>
            
            {job.hasCoverLetter && (
              <motion.div 
                className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.3 }}
              >
                <FileText className="w-3 h-3" />
                Ready
              </motion.div>
            )}
          </div>

          {/* Job Title - Primary Focus */}
          <motion.h3 
            className={`
              font-medium text-foreground mb-2 line-clamp-2
              group-hover:text-primary transition-colors duration-300
              ${size === "large" ? "text-2xl" : size === "medium" ? "text-xl" : "text-lg"}
            `}
            layoutId={`title-${job.id}`}
          >
            {job.title}
          </motion.h3>

          {/* Company Name */}
          <motion.p 
            className="text-muted-foreground font-medium mb-1"
            layoutId={`company-${job.id}`}
          >
            {job.company}
          </motion.p>

          {/* Location */}
          <motion.p 
            className="text-sm text-muted-foreground/80 flex items-center gap-1.5 mb-4"
            layoutId={`location-${job.id}`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {job.location}
          </motion.p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom info - only on larger cards */}
          {size !== "small" && (
            <motion.div 
              className="flex flex-wrap gap-1.5 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 + 0.4 }}
            >
              {job.skills.slice(0, size === "large" ? 4 : 2).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs bg-muted/50 rounded-full text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > (size === "large" ? 4 : 2) && (
                <span className="px-2 py-1 text-xs text-muted-foreground/60">
                  +{job.skills.length - (size === "large" ? 4 : 2)}
                </span>
              )}
            </motion.div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground/70">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {job.expiresIn}
            </span>
            <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
              View details
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      </div>
    </motion.div>
  );
};

// Expanded Card Modal
const ExpandedCard = ({ 
  job, 
  onClose 
}: { 
  job: typeof mockJobs[0]; 
  onClose: () => void;
}) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
      />
      
      {/* Expanded Card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          layoutId={`card-${job.id}`}
          className="w-full max-w-2xl max-h-[85vh] overflow-auto pointer-events-auto"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-8 rounded-3xl bg-card border border-primary/20 shadow-2xl shadow-primary/10">
            
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary text-2xl">
                {job.companyInitial}
              </div>
              
              <div className="flex-1">
                <motion.h2 
                  className="text-2xl font-semibold text-foreground mb-1"
                  layoutId={`title-${job.id}`}
                >
                  {job.title}
                </motion.h2>
                <motion.p 
                  className="text-lg text-muted-foreground"
                  layoutId={`company-${job.id}`}
                >
                  {job.company}
                </motion.p>
              </div>

              {/* Match Score */}
              <div className="text-right">
                <div className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  ${job.matchPercentage >= 85 
                    ? "bg-primary text-primary-foreground" 
                    : job.matchPercentage >= 70
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }
                `}>
                  <Sparkles className="w-4 h-4" />
                  {job.matchPercentage}% alignment
                </div>
              </div>
            </div>

            {/* Meta info row */}
            <motion.div 
              className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-border/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <motion.span 
                className="flex items-center gap-2 text-muted-foreground"
                layoutId={`location-${job.id}`}
              >
                <MapPin className="w-4 h-4 text-primary" />
                {job.location}
              </motion.span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4 text-primary" />
                {job.company}
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                Saved {job.savedAt}
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                Expires in {job.expiresIn}
              </span>
            </motion.div>

            {/* Skills */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-sm font-medium text-foreground mb-3">Skills & Requirements</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Cover Letter Status */}
            <motion.div 
              className="mb-8 p-4 rounded-2xl bg-muted/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${job.hasCoverLetter ? "bg-green-500/20 text-green-600" : "bg-muted text-muted-foreground"}
                `}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {job.hasCoverLetter ? "Cover letter ready" : "No cover letter yet"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {job.hasCoverLetter 
                      ? "Your personalized letter is prepared for this role" 
                      : "Create a tailored cover letter when you're ready"
                    }
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Motivational message */}
            <motion.div 
              className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <p className="text-foreground italic">
                {job.matchPercentage >= 85 
                  ? "✨ This opportunity aligns beautifully with your experience. Trust your journey."
                  : job.matchPercentage >= 70
                    ? "🌱 Strong potential here. Every application is a step forward."
                    : "💫 Growth happens outside comfort zones. You've got this."
                }
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link to={`/jobs/${job.id}`} className="flex-1">
                <Button className="w-full rounded-xl h-12 text-base" size="lg">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Full Details
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="rounded-xl h-12 px-6"
                onClick={onClose}
              >
                Close
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

// Empty State
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="py-24"
  >
    <div className="max-w-md mx-auto text-center">
      <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <Bookmark className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-2xl font-light text-foreground mb-3">
        Your collection awaits
      </h2>
      <p className="text-muted-foreground mb-8">
        Save opportunities that resonate with you. They'll appear here, organized and ready.
      </p>
      <Link to="/">
        <Button className="rounded-xl">Explore Opportunities</Button>
      </Link>
    </div>
  </motion.div>
);

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"match" | "newest" | "expiring">("match");

  // Sort jobs
  const sortedJobs = [...mockJobs].sort((a, b) => {
    switch (sortBy) {
      case "match":
        return b.matchPercentage - a.matchPercentage;
      case "newest":
        return parseInt(a.savedAt) - parseInt(b.savedAt);
      case "expiring":
        return parseInt(a.expiresIn) - parseInt(b.expiresIn);
      default:
        return 0;
    }
  });

  const selectedJobData = mockJobs.find(j => j.id === selectedJob);
  const highMatchCount = mockJobs.filter(j => j.matchPercentage >= 70).length;

  return (
    <ThemedLayout>
      <main className="container max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <section className="mb-12">
          <motion.div 
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-foreground">
                Saved Opportunities
              </h1>
              <p className="text-muted-foreground">
                {mockJobs.length} possibilities • {highMatchCount} strong matches
              </p>
            </div>
          </motion.div>

          {/* Sort Pills */}
          <motion.div 
            className="flex gap-2 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {[
              { value: "match", label: "Best Match", icon: Star },
              { value: "newest", label: "Recently Saved", icon: Clock },
              { value: "expiring", label: "Expiring Soon", icon: Calendar },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setSortBy(value as typeof sortBy)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all
                  ${sortBy === value 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "bg-card border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Bento Grid */}
        {sortedJobs.length > 0 ? (
          <motion.section 
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]"
            layout
          >
            <AnimatePresence>
              {sortedJobs.map((job, index) => (
                <BentoJobCard
                  key={job.id}
                  job={job}
                  index={index}
                  isSelected={selectedJob === job.id}
                  onSelect={setSelectedJob}
                />
              ))}
            </AnimatePresence>
          </motion.section>
        ) : (
          <EmptyState />
        )}

        {/* Expanded Card Modal */}
        <AnimatePresence>
          {selectedJobData && (
            <ExpandedCard 
              job={selectedJobData} 
              onClose={() => setSelectedJob(null)} 
            />
          )}
        </AnimatePresence>

        {/* Footer Message */}
        {sortedJobs.length > 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground italic">
              "Every saved opportunity is a seed of possibility" 🌱
            </p>
          </motion.div>
        )}
      </main>

      <ThemedFooter />
    </ThemedLayout>
  );
};

export default Jobs;
