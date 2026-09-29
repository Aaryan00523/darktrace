import React from 'react';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { Compass, CheckCircle2, ChevronRight, X, Play } from 'lucide-react';

export const DemoModeGuide: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();

  if (store.demoGuideStep === null) return null;

  const steps = [
    {
      step: 1,
      title: 'Actor Discovery',
      path: '/actors/actor-nightfall',
      desc: 'Inspect initial threat indicators, known aliases (NF_Market, EclipseVendor), and 4096-bit PGP keys for NightFall.'
    },
    {
      step: 2,
      title: 'Identity Correlation',
      path: '/identity-graph',
      desc: 'Explore the 3D identity graph linking NightFall to wallets, onion domains, and cross-marketplace personas.'
    },
    {
      step: 3,
      title: 'Infrastructure Analysis',
      path: '/infrastructure',
      desc: 'Analyze the 6-tier cascading infrastructure from Tor hidden services to self-signed TLS certificates and IP hosts.'
    },
    {
      step: 4,
      title: 'Persona Analysis',
      path: '/persona-intelligence',
      desc: 'Review AI stylometric cosine vectors, writing cadence, and cross-forum behavioral similarity (86% match).'
    },
    {
      step: 5,
      title: 'Attribution Timeline',
      path: '/timeline',
      desc: 'Trace chronological progression from first Dread post in 2024 to multi-hop wallet transfers in 2026.'
    },
    {
      step: 6,
      title: 'Attribution Confidence',
      path: '/investigations/inv-eclipse-01',
      desc: 'Examine the multi-factor explainable attribution breakdown (PGP 30%, Infra 25%, Wallets 20%, NLP 15%, Timing 10%).'
    },
    {
      step: 7,
      title: 'Investigation Report',
      path: '/reports',
      desc: 'Compile and download comprehensive court-ready and executive investigation dossiers in PDF, JSON, and CSV.'
    }
  ];

  const currentStepData = steps.find(s => s.step === store.demoGuideStep) || steps[0];

  const handleStepClick = (stepNum: number, path: string) => {
    store.setDemoGuideStep(stepNum);
    store.setSelectedActorId('actor-nightfall');
    onNavigate(path);
  };

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40 w-11/12 max-w-4xl bg-dark-850/95 backdrop-blur-xl border border-cyan/40 rounded-xl shadow-2xl p-3 font-mono text-xs select-none">
      <div className="flex items-center justify-between border-b border-dark-600 pb-2 mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-cyan/15 text-cyan">
            <Compass className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <span className="font-bold text-white tracking-wide">
              INVESTIGATION WALKTHROUGH — NIGHTFALL SCENARIO
            </span>
            <span className="ml-2 text-[10px] text-cyan px-2 py-0.5 rounded bg-cyan/10 border border-cyan/30">
              SYNTHETIC DATASET DEMO
            </span>
          </div>
        </div>
        <button
          onClick={() => store.setDemoGuideStep(null)}
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Step Pills */}
      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {steps.map(s => {
          const isActive = s.step === store.demoGuideStep;
          const isPast = (store.demoGuideStep || 1) > s.step;

          return (
            <button
              key={s.step}
              onClick={() => handleStepClick(s.step, s.path)}
              className={`p-1.5 rounded-lg text-left transition-all border ${
                isActive
                  ? 'bg-cyan/20 border-cyan text-white shadow-glow-cyan'
                  : isPast
                  ? 'bg-dark-800 border-dark-600 text-slate-300 hover:border-slate-400'
                  : 'bg-dark-900/50 border-dark-700 text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-1 text-[9px] mb-0.5">
                {isPast ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                ) : (
                  <span className={`w-3 h-3 rounded-full text-[8px] flex items-center justify-center font-bold ${
                    isActive ? 'bg-cyan text-dark-950' : 'bg-dark-700 text-slate-400'
                  }`}>
                    {s.step}
                  </span>
                )}
                <span className="truncate uppercase font-semibold">Step {s.step}</span>
              </div>
              <div className="text-[10px] font-sans truncate font-medium">{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* Current Step Description & Action */}
      <div className="bg-dark-900/90 rounded-lg p-2.5 border border-dark-700 flex items-center justify-between">
        <div className="text-slate-300 text-[11px] font-sans mr-4">
          <strong className="text-cyan font-mono mr-1.5">STEP {currentStepData.step}:</strong>
          {currentStepData.desc}
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0 font-mono">
          {store.demoGuideStep > 1 && (
            <button
              onClick={() => handleStepClick(store.demoGuideStep! - 1, steps[store.demoGuideStep! - 2].path)}
              className="px-2.5 py-1 rounded bg-dark-750 hover:bg-dark-700 text-slate-300 border border-dark-600 text-[10px]"
            >
              PREVIOUS
            </button>
          )}
          {store.demoGuideStep < 7 ? (
            <button
              onClick={() => handleStepClick(store.demoGuideStep! + 1, steps[store.demoGuideStep!].path)}
              className="px-3 py-1 rounded bg-cyan/20 hover:bg-cyan/30 text-cyan border border-cyan flex items-center space-x-1 text-[10px] font-bold"
            >
              <span>NEXT STEP</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={() => store.setDemoGuideStep(null)}
              className="px-3 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500 text-[10px] font-bold"
            >
              FINISH WALKTHROUGH
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
