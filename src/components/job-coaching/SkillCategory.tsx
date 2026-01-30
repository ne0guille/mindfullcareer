import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SkillCategoryProps {
  title: string;
  icon: ReactNode;
  iconColor: "blue" | "violet" | "amber" | "rose" | "emerald";
  children: ReactNode;
  delay?: number;
}

const colorConfig = {
  blue: "text-accent-blue",
  violet: "text-accent-violet",
  amber: "text-accent-amber",
  rose: "text-accent-rose",
  emerald: "text-accent-emerald",
};

const SkillCategory = ({
  title,
  icon,
  iconColor,
  children,
  delay = 0,
}: SkillCategoryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-3"
    >
      <div className={`flex items-center gap-2 ${colorConfig[iconColor]}`}>
        {icon}
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </motion.div>
  );
};

export default SkillCategory;
