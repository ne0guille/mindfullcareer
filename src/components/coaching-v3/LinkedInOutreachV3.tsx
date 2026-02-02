import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, RefreshCw, Sparkles, MessageCircle, Send, User } from "lucide-react";

interface LinkedInOutreachV3Props {
  recipientName: string;
  recipientRole: string;
  companyName: string;
  jobTitle: string;
}

const toneOptions = [
  { id: "professional", label: "Professional", emoji: "💼", color: "blue" },
  { id: "friendly", label: "Friendly", emoji: "😊", color: "emerald" },
  { id: "enthusiastic", label: "Enthusiastic", emoji: "🚀", color: "violet" },
];

const messageTemplates = {
  professional: (vars: LinkedInOutreachV3Props) =>
    `Hi ${vars.recipientName},

I noticed the ${vars.jobTitle} position at ${vars.companyName} and was impressed by the team's focus on web standards and accessibility.

With my experience in frontend development and passion for creating inclusive web experiences, I'd love to learn more about how ${vars.companyName} approaches user-centered design.

Would you be open to a brief conversation about the role and team culture?

Best regards`,

  friendly: (vars: LinkedInOutreachV3Props) =>
    `Hey ${vars.recipientName}! 👋

I came across the ${vars.jobTitle} role at ${vars.companyName} and got genuinely excited – the emphasis on team collaboration and web accessibility really resonates with me.

I've been building accessible, standards-compliant web apps for a while now, and ${vars.companyName}'s approach feels like a great match.

Would love to chat if you have a few minutes – no pressure at all!

Cheers`,

  enthusiastic: (vars: LinkedInOutreachV3Props) =>
    `Hi ${vars.recipientName}!

I'm really excited about the ${vars.jobTitle} opening at ${vars.companyName}! The role's focus on web standards and the team-first culture you've built is exactly what I've been looking for.

I bring strong frontend skills with a genuine passion for accessibility – and I'd be thrilled to contribute to what ${vars.companyName} is building.

Would you be open to connecting? I'd love to hear more about the team's vision!

Thanks so much`,
};

const LinkedInOutreachV3 = ({
  recipientName: initialName,
  recipientRole,
  companyName,
  jobTitle,
}: LinkedInOutreachV3Props) => {
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

  const currentTone = toneOptions.find((t) => t.id === tone);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
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
      {/* Tone Selector - Pill Style */}
      <div className="flex flex-wrap items-center gap-2">
        {toneOptions.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => setTone(option.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all overflow-hidden
              ${tone === option.id
                ? "text-white shadow-lg"
                : "bg-muted/50 hover:bg-muted text-foreground border border-border/50"
              }`}
          >
            {tone === option.id && (
              <motion.div
                layoutId="toneBg"
                className={`absolute inset-0 ${
                  option.color === "blue"
                    ? "bg-gradient-to-r from-accent-blue to-accent-slate"
                    : option.color === "emerald"
                    ? "bg-gradient-to-r from-accent-emerald to-accent-blue"
                    : "bg-gradient-to-r from-accent-violet to-accent-rose"
                }`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {option.emoji} {option.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Editable Recipient */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50"
      >
        <div className="p-2 rounded-lg bg-accent-slate/10 border border-accent-slate/20">
          <User className="w-4 h-4 text-accent-slate" />
        </div>
        <div className="flex-1">
          <label className="text-xs text-muted-foreground block mb-1">Reaching out to</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full bg-transparent text-foreground font-medium text-sm
              focus:outline-none placeholder:text-muted-foreground/50"
            placeholder="Contact name"
          />
        </div>
        <span className="text-xs text-muted-foreground px-2 py-1 rounded-md bg-muted/50">
          {recipientRole}
        </span>
      </motion.div>

      {/* Message Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div
          className="relative rounded-2xl overflow-hidden border border-border/50
            bg-gradient-to-br from-card/80 via-card/60 to-muted/30 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-muted/20">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-accent-blue" />
              <span className="text-sm font-medium text-foreground">LinkedIn Message</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTone?.id}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-xs text-muted-foreground"
              >
                {currentTone?.emoji} {currentTone?.label} tone
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Message Body */}
          <div className="p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={tone + recipientName}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="whitespace-pre-wrap text-foreground/90 leading-relaxed text-sm"
              >
                {message}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer with char count */}
          <div className="px-5 py-3 border-t border-border/50 bg-muted/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
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
                <span
                  className={`text-xs font-mono ${
                    charPercentage > 100 ? "text-accent-rose" : "text-muted-foreground"
                  }`}
                >
                  {charCount}/{maxChars}
                </span>
              </div>
              {charPercentage > 100 && (
                <span className="text-xs text-accent-rose">Consider shortening</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px hsl(var(--accent-slate) / 0.4)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
            bg-gradient-to-r from-accent-slate to-accent-blue text-white font-medium
            shadow-lg transition-all"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <Copy className="w-5 h-5" />
                Copy Message
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl
            bg-muted/50 hover:bg-muted text-foreground font-medium border border-border/50 transition-colors"
        >
          <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 0.3 }}>
            <RefreshCw className="w-5 h-5" />
          </motion.div>
          <span className="hidden sm:inline">Regenerate</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl
            border border-accent-violet/30 bg-accent-violet/10 text-accent-violet font-medium
            hover:bg-accent-violet/20 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          <span className="hidden sm:inline">AI Enhance</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl
            border border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald font-medium
            hover:bg-accent-emerald/20 transition-colors"
        >
          <Send className="w-5 h-5" />
          <span className="hidden sm:inline">Open LinkedIn</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LinkedInOutreachV3;
