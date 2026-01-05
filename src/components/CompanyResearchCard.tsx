import { Building2, Search, Globe, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CompanyResearchCard = () => {
  const [companyName, setCompanyName] = useState("");

  const researchPoints = [
    { icon: Globe, label: "Company Culture & Values" },
    { icon: Users, label: "Leadership & Team" },
    { icon: TrendingUp, label: "Recent News & Growth" },
  ];

  return (
    <Card variant="headline" className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-stamp-red" />
          Company Intel
        </CardTitle>
        <CardDescription>
          Deep research for your interview preparation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-faded" />
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name..."
            className="w-full pl-12 pr-4 py-3 bg-paper-aged border border-rule-light focus:border-rule-dark focus:outline-none font-serif text-headline placeholder:text-ink-faded"
          />
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-wider text-ink-faded font-display">
            What we'll investigate:
          </p>
          {researchPoints.map((point, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 text-sm text-subheadline"
            >
              <point.icon className="w-4 h-4 text-stamp-red" />
              <span className="font-serif">{point.label}</span>
            </div>
          ))}
        </div>

        <Button variant="stamp" className="w-full mt-6" size="lg">
          Start Investigation
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyResearchCard;
