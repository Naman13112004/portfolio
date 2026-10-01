import type { IconType } from "react-icons";

export interface PersonalInfo {
  name: string;
  role: string;
  secondaryRole: string;
  headline: string;
  status: string;
  location: string;
  email: string;
  bio: string;
  tagline: string;
}

export interface CurrentFocus {
  primary: string[];
  statement: string;
}

export interface LearningInPublic {
  primaryPlatform: string;
  active: boolean;
  series: string;
  description: string;
  profileUrl: string;
}

export interface CodingStats {
  leetCodeSolved: string;
  badges: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType | any;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade: string;
}

export interface Achievement {
  title: string;
  detail: string;
  category: string;
}

export interface Interests {
  reading: string[];
  creative: string[];
}

export interface ContentPlatform {
  active?: boolean;
  description?: string;
  currentSeries?: string;
  seriesDescription?: string;
  url?: string;
  name?: string;
  handle?: string;
}

export interface Content {
  linkedin: ContentPlatform;
  youtube: ContentPlatform;
  instagram: ContentPlatform;
}

export interface TechnicalProfileItem {
  category: string;
  items: string[];
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Metric {
  label: string;
  value: string;
}

export interface ArchitectureNode {
  label: string;
}

export interface Project {
  title: string;
  desc: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  longDesc: string;
  metrics?: Metric[];
  architecture?: ArchitectureNode[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  currentFocus: CurrentFocus;
  learningInPublic: LearningInPublic;
  codingStats: CodingStats;
  socials: SocialLink[];
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
  interests: Interests;
  content: Content;
  skills: SkillCategory[];
  technicalProfile: TechnicalProfileItem[];
  projects: Project[];
}

// Graph specific types
export interface GraphNode {
  id: string;
  type: 'identity' | 'project' | 'tech' | 'exploring';
  label: string;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
