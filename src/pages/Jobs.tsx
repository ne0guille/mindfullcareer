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
  Heart,
  Building2,
  Calendar,
  Leaf,
  PenLine,
  Check
} from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { mockJobs } from "@/data/mockData";

// Tape colors for the journal feel
const tapeColors = [
  "bg-[#c8e6c9]", // soft green
  "bg-[#fff9c4]", // soft yellow  
  "bg-[#ffcdd2]", // soft pink
  "bg-[#b3e5fc]", // soft blue
  "bg-[#e1bee7]", // soft purple
];

// Get tape color based on match or index
const getTapeColor = (matchPercentage: number, index: number): string => {
  if (matchPercentage >= 85) return tapeColors[0]; // green for best
  if (matchPercentage >= 70) return tapeColors[1]; // yellow for good
  return tapeColors[index % tapeColors.length];
};

// Slight random rotation for paper feel
const getRotation = (index: number): number => {
  const rotations = [-1.5, 0.5, -0.8, 1.2, -0.3, 0.8, -1, 0.6];
  return rotations[index % rotations.length];
};

// Determine card size based on match percentage
const getCardSize = (matchPercentage: number, index: number): "large" | "medium" | "small" => {
  if (matchPercentage >= 85) return "large";
  if (matchPercentage >= 70) return "medium";
  return index % 4 === 0 ? "medium" : "small";
};

