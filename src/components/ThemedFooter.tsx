import { useTheme } from "@/contexts/ThemeContext";

const ThemedFooter = () => {
  const { theme, themeName } = useTheme();

  // Newspaper Footer
  if (theme === "newspaper") {
    return (
      <footer className="border-t-4 border-double border-rule-dark mt-12">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="font-display text-2xl text-headline mb-2">{themeName.toUpperCase()}</p>
            <p className="text-sm text-ink-faded font-serif">
              © 2025 All Rights Reserved • Your Success Is Our Headline
            </p>
            <div className="mt-4 flex justify-center gap-6 text-xs uppercase tracking-wider text-ink-faded">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Zen Footer
  if (theme === "zen") {
    return (
      <footer className="mt-16 py-12 bg-card/50 backdrop-blur-sm border-t border-border/50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-lg">🌿</span>
              </div>
              <span className="font-semibold text-lg text-headline">{themeName}</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Take a deep breath. Your next opportunity awaits.
            </p>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Contact</span>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              © 2025 {themeName}. Find peace in your career journey.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  // Cyber Footer
  return (
    <footer className="mt-16 py-12 bg-card/50 backdrop-blur-md border-t border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" />
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <p className="cyber-mono text-xl text-primary cyber-text-glow uppercase tracking-widest mb-4">
            {themeName}
          </p>
          <p className="cyber-mono text-sm text-muted-foreground mb-6">
            {">"} AI-powered career optimization since 2025
          </p>
          <div className="flex justify-center gap-6 text-xs cyber-mono text-muted-foreground">
            <span className="hover:text-primary cursor-pointer transition-colors">[PRIVACY.protocol]</span>
            <span className="hover:text-primary cursor-pointer transition-colors">[TERMS.contract]</span>
            <span className="hover:text-primary cursor-pointer transition-colors">[CONTACT.link]</span>
          </div>
          <div className="mt-6 flex justify-center items-center gap-2 text-xs cyber-mono text-primary/50">
            <span className="w-2 h-2 rounded-full bg-primary cyber-pulse" />
            SYSTEM STATUS: OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ThemedFooter;
