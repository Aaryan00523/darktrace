import React from 'react';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import {
  Shield,
  Search,
  Bot,
  RefreshCw,
  Compass,
  Sliders,
  Layers,
  Terminal,
  Activity,
  Box
} from 'lucide-react';

export const Header: React.FC<{
  currentPath: string;
  onNavigate: (path: string) => void;
}> = ({ currentPath, onNavigate }) => {
  const store = useDarktraceStore();

  const getBreadcrumb = (path: string) => {
    if (path === '/') return 'INTELLIGENCE PORTAL';
    if (path === '/dashboard') return 'MAIN COMMAND CENTER';
    if (path.startsWith('/actors')) return 'THREAT ACTOR PROFILES';
    if (path === '/identity-graph') return 'IDENTITY GRAPH CORRELATION';
    if (path.startsWith('/infrastructure')) return 'INFRASTRUCTURE INTELLIGENCE';
    if (path === '/persona-intelligence') return 'AI PERSONA STYLOMETRY';
    if (path === '/timeline') return '3D ATTRIBUTION TIMELINE';
    if (path === '/sources') return 'INTELLIGENCE SOURCES & RELIABILITY';
    if (path === '/autonomous-monitor') return 'AUTONOMOUS CRAWLER ENGINE';
    if (path === '/data-explorer') return 'SYNTHETIC DATA EXPLORER';
    if (path === '/reports') return 'INVESTIGATION REPORT CENTER';
    if (path.startsWith('/investigations')) return 'OPERATION DOSSIERS';
    if (path === '/architecture') return '3D SYSTEM ARCHITECTURE';
    if (path === '/about') return 'METHODOLOGY & LEGAL FRAMEWORK';
    if (path === '/settings') return 'PLATFORM SETTINGS';
    return 'DARKTRACE CONSOLE';
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-dark-900/90 backdrop-blur-md border-b border-dark-600 px-4 lg:px-6 flex items-center justify-between font-mono text-xs select-none">
      {/* Left: Brand & Breadcrumb */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center space-x-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/40 flex items-center justify-center text-cyan shadow-glow-cyan group-hover:border-cyan transition-colors">
            <Shield className="w-4 h-4 text-cyan" />
          </div>
          <div>
            <div className="text-white font-extrabold tracking-wider text-base font-sans leading-none flex items-center space-x-2">
              <span>DARKTRACE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></span>
            </div>
            <div className="text-[9px] text-cyan/70 tracking-tight mt-0.5">
              DE-ANONYMIZATION PLATFORM
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center space-x-2 text-slate-500 border-l border-dark-600 pl-4">
          <Terminal className="w-3.5 h-3.5 text-cyan/80" />
          <span className="text-slate-400 font-semibold uppercase">{getBreadcrumb(currentPath)}</span>
        </div>
      </div>

      {/* Center: Synthetic Intelligence Environment Disclaimer Badge */}
      <div className="hidden xl:flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan/5 border border-cyan/30 text-[10px] text-cyan">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="font-semibold tracking-wide">DEMO ENVIRONMENT — SYNTHETIC INTELLIGENCE DATA</span>
      </div>

      {/* Right: Actions, Search, Guided Walkthrough, AI Assistant */}
      <div className="flex items-center space-x-2.5">
        {/* Global Search Button */}
        <button
          onClick={() => store.setCommandPaletteOpen(true)}
          className="flex items-center space-x-2 bg-dark-800 hover:bg-dark-750 border border-dark-600 hover:border-cyan/50 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-cyan" />
          <span className="hidden sm:inline text-[11px]">Search intelligence...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-dark-900 border border-dark-600 rounded text-slate-400">
            Ctrl+K
          </kbd>
        </button>

        {/* 2D / 3D Toggle (Visible especially on Graph & Dash) */}
        <button
          onClick={() => store.setGraphMode(store.graphMode === '3D' ? '2D' : '3D')}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all ${
            store.graphMode === '3D'
              ? 'bg-cyan/15 border-cyan text-cyan shadow-glow-cyan'
              : 'bg-dark-800 border-dark-600 text-slate-300 hover:text-white'
          }`}
          title="Toggle 2D / 3D Rendering"
        >
          <Box className="w-3.5 h-3.5" />
          <span>{store.graphMode}</span>
        </button>

        {/* Guided Walkthrough Launcher */}
        <button
          onClick={() => {
            store.resetToNightfallDemo();
            onNavigate('/actors/actor-nightfall');
          }}
          className="flex items-center space-x-1.5 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden md:inline">WALKTHROUGH</span>
        </button>

        {/* Autonomous Scan Trigger */}
        <button
          onClick={() => store.runAutonomousScan()}
          disabled={store.isScanning}
          className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
            store.isScanning
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : 'bg-dark-800 hover:bg-dark-700 border-dark-600 hover:border-cyan text-slate-200'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan ${store.isScanning ? 'animate-spin' : ''}`} />
          <span>{store.isScanning ? `${store.scanProgress}%` : 'SCAN'}</span>
        </button>

        {/* TRACE AI Assistant Toggle */}
        <button
          onClick={() => store.setAiAssistantOpen(!store.aiAssistantOpen)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
            store.aiAssistantOpen
              ? 'bg-cyan text-dark-950 border-cyan shadow-glow-cyan'
              : 'bg-dark-800 hover:bg-dark-700 border-dark-600 text-cyan'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">TRACE AI</span>
        </button>
      </div>
    </header>
  );
};
