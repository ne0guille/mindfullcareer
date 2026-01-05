import { Link, useLocation } from "react-router-dom";
import { FileText, Briefcase, Building2 } from "lucide-react";

const NewspaperNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Front Page", icon: FileText },
    { path: "/jobs", label: "Classifieds", icon: Briefcase },
    { path: "/company/felix-pago", label: "Investigations", icon: Building2 },
  ];

  return (
    <nav className="bg-headline text-card py-2">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold tracking-tight">
            THE CAREER CHRONICLE
          </Link>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== "/" && location.pathname.startsWith(item.path.split("/")[1] ? `/${item.path.split("/")[1]}` : item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 font-typewriter text-xs uppercase tracking-wider
                    transition-all
                    ${isActive 
                      ? "bg-stamp-red text-primary-foreground" 
                      : "hover:bg-card/10"
                    }
                  `}
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
  );
};

export default NewspaperNav;
