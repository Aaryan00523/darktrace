import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import { AutonomousMonitor3D } from '../components/3d/AutonomousMonitor3D';
import {
  Cpu,
  RefreshCw,
  Terminal
} from 'lucide-react';

export const AutonomousMonitorPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();

  const scanSteps = [
    { label: 'SOURCE', desc: 'Passive Tor descriptor collection & keyserver synchronization' },
    { label: 'COLLECT', desc: 'Autonomous daemons extracting raw crawler artifacts' },
    { label: 'NORMALIZE', desc: 'STIX 2.1 schema mapping & PGP subkey deduplication' },
    { label: 'CORRELATE', desc: 'Graph traversal linking UTXO inputs & TLS certificate SHA256' },
    { label: 'ANALYZE', desc: 'PyTorch NLP cosine stylometry & behavioral timing envelopes' },
    { label: 'ATTRIBUTE', desc: 'Multi-factor weighted confidence engine calculation' },
    { label: 'INTELLIGENCE', desc: 'Synchronized live threat intelligence graph & alerts' }
  ];

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              AUTONOMOUS INTELLIGENCE MONITOR
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              ● ENGINE ONLINE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Continuous background correlation engine and autonomous darknet ingest pipeline
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={() => store.runAutonomousScan()}
            disabled={store.isScanning}
            className={`px-4 py-2 rounded-lg font-bold flex items-center space-x-2 transition-all shadow-glow-cyan ${
              store.isScanning
                ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                : 'bg-cyan hover:bg-cyan/90 text-dark-950 hover:shadow-glow-cyan-lg'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${store.isScanning ? 'animate-spin' : ''}`} />
            <span>{store.isScanning ? `EXECUTING SCAN (${store.scanProgress}%)` : 'RUN SCAN NOW'}</span>
          </button>
        </div>
      </div>

      {/* 3D Autonomous Monitor Canvas (Prompt Section 22) */}
      <div className="w-full h-[460px] rounded-xl overflow-hidden border border-dark-600 shadow-glass">
        <AutonomousMonitor3D />
      </div>

      {/* Pipeline Architecture Grid */}
      <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-dark-600 pb-3">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-cyan" />
            <h3 className="text-base font-sans font-bold text-white">
              7-STAGE AUTONOMOUS INGEST & ATTRIBUTION PIPELINE
            </h3>
          </div>
          <span className="text-xs text-slate-400">Zero-Human-Intervention Correlation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {scanSteps.map((s, idx) => (
            <div
              key={s.label}
              className={`p-3 rounded-lg border transition-all ${
                store.isScanning && idx <= Math.floor(store.scanProgress / 15)
                  ? 'bg-cyan/15 border-cyan text-white shadow-glow-cyan'
                  : 'bg-dark-850 border-dark-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-cyan">0{idx + 1}</span>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-dark-750 text-slate-400">
                  STAGE
                </span>
              </div>
              <h4 className="text-white font-bold text-xs mb-1 font-sans">{s.label}</h4>
              <p className="text-slate-400 text-[10px] font-sans leading-tight">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Ingest Telemetry Console */}
      <div className="glass-panel p-4 rounded-xl border border-dark-600 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 border-b border-dark-600 pb-2">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">AUTONOMOUS ENGINE EXECUTION LOG</span>
          </div>
          <span className="text-[10px] text-cyan">SOCKS5 / TOR PROXY POOL ACTIVE</span>
        </div>

        <div className="bg-dark-950 p-4 rounded-lg border border-dark-700 h-44 overflow-y-auto space-y-1.5 text-[11px] text-slate-300 font-mono">
          <div className="text-slate-500">[00:00:01] Initializing autonomous crawler orchestration matrix...</div>
          <div className="text-emerald-400">[00:00:02] Connected to 52 synthetic data ingest daemons. SOCKS5 consensus verified.</div>
          <div className="text-slate-300">[00:00:04] Synchronized 195 TLS certificate transparency records from Darknet TLS feed.</div>
          <div className="text-cyan">[00:00:06] Multi-input UTXO cluster analysis parsed 14 Bitcoin transactions for NightFall.</div>
          <div className="text-purple-300">[00:00:09] Cosine similarity calculated across Dread and Genesis forum posts (88% stylometric match).</div>
          {store.isScanning && (
            <div className="text-amber-400 animate-pulse font-bold">
              &gt;&gt; Running automated scan: probing Tor onion descriptors, resolving reverse proxy headers...
            </div>
          )}
          <div className="text-slate-400">[00:00:15] Next scheduled background autonomous cycle in 8 minutes.</div>
        </div>
      </div>
    </div>
  );
};
