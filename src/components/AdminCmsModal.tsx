import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  User,
  Briefcase,
  Layers,
  HelpCircle,
  MessageSquare,
  Mail,
  Save,
  Trash2,
  Plus,
  RotateCcw,
  Download,
  Upload,
  Check,
  ShieldAlert,
  Sparkles,
  Eye
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { PORTFOLIO_CATEGORIES } from '../data/initialData';
import { PortfolioProject, ServiceItem, TestimonialItem, FaqItem } from '../types';
import { ImageUploader } from './ImageUploader';

export const AdminCmsModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    profile,
    updateProfile,
    services,
    addService,
    deleteService,
    portfolioProjects,
    addPortfolioProject,
    editPortfolioProject,
    deletePortfolioProject,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    faqs,
    addFaq,
    deleteFaq,
    contactInfo,
    updateContactInfo,
    inquiries,
    resetAllToDefault,
    exportDataJson,
    importDataJson
  } = useCms();

  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'projects' | 'services' | 'testimonials' | 'faqs' | 'contact' | 'inquiries' | 'settings'
  >('profile');

  // Form states for profile
  const [profileForm, setProfileForm] = useState(profile);

  // Form state for adding/editing project
  const [projectForm, setProjectForm] = useState<Partial<PortfolioProject>>({
    category: PORTFOLIO_CATEGORIES[0],
    title: '',
    description: '',
    imageUrl: '',
    thumbnailUrl: '',
    tags: ['Web Design', 'Custom UI'],
    isPlaceholder: false,
    clientName: '',
    year: '2026',
    liveUrl: '',
    isFeatured: false,
    displayOrder: 1,
    status: 'Published'
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Form states for adding service, testimonial, faq
  const [newService, setNewService] = useState({ title: '', description: '', iconName: 'Sparkles', deliverables: '' });
  const [newTestimonial, setNewTestimonial] = useState({ clientName: '', roleCompany: '', quote: '', rating: 5, projectType: '', avatarUrl: '' });
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'General' });

  // Contact form state
  const [contactForm, setContactForm] = useState(contactInfo);

  // JSON Import state
  const [importJsonText, setImportJsonText] = useState('');
  const [importSuccess, setImportSuccess] = useState<boolean | null>(null);

  React.useEffect(() => {
    if (isAdminOpen) {
      setProfileForm(profile);
      setContactForm(contactInfo);
    }
  }, [isAdminOpen, profile, contactInfo]);

  if (!isAdminOpen) return null;

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passcode)) {
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleSaveProfile = () => {
    updateProfile(profileForm);
    alert('Profile updated successfully!');
  };

  const handleSaveContact = () => {
    updateContactInfo(contactForm);
    alert('Contact details updated successfully!');
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.category) return;

    const formattedTags = typeof projectForm.tags === 'string'
      ? (projectForm.tags as string).split(',').map(s => s.trim()).filter(Boolean)
      : projectForm.tags || ['Web Design'];

    const projectData: PortfolioProject = {
      id: editingProjectId || `proj-${Date.now()}`,
      category: projectForm.category || PORTFOLIO_CATEGORIES[0],
      title: projectForm.title || 'Untitled Project',
      description: projectForm.description || '',
      imageUrl: projectForm.imageUrl || '',
      thumbnailUrl: projectForm.thumbnailUrl || projectForm.imageUrl || '',
      tags: formattedTags,
      isPlaceholder: false,
      clientName: projectForm.clientName || '',
      year: projectForm.year || '2026',
      liveUrl: projectForm.liveUrl || '',
      isFeatured: projectForm.isFeatured ?? false,
      displayOrder: Number(projectForm.displayOrder) || (portfolioProjects.length + 1),
      status: (projectForm.status as 'Published' | 'Draft') || 'Published'
    };

    if (editingProjectId) {
      editPortfolioProject(projectData);
      setEditingProjectId(null);
    } else {
      addPortfolioProject(projectData);
    }

    setProjectForm({
      category: PORTFOLIO_CATEGORIES[0],
      title: '',
      description: '',
      imageUrl: '',
      thumbnailUrl: '',
      tags: ['Web Design', 'Custom UI'],
      isPlaceholder: false,
      clientName: '',
      year: '2026',
      liveUrl: '',
      isFeatured: false,
      displayOrder: portfolioProjects.length + 2,
      status: 'Published'
    });
  };

  const handleEditProjectClick = (proj: PortfolioProject) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      category: proj.category,
      title: proj.title,
      description: proj.description,
      imageUrl: proj.imageUrl,
      thumbnailUrl: proj.thumbnailUrl || proj.imageUrl,
      tags: proj.tags,
      isPlaceholder: proj.isPlaceholder,
      clientName: proj.clientName || '',
      year: proj.year || '2026',
      liveUrl: proj.liveUrl || '',
      isFeatured: proj.isFeatured ?? false,
      displayOrder: proj.displayOrder ?? 1,
      status: proj.status || 'Published'
    });
  };

  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title) return;
    addService({
      id: `service-${Date.now()}`,
      title: newService.title,
      description: newService.description,
      iconName: newService.iconName || 'Sparkles',
      deliverables: newService.deliverables ? newService.deliverables.split(',').map(s => s.trim()) : []
    });
    setNewService({ title: '', description: '', iconName: 'Sparkles', deliverables: '' });
  };

  const handleAddTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.clientName || !newTestimonial.quote) return;
    addTestimonial({
      id: `testimonial-${Date.now()}`,
      clientName: newTestimonial.clientName,
      roleCompany: newTestimonial.roleCompany,
      avatarUrl: '',
      quote: newTestimonial.quote,
      rating: newTestimonial.rating,
      projectType: newTestimonial.projectType || 'Custom Project',
      isPlaceholder: false
    });
    setNewTestimonial({ clientName: '', roleCompany: '', quote: '', rating: 5, projectType: '' });
  };

  const handleAddFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) return;
    addFaq({
      id: `faq-${Date.now()}`,
      question: newFaq.question,
      answer: newFaq.answer,
      category: newFaq.category
    });
    setNewFaq({ question: '', answer: '', category: 'General' });
  };

  const handleExportJson = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agency-portfolio-cms-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    const res = importDataJson(importJsonText);
    setImportSuccess(res);
    if (res) {
      setTimeout(() => setImportSuccess(null), 3000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminOpen(false)}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl glass-panel-glow rounded-3xl overflow-hidden border border-white/15 z-10 my-8 shadow-2xl h-[85vh] flex flex-col bg-slate-950"
        >
          {/* Top Bar */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                  <span>CMS Admin Dashboard</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    No-Code Live Editor
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Edit all website placeholders, projects, profile, services, FAQs and testimonials.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAdminAuthenticated && (
                <button
                  onClick={logoutAdmin}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20"
                >
                  Lock CMS
                </button>
              )}
              <button
                onClick={() => setIsAdminOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white glass-panel border border-white/10"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* If Not Authenticated -> Show Passcode Prompt */}
          {!isAdminAuthenticated ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-6 shadow-xl">
                <Lock size={32} />
              </div>

              <h4 className="text-2xl font-bold font-heading text-white mb-2">
                Admin Authentication Required
              </h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Enter your security passcode to unlock full editing controls for projects, placeholders, and profile details.
              </p>

              <form onSubmit={handlePasscodeSubmit} className="w-full space-y-4">
                <div>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Admin Passcode"
                    className="w-full px-4 py-3 rounded-2xl glass-panel text-sm text-center text-white placeholder-slate-500 border border-white/10 focus:border-purple-400 focus:outline-none"
                  />
                  {passcodeError && (
                    <p className="text-xs text-rose-400 mt-2 flex items-center justify-center gap-1">
                      <ShieldAlert size={14} /> Incorrect passcode. Please try again.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs shadow-xl hover:scale-[1.02] transition-all"
                >
                  Unlock Admin CMS Dashboard
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard Layout */
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-full lg:w-60 border-b lg:border-b-0 lg:border-r border-white/10 p-4 bg-slate-900/40 space-y-1 shrink-0 overflow-x-auto lg:overflow-y-auto flex lg:flex-col gap-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                    activeTab === 'profile' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <User size={16} /> Profile & Agency
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                    activeTab === 'projects' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Layers size={16} /> Portfolio ({portfolioProjects.length})
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                    activeTab === 'services' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Briefcase size={16} /> Services ({services.length})
                </button>

                <button
                  onClick={() => setActiveTab('testimonials')}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                    activeTab === 'testimonials' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Sparkles size={16} /> Testimonials
                </button>

                <button
                  onClick={() => setActiveTab('faqs')}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                    activeTab === 'faqs' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <HelpCircle size={16} /> FAQs
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                    activeTab === 'contact' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Mail size={16} /> Contact & Social
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all whitespace-nowrap ${
                    activeTab === 'inquiries' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5"><MessageSquare size={16} /> Inquiries</span>
                  {inquiries.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-400 text-slate-950 font-bold">
                      {inquiries.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                    activeTab === 'settings' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Download size={16} /> Import / Export / Reset
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-6 overflow-y-auto bg-slate-950/60">
                
                {/* 1. TAB: PROFILE */}
                {activeTab === 'profile' && (
                  <div className="space-y-6 max-w-2xl">
                    <h4 className="text-lg font-bold font-heading text-white">Edit Agency Profile & Placeholders</h4>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Name</label>
                        <input
                          type="text"
                          value={profileForm.fullName}
                          onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Agency Name</label>
                        <input
                          type="text"
                          value={profileForm.agencyName}
                          onChange={(e) => setProfileForm({ ...profileForm, agencyName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Tagline</label>
                        <input
                          type="text"
                          value={profileForm.tagline}
                          onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Short Bio</label>
                        <textarea
                          rows={3}
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>

                      <div>
                        <ImageUploader
                          label="Profile Picture / Portrait Image"
                          imageUrl={profileForm.profileImageUrl || ''}
                          onChange={(url) => setProfileForm({ ...profileForm, profileImageUrl: url })}
                          aspectRatio="square"
                          helperText="Upload your headshot or portrait photo directly from your computer."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Experience Years</label>
                        <input
                          type="text"
                          value={profileForm.experienceYears}
                          onChange={(e) => setProfileForm({ ...profileForm, experienceYears: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Skills (Comma separated)</label>
                        <input
                          type="text"
                          value={profileForm.skills ? profileForm.skills.join(', ') : ''}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              skills: e.target.value.split(',').map((s) => s.trim())
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>

                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2"
                      >
                        <Save size={16} /> Save Profile Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. TAB: PROJECTS */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Portfolio Project Management System
                        </h4>
                        <p className="text-xs text-slate-400">
                          Create, edit, organize, and upload optimized screenshots for your portfolio projects.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {portfolioProjects.length} Projects Total
                      </span>
                    </div>

                    {/* Add / Edit Form */}
                    <form onSubmit={handleSaveProject} className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/15 space-y-5 bg-slate-900/80">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h5 className="text-xs font-bold uppercase text-blue-400 font-mono tracking-wider flex items-center gap-2">
                          <Sparkles size={14} />
                          {editingProjectId ? 'Editing Portfolio Project' : 'Create New Portfolio Project'}
                        </h5>
                        {editingProjectId && (
                          <span className="text-[10px] text-amber-400 font-mono bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                            Editing ID: {editingProjectId}
                          </span>
                        )}
                      </div>

                      {/* Row 1: Title & Industry */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                            Project Name <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={projectForm.title || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            placeholder="e.g. Aetheria Luxury Real Estate"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-xs text-white border border-white/15 focus:border-blue-500 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                            Industry / Category <span className="text-rose-400">*</span>
                          </label>
                          <select
                            value={projectForm.category || PORTFOLIO_CATEGORIES[0]}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-xs text-white border border-white/15 focus:border-blue-500 focus:outline-none transition-colors"
                          >
                            {PORTFOLIO_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Row 2: Short Description */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                          Short Description
                        </label>
                        <textarea
                          rows={2}
                          value={projectForm.description || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          placeholder="High-converting digital architecture built with interactive floorplans and custom lead capture..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-xs text-white border border-white/15 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Row 3: Website URL, Client Name, Year */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                            Website URL (Optional)
                          </label>
                          <input
                            type="url"
                            value={projectForm.liveUrl || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                            placeholder="https://aetheriaestates.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-xs text-white border border-white/15 focus:border-blue-500 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                            Client Name
                          </label>
                          <input
                            type="text"
                            value={projectForm.clientName || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, clientName: e.target.value })}
                            placeholder="Aetheria Group Ltd."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-xs text-white border border-white/15 focus:border-blue-500 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                            Year
                          </label>
                          <input
                            type="text"
                            value={projectForm.year || '2026'}
                            onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                            placeholder="2026"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-xs text-white border border-white/15 focus:border-blue-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Row 4: Display Order, Featured Toggle, Status */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                            Display Order
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={projectForm.displayOrder || 1}
                            onChange={(e) => setProjectForm({ ...projectForm, displayOrder: parseInt(e.target.value) || 1 })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 text-xs text-white border border-white/15 focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                            Project Status
                          </label>
                          <select
                            value={projectForm.status || 'Published'}
                            onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as 'Published' | 'Draft' })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 text-xs text-white border border-white/15 focus:border-blue-500 focus:outline-none"
                          >
                            <option value="Published">Published (Public)</option>
                            <option value="Draft">Draft (Hidden)</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-3 pt-4 sm:pt-0">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!projectForm.isFeatured}
                              onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-2.5 text-xs font-semibold text-slate-200">
                              Featured Showcase Project
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* IMAGE MANAGEMENT SECTION */}
                      <div className="pt-2 border-t border-white/10">
                        <ImageUploader
                          label="Project Image Upload & Management"
                          imageUrl={projectForm.imageUrl || ''}
                          thumbnailUrl={projectForm.thumbnailUrl || ''}
                          onChange={(imgUrl, thumbUrl) => {
                            setProjectForm((prev) => ({
                              ...prev,
                              imageUrl: imgUrl,
                              thumbnailUrl: thumbUrl || imgUrl
                            }));
                          }}
                          aspectRatio="video"
                          helperText="Upload or choose an image directly from your computer. Automatic optimization, aspect ratio preservation, and thumbnail generation will be performed instantly."
                        />
                      </div>

                      {/* Form Submission Controls */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                          >
                            <Plus size={15} />
                            <span>{editingProjectId ? 'Save & Update Project' : 'Add Project To Portfolio'}</span>
                          </button>

                          {editingProjectId && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProjectId(null);
                                setProjectForm({
                                  category: PORTFOLIO_CATEGORIES[0],
                                  title: '',
                                  description: '',
                                  imageUrl: '',
                                  thumbnailUrl: '',
                                  tags: ['Web Design'],
                                  isPlaceholder: false,
                                  clientName: '',
                                  year: '2026',
                                  liveUrl: '',
                                  isFeatured: false,
                                  displayOrder: portfolioProjects.length + 1,
                                  status: 'Published'
                                });
                              }}
                              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
                            >
                              Cancel Editing
                            </button>
                          )}
                        </div>
                      </div>
                    </form>

                    {/* Existing Projects List */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Current Portfolio Catalog ({portfolioProjects.length})
                        </h5>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Drag / edit display order to organize presentation
                        </p>
                      </div>

                      <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {portfolioProjects
                          .slice()
                          .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
                          .map((p) => (
                            <div
                              key={p.id}
                              className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                editingProjectId === p.id
                                  ? 'bg-blue-950/40 border-blue-500/50 shadow-lg shadow-blue-950/50'
                                  : 'bg-slate-900/60 hover:bg-slate-900 border-white/10'
                              }`}
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                {/* Thumbnail */}
                                <div className="w-16 h-11 rounded-lg bg-slate-950 border border-white/15 overflow-hidden shrink-0 relative">
                                  {p.imageUrl ? (
                                    <img
                                      src={p.thumbnailUrl || p.imageUrl}
                                      alt={p.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-400 font-mono">
                                      No Image
                                    </div>
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <div className="flex items-center flex-wrap gap-1.5 mb-1">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                                      #{p.displayOrder ?? '-'}
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                                      {p.category}
                                    </span>
                                    <span className="text-xs font-bold text-white truncate max-w-[200px]">
                                      {p.title}
                                    </span>
                                    {p.isFeatured && (
                                      <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                        ★ Featured
                                      </span>
                                    )}
                                    <span
                                      className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${
                                        p.status === 'Draft'
                                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      }`}
                                    >
                                      {p.status || 'Published'}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 truncate max-w-md">
                                    {p.description || 'No description provided.'}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() => handleEditProjectClick(p)}
                                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-colors cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deletePortfolioProject(p.id)}
                                  className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
                                  title="Delete Project"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. TAB: SERVICES */}
                {activeTab === 'services' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold font-heading text-white">Manage Services Offered</h4>

                    <form onSubmit={handleAddServiceSubmit} className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
                      <h5 className="text-xs font-bold text-purple-400 uppercase">Add New Service</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Service Title (e.g. AI Automation)"
                          value={newService.title}
                          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                          className="px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                        <input
                          type="text"
                          placeholder="Lucide Icon Name (e.g. Sparkles, Home, Scale)"
                          value={newService.iconName}
                          onChange={(e) => setNewService({ ...newService, iconName: e.target.value })}
                          className="px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Service description..."
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                      />
                      <input
                        type="text"
                        placeholder="Deliverables (Comma separated)"
                        value={newService.deliverables}
                        onChange={(e) => setNewService({ ...newService, deliverables: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <Plus size={14} /> Add Service
                      </button>
                    </form>

                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {services.map((s) => (
                        <div key={s.id} className="p-3 rounded-xl glass-panel border border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white">{s.title}</span>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{s.description}</p>
                          </div>
                          <button
                            onClick={() => deleteService(s.id)}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. TAB: TESTIMONIALS */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold font-heading text-white">Manage Client Testimonials</h4>

                    <form onSubmit={handleAddTestimonialSubmit} className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
                      <h5 className="text-xs font-bold text-purple-400 uppercase">Add Testimonial</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Client Name"
                          value={newTestimonial.clientName}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                          className="px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                        <input
                          type="text"
                          placeholder="Role / Company"
                          value={newTestimonial.roleCompany}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, roleCompany: e.target.value })}
                          className="px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>
                      <textarea
                        rows={2}
                        required
                        placeholder="Client quote..."
                        value={newTestimonial.quote}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <Plus size={14} /> Add Testimonial
                      </button>
                    </form>

                    <div className="space-y-2">
                      {testimonials.map((t) => (
                        <div key={t.id} className="p-3 rounded-xl glass-panel border border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white">{t.clientName} ({t.roleCompany})</span>
                            <p className="text-[11px] text-slate-400 italic">"{t.quote}"</p>
                          </div>
                          <button
                            onClick={() => deleteTestimonial(t.id)}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. TAB: FAQS */}
                {activeTab === 'faqs' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold font-heading text-white">Manage FAQs</h4>

                    <form onSubmit={handleAddFaqSubmit} className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
                      <h5 className="text-xs font-bold text-purple-400 uppercase">Add FAQ Question</h5>
                      <input
                        type="text"
                        required
                        placeholder="Question text"
                        value={newFaq.question}
                        onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                      />
                      <textarea
                        rows={2}
                        required
                        placeholder="Answer text..."
                        value={newFaq.answer}
                        onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <Plus size={14} /> Add FAQ
                      </button>
                    </form>

                    <div className="space-y-2">
                      {faqs.map((f) => (
                        <div key={f.id} className="p-3 rounded-xl glass-panel border border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white">{f.question}</span>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{f.answer}</p>
                          </div>
                          <button
                            onClick={() => deleteFaq(f.id)}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. TAB: CONTACT */}
                {activeTab === 'contact' && (
                  <div className="space-y-6 max-w-xl">
                    <h4 className="text-lg font-bold font-heading text-white">Edit Contact & Social Placeholders</h4>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Email Placeholder</label>
                        <input
                          type="text"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Phone Placeholder</label>
                        <input
                          type="text"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">WhatsApp Placeholder</label>
                        <input
                          type="text"
                          value={contactForm.whatsapp}
                          onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Location Placeholder</label>
                        <input
                          type="text"
                          value={contactForm.location}
                          onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10"
                        />
                      </div>

                      <button
                        onClick={handleSaveContact}
                        className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <Save size={14} /> Save Contact Details
                      </button>
                    </div>
                  </div>
                )}

                {/* 7. TAB: INQUIRIES */}
                {activeTab === 'inquiries' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold font-heading text-white">Client Project Inquiries ({inquiries.length})</h4>

                    {inquiries.length === 0 ? (
                      <div className="text-center py-12 glass-panel rounded-2xl">
                        <MessageSquare size={32} className="mx-auto text-slate-500 mb-2" />
                        <p className="text-xs text-slate-400">No project briefs submitted yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {inquiries.map((inq) => (
                          <div key={inq.id} className="p-4 rounded-2xl glass-panel border border-cyan-500/30 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">{inq.name} ({inq.businessName || 'N/A'})</span>
                              <span className="text-slate-400 font-mono">{new Date(inq.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="text-xs text-cyan-300 font-medium">
                              {inq.email} | Focus: {inq.serviceNeeded} | Budget: {inq.budgetRange}
                            </div>
                            <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl">
                              {inq.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 8. TAB: SETTINGS & IMPORT/EXPORT */}
                {activeTab === 'settings' && (
                  <div className="space-y-6 max-w-xl">
                    <h4 className="text-lg font-bold font-heading text-white">Backup & Data Management</h4>

                    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
                      <h5 className="text-xs font-bold text-white uppercase">Export Configuration</h5>
                      <p className="text-xs text-slate-400">
                        Download your customized website configuration (projects, profile, services, contact details) as a JSON file.
                      </p>
                      <button
                        onClick={handleExportJson}
                        className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-2"
                      >
                        <Download size={14} /> Download CMS JSON Backup
                      </button>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
                      <h5 className="text-xs font-bold text-white uppercase">Import Configuration</h5>
                      <p className="text-xs text-slate-400">
                        Paste a previously exported JSON configuration string to instantly restore all website data.
                      </p>
                      <textarea
                        rows={4}
                        value={importJsonText}
                        onChange={(e) => setImportJsonText(e.target.value)}
                        placeholder="Paste JSON content here..."
                        className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-white border border-white/10 font-mono"
                      />
                      <button
                        onClick={handleImportJson}
                        className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold inline-flex items-center gap-2"
                      >
                        <Upload size={14} /> Import Data JSON
                      </button>
                      {importSuccess === true && (
                        <p className="text-xs text-emerald-400 flex items-center gap-1">
                          <Check size={14} /> Imported successfully!
                        </p>
                      )}
                      {importSuccess === false && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                          <ShieldAlert size={14} /> Failed to parse JSON.
                        </p>
                      )}
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-3">
                      <h5 className="text-xs font-bold text-rose-400 uppercase">Reset Website To Defaults</h5>
                      <p className="text-xs text-slate-400">
                        Clear local storage and restore all original initial placeholder structures.
                      </p>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to reset all portfolio data to defaults?')) {
                            resetAllToDefault();
                            alert('All data reset to initial defaults.');
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold inline-flex items-center gap-2"
                      >
                        <RotateCcw size={14} /> Reset All Data
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
