import React from 'react';
import { IntelligenceGlobe3D } from '../components/3d/IntelligenceGlobe3D';
import { useDarktraceStore } from '../store/useDarktraceStore';
import { Shield, ArrowRight, Play, Server, Network, BrainCircuit, Lock } from 'lucide-react';

export const LandingPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();

  const handleStartDemoInvestigation = () => {
    store.resetToNightfallDemo();
    onNavigate('/dashboard');
  };

  return (
    <div className="relative w-full min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* 3D Globe Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-auto">
        <IntelligenceGlobe3D onNodeSelect={() => {}} />
      </div>

      {/* Cyber Gradient Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-dark-950/60 via-dark-900/30 to-dark-950/95" />

      {/* Top Banner Notice */}
      <div className="relative z-10 w-full bg-dark-900/80 backdrop-blur border-b border-dark-600/70 py-2 px-4 text-center font-mono text-[11px] text-cyan/90 flex items-center justify-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-bold">DEMO ENVIRONMENT</span>
        <span className="text-slate-500">—</span>
        <span className="text-slate-300">Synthetic Intelligence Data for Lawful Threat Research</span>
      </div>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/40 text-cyan font-mono text-xs mb-6 shadow-glow-cyan">
          <Shield className="w-3.5 h-3.5" />
          <span className="font-semibold tracking-wider">CYBER THREAT INTELLIGENCE & ATTRIBUTION</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-4 font-sans">
          DARK<span className="text-cyan drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">TRACE</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-slate-200 font-medium max-w-3xl mb-3">
          Dark Web Threat Actor Intelligence & Attribution Platform
        </p>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-cyan font-mono tracking-wide max-w-2xl mb-8">
          Connecting Digital Footprints. Revealing Threat Actor Networks.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 font-mono text-xs">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cyan hover:bg-cyan/90 text-dark-950 font-bold flex items-center justify-center space-x-2.5 transition-all shadow-glow-cyan hover:shadow-glow-cyan-lg transform hover:-translate-y-0.5"
          >
            <span>ENTER INTELLIGENCE CONSOLE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleStartDemoInvestigation}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-dark-800/90 hover:bg-dark-750 text-cyan border border-cyan/60 font-bold flex items-center justify-center space-x-2.5 transition-all shadow-glass transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-cyan" />
            <span>START DEMO INVESTIGATION</span>
          </button>
        </div>

        {/* 3 Pillars Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left font-mono">
          <div className="glass-panel p-6 rounded-xl border border-dark-600/80 hover:border-cyan/50 transition-all group">
            <div className="p-2.5 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan w-fit mb-4 group-hover:scale-105 transition-transform">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-white font-sans font-bold text-base mb-2">Infrastructure Intelligence</h3>
            <p className="text-slate-400 text-xs font-sans leading-relaxed">
              Identify relationships between Tor hidden services, TLS certificates, IP host fingerprints, and configuration descriptors across darknet relays.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-dark-600/80 hover:border-cyan/50 transition-all group">
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit mb-4 group-hover:scale-105 transition-transform">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-white font-sans font-bold text-base mb-2">Cross-Marketplace Correlation</h3>
            <p className="text-slate-400 text-xs font-sans leading-relaxed">
              Unify scattered handles, PGP master keys, Wasabi UTXO wallet clusters, and vendor deposit nodes into an interconnected 3D relationship network.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-dark-600/80 hover:border-cyan/50 transition-all group">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit mb-4 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-white font-sans font-bold text-base mb-2">AI Persona Analysis</h3>
            <p className="text-slate-400 text-xs font-sans leading-relaxed">
              Compute stylometric cosine similarities, vocabulary diversity, and posting cadence across forums to produce explainable attribution confidence.
            </p>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-14 max-w-3xl p-4 rounded-xl bg-dark-900/90 border border-dark-700 text-slate-400 text-xs text-center font-sans leading-relaxed shadow-glass">
          <p className="flex items-center justify-center space-x-1.5 text-cyan font-mono text-[11px] mb-1 font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>LAWFUL CYBERSECURITY RESEARCH NOTICE</span>
          </p>
          DARKTRACE is an intelligence-analysis prototype designed for lawful cybersecurity research and investigation. Demonstration data is synthetic and does not represent real individuals or criminal entities.
        </div>
      </main>
    </div>
  );
};
