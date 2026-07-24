export interface AgencyProfile {
  fullName: string;
  agencyName: string;
  tagline: string;
  bio: string;
  experienceYears: string;
  completedProjects: string;
  globalClients: string;
  awardsWon: string;
  profileImageUrl: string;
  skills: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
  popular?: boolean;
}

export interface PortfolioProject {
  id: string;
  category: string; // Industry
  title: string; // Project Name
  description: string; // Short Description
  imageUrl: string; // Main Image URL
  thumbnailUrl?: string; // Auto-generated thumbnail
  tags: string[];
  liveUrl?: string; // Website URL
  clientName?: string;
  year?: string;
  isPlaceholder: boolean;
  isFeatured?: boolean; // Featured Project toggle
  displayOrder?: number; // Display order
  status?: 'Published' | 'Draft'; // Project Status
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration: string;
  details: string[];
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  roleCompany: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  projectType: string;
  isPlaceholder: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  githubUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  dribbbleUrl: string;
}

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  businessName: string;
  serviceNeeded: string;
  budgetRange: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted';
}

export type ThemeMode = 'dark' | 'light';
