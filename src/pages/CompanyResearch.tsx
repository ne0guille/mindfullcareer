import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, RefreshCw, Copy, Heart, Users, Trophy, Target, Sparkles, Lightbulb, BookOpen, Star } from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import ZenContainer from "@/components/zen/ZenContainer";
import MindfulCard from "@/components/zen/MindfulCard";
import AffirmationBanner from "@/components/zen/AffirmationBanner";
import ProgressJourney from "@/components/zen/ProgressJourney";
import InsightCard from "@/components/zen/InsightCard";
import GentleButton from "@/components/zen/GentleButton";
import { mockCompany } from "@/data/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    toast.success("Notes saved to clipboard ✨");
  };

  const researchSteps = [
    { label: "Company Overview", description: "Understand their mission", completed: true },
    { label: "Culture & Values", description: "Find your alignment", completed: true },
    { label: "Team Insights", description: "Know your future colleagues", completed: true },
    { label: "Interview Prep", description: "Feel confident", completed: false, current: true },
  ];

  return (
    <ThemedLayout>
      <ZenContainer className="pb-20">
        <main className="container max-w-5xl mx-auto px-4 py-8">
          {/* Gentle back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm mb-8 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Return home
          </Link>

          {/* Affirmation Banner */}
          <AffirmationBanner className="mb-10" />

          {/* Company Header - Calm & Centered */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-light text-foreground mb-2">
              {company.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              "{company.tagline}"
            </p>
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              {company.website}
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Progress indicator */}
            <div className="mt-8 max-w-xs mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-primary font-medium">{company.completionPercentage}% explored</span>
              </div>
              <div className="h-2 rounded-full bg-primary/20 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${company.completionPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>
          </motion.header>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar - Your Journey */}
            <div className="lg:col-span-1 space-y-6">
              <MindfulCard
                title="Your Research Journey"
                icon={<BookOpen className="w-5 h-5" />}
                glowOnHover={false}
              >
                <ProgressJourney steps={researchSteps} />

                <div className="mt-6 pt-6 border-t border-primary/10">
                  <GentleButton
                    variant="secondary"
                    className="w-full"
                    onClick={handleCopyNotes}
                    icon={<Copy className="w-4 h-4" />}
                  >
                    Save notes
                  </GentleButton>
                </div>
              </MindfulCard>

              {/* Quick Actions */}
              <MindfulCard glowOnHover={false} delay={0.2}>
                <p className="text-sm text-muted-foreground mb-4">Ready for the next step?</p>
                <div className="space-y-2">
                  <Link to="/jobs/1/cover-letter">
                    <GentleButton variant="primary" className="w-full" icon={<Sparkles className="w-4 h-4" />}>
                      Write cover letter
                    </GentleButton>
                  </Link>
                  <GentleButton variant="ghost" className="w-full" icon={<RefreshCw className="w-4 h-4" />}>
                    Refresh research
                  </GentleButton>
                </div>
              </MindfulCard>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* What They Do */}
              <MindfulCard
                title="Understanding Their Purpose"
                subtitle="What drives this company"
                icon={<Target className="w-5 h-5" />}
                delay={0.1}
              >
                <p className="text-foreground/90 leading-relaxed mb-6">
                  {company.whatTheyDo}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <InsightCard
                    title="Problem They Solve"
                    content={company.problemSolved}
                    icon={<Lightbulb className="w-5 h-5" />}
                    delay={0.2}
                  />
                  <InsightCard
                    title="Their Promise"
                    content={company.valueProposition}
                    icon={<Star className="w-5 h-5" />}
                    delay={0.3}
                  />
                </div>
              </MindfulCard>

              {/* Core Values */}
              <MindfulCard
                title="Values That Guide Them"
                subtitle="See if they resonate with you"
                icon={<Heart className="w-5 h-5" />}
                delay={0.2}
              >
                <div className="grid grid-cols-2 gap-4">
                  {company.coreValues.map((value, index) => (
                    <motion.div
                      key={value}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center"
                    >
                      <p className="font-medium text-foreground">{value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent">
                  <p className="text-sm text-muted-foreground italic text-center">
                    "Reflect on which of these values align with your own journey"
                  </p>
                </div>
              </MindfulCard>

              {/* Team Culture */}
              <MindfulCard
                title="The People & Culture"
                subtitle="Who you'll be working with"
                icon={<Users className="w-5 h-5" />}
                delay={0.3}
              >
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-muted/50">
                    <p className="text-xs text-primary uppercase tracking-wider mb-1">Key Focus</p>
                    <p className="text-foreground">{company.keyFocus}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/50">
                    <p className="text-xs text-primary uppercase tracking-wider mb-1">Team Style</p>
                    <p className="text-foreground">{company.teamStyle}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Who they serve</p>
                  <div className="flex flex-wrap gap-2">
                    {company.targetCustomers.map((customer) => (
                      <span
                        key={customer}
                        className="px-4 py-2 rounded-full bg-primary/10 text-sm text-foreground"
                      >
                        {customer}
                      </span>
                    ))}
                  </div>
                </div>
              </MindfulCard>

              {/* Interview Prep */}
              <MindfulCard
                title="Prepare with Confidence"
                subtitle="Insights to help you shine"
                icon={<Sparkles className="w-5 h-5" />}
                delay={0.4}
              >
                <p className="text-muted-foreground mb-6">
                  These gentle reminders will help you feel prepared and centered.
                </p>

                <div className="space-y-4">
                  {company.interviewTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary"
                    >
                      <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </MindfulCard>

              {/* Recent News */}
              <MindfulCard
                title="Recent Developments"
                subtitle="Stay informed"
                icon={<Trophy className="w-5 h-5" />}
                delay={0.5}
              >
                <div className="space-y-4">
                  {company.recentNews.map((news, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <p className="text-foreground">{news}</p>
                    </motion.div>
                  ))}
                </div>
              </MindfulCard>
            </div>
          </div>

          {/* Footer message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground italic">
              "Knowledge brings confidence. You're more prepared than you know."
            </p>
          </motion.div>
        </main>
      </ZenContainer>
      <ThemedFooter />
    </ThemedLayout>
  );
};

export default CompanyResearch;
