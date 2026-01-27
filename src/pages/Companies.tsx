import { Link } from "react-router-dom";
import { Building2, Search, RefreshCw, Plus, ExternalLink, Leaf, Clock, Sparkles, Globe, TrendingUp, Heart, CheckCircle2, GraduationCap } from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import ZenContainer from "@/components/zen/ZenContainer";
import AffirmationBanner from "@/components/zen/AffirmationBanner";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Color palette for companies - soft and transparent
const companyColors = [
  { border: "border-emerald-200/60", accent: "bg-emerald-400", text: "text-emerald-500", light: "bg-emerald-50/80", iconBg: "bg-emerald-100/60" },
  { border: "border-violet-200/60", accent: "bg-violet-400", text: "text-violet-500", light: "bg-violet-50/80", iconBg: "bg-violet-100/60" },
  { border: "border-amber-200/60", accent: "bg-amber-400", text: "text-amber-500", light: "bg-amber-50/80", iconBg: "bg-amber-100/60" },
  { border: "border-sky-200/60", accent: "bg-sky-400", text: "text-sky-500", light: "bg-sky-50/80", iconBg: "bg-sky-100/60" },
  { border: "border-rose-200/60", accent: "bg-rose-400", text: "text-rose-500", light: "bg-rose-50/80", iconBg: "bg-rose-100/60" },
  { border: "border-teal-200/60", accent: "bg-teal-400", text: "text-teal-500", light: "bg-teal-50/80", iconBg: "bg-teal-100/60" },
];

// Mock companies data with color index
const mockCompanies = [
  { id: "1", name: "Hogarth Worldwide", website: "hogarth.com", status: "researched", coachingDone: true, updatedAt: "1 day ago", industry: "Creative Agency", colorIndex: 0 },
  { id: "2", name: "Zaelot Inc.", website: "zaelot.com", status: "needs-refresh", coachingDone: false, updatedAt: "7 days ago", industry: "Technology", colorIndex: 1 },
  { id: "3", name: "Webflow", website: "webflow.co", status: "researched", coachingDone: true, updatedAt: "7 days ago", industry: "Design Tools", colorIndex: 2 },
  { id: "4", name: "Pasito", website: "pasito.ai", status: "researched", coachingDone: false, updatedAt: "9 days ago", industry: "AI/ML", colorIndex: 3 },
  { id: "5", name: "Félix Pago", website: "felixpago.com", status: "needs-refresh", coachingDone: false, updatedAt: "11 days ago", industry: "FinTech", colorIndex: 4 },
  { id: "6", name: "Odiin", website: "odiin.tech", status: "needs-refresh", coachingDone: false, updatedAt: "11 days ago", industry: "SaaS", colorIndex: 5 },
];

type FilterType = "all" | "researched" | "needs-refresh";

