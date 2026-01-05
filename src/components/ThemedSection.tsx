import { ReactNode } from "react";

interface ThemedSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  badge?: string;
}

const ThemedSection = ({ title, subtitle, children, className = "", badge }: ThemedSectionProps) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="text-center mb-8">
        {badge && (
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm mb-4">
            {badge}
          </span>
        )}
        <h2 className="text-3xl font-semibold text-headline mb-2">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground max-w-md mx-auto">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
};

export default ThemedSection;
