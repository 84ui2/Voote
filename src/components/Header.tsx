import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Vote, 
  BarChart3, 
  PieChart, 
  Compass, 
  Home, 
  Info, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export type PageId = 'home' | 'priorities' | 'vote' | 'results' | 'statistics' | 'about' | 'admin';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode; isCTA?: boolean }[] = [
    { id: 'home', label: 'الرئيسية', icon: <Home className="w-4 h-4" /> },
    { id: 'priorities', label: 'الأولويات', icon: <Compass className="w-4 h-4" /> },
    { id: 'vote', label: 'التصويت', icon: <Vote className="w-4 h-4" />, isCTA: true },
    { id: 'results', label: 'النتائج', icon: <PieChart className="w-4 h-4" /> },
    { id: 'statistics', label: 'الإحصائيات', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'about', label: 'حول الاستطلاع', icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top micro bar with Moroccan flag tones */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-700 via-emerald-700 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Project Identity */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-right group focus:outline-none"
          >
            {/* Moroccan emblem badge */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center text-white shadow-md shadow-red-900/20 group-hover:scale-105 transition-transform border border-amber-400/40 relative">
              <span className="text-xl font-black font-serif text-amber-300">ت</span>
              {/* Small star dot */}
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-700 border-2 border-white flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-amber-300" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-red-700 transition-colors">
                  تاونات تستحق الأفضل
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300/60 hidden sm:inline-block">
                  استطلاع تجريبي
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                صوتك من أجل تاونات أفضل
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              if (item.isCTA) {
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className="mr-2 ml-2 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-red-700 to-red-800 text-white shadow-md hover:from-red-800 hover:to-red-900 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-red-700 bg-red-50/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span className={isActive ? 'text-red-700' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Admin Portal Button */}
            <button
              id="nav-admin-btn"
              onClick={() => handleNavClick('admin')}
              title="لوحة الإدارة التجريبية"
              className={`mr-2 p-2.5 rounded-xl border transition-all ${
                currentPage === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'text-slate-500 border-slate-200 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-vote-quick-btn"
              onClick={() => handleNavClick('vote')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-700 text-white flex items-center gap-1.5 shadow-sm"
            >
              <Vote className="w-3.5 h-3.5" />
              <span>صوّت الآن</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
              aria-label="فتح القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="px-2 py-1 mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              القائمة الرئيسية
            </span>
          </div>

          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  item.isCTA
                    ? 'bg-gradient-to-r from-red-700 to-red-800 text-white'
                    : isActive
                    ? 'bg-red-50 text-red-700 border border-red-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={item.isCTA ? 'text-amber-300' : isActive ? 'text-red-700' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.isCTA && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                    جديد
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <button
              id="mobile-nav-admin"
              onClick={() => handleNavClick('admin')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                currentPage === 'admin'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>لوحة الإدارة (Admin)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
