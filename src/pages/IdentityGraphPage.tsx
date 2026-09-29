import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import { IdentityGraph3D } from '../components/3d/IdentityGraph3D';
import { IdentityGraph2D } from '../components/graph2d/IdentityGraph2D';
import {
  Network,
  Box,
  Layers,
  Shield,
  FolderPlus,
  Info,
  Maximize2,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { Relationship } from '../types';

export const IdentityGraphPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();
  const [selectedRel, setSelectedRel] = useState<Relationship | null>(null);

  const currentActor = store.actors.find(a => a.id === store.selectedActorId) || store.actors[0];

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-4">
      {/* Top Bar Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-sans">
              3D THREAT ACTOR IDENTITY GRAPH
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              CROSS-MARKETPLACE CORRELATION
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Traverse cryptographic fingerprints, Wasabi wallet clusters, onion infrastructure, and forum aliases
          </p>
        </div>

        {/* Actor Selector & 2D/3D Mode Toggle */}
        <div className="flex items-center space-x-3 font-mono text-xs">
          <div className="flex items-center space-x-2 bg-dark-800 border border-dark-600 rounded-lg px-3 py-1.5">
            <span className="text-slate-400">ACTOR:</span>
            <select
              value={store.selectedActorId}
              onChange={(e) => store.setSelectedActorId(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              {store.actors.slice(0, 10).map(a => (
                <option key={a.id} value={a.id} className="bg-dark-900 text-white">
                  {a.name} ({a.attributionConfidence}%)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-dark-800 p-1 rounded-lg border border-dark-600">
            <button
              onClick={() => store.setGraphMode('3D')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                store.graphMode === '3D'
                  ? 'bg-cyan text-dark-950 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D MODE
            </button>
            <button
              onClick={() => store.setGraphMode('2D')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                store.graphMode === '2D'
                  ? 'bg-cyan text-dark-950 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2D MODE
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas + Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* GRAPH CANVAS (9 Cols) */}
        <div className="lg:col-span-9 h-[680px] rounded-xl overflow-hidden border border-dark-600 shadow-glass relative">
          {store.graphMode === '3D' ? (
            <IdentityGraph3D
              onSelectEdge={(edge) => setSelectedRel(edge)}
            />
          ) : (
            <IdentityGraph2D
              onSelectEdge={(edge) => setSelectedRel(edge)}
            />
          )}
        </div>

        {/* RIGHT INSPECTOR PANEL (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col space-y-4 font-mono">
          {/* Active Entity Inspector */}
          <div className="glass-panel p-4 rounded-xl border border-dark-600 space-y-3.5">
            <div className="flex items-center justify-between border-b border-dark-600 pb-2.5">
              <span className="text-[10px] text-cyan font-bold uppercase tracking-wider">
                SELECTED ENTITY
              </span>
              <span className="text-[10px] text-slate-500">INSPECTOR</span>
            </div>

            {store.selectedEntity ? (
              <div className="space-y-3">
                <div>
                  <h3 className="text-white font-sans font-bold text-base">
                    {store.selectedEntity.label}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-dark-750 text-cyan border border-dark-600 uppercase font-semibold">
                    {store.selectedEntity.type}
                  </span>
                </div>

                <div className="bg-dark-850 p-3 rounded-lg border border-dark-700 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Target Node:</span>
                    <strong className="text-white">{currentActor.name}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Correlation:</span>
                    <strong className="text-cyan">{currentActor.attributionConfidence}%</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Status:</span>
                    <strong className="text-emerald-400">{currentActor.status}</strong>
                  </div>
                </div>

                <button
                  onClick={() => store.addEntityToActiveInvestigation(store.selectedEntity!.id, store.selectedEntity!.type)}
                  className="w-full py-2 px-3 rounded-lg bg-cyan text-dark-950 font-bold hover:bg-cyan/90 transition-colors flex items-center justify-center space-x-1.5 text-xs shadow-glow-cyan"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>ADD TO ACTIVE CASE</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs font-sans">
                Click any node in the graph to inspect forensic attributes.
              </div>
            )}
          </div>

          {/* Connected Graph Topology Breakdown */}
          <div className="glass-panel p-4 rounded-xl border border-dark-600 space-y-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block border-b border-dark-600 pb-2">
              TOPOLOGY METRICS
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Connected Nodes:</span>
                <span className="text-white font-bold">11 Entities</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Resolved Edges:</span>
                <span className="text-white font-bold">9 Relationships</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Max Confidence:</span>
                <span className="text-cyan font-bold">95% (PGP Match)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Clustering Coefficient:</span>
                <span className="text-purple-400 font-bold">0.842</span>
              </div>
            </div>
          </div>

          {/* Quick Help Tip */}
          <div className="p-3 rounded-xl bg-dark-850 border border-dark-700 text-slate-400 text-[11px] font-sans leading-relaxed">
            <strong className="text-cyan font-mono block mb-1">INTERACTION GUIDANCE:</strong>
            Drag left mouse to rotate 3D graph. Scroll to zoom. Click nodes to focus and camera fly-to. Click edges to view underlying relationship evidence.
          </div>
        </div>
      </div>

      {/* Relationship Evidence Modal (Prompt Section 16) */}
      {selectedRel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm select-none">
          <div className="w-full max-w-lg bg-dark-800 border border-cyan/50 rounded-xl shadow-2xl p-5 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-dark-600 pb-3">
              <div>
                <span className="text-[10px] text-cyan uppercase font-bold tracking-wider">
                  RELATIONSHIP ANALYSIS
                </span>
                <h3 className="text-base font-sans font-bold text-white mt-0.5">
                  {selectedRel.relationshipType}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRel(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-dark-850 p-3 rounded-lg border border-dark-700">
              <div>
                <span className="text-slate-500 text-[10px]">SOURCE ENTITY:</span>
                <div className="text-white font-bold">{selectedRel.sourceLabel}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">TARGET ENTITY:</span>
                <div className="text-white font-bold">{selectedRel.targetLabel}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">CONFIDENCE:</span>
                <div className="text-cyan font-bold text-sm">{selectedRel.confidence}%</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">CORROBORATION:</span>
                <div className="text-white font-bold">{selectedRel.sourceCount} Sources</div>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold text-[11px] block mb-1">EVIDENCE DESCRIPTION:</span>
              <p className="text-slate-300 font-sans text-xs leading-relaxed bg-dark-900 p-3 rounded border border-dark-700">
                {selectedRel.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-dark-600">
              <span className="text-slate-500 text-[10px]">
                Observed: {selectedRel.firstObserved} → {selectedRel.lastObserved}
              </span>
              <button
                onClick={() => {
                  store.addEntityToActiveInvestigation(selectedRel.id, selectedRel.relationshipType);
                  setSelectedRel(null);
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
