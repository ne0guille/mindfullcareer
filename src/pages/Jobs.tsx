import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Grid3X3,
  List,
  MapPin,
  Clock,
  FileText,
  Heart,
  Bookmark,
  Wind,
  Sparkles,
  Sun,
  Leaf,
  Star,
  Filter,
  ArrowUp,
  Home
} from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import AffirmationBanner from "@/components/zen/AffirmationBanner";
import MindfulCard from "@/components/zen/MindfulCard";
import BreathingExercise from "@/components/motivation/BreathingExercise";
import MotivationalMessage from "@/components/motivation/MotivationalMessage";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";

// Mindful break messages
const mindfulBreaks = [
  {
    icon: Wind,
    message: "Remember to breathe. You're doing great.",
    submessage: "Take a moment before continuing."
  },
  {
    icon: Heart,
    message: "Each application is a step forward.",
    submessage: "Progress isn't always linear."
  },
  {
    icon: Sparkles,
    message: "Your next chapter is being written.",
    submessage: "Trust the journey."
  },
  {
    icon: Sun,
    message: "Rest when you need to. This will still be here.",
    submessage: "Self-care is part of the process."
  }
];

// Get contextual message based on job count
const getContextualMessage = (count: number) => {
  if (count === 0) return {
    message: "Your perfect opportunity is out there",
    submessage: "When you find it, save it here"
  };
  if (count <= 5) return {
    message: "You're curating thoughtfully",
    submessage: "Quality over quantity"
  };
  if (count <= 15) return {
    message: "A wonderful collection of possibilities awaits",
    submessage: "Take your time with each one"
  };
  return {
    message: "So many paths forward",
    submessage: "Remember: you only need one to say yes"
  };
};

// Parse savedAt for sorting (e.g., "1 day ago" -> 1, "2 days ago" -> 2)
const parseSavedAt = (savedAt: string): number => {
  const match = savedAt.match(/(\d+)/);
  return match ? parseInt(match[1]) : 999;
};

// Parse expiresIn for sorting
const parseExpiresIn = (expiresIn: string): number => {
  const match = expiresIn.match(/(\d+)/);
  return match ? parseInt(match[1]) : 999;
};

// Mindful Break Component
const MindfulBreak = ({ index }: { index: number }) => {
  const breakData = mindfulBreaks[index % mindfulBreaks.length];
  const Icon = breakData.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-full py-8"
    >
      <div className="max-w-md mx-auto text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center zen-breathing">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <p className="text-lg font-light text-foreground mb-1">
          {breakData.message}
        </p>
        <p className="text-sm text-muted-foreground italic">
          {breakData.submessage}
        </p>
      </div>
    </motion.div>
  );
};

