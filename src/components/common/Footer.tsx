import React from 'react';
import { ShieldCheck, Lock, Cpu, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-dark-950 border-t border-dark-600/80 py-6 px-4 lg:px-8 text-xs font-mono text-slate-500 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand & Statement */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-1 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
          <div className="flex items-center space-x-2 text-cyan font-bold font-sans text-sm">
            <ShieldCheck className="w-4 h-4 text-cyan" />
            <span>DARKTRACE</span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-slate-400">
            Dark Web Threat Actor Intelligence & Attribution Platform
          </span>
        </div>

        {/* Center: Legal & Synthetic Data Safeguards */}
        <div className="flex items-center space-x-2 text-[11px] bg-dark-850 px-3 py-1.5 rounded-lg border border-dark-600/60 text-slate-400">
          <Lock className="w-3.5 h-3.5 text-cyan/70" />
          <span>Lawful Cybersecurity Research — 100% Synthetic Intelligence Data</span>
        </div>

        {/* Right: Engine Telemetry */}
        <div className="flex items-center space-x-3 text-[10px] text-slate-500">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>NODES ONLINE</span>
          </span>
          <span>•</span>
          <span>v2.8.4-SYNTHETIC</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-3 text-center text-[10px] text-slate-600">
        DARKTRACE connects scattered digital footprints into an explainable threat-actor intelligence graph. Demonstration data does not represent real persons or criminal entities.
      </div>
    </footer>
  );
};
