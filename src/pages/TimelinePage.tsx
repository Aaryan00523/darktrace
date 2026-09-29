import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import { Timeline3D } from '../components/3d/Timeline3D';
import {
  Clock
} from 'lucide-react';
import { TimelineEvent } from '../types';

export const TimelinePage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterYear, setFilterYear] = useState<string>('ALL');

  const filteredEvents = store.timelineEvents.filter(ev => {
    const matchesType = filterType === 'ALL' || ev.eventType === filterType;
    const matchesYear = filterYear === 'ALL' || ev.date.startsWith(filterYear);
    return matchesType && matchesYear;
  });

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              3D ATTRIBUTION TIMELINE
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              {store.timelineEvents.length} RECORDED MILESTONES
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Chronological reconstruction of synthetic actor discovery, identity pivots, and infrastructure migrations
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <div className="bg-dark-800 px-3 py-1.5 rounded-lg border border-dark-600 text-slate-300">
            RANGE: <span className="text-cyan font-bold">2024 — 2026</span>
          </div>
        </div>
      </div>

      {/* 3D Timeline Canvas (Prompt Section 21) */}
      <div className="w-full h-[520px] rounded-xl overflow-hidden border border-dark-600 shadow-glass">
        <Timeline3D onSelectEvent={(ev) => setSelectedEvent(ev)} />
      </div>

      {/* Chronological Event Feed & Filters */}
      <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-600 pb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyan" />
            <h3 className="text-base font-sans font-bold text-white">
              EVENT LOG ENTRIES ({filteredEvents.length})
            </h3>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded px-2.5 py-1.5 text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Years</option>
              <option value="2026">2026 (Recent)</option>
              <option value="2025">2025</option>
              <option value="2024">2024 (Origin)</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded px-2.5 py-1.5 text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Event Types</option>
              <option value="DISCOVERY">Discovery</option>
              <option value="PGP_CORRELATION">PGP Correlation</option>
              <option value="WALLET_TRANSFER">Wallet Transfer</option>
              <option value="INFRASTRUCTURE_REUSE">Infrastructure Reuse</option>
              <option value="PERSONA_ACTIVITY">Persona Activity</option>
              <option value="MARKET_MIGRATION">Marketplace Migration</option>
              <option value="ATTRIBUTION_UPDATE">Attribution Update</option>
            </select>
          </div>
        </div>

        {/* Milestone Cards List */}
        <div className="space-y-3">
          {filteredEvents.slice(0, 15).map(ev => (
            <div
              key={ev.id}
              onClick={() => setSelectedEvent(ev)}
              className="p-3.5 rounded-lg bg-dark-850 border border-dark-700 hover:border-cyan/40 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[10px]">
                  <span className="text-cyan font-bold">{ev.date}</span>
                  <span className="text-slate-600">•</span>
                  <span className="px-1.5 py-0.2 rounded bg-dark-750 text-slate-300 uppercase">
                    {ev.eventType.replace(/_/g, ' ')}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">Actor: <strong className="text-white">{ev.actorName}</strong></span>
                </div>
                <h4 className="text-white font-sans font-bold text-xs">{ev.title}</h4>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed max-w-3xl">
                  {ev.description}
                </p>
              </div>

              <div className="flex items-center space-x-3 flex-shrink-0">
                <span className="text-cyan font-bold text-xs">{ev.confidence}% CONF</span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                    ev.significance === 'CRITICAL'
                      ? 'bg-red-500/20 text-red-400'
                      : ev.significance === 'MAJOR'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-dark-700 text-slate-300'
                  }`}
                >
                  {ev.significance}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm select-none font-mono">
          <div className="w-full max-w-lg bg-dark-800 border border-cyan/50 rounded-xl shadow-2xl p-5 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-dark-600 pb-2">
              <div>
                <span className="text-cyan font-bold text-[10px] block">{selectedEvent.date} • {selectedEvent.eventType}</span>
                <h3 className="text-base font-sans font-bold text-white mt-0.5">{selectedEvent.title}</h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-dark-850 p-3 rounded-lg border border-dark-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">ATTRIBUTED ACTOR:</span>
                <span className="text-white font-bold">{selectedEvent.actorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CONFIDENCE:</span>
                <span className="text-cyan font-bold">{selectedEvent.confidence}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SIGNIFICANCE:</span>
                <span className="text-emerald-400 font-bold uppercase">{selectedEvent.significance}</span>
              </div>
            </div>

            <p className="text-slate-300 font-sans text-xs leading-relaxed bg-dark-900 p-3 rounded border border-dark-700">
              {selectedEvent.description}
            </p>

            <div className="flex justify-end pt-2 border-t border-dark-600">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-1.5 rounded bg-cyan text-dark-950 font-bold hover:bg-cyan/90 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
