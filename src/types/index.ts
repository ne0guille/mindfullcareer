export interface Job {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  location: string;
  type: string;
  level: string;
  expiresIn: string;
  savedAt: string;
  skills: string[];
  matchPercentage: number;
  hasCoverLetter: boolean;
  isMatched: boolean;
}

export interface SkillMatch {
  name: string;
  matched: boolean;
}

export interface CompanyResearch {
  id: string;
  name: string;
  website: string;
  tagline: string;
  industry: string;
  type: string;
  size: string;
  completionPercentage: number;
  researchedAt: string;
  whatTheyDo: string;
  problemSolved: string;
  valueProposition: string;
  targetCustomers: string[];
  coreValues: string[];
  keyFocus: string;
  teamStyle: string;
  interviewTips: string[];
  recentNews: string[];
}
