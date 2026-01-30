import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RefreshCw, Sparkles, MessageCircle } from "lucide-react";

interface LinkedInOutreachProps {
  recipientName: string;
  recipientRole: string;
  companyName: string;
  jobTitle: string;
}

const toneOptions = [
  { id: "professional", label: "Professional", emoji: "💼" },
  { id: "friendly", label: "Friendly", emoji: "😊" },
  { id: "enthusiastic", label: "Enthusiastic", emoji: "🚀" },
];

const messageTemplates = {
  professional: (vars: LinkedInOutreachProps) => 
    `Hi ${vars.recipientName},

I noticed the ${vars.jobTitle} position at ${vars.companyName} and was impressed by the team's focus on web standards and accessibility.

With my experience in frontend development and passion for creating inclusive web experiences, I'd love to learn more about how ${vars.companyName} approaches user-centered design.

Would you be open to a brief conversation about the role and team culture?

Best regards`,

  friendly: (vars: LinkedInOutreachProps) => 
    `Hey ${vars.recipientName}! 👋

I came across the ${vars.jobTitle} role at ${vars.companyName} and got genuinely excited – the emphasis on team collaboration and web accessibility really resonates with me.

I've been building accessible, standards-compliant web apps for a while now, and ${vars.companyName}'s approach feels like a great match.

Would love to chat if you have a few minutes – no pressure at all!

Cheers`,

  enthusiastic: (vars: LinkedInOutreachProps) => 
    `Hi ${vars.recipientName}!

I'm really excited about the ${vars.jobTitle} opening at ${vars.companyName}! The role's focus on web standards and the team-first culture you've built is exactly what I've been looking for.

I bring strong frontend skills with a genuine passion for accessibility – and I'd be thrilled to contribute to what ${vars.companyName} is building.

Would you be open to connecting? I'd love to hear more about the team's vision!

Thanks so much`,
};

const LinkedInOutreach = ({
  recipientName: initialName,
  recipientRole,
  companyName,
  jobTitle,
}: LinkedInOutreachProps) => {
  const [tone, setTone] = useState("professional");
  const [recipientName, setRecipientName] = useState(initialName);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const message = messageTemplates[tone as keyof typeof messageTemplates]({
    recipientName,
    recipientRole,
    companyName,
    jobTitle,
  });

  const charCount = message.length;
  const maxChars = 300;
  const charPercentage = (charCount / maxChars) * 100;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Cycle through tones
    const toneKeys = Object.keys(messageTemplates);
    const currentIndex = toneKeys.indexOf(tone);
    const nextIndex = (currentIndex + 1) % toneKeys.length;
    setTone(toneKeys[nextIndex]);
    setTimeout(() => setIsRefreshing(false), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Tone Selector */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground font-medium">Tone:</span>
        <div className="flex gap-2">
          {toneOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setTone(option.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${tone === option.id 
                  ? "bg-accent-slate text-white shadow-lg" 
                  : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
            >
              {option.emoji} {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editable Name */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground font-medium">Recipient:</span>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-muted border border-border text-foreground text-sm
            focus:outline-none focus:ring-2 focus:ring-accent-slate/50 transition-all"
          placeholder="Contact name"
        />
        <span className="text-xs text-muted-foreground">({recipientRole})</span>
      </div>

      {/* Message Preview */}
      <div className="relative">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 
          border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-accent-slate" />
            <span className="text-sm font-medium text-foreground">Message Preview</span>
          </div>
          <motion.div
            key={tone + recipientName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="whitespace-pre-wrap text-foreground/90 leading-relaxed text-sm font-mono"
          >
            {message}
          </motion.div>
        </div>

        {/* Character counter */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
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
            <span className={`text-xs font-mono ${
              charPercentage > 100 ? "text-accent-rose" : "text-muted-foreground"
            }`}>
              {charCount}/{maxChars}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl
            bg-gradient-to-r from-accent-slate to-accent-blue text-white font-medium
            shadow-lg shadow-accent-slate/25 hover:shadow-xl transition-shadow"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Copy Message
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl
            bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <RefreshCw className="w-5 h-5" />
          </motion.div>
          Regenerate
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl
            border border-accent-violet/30 bg-accent-violet/10 text-accent-violet font-medium
            hover:bg-accent-violet/20 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          AI Enhance
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LinkedInOutreach;
