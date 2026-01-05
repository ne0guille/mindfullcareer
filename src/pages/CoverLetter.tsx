import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Sparkles, Heart, Download, Copy, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import ZenContainer from "@/components/zen/ZenContainer";
import MindfulCard from "@/components/zen/MindfulCard";
import AffirmationBanner from "@/components/zen/AffirmationBanner";
import ProgressJourney from "@/components/zen/ProgressJourney";
import CalmingTextarea from "@/components/zen/CalmingTextarea";
import GentleButton from "@/components/zen/GentleButton";
import MeditativeLoader from "@/components/zen/MeditativeLoader";
import InsightCard from "@/components/zen/InsightCard";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";
import { toast } from "sonner";

const CoverLetter = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];
  
  const [step, setStep] = useState(1);
  const [personalNote, setPersonalNote] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [copied, setCopied] = useState(false);

  const journeySteps = [
    { label: "Reflect on your strengths", description: "What makes you unique?", completed: step > 1, current: step === 1 },
    { label: "Add your personal touch", description: "Share your story", completed: step > 2, current: step === 2 },
    { label: "Review & refine", description: "Perfect your message", completed: step > 3, current: step === 3 },
    { label: "Send with confidence", description: "You've got this!", completed: false, current: step === 4 },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedLetter(`Dear Hiring Team at ${job.company},

I am writing to express my genuine interest in the ${job.title} position. Your company's mission resonates deeply with my own values and career aspirations.

${personalNote ? `What draws me particularly to this opportunity is: ${personalNote}` : "Throughout my career, I have developed a strong foundation in the skills you're looking for."}

My experience with ${job.skills.slice(0, 3).join(", ")} has prepared me well for this role. I am excited about the possibility of bringing my unique perspective and dedication to your team.

I believe that the best work comes from a place of purpose and passion. I am confident that I can contribute meaningfully to ${job.company}'s continued success.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.

With warm regards,
[Your Name]`);
      setIsGenerating(false);
      setStep(3);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    toast.success("Cover letter copied to clipboard! 🌟");
    setTimeout(() => setCopied(false), 2000);
  };

  // Zen theme layout
  if (theme === "zen") {
    return (
      <ThemedLayout>
        <ZenContainer className="pb-20">
          <main className="container max-w-4xl mx-auto px-4 py-8">
            {/* Gentle back link */}
            <Link 
              to={`/jobs/${id || '1'}`}
              className="inline-flex items-center gap-2 text-sm mb-8 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to opportunity
            </Link>

            {/* Affirmation Banner */}
            <AffirmationBanner className="mb-10" />

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-foreground mb-3">
                Craft Your Story
              </h1>
              <p className="text-lg text-muted-foreground">
                for {job.title} at {job.company}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Progress Journey - Sidebar */}
              <div className="lg:col-span-1">
                <MindfulCard 
                  title="Your Journey" 
                  icon={<Sparkles className="w-5 h-5" />}
                  glowOnHover={false}
                >
                  <ProgressJourney steps={journeySteps} />
                </MindfulCard>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {step === 1 && (
                  <MindfulCard delay={0.1}>
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-light mb-2">Let's begin with reflection</h2>
                      <p className="text-muted-foreground">
                        Take a moment to think about what excites you about this opportunity
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <InsightCard
                        title="Your Match"
                        content={`You have a ${job.matchPercentage}% match with this role. That's a wonderful foundation to build upon.`}
                        icon={<Sparkles className="w-5 h-5" />}
                        highlight
                        delay={0.2}
                      />
                      <InsightCard
                        title="Key Skills"
                        content={`Your experience with ${job.skills.slice(0, 3).join(", ")} aligns well with what they're looking for.`}
                        delay={0.3}
                      />
                    </div>

                    <div className="text-center">
                      <GentleButton onClick={() => setStep(2)} size="lg">
                        I'm ready to begin
                      </GentleButton>
                    </div>
                  </MindfulCard>
                )}

                {step === 2 && (
                  <MindfulCard delay={0.1}>
                    <div className="mb-8">
                      <h2 className="text-2xl font-light mb-2">Add your personal touch</h2>
                      <p className="text-muted-foreground">
                        What specifically draws you to this role? There's no wrong answer.
                      </p>
                    </div>

                    <CalmingTextarea
                      value={personalNote}
                      onChange={setPersonalNote}
                      placeholder="I'm excited about this opportunity because..."
                      encouragement="Beautiful thoughts. Keep going."
                      className="mb-12"
                    />

                    <div className="flex justify-between items-center">
                      <GentleButton variant="ghost" onClick={() => setStep(1)}>
                        Back
                      </GentleButton>
                      <GentleButton onClick={handleGenerate} size="lg" icon={<Sparkles className="w-4 h-4" />}>
                        Create my cover letter
                      </GentleButton>
                    </div>
                  </MindfulCard>
                )}

                {isGenerating && (
                  <MindfulCard>
                    <MeditativeLoader 
                      message="Crafting your story..." 
                      submessage="We're weaving your experience into something beautiful"
                    />
                  </MindfulCard>
                )}

                {step === 3 && !isGenerating && (
                  <MindfulCard delay={0.1}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-light mb-1">Your Cover Letter</h2>
                        <p className="text-sm text-muted-foreground">Review and make it uniquely yours</p>
                      </div>
                      <div className="flex gap-2">
                        <GentleButton 
                          variant="secondary" 
                          size="sm" 
                          onClick={handleCopy}
                          icon={copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        >
                          {copied ? "Copied!" : "Copy"}
                        </GentleButton>
                        <GentleButton variant="secondary" size="sm" icon={<Download className="w-4 h-4" />}>
                          Download
                        </GentleButton>
                      </div>
                    </div>

                    <div className="bg-background/50 rounded-2xl p-8 mb-8 border border-primary/10">
                      <pre className="whitespace-pre-wrap font-sans text-foreground/90 leading-relaxed">
                        {generatedLetter}
                      </pre>
                    </div>

                    <InsightCard
                      title="Remember"
                      content="This is a starting point. Feel free to add more of your personality and specific examples from your experience."
                      icon={<Heart className="w-5 h-5" />}
                      highlight
                    />

                    <div className="flex justify-between items-center mt-8">
                      <GentleButton variant="ghost" onClick={() => setStep(2)}>
                        Edit my notes
                      </GentleButton>
                      <GentleButton onClick={() => setStep(4)} size="lg">
                        I'm happy with this
                      </GentleButton>
                    </div>
                  </MindfulCard>
                )}

                {step === 4 && (
                  <MindfulCard delay={0.1}>
                    <div className="text-center py-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                      </div>
                      <h2 className="text-3xl font-light mb-3">You're ready</h2>
                      <p className="text-lg text-muted-foreground mb-8">
                        Your cover letter is complete. Trust in yourself and the journey you're on.
                      </p>
                      
                      <div className="flex flex-col items-center gap-4">
                        <GentleButton size="lg" icon={<Sparkles className="w-5 h-5" />}>
                          Submit Application
                        </GentleButton>
                        <Link to="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          Explore more opportunities
                        </Link>
                      </div>
                    </div>
                  </MindfulCard>
                )}
              </div>
            </div>
          </main>
        </ZenContainer>
        <ThemedFooter />
      </ThemedLayout>
    );
  }

  // Default layout for other themes
  return (
    <ThemedLayout>
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <Link 
          to={`/jobs/${id || '1'}`}
          className={`inline-flex items-center gap-2 text-sm mb-6 transition-colors ${
            theme === "cyber" 
              ? "text-primary cyber-mono uppercase hover:text-primary/80" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {theme === "cyber" ? "< BACK" : "Back to Job"}
        </Link>

        <header className="mb-8">
          <h1 className={theme === "cyber" 
            ? "text-3xl font-bold text-primary cyber-text-glow cyber-mono uppercase mb-2" 
            : "headline-primary text-3xl mb-2"
          }>
            {theme === "cyber" ? "COVER_LETTER.generate()" : "Generate Cover Letter"}
          </h1>
          <p className={theme === "cyber" ? "cyber-mono text-muted-foreground" : "text-muted-foreground"}>
            for {job.title} at {job.company}
          </p>
        </header>

        <div className={`p-6 rounded-lg mb-6 ${
          theme === "cyber" ? "bg-muted/50 border border-primary/20" : "bg-card border"
        }`}>
          <label className={`block text-sm font-medium mb-2 ${
            theme === "cyber" ? "cyber-mono text-primary uppercase" : ""
          }`}>
            {theme === "cyber" ? "PERSONAL_INPUT:" : "Add a personal note (optional)"}
          </label>
          <textarea
            value={personalNote}
            onChange={(e) => setPersonalNote(e.target.value)}
            className={`w-full p-4 rounded-lg border bg-background resize-none ${
              theme === "cyber" ? "cyber-mono border-primary/30" : ""
            }`}
            rows={4}
            placeholder="What excites you about this role?"
          />
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className={theme === "cyber" ? "cyber-mono uppercase" : ""}
          >
            <FileText className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating..." : "Generate Cover Letter"}
          </Button>
        </div>

        {generatedLetter && (
          <div className={`mt-8 p-6 rounded-lg ${
            theme === "cyber" ? "bg-muted/50 border border-primary/20" : "bg-card border"
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={theme === "cyber" 
                ? "text-lg font-bold text-primary cyber-mono uppercase" 
                : "text-lg font-semibold"
              }>
                Your Cover Letter
              </h2>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <pre className={`whitespace-pre-wrap ${theme === "cyber" ? "cyber-mono text-sm" : ""}`}>
              {generatedLetter}
            </pre>
          </div>
        )}
      </main>
      <ThemedFooter />
    </ThemedLayout>
  );
};

export default CoverLetter;
