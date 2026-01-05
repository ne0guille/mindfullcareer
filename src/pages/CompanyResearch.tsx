import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, RefreshCw, Copy, Search, Heart, Users, Trophy, Target, Newspaper, Sparkles } from "lucide-react";
import NewspaperNav from "@/components/NewspaperNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCompany } from "@/data/mockData";
import { toast } from "sonner";

const CompanyResearch = () => {
  const { id } = useParams();
  const company = mockCompany;

  const handleCopyNotes = () => {
    const notes = `
${company.name} - Company Research
=====================================
Industry: ${company.industry} • ${company.type}
Size: ${company.size}

What They Do:
${company.whatTheyDo}

Problem Solved:
${company.problemSolved}

Value Proposition:
${company.valueProposition}

Target Customers:
${company.targetCustomers.join(", ")}

Core Values:
${company.coreValues.join(", ")}

Interview Tips:
${company.interviewTips.map(tip => `• ${tip}`).join("\n")}
    `;
    navigator.clipboard.writeText(notes);
    toast.success("Notes copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background paper-texture">
      <NewspaperNav />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-ink-faded hover:text-headline font-serif mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Front Page
        </Link>
        
        {/* Company Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Company icon */}
              <div className="w-16 h-16 bg-paper-aged border-2 border-rule-dark flex items-center justify-center">
                <Newspaper className="w-8 h-8 text-headline" />
              </div>
              
              <div>
                <h1 className="headline-primary text-3xl md:text-4xl mb-1">{company.name}</h1>
                <a 
                  href={`https://${company.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-stamp-red font-serif hover:underline"
                >
                  {company.website}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="flex items-center gap-1 text-sm text-green-600 font-typewriter">
                  <Search className="w-4 h-4" />
                  Researched
                </p>
                <p className="text-xs text-ink-faded">{company.researchedAt}</p>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Research
              </Button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-display text-green-600 font-semibold">
                {company.completionPercentage}% Complete
              </span>
              <div className="w-32 h-2 bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${company.completionPercentage}%` }}
                />
              </div>
            </div>
            
            <div className="ml-auto">
              <Button variant="edition" size="sm" onClick={handleCopyNotes}>
                <Copy className="w-4 h-4 mr-2" />
                Copy All Notes
              </Button>
            </div>
          </div>
          
          <div className="newspaper-rule-double mt-6" />
        </header>
        
        {/* Tabs */}
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="bg-secondary w-full justify-start gap-0 p-0 h-auto flex-wrap">
            <TabsTrigger 
              value="interview"
              className="flex items-center gap-2 px-4 py-3 font-display text-xs uppercase tracking-wide data-[state=active]:bg-headline data-[state=active]:text-card rounded-none"
            >
              <Sparkles className="w-4 h-4" />
              Interview Prep
            </TabsTrigger>
            <TabsTrigger 
              value="company"
              className="flex items-center gap-2 px-4 py-3 font-display text-xs uppercase tracking-wide data-[state=active]:bg-headline data-[state=active]:text-card rounded-none"
            >
              <Newspaper className="w-4 h-4" />
              Company
            </TabsTrigger>
            <TabsTrigger 
              value="team"
              className="flex items-center gap-2 px-4 py-3 font-display text-xs uppercase tracking-wide data-[state=active]:bg-headline data-[state=active]:text-card rounded-none"
            >
              <Users className="w-4 h-4" />
              Team
            </TabsTrigger>
            <TabsTrigger 
              value="news"
              className="flex items-center gap-2 px-4 py-3 font-display text-xs uppercase tracking-wide data-[state=active]:bg-headline data-[state=active]:text-card rounded-none"
            >
              <Trophy className="w-4 h-4" />
              News
            </TabsTrigger>
          </TabsList>
          
          {/* Interview Prep Tab */}
          <TabsContent value="interview" className="space-y-6">
            <Card variant="headline">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-stamp-red" />
                  Interview Preparation Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-serif text-subheadline italic">
                  Our correspondents have compiled essential preparation tips for your upcoming interview.
                </p>
                
                <div className="space-y-3 mt-4">
                  {company.interviewTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-paper-aged border-l-4 border-stamp-red">
                      <span className="font-display text-2xl text-stamp-red font-bold">
                        {index + 1}
                      </span>
                      <p className="font-serif text-subheadline pt-1">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card variant="newspaper">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Newspaper className="w-6 h-6 text-headline" />
                  <div>
                    <CardTitle>{company.name}</CardTitle>
                    <p className="text-sm text-ink-faded font-serif">
                      {company.industry} • {company.type} • "{company.tagline}"
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-subheadline">
                  <Users className="w-4 h-4 text-ink-faded" />
                  <span className="font-typewriter uppercase text-xs text-ink-faded">Size:</span>
                  <span className="font-serif">{company.size}</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-stamp-red font-display font-semibold mb-2">What They Do</h4>
                    <p className="font-serif text-subheadline leading-relaxed">{company.whatTheyDo}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-stamp-red font-display font-semibold mb-2">Problem Solved</h4>
                    <p className="font-serif text-subheadline">{company.problemSolved}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-stamp-red font-display font-semibold mb-2">Value Proposition</h4>
                    <p className="font-serif text-subheadline">{company.valueProposition}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-stamp-red font-display font-semibold mb-2">Target Customers</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.targetCustomers.map((customer) => (
                        <span 
                          key={customer}
                          className="px-3 py-1 bg-paper-aged border border-rule-light font-serif text-sm text-subheadline"
                        >
                          {customer}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Core Values */}
            <Card variant="headline">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-stamp-red" />
                  Core Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {company.coreValues.map((value) => (
                    <div 
                      key={value}
                      className="text-center p-4 bg-paper-aged border border-rule-light"
                    >
                      <p className="font-display font-semibold text-headline">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card variant="newspaper">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-stamp-red" />
                  Team Culture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-paper-aged border border-rule-light">
                    <p className="text-xs text-stamp-red font-typewriter uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Key Focus
                    </p>
                    <p className="font-serif text-subheadline">{company.keyFocus}</p>
                  </div>
                  <div className="p-4 bg-paper-aged border border-rule-light">
                    <p className="text-xs text-stamp-red font-typewriter uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Team Style
                    </p>
                    <p className="font-serif text-subheadline">{company.teamStyle}</p>
                  </div>
                </div>
                
                <p className="font-serif text-ink-faded italic text-sm mt-4">
                  Additional team insights will be available after connecting with Lovable Cloud for deeper research capabilities.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <Card variant="headline">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-stamp-red" />
                  Recent Headlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.recentNews.map((news, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 pb-4 border-b border-rule-light last:border-0 last:pb-0"
                    >
                      <span className="font-display text-3xl text-stamp-red font-black">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-display font-semibold text-headline">{news}</p>
                        <p className="text-xs text-ink-faded font-typewriter mt-1">
                          BREAKING • Just In
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Footer decoration */}
        <div className="mt-12 text-center">
          <div className="newspaper-rule-ornate mb-4" />
          <p className="text-xs text-ink-faded font-typewriter uppercase tracking-widest">
            — End of Investigation Report —
          </p>
        </div>
      </main>
    </div>
  );
};

export default CompanyResearch;
