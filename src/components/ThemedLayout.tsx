import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Briefcase, Building2, Leaf } from "lucide-react";

interface ThemedLayoutProps {
  children: ReactNode;
}

const ThemedLayout = ({ children }: ThemedLayoutProps) => {
  const location = useLocation();
  const themeName = "Mindful Career";
  const themeTagline = "Find Your Path with Peace and Clarity";

  const navItems = [
    { path: "/", label: "Home", icon: FileText },
    { path: "/jobs", label: "Jobs", icon: Briefcase },
    { path: "/company/felix-pago", label: "Research", icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-background zen-gradient zen-leaf-pattern">
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
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default ThemedLayout;
