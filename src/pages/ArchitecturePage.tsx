import React from 'react';
import { Architecture3D } from '../components/3d/Architecture3D';
import { Layers, Database, Cpu, Shield, Globe, Terminal, Server, Network } from 'lucide-react';

export const ArchitecturePage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              3D ENTERPRISE SYSTEM ARCHITECTURE
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              LAYERED DEPLOYMENT MODEL
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Interactive multi-tier architecture spanning ingestion, normalization, graph resolution, and 3D presentation
          </p>
        </div>
      </div>

      {/* 3D Architecture Canvas (Prompt Section 30) */}
      <div className="w-full h-[540px] rounded-xl overflow-hidden border border-dark-600 shadow-glass">
        <Architecture3D />
      </div>

      {/* Static Subsystem Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
        <div className="glass-panel p-5 rounded-xl border border-dark-600 space-y-2.5">
          <div className="flex items-center space-x-2 text-cyan font-bold">
            <Layers className="w-4 h-4" />
            <span className="font-sans">APPLICATION TIER</span>
          </div>
          <p className="text-slate-400 font-sans leading-relaxed text-[11px]">
            Zero-trust frontend running WebGL / Three.js hardware-accelerated shaders, instant local state synchronization via Zustand, and high-fidelity 2D/3D graph visualization.
          </p>
          <div className="text-[10px] text-cyan pt-2 border-t border-dark-700">
            Stack: React 19 • Vite • Three.js • Tailwind • jsPDF
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-dark-600 space-y-2.5">
          <div className="flex items-center space-x-2 text-purple-400 font-bold">
            <Cpu className="w-4 h-4" />
            <span className="font-sans">ANALYTICAL ENGINE TIER</span>
          </div>
          <p className="text-slate-400 font-sans leading-relaxed text-[11px]">
            NLP stylometric vector engines calculating sentence length variance, lexical entropy, and Jaccard collocations alongside Common Input Ownership UTXO graph traversal.
          </p>
          <div className="text-[10px] text-purple-400 pt-2 border-t border-dark-700">
            Stack: PyTorch Transformers • NetworkX • Cosine Matrix
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-dark-600 space-y-2.5">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <Database className="w-4 h-4" />
            <span className="font-sans">GRAPH & STORAGE TIER</span>
          </div>
          <p className="text-slate-400 font-sans leading-relaxed text-[11px]">
            Property graph database maintaining sub-millisecond multi-hop relationship traversals combined with encrypted immutable object storage for cryptographic evidence artifacts.
          </p>
          <div className="text-[10px] text-emerald-400 pt-2 border-t border-dark-700">
            Stack: Neo4j Graph DB • PostgreSQL 16 • Object Vault
          </div>
        </div>
      </div>
    </div>
  );
};