// Enhanced Job Card Component
const MindfulJobCard = ({ job, index }: { job: typeof mockJobs[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link to={`/jobs/${job.id}`} className="block h-full">
        <div className="h-full p-6 bg-card/80 backdrop-blur-sm rounded-3xl border border-primary/10 transition-all duration-500 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.25)] hover:border-primary/30">

          {/* Top Row: Saved date + Cover letter indicator */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
              Saved {job.savedAt}
            </span>
            {job.hasCoverLetter && (
              <div className="flex items-center gap-1 text-xs text-primary">
                <FileText className="w-3.5 h-3.5" />
                <span>Letter ready</span>
              </div>
            )}
          </div>

          {/* Expiry notice - gentle */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <Clock className="w-3 h-3" />
            <span>Expires in {job.expiresIn}</span>
          </div>

          {/* Job Title */}
          <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
            {job.title}
          </h3>

          {/* Company Row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="font-semibold text-primary">
                {job.companyInitial}
              </span>
            </div>
            <div>
              <p className="font-medium text-foreground">{job.company}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </p>
            </div>
          </div>

          {/* Skills Preview */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {job.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs bg-muted/50 rounded-full text-muted-foreground"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>

          {/* Match Score with Gentle Messaging */}
          <div className="pt-4 border-t border-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Your alignment</span>
              <span className="text-sm font-medium text-primary">
                {job.matchPercentage}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${job.matchPercentage}%` }}
                transition={{ delay: index * 0.08 + 0.3, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full"
              />
            </div>

            {/* Motivational micro-message */}
            <MotivationalMessage
              matchPercentage={job.matchPercentage}
              variant="inline"
              className="text-xs"
            />
          </div>

          {/* CTA Button */}
          <Button
            variant="secondary"
            size="sm"
            className="w-full mt-4 rounded-xl"
          >
            Explore This Opportunity
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="py-16"
  >
    <div className="max-w-lg mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
      <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center zen-float">
        <Bookmark className="w-10 h-10 text-primary" />
      </div>

      <h2 className="text-2xl font-light text-foreground mb-4">
        Your collection awaits
      </h2>

      <p className="text-muted-foreground mb-8 leading-relaxed">
        When you find opportunities that spark interest, save them here.
        There's no rush — take your time exploring.
      </p>

      <Link to="/">
        <Button className="rounded-xl">
          Explore Opportunities
        </Button>
      </Link>

      <p className="text-xs text-muted-foreground mt-8 italic">
        "Every journey begins with a single step"
      </p>
    </div>
  </motion.div>
);

const Jobs = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterCoverLetter, setFilterCoverLetter] = useState(false);
  const [filterHighMatch, setFilterHighMatch] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "expiring" | "match">("newest");

  // Filter jobs
  let filteredJobs = [...mockJobs];
  if (filterCoverLetter) {
    filteredJobs = filteredJobs.filter(job => job.hasCoverLetter);
  }
  if (filterHighMatch) {
    filteredJobs = filteredJobs.filter(job => job.matchPercentage >= 70);
  }

  // Sort jobs
  const sortedJobs = filteredJobs.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return parseSavedAt(a.savedAt) - parseSavedAt(b.savedAt);
      case "expiring":
        return parseExpiresIn(a.expiresIn) - parseExpiresIn(b.expiresIn);
      case "match":
        return b.matchPercentage - a.matchPercentage;
      default:
        return 0;
    }
  });

  // Stats
  const highMatchCount = mockJobs.filter(j => j.matchPercentage >= 70).length;
  const withCoverLetterCount = mockJobs.filter(j => j.hasCoverLetter).length;
  const contextual = getContextualMessage(mockJobs.length);

  return (
    <ThemedLayout>
      <main className="container max-w-6xl mx-auto px-4 py-8">

        {/* Section 1: Mindfulness Header */}
        <section className="mb-8">
          <AffirmationBanner
            className="mb-4"
            autoRotate={true}
            rotateInterval={10000}
          />
          <div className="flex justify-center">
            <BreathingExercise compact={true} />
          </div>
        </section>

        {/* Section 2: Page Header with Gentle Stats */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm mb-4"
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved for your journey</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-foreground mb-3"
          >
            Your Saved Opportunities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground italic mb-6"
          >
            {mockJobs.length} possibilities waiting when you're ready
          </motion.p>

          {/* Gentle Statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              {highMatchCount} strong matches
            </span>
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              {withCoverLetterCount} with cover letters ready
            </span>
          </motion.div>
        </section>

        {/* Section 3: Contextual Motivational Card */}
        <section className="mb-8">
          <MindfulCard
            className="bg-gradient-to-br from-primary/5 to-transparent"
            glowOnHover={false}
            delay={0.3}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center zen-breathing">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-light text-foreground">
                  {contextual.message}
                </p>
                <p className="text-sm text-muted-foreground mt-1 italic">
                  {contextual.submessage}
                </p>
              </div>
            </div>
          </MindfulCard>
        </section>

        {/* Section 4: Filters and View Controls */}
        <section className="py-4 mb-6 sticky top-[73px] z-40 bg-background/80 backdrop-blur-md border-b border-border/30 -mx-4 px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Sort and Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Arrange by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "expiring" | "match")}
                className="px-4 py-2 bg-card/80 border border-border/50 rounded-full text-sm focus:outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="newest">Newest Saved</option>
                <option value="expiring">Expiring Soon</option>
                <option value="match">Best Alignment</option>
              </select>

              {/* Filter Pills */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterCoverLetter(!filterCoverLetter)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                    filterCoverLetter
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/80 border border-border/50 hover:border-primary/50"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Has Letter
                </button>
                <button
                  onClick={() => setFilterHighMatch(!filterHighMatch)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                    filterHighMatch
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/80 border border-border/50 hover:border-primary/50"
                  }`}
                >
                  <Star className="w-3.5 h-3.5" />
                  Strong Match
                </button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/80 border border-border/50 hover:border-primary/50"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/80 border border-border/50 hover:border-primary/50"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Section 5: Jobs Collection with Mindful Breaks */}
        {sortedJobs.length > 0 ? (
          <section className="mb-12">
            <div className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }>
              {sortedJobs.map((job, index) => (
                <Fragment key={job.id}>
                  <MindfulJobCard job={job} index={index} />

                  {/* Insert mindful break every 5 jobs */}
                  {(index + 1) % 5 === 0 && index < sortedJobs.length - 1 && (
                    <MindfulBreak index={Math.floor(index / 5)} />
                  )}
                </Fragment>
              ))}
            </div>
          </section>
        ) : (
          <EmptyState />
        )}

        {/* Section 6: Closing Affirmation */}
        {sortedJobs.length > 0 && (
          <section className="py-16 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10">
                <Leaf className="w-8 h-8 text-primary" />
              </div>

              <p className="text-xl font-light text-foreground mb-2">
                You've reached the end of your saved opportunities.
              </p>
              <p className="text-muted-foreground mb-8">
                Remember: the right opportunity is also looking for you.
              </p>

              <div className="flex justify-center gap-4">
                <Button
                  variant="secondary"
                  className="rounded-xl"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Back to Top
                </Button>
                <Link to="/">
                  <Button variant="ghost" className="rounded-xl">
                    <Home className="w-4 h-4 mr-2" />
                    Return Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </section>
        )}
      </main>

      <ThemedFooter />
    </ThemedLayout>
  );
};

export default Jobs;
