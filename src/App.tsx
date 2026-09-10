import React, { useState } from 'react';
import { Header, PageId } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PrioritiesPage } from './pages/PrioritiesPage';
import { VotePage } from './pages/VotePage';
import { ResultsPage } from './pages/ResultsPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { PriorityType } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [preselectedPriority, setPreselectedPriority] = useState<PriorityType | undefined>(undefined);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreselectPriority = (priority: PriorityType) => {
    setPreselectedPriority(priority);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'priorities':
        return (
          <PrioritiesPage 
            onNavigate={handleNavigate} 
            onPreselectPriority={handlePreselectPriority} 
          />
        );
      case 'vote':
        return (
          <VotePage 
            onNavigate={handleNavigate} 
            preselectedPriority={preselectedPriority} 
          />
        );
      case 'results':
        return <ResultsPage onNavigate={handleNavigate} />;
      case 'statistics':
        return <StatisticsPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-red-700 selection:text-white" dir="rtl">
      {/* Top Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Dynamic View Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
