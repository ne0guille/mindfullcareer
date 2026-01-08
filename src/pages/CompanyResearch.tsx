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

// Semantic color palette for different sections
const sectionColors = {
  purpose: { bg: "bg-violet-50", border: "border-violet-200", accent: "bg-violet-500", text: "text-violet-600", light: "bg-violet-100", tape: "bg-violet-400" },
  values: { bg: "bg-amber-50", border: "border-amber-200", accent: "bg-amber-500", text: "text-amber-600", light: "bg-amber-100", tape: "bg-amber-400" },
  team: { bg: "bg-sky-50", border: "border-sky-200", accent: "bg-sky-500", text: "text-sky-600", light: "bg-sky-100", tape: "bg-sky-400" },
  interview: { bg: "bg-rose-50", border: "border-rose-200", accent: "bg-rose-500", text: "text-rose-600", light: "bg-rose-100", tape: "bg-rose-400" },
  news: { bg: "bg-teal-50", border: "border-teal-200", accent: "bg-teal-500", text: "text-teal-600", light: "bg-teal-100", tape: "bg-teal-400" },
  journey: { bg: "bg-indigo-50", border: "border-indigo-200", accent: "bg-indigo-500", text: "text-indigo-600", light: "bg-indigo-100", tape: "bg-indigo-400" },
};

// Colorful card wrapper with tape accent
const ColorfulCard = ({ 
  children, 
  color, 
  tapePosition = "left",
  className = "" 
}: { 
  children: React.ReactNode; 
  color: typeof sectionColors.purpose;
  tapePosition?: "left" | "right" | "top";
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`relative ${color.bg} ${color.border} border rounded-2xl p-6 overflow-hidden ${className}`}
  >
    {/* Tape accent */}
    {tapePosition === "left" && (
      <div className={`absolute left-0 top-6 bottom-6 w-1.5 ${color.tape} rounded-r-full`} />
    )}
    {tapePosition === "top" && (
      <div className={`absolute top-0 left-6 right-6 h-1.5 ${color.tape} rounded-b-full`} />
    )}
    {tapePosition === "right" && (
      <div className={`absolute right-0 top-6 bottom-6 w-1.5 ${color.tape} rounded-l-full`} />
    )}
    {children}
  </motion.div>
);

