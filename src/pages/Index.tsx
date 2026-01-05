import NewspaperMasthead from "@/components/NewspaperMasthead";
import NewspaperSection from "@/components/NewspaperSection";
import CVUploadCard from "@/components/CVUploadCard";
import JobPostingCard from "@/components/JobPostingCard";
import CompanyResearchCard from "@/components/CompanyResearchCard";
import FeatureColumn from "@/components/FeatureColumn";
import { FileText, Target, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "Resume Review",
      description: "Our expert analysis examines every line of your curriculum vitae, identifying strengths and areas for improvement. We compare your experience against current market demands to ensure your resume stands out in today's competitive job market.",
      number: "I",
    },
    {
      icon: Target,
      title: "Job Matching",
      description: "Advanced algorithms match your skills and experience to job postings with remarkable precision. We highlight the key requirements you meet and suggest how to address any gaps, giving you a strategic advantage.",
      number: "II",
    },
    {
      icon: Building2,
      title: "Company Intel",
      description: "Before any interview, arm yourself with comprehensive company research. From recent news to company culture, leadership profiles to growth trajectory—we compile everything you need to impress your interviewers.",
      number: "III",
    },
  ];

  return (
    <div className="min-h-screen bg-background paper-texture">
      {/* Masthead */}
      <NewspaperMasthead />

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="stamp animate-stamp">Breaking News</span>
          </div>
          <h2 className="headline-primary mb-4">
            Your Dream Job Awaits
          </h2>
          <p className="text-xl text-subheadline max-w-2xl mx-auto font-serif italic">
            An extraordinary new tool has emerged to revolutionize the way professionals 
            prepare for their next career opportunity. Experts predict unprecedented success rates.
          </p>
        </div>

        {/* Decorative double rule */}
        <div className="newspaper-rule-double mb-8" />

        {/* Feature columns */}
        <div className="grid md:grid-cols-3 gap-0 border-y border-rule-dark">
          {features.map((feature) => (
            <FeatureColumn key={feature.number} {...feature} />
          ))}
        </div>
      </section>

      {/* Main Action Cards */}
      <NewspaperSection 
        title="The Daily Toolkit" 
        subtitle="Everything you need for your job search, in one place"
        stamp="Extra!"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CVUploadCard />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <JobPostingCard />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CompanyResearchCard />
            </div>
          </div>
        </div>
      </NewspaperSection>

      {/* How It Works Section */}
      <section className="container max-w-6xl mx-auto px-4 py-12">
        <div className="newspaper-rule-ornate mb-8" />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="headline-secondary mb-4">How The Chronicle Works</h2>
            <div className="space-y-4 font-serif text-subheadline leading-relaxed">
              <p className="drop-cap">
                Simply upload your resume and paste the job posting you're interested in. 
                Our intelligent system analyzes both documents, comparing your qualifications 
                against the requirements.
              </p>
              <p>
                Enter any company name to receive a comprehensive dossier—the kind of insider 
                knowledge that transforms nervous candidates into confident professionals.
              </p>
              <p className="italic text-ink-faded">
                "It's like having a career advisor, researcher, and coach all in your pocket."
                <br />
                <span className="not-italic text-xs">— A Satisfied Reader</span>
              </p>
            </div>
          </div>
          
          <div className="bg-paper-aged border-2 border-rule-dark p-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-stamp-red" />
              <span className="font-typewriter text-sm uppercase tracking-wider">Editor's Pick</span>
            </div>
            <h3 className="headline-tertiary mb-3">Pro Tips for Success</h3>
            <ul className="space-y-2 font-serif text-sm text-subheadline">
              <li className="flex items-start gap-2">
                <span className="text-stamp-red">•</span>
                Update your CV for each application
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stamp-red">•</span>
                Research company culture before interviews
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stamp-red">•</span>
                Prepare questions about recent company news
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stamp-red">•</span>
                Highlight relevant skills matching job requirements
              </li>
            </ul>
            <Button variant="edition" className="w-full mt-6">
              Read More Tips
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-double border-rule-dark mt-12">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="font-display text-2xl text-headline mb-2">THE CAREER CHRONICLE</p>
            <p className="text-sm text-ink-faded font-serif">
              © 2025 All Rights Reserved • Your Success Is Our Headline
            </p>
            <div className="mt-4 flex justify-center gap-6 text-xs uppercase tracking-wider text-ink-faded">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