const Companies = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredCompanies = mockCompanies.filter((company) => {
    if (filter === "all") return true;
    return company.status === filter;
  });

  const researchedCount = mockCompanies.filter((c) => c.status === "researched").length;
  const needsRefreshCount = mockCompanies.filter((c) => c.status === "needs-refresh").length;

  return (
    <ThemedLayout>
      <ZenContainer className="pb-20">
        <main className="container max-w-6xl mx-auto px-4 py-8">
          {/* Affirmation Banner */}
          <AffirmationBanner className="mb-10" />

          {/* Hero Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-amber-100 text-sm font-medium text-foreground/70 mb-6"
            >
              <Sparkles className="w-4 h-4 text-violet-500" />
              {mockCompanies.length} companies in your research library
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Company <span className="font-semibold bg-gradient-to-r from-primary via-violet-500 to-amber-500 bg-clip-text text-transparent">Research</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Deep insights to help you prepare mindfully for interviews
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <Button variant="outline" className="gap-2 rounded-full px-6">
                <RefreshCw className="w-4 h-4" />
                Refresh All
              </Button>
              <Button className="gap-2 rounded-full px-6 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90">
                <Plus className="w-4 h-4" />
                Research Company
              </Button>
            </div>
          </motion.header>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <FilterPill
              active={filter === "all"}
              onClick={() => setFilter("all")}
              count={mockCompanies.length}
              color="bg-gradient-to-r from-slate-100 to-slate-50"
              activeColor="bg-gradient-to-r from-slate-700 to-slate-600"
            >
              All
            </FilterPill>
            <FilterPill
              active={filter === "researched"}
              onClick={() => setFilter("researched")}
              icon={<Search className="w-3.5 h-3.5" />}
              count={researchedCount}
              color="bg-gradient-to-r from-emerald-100 to-teal-50"
              activeColor="bg-gradient-to-r from-emerald-600 to-teal-500"
            >
              Researched
            </FilterPill>
            <FilterPill
              active={filter === "needs-refresh"}
              onClick={() => setFilter("needs-refresh")}
              icon={<RefreshCw className="w-3.5 h-3.5" />}
              count={needsRefreshCount}
              color="bg-gradient-to-r from-amber-100 to-orange-50"
              activeColor="bg-gradient-to-r from-amber-500 to-orange-500"
            >
              Needs Refresh
            </FilterPill>
          </motion.div>

          {/* Masonry-style Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <CompanyCard key={company.id} company={company} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-100 to-amber-100 flex items-center justify-center"
              >
                <Leaf className="w-10 h-10 text-violet-500" />
              </motion.div>
              <p className="text-muted-foreground text-lg">
                No companies found. Start researching to grow your knowledge.
              </p>
            </motion.div>
          )}

          {/* Footer Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-50 via-white to-amber-50 border border-violet-100">
              <Heart className="w-5 h-5 text-rose-400" />
              <p className="text-muted-foreground italic">
                "Understanding a company is the first step to belonging there."
              </p>
            </div>
          </motion.div>
        </main>
      </ZenContainer>
      <ThemedFooter />
    </ThemedLayout>
  );
};

// Filter Pill Component
const FilterPill = ({
  children,
  active,
  onClick,
  icon,
  count,
  color,
  activeColor,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  count: number;
  color: string;
  activeColor: string;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
      ${active ? `${activeColor} text-white shadow-lg` : `${color} text-foreground/70 hover:shadow-md`}
    `}
  >
    {icon}
    {children}
    <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? "bg-white/20" : "bg-black/5"}`}>
      {count}
    </span>
  </motion.button>
);

// Company Card Component - Minimal + Hover Reveal
const CompanyCard = ({
  company,
  index,
}: {
  company: typeof mockCompanies[0];
  index: number;
}) => {
  const isResearched = company.status === "researched";
  const colors = companyColors[company.colorIndex % companyColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.06, type: "spring", stiffness: 120 }}
      className="group"
    >
      <Link to={`/company/${company.id}`}>
        <div className="relative rounded-2xl bg-card border border-border/40 p-6 transition-all duration-300 
          hover:shadow-xl hover:shadow-black/8 hover:border-border cursor-pointer overflow-hidden">
          
          {/* Status Icons - Top Right Corner */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {isResearched && (
              <div className="w-7 h-7 rounded-full bg-accent-emerald/15 flex items-center justify-center" title="Researched">
                <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
              </div>
            )}
            {company.coachingDone && (
              <div className="w-7 h-7 rounded-full bg-accent-violet/15 flex items-center justify-center" title="Coaching Done">
                <GraduationCap className="w-4 h-4 text-accent-violet" />
              </div>
            )}
          </div>
          
          {/* Minimal Default State */}
          <div className="flex flex-col items-center text-center">
            {/* Company Icon */}
            <motion.div
              className={`w-14 h-14 rounded-xl ${colors.light} flex items-center justify-center mb-4 border ${colors.border} 
                transition-transform duration-300 group-hover:scale-110`}
            >
              <Building2 className={`w-7 h-7 ${colors.text}`} />
            </motion.div>

            {/* Company Name */}
            <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors duration-200">
              {company.name}
            </h3>

            {/* Website - always visible */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Globe className="w-3.5 h-3.5" />
              {company.website}
            </div>
          </div>

          {/* Hover Reveal Panel */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/98 to-card/90 
            flex flex-col items-center justify-center p-6
            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300 ease-out">
            
            {/* Status Badge */}
            <div className="mb-3">
              {isResearched ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-emerald/15 text-accent-emerald text-xs font-medium">
                  <Search className="w-3 h-3" />
                  Researched
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-amber/15 text-accent-amber text-xs font-medium">
                  <RefreshCw className="w-3 h-3" />
                  Needs Update
                </span>
              )}
            </div>

            {/* Industry & Time */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-muted/60">
                <TrendingUp className="w-3 h-3" />
                {company.industry}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {company.updatedAt}
              </span>
            </div>

            {/* Action Button */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full max-w-[180px]"
            >
              <span className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                border-2 border-foreground/80 text-foreground bg-foreground/5
                hover:bg-foreground hover:text-background
                transition-all duration-200">
                <ExternalLink className="w-4 h-4" />
                View Research
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Companies;
