import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import { PersonaSpace3D } from '../components/3d/PersonaSpace3D';
import {
  BrainCircuit,
  MessageSquare,
  Clock,
  Sparkles,
  Shield,
  Layers,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { Persona } from '../types';

export const PersonaIntelligencePage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();
  const [selectedPersona, setSelectedPersona] = useState<Persona>(store.personas[0]);

  // Curated Nightfall personas to compare
  const comparisonGroup = store.personas.slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              AI PERSONA & STYLOMETRIC INTELLIGENCE
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              NLP VECTOR CLUSTERING
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Linguistic stylometry, vocabulary entropy, and behavioral cadence across darknet forums
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <div className="bg-dark-800 px-3 py-1.5 rounded-lg border border-dark-600 text-cyan">
            CORRELATION INDEX: <strong className="text-white">86% MATCH</strong>
          </div>
        </div>
      </div>

      {/* 3D Similarity Space Canvas (Prompt Section 19) */}
      <div className="w-full h-[480px] rounded-xl overflow-hidden border border-dark-600 shadow-glass">
        <PersonaSpace3D onSelectPersona={(p) => setSelectedPersona(p)} />
      </div>

      {/* Comparison Grid: NIGHTFALL vs NF_MARKET vs ECLIPSEVENDOR */}
      <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-6 font-mono">
        <div className="flex items-center justify-between border-b border-dark-600 pb-3">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-cyan animate-pulse" />
            <h3 className="text-base font-sans font-bold text-white">
              CROSS-PLATFORM PERSONA COMPARISON MATRIX
            </h3>
          </div>
          <span className="text-xs text-cyan font-bold">ANALYTICAL OVERLAP: 86%</span>
        </div>

        {/* 3 Persona Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comparisonGroup.map((p, idx) => (
            <div
              key={p.id}
              className={`p-4 rounded-xl border transition-all ${
                selectedPersona.id === p.id
                  ? 'bg-cyan/10 border-cyan shadow-glow-cyan'
                  : 'bg-dark-850 border-dark-700 hover:border-dark-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white font-sans">{p.handle}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-dark-750 text-cyan border border-dark-600">
                  {p.metrics.overallCorrelation}% CORR
                </span>
              </div>
              <div className="text-xs text-purple-300 mb-3">{p.platform}</div>

              <div className="space-y-2 text-xs border-t border-dark-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Stylometric Similarity:</span>
                  <span className="text-white font-bold">{p.metrics.stylometricSimilarity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vocabulary Overlap:</span>
                  <span className="text-white font-bold">{p.metrics.vocabularySimilarity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Writing Pattern:</span>
                  <span className="text-white font-bold">{p.metrics.writingPatternSimilarity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Behavioral Similarity:</span>
                  <span className="text-white font-bold">{p.metrics.behaviouralSimilarity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Activity Timing:</span>
                  <span className="text-white font-bold">{p.metrics.activityTimingSimilarity}%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-dark-700 text-[10px] text-slate-400">
                <span className="text-slate-500 block mb-1">RECURRENT PHRASES:</span>
                <div className="flex flex-wrap gap-1">
                  {p.metrics.keyPhrases.slice(0, 2).map((phrase, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-dark-900 text-slate-300">
                      "{phrase}"
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Analysis Summary Box (Prompt Section 20) */}
        <div className="p-4 rounded-xl bg-dark-850 border border-cyan/40 space-y-2 shadow-glass font-mono">
          <div className="flex items-center space-x-2 text-cyan font-bold text-xs">
            <Sparkles className="w-4 h-4 text-cyan" />
            <span>AI ANALYSIS SUMMARY & METHODOLOGY</span>
          </div>
          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            Multiple behavioural and linguistic characteristics overlap across the selected synthetic personas (NightFall on Dread, NF_Market on SilkCore, and EclipseVendor on Genesis). The high cosine similarity (84-91%) across sentence length distributions, rare technical terminology, and identical UTC posting envelopes indicates a single underlying threat actor entity. The result should be treated as an analytical correlation rather than definitive real-world attribution.
          </p>
        </div>
      </div>
    </div>
  );
};
