import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  Rocket,
  Users,
  Code,
  Accessibility,
  Globe,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";

interface GrowthItem {
  title: string;
  description: string;
  icon: "rocket" | "users" | "code" | "accessibility" | "globe";
  color: "violet" | "blue" | "emerald" | "amber" | "rose";
  timeframe: string;
}

interface GrowthRevelationTimelineProps {
  items: GrowthItem[];
}

const iconMap = {
  rocket: Rocket,
  users: Users,
  code: Code,
  accessibility: Accessibility,
  globe: Globe,
};

const colorMap = {
  violet: {
    bg: "bg-accent-violet/10",
    border: "border-accent-violet/30",
    text: "text-accent-violet",
    glow: "shadow-accent-violet/30",
    gradient: "from-accent-violet to-accent-violet/50",
    line: "bg-accent-violet",
  },
  blue: {
    bg: "bg-accent-blue/10",
    border: "border-accent-blue/30",
    text: "text-accent-blue",
    glow: "shadow-accent-blue/30",
    gradient: "from-accent-blue to-accent-blue/50",
    line: "bg-accent-blue",
  },
  emerald: {
    bg: "bg-accent-emerald/10",
    border: "border-accent-emerald/30",
    text: "text-accent-emerald",
    glow: "shadow-accent-emerald/30",
    gradient: "from-accent-emerald to-accent-emerald/50",
    line: "bg-accent-emerald",
  },
  amber: {
    bg: "bg-accent-amber/10",
    border: "border-accent-amber/30",
    text: "text-accent-amber",
    glow: "shadow-accent-amber/30",
    gradient: "from-accent-amber to-accent-amber/50",
    line: "bg-accent-amber",
  },
  rose: {
    bg: "bg-accent-rose/10",
    border: "border-accent-rose/30",
    text: "text-accent-rose",
    glow: "shadow-accent-rose/30",
    gradient: "from-accent-rose to-accent-rose/50",
    line: "bg-accent-rose",
  },
};

const GrowthRevelationTimeline = ({ items }: GrowthRevelationTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollXProgress } = useScroll({
    container: scrollRef,
  });

  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    const newIndex = Math.round(latest * (items.length - 1));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Section header hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4 text-accent-violet" />
          <span>Scroll to reveal your growth trajectory</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ChevronRight className="w-4 h-4 animate-pulse" />
        </div>
      </motion.div>

      {/* Progress indicator */}
      <div className="flex gap-2 mb-4">
        {items.map((item, index) => {
          const colors = colorMap[item.color];
          return (
            <motion.div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index <= activeIndex ? colors.line : "bg-muted/30"
              }`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            />
          );
        })}
      </div>

      {/* Scrollable timeline */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-6 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-6" style={{ width: `${items.length * 340}px` }}>
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];
            const colors = colorMap[item.color];
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={index}
                className="snap-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <motion.div
                  className={`relative w-[320px] p-6 rounded-3xl border backdrop-blur-xl transition-all duration-500
                    ${colors.border} ${colors.bg}
                    ${isActive ? `shadow-2xl ${colors.glow}` : "shadow-lg"}
                  `}
                  whileHover={{ y: -8, scale: 1.02 }}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                    y: isActive ? -4 : 0,
                  }}
                >
                  {/* Reveal gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "200%" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 1 }}
                  />

                  {/* Floating particles */}
                  {isActive && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1.5 h-1.5 rounded-full ${colors.line} opacity-40`}
                          initial={{
                            x: 20 + i * 30,
                            y: 20 + i * 20,
                          }}
                          animate={{
                            y: [null, -10, 10],
                            opacity: [0.4, 0.8, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </>
                  )}

                  {/* Card content */}
                  <div className="relative z-10">
                    {/* Icon and timeframe */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`p-3 rounded-2xl ${colors.bg} border ${colors.border}`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </motion.div>

                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${colors.bg} border ${colors.border}`}>
                        <Clock className={`w-3 h-3 ${colors.text}`} />
                        <span className={`text-xs font-medium ${colors.text}`}>
                          {item.timeframe}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h4>

                    {/* Description with reveal animation */}
                    <motion.p
                      className="text-sm text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.2 }}
                    >
                      {item.description}
                    </motion.p>

                    {/* Growth indicator */}
                    <motion.div
                      className="mt-4 pt-4 border-t border-border/30"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${colors.line} animate-pulse`} />
                        <span className="text-xs text-muted-foreground">
                          Growth opportunity #{index + 1}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summary callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-accent-violet/10 via-accent-blue/10 to-accent-emerald/10 
          border border-accent-violet/20"
      >
        <div className="flex items-center gap-3">
          <Rocket className="w-5 h-5 text-accent-violet" />
          <p className="text-sm text-muted-foreground">
            This role offers <span className="text-foreground font-medium">{items.length} distinct growth paths</span> across 
            technical leadership, cross-functional exposure, and industry expertise.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default GrowthRevelationTimeline;
