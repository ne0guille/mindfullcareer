import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles, Heart, Download, Copy, CheckCircle2, Lightbulb, Briefcase, Check } from "lucide-react";
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
import { mockJobs } from "@/data/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Mock data for skills and work experience
const availableSkills = [
  { id: "react", name: "React", color: "bg-sky-100 text-sky-700 border-sky-200" },
  { id: "typescript", name: "TypeScript", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "javascript", name: "JavaScript", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { id: "nodejs", name: "Node.js", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { id: "python", name: "Python", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { id: "sql", name: "SQL", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { id: "aws", name: "AWS", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { id: "angular", name: "Angular", color: "bg-rose-100 text-rose-700 border-rose-200" },
];

const workExperiences = [
  { id: "exp1", title: "Senior Frontend Developer", company: "TechCorp Inc.", duration: "2022 - Present", description: "Led development of React-based applications, mentored junior developers" },
  { id: "exp2", title: "Full Stack Developer", company: "StartupXYZ", duration: "2020 - 2022", description: "Built scalable web applications using Node.js and React" },
  { id: "exp3", title: "Software Engineer", company: "Digital Agency", duration: "2018 - 2020", description: "Developed client projects using various JavaScript frameworks" },
  { id: "exp4", title: "Junior Developer", company: "WebSolutions", duration: "2016 - 2018", description: "Started career building responsive websites and learning best practices" },
];

const CoverLetter = () => {
  const { id } = useParams();
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];

  const [step, setStep] = useState(1);
  const [personalNote, setPersonalNote] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);

  const journeySteps = [
    { label: "Reflect on your strengths", description: "What makes you unique?", completed: step > 1, current: step === 1 },
    { label: "Highlight your skills", description: "Select key abilities", completed: step > 2, current: step === 2 },
    { label: "Choose your experience", description: "Relevant work history", completed: step > 3, current: step === 3 },
    { label: "Add your personal touch", description: "Share your story", completed: step > 4, current: step === 4 },
    { label: "Review & refine", description: "Perfect your message", completed: step > 5, current: step === 5 },
    { label: "Send with confidence", description: "You've got this!", completed: false, current: step === 6 },
  ];

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(s => s !== skillId)
        : [...prev, skillId]
    );
  };

  const toggleExperience = (expId: string) => {
    setSelectedExperiences(prev => 
      prev.includes(expId) 
        ? prev.filter(e => e !== expId)
        : [...prev, expId]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    const selectedSkillNames = availableSkills
      .filter(s => selectedSkills.includes(s.id))
      .map(s => s.name);
    const selectedExpDetails = workExperiences
      .filter(e => selectedExperiences.includes(e.id));
    
    setTimeout(() => {
      setGeneratedLetter(`Dear Hiring Team at ${job.company},

I am writing to express my genuine interest in the ${job.title} position. Your company's mission resonates deeply with my own values and career aspirations.

${personalNote ? `What draws me particularly to this opportunity is: ${personalNote}` : "Throughout my career, I have developed a strong foundation in the skills you're looking for."}

${selectedSkillNames.length > 0 ? `My expertise in ${selectedSkillNames.join(", ")} makes me particularly well-suited for this role.` : `My experience with ${job.skills.slice(0, 3).join(", ")} has prepared me well for this role.`}

${selectedExpDetails.length > 0 ? `In my role as ${selectedExpDetails[0].title} at ${selectedExpDetails[0].company}, I ${selectedExpDetails[0].description.toLowerCase()}. This experience directly aligns with what you're looking for.` : ""}

I believe that the best work comes from a place of purpose and passion. I am confident that I can contribute meaningfully to ${job.company}'s continued success.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.

With warm regards,
[Your Name]`);
      setIsGenerating(false);
      setStep(5);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    toast.success("Cover letter copied to clipboard! 🌟");
    setTimeout(() => setCopied(false), 2000);
  };

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

              {/* Step 2: Highlight Skills */}
              {step === 2 && (
                <MindfulCard delay={0.1}>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                      <Lightbulb className="w-8 h-8 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-light mb-2">Highlight your skills</h2>
                    <p className="text-muted-foreground">
                      Select the skills you'd like to emphasize in your cover letter
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8 justify-center">
                    {availableSkills.map((skill, index) => (
                      <motion.button
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => toggleSkill(skill.id)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 font-medium ${
                          selectedSkills.includes(skill.id)
                            ? `${skill.color} border-current shadow-md scale-105`
                            : "bg-muted/30 text-muted-foreground border-muted hover:border-primary/30"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {selectedSkills.includes(skill.id) && (
                            <Check className="w-4 h-4" />
                          )}
                          {skill.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {selectedSkills.length > 0 && (
                    <InsightCard
                      title="Great choices!"
                      content={`You've selected ${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} to highlight. These will make your cover letter stand out.`}
                      icon={<Sparkles className="w-5 h-5" />}
                      highlight
                      delay={0.2}
                    />
                  )}

                  <div className="flex justify-between items-center mt-8">
                    <GentleButton variant="ghost" onClick={() => setStep(1)}>
                      Back
                    </GentleButton>
                    <GentleButton onClick={() => setStep(3)} size="lg">
                      Continue
                    </GentleButton>
                  </div>
                </MindfulCard>
              )}

              {/* Step 3: Select Work Experience */}
              {step === 3 && (
                <MindfulCard delay={0.1}>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-violet-600" />
                    </div>
                    <h2 className="text-2xl font-light mb-2">Select relevant experience</h2>
                    <p className="text-muted-foreground">
                      Choose the work experiences most relevant to this role
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {workExperiences.map((exp, index) => (
                      <motion.button
                        key={exp.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => toggleExperience(exp.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedExperiences.includes(exp.id)
                            ? "bg-violet-50 border-violet-300 shadow-md"
                            : "bg-muted/20 border-muted hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                            selectedExperiences.includes(exp.id)
                              ? "bg-violet-500 border-violet-500"
                              : "border-muted-foreground/30"
                          }`}>
                            {selectedExperiences.includes(exp.id) && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground">{exp.title}</h3>
                            <p className="text-sm text-primary">{exp.company}</p>
                            <p className="text-xs text-muted-foreground mt-1">{exp.duration}</p>
                            <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {selectedExperiences.length > 0 && (
                    <InsightCard
                      title="Perfect selection!"
                      content={`${selectedExperiences.length} experience${selectedExperiences.length > 1 ? 's' : ''} will be woven into your story to showcase your journey.`}
                      icon={<Briefcase className="w-5 h-5" />}
                      highlight
                      delay={0.2}
                    />
                  )}

                  <div className="flex justify-between items-center mt-8">
                    <GentleButton variant="ghost" onClick={() => setStep(2)}>
                      Back
                    </GentleButton>
                    <GentleButton onClick={() => setStep(4)} size="lg">
                      Continue
                    </GentleButton>
                  </div>
                </MindfulCard>
              )}

              {/* Step 4: Personal Touch (was step 2) */}
              {step === 4 && (
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
                    <GentleButton variant="ghost" onClick={() => setStep(3)}>
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

              {/* Step 5: Review (was step 3) */}
              {step === 5 && !isGenerating && (
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
                    <GentleButton variant="ghost" onClick={() => setStep(4)}>
                      Edit my notes
                    </GentleButton>
                    <GentleButton onClick={() => setStep(6)} size="lg">
                      I'm happy with this
                    </GentleButton>
                  </div>
                </MindfulCard>
              )}

              {/* Step 6: Complete (was step 4) */}
              {step === 6 && (
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
};

export default CoverLetter;
