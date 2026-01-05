import { LucideIcon } from "lucide-react";

interface FeatureColumnProps {
  icon: LucideIcon;
  title: string;
  description: string;
  number: string;
}

const FeatureColumn = ({ icon: Icon, title, description, number }: FeatureColumnProps) => {
  return (
    <div className="newspaper-column py-6 animate-fade-in" style={{ animationDelay: `${parseInt(number) * 100}ms` }}>
      <div className="flex items-start gap-3 mb-4">
        <span className="font-display text-4xl text-stamp-red font-black">{number}</span>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Icon className="w-5 h-5 text-headline" />
            <h3 className="headline-tertiary">{title}</h3>
          </div>
          <p className="text-ink-faded text-sm leading-relaxed font-serif drop-cap">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureColumn;
