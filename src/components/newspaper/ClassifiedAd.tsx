import { Link } from "react-router-dom";
import { MapPin, DollarSign, Clock, FileText, Star, Trophy, Sparkles } from "lucide-react";
import { Job } from "@/types";

interface ClassifiedAdProps {
  job: Job;
  featured?: boolean;
  size?: "small" | "medium" | "large";
}

// Get motivational phrases based on match percentage
const getMatchPhrase = (percentage: number) => {
  if (percentage >= 85) return { text: "EXCEPTIONAL MATCH!", icon: Trophy, animate: true };
  if (percentage >= 70) return { text: "Excellent Prospect!", icon: Star, animate: true };
  if (percentage >= 50) return { text: "Promising Opportunity", icon: Sparkles, animate: false };
  return { text: "Worth Exploring", icon: null, animate: false };
};

const ClassifiedAd = ({ job, featured = false, size = "medium" }: ClassifiedAdProps) => {
  if (size === "small") {
    return (
      <Link to={`/jobs/${job.id}`} className="block group">
        <div className="border-b border-dashed border-rule-light py-2 hover:bg-highlight-yellow/30 transition-colors px-2 -mx-2">
          <div className="flex items-start gap-2">
            <span className="font-display font-bold text-stamp-red text-sm flex-shrink-0">
              {job.companyInitial}
            </span>
            <div className="flex-1 min-w-0">
              <span className="font-display font-semibold text-sm group-hover:text-stamp-red transition-colors">
                {job.title}
              </span>
              <span className="text-ink-faded text-xs"> — {job.company}</span>
              <div className="text-xs text-ink-faded mt-0.5">
                {job.location} • {job.type}
              </div>
            </div>
            <span className="font-typewriter text-xs text-stamp-red font-bold">
              {job.matchPercentage}%
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/jobs/${job.id}`} className="block group">
      <div className={`border-2 p-4 transition-all hover:shadow-lg relative ${
        featured 
          ? "border-double border-headline bg-card" 
          : "border-rule-light hover:border-headline bg-paper-aged"
      }`}>
        {featured && (
          <div className="absolute -top-3 left-4 bg-stamp-red text-card text-xs font-typewriter uppercase tracking-wider px-2 py-0.5">
            ★ Featured Position ★
          </div>
        )}
        
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 border-2 border-headline flex items-center justify-center font-display text-xl font-black text-headline bg-card flex-shrink-0">
            {job.companyInitial}
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg leading-tight group-hover:text-stamp-red transition-colors">
              {job.title.toUpperCase()}
            </h3>
            <div className="font-serif text-sm italic text-subheadline">
              {job.company}
            </div>
          </div>
          {job.hasCoverLetter && (
            <FileText className="w-5 h-5 text-stamp-red flex-shrink-0" />
          )}
        </div>
        
        {/* Details */}
        <div className="flex flex-wrap gap-3 text-xs text-ink-faded mb-3 font-typewriter">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {job.expiresIn}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {job.level}
          </span>
        </div>
        
        {/* Skills as old-fashioned tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {job.skills.slice(0, 4).map((skill) => (
            <span 
              key={skill}
              className="inline-block px-2 py-0.5 border border-rule-light text-xs font-typewriter bg-card"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-xs text-ink-faded italic">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
        
        {/* Match meter styled as thermometer */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-typewriter uppercase tracking-wider text-ink-faded">
            Match:
          </span>
          <div className="flex-1 h-3 bg-card border border-rule-dark relative overflow-hidden">
            <div 
              className={`absolute inset-y-0 left-0 bg-stamp-red transition-all ${job.matchPercentage >= 70 ? "animate-pulse" : ""}`}
              style={{ width: `${job.matchPercentage}%` }}
            />
            {/* Tick marks */}
            <div className="absolute inset-0 flex">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex-1 border-r border-rule-light/50" />
              ))}
            </div>
          </div>
          <span className="font-display font-black text-stamp-red text-sm min-w-[3ch]">
            {job.matchPercentage}%
          </span>
        </div>
        
        {/* Motivational phrase for high matches */}
        {job.matchPercentage >= 50 && (
          <div className={`mt-2 text-center ${job.matchPercentage >= 70 ? "animate-fade-in" : ""}`}>
            {(() => {
              const matchInfo = getMatchPhrase(job.matchPercentage);
              return (
                <span className={`inline-flex items-center gap-1 text-xs font-typewriter uppercase tracking-wider ${
                  job.matchPercentage >= 70 ? "text-stamp-red font-bold" : "text-ink-faded"
                }`}>
                  {matchInfo.icon && <matchInfo.icon className={`w-3 h-3 ${matchInfo.animate ? "animate-pulse" : ""}`} />}
                  {matchInfo.text}
                </span>
              );
            })()}
          </div>
        )}
        
        {/* Footer note */}
        <div className="mt-3 pt-2 border-t border-dashed border-rule-light text-xs text-ink-faded italic text-center font-serif">
          "Apply at once — Positions fill quickly!"
        </div>
      </div>
    </Link>
  );
};

export default ClassifiedAd;
