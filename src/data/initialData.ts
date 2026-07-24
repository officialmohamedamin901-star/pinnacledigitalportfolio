import {
  AgencyProfile,
  ServiceItem,
  PortfolioProject,
  ProcessStep,
  WhyChooseItem,
  TestimonialItem,
  FaqItem,
  ContactInfo
} from '../types';
// @ts-ignore
import mateoPortrait from '../assets/images/mateo_sanchez_portrait_1784819046879.jpg';

export const INITIAL_AGENCY_PROFILE: AgencyProfile = {
  fullName: 'Mateo Sanchez',
  agencyName: 'AXON STUDIO',
  tagline: 'AI Web Designer • Website Developer • Digital Creator',
  bio: 'I craft bespoke, high-converting digital platforms and AI-enhanced web architectures that elevate market presence, command authority, and transform casual visitors into loyal clients.',
  experienceYears: '8+ Years Crafting Digital Realities',
  completedProjects: '140+ Projects Delivered',
  globalClients: '28+ Countries',
  awardsWon: 'Awwwards / FWA / CSS Design Winner',
  profileImageUrl: mateoPortrait,
  skills: [
    'AI Web Architecture',
    'Custom React & TypeScript',
    'Editorial UI/UX Design',
    'Motion & Interactive Canvas',
    'High-Conversion Funnels',
    'Headless CMS & Databases',
    'Brand Identity Systems'
  ]
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'business-websites',
    title: 'Business Websites',
    description: 'High-converting corporate web experiences with luxury design, dynamic storytelling, and interactive lead funnels.',
    iconName: 'Building2',
    deliverables: ['Custom UI/UX Architecture', 'Responsive Multi-Page Build', 'CMS Integration', 'Conversion Lead Forms'],
    popular: true
  },
  {
    id: 'restaurant-websites',
    title: 'Restaurant Websites',
    description: 'Sensory digital dining experiences featuring online menu showcases, reservation widgets, and order management.',
    iconName: 'Utensils',
    deliverables: ['Interactive Menu Cards', 'Table Reservation Engine', 'Location & Hours Sync', 'Mobile Ordering UI']
  },
  {
    id: 'real-estate-websites',
    title: 'Real Estate Websites',
    description: 'Ultra-luxurious property showcases with interactive floor plan viewers, virtual tour embeds, and agent CRM connectors.',
    iconName: 'Home',
    deliverables: ['Luxury Property Listings', 'Map & Search Filters', 'Mortgage Calculator', 'Inquiry Booking Lead System'],
    popular: true
  },
  {
    id: 'medical-websites',
    title: 'Medical Websites',
    description: 'HIPAA-compliant, highly accessible healthcare portals for clinics, surgical centers, and modern wellness brands.',
    iconName: 'Stethoscope',
    deliverables: ['Patient Appointment Booking', 'Specialty Service Guides', 'Doctor Directories', 'Secure Intake Forms']
  },
  {
    id: 'law-firm-websites',
    title: 'Law Firm Websites',
    description: 'Commanding, trustworthy legal agency portals designed to establish authority and convert high-value clientele.',
    iconName: 'Scale',
    deliverables: ['Practice Area Directory', 'Attorney Profile Cards', 'Case Results Showcase', 'Encrypted Consultation Form']
  },
  {
    id: 'construction-websites',
    title: 'Construction Websites',
    description: 'Robust commercial and residential contractor platforms showcasing heavy machinery, project galleries, and estimation engines.',
    iconName: 'HardHat',
    deliverables: ['Interactive Project Portfolio', 'Instant Quote Estimator', 'Client Portal Embed', 'Safety & Certifications']
  },
  {
    id: 'landscaping-websites',
    title: 'Landscaping Websites',
    description: 'Visually stunning outdoor living and hardscape agency websites with interactive before/after sliders and service estimators.',
    iconName: 'Trees',
    deliverables: ['Before & After Visualizer', 'Service Tier Packages', 'Seasonal Booking Engine', 'Visual Project Showcase']
  },
  {
    id: 'e-commerce-websites',
    title: 'E-commerce Websites',
    description: 'Bespoke, blazingly fast online storefronts built with seamless checkout, inventory sync, and custom product customizers.',
    iconName: 'ShoppingBag',
    deliverables: ['Custom Product Layouts', 'Cart & Multi-Currency Checkout', 'Inventory Management', 'Customer Account Dashboards'],
    popular: true
  },
  {
    id: 'booking-systems',
    title: 'Booking Systems',
    description: 'Custom calendar and appointment scheduling applications with real-time availability, deposits, and automated SMS/email alerts.',
    iconName: 'CalendarCheck',
    deliverables: ['Automated Time-slot Sync', 'Stripe/PayPal Deposit Flow', 'iCal/Google Calendar Sync', 'Automated Reminders']
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    description: 'Cutting-edge AI chatbots, workflow automations, and intelligent document parsers built directly into your web workflow.',
    iconName: 'Sparkles',
    deliverables: ['Custom Trained AI Assistant', 'Workflow Automation Scripts', 'CRM Lead Processing', 'Intelligent Form Routing'],
    popular: true
  },
  {
    id: 'crm-systems',
    title: 'CRM Systems',
    description: 'Custom lightweight customer relationship management dashboards tailored to your exact sales pipeline and team roles.',
    iconName: 'Users',
    deliverables: ['Sales Pipeline Boards', 'Client Communication Logs', 'Automated Lead Scoring', 'Custom Export & Analytics']
  },
  {
    id: 'dashboard-development',
    title: 'Dashboard Development',
    description: 'High-density web applications, analytics cockpits, and real-time monitoring tools rendered with smooth interactive charts.',
    iconName: 'LayoutDashboard',
    deliverables: ['Custom Data Visualizations', 'Role-Based Access Control', 'Real-Time WebSockets/API', 'Exportable PDF Reports']
  },
  {
    id: 'website-redesign',
    title: 'Website Redesign',
    description: 'Complete visual and architectural overhaul of stale websites into modern, award-grade digital flagships.',
    iconName: 'RefreshCw',
    deliverables: ['UI/UX Complete Audit', 'Modern Glassmorphism Upgrade', 'Speed & Performance Boost', 'Mobile-First Optimization']
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Technical, on-page, and structural search engine optimization to capture dominant keyword rankings and organic traffic.',
    iconName: 'TrendingUp',
    deliverables: ['Core Web Vitals Max Score', 'Structured Schema Markup', 'Keyword Architecture', 'Search Console Optimization']
  }
];

