import { Link } from "react-router-dom";
import { MapPin, Clock, Calendar, Check, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card variant="newspaper" className="h-full hover:shadow-lg transition-shadow group">
      <CardHeader className="pb-3">
        {/* Expiry badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-typewriter text-xs uppercase tracking-wider px-2 py-1 bg-paper-aged border border-rule-light">
            Expires in {job.expiresIn}
          </span>
          {job.hasCoverLetter && (
            <FileText className="w-4 h-4 text-stamp-red" />
          )}
        </div>
        
        {/* Job title */}
        <Link to={`/jobs/${job.id}`}>
          <h3 className="headline-tertiary group-hover:text-stamp-red transition-colors leading-tight">
            {job.title}
          </h3>
        </Link>
        
        {/* Company */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-8 h-8 bg-stamp-red text-primary-foreground flex items-center justify-center font-display font-bold text-sm">
            {job.companyInitial}
          </div>
          <span className="text-stamp-red font-display font-semibold">
            {job.company}
          </span>
          {job.isMatched && (
            <span className="ml-auto flex items-center gap-1 text-xs text-green-600 font-typewriter">
              <Check className="w-3 h-3" /> Match
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-ink-faded">
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
        <div className="inline-block px-2 py-1 border border-rule-dark text-xs font-typewriter uppercase">
          {job.level}
        </div>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 4).map((skill) => (
            <span 
              key={skill}
              className="px-2 py-0.5 bg-secondary text-xs font-serif text-subheadline"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-0.5 text-xs font-serif text-ink-faded">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
        
        {/* Match percentage bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-typewriter uppercase text-ink-faded">Match Score</span>
            <span className="font-display font-bold text-stamp-red">{job.matchPercentage}%</span>
          </div>
          <div className="h-2 bg-secondary overflow-hidden">
            <div 
              className="h-full bg-stamp-red transition-all"
              style={{ width: `${job.matchPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Action button */}
        <Button variant="newspaper" size="sm" className="w-full">
          Generate Cover Letter
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
