import { Globe, Search, Users, Sparkles } from "lucide-react";
import ThemedCard from "@/components/ThemedCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CompanyResearchCard = () => {
  const [companyName, setCompanyName] = useState("");

  const researchPoints = [
    { icon: Sparkles, label: "Work-life harmony" },
    { icon: Users, label: "Team dynamics" },
    { icon: Globe, label: "Company values" },
  ];

  return (
    <ThemedCard variant="highlight" className="h-full">
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-1">
          <Globe className="w-5 h-5 text-primary" />
          Company Insights
        </h3>
        <p className="text-sm text-muted-foreground">
          Understand the organization before you connect
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name..."
          className="w-full pl-12 pr-4 py-3 bg-muted border border-border rounded-lg focus:border-primary focus:outline-none"
        />
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          What we will investigate:
        </p>
        {researchPoints.map((point, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-sm"
          >
            <point.icon className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              {point.label}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant="default"
        className="w-full mt-6"
        size="lg"
      >
        Begin Research
      </Button>
    </ThemedCard>
  );
};

export default CompanyResearchCard;
