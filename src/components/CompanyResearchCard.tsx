import { Building2, Search, Globe, Users, TrendingUp, Database, Shield, Sparkles } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import ThemedCard from "@/components/ThemedCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CompanyResearchCard = () => {
  const { theme } = useTheme();
  const [companyName, setCompanyName] = useState("");

  const researchPoints = {
    newspaper: [
      { icon: Globe, label: "Company Culture & Values" },
      { icon: Users, label: "Leadership & Team" },
      { icon: TrendingUp, label: "Recent News & Growth" },
    ],
    zen: [
      { icon: Sparkles, label: "Work-life harmony" },
      { icon: Users, label: "Team dynamics" },
      { icon: Globe, label: "Company values" },
    ],
    cyber: [
      { icon: Database, label: "DATA_AGGREGATION" },
      { icon: Shield, label: "INTEL_SYNTHESIS" },
      { icon: TrendingUp, label: "TREND_ANALYSIS" },
    ],
  };

  const icons = {
    newspaper: Building2,
    zen: Globe,
    cyber: Database,
  };

  const Icon = icons[theme];
  const points = researchPoints[theme];

  return (
    <ThemedCard variant="highlight" className="h-full">
      <div className="mb-4">
        <h3 className={`flex items-center gap-2 text-lg font-semibold mb-1 ${
          theme === "cyber" ? "text-primary cyber-mono uppercase" : ""
        }`}>
          <Icon className={`w-5 h-5 ${theme === "cyber" ? "text-primary" : "text-primary"}`} />
          {theme === "cyber" ? "COMPANY_INTEL" : theme === "zen" ? "Company Insights" : "Company Intel"}
        </h3>
        <p className={`text-sm ${theme === "cyber" ? "cyber-mono text-muted-foreground" : "text-muted-foreground"}`}>
          {theme === "cyber" 
            ? "> Deep research for interview optimization"
            : theme === "zen"
              ? "Understand the organization before you connect"
              : "Deep research for your interview preparation"
          }
        </p>
      </div>
      
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
          theme === "cyber" ? "text-primary" : "text-muted-foreground"
        }`} />
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder={theme === "cyber" ? "ENTER_COMPANY_NAME..." : "Enter company name..."}
          className={`w-full pl-12 pr-4 py-3 bg-muted border focus:border-primary focus:outline-none ${
            theme === "zen" ? "rounded-lg border-border" : "border-border"
          } ${theme === "cyber" ? "cyber-mono uppercase" : ""}`}
        />
      </div>

      <div className="mt-6 space-y-3">
        <p className={`text-xs ${theme === "cyber" ? "cyber-mono text-primary uppercase" : "text-muted-foreground uppercase tracking-wider"}`}>
          {theme === "cyber" ? "[ANALYSIS_MODULES]:" : "What we will investigate:"}
        </p>
        {points.map((point, index) => (
          <div 
            key={index}
            className={`flex items-center gap-3 text-sm ${theme === "cyber" ? "cyber-mono" : ""}`}
          >
            <point.icon className={`w-4 h-4 ${theme === "cyber" ? "text-primary" : "text-primary"}`} />
            <span className={theme === "cyber" ? "text-muted-foreground" : "text-muted-foreground"}>
              {point.label}
            </span>
          </div>
        ))}
      </div>

      <Button 
        variant={theme === "cyber" ? "default" : "default"} 
        className={`w-full mt-6 ${theme === "cyber" ? "cyber-mono uppercase cyber-glow" : ""}`}
        size="lg"
      >
        {theme === "cyber" ? "START_SCAN" : theme === "zen" ? "Begin Research" : "Start Investigation"}
      </Button>
    </ThemedCard>
  );
};

export default CompanyResearchCard;
