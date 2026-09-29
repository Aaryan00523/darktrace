import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import { IdentityGraph3D } from '../components/3d/IdentityGraph3D';
import { IdentityGraph2D } from '../components/graph2d/IdentityGraph2D';
import {
  Users,
  Fingerprint,
  Server,
  Network,
  Radio,
  Activity,
  Shield,
  Layers,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  FileText,
  CornerDownRight,
  Eye
} from 'lucide-react';

export const DashboardPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();
  const [selectedRelationship, setSelectedRelationship] = useState<any>(null);

  // Dynamic KPI computations from state
  const activeActorsCount = store.actors.filter(a => a.status === 'ACTIVE').length;
  const totalIdentitiesCount = store.identifiers.length + store.actors.length + store.personas.length;
  const totalInfraCount = store.infrastructure.length;
  const highConfidenceLinksCount = store.relationships.filter(r => r.confidence >= 85).length;
  const monitoredSourcesCount = store.sources.length;
  const totalEventsCount = store.timelineEvents.length;

  const currentActor = store.actors.find(a => a.id === store.selectedActorId) || store.actors[0];

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Top Section: Title & Scenario Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-sans">
              INTELLIGENCE COMMAND CENTER
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              CORE SYSTEM
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time correlation graph and autonomous darknet telemetry feed
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <div className="bg-dark-800/80 px-3 py-1.5 rounded-lg border border-dark-600 flex items-center space-x-2">
            <span className="text-slate-400">TARGET:</span>
            <span className="font-bold text-white">{currentActor.name}</span>
            <span className="text-cyan font-bold">{currentActor.attributionConfidence}%</span>
          </div>

          <button
            onClick={() => onNavigate(`/actors/${currentActor.id}`)}
            className="px-3 py-1.5 rounded-lg bg-cyan/15 hover:bg-cyan/25 border border-cyan text-cyan font-bold flex items-center space-x-1.5 transition-colors"
          >
            <span>ACTOR PROFILE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Section (Prompt Section 9) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 font-mono">
        <div className="glass-panel p-3.5 rounded-xl border border-dark-600/80">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>ACTIVE ACTORS</span>
            <Users className="w-3.5 h-3.5 text-cyan" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">{activeActorsCount}</div>
          <div className="text-[10px] text-cyan mt-1 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>100% Synthetic</span>
          </div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-dark-600/80">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>CORRELATED IDS</span>
            <Fingerprint className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">{totalIdentitiesCount}</div>
          <div className="text-[10px] text-purple-400 mt-1">PGP, Wallets, Handles</div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-dark-600/80">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>INFRA INDICATORS</span>
            <Server className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">{totalInfraCount}</div>
          <div className="text-[10px] text-red-400 mt-1">Tor, Certs, Hosts</div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-dark-600/80">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>HIGH-CONF LINKS</span>
            <Network className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">{highConfidenceLinksCount}</div>
          <div className="text-[10px] text-emerald-400 mt-1">&gt; 85% Confidence</div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-dark-600/80">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>MONITORED SOURCES</span>
            <Radio className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">{monitoredSourcesCount}</div>
          <div className="text-[10px] text-amber-400 mt-1">Reliability A-D</div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-dark-600/80">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>INTEL EVENTS</span>
            <Activity className="w-3.5 h-3.5 text-cyan" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">{totalEventsCount.toLocaleString()}</div>
          <div className="text-[10px] text-cyan mt-1">2024 — 2026 Feed</div>
        </div>
      </div>

      {/* Main Grid: Center 3D Graph + Right Live Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* CENTER: 3D / 2D Graph (Takes 2 Columns on desktop) */}
        <div className="lg:col-span-2 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="font-bold text-white flex items-center space-x-1.5">
                <Network className="w-4 h-4 text-cyan" />
                <span>RELATIONSHIP GRAPH: {currentActor.name}</span>
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan text-[11px] font-semibold">{store.graphMode} MODE</span>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs">
              <button
                onClick={() => onNavigate('/identity-graph')}
                className="text-cyan hover:underline text-[11px] flex items-center space-x-1"
              >
                <span>OPEN FULL GRAPH</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="w-full h-[520px] rounded-xl overflow-hidden border border-dark-600 shadow-glass">
            {store.graphMode === '3D' ? (
              <IdentityGraph3D
                onSelectNode={(node) => {
                  if (node.type === 'actor') {
                    onNavigate(`/actors/${node.id}`);
                  }
                }}
                onSelectEdge={(edge) => setSelectedRelationship(edge)}
              />
            ) : (
              <IdentityGraph2D
                onSelectNode={(node) => {
                  if (node.type === 'actor') {
                    onNavigate(`/actors/${node.id}`);
                  }
                }}
                onSelectEdge={(edge) => setSelectedRelationship(edge)}
              />
            )}
          </div>
        </div>

        {/* RIGHT: Live Intelligence Stream (Prompt Section 9) */}
        <div className="flex flex-col space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>LIVE INTELLIGENCE STREAM</span>
            </span>
            <span className="text-[10px] text-slate-400">52 Sources Syncing</span>
          </div>

          <div className="glass-panel rounded-xl border border-dark-600 p-3 h-[520px] overflow-y-auto space-y-2.5">
            {store.streamItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-dark-800/90 border border-dark-600/80 hover:border-cyan/40 transition-colors text-xs"
              >
                <div className="flex items-center justify-between mb-1 text-[10px]">
                  <span
                    className={`font-bold px-1.5 py-0.2 rounded uppercase ${
                      item.category === 'ALERT'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : item.category === 'CORRELATION'
                        ? 'bg-cyan/20 text-cyan border border-cyan/40'
                        : item.category === 'RELATIONSHIP'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-dark-700 text-slate-300'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-slate-500">{item.timestamp}</span>
                </div>

                <p className="text-slate-300 font-sans text-[11px] leading-relaxed mb-2">
                  {item.message}
                </p>

                {item.confidence && (
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-dark-700/60 pt-1.5">
                    <span>Target: <strong className="text-white">{item.actorName}</strong></span>
                    <span className="text-cyan font-bold">{item.confidence}% CONF</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM: Threat Activity Timeline Bar (Prompt Section 9 & 21) */}
      <div className="glass-panel p-4 rounded-xl border border-dark-600 space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-cyan" />
            <span className="font-bold text-white">CHRONOLOGICAL ATTRIBUTION ACTIVITY</span>
            <span className="text-slate-500">({store.timelineEvents.length} Recorded Events)</span>
          </div>

          <button
            onClick={() => onNavigate('/timeline')}
            className="text-cyan hover:underline text-[11px] flex items-center space-x-1"
          >
            <span>VIEW 3D TIMELINE</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {store.timelineEvents.slice(0, 4).map(event => (
            <div
              key={event.id}
              className="p-3 rounded-lg bg-dark-800/80 border border-dark-600/70 hover:border-cyan/40 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] text-cyan font-bold mb-1">
                <span>{event.date}</span>
                <span className="text-slate-400">{event.confidence}% CONF</span>
              </div>
              <h4 className="text-white font-sans font-bold text-xs truncate mb-1">
                {event.title}
              </h4>
              <p className="text-slate-400 font-sans text-[11px] line-clamp-2">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Relationship Analysis Drawer (Prompt Section 16) */}
      {selectedRelationship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm select-none">
          <div className="w-full max-w-lg bg-dark-800 border border-cyan/50 rounded-xl shadow-2xl p-5 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-dark-600 pb-3">
              <div>
                <span className="text-[10px] text-cyan uppercase font-bold tracking-wider">
                  RELATIONSHIP ANALYSIS
                </span>
                <h3 className="text-base font-sans font-bold text-white mt-0.5">
                  {selectedRelationship.relationshipType}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRelationship(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-dark-850 p-3 rounded-lg border border-dark-700">
              <div>
                <span className="text-slate-500 text-[10px]">SOURCE ENTITY:</span>
                <div className="text-white font-bold">{selectedRelationship.sourceLabel}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">TARGET ENTITY:</span>
                <div className="text-white font-bold">{selectedRelationship.targetLabel}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">CONFIDENCE:</span>
                <div className="text-cyan font-bold text-sm">{selectedRelationship.confidence}%</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">SOURCE COUNT:</span>
                <div className="text-white font-bold">{selectedRelationship.sourceCount} Feeds</div>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold text-[11px] block mb-1">ANALYTICAL DESCRIPTION:</span>
              <p className="text-slate-300 font-sans text-xs leading-relaxed bg-dark-900 p-3 rounded border border-dark-700">
                {selectedRelationship.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-dark-600">
              <span className="text-slate-500 text-[10px]">
                Observed: {selectedRelationship.firstObserved} → {selectedRelationship.lastObserved}
              </span>
              <button
                onClick={() => {
                  store.addEntityToActiveInvestigation(selectedRelationship.id, selectedRelationship.relationshipType);
                  setSelectedRelationship(null);
                }}
                className="px-4 py-2 rounded-lg bg-cyan text-dark-950 font-bold hover:bg-cyan/90 transition-colors shadow-glow-cyan"
              >
                ADD TO INVESTIGATION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
