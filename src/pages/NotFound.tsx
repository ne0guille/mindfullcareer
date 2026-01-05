import { Link } from "react-router-dom";
import { useTheme, ThemeProvider } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const NotFoundContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === "newspaper" ? "bg-background paper-texture" 
        : theme === "zen" ? "bg-background zen-gradient zen-leaf-pattern"
        : "bg-background cyber-gradient cyber-grid-bg"
    }`}>
      <div className="container max-w-2xl mx-auto px-4 text-center">
        {theme === "newspaper" && <div className="newspaper-rule-ornate mb-8" />}
        {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8" />}
        
        {theme === "newspaper" && <span className="stamp mb-4 inline-block">Stop the Presses!</span>}
        {theme === "zen" && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm mb-4">
            Take a breath
          </div>
        )}
        {theme === "cyber" && (
          <span className="cyber-mono text-xs text-primary uppercase border border-primary/30 px-3 py-1 bg-primary/10 inline-block mb-4">
            [ERROR_404]
          </span>
        )}
        
        <h1 className={`mb-4 ${
          theme === "cyber" 
            ? "text-6xl font-bold text-primary cyber-text-glow cyber-mono" 
            : "headline-primary"
        }`}>
          404
        </h1>
        
        <p className={`text-2xl mb-6 ${
          theme === "cyber" ? "text-primary cyber-mono uppercase" : "font-display text-muted-foreground"
        }`}>
          {theme === "cyber" ? "PAGE_NOT_FOUND" : "Page Not Found"}
        </p>
        
        <p className={`mb-8 ${
          theme === "cyber" ? "cyber-mono text-muted-foreground" : "text-muted-foreground italic"
        }`}>
          {theme === "newspaper" 
            ? "Our correspondents have searched high and low, but the story you are looking for appears to have gone to print elsewhere."
            : theme === "zen"
              ? "This path does not exist, but that is okay. Every journey has unexpected turns. Let us guide you back."
              : "> Requested resource not found in database. Redirecting to main interface..."
          }
        </p>
        
        <Link to="/">
          <Button 
            variant={theme === "cyber" ? "default" : "default"}
            size="lg"
            className={theme === "cyber" ? "cyber-mono uppercase" : ""}
          >
            {theme === "cyber" ? "RETURN_TO_HQ" : theme === "zen" ? "Return Home" : "Return to Front Page"}
          </Button>
        </Link>
        
        {theme === "newspaper" && <div className="newspaper-rule-ornate mt-8" />}
        {theme === "cyber" && <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-8" />}
      </div>
    </div>
  );
};

const NotFound = () => {
  return <NotFoundContent />;
};

export default NotFound;