// Journal Note Card Component
const JournalJobCard = ({ 
  job, 
  index, 
  onSelect,
  note,
  onNoteChange
}: { 
  job: typeof mockJobs[0]; 
  index: number;
  onSelect: (id: string | null) => void;
  note: string;
  onNoteChange: (jobId: string, note: string) => void;
}) => {
  const [isWritingNote, setIsWritingNote] = useState(false);
  const [noteText, setNoteText] = useState(note);
  const size = getCardSize(job.matchPercentage, index);
  const tapeColor = getTapeColor(job.matchPercentage, index);
  const rotation = getRotation(index);
  
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small: "md:col-span-1 md:row-span-1"
  };

  const handleSaveNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNoteChange(job.id, noteText);
    setIsWritingNote(false);
  };

  const handleOpenNoteEditor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWritingNote(true);
  };

  return (
    <>
      <motion.div
        layoutId={`card-${job.id}`}
        onClick={() => onSelect(job.id)}
        className={`${sizeClasses[size]} cursor-pointer group relative`}
        initial={{ opacity: 0, y: 20, rotate: rotation }}
        animate={{ opacity: 1, y: 0, rotate: rotation }}
        whileHover={{ 
          scale: 1.03, 
          rotate: 0,
          y: -8,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          delay: index * 0.06, 
          duration: 0.5,
          layout: { type: "spring", stiffness: 350, damping: 30 }
        }}
      >
        {/* Paper card */}
        <div className={`
          h-full min-h-[200px] p-6 rounded-lg relative
          bg-gradient-to-b from-[hsl(var(--card))] to-[hsl(var(--card)/0.95)]
          shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.05)]
          group-hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.08)]
          transition-shadow duration-500
          ${size === "large" ? "min-h-[340px]" : size === "medium" ? "min-h-[300px]" : "min-h-[200px]"}
        `}>
          
          {/* Decorative tape at top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <motion.div 
              className={`${tapeColor} w-16 h-7 rounded-sm shadow-sm`}
              style={{ 
                transform: "rotate(-2deg)",
                opacity: 0.9
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.06 + 0.2, type: "spring" }}
            />
          </div>

          {/* Write note button */}
          <motion.button
            onClick={handleOpenNoteEditor}
            className="absolute top-3 right-3 p-2 rounded-full bg-muted/50 opacity-0 group-hover:opacity-100 hover:bg-muted transition-all z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <PenLine className="w-4 h-4 text-muted-foreground" />
          </motion.button>

          {/* Content */}
          <div className="h-full flex flex-col pt-2">
            
            {/* Company name - styled like journal header */}
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-primary/70" />
              <motion.span 
                className="text-sm font-medium text-primary"
                layoutId={`company-${job.id}`}
              >
                {job.company}
              </motion.span>
            </div>

            {/* Job Title - Primary Focus */}
            <motion.h3 
              className={`
                font-semibold text-foreground mb-3 leading-tight
                ${size === "large" ? "text-2xl" : size === "medium" ? "text-xl" : "text-lg"}
              `}
              layoutId={`title-${job.id}`}
            >
              {job.title}
            </motion.h3>

            {/* Personal note preview */}
            {note && (
              <motion.div 
                className="mb-3 p-2 rounded-md bg-primary/5 border-l-2 border-primary/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <p className="text-xs text-muted-foreground italic line-clamp-2">
                  "{note}"
                </p>
              </motion.div>
            )}

            {/* Skills as handwritten notes */}
            <div className="flex flex-wrap gap-1 mb-4">
              {job.skills.slice(0, size === "large" ? 4 : size === "medium" ? 3 : 2).map((skill, i) => (
                <span
                  key={skill}
                  className="text-xs text-muted-foreground italic"
                >
                  {skill}{i < (size === "large" ? 3 : size === "medium" ? 2 : 1) ? " •" : ""}
                </span>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Bottom section - handwritten style */}
            <div className="space-y-2">
              {/* Saved date - handwritten feel */}
              <motion.p 
                className="text-sm text-muted-foreground/80 italic font-light"
                layoutId={`saved-${job.id}`}
              >
                Saved {job.savedAt}
              </motion.p>

              {/* Cover letter indicator */}
              {job.hasCoverLetter && (
                <motion.div 
                  className="flex items-center gap-1.5 text-primary text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.06 + 0.4 }}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="italic">Letter ready</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Subtle paper texture overlay */}
          <div className="absolute inset-0 rounded-lg pointer-events-none opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--foreground))_100%)]" />
        </div>
      </motion.div>

      {/* Note Writing Modal */}
      <AnimatePresence>
        {isWritingNote && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsWritingNote(false);
              }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-md bg-card rounded-xl shadow-2xl p-6 pointer-events-auto relative">
                {/* Decorative tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-[#fff9c4] w-20 h-6 rounded-sm shadow-sm" style={{ transform: "rotate(-1deg)" }} />
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-4">
                    <PenLine className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium text-foreground">Personal Reflection</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    How does this opportunity make you feel? What draws you to it?
                  </p>
                  
                  <Textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Write your thoughts here..."
                    className="min-h-[120px] resize-none bg-muted/30 border-muted focus:border-primary/30 italic"
                    autoFocus
                  />
                  
                  <div className="flex gap-3 mt-4">
                    <Button
                      onClick={handleSaveNote}
                      className="flex-1 rounded-xl"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Save Note
                    </Button>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNoteText(note);
                        setIsWritingNote(false);
                      }}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Expanded Letter Modal
const ExpandedLetter = ({ 
  job, 
  onClose 
}: { 
  job: typeof mockJobs[0]; 
  onClose: () => void;
}) => {
  const tapeColor = getTapeColor(job.matchPercentage, 0);
  
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/60 backdrop-blur-md z-50"
      />
      
      {/* Expanded Letter */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          layoutId={`card-${job.id}`}
          className="w-full max-w-2xl max-h-[85vh] overflow-auto pointer-events-auto"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="relative p-8 md:p-10 rounded-lg bg-card shadow-2xl">
            
            {/* Decorative tape */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div 
                className={`${tapeColor} w-24 h-8 rounded-sm shadow-md`}
                style={{ transform: "rotate(-1deg)", opacity: 0.9 }}
              />
            </div>
            
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </motion.button>

            {/* Header */}
            <div className="pt-4 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-primary/70" />
                <motion.span 
                  className="text-base font-medium text-primary"
                  layoutId={`company-${job.id}`}
                >
                  {job.company}
                </motion.span>
              </div>
              
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold text-foreground mb-3"
                layoutId={`title-${job.id}`}
              >
                {job.title}
              </motion.h2>

              {/* Match indicator */}
              <div className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
                ${job.matchPercentage >= 85 
                  ? "bg-[#c8e6c9] text-green-800" 
                  : job.matchPercentage >= 70
                    ? "bg-[#fff9c4] text-amber-800"
                    : "bg-muted text-muted-foreground"
                }
              `}>
                <Sparkles className="w-4 h-4" />
                {job.matchPercentage}% alignment with your profile
              </div>
            </div>

            {/* Meta info */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-border/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/70">Location</p>
                  <p className="text-sm font-medium text-foreground">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/70">Saved</p>
                  <motion.p 
                    className="text-sm font-medium text-foreground italic"
                    layoutId={`saved-${job.id}`}
                  >
                    {job.savedAt}
                  </motion.p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/70">Expires</p>
                  <p className="text-sm font-medium text-foreground">{job.expiresIn}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/70">Cover Letter</p>
                  <p className="text-sm font-medium text-foreground">
                    {job.hasCoverLetter ? "Ready ✓" : "Not yet"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                Skills & Experience
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="px-3 py-1.5 text-sm bg-muted/50 text-foreground rounded-full"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Mindful message */}
            <motion.div 
              className="mb-8 p-5 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-foreground leading-relaxed">
                    {job.matchPercentage >= 85 
                      ? "This opportunity beautifully aligns with your journey. Trust your path."
                      : job.matchPercentage >= 70
                        ? "Strong potential here. Every application is a step in your growth."
                        : "New paths lead to new discoveries. You're capable of wonderful things."
                    }
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    Take a deep breath. You've got this. 🌱
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link to={`/jobs/${job.id}`} className="flex-1">
                <Button className="w-full rounded-xl h-12 text-base" size="lg">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Full Details
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
        Your journal awaits
      </h2>
      <p className="text-muted-foreground mb-8 italic">
        Save opportunities that resonate with you. They'll appear here like pages in your story.
      </p>
      <Link to="/">
        <Button className="rounded-xl">Explore Opportunities</Button>
      </Link>
    </div>
  </motion.div>
);

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"match" | "newest" | "expiring">("newest");
  const [jobNotes, setJobNotes] = useState<Record<string, string>>({});

  const handleNoteChange = (jobId: string, note: string) => {
    setJobNotes(prev => ({ ...prev, [jobId]: note }));
  };

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
  const withLetterCount = mockJobs.filter(j => j.hasCoverLetter).length;

  return (
    <ThemedLayout>
      <main className="container max-w-7xl mx-auto px-4 py-8">
        
        {/* Journal Header */}
        <section className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm mb-4"
          >
            <Leaf className="w-4 h-4" />
            <span>Your mindful collection</span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl font-serif font-light text-foreground mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            This Week's Discoveries
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground italic mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {mockJobs.length} opportunities explored
          </motion.p>
          
          <motion.p 
            className="text-sm text-muted-foreground/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Click any card to open it like a letter
          </motion.p>
        </section>

        {/* Filter Status Bar */}
        <motion.div 
          className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Status:</span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-muted/50 rounded-full">
              <FileText className="w-3.5 h-3.5" />
              {withLetterCount} Letters Created
            </span>
          </div>

          {/* Sort Pills */}
          <div className="flex gap-2">
            {[
              { value: "newest", label: "Recent" },
              { value: "match", label: "Best Match" },
              { value: "expiring", label: "Expiring" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSortBy(value as typeof sortBy)}
                className={`
                  px-4 py-1.5 rounded-full text-sm transition-all
                  ${sortBy === value 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento Journal Grid */}
        {sortedJobs.length > 0 ? (
          <motion.section 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]"
            layout
          >
            <AnimatePresence>
              {sortedJobs.map((job, index) => (
                <JournalJobCard
                  key={job.id}
                  job={job}
                  index={index}
                  onSelect={setSelectedJob}
                  note={jobNotes[job.id] || ""}
                  onNoteChange={handleNoteChange}
                />
              ))}
            </AnimatePresence>
          </motion.section>
        ) : (
          <EmptyState />
        )}

        {/* Expanded Letter Modal */}
        <AnimatePresence>
          {selectedJobData && (
            <ExpandedLetter 
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
              "Every opportunity saved is a seed of possibility planted" 🌱
            </p>
          </motion.div>
        )}
      </main>

      <ThemedFooter />
    </ThemedLayout>
  );
};

export default Jobs;
