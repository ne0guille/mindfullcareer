const ThemedFooter = () => {
  const themeName = "Mindful Career";

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
};

export default ThemedFooter;