// Colorful icon badge
const IconBadge = ({ icon, color }: { icon: React.ReactNode; color: typeof sectionColors.purpose }) => (
  <div className={`w-10 h-10 rounded-xl ${color.light} ${color.text} flex items-center justify-center`}>
    {icon}
  </div>
);

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
              {/* What They Do - Violet */}
              <ColorfulCard color={sectionColors.purpose} tapePosition="left">
                <div className="flex items-center gap-3 mb-4">
                  <IconBadge icon={<Target className="w-5 h-5" />} color={sectionColors.purpose} />
                  <div>
                    <h3 className="font-semibold text-foreground">Understanding Their Purpose</h3>
                    <p className="text-sm text-muted-foreground">What drives this company</p>
                  </div>
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6 pl-1">
                  {company.whatTheyDo}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl ${sectionColors.purpose.light} border ${sectionColors.purpose.border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className={`w-4 h-4 ${sectionColors.purpose.text}`} />
                      <p className={`text-xs font-medium ${sectionColors.purpose.text} uppercase tracking-wider`}>Problem They Solve</p>
                    </div>
                    <p className="text-sm text-foreground">{company.problemSolved}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${sectionColors.purpose.light} border ${sectionColors.purpose.border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className={`w-4 h-4 ${sectionColors.purpose.text}`} />
                      <p className={`text-xs font-medium ${sectionColors.purpose.text} uppercase tracking-wider`}>Their Promise</p>
                    </div>
                    <p className="text-sm text-foreground">{company.valueProposition}</p>
                  </div>
                </div>
              </ColorfulCard>

              {/* Core Values - Amber */}
              <ColorfulCard color={sectionColors.values} tapePosition="top">
                <div className="flex items-center gap-3 mb-4">
                  <IconBadge icon={<Heart className="w-5 h-5" />} color={sectionColors.values} />
                  <div>
                    <h3 className="font-semibold text-foreground">Values That Guide Them</h3>
                    <p className="text-sm text-muted-foreground">See if they resonate with you</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {company.coreValues.map((value, index) => (
                    <motion.div
                      key={value}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`p-4 rounded-xl ${sectionColors.values.light} border ${sectionColors.values.border} text-center`}
                    >
                      <p className="font-medium text-foreground">{value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className={`mt-6 p-4 rounded-xl bg-gradient-to-br from-amber-100/80 to-amber-50/50 border ${sectionColors.values.border}`}>
                  <p className="text-sm text-amber-700 italic text-center">
                    "Reflect on which of these values align with your own journey"
                  </p>
                </div>
              </ColorfulCard>

              {/* Team Culture - Sky Blue */}
              <ColorfulCard color={sectionColors.team} tapePosition="right">
                <div className="flex items-center gap-3 mb-4">
                  <IconBadge icon={<Users className="w-5 h-5" />} color={sectionColors.team} />
                  <div>
                    <h3 className="font-semibold text-foreground">The People & Culture</h3>
                    <p className="text-sm text-muted-foreground">Who you'll be working with</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-xl ${sectionColors.team.light} border ${sectionColors.team.border}`}>
                    <p className={`text-xs ${sectionColors.team.text} uppercase tracking-wider mb-1 font-medium`}>Key Focus</p>
                    <p className="text-foreground">{company.keyFocus}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${sectionColors.team.light} border ${sectionColors.team.border}`}>
                    <p className={`text-xs ${sectionColors.team.text} uppercase tracking-wider mb-1 font-medium`}>Team Style</p>
                    <p className="text-foreground">{company.teamStyle}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Who they serve</p>
                  <div className="flex flex-wrap gap-2">
                    {company.targetCustomers.map((customer) => (
                      <span
                        key={customer}
                        className={`px-4 py-2 rounded-full ${sectionColors.team.light} ${sectionColors.team.text} text-sm font-medium border ${sectionColors.team.border}`}
                      >
                        {customer}
                      </span>
                    ))}
                  </div>
                </div>
              </ColorfulCard>

              {/* Interview Prep - Rose */}
              <ColorfulCard color={sectionColors.interview} tapePosition="left">
                <div className="flex items-center gap-3 mb-4">
                  <IconBadge icon={<Sparkles className="w-5 h-5" />} color={sectionColors.interview} />
                  <div>
                    <h3 className="font-semibold text-foreground">Prepare with Confidence</h3>
                    <p className="text-sm text-muted-foreground">Insights to help you shine</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  These gentle reminders will help you feel prepared and centered.
                </p>

                <div className="space-y-3">
                  {company.interviewTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`flex items-start gap-4 p-4 rounded-xl ${sectionColors.interview.light} border-l-4 ${sectionColors.interview.border} border`}
                      style={{ borderLeftColor: 'rgb(244 63 94)' }}
                    >
                      <span className={`w-8 h-8 rounded-full ${sectionColors.interview.accent} flex items-center justify-center text-white font-medium flex-shrink-0 text-sm`}>
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </ColorfulCard>

              {/* Recent News - Teal */}
              <ColorfulCard color={sectionColors.news} tapePosition="top">
                <div className="flex items-center gap-3 mb-4">
                  <IconBadge icon={<Trophy className="w-5 h-5" />} color={sectionColors.news} />
                  <div>
                    <h3 className="font-semibold text-foreground">Recent Developments</h3>
                    <p className="text-sm text-muted-foreground">Stay informed</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {company.recentNews.map((news, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-xl ${sectionColors.news.light} border ${sectionColors.news.border}`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${sectionColors.news.accent}`} />
                      <p className="text-foreground">{news}</p>
                    </motion.div>
                  ))}
                </div>
              </ColorfulCard>
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
