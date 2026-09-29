import React from 'react';
import { useDarktraceStore, PerformanceMode } from '../store/useDarktraceStore';
import { Settings, Sliders, Shield, RefreshCw, Box, Eye, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();

  const handleResetData = () => {
    store.resetToNightfallDemo();
    store.addToast({
      title: 'Environment Reset',
      message: 'Synthetic intelligence dataset restored to default baseline scenario.',
      type: 'info'
    });
  };

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-dark-600/70 pb-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            PLATFORM SETTINGS & PREFERENCES
          </h1>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
            SYSTEM CONFIGURATION
          </span>
        </div>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Adjust 3D WebGL rendering profiles, graph display preferences, and dataset seed parameters
        </p>
      </div>

      <div className="max-w-3xl space-y-6 font-mono text-xs">
        {/* 3D Performance Mode */}
        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4">
          <div className="flex items-center space-x-2 text-cyan font-bold">
            <Sliders className="w-4 h-4 text-cyan" />
            <h3 className="text-white font-sans font-bold text-sm">3D WEBGL RENDERING PROFILE</h3>
          </div>
          <p className="text-slate-400 font-sans text-xs">
            Configure WebGL canvas anti-aliasing, particle density, and dynamic lighting performance based on your device GPU capabilities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {(['HIGH', 'BALANCED', 'PERFORMANCE'] as PerformanceMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => {
                  store.setPerformanceMode(mode);
                  store.addToast({
                    title: 'Performance Profile Updated',
                    message: `3D rendering switched to ${mode} mode.`,
                    type: 'info'
                  });
                }}
                className={`p-3.5 rounded-lg border text-left transition-all ${
                  store.performanceMode === mode
                    ? 'bg-cyan/15 border-cyan text-white shadow-glow-cyan'
                    : 'bg-dark-850 border-dark-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">{mode}</span>
                  {store.performanceMode === mode && <CheckCircle2 className="w-3.5 h-3.5 text-cyan" />}
                </div>
                <div className="text-[10px] text-slate-400 font-sans">
                  {mode === 'HIGH' ? 'Full shaders & starfield' : mode === 'BALANCED' ? 'Standard geometry' : 'Low GPU usage'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Default Graph View Mode */}
        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4">
          <div className="flex items-center space-x-2 text-cyan font-bold">
            <Box className="w-4 h-4 text-cyan" />
            <h3 className="text-white font-sans font-bold text-sm">DEFAULT IDENTITY GRAPH MODE</h3>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => store.setGraphMode('3D')}
              className={`px-4 py-2 rounded-lg font-bold border transition-all ${
                store.graphMode === '3D'
                  ? 'bg-cyan text-dark-950 border-cyan shadow-glow-cyan'
                  : 'bg-dark-800 text-slate-300 border-dark-600 hover:text-white'
              }`}
            >
              3D MODE (DEFAULT)
            </button>
            <button
              onClick={() => store.setGraphMode('2D')}
              className={`px-4 py-2 rounded-lg font-bold border transition-all ${
                store.graphMode === '2D'
                  ? 'bg-cyan text-dark-950 border-cyan shadow-glow-cyan'
                  : 'bg-dark-800 text-slate-300 border-dark-600 hover:text-white'
              }`}
            >
              2D MODE (VECTOR SVG)
            </button>
          </div>
        </div>

        {/* Dataset Seed Reset */}
        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <RefreshCw className="w-4 h-4" />
            <h3 className="text-white font-sans font-bold text-sm">SYNTHETIC ENVIRONMENT SEED</h3>
          </div>
          <p className="text-slate-400 font-sans text-xs">
            Reset any active autonomous scan discoveries and restore the baseline NightFall and Operation Eclipse investigation scenarios.
          </p>
          <button
            onClick={handleResetData}
            className="px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-750 text-amber-300 border border-amber-500/50 font-bold transition-colors"
          >
            RESET TO DEFAULT SEED
          </button>
        </div>
      </div>
    </div>
  );
};
