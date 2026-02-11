import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  ChevronLeft,
  ChevronRight,
  Building2,
  User,
  ArrowRight,
  Sparkles,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemedLayout from "@/components/ThemedLayout";

// Mock interview data
const mockInterviews = [
  {
    id: "1",
    company: "Félix Pago",
    role: "Senior Frontend Engineer",
    date: new Date(2026, 1, 11, 10, 0),
    duration: 60,
    type: "video" as const,
    stage: "Technical",
    interviewer: "Maria Gonzalez",
    location: "Google Meet",
    status: "upcoming" as const,
    prepScore: 85,
  },
  {
    id: "2",
    company: "Bluelight",
    role: "Javascript Engineer",
    date: new Date(2026, 1, 12, 14, 30),
    duration: 45,
    type: "video" as const,
    stage: "Culture Fit",
    interviewer: "James Park",
    location: "Zoom",
    status: "upcoming" as const,
    prepScore: 60,
  },
  {
    id: "3",
    company: "BTG Group",
    role: "Software Engineer",
    date: new Date(2026, 1, 13, 9, 0),
    duration: 90,
    type: "onsite" as const,
    stage: "System Design",
    interviewer: "Panel (3)",
    location: "São Paulo Office",
    status: "upcoming" as const,
    prepScore: 40,
  },
  {
    id: "4",
    company: "TechVentures",
    role: "Frontend Engineer",
    date: new Date(2026, 1, 14, 16, 0),
    duration: 30,
    type: "video" as const,
    stage: "HR Screen",
    interviewer: "Ana Torres",
    location: "Teams",
    status: "scheduled" as const,
    prepScore: 0,
  },
  {
    id: "5",
    company: "Very Good Ventures",
    role: "Senior Software Engineer",
    date: new Date(2026, 1, 17, 11, 0),
    duration: 60,
    type: "video" as const,
    stage: "Final Round",
    interviewer: "CEO + CTO",
    location: "Google Meet",
    status: "scheduled" as const,
    prepScore: 20,
  },
];

