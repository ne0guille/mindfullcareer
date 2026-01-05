import { Briefcase, Link, ClipboardPaste } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const JobPostingCard = () => {
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [activeTab, setActiveTab] = useState<'url' | 'paste'>('url');

  return (
    <Card variant="headline" className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-stamp-red" />
          Job Posting
        </CardTitle>
        <CardDescription>
          Paste the position details for matching analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Tab switcher */}
        <div className="flex border-b border-rule-light mb-4">
          <button
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-2 px-4 py-2 font-display text-sm uppercase tracking-wide transition-all
              ${activeTab === 'url' 
                ? 'border-b-2 border-stamp-red text-headline' 
                : 'text-ink-faded hover:text-headline'
              }`}
          >
            <Link className="w-4 h-4" />
            Job URL
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex items-center gap-2 px-4 py-2 font-display text-sm uppercase tracking-wide transition-all
              ${activeTab === 'paste' 
                ? 'border-b-2 border-stamp-red text-headline' 
                : 'text-ink-faded hover:text-headline'
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
              className="w-full px-4 py-3 bg-paper-aged border border-rule-light focus:border-rule-dark focus:outline-none font-serif text-headline placeholder:text-ink-faded"
            />
            <p className="text-xs text-ink-faded italic">
              We'll extract the job details automatically from the posting
            </p>
          </div>
        ) : (
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={5}
            className="w-full px-4 py-3 bg-paper-aged border border-rule-light focus:border-rule-dark focus:outline-none font-serif text-headline placeholder:text-ink-faded resize-none"
          />
        )}

        <Button variant="newspaper" className="w-full mt-4" size="lg">
          Extract & Match
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobPostingCard;
