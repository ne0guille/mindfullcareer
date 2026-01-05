import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background paper-texture flex items-center justify-center">
      <div className="container max-w-2xl mx-auto px-4 text-center">
        {/* Decorative rule */}
        <div className="newspaper-rule-ornate mb-8" />
        
        <span className="stamp mb-4 inline-block">Stop the Presses!</span>
        
        <h1 className="headline-primary mb-4">404</h1>
        
        <p className="font-display text-2xl text-subheadline mb-6">
          Page Not Found
        </p>
        
        <p className="font-serif text-ink-faded mb-8 italic">
          Our correspondents have searched high and low, but the story you're looking for 
          appears to have gone to print elsewhere.
        </p>
        
        <Link to="/">
          <Button variant="newspaper" size="lg">
            Return to Front Page
          </Button>
        </Link>
        
        {/* Decorative rule */}
        <div className="newspaper-rule-ornate mt-8" />
      </div>
    </div>
  );
};

export default NotFound;
