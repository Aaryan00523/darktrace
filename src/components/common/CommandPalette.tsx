import React, { useState, useEffect } from 'react';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { Search, X, Shield, Globe, Terminal, RefreshCw, FileText, ArrowRight, CornerDownLeft, Eye } from 'lucide-react';

export const CommandPalette: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        store.setCommandPaletteOpen(!store.commandPaletteOpen);
      } else if (e.key === 'Escape' && store.commandPaletteOpen) {
        store.setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [store.commandPaletteOpen]);

  if (!store.commandPaletteOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search Results
  const matchedActors = store.actors.filter(a =>
    a.name.toLowerCase().includes(trimmed) ||
    a.primaryHandle.toLowerCase().includes(trimmed) ||
    a.aliases.some(al => al.toLowerCase().includes(trimmed))
  ).slice(0, 5);

  const matchedIdentifiers = store.identifiers.filter(i =>
    i.value.toLowerCase().includes(trimmed) ||
    i.actorName.toLowerCase().includes(trimmed)
  ).slice(0, 5);

  const matchedInfra = store.infrastructure.filter(inf =>
    inf.indicator.toLowerCase().includes(trimmed) ||
    inf.actorName.toLowerCase().includes(trimmed)
  ).slice(0, 4);

  const staticActions = [
    { label: 'Open Main Dashboard', path: '/dashboard', icon: Terminal, action: () => onNavigate('/dashboard') },
    { label: 'Investigate NightFall Scenario', path: '/actors/actor-nightfall', icon: Shield, action: () => { store.setSelectedActorId('actor-nightfall'); onNavigate('/actors/actor-nightfall'); } },
    { label: 'Open 3D Identity Graph', path: '/identity-graph', icon: Globe, action: () => onNavigate('/identity-graph') },
    { label: 'Run Autonomous Intelligence Scan', path: '/autonomous-monitor', icon: RefreshCw, action: () => { store.runAutonomousScan(); onNavigate('/autonomous-monitor'); } },
    { label: 'Generate PDF Investigation Report', path: '/reports', icon: FileText, action: () => onNavigate('/reports') },
    { label: 'Toggle 2D / 3D Graph Mode', path: '/identity-graph', icon: Eye, action: () => { store.setGraphMode(store.graphMode === '3D' ? '2D' : '3D'); } }
  ].filter(a => trimmed === '' || a.label.toLowerCase().includes(trimmed));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-dark-950/80 backdrop-blur-sm select-none">
      <div className="w-full max-w-2xl bg-dark-800 border border-cyan/40 rounded-xl shadow-2xl overflow-hidden font-mono text-xs">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-dark-600 bg-dark-850">
          <Search className="w-4 h-4 text-cyan mr-3 flex-shrink-0 animate-pulse" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search threat actors, handles, PGP keys, wallets, infrastructure, domains..."
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm font-sans"
            autoFocus
          />
          <button
            onClick={() => store.setCommandPaletteOpen(false)}
            className="text-slate-500 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Quick Actions */}
          {staticActions.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Quick Actions & Navigation
              </div>
              <div className="space-y-1 mt-1">
                {staticActions.map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => { act.action(); store.setCommandPaletteOpen(false); }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-dark-700/80 text-slate-300 hover:text-cyan transition-colors text-left"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-3.5 h-3.5 text-cyan" />
                        <span>{act.label}</span>
                      </div>
                      <CornerDownLeft className="w-3 h-3 text-slate-500" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matched Threat Actors */}
          {matchedActors.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Correlated Threat Actors ({matchedActors.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchedActors.map(actor => (
                  <button
                    key={actor.id}
                    onClick={() => {
                      store.setSelectedActorId(actor.id);
                      onNavigate(`/actors/${actor.id}`);
                      store.setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-dark-700/80 text-left transition-colors"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center space-x-2">
                        <span>{actor.name}</span>
                        <span className="text-cyan text-[10px] px-1.5 py-0.5 rounded bg-cyan/10">
                          {actor.attributionConfidence}% CONF
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Aliases: {actor.aliases.join(', ')} • Observed: {actor.lastObserved}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Identifiers */}
          {matchedIdentifiers.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Identifiers & Wallets ({matchedIdentifiers.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchedIdentifiers.map(ident => (
                  <button
                    key={ident.id}
                    onClick={() => {
                      store.setSelectedActorId(ident.associatedActorId);
                      onNavigate(`/actors/${ident.associatedActorId}`);
                      store.setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-dark-700/80 text-left transition-colors"
                  >
                    <div>
                      <span className="text-cyan uppercase text-[10px] mr-2 px-1 py-0.5 rounded bg-dark-900 border border-dark-600">
                        {ident.type}
                      </span>
                      <span className="text-white font-mono">{ident.value}</span>
                      <span className="text-slate-500 text-[11px] ml-2">→ {ident.actorName}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Infrastructure */}
          {matchedInfra.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Infrastructure Indicators ({matchedInfra.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchedInfra.map(infra => (
                  <button
                    key={infra.id}
                    onClick={() => {
                      onNavigate('/infrastructure');
                      store.setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-dark-700/80 text-left transition-colors"
                  >
                    <div>
                      <span className="text-red-400 uppercase text-[10px] mr-2 px-1 py-0.5 rounded bg-dark-900 border border-dark-600">
                        {infra.type}
                      </span>
                      <span className="text-white font-mono">{infra.indicator}</span>
                      <span className="text-slate-500 text-[11px] ml-2">→ {infra.actorName}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && matchedActors.length === 0 && matchedIdentifiers.length === 0 && matchedInfra.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No synthetic intelligence records matched "<span className="text-white">{query}</span>"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-dark-600 bg-dark-850 flex items-center justify-between text-[10px] text-slate-500">
          <span>Tip: Press ESC to exit • Enter to select</span>
          <span className="text-cyan">DEMO ENVIRONMENT</span>
        </div>
      </div>
    </div>
  );
};
