import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AdvertisementBoxProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
  variant?: "default" | "bold" | "vintage";
}

const AdvertisementBox = ({ 
  title, 
  description, 
  link, 
  linkText,
  variant = "default" 
}: AdvertisementBoxProps) => {
  if (variant === "bold") {
    return (
      <Link to={link} className="block group">
        <div className="border-4 border-double border-headline p-4 bg-headline text-card text-center hover:bg-stamp-red transition-colors">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-typewriter text-xs uppercase tracking-[0.2em]">
              Advertisement
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="font-display text-2xl font-black uppercase tracking-tight mb-2">
            {title}
          </h4>
          <p className="font-serif italic text-sm mb-3 opacity-90">
            {description}
          </p>
          <span className="inline-flex items-center gap-2 font-typewriter text-xs uppercase tracking-wider border border-card px-3 py-1 group-hover:bg-card group-hover:text-headline transition-colors">
            {linkText}
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "vintage") {
    return (
      <Link to={link} className="block group">
        <div className="border-2 border-headline p-4 bg-paper-aged relative overflow-hidden">
          {/* Corner decorations */}
          <span className="absolute top-1 left-1 text-xl text-headline">✦</span>
          <span className="absolute top-1 right-1 text-xl text-headline">✦</span>
          <span className="absolute bottom-1 left-1 text-xl text-headline">✦</span>
          <span className="absolute bottom-1 right-1 text-xl text-headline">✦</span>
          
          <div className="text-center py-2">
            <div className="font-typewriter text-[10px] uppercase tracking-[0.3em] text-ink-faded mb-2">
              — A Word from Our Sponsors —
            </div>
            <h4 className="font-display text-xl font-black uppercase text-headline mb-1 group-hover:text-stamp-red transition-colors">
              {title}
            </h4>
            <div className="w-16 h-px bg-headline mx-auto my-2" />
            <p className="font-serif text-sm text-subheadline italic mb-3">
              {description}
            </p>
            <span className="font-typewriter text-xs text-stamp-red uppercase tracking-wider">
              ➤ {linkText}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={link} className="block group">
      <div className="border border-dashed border-headline p-3 bg-card text-center hover:border-solid transition-all">
        <span className="font-typewriter text-[10px] uppercase tracking-[0.2em] text-ink-faded">
          Advt.
        </span>
        <h4 className="font-display font-bold text-headline mt-1 group-hover:text-stamp-red transition-colors">
          {title}
        </h4>
        <p className="font-serif text-xs text-ink-faded italic mt-1">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default AdvertisementBox;
