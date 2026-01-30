import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionCardProps {
  jobId: string;
  matchPercentage: number;
}

const FloatingActionCard = ({ jobId, matchPercentage }: FloatingActionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="sticky top-8"
    >
      <div className="relative bg-card/90 backdrop-blur-md rounded-3xl border border-border/50 p-6
        shadow-xl overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 via-transparent to-accent-emerald/10"
          animate={{
            background: [
              "linear-gradient(135deg, hsl(260 65% 55% / 0.1), transparent, hsl(160 65% 40% / 0.1))",
              "linear-gradient(135deg, hsl(160 65% 40% / 0.1), transparent, hsl(260 65% 55% / 0.1))",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />

        <div className="relative z-10 space-y-4">
          {/* Match visualization */}
          <div className="text-center mb-6">
            <motion.div
              className="relative w-24 h-24 mx-auto mb-3"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* Outer ring */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="6"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--accent-emerald))"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${matchPercentage * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                  initial={{ strokeDasharray: "0 283" }}
                  animate={{ strokeDasharray: `${matchPercentage * 2.83} 283` }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-2xl font-bold text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {matchPercentage}%
                </motion.span>
                <span className="text-xs text-muted-foreground">match</span>
              </div>
            </motion.div>
            
            <p className="text-sm text-muted-foreground">
              Strong alignment with your profile
            </p>
          </div>

          {/* Primary CTA */}
          <Link to={`/jobs/${jobId}/cover-letter`}>
            <Button
              size="lg"
              className="w-full rounded-2xl h-14 text-base font-semibold
                bg-gradient-to-r from-accent-violet to-accent-blue
                hover:shadow-[0_0_30px_-5px_hsl(var(--accent-violet)/0.5)]
                transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Cover Letter
            </Button>
          </Link>

          {/* Secondary actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-border/50 hover:bg-muted/50"
            >
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-border/50 hover:bg-muted/50"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Original
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingActionCard;
