import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Fingerprint,
  Target,
  TrendingUp,
  UserCheck,
  FileText,
  Send,
  Sparkles,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  languageFingerprint,
  requirements,
  hiddenPriorities,
  technicalSkills,
  softSkills,
  domainExpertise,
  achievements,
  resumeBullets,
} from "@/data/coachingData";

// Command Center Panel Component
interface PanelProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: "blue" | "violet" | "amber" | "rose" | "emerald" | "slate";
  children: React.ReactNode;
  className?: string;
}

const accentConfig = {
  blue: {
    bg: "bg-accent-blue/5",
    border: "border-accent-blue/20",
    glow: "shadow-[0_0_30px_-5px] shadow-accent-blue/20",
    iconBg: "bg-accent-blue/10",
    iconText: "text-accent-blue",
    headerBorder: "border-accent-blue/30",
  },
  violet: {
    bg: "bg-accent-violet/5",
    border: "border-accent-violet/20",
    glow: "shadow-[0_0_30px_-5px] shadow-accent-violet/20",
    iconBg: "bg-accent-violet/10",
    iconText: "text-accent-violet",
    headerBorder: "border-accent-violet/30",
  },
  amber: {
    bg: "bg-accent-amber/5",
    border: "border-accent-amber/20",
    glow: "shadow-[0_0_30px_-5px] shadow-accent-amber/20",
    iconBg: "bg-accent-amber/10",
    iconText: "text-accent-amber",
    headerBorder: "border-accent-amber/30",
  },
  rose: {
    bg: "bg-accent-rose/5",
    border: "border-accent-rose/20",
    glow: "shadow-[0_0_30px_-5px] shadow-accent-rose/20",
    iconBg: "bg-accent-rose/10",
    iconText: "text-accent-rose",
    headerBorder: "border-accent-rose/30",
  },
  emerald: {
    bg: "bg-accent-emerald/5",
    border: "border-accent-emerald/20",
    glow: "shadow-[0_0_30px_-5px] shadow-accent-emerald/20",
    iconBg: "bg-accent-emerald/10",
    iconText: "text-accent-emerald",
    headerBorder: "border-accent-emerald/30",
  },
  slate: {
    bg: "bg-accent-slate/5",
    border: "border-accent-slate/20",
    glow: "shadow-[0_0_30px_-5px] shadow-accent-slate/20",
    iconBg: "bg-accent-slate/10",
    iconText: "text-accent-slate",
    headerBorder: "border-accent-slate/30",
  },
};

const Panel = ({ title, subtitle, icon, accentColor, children, className = "" }: PanelProps) => {
  const colors = accentConfig[accentColor];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border ${colors.border} ${colors.bg} ${colors.glow} 
        backdrop-blur-sm overflow-hidden ${className}`}
    >
      {/* Panel Header */}
      <div className={`p-4 border-b ${colors.headerBorder} flex items-center gap-3`}>
        <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
          <span className={colors.iconText}>{icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      
      {/* Panel Content */}
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};

// Keyword Tag Component
const KeywordTag = ({ 
  word, 
  variant = "default" 
}: { 
  word: string; 
  variant?: "power" | "jargon" | "culture" | "default" 
}) => {
  const variantStyles = {
    power: "bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30",
    jargon: "bg-accent-blue/15 text-accent-blue border-accent-blue/30",
    culture: "bg-accent-violet/15 text-accent-violet border-accent-violet/30",
    default: "bg-muted text-muted-foreground border-border",
  };
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${variantStyles[variant]}`}>
      {word}
    </span>
  );
};

