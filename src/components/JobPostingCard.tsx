import { Briefcase, Link, ClipboardPaste, Target, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import ThemedCard from "@/components/ThemedCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const JobPostingCard = () => {
  const { theme } = useTheme();
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [activeTab, setActiveTab] = useState<'url' | 'paste'>('url');

  const icons = {
    newspaper: Briefcase,
    zen: Target,
    cyber: Zap,
  };

  const Icon = icons[theme];

  return (
    <ThemedCard variant="highlight" className="h-full">
      <div className="mb-4">
        <h3 className={`flex items-center gap-2 text-lg font-semibold mb-1 ${
          theme === "cyber" ? "text-primary cyber-mono uppercase" : ""
        }`}>
          <Icon className={`w-5 h-5 ${theme === "cyber" ? "text-primary" : "text-primary"}`} />
          {theme === "cyber" ? "JOB_INPUT" : theme === "zen" ? "Opportunity Details" : "Job Posting"}
        </h3>
        <p className={`text-sm ${theme === "cyber" ? "cyber-mono text-muted-foreground" : "text-muted-foreground"}`}>
          {theme === "cyber" 
            ? "> Paste position data for matching"
            : theme === "zen"
              ? "Share the opportunity you are exploring"
              : "Paste the position details for matching analysis"
          }
        </p>
      </div>
      
      {/* Tab switcher */}
      <div className={`flex border-b mb-4 ${theme === "cyber" ? "border-primary/30" : "border-border"}`}>
        <button
          onClick={() => setActiveTab('url')}
          className={`flex items-center gap-2 px-4 py-2 text-sm transition-all
            ${theme === "cyber" ? "cyber-mono uppercase" : "font-medium"}
            ${activeTab === 'url' 
              ? `border-b-2 border-primary ${theme === "cyber" ? "text-primary" : "text-foreground"}` 
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Link className="w-4 h-4" />
          {theme === "cyber" ? "URL" : "Job URL"}
        </button>
        <button
          onClick={() => setActiveTab('paste')}
          className={`flex items-center gap-2 px-4 py-2 text-sm transition-all
            ${theme === "cyber" ? "cyber-mono uppercase" : "font-medium"}
            ${activeTab === 'paste' 
              ? `border-b-2 border-primary ${theme === "cyber" ? "text-primary" : "text-foreground"}` 
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <ClipboardPaste className="w-4 h-4" />
          {theme === "cyber" ? "PASTE" : "Paste Text"}
        </button>
      </div>

      {activeTab === 'url' ? (
        <div className="space-y-4">
          <input
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            placeholder={theme === "cyber" ? "https://..." : "https://company.com/careers/position..."}
            className={`w-full px-4 py-3 bg-muted border focus:border-primary focus:outline-none ${
              theme === "zen" ? "rounded-lg border-border" : "border-border"
            } ${theme === "cyber" ? "cyber-mono" : ""}`}
          />
          <p className={`text-xs text-muted-foreground ${theme === "cyber" ? "cyber-mono" : "italic"}`}>
            {theme === "cyber" 
              ? "> Auto-extract job data from URL"
              : "We will extract the job details automatically from the posting"
            }
          </p>
        </div>
      ) : (
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder={theme === "cyber" ? "> Paste job description..." : "Paste the full job description here..."}
          rows={5}
          className={`w-full px-4 py-3 bg-muted border focus:border-primary focus:outline-none resize-none ${
            theme === "zen" ? "rounded-lg border-border" : "border-border"
          } ${theme === "cyber" ? "cyber-mono" : ""}`}
        />
      )}

      <Button 
        variant={theme === "cyber" ? "default" : "default"} 
        className={`w-full mt-4 ${theme === "cyber" ? "cyber-mono uppercase" : ""}`}
        size="lg"
      >
        {theme === "cyber" ? "EXTRACT_&_MATCH" : theme === "zen" ? "Find Alignment" : "Extract & Match"}
      </Button>
    </ThemedCard>
  );
};

export default JobPostingCard;
