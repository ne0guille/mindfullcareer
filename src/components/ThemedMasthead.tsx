import { useTheme } from "@/contexts/ThemeContext";

interface ThemedMastheadProps {
  showTagline?: boolean;
}

const ThemedMasthead = ({ showTagline = true }: ThemedMastheadProps) => {
  const { theme, themeName, themeTagline } = useTheme();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Newspaper Masthead
  if (theme === "newspaper") {
    return (
      <header className="w-full bg-background py-6 border-b-4 border-double border-rule-dark">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center text-sm text-ink-faded mb-4 font-serif">
            <span>{formattedDate}</span>
            <span className="font-typewriter">VOL. MMXXV • NO. 1</span>
            <span>SPECIAL EDITION</span>
          </div>
          <div className="newspaper-rule-ornate mb-4" />
          <div className="text-center">
            <h1 className="masthead text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
              {themeName.toUpperCase()}
            </h1>
            {showTagline && (
              <p className="mt-2 text-subheadline italic text-lg md:text-xl font-serif">
                "{themeTagline}"
              </p>
            )}
          </div>
          <div className="newspaper-rule-ornate mt-4" />
          <div className="flex justify-center gap-8 mt-4 text-xs uppercase tracking-widest text-ink-faded font-serif">
            <span>• CV Analysis •</span>
            <span>• Job Matching •</span>
            <span>• Company Intel •</span>
          </div>
        </div>
      </header>
    );
  }

  // Zen Masthead
  if (theme === "zen") {
    return (
      <header className="w-full py-16 relative overflow-hidden">
        <div className="absolute inset-0 zen-ripple opacity-30" />
        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm mb-6 zen-float">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Welcome to your journey
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-headline mb-4 zen-breathing">
            {themeName}
          </h1>
          {showTagline && (
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              {themeTagline}
            </p>
          )}
          <div className="mt-8 flex justify-center gap-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full bg-primary/30"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </header>
    );
  }

  // Cyber Masthead
  return (
    <header className="w-full py-16 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 cyber-scanline" />
      
      <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/30 text-primary text-sm mb-6 cyber-mono">
          <span className="w-2 h-2 rounded-full bg-primary cyber-pulse" />
          SYSTEM ONLINE
          <span className="text-muted-foreground">• {formattedDate}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary cyber-text-glow cyber-mono uppercase tracking-widest mb-4">
          {themeName}
        </h1>
        
        {showTagline && (
          <p className="text-lg text-muted-foreground cyber-mono max-w-xl mx-auto">
            {">"} {themeTagline}
          </p>
        )}
        
        {/* Decorative elements */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
          <div className="flex gap-2">
            {["AI", "ML", "NLP"].map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs cyber-mono text-primary border border-primary/30 bg-primary/5"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
        </div>
      </div>
    </header>
  );
};

export default ThemedMasthead;