export const PORTFOLIO_CATEGORIES = [
  'Real Estate',
  'Restaurant',
  'Landscaping',
  'Medical',
  'Construction',
  'Law Firms',
  'Fitness',
  'Hotels',
  'Technology',
  'E-commerce'
] as const;

// 3 PLACEHOLDERS per category as requested! First placeholder uses Mateo Sanchez image.
export const INITIAL_PORTFOLIO_PROJECTS: PortfolioProject[] = PORTFOLIO_CATEGORIES.flatMap((category, catIdx) => {
  return [1, 2, 3].map((num) => {
    const globalIdx = catIdx * 3 + num;
    return {
      id: `${category.toLowerCase().replace(/\s+/g, '-')}-placeholder-${num}`,
      category,
      title: `${category} Website Showcase ${num}`,
      description: `Bespoke digital architecture for ${category} client. Crafted with high performance, luxury typography, and interactive client conversion flows.`,
      imageUrl: (catIdx === 0 && num === 1) ? mateoPortrait : '',
      tags: [`${category} Showcase`, 'Web Design', 'Custom UI/UX'],
      isPlaceholder: true,
      clientName: `${category} Client ${num}`,
      year: '2026',
      isFeatured: catIdx === 0 && num === 1,
      displayOrder: globalIdx,
      status: 'Published'
    };
  });
});

export const INITIAL_PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'In-depth consultation to analyze your business goals, target audience, brand identity, and competitive landscape.',
    duration: 'Week 1',
    details: ['Brand & Asset Audit', 'Competitor Analysis', 'Project Scope & Milestones', 'Technical Architecture Plan']
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Creating wireframes, site mapping, user flow blueprints, and content strategy to establish a solid foundation.',
    duration: 'Week 1 - 2',
    details: ['Interactive Wireframes', 'Sitemap Architecture', 'Copywriting Framework', 'Tech Stack Selection']
  },
  {
    number: '03',
    title: 'Design',
    description: 'Crafting bespoke, high-end visual designs with custom glassmorphism aesthetics, typography, and motion prototypes.',
    duration: 'Week 2 - 3',
    details: ['High-Fidelity UI Concepts', 'Motion & Transition Prototypes', 'Responsive Layout Designs', 'Client Design Review & Signoff']
  },
  {
    number: '04',
    title: 'Development',
    description: 'Building clean, maintainable, pixel-perfect code using React, TypeScript, Tailwind, and high-performance server integrations.',
    duration: 'Week 3 - 5',
    details: ['Front-End Modular Engineering', 'CMS & Database Setup', 'API & AI Integration', 'Responsive Mobile Testing']
  },
  {
    number: '05',
    title: 'Testing',
    description: 'Rigorous quality assurance including performance optimization, cross-browser verification, accessibility, and security audits.',
    duration: 'Week 5',
    details: ['Core Web Vitals Audit', 'Cross-Device & Browser Checks', 'Form & Database Security', 'SEO Meta & Schema Markup']
  },
  {
    number: '06',
    title: 'Launch',
    description: 'Smooth deployment to production servers, DNS setup, SSL configuration, and live launch event coordination.',
    duration: 'Week 6',
    details: ['Production Domain Deployment', 'SSL & Cache Configuration', 'Analytics & Search Indexing', 'Full Client Handover Session']
  },
  {
    number: '07',
    title: 'Support',
    description: 'Ongoing technical maintenance, security monitoring, performance enhancements, and dedicated expansion assistance.',
    duration: 'Ongoing',
    details: ['24/7 Server Monitoring', 'Monthly Backups & Updates', 'Priority Feature Additions', 'Performance Reports']
  }
];