const stageColors: Record<string, string> = {
  "HR Screen": "bg-accent-blue/15 text-accent-blue border-accent-blue/20",
  Technical: "bg-accent-violet/15 text-accent-violet border-accent-violet/20",
  "Culture Fit": "bg-accent-amber/15 text-accent-amber border-accent-amber/20",
  "System Design": "bg-accent-rose/15 text-accent-rose border-accent-rose/20",
  "Final Round": "bg-accent-emerald/15 text-accent-emerald border-accent-emerald/20",
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

const formatDay = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isTomorrow = (date: Date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.toDateString() === tomorrow.toDateString();
};

const getDayLabel = (date: Date) => {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return formatDay(date);
};

// ============ LAYOUT 1: DASHBOARD + MINI CALENDAR ============

const MiniCalendar = ({
  selectedDate,
  onSelectDate,
  interviewDates,
}: {
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
  interviewDates: Date[];
}) => {
  const [viewMonth, setViewMonth] = useState(new Date(2026, 1, 1));

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();

  const hasInterview = (day: number) =>
    interviewDates.some(
      (d) =>
        d.getDate() === day &&
        d.getMonth() === viewMonth.getMonth() &&
        d.getFullYear() === viewMonth.getFullYear()
    );

  const isSelected = (day: number) =>
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === viewMonth.getMonth();

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1))}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <span className="text-sm font-semibold text-foreground">
          {viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1))}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-[10px] font-medium text-muted-foreground/60 py-1">
            {d}
          </div>
        ))}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const interview = hasInterview(day);
          const selected = isSelected(day);
          return (
            <button
              key={day}
              onClick={() =>
                onSelectDate(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day))
              }
              className={cn(
                "relative w-8 h-8 rounded-lg text-xs font-medium transition-all",
                selected
                  ? "bg-primary text-primary-foreground shadow-md"
                  : interview
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-foreground/70 hover:bg-muted"
              )}
            >
              {day}
              {interview && !selected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const InterviewDetailCard = ({ interview }: { interview: (typeof mockInterviews)[0] }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="rounded-2xl border border-border/50 bg-card p-5 hover:shadow-lg hover:border-primary/20 transition-all group"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
          {interview.company[0]}
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm">{interview.company}</h4>
          <p className="text-xs text-muted-foreground">{interview.role}</p>
        </div>
      </div>
      <span
        className={cn(
          "text-[10px] font-semibold px-2 py-1 rounded-full border",
          stageColors[interview.stage] || "bg-muted text-muted-foreground"
        )}
      >
        {interview.stage}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        <span>
          {formatTime(interview.date)} · {interview.duration}min
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {interview.type === "video" ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
        <span>{interview.location}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <User className="w-3.5 h-3.5" />
        <span>{interview.interviewer}</span>
      </div>
    </div>

    {/* Prep progress */}
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${interview.prepScore}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn(
            "h-full rounded-full",
            interview.prepScore >= 70
              ? "bg-accent-emerald"
              : interview.prepScore >= 40
              ? "bg-accent-amber"
              : "bg-accent-rose"
          )}
        />
      </div>
      <span className="text-[10px] font-medium text-muted-foreground">
        {interview.prepScore}% prepped
      </span>
    </div>

    <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="flex-1 text-[11px] font-medium px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center justify-center gap-1">
        <Sparkles className="w-3 h-3" /> Prep Now
      </button>
      <button className="flex-1 text-[11px] font-medium px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors flex items-center justify-center gap-1">
        <FileText className="w-3 h-3" /> Notes
      </button>
    </div>
  </motion.div>
);

const DashboardCalendarLayout = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 11));

  const selectedInterviews = mockInterviews.filter(
    (i) => i.date.toDateString() === selectedDate.toDateString()
  );

  const upcomingInterviews = mockInterviews
    .filter((i) => i.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Dashboard + Mini Calendar</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Click a date to filter · Dots indicate interview days
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Left: Mini Calendar + Stats */}
        <div className="space-y-4">
          <MiniCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            interviewDates={mockInterviews.map((i) => i.date)}
          />

          {/* Quick stats */}
          <div className="rounded-2xl border border-border/50 bg-card p-4 space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              This Week
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Interviews", value: "5", color: "text-primary" },
                { label: "Prepped", value: "2/5", color: "text-accent-emerald" },
                { label: "Companies", value: "5", color: "text-accent-violet" },
                { label: "Hours", value: "4.5h", color: "text-accent-amber" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={cn("text-lg font-bold", stat.color)}>{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interview list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              {selectedDate.toDateString() === new Date().toDateString()
                ? "Today's Interviews"
                : formatDay(selectedDate)}
            </h3>
            <span className="text-xs text-muted-foreground">
              {selectedInterviews.length} interview{selectedInterviews.length !== 1 ? "s" : ""}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {selectedInterviews.length > 0 ? (
              <motion.div
                key={selectedDate.toDateString()}
                className="grid gap-3 md:grid-cols-2"
              >
                {selectedInterviews.map((interview) => (
                  <InterviewDetailCard key={interview.id} interview={interview} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-dashed border-border/50 p-8 text-center"
              >
                <CalendarIcon className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No interviews on this day</p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Select a highlighted date to see interviews
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upcoming section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">All Upcoming</h3>
            <div className="space-y-2">
              {upcomingInterviews.map((interview, i) => (
                <motion.button
                  key={interview.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedDate(interview.date)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left group"
                >
                  <div className="w-10 text-center">
                    <div className="text-[10px] font-medium text-muted-foreground uppercase">
                      {interview.date.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className="text-lg font-bold text-foreground">{interview.date.getDate()}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {interview.company} — {interview.stage}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(interview.date)} · {interview.duration}min
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ LAYOUT 2: TIMELINE STRIP ============

const TimelineStripLayout = () => {
  const grouped = mockInterviews.reduce((acc, interview) => {
    const label = getDayLabel(interview.date);
    if (!acc[label]) acc[label] = [];
    acc[label].push(interview);
    return acc;
  }, {} as Record<string, typeof mockInterviews>);

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Timeline Strip</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Scroll horizontally · Grouped by day · Countdown to each interview
      </p>

      <div className="space-y-6">
        {Object.entries(grouped).map(([dayLabel, interviews], gi) => (
          <motion.div
            key={dayLabel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className={cn(
                  "text-xs font-bold px-3 py-1 rounded-full",
                  dayLabel === "Today"
                    ? "bg-primary text-primary-foreground"
                    : dayLabel === "Tomorrow"
                    ? "bg-accent-amber/15 text-accent-amber"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {dayLabel}
              </span>
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-[10px] text-muted-foreground">
                {interviews.length} interview{interviews.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Horizontal scroll strip */}
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide">
              {interviews.map((interview, i) => {
                const hoursUntil = Math.max(
                  0,
                  Math.round((interview.date.getTime() - Date.now()) / (1000 * 60 * 60))
                );

                return (
                  <motion.div
                    key={interview.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: gi * 0.1 + i * 0.08 }}
                    className="snap-start flex-shrink-0 w-[280px] rounded-2xl border border-border/50 bg-card p-5 hover:shadow-xl hover:border-primary/20 transition-all group relative overflow-hidden"
                  >
                    {/* Time accent bar */}
                    <div
                      className={cn(
                        "absolute top-0 left-0 right-0 h-1",
                        interview.prepScore >= 70
                          ? "bg-accent-emerald"
                          : interview.prepScore >= 40
                          ? "bg-accent-amber"
                          : "bg-accent-rose"
                      )}
                    />

                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {interview.company[0]}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm leading-tight">
                            {interview.company}
                          </h4>
                          <p className="text-[11px] text-muted-foreground">{interview.role}</p>
                        </div>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-block mb-3",
                        stageColors[interview.stage]
                      )}
                    >
                      {interview.stage}
                    </span>

                    <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-medium text-foreground">{formatTime(interview.date)}</span>
                        <span>· {interview.duration}min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {interview.type === "video" ? (
                          <Video className="w-3.5 h-3.5" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5" />
                        )}
                        <span>{interview.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>{interview.interviewer}</span>
                      </div>
                    </div>

                    {/* Countdown */}
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-muted-foreground">
                        <span className="font-bold text-foreground text-sm">{hoursUntil}h</span> until
                        interview
                      </div>
                      <button className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100">
                        <Sparkles className="w-3 h-3" /> Prep
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============ PAGE ============

const InterviewsDemo = () => {
  return (
    <ThemedLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Interview Calendar Layouts</h1>
          <p className="text-muted-foreground">Compare two layout options for your synced interviews</p>
        </div>

        <DashboardCalendarLayout />

        <div className="border-t border-border/30 pt-12">
          <TimelineStripLayout />
        </div>
      </div>
    </ThemedLayout>
  );
};

export default InterviewsDemo;
