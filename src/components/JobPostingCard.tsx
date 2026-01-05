import { Target, Link, ClipboardPaste } from "lucide-react";
import ThemedCard from "@/components/ThemedCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const JobPostingCard = () => {
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [activeTab, setActiveTab] = useState<'url' | 'paste'>('url');

  return (
    <ThemedCard variant="highlight" className="h-full">
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-1">
          <Target className="w-5 h-5 text-primary" />
          Opportunity Details
        </h3>
        <p className="text-sm text-muted-foreground">
          Share the opportunity you are exploring
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-border mb-4">
        <button
          onClick={() => setActiveTab('url')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all
            ${activeTab === 'url'
              ? "border-b-2 border-primary text-foreground"
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Link className="w-4 h-4" />
          Job URL
        </button>
        <button
          onClick={() => setActiveTab('paste')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all
            ${activeTab === 'paste'
              ? "border-b-2 border-primary text-foreground"
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <ClipboardPaste className="w-4 h-4" />
          Paste Text
        </button>
      </div>

      {activeTab === 'url' ? (
        <div className="space-y-4">
          <input
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            placeholder="https://company.com/careers/position..."
            className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:border-primary focus:outline-none"
          />
          <p className="text-xs text-muted-foreground italic">
            We will extract the job details automatically from the posting
          </p>
        </div>
      ) : (
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          rows={5}
          className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:border-primary focus:outline-none resize-none"
        />
      )}

      <Button
        variant="default"
        className="w-full mt-4"
        size="lg"
      >
        Find Alignment
      </Button>
    </ThemedCard>
  );
};

export default JobPostingCard;
