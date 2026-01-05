import { Bell } from "lucide-react";

const BreakingNewsTicker = () => {
  const headlines = [
    "BREAKING: Senior Developer position at Felix Pago sees 50+ applicants",
    "EXCLUSIVE: Tech companies report 23% increase in remote hiring",
    "UPDATE: New AI-powered resume analysis tool launches today",
    "BULLETIN: Interview preparation now includes company culture insights",
    "FLASH: Cover letter generation reaches 98% satisfaction rate",
  ];

  return (
    <div className="bg-headline text-card overflow-hidden py-2 border-y-2 border-rule-dark">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0 pr-4 border-r border-card/30">
            <Bell className="w-4 h-4 animate-pulse" />
            <span className="font-typewriter text-xs uppercase tracking-wider text-stamp-red font-bold bg-card px-2 py-0.5">
              Breaking
            </span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="animate-ticker whitespace-nowrap font-serif text-sm">
              {headlines.map((headline, i) => (
                <span key={i} className="mx-8 inline-block">
                  ★ {headline}
                </span>
              ))}
              {headlines.map((headline, i) => (
                <span key={`repeat-${i}`} className="mx-8 inline-block">
                  ★ {headline}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
