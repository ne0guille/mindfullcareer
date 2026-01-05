import { ReactNode } from "react";

interface NewspaperSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  stamp?: string;
}

const NewspaperSection = ({ title, subtitle, children, className = "", stamp }: NewspaperSectionProps) => {
  return (
    <section className={`py-8 ${className}`}>
      <div className="relative mb-6">
        {/* Section header with decorative rules */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-rule-dark" />
          <div className="text-center">
            {stamp && (
              <span className="stamp mb-2 inline-block animate-stamp">{stamp}</span>
            )}
            <h2 className="headline-secondary uppercase tracking-wider">{title}</h2>
            {subtitle && (
              <p className="byline mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex-1 h-px bg-rule-dark" />
        </div>
      </div>
      {children}
    </section>
  );
};

export default NewspaperSection;