// Requirement Row Component
const RequirementRow = ({ 
  text, 
  priority, 
  matched, 
  insight 
}: { 
  text: string; 
  priority: "high" | "medium" | "low"; 
  matched: boolean; 
  insight?: string;
}) => {
  const priorityColors = {
    high: "text-accent-rose",
    medium: "text-accent-amber",
    low: "text-muted-foreground",
  };
  
  return (
    <div className="p-3 rounded-xl bg-background/50 border border-border/50 space-y-2">
      <div className="flex items-start gap-3">
        {matched ? (
          <CheckCircle2 className="w-4 h-4 text-accent-emerald mt-0.5 shrink-0" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-accent-amber mt-0.5 shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground leading-relaxed">{text}</p>
          {insight && (
            <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1.5">
              <Lightbulb className="w-3 h-3 mt-0.5 shrink-0 text-accent-amber" />
              {insight}
            </p>
          )}
        </div>
        <span className={`text-xs font-medium uppercase ${priorityColors[priority]}`}>
          {priority}
        </span>
      </div>
    </div>
  );
};

// Priority Card Component
const PriorityCard = ({ 
  keyword, 
  count, 
  context, 
  insight,
  color 
}: { 
  keyword: string; 
  count: number; 
  context: string;
  insight: string;
  color: "emerald" | "violet" | "amber";
}) => {
  const colorStyles = {
    emerald: "from-accent-emerald/20 to-accent-emerald/5 border-accent-emerald/30",
    violet: "from-accent-violet/20 to-accent-violet/5 border-accent-violet/30",
    amber: "from-accent-amber/20 to-accent-amber/5 border-accent-amber/30",
  };
  
  const textColors = {
    emerald: "text-accent-emerald",
    violet: "text-accent-violet",
    amber: "text-accent-amber",
  };
  
  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${colorStyles[color]} border`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`font-semibold ${textColors[color]}`}>"{keyword}"</span>
        <span className="text-xs bg-background/80 px-2 py-0.5 rounded-full">
          ×{count}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{context}</p>
      <p className="text-xs text-foreground/80 flex items-start gap-1.5">
        <Sparkles className="w-3 h-3 mt-0.5 shrink-0 text-accent-amber" />
        {insight}
      </p>
    </div>
  );
};

// Resume Bullet Transform Component
const BulletTransform = ({ 
  original, 
  enhanced, 
  keywords,
  category 
}: { 
  original: string; 
  enhanced: string; 
  keywords: string[];
  category: string;
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(enhanced);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-3 p-4 rounded-xl bg-background/50 border border-border/50">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {category}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 text-xs"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 mr-1 text-accent-emerald" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      
      {/* Original */}
      <div className="p-3 rounded-lg bg-muted/50 border border-border/30">
        <p className="text-sm text-muted-foreground line-through decoration-1">{original}</p>
      </div>
      
      {/* Enhanced */}
      <div className="p-3 rounded-lg bg-accent-emerald/10 border border-accent-emerald/30">
        <p className="text-sm text-foreground font-medium">{enhanced}</p>
      </div>
      
      {/* Keywords */}
      <div className="flex flex-wrap gap-1.5">
        {keywords.map((kw) => (
          <span 
            key={kw} 
            className="px-2 py-0.5 rounded-full bg-accent-blue/15 text-accent-blue text-xs"
          >
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
};

// Skill Fit Item Component
const SkillFitItem = ({ 
  text, 
  evidence, 
  hasIdea 
}: { 
  text: string; 
  evidence?: string | null; 
  hasIdea?: boolean;
}) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-background/50 transition-colors">
      {evidence ? (
        <CheckCircle2 className="w-4 h-4 text-accent-emerald mt-0.5 shrink-0" />
      ) : hasIdea ? (
        <Lightbulb className="w-4 h-4 text-accent-amber mt-0.5 shrink-0" />
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 mt-0.5 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{text}</p>
        {evidence && (
          <p className="text-xs text-accent-emerald mt-1">✓ {evidence}</p>
        )}
      </div>
    </div>
  );
};

// LinkedIn Message Component
const LinkedInMessage = () => {
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<"professional" | "friendly" | "enthusiastic">("professional");
  
  const messages = {
    professional: `Hi [Hiring Manager],

I came across the Frontend Developer position at Choice Hotels and was impressed by your team's focus on web standards and accessibility.

With my experience in React, WCAG 2.1 compliance, and collaborative team environments, I believe I could contribute meaningfully to your ecommerce initiatives.

Would you be open to a brief conversation about the role?

Best regards`,
    friendly: `Hey [Hiring Manager]!

I just saw your Frontend Developer opening and had to reach out – your emphasis on team collaboration and web accessibility really resonates with me.

I've spent years building React apps with a focus on clean, semantic code, and I'd love to chat about how I could help your team.

Would you be up for a quick call sometime?

Cheers`,
    enthusiastic: `Hi [Hiring Manager]!

I'm genuinely excited about the Frontend Developer role at Choice Hotels! Your commitment to web standards and creating inclusive digital experiences aligns perfectly with my passion.

I've driven accessibility initiatives and built performant React applications – and I can't wait to bring that energy to your team!

Could we connect to discuss how I can contribute?

Thanks so much`,
  };
  
  const charCount = messages[tone].length;
  const maxChars = 300;
  const charPercentage = (charCount / maxChars) * 100;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(messages[tone]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-4">
      {/* Tone Selector */}
      <div className="flex gap-2">
        {(["professional", "friendly", "enthusiastic"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTone(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all
              ${tone === t 
                ? "bg-accent-blue text-white" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
          >
            {t}
          </button>
        ))}
      </div>
      
      {/* Message */}
      <div className="relative">
        <textarea
          value={messages[tone]}
          readOnly
          className="w-full h-48 p-4 rounded-xl bg-background/80 border border-border/50 
            text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent-blue/30"
        />
        
        {/* Character Counter */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{charCount} characters</span>
            <span className={charPercentage > 100 ? "text-accent-rose" : ""}>
              {charPercentage > 100 ? "Too long!" : `${Math.round(charPercentage)}%`}
            </span>
          </div>
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(charPercentage, 100)}%` }}
              className={`h-full rounded-full transition-colors ${
                charPercentage > 100 
                  ? "bg-accent-rose" 
                  : charPercentage > 80 
                    ? "bg-accent-amber" 
                    : "bg-accent-emerald"
              }`}
            />
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={handleCopy} className="flex-1">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Message
            </>
          )}
        </Button>
        <Button variant="outline" className="gap-2">
          <Zap className="w-4 h-4" />
          AI Enhance
        </Button>
      </div>
    </div>
  );
};

