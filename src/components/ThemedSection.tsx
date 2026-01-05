import { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemedSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  badge?: string;
}

const ThemedSection = ({ title, subtitle, children, className = "", badge }: ThemedSectionProps) => {
  const { theme } = useTheme();

  // Newspaper Section
  if (theme === "newspaper") {
    return (
      <section className={`py-8 ${className}`}>
        <div className="relative mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-rule-dark" />
            <div className="text-center">
              {badge && (
                <span className="stamp mb-2 inline-block animate-stamp">{badge}</span>
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
  }

  // Zen Section
  if (theme === "zen") {
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
  }

  // Cyber Section
  return (
    <section className={`py-12 ${className}`}>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
        <div className="flex items-center justify-center gap-4">
          {badge && (
            <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs cyber-mono uppercase">
              {badge}
            </span>
          )}
          <h2 className="text-2xl font-bold text-primary cyber-text-glow cyber-mono uppercase tracking-widest">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-center text-muted-foreground cyber-mono mt-2 text-sm">
            {">"} {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
};

export default ThemedSection;
