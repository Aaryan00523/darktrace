import React, { useState, useEffect } from 'react';
import { useDarktraceStore } from './store/useDarktraceStore';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { NotificationToast } from './components/common/NotificationToast';
import { TraceAIAssistant } from './components/common/TraceAIAssistant';
import { DemoModeGuide } from './components/common/DemoModeGuide';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { InvestigationsPage } from './pages/InvestigationsPage';
import { ActorsPage } from './pages/ActorsPage';
import { IdentityGraphPage } from './pages/IdentityGraphPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { PersonaIntelligencePage } from './pages/PersonaIntelligencePage';
import { TimelinePage } from './pages/TimelinePage';
import { SourcesPage } from './pages/SourcesPage';
import { AutonomousMonitorPage } from './pages/AutonomousMonitorPage';
import { DataExplorerPage } from './pages/DataExplorerPage';
import { ReportsPage } from './pages/ReportsPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AboutPage } from './pages/AboutPage';
import { SettingsPage } from './pages/SettingsPage';

import { Shield, Terminal } from 'lucide-react';

export function App() {
  const store = useDarktraceStore();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || window.location.pathname || '/';
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  const bootMessages = [
    'Initializing Intelligence Engine...',
    'Loading correlation graph...',
    'Loading synthetic intelligence dataset...',
    'Loading investigation environment...'
  ];

  // Professional Initializing Boot Sequence (Prompt Section 39)
  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < bootMessages.length) {
        setBootStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => setIsInitializing(false), 300);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  // Sync URL hash / pathname
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(hash || window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isInitializing) {
    return (
      <div className="w-full h-screen bg-dark-950 flex flex-col items-center justify-center font-mono text-xs select-none p-4">
        <div className="w-full max-w-sm flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/40 flex items-center justify-center text-cyan shadow-glow-cyan animate-pulse">
            <Shield className="w-8 h-8 text-cyan" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white font-sans tracking-wider">
              DARK<span className="text-cyan">TRACE</span>
            </h1>
            <div className="text-[10px] text-cyan/70 tracking-widest mt-0.5">
              THREAT ACTOR DE-ANONYMIZATION PLATFORM
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden border border-dark-600">
            <div
              className="h-full bg-cyan transition-all duration-300 shadow-glow-cyan"
              style={{ width: `${((bootStep + 1) / bootMessages.length) * 100}%` }}
            />
          </div>

          {/* Boot Message */}
          <div className="text-slate-400 text-xs flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-cyan animate-spin" />
            <span>{bootMessages[bootStep]}</span>
          </div>

          <div className="text-[10px] text-slate-600 font-sans">
            DEMO ENVIRONMENT • SYNTHETIC INTELLIGENCE DATA
          </div>
        </div>
      </div>
    );
  }

  // Route Router Logic
  const renderRoute = () => {
    const cleanPath = currentPath.split('?')[0];

    if (cleanPath === '/' || cleanPath === '') {
      return <LandingPage onNavigate={navigate} />;
    }
    if (cleanPath === '/dashboard') {
      return <DashboardPage onNavigate={navigate} />;
    }
    if (cleanPath === '/investigations') {
      return <InvestigationsPage onNavigate={navigate} />;
    }
    if (cleanPath.startsWith('/investigations/')) {
      const id = cleanPath.replace('/investigations/', '');
      return <InvestigationsPage investigationId={id} onNavigate={navigate} />;
    }
    if (cleanPath === '/actors') {
      return <ActorsPage onNavigate={navigate} />;
    }
    if (cleanPath.startsWith('/actors/')) {
      const id = cleanPath.replace('/actors/', '');
      return <ActorsPage actorId={id} onNavigate={navigate} />;
    }
    if (cleanPath === '/identity-graph') {
      return <IdentityGraphPage onNavigate={navigate} />;
    }
    if (cleanPath === '/infrastructure' || cleanPath.startsWith('/infrastructure/')) {
      return <InfrastructurePage onNavigate={navigate} />;
    }
    if (cleanPath === '/persona-intelligence') {
      return <PersonaIntelligencePage onNavigate={navigate} />;
    }
    if (cleanPath === '/timeline') {
      return <TimelinePage onNavigate={navigate} />;
    }
    if (cleanPath === '/sources') {
      return <SourcesPage onNavigate={navigate} />;
    }
    if (cleanPath === '/autonomous-monitor') {
      return <AutonomousMonitorPage onNavigate={navigate} />;
    }
    if (cleanPath === '/data-explorer') {
      return <DataExplorerPage onNavigate={navigate} />;
    }
    if (cleanPath === '/reports') {
      return <ReportsPage onNavigate={navigate} />;
    }
    if (cleanPath === '/architecture') {
      return <ArchitecturePage onNavigate={navigate} />;
    }
    if (cleanPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (cleanPath === '/settings') {
      return <SettingsPage onNavigate={navigate} />;
    }

    // Default Fallback
    return <DashboardPage onNavigate={navigate} />;
  };

  const isLandingPage = currentPath === '/' || currentPath === '';

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Top Header */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Guided Walkthrough Floating Banner */}
      <DemoModeGuide onNavigate={navigate} />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette onNavigate={navigate} />

      {/* Floating TRACE AI Assistant */}
      <TraceAIAssistant />

      {/* Floating Toast Notifications */}
      <NotificationToast />

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {!isLandingPage && (
          <Sidebar
            currentPath={currentPath}
            onNavigate={navigate}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}

        <main className="flex-1 overflow-y-auto">
          {renderRoute()}
        </main>
      </div>

      {/* Global Enterprise Footer */}
      <Footer />
    </div>
  );
}
export default App;