// Match Score Ring Component
const MatchScoreRing = ({ score }: { score: number }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="56"
          cy="56"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/30"
        />
        <motion.circle
          cx="56"
          cy="56"
          r="45"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent-emerald))" />
            <stop offset="100%" stopColor="hsl(var(--accent-blue))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-foreground"
        >
          {score}%
        </motion.span>
        <span className="text-xs text-muted-foreground">Match</span>
      </div>
    </div>
  );
};

const JobCoachingV2 = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/jobs/${id}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Job
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="font-semibold text-foreground">Frontend Developer</h1>
              <p className="text-xs text-muted-foreground">Choice Hotels • Command Center</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-emerald/10 border border-accent-emerald/30">
              <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span className="text-xs font-medium text-accent-emerald">85% Match</span>
            </div>
            <Link to={`/jobs/${id}/cover-letter`}>
              <Button size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                Generate Cover Letter
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Dashboard Grid */}
      <main className="max-w-[1800px] mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          
          {/* Left Column - Analysis Panels */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            {/* Match Score */}
            <Panel
              title="Match Score"
              subtitle="Overall compatibility"
              icon={<Target className="w-5 h-5" />}
              accentColor="emerald"
            >
              <MatchScoreRing score={85} />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Technical Skills</span>
                  <span className="text-accent-emerald font-medium">90%</span>
                </div>
                <Progress value={90} className="h-1.5" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Soft Skills</span>
                  <span className="text-accent-blue font-medium">80%</span>
                </div>
                <Progress value={80} className="h-1.5" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Domain Knowledge</span>
                  <span className="text-accent-violet font-medium">75%</span>
                </div>
                <Progress value={75} className="h-1.5" />
              </div>
            </Panel>
            
            {/* Language Fingerprint */}
            <Panel
              title="Language Fingerprint"
              subtitle="Key phrases & style"
              icon={<Fingerprint className="w-5 h-5" />}
              accentColor="blue"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Power Verbs</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {languageFingerprint.powerVerbs.map((verb) => (
                      <KeywordTag key={verb} word={verb} variant="power" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Technical Jargon</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {languageFingerprint.jargon.slice(0, 6).map((term) => (
                      <KeywordTag key={term} word={term} variant="jargon" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Culture Signals</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {languageFingerprint.cultureSignals.slice(0, 3).map((signal) => (
                      <KeywordTag key={signal} word={signal} variant="culture" />
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
            
            {/* Hidden Priorities */}
            <Panel
              title="Hidden Priorities"
              subtitle="What they really want"
              icon={<TrendingUp className="w-5 h-5" />}
              accentColor="violet"
            >
              <div className="space-y-3">
                {hiddenPriorities.map((priority) => (
                  <PriorityCard
                    key={priority.keyword}
                    keyword={priority.keyword}
                    count={priority.count}
                    context={priority.context}
                    insight={priority.insight}
                    color={priority.color}
                  />
                ))}
              </div>
            </Panel>
          </div>
          
          {/* Center Column - Main Content */}
          <div className="col-span-12 lg:col-span-6 space-y-4">
            {/* Requirements Analysis */}
            <Panel
              title="Requirements Analysis"
              subtitle="Key qualifications decoded"
              icon={<Target className="w-5 h-5" />}
              accentColor="amber"
              className="lg:sticky lg:top-20"
            >
              <div className="space-y-3">
                {requirements.map((req, i) => (
                  <RequirementRow
                    key={i}
                    text={req.text}
                    priority={req.priority}
                    matched={req.matched}
                    insight={req.insight}
                  />
                ))}
              </div>
            </Panel>
            
            {/* Skill Fit Analysis */}
            <Panel
              title="Skill Fit Analysis"
              subtitle="Your qualifications mapped"
              icon={<UserCheck className="w-5 h-5" />}
              accentColor="emerald"
            >
              <Tabs defaultValue="technical" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="technical" className="flex-1">Technical</TabsTrigger>
                  <TabsTrigger value="soft" className="flex-1">Soft Skills</TabsTrigger>
                  <TabsTrigger value="domain" className="flex-1">Domain</TabsTrigger>
                </TabsList>
                
                <TabsContent value="technical" className="space-y-1">
                  {technicalSkills.map((skill, i) => (
                    <SkillFitItem
                      key={i}
                      text={skill.text}
                      evidence={skill.evidence}
                      hasIdea={skill.hasIdea}
                    />
                  ))}
                </TabsContent>
                
                <TabsContent value="soft" className="space-y-1">
                  {softSkills.map((skill, i) => (
                    <SkillFitItem
                      key={i}
                      text={skill.text}
                      evidence={skill.evidence}
                    />
                  ))}
                </TabsContent>
                
                <TabsContent value="domain" className="space-y-1">
                  {domainExpertise.map((skill, i) => (
                    <SkillFitItem
                      key={i}
                      text={skill.text}
                      evidence={skill.evidence}
                      hasIdea={skill.hasIdea}
                    />
                  ))}
                </TabsContent>
              </Tabs>
            </Panel>
            
            {/* Resume Bullets */}
            <Panel
              title="Enhanced Resume Bullets"
              subtitle="Tailored for this role"
              icon={<FileText className="w-5 h-5" />}
              accentColor="rose"
            >
              <div className="space-y-4">
                {resumeBullets.map((bullet, i) => (
                  <BulletTransform
                    key={i}
                    original={bullet.original}
                    enhanced={bullet.enhanced}
                    keywords={bullet.keywords}
                    category={bullet.category}
                  />
                ))}
              </div>
            </Panel>
          </div>
          
          {/* Right Column - Action Panels */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            {/* LinkedIn Outreach */}
            <Panel
              title="LinkedIn Outreach"
              subtitle="Ready-to-send message"
              icon={<Send className="w-5 h-5" />}
              accentColor="blue"
              className="lg:sticky lg:top-20"
            >
              <LinkedInMessage />
            </Panel>
            
            {/* Quick Actions */}
            <Panel
              title="Quick Actions"
              subtitle="Next steps"
              icon={<Sparkles className="w-5 h-5" />}
              accentColor="slate"
            >
              <div className="space-y-2">
                <Link to={`/jobs/${id}/cover-letter`} className="block">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <FileText className="w-4 h-4" />
                    Generate Cover Letter
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <MessageSquare className="w-4 h-4" />
                  Practice Interview
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Target className="w-4 h-4" />
                  Identify Skill Gaps
                </Button>
              </div>
            </Panel>
            
            {/* Tips */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent-amber/10 to-accent-rose/10 
              border border-accent-amber/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-amber/20 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4 text-accent-amber" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-1">Pro Tip</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Focus on their emphasis on "team environment" – mention specific 
                    collaboration experiences in your cover letter and interview.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default JobCoachingV2;
