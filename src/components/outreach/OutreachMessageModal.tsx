import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Copy, 
  Check, 
  RefreshCw,
  Sparkles,
  Mail,
  Target,
  Trophy,
  AlertTriangle,
  Zap,
  Users,
  TrendingUp,
  ArrowRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface OutreachMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  companyName: string;
}

type ModalStep = "select" | "result";

interface PainPoint {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Proof {
  id: string;
  title: string;
  hasMetrics: boolean;
}

const OutreachMessageModal = ({ 
  isOpen, 
  onClose, 
  jobTitle, 
  companyName 
}: OutreachMessageModalProps) => {
  const [step, setStep] = useState<ModalStep>("select");
  const [selectedPainPoint, setSelectedPainPoint] = useState<string | null>(null);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [copiedPrimary, setCopiedPrimary] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedVariation, setCopiedVariation] = useState<string | null>(null);

  // Pain points data
  const painPoints: PainPoint[] = [
    {
      id: "scalability",
      title: "Frontend codebase lacks scalability and performance optimization",
      description: "Take responsibility for the frontend codebase integrity, applying best practices for scalability and performance",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "accent-rose"
    },
    {
      id: "ai-integration",
      title: "Need to rapidly integrate cutting-edge AI technologies into existing platform",
      description: "Engage with the latest advancements in frontend technologies and AI to find innovative solutions that can be integrated into our platform",
      icon: <Zap className="w-5 h-5" />,
      color: "accent-violet"
    },
    {
      id: "coordination",
      title: "Project delivery and milestone management issues requiring better coordination",
      description: "Organize and plan tasks, working closely with the rest of the team to ensure that project milestones and deadlines are met",
      icon: <Users className="w-5 h-5" />,
      color: "accent-blue"
    }
  ];

  // Proof achievements data
  const proofs: Proof[] = [
    {
      id: "migration",
      title: "Migrated legacy desktop app to Angular 16 web platform, reducing load times by 90%",
      hasMetrics: true
    },
    {
      id: "monorepo",
      title: "Structured project with Nx monorepo, improving scalability and build times",
      hasMetrics: false
    },
    {
      id: "performance",
      title: "Implemented lazy loading and code splitting, improving initial load by 60%",
      hasMetrics: true
    }
  ];

  // Generated message data
  const primaryMessage = `Scaling frontend infrastructure while maintaining code quality is tough when you're growing fast. I implemented NgRx + Component Store at my last role, which simplified debugging and made our codebase much more maintainable as we scaled. Worth a quick chat about ${companyName}'s frontend challenges?`;
  
  const subjectLine = "Frontend scaling without the technical debt";
  
  const variations = [
    {
      id: "a",
      label: "Variation A",
      message: `Rapid growth creates frontend technical debt fast. I've tackled this before – implemented NgRx + Component Store that simplified debugging and kept our codebase clean during scaling. Happy to discuss how this applies to ${companyName}'s infrastructure needs.`
    },
    {
      id: "b", 
      label: "Variation B",
      message: `Frontend infrastructure gets messy during rapid scaling. Recently solved this with NgRx + Component Store implementation that streamlined debugging and maintained code quality through growth phases. Could be relevant for ${companyName}'s current challenges.`
    }
  ];

  const charCount = primaryMessage.length;
  const wordCount = primaryMessage.split(/\s+/).length;
  const maxChars = 300;
  const progress = Math.min((charCount / maxChars) * 100, 100);
  const isOverLimit = charCount > maxChars;

  const handleCopy = async (text: string, type: 'primary' | 'subject' | string) => {
    await navigator.clipboard.writeText(text);
    if (type === 'primary') {
      setCopiedPrimary(true);
      setTimeout(() => setCopiedPrimary(false), 2000);
    } else if (type === 'subject') {
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } else {
      setCopiedVariation(type);
      setTimeout(() => setCopiedVariation(null), 2000);
    }
  };

  const handleGenerate = () => {
    if (selectedPainPoint && selectedProof) {
      setStep("result");
    }
  };

  const handleBack = () => {
    setStep("select");
  };

