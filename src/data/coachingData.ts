// Language Fingerprint data
export const languageFingerprint = {
  powerVerbs: ["deliver", "design", "develop", "implement", "follow", "work"],
  jargon: [
    "HTML",
    "CSS",
    "JavaScript",
    "WCAG 2.1",
    "web accessibility",
    "cross browser compatibility",
    "semantic code",
    "web standards",
    "Google Tag Manager",
    "Google Analytics",
    "Content Management System",
  ],
  cultureSignals: [
    "highly motivated",
    "team environment",
    "exchanging ideas",
    "resourceful and innovative",
    "quickly and creatively adapt",
    "changing landscape",
  ],
  communicationStyle: "Formal",
  evidence: [
    "highly motivated, experienced front-end developer",
    "team environment is critical to our success",
  ],
};

// Requirements data
export const requirements = [
  {
    text: "ability to quickly and creatively adapt to a changing landscape",
    priority: "high" as const,
    matched: true,
    insight:
      "This suggests they've had challenges with slow-moving developers. Emphasize your agility in past roles.",
  },
  {
    text: "team environment is critical to our success",
    priority: "high" as const,
    matched: true,
    insight:
      "Team collaboration is deeply valued. Highlight pair programming or cross-functional projects.",
  },
  {
    text: "expert understanding of cross browser compatibility",
    priority: "medium" as const,
    matched: false,
    insight:
      "They may have legacy browser requirements. Ask about their browser support matrix.",
  },
  {
    text: "Ability to handle multiple projects simultaneously",
    priority: "medium" as const,
    matched: true,
  },
];

// Hidden Priorities data
export const hiddenPriorities = [
  {
    keyword: "web standards",
    count: 3,
    color: "emerald" as const,
    context: "Mentioned in technical requirements and code quality expectations",
    insight:
      "They prioritize maintainable, standards-compliant code over quick fixes",
  },
  {
    keyword: "team",
    count: 4,
    color: "violet" as const,
    context: "Emphasized throughout role description and requirements",
    insight:
      "Collaboration and team integration are more important than individual brilliance",
  },
  {
    keyword: "hospitality industry",
    count: 2,
    color: "amber" as const,
    context: "Mentioned in team description and business context",
    insight: "Domain knowledge of hotel booking and ecommerce would be valuable",
  },
];

// Technical Skills data
export const technicalSkills = [
  {
    text: "Expert HTML/CSS developer with JavaScript frameworks experience",
    evidence:
      "Senior Frontend Developer with Angular/React experience and comprehensive web platform development",
  },
  {
    text: "Write clean, semantic, web standards code with cross browser compatibility",
    evidence: null,
  },
  {
    text: "Knowledge of WCAG 2.1 and web accessibility importance",
    hasIdea: true,
  },
  {
    text: "Experience with Google Tag Manager/Google Analytics and web tracking tools",
    hasIdea: true,
  },
];

// Soft Skills data
export const softSkills = [
  {
    text: "Work effectively in team environment, exchanging ideas",
    evidence: null,
  },
  {
    text: "Resourceful and innovative with ability to quickly adapt to changing landscape",
    evidence: null,
  },
  {
    text: "Excellent written and verbal communication skills",
    evidence: null,
  },
  {
    text: "Ability to handle multiple projects simultaneously",
    evidence: null,
  },
];

// Domain Expertise data
export const domainExpertise = [
  {
    text: "Experience developing ecommerce and web portal solutions",
    evidence: null,
  },
  {
    text: "Understanding of hospitality industry booking systems",
    hasIdea: true,
  },
  {
    text: "Experience working within Content Management Systems",
    hasIdea: true,
  },
];

// Achievements data
export const achievements = [
  {
    text: "Deliver state-of-the-art web applications with measurable performance improvements",
    evidence: null,
  },
];

// Resume Bullets data
export const resumeBullets = [
  {
    category: "Technical Leadership",
    original:
      "Led frontend development team to build web applications using React and TypeScript",
    enhanced:
      "Delivered state-of-the-art web applications using React, leading a collaborative team environment while maintaining web standards and cross browser compatibility",
    keywords: ["web standards", "team environment", "deliver"],
  },
  {
    category: "Accessibility",
    original:
      "Implemented accessibility features to improve user experience for all users",
    enhanced:
      "Developed WCAG 2.1 compliant interfaces with expert understanding of web accessibility, ensuring inclusive experiences across all browsers",
    keywords: ["WCAG 2.1", "web accessibility", "cross browser compatibility"],
  },
  {
    category: "Analytics & Tracking",
    original:
      "Set up analytics tracking to measure user engagement and conversion rates",
    enhanced:
      "Implemented Google Tag Manager and Google Analytics solutions, quickly adapting tracking strategies to the changing landscape of user behavior analysis",
    keywords: ["Google Tag Manager", "Google Analytics", "quickly adapt"],
  },
  {
    category: "Team Collaboration",
    original:
      "Worked with designers and product managers to deliver new features on time",
    enhanced:
      "Collaborated in a team environment exchanging ideas with cross-functional stakeholders, demonstrating resourceful and innovative approaches to deliver high-quality features",
    keywords: ["team environment", "exchanging ideas", "resourceful and innovative"],
  },
];
