import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  AgencyProfile,
  ServiceItem,
  PortfolioProject,
  ProcessStep,
  WhyChooseItem,
  TestimonialItem,
  FaqItem,
  ContactInfo,
  ProjectInquiry,
  ThemeMode
} from '../types';
import {
  INITIAL_AGENCY_PROFILE,
  INITIAL_SERVICES,
  INITIAL_PORTFOLIO_PROJECTS,
  INITIAL_PROCESS_STEPS,
  INITIAL_WHY_CHOOSE,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_CONTACT_INFO
} from '../data/initialData';
import { saveCmsState, loadCmsState, getSyncLocalCmsState } from '../utils/persistentStorage';

interface CmsContextType {
  profile: AgencyProfile;
  services: ServiceItem[];
  portfolioProjects: PortfolioProject[];
  processSteps: ProcessStep[];
  whyChooseItems: WhyChooseItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  contactInfo: ContactInfo;
  inquiries: ProjectInquiry[];
  
  // App UI state
  theme: ThemeMode;
  toggleTheme: () => void;
  cursorEnabled: boolean;
  setCursorEnabled: (val: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (val: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  
  // Project start modal state
  isProjectModalOpen: boolean;
  setIsProjectModalOpen: (val: boolean) => void;
  selectedServiceForModal: string | null;
  setSelectedServiceForModal: (service: string | null) => void;

  // Selected project preview modal
  selectedProject: PortfolioProject | null;
  setSelectedProject: (proj: PortfolioProject | null) => void;

  // CMS update methods
  updateProfile: (profile: AgencyProfile) => void;
  updateServices: (services: ServiceItem[]) => void;
  addService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  
  updatePortfolioProjects: (projects: PortfolioProject[]) => void;
  addPortfolioProject: (project: PortfolioProject) => void;
  editPortfolioProject: (project: PortfolioProject) => void;
  deletePortfolioProject: (id: string) => void;

  updateTestimonials: (testimonials: TestimonialItem[]) => void;
  addTestimonial: (item: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;

  updateFaqs: (faqs: FaqItem[]) => void;
  addFaq: (faq: FaqItem) => void;
  deleteFaq: (id: string) => void;

  updateContactInfo: (info: ContactInfo) => void;
  addInquiry: (inquiry: Omit<ProjectInquiry, 'id' | 'createdAt' | 'status'>) => void;
  
  resetAllToDefault: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'mateo_sanchez_portfolio_cms_v2';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<AgencyProfile>(INITIAL_AGENCY_PROFILE);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO_PROJECTS);
  const [processSteps] = useState<ProcessStep[]>(INITIAL_PROCESS_STEPS);
  const [whyChooseItems] = useState<WhyChooseItem[]>(INITIAL_WHY_CHOOSE);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(INITIAL_CONTACT_INFO);
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);

  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [cursorEnabled, setCursorEnabled] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Load state from local storage & IndexedDB on mount
  useEffect(() => {
    // 1. Restore auth session if previously authenticated
    try {
      const sessionAuth = sessionStorage.getItem('cms_admin_auth_session') || localStorage.getItem('cms_admin_auth_session');
      if (sessionAuth === 'true') {
        setIsAdminAuthenticated(true);
      }
    } catch (e) {}

    // 2. Synchronous initial state load from localStorage
    const localSync = getSyncLocalCmsState();
    if (localSync) {
      if (localSync.profile) setProfile(localSync.profile);
      if (localSync.services) setServices(localSync.services);
      if (localSync.portfolioProjects) setPortfolioProjects(localSync.portfolioProjects);
      if (localSync.testimonials) setTestimonials(localSync.testimonials);
      if (localSync.faqs) setFaqs(localSync.faqs);
      if (localSync.contactInfo) setContactInfo(localSync.contactInfo);
      if (localSync.inquiries) setInquiries(localSync.inquiries);
      if (localSync.theme) setTheme(localSync.theme);
    }

    // 3. Complete async load from IndexedDB (supports large uploaded profile & portfolio images)
    loadCmsState().then((parsed) => {
      if (parsed) {
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.services) setServices(parsed.services);
        if (parsed.portfolioProjects) setPortfolioProjects(parsed.portfolioProjects);
        if (parsed.testimonials) setTestimonials(parsed.testimonials);
        if (parsed.faqs) setFaqs(parsed.faqs);
        if (parsed.contactInfo) setContactInfo(parsed.contactInfo);
        if (parsed.inquiries) setInquiries(parsed.inquiries);
        if (parsed.theme) setTheme(parsed.theme);
      }
    }).catch(err => {
      console.error('Error loading persistent CMS state:', err);
    });

    // 4. Firestore real-time listener (sync from database)
    const unsubscribe = onSnapshot(
      doc(db, 'cms', 'config'),
      (snapshot) => {
        // Skip pending local writes to prevent temporary flickering
        if (snapshot.exists() && !snapshot.metadata.hasPendingWrites) {
          const data = snapshot.data();
          if (data.profile) setProfile(data.profile);
          if (data.services) setServices(data.services);
          if (data.portfolioProjects) setPortfolioProjects(data.portfolioProjects);
          if (data.testimonials) setTestimonials(data.testimonials);
          if (data.faqs) setFaqs(data.faqs);
          if (data.contactInfo) setContactInfo(data.contactInfo);
          if (data.inquiries) setInquiries(data.inquiries);
          if (data.theme) setTheme(data.theme);
        }
      },
      (error) => {
        console.warn('Firestore snapshot listener warning:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Save changes to persistent storage engine (IndexedDB + localStorage + Firestore)
  const saveStateToStorage = async (updated: Record<string, unknown>): Promise<void> => {
    const current = {
      profile,
      services,
      portfolioProjects,
      testimonials,
      faqs,
      contactInfo,
      inquiries,
      theme,
      ...updated
    };

    // 1. Save to local client storage engines
    await saveCmsState(current);

    // 2. Save to cloud Firestore database permanently
    try {
      console.log('[CmsContext] Updating Firestore document "cms/config"...');
      await setDoc(doc(db, 'cms', 'config'), {
        ...current,
        updatedAt: new Date().toISOString()
      });
      console.log('[CmsContext Success] Saved CMS update permanently to Firestore database.');
    } catch (err: any) {
      console.error('[CmsContext Error] Firestore save failed:', err);
      handleFirestoreError(err, OperationType.WRITE, 'cms/config');
      throw err;
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    saveStateToStorage({ theme: nextTheme });
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const loginAdmin = (passcode: string) => {
    const trimmed = passcode.trim();
    // Validate passcode against accepted admin passcodes
    if (
      trimmed.toLowerCase() === 'admin123' ||
      trimmed.toLowerCase() === 'admin2026' ||
      trimmed.toLowerCase() === 'admin' ||
      trimmed === '1234'
    ) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('cms_admin_auth_session', 'true');
        localStorage.setItem('cms_admin_auth_session', 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('cms_admin_auth_session');
      localStorage.removeItem('cms_admin_auth_session');
    } catch (e) {}
  };

  // CMS Handlers
  const updateProfile = (newProfile: AgencyProfile) => {
    setProfile(newProfile);
    return saveStateToStorage({ profile: newProfile });
  };

  const updateServices = (newServices: ServiceItem[]) => {
    setServices(newServices);
    return saveStateToStorage({ services: newServices });
  };

  const addService = (newService: ServiceItem) => {
    const next = [...services, newService];
    setServices(next);
    return saveStateToStorage({ services: next });
  };

  const deleteService = (id: string) => {
    const next = services.filter((s) => s.id !== id);
    setServices(next);
    return saveStateToStorage({ services: next });
  };

  const updatePortfolioProjects = (projects: PortfolioProject[]) => {
    setPortfolioProjects(projects);
    return saveStateToStorage({ portfolioProjects: projects });
  };

  const addPortfolioProject = (project: PortfolioProject) => {
    const next = [project, ...portfolioProjects];
    setPortfolioProjects(next);
    return saveStateToStorage({ portfolioProjects: next });
  };

  const editPortfolioProject = (project: PortfolioProject) => {
    const next = portfolioProjects.map((p) => (p.id === project.id ? project : p));
    setPortfolioProjects(next);
    return saveStateToStorage({ portfolioProjects: next });
  };

  const deletePortfolioProject = (id: string) => {
    const next = portfolioProjects.filter((p) => p.id !== id);
    setPortfolioProjects(next);
    return saveStateToStorage({ portfolioProjects: next });
  };

  const updateTestimonials = (items: TestimonialItem[]) => {
    setTestimonials(items);
    return saveStateToStorage({ testimonials: items });
  };

  const addTestimonial = (item: TestimonialItem) => {
    const next = [...testimonials, item];
    setTestimonials(next);
    return saveStateToStorage({ testimonials: next });
  };

  const deleteTestimonial = (id: string) => {
    const next = testimonials.filter((t) => t.id !== id);
    setTestimonials(next);
    return saveStateToStorage({ testimonials: next });
  };

  const updateFaqs = (newFaqs: FaqItem[]) => {
    setFaqs(newFaqs);
    return saveStateToStorage({ faqs: newFaqs });
  };

  const addFaq = (faq: FaqItem) => {
    const next = [...faqs, faq];
    setFaqs(next);
    return saveStateToStorage({ faqs: next });
  };

  const deleteFaq = (id: string) => {
    const next = faqs.filter((f) => f.id !== id);
    setFaqs(next);
    return saveStateToStorage({ faqs: next });
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
    return saveStateToStorage({ contactInfo: info });
  };

  const addInquiry = (data: Omit<ProjectInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: ProjectInquiry = {
      ...data,
      id: `inquiry-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    const next = [newInquiry, ...inquiries];
    setInquiries(next);
    return saveStateToStorage({ inquiries: next });
  };

  const resetAllToDefault = () => {
    setProfile(INITIAL_AGENCY_PROFILE);
    setServices(INITIAL_SERVICES);
    setPortfolioProjects(INITIAL_PORTFOLIO_PROJECTS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setFaqs(INITIAL_FAQS);
    setContactInfo(INITIAL_CONTACT_INFO);
    setInquiries([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const exportDataJson = () => {
    const exportObject = {
      profile,
      services,
      portfolioProjects,
      testimonials,
      faqs,
      contactInfo
    };
    return JSON.stringify(exportObject, null, 2);
  };

  const importDataJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.services) setServices(parsed.services);
      if (parsed.portfolioProjects) setPortfolioProjects(parsed.portfolioProjects);
      if (parsed.testimonials) setTestimonials(parsed.testimonials);
      if (parsed.faqs) setFaqs(parsed.faqs);
      if (parsed.contactInfo) setContactInfo(parsed.contactInfo);
      saveStateToStorage(parsed);
      return true;
    } catch (e) {
      console.error('Invalid JSON imported:', e);
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        profile,
        services,
        portfolioProjects,
        processSteps,
        whyChooseItems,
        testimonials,
        faqs,
        contactInfo,
        inquiries,
        theme,
        toggleTheme,
        cursorEnabled,
        setCursorEnabled,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        isProjectModalOpen,
        setIsProjectModalOpen,
        selectedServiceForModal,
        setSelectedServiceForModal,
        selectedProject,
        setSelectedProject,
        updateProfile,
        updateServices,
        addService,
        deleteService,
        updatePortfolioProjects,
        addPortfolioProject,
        editPortfolioProject,
        deletePortfolioProject,
        updateTestimonials,
        addTestimonial,
        deleteTestimonial,
        updateFaqs,
        addFaq,
        deleteFaq,
        updateContactInfo,
        addInquiry,
        resetAllToDefault,
        exportDataJson,
        importDataJson
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
