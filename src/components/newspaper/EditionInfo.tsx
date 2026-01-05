import { Newspaper, Award, Users } from "lucide-react";

const EditionInfo = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  
  return (
    <div className="border border-rule-dark bg-paper-aged">
      {/* Header */}
      <div className="bg-headline text-card px-3 py-2 text-center">
        <div className="font-display text-xs uppercase tracking-[0.2em]">
          Today's Edition
        </div>
      </div>
      
      {/* Stats */}
      <div className="p-3 space-y-3 text-xs">
        <div className="flex items-center gap-2 border-b border-rule-light pb-2">
          <Newspaper className="w-4 h-4 text-stamp-red" />
          <div>
            <div className="font-typewriter uppercase tracking-wider text-ink-faded">Edition No.</div>
            <div className="font-display font-bold text-headline">{dayOfYear}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 border-b border-rule-light pb-2">
          <Award className="w-4 h-4 text-stamp-red" />
          <div>
            <div className="font-typewriter uppercase tracking-wider text-ink-faded">Price</div>
            <div className="font-display font-bold text-headline">FREE</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-stamp-red" />
          <div>
            <div className="font-typewriter uppercase tracking-wider text-ink-faded">Subscribers</div>
            <div className="font-display font-bold text-headline">12,847</div>
          </div>
        </div>
      </div>
      
      {/* Motto */}
      <div className="border-t border-rule-dark px-3 py-2 text-center">
        <p className="font-serif italic text-xs text-ink-faded">
          "All the Jobs That's Fit to Print"
        </p>
      </div>
    </div>
  );
};

export default EditionInfo;
