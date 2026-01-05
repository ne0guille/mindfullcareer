import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Building2, Check, ExternalLink, Sparkles, Code, Target } from "lucide-react";
import NewspaperNav from "@/components/NewspaperNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockJobs, mockSkillsAnalysis, mockCompany } from "@/data/mockData";

const JobDetail = () => {
  const { id } = useParams();
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];

  return (
    <div className="min-h-screen bg-background paper-texture">
      <NewspaperNav />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link 
          to="/jobs" 
          className="inline-flex items-center gap-2 text-sm text-ink-faded hover:text-headline font-serif mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Classifieds
        </Link>
        
        {/* Job Header */}
        <header className="mb-8">
          <div className="flex items-start gap-4">
            {/* Company initial */}
            <div className="w-16 h-16 bg-gradient-to-br from-stamp-red to-primary flex items-center justify-center text-primary-foreground font-display text-2xl font-bold flex-shrink-0">
              {job.companyInitial}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                {job.isMatched && (
                  <span className="flex items-center gap-1 text-sm text-green-600 font-typewriter">
                    <Check className="w-4 h-4" /> Qualified Candidate
                  </span>
                )}
              </div>
              <h1 className="headline-primary text-3xl md:text-4xl mb-2">{job.title}</h1>
              <p className="font-display text-xl text-stamp-red">{job.company}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-ink-faded font-serif">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {job.level}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="stamp" size="lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Cover Letter
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Job Post Link
              </Button>
            </div>
          </div>
          
          <div className="newspaper-rule-double mt-6" />
        </header>
        
        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-secondary w-full justify-start gap-0 p-0 h-auto">
            <TabsTrigger 
              value="overview"
              className="flex items-center gap-2 px-6 py-3 font-display text-sm uppercase tracking-wide data-[state=active]:bg-headline data-[state=active]:text-card rounded-none"
            >
              <Target className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="requirements"
              className="flex items-center gap-2 px-6 py-3 font-display text-sm uppercase tracking-wide data-[state=active]:bg-headline data-[state=active]:text-card rounded-none"
            >
              <Code className="w-4 h-4" />
              Requirements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Skills Analysis */}
            <Card variant="newspaper">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-stamp-red" />
                    Skills Analysis
                  </CardTitle>
                  <span className="font-display text-lg text-stamp-red font-bold">
                    {mockSkillsAnalysis.matchCount}/{mockSkillsAnalysis.totalCount} skills
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-ink-faded font-typewriter uppercase tracking-wider mb-3">Required</p>
                <div className="flex flex-wrap gap-2">
                  {mockSkillsAnalysis.required.map((skill) => {
                    const isMatched = mockSkillsAnalysis.matched.includes(skill);
                    return (
                      <span 
                        key={skill}
                        className={`
                          flex items-center gap-1 px-3 py-1.5 text-sm font-serif border
                          ${isMatched 
                            ? "bg-green-50 border-green-300 text-green-800" 
                            : "bg-paper-aged border-rule-light text-subheadline"
                          }
                        `}
                      >
                        {isMatched && <Check className="w-3 h-3" />}
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            {/* AI Summary */}
            <Card variant="headline">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-stamp-red" />
                  Chronicle Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-serif text-subheadline leading-relaxed drop-cap">
                  {mockCompany.whatTheyDo}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-paper-aged border border-rule-light p-4">
                    <p className="text-xs text-stamp-red font-typewriter uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Key Focus
                    </p>
                    <p className="font-serif text-subheadline">{mockCompany.keyFocus}</p>
                  </div>
                  <div className="bg-paper-aged border border-rule-light p-4">
                    <p className="text-xs text-stamp-red font-typewriter uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Team Style
                    </p>
                    <p className="font-serif text-subheadline">{mockCompany.teamStyle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requirements" className="space-y-6">
            <Card variant="newspaper">
              <CardHeader>
                <CardTitle>Position Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 font-serif text-subheadline">
                  <li className="flex items-start gap-2">
                    <span className="text-stamp-red">•</span>
                    3+ years of experience with React and TypeScript
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stamp-red">•</span>
                    Strong understanding of JavaScript fundamentals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stamp-red">•</span>
                    Experience with AWS services (Lambda, S3, EC2)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stamp-red">•</span>
                    Familiarity with Node.js backend development
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stamp-red">•</span>
                    Excellent communication skills in English
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Footer decoration */}
        <div className="mt-12 text-center">
          <div className="newspaper-rule-ornate mb-4" />
          <p className="text-xs text-ink-faded font-typewriter uppercase tracking-widest">
            — End of Position Listing —
          </p>
        </div>
      </main>
    </div>
  );
};

export default JobDetail;
