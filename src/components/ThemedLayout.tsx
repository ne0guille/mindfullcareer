import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { FileText, Briefcase, Building2, Leaf, Sparkles, Cpu, Brain, Database } from "lucide-react";

interface ThemedLayoutProps {
  children: ReactNode;
}

const ThemedLayout = ({ children }: ThemedLayoutProps) => {
  const { theme, themeName, themeTagline } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: "/", label: theme === "cyber" ? "HQ" : "Home", icon: theme === "cyber" ? Cpu : FileText },
    { path: "/jobs", label: theme === "cyber" ? "Jobs.db" : "Jobs", icon: theme === "cyber" ? Database : Briefcase },
    { path: "/company/felix-pago", label: theme === "cyber" ? "Intel" : "Research", icon: theme === "cyber" ? Brain : Building2 },
  ];

  // Newspaper Theme Layout
  if (theme === "newspaper") {
    return (
      <div className="min-h-screen bg-background paper-texture">
        {/* Navigation */}
        <nav className="bg-headline text-card py-2">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="font-display text-xl font-bold tracking-tight">
                THE CAREER CHRONICLE
              </Link>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path || 
                      (item.path !== "/" && location.pathname.startsWith(item.path.split("/")[1] ? `/${item.path.split("/")[1]}` : item.path));
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 font-typewriter text-xs uppercase tracking-wider transition-all
                          ${isActive ? "bg-stamp-red text-primary-foreground" : "hover:bg-card/10"}`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </nav>
        {children}
      </div>
    );
  }

  // Zen Theme Layout
  if (theme === "zen") {
    return (
      <div className="min-h-screen bg-background zen-gradient zen-leaf-pattern">
        {/* Navigation */}
        <nav className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
          <div className="container max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center zen-breathing">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-semibold text-lg text-headline">{themeName}</span>
                  <p className="text-xs text-muted-foreground hidden sm:block">{themeTagline}</p>
                </div>
              </Link>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path || 
                      (item.path !== "/" && location.pathname.startsWith(item.path.split("/")[1] ? `/${item.path.split("/")[1]}` : item.path));
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                          ${isActive 
                            ? "bg-primary text-primary-foreground shadow-lg zen-glow" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </nav>
        {children}
      </div>
    );
  }

  // Cyber Theme Layout
  return (
    <div className="min-h-screen bg-background cyber-gradient cyber-grid-bg cyber-data-stream">
      {/* Navigation */}
      <nav className="bg-card/90 backdrop-blur-xl border-b border-primary/30 sticky top-0 z-50 cyber-scanline">
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-primary/20 border border-primary/50 flex items-center justify-center cyber-pulse">
                <Cpu className="w-5 h-5 text-primary cyber-text-glow" />
              </div>
              <div>
                <span className="font-bold text-lg text-primary cyber-text-glow cyber-mono uppercase tracking-wider">
                  {themeName}
                </span>
                <p className="text-xs text-muted-foreground cyber-mono hidden sm:block">{themeTagline}</p>
              </div>
            </Link>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                    (item.path !== "/" && location.pathname.startsWith(item.path.split("/")[1] ? `/${item.path.split("/")[1]}` : item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all cyber-mono uppercase tracking-wider
                        ${isActive 
                          ? "bg-primary text-primary-foreground cyber-glow" 
                          : "text-muted-foreground hover:text-primary border border-transparent hover:border-primary/30"
                        }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default ThemedLayout;
