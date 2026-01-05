import { Sun, Cloud, Briefcase } from "lucide-react";

const WeatherWidget = () => {
  return (
    <div className="border border-rule-dark p-3 bg-paper-aged">
      <div className="flex items-center gap-2 mb-2 border-b border-rule-light pb-2">
        <Sun className="w-4 h-4" />
        <span className="font-typewriter text-xs uppercase tracking-wider">Job Market Weather</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <Sun className="w-6 h-6 mx-auto text-stamp-red mb-1" />
          <div className="font-display font-bold">Tech</div>
          <div className="text-ink-faded">Sunny</div>
        </div>
        <div>
          <Cloud className="w-6 h-6 mx-auto text-ink-faded mb-1" />
          <div className="font-display font-bold">Finance</div>
          <div className="text-ink-faded">Cloudy</div>
        </div>
        <div>
          <Briefcase className="w-6 h-6 mx-auto text-headline mb-1" />
          <div className="font-display font-bold">Health</div>
          <div className="text-ink-faded">Booming</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
