import type { IconType } from "react-icons";

export interface PersonalInfo {
  name: string;
  role: string;
  secondaryRole: string;
  location: string;
  email: string;
  bio: string;
  tagline: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType | any; // Any to allow lucide-react icons which might have different type definitions
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Project {
  title: string;
  desc: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  longDesc: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  socials: SocialLink[];
  skills: SkillCategory[];
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
