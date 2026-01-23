import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Copy, 
  Check, 
  RefreshCw,
  Sparkles,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface OutreachMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  companyName: string;
}

const OutreachMessageModal = ({ 
  isOpen, 
  onClose, 
  jobTitle, 
  companyName 
}: OutreachMessageModalProps) => {
  const [copiedPrimary, setCopiedPrimary] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedVariation, setCopiedVariation] = useState<string | null>(null);

  // Mock data - in a real app this would come from AI generation
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
              <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-background to-muted/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center">
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

              {/* Content */}
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

              {/* Footer Actions */}
              <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2 rounded-xl"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Different Options
                </Button>
                <Button 
                  size="default"
                  className="gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet hover:opacity-90 text-white border-0"
                >
                  Done
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OutreachMessageModal;
