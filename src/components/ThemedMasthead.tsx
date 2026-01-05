interface ThemedMastheadProps {
  showTagline?: boolean;
}

const ThemedMasthead = ({ showTagline = true }: ThemedMastheadProps) => {
  const themeName = "Mindful Career";
  const themeTagline = "Find Your Path with Peace and Clarity";

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
};

export default ThemedMasthead;
