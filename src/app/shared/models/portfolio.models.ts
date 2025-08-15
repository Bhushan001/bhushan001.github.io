export interface Skill {
  name: string;
  proficiency: number;
  icon: string;
  color: string;
  category: string;
}

export interface SkillCategory {
  [key: string]: Skill[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  isCurrent: boolean;
}

export interface Project {
  name: string;
  description: string;
  category: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  stackoverflow: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  location: string;
  experience: string;
  education: string[];
  hobbies: string[];
}
