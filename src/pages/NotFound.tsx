import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background zen-gradient zen-leaf-pattern">
      <div className="container max-w-2xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm mb-4">
          Take a breath
        </div>

        <h1 className="headline-primary mb-4">
          404
        </h1>

        <p className="text-2xl mb-6 font-display text-muted-foreground">
          Page Not Found
        </p>

        <p className="mb-8 text-muted-foreground italic">
          This path does not exist, but that is okay. Every journey has unexpected turns. Let us guide you back.
        </p>

        <Link to="/">
          <Button variant="default" size="lg">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