export const INITIAL_WHY_CHOOSE: WhyChooseItem[] = [
  {
    id: 'fast-delivery',
    title: 'Fast Delivery',
    description: 'Agile development timelines with structured weekly milestones so your agency launches ahead of schedule.',
    iconName: 'Zap'
  },
  {
    id: 'modern-design',
    title: 'Modern Design',
    description: 'Award-winning visual aesthetics inspired by Apple, Vercel, and Linear with luxury glassmorphism and subtle glow.',
    iconName: 'Palette'
  },
  {
    id: 'mobile-responsive',
    title: 'Mobile Responsive',
    description: 'Flawless execution across every screen size from mobile smartphones to ultra-wide desktop monitors.',
    iconName: 'Smartphone'
  },
  {
    id: 'seo-friendly',
    title: 'SEO Friendly',
    description: 'Clean semantic HTML, lightning-fast Core Web Vitals, and pre-configured schema markup for top search engine rankings.',
    iconName: 'Search'
  },
  {
    id: 'ai-powered',
    title: 'AI Powered',
    description: 'Smart automated workflows, AI chatbots, and dynamic personalization engine integrated effortlessly.',
    iconName: 'Cpu'
  },
  {
    id: 'secure',
    title: 'Secure',
    description: 'Bank-grade security protocols, SSL encryption, rate limiting, and automated backups built into every project.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'scalable',
    title: 'Scalable',
    description: 'Modular architecture engineered to seamlessly grow from small boutique sites to millions of monthly visitors.',
    iconName: 'Layers'
  },
  {
    id: 'premium-quality',
    title: 'Premium Quality',
    description: 'Uncompromising attention to micro-interactions, smooth frame rates, luxury typography, and pixel perfection.',
    iconName: 'Award'
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'testimonial-1',
    clientName: 'Julian Vance',
    roleCompany: 'CEO / Vance Luxury Goods',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'Mateo Sanchez transformed our web design into a high-converting masterpiece. Our sales conversion rates increased by 210% within 30 days of launch.',
    rating: 5,
    projectType: 'E-commerce & Web Redesign',
    isPlaceholder: false
  },
  {
    id: 'testimonial-2',
    clientName: 'Sophia Reyes',
    roleCompany: 'Founder / Nova AI Labs',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    quote: 'Exceptional craftsmanship, futuristic UI standards, and blazingly fast delivery. Mateo is truly one of the top AI web designers in the industry.',
    rating: 5,
    projectType: 'AI SaaS Dashboard',
    isPlaceholder: false
  },
  {
    id: 'testimonial-3',
    clientName: 'Marcus Sterling',
    roleCompany: 'Managing Director / Sterling Estates',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote: 'Working with Mateo Sanchez was the single best decision for our luxury brand expansion. The attention to detail and editorial flow sets us far apart from competitors.',
    rating: 5,
    projectType: 'Luxury Real Estate Portal',
    isPlaceholder: false
  }
];

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'How long does a typical web design project take?',
    answer: 'Most standard projects take between 2 to 6 weeks from discovery to final launch, depending on the complexity of features, custom web applications, and content preparation.'
  },
  {
    id: 'faq-2',
    category: 'Pricing',
    question: 'What is the investment required for a custom website?',
    answer: 'Our bespoke websites are customized to your specific business requirements and goals. We provide transparent, itemized quotes following our initial discovery session.'
  },
  {
    id: 'faq-3',
    category: 'Process',
    question: 'Can I update and edit content on my website later?',
    answer: 'Yes! We build user-friendly CMS management systems and dashboards that allow you or your team to easily edit text, images, projects, blog posts, and products without touching code.'
  },
  {
    id: 'faq-4',
    category: 'Technical',
    question: 'Do you provide website hosting, maintenance, and security?',
    answer: 'Absolutely. We offer dedicated white-glove hosting management, continuous security monitoring, regular automated backups, and ongoing technical support packages.'
  },
  {
    id: 'faq-5',
    category: 'AI & Features',
    question: 'Can you integrate AI features like chatbots or custom automations?',
    answer: 'Yes. We specialize in embedding modern AI tools, automated lead qualification assistants, CRM sync, and custom algorithmic workflows tailored to your business operations.'
  }
];

export const INITIAL_CONTACT_INFO: ContactInfo = {
  email: 'mateo@axonstudio.design',
  phone: '+1 (555) 234-5678',
  whatsapp: '+1 (555) 234-5678',
  location: 'New York, USA // Remote Worldwide',
  githubUrl: 'https://github.com',
  twitterUrl: 'https://x.com',
  linkedinUrl: 'https://linkedin.com',
  instagramUrl: 'https://instagram.com',
  dribbbleUrl: 'https://dribbble.com'
};
