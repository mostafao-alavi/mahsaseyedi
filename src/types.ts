export interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  packageName: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}

export interface QuizAnswers {
  q1: string; // Business Type
  q2: string; // Work hours
  q3: string; // Repetitive percentage
  q4: string; // SOP status
  q5: string; // Core bottleneck
  q6: string; // Work-life balance
  q7: string; // Project management tool
  q8: string; // Marketing system
  q9: string; // Readiness for change
}

export interface LeadInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  type: "telegram" | "sheets" | "database";
  message: string;
  details?: any;
}

export interface CoachingPackage {
  id: string;
  title: string;
  period: string;
  price: string;
  badge?: string;
  description: string;
  features: string[];
  ctaText: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "سیستمسازی" | "روانشناسی کارآفرینی" | "استراتژی محتوا" | "مدیریت پروژه";
  date: string;
  readTime: string;
}
