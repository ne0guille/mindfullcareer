import { Link } from "react-router-dom";
import { Building2, Search, RefreshCw, Plus, ExternalLink, Leaf, Clock } from "lucide-react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedFooter from "@/components/ThemedFooter";
import ZenContainer from "@/components/zen/ZenContainer";
import MindfulCard from "@/components/zen/MindfulCard";
import AffirmationBanner from "@/components/zen/AffirmationBanner";
import GentleButton from "@/components/zen/GentleButton";
import { motion } from "framer-motion";
import { useState } from "react";

// Mock companies data
const mockCompanies = [
  {
    id: "1",
    name: "Hogarth Worldwide",
    website: "hogarth.com",
    status: "researched",
    updatedAt: "1 day ago",
  },
  {
    id: "2",
    name: "Zaelot Inc.",
    website: "zaelot.com",
    status: "needs-refresh",
    updatedAt: "7 days ago",
  },
  {
    id: "3",
    name: "Webflow",
    website: "webflow.co",
    status: "needs-refresh",
    updatedAt: "7 days ago",
  },
  {
    id: "4",
    name: "Pasito",
    website: "pasito.ai",
    status: "needs-refresh",
    updatedAt: "9 days ago",
  },
  {
    id: "5",
    name: "Félix Pago",
    website: "felixpago.com",
    status: "needs-refresh",
    updatedAt: "11 days ago",
  },
  {
    id: "6",
    name: "Odiin",
    website: "odiin.tech",
    status: "needs-refresh",
    updatedAt: "11 days ago",
  },
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
        <main className="container max-w-5xl mx-auto px-4 py-8">
          {/* Affirmation Banner */}
          <AffirmationBanner className="mb-10" />

          {/* Header Section */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h1 className="text-3xl font-light text-foreground">
                    Company Research
                  </h1>
                </div>
                <p className="text-muted-foreground max-w-md">
                  Prepare mindfully for your interviews with deep company insights
                </p>
              </div>

              <div className="flex items-center gap-3">
                <GentleButton
                  variant="secondary"
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  Refresh All
                </GentleButton>
                <GentleButton
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                >
                  Research Company
                </GentleButton>
              </div>
            </div>
          </motion.header>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <FilterTab
              active={filter === "all"}
              onClick={() => setFilter("all")}
              count={mockCompanies.length}
            >
              All
            </FilterTab>
            <FilterTab
              active={filter === "researched"}
              onClick={() => setFilter("researched")}
              icon={<Search className="w-3.5 h-3.5" />}
              count={researchedCount}
            >
              Researched
            </FilterTab>
            <FilterTab
              active={filter === "needs-refresh"}
              onClick={() => setFilter("needs-refresh")}
              icon={<RefreshCw className="w-3.5 h-3.5" />}
              count={needsRefreshCount}
            >
              Needs Refresh
            </FilterTab>
          </motion.div>

          {/* Companies Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCompanies.map((company, index) => (
              <CompanyCard key={company.id} company={company} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">
                No companies found. Start researching to grow your knowledge.
              </p>
            </motion.div>
          )}

          {/* Encouragement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground italic">
              "Understanding a company is the first step to belonging there."
            </p>
          </motion.div>
        </main>
      </ZenContainer>
      <ThemedFooter />
    </ThemedLayout>
  );
};

// Filter Tab Component
const FilterTab = ({
  children,
  active,
  onClick,
  icon,
  count,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  count: number;
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
      ${
        active
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
      }
    `}
  >
    {icon}
    {children}
    <span
      className={`text-xs ${
        active ? "text-primary-foreground/80" : "text-muted-foreground"
      }`}
    >
      ({count})
    </span>
  </motion.button>
);

// Company Card Component
const CompanyCard = ({
  company,
  index,
}: {
  company: typeof mockCompanies[0];
  index: number;
}) => {
  const isResearched = company.status === "researched";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
    >
      <MindfulCard className="h-full" delay={0}>
        <div className="flex items-start gap-4">
          {/* Company Icon */}
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-7 h-7 text-primary" />
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-lg mb-1">
              {company.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">{company.website}</p>

            {/* Status Badge */}
            <div className="flex items-center gap-3">
              {isResearched ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Search className="w-3 h-3" />
                  Researched
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                  <RefreshCw className="w-3 h-3" />
                  Needs Refresh
                </span>
              )}
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {company.updatedAt}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-4" />

        {/* Action */}
        <div className="flex justify-end">
          <Link to={`/company/${company.id}`}>
            <GentleButton
              variant="secondary"
              size="sm"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              View Research
            </GentleButton>
          </Link>
        </div>
      </MindfulCard>
    </motion.div>
  );
};

export default Companies;