  const canGenerate = selectedPainPoint && selectedProof;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-x-4 top-[5%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-auto md:w-full md:max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-background via-background to-muted/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center shadow-lg shadow-accent-blue/20">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        Generate Outreach Message
                      </h2>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Create a personalized message for {jobTitle} at {companyName}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === "select" ? (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Selection Content */}
                    <div className="p-6 space-y-6">
                      {/* Pain Points Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-accent-rose" />
                          <h3 className="font-semibold text-foreground">Select a pain point to address</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          These challenges were identified from the job posting
                        </p>
                        
                        <div className="space-y-3">
                          {painPoints.map((point, index) => {
                            const isSelected = selectedPainPoint === point.id;
                            const colorClasses = {
                              "accent-rose": {
                                border: isSelected ? "border-accent-rose" : "border-border hover:border-accent-rose/40",
                                bg: isSelected ? "bg-accent-rose/5" : "bg-card hover:bg-accent-rose/5",
                                icon: "text-accent-rose",
                                title: isSelected ? "text-accent-rose" : "text-foreground"
                              },
                              "accent-violet": {
                                border: isSelected ? "border-accent-violet" : "border-border hover:border-accent-violet/40",
                                bg: isSelected ? "bg-accent-violet/5" : "bg-card hover:bg-accent-violet/5",
                                icon: "text-accent-violet",
                                title: isSelected ? "text-accent-violet" : "text-foreground"
                              },
                              "accent-blue": {
                                border: isSelected ? "border-accent-blue" : "border-border hover:border-accent-blue/40",
                                bg: isSelected ? "bg-accent-blue/5" : "bg-card hover:bg-accent-blue/5",
                                icon: "text-accent-blue",
                                title: isSelected ? "text-accent-blue" : "text-foreground"
                              }
                            };
                            const colors = colorClasses[point.color as keyof typeof colorClasses];
                            
                            return (
                              <motion.button
                                key={point.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedPainPoint(point.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${colors.border} ${colors.bg}`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`mt-0.5 ${colors.icon}`}>
                                    {point.icon}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className={`font-medium leading-snug mb-1.5 ${colors.title}`}>
                                      {point.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                                      "{point.description}"
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className={`w-6 h-6 rounded-full flex items-center justify-center ${colors.icon} bg-current/10`}
                                    >
                                      <Check className="w-4 h-4 text-current" />
                                    </motion.div>
                                  )}
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                      {/* Proof Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="w-4 h-4 text-accent-amber" />
                          <h3 className="font-semibold text-foreground">Select your proof</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Choose an achievement that demonstrates your ability to solve this challenge
                        </p>
                        
                        <div className="space-y-3">
                          {proofs.map((proof, index) => {
                            const isSelected = selectedProof === proof.id;
                            
                            return (
                              <motion.button
                                key={proof.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + index * 0.05 }}
                                onClick={() => setSelectedProof(proof.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                                  isSelected 
                                    ? "border-accent-amber bg-accent-amber/5" 
                                    : "border-border bg-card hover:border-accent-amber/40 hover:bg-accent-amber/5"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`mt-0.5 ${isSelected ? "text-accent-amber" : "text-muted-foreground"}`}>
                                    <TrendingUp className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className={`font-medium leading-snug ${isSelected ? "text-accent-amber" : "text-foreground"}`}>
                                        {proof.title}
                                      </span>
                                      {proof.hasMetrics && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
                                          <Sparkles className="w-3 h-3" />
                                          Has metrics
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-6 h-6 rounded-full flex items-center justify-center bg-accent-amber/10"
                                    >
                                      <Check className="w-4 h-4 text-accent-amber" />
                                    </motion.div>
                                  )}
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions - Select Step */}
                    <div className="px-6 py-4 border-t border-border bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          onClick={onClose}
                          className="flex-1 rounded-xl h-12"
                        >
                          Back
                        </Button>
                        <Button 
                          onClick={handleGenerate}
                          disabled={!canGenerate}
                          className={`flex-1 gap-2 rounded-xl h-12 transition-all duration-300 ${
                            canGenerate 
                              ? "bg-gradient-to-r from-accent-blue to-accent-violet hover:opacity-90 text-white border-0 shadow-lg shadow-accent-blue/20" 
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          Generate Message
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Result Content */}
                    <div className="p-6 space-y-5">
                      {/* Primary Message Card */}
                      <div className="rounded-xl border-2 border-accent-blue/20 bg-gradient-to-br from-accent-blue/5 to-transparent p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-accent-blue" />
                            <span className="font-semibold text-foreground">Primary Message</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">
                              {charCount} chars / {wordCount} words
                            </span>
                            <button
                              onClick={() => handleCopy(primaryMessage, 'primary')}
                              className="w-8 h-8 rounded-lg hover:bg-accent-blue/10 flex items-center justify-center text-muted-foreground hover:text-accent-blue transition-all"
                            >
                              {copiedPrimary ? (
                                <Check className="w-4 h-4 text-accent-emerald" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-foreground leading-relaxed mb-4">
                          {primaryMessage}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="space-y-1.5">
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className={`h-full rounded-full ${
                                isOverLimit 
                                  ? 'bg-stamp-red' 
                                  : progress > 80 
                                    ? 'bg-accent-amber' 
                                    : 'bg-accent-emerald'
                              }`}
                            />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className={isOverLimit ? 'text-stamp-red font-medium' : 'text-muted-foreground'}>
                              {charCount} characters
                            </span>
                            <span className="text-accent-blue font-medium">
                              {wordCount} words
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Subject Line Card */}
                      <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-accent-violet" />
                            <span className="text-sm font-medium text-accent-violet">Subject Line</span>
                          </div>
                          <button
                            onClick={() => handleCopy(subjectLine, 'subject')}
                            className="w-8 h-8 rounded-lg hover:bg-accent-violet/10 flex items-center justify-center text-muted-foreground hover:text-accent-violet transition-all"
                          >
                            {copiedSubject ? (
                              <Check className="w-4 h-4 text-accent-emerald" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-foreground font-medium">{subjectLine}</p>
                      </div>

                      {/* Variations Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">Variations</h3>
                        <div className="space-y-3">
                          {variations.map((variation) => (
                            <div 
                              key={variation.id}
                              className="rounded-xl border border-border bg-card hover:border-accent-slate/40 transition-colors p-5"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-accent-amber">
                                  {variation.label}
                                </span>
                                <button
                                  onClick={() => handleCopy(variation.message, variation.id)}
                                  className="w-8 h-8 rounded-lg hover:bg-accent-amber/10 flex items-center justify-center text-muted-foreground hover:text-accent-amber transition-all"
                                >
                                  {copiedVariation === variation.id ? (
                                    <Check className="w-4 h-4 text-accent-emerald" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                              <p className="text-foreground/90 text-sm leading-relaxed">
                                {variation.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions - Result Step */}
                    <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleBack}
                        className="gap-2 rounded-xl"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Change Selection
                      </Button>
                      <Button 
                        size="default"
                        onClick={onClose}
                        className="gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet hover:opacity-90 text-white border-0"
                      >
                        Done
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OutreachMessageModal;
