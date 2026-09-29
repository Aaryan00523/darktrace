import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import { IdentityGraph3D } from '../components/3d/IdentityGraph3D';
import {
  FolderGit2,
  FolderPlus,
  Shield,
  FileText,
  Clock,
  Server,
  BrainCircuit,
  MessageSquare,
  Download,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Send,
  ExternalLink
} from 'lucide-react';
import { exportInvestigationPDF, exportInvestigationJSON, exportInvestigationCSV } from '../utils/exportUtils';
import { Investigation } from '../types';

export const InvestigationsPage: React.FC<{
  investigationId?: string;
  onNavigate: (path: string) => void;
}> = ({ investigationId, onNavigate }) => {
  const store = useDarktraceStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'graph' | 'evidence' | 'timeline' | 'infrastructure' | 'persona' | 'notes' | 'report'>('overview');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  // Form State for New Investigation
  const [newCodename, setNewCodename] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<Investigation['priority']>('HIGH');
  const [newSummary, setNewSummary] = useState('');

  const currentInv = store.investigations.find(i => i.id === (investigationId || store.activeInvestigationId)) || store.investigations[0];
  const leadActor = store.actors.find(a => a.id === currentInv.leadActorId) || store.actors[0];
  const invIdentifiers = store.identifiers.filter(i => i.associatedActorId === leadActor.id);
  const invInfra = store.infrastructure.filter(inf => inf.associatedActorId === leadActor.id);
  const invEvidence = store.evidenceList.filter(e => currentInv.evidenceIds.includes(e.id) || e.relatedEntities.some(re => re.id === leadActor.id));
  const invPersonas = store.personas.filter(p => p.actorId === leadActor.id);

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCodename.trim() || !newTitle.trim()) return;

    const newId = store.createInvestigation({
      codename: newCodename,
      title: newTitle,
      priority: newPriority,
      summary: newSummary || 'Case file created for cyber threat de-anonymization.',
      leadActorId: store.selectedActorId,
      status: 'ACTIVE'
    });

    setIsCreateModalOpen(false);
    setNewCodename('');
    setNewTitle('');
    setNewSummary('');
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    store.addAnalystNote(currentInv.id, newNoteText.trim());
    setNewNoteText('');
  };

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              INVESTIGATION WORKSPACE
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              {currentInv.codename}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Collaborative case dossiers, multi-disciplinary evidence binders, and intelligence export
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-cyan text-dark-950 font-bold flex items-center space-x-1.5 hover:bg-cyan/90 transition-colors shadow-glow-cyan"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>CREATE INVESTIGATION</span>
          </button>
        </div>
      </div>

      {/* Case Selector Strip */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
        {store.investigations.map(inv => {
          const isSelected = inv.id === currentInv.id;
          return (
            <button
              key={inv.id}
              onClick={() => store.setActiveInvestigationId(inv.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-cyan/15 border-cyan text-white shadow-glow-cyan'
                  : 'bg-dark-800 border-dark-600 text-slate-400 hover:text-slate-200'
              }`}
            >
              <FolderGit2 className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan' : 'text-slate-500'}`} />
              <span className="font-bold">{inv.codename}</span>
              <span className="text-[10px] text-cyan">({inv.overallConfidence}%)</span>
            </button>
          );
        })}
      </div>

      {/* Case Header Meta Card */}
      <div className="glass-panel p-5 rounded-xl border border-dark-600 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-600 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold font-sans text-white">{currentInv.title}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                  currentInv.priority === 'CRITICAL'
                    ? 'bg-red-500/20 text-red-400 border border-red-500'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500'
                }`}
              >
                {currentInv.priority} PRIORITY
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500 font-bold uppercase">
                {currentInv.status}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">
              Lead Target: <strong className="text-white">{leadActor.name}</strong> • Created: {currentInv.createdDate} • Updated: {currentInv.updatedDate}
            </div>
          </div>

          {/* Quick Report Download Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportInvestigationPDF(currentInv, leadActor, invIdentifiers, invInfra, invEvidence, store.relationships, invPersonas)}
              className="px-3 py-1.5 rounded-lg bg-cyan/15 hover:bg-cyan/25 border border-cyan text-cyan text-xs font-bold flex items-center space-x-1.5 transition-colors"
              title="Download Court-Ready PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF DOSSIER</span>
            </button>
            <button
              onClick={() => exportInvestigationJSON(currentInv, leadActor, invIdentifiers, invInfra, invEvidence, store.relationships, invPersonas)}
              className="px-2.5 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-600 text-slate-300 text-xs font-bold transition-colors"
              title="Download Structured JSON"
            >
              JSON
            </button>
            <button
              onClick={() => exportInvestigationCSV(currentInv, leadActor, invIdentifiers, invInfra, invEvidence)}
              className="px-2.5 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-600 text-slate-300 text-xs font-bold transition-colors"
              title="Download CSV Indicators"
            >
              CSV
            </button>
          </div>
        </div>

        {/* Case Dossier Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-dark-850 p-2.5 rounded-lg border border-dark-700">
            <span className="text-slate-500 text-[10px] block">CORRELATED ENTITIES</span>
            <span className="text-white font-bold text-sm">{currentInv.entitiesCount}</span>
          </div>
          <div className="bg-dark-850 p-2.5 rounded-lg border border-dark-700">
            <span className="text-slate-500 text-[10px] block">FORENSIC INDICATORS</span>
            <span className="text-white font-bold text-sm">{currentInv.indicatorsCount}</span>
          </div>
          <div className="bg-dark-850 p-2.5 rounded-lg border border-dark-700">
            <span className="text-slate-500 text-[10px] block">RESOLVED EDGES</span>
            <span className="text-white font-bold text-sm">{currentInv.relationshipsCount}</span>
          </div>
          <div className="bg-dark-850 p-2.5 rounded-lg border border-dark-700">
            <span className="text-slate-500 text-[10px] block">ATTRIBUTION CONFIDENCE</span>
            <span className="text-cyan font-bold text-sm">{currentInv.overallConfidence}%</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Prompt Section 24) */}
      <div className="flex border-b border-dark-600 space-x-1 font-mono text-xs overflow-x-auto">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'graph', label: '3D Graph' },
          { key: 'evidence', label: `Evidence (${invEvidence.length})` },
          { key: 'timeline', label: 'Timeline' },
          { key: 'infrastructure', label: `Infrastructure (${invInfra.length})` },
          { key: 'persona', label: 'Persona AI' },
          { key: 'notes', label: `Analyst Notes (${currentInv.analystNotes.length})` },
          { key: 'report', label: 'Report Generation' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 border-b-2 font-bold whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'border-cyan text-cyan bg-cyan/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4">
            <h3 className="text-base font-bold text-white font-sans">EXECUTIVE DOSSIER SUMMARY</h3>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              {currentInv.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="glass-panel p-5 rounded-xl border border-dark-600 space-y-3">
              <span className="font-bold text-cyan text-sm block border-b border-dark-600 pb-2">
                TARGET IDENTIFIERS
              </span>
              <div className="space-y-2">
                {invIdentifiers.map(i => (
                  <div key={i.id} className="p-2.5 rounded bg-dark-850 border border-dark-700 flex justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">{i.type}</span>
                      <span className="text-white font-bold">{i.value}</span>
                    </div>
                    <span className="text-cyan font-bold self-center">{i.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-dark-600 space-y-3">
              <span className="font-bold text-red-400 text-sm block border-b border-dark-600 pb-2">
                CRITICAL INFRASTRUCTURE REUSE
              </span>
              <div className="space-y-2">
                {invInfra.slice(0, 4).map(inf => (
                  <div key={inf.id} className="p-2.5 rounded bg-dark-850 border border-dark-700 flex justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">{inf.type}</span>
                      <span className="text-white font-bold truncate max-w-xs">{inf.indicator}</span>
                    </div>
                    <span className="text-emerald-400 text-[10px] font-bold self-center">{inf.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'graph' && (
        <div className="w-full h-[600px] rounded-xl overflow-hidden border border-dark-600 shadow-glass">
          <IdentityGraph3D />
        </div>
      )}

      {activeTab === 'evidence' && (
        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
          <h3 className="text-base font-bold text-white font-sans">
            CHAIN OF CUSTODY & EVIDENCE VAULT ({invEvidence.length})
          </h3>
          <div className="space-y-3">
            {invEvidence.map(ev => (
              <div key={ev.id} className="p-4 rounded-xl bg-dark-850 border border-dark-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white text-sm">{ev.id}: {ev.title}</span>
                  <span className="text-cyan font-bold">{ev.confidence}% CONF</span>
                </div>
                <p className="text-slate-300 font-sans text-xs">{ev.summary}</p>
                <div className="text-[10px] text-slate-500 flex justify-between border-t border-dark-700 pt-2">
                  <span>Source: {ev.sourceName} (Grade {ev.sourceReliability})</span>
                  <span>Observed: {ev.observedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
          <h3 className="text-base font-bold text-white font-sans">CASE TIMELINE EVENTS</h3>
          <div className="space-y-3">
            {store.timelineEvents.slice(0, 10).map(ev => (
              <div key={ev.id} className="p-3.5 rounded-lg bg-dark-850 border border-dark-700 flex justify-between">
                <div>
                  <div className="text-[10px] text-cyan font-bold">{ev.date} — {ev.eventType}</div>
                  <h4 className="text-white font-sans font-bold text-xs mt-0.5">{ev.title}</h4>
                  <p className="text-slate-400 font-sans text-[11px] mt-1">{ev.description}</p>
                </div>
                <span className="text-cyan font-bold text-xs self-center">{ev.confidence}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'infrastructure' && (
        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
          <h3 className="text-base font-bold text-white font-sans">ATTRIBUTED INFRASTRUCTURE MATRIX</h3>
          <div className="space-y-2">
            {invInfra.map(inf => (
              <div key={inf.id} className="p-3 rounded-lg bg-dark-850 border border-dark-700 flex justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">{inf.type}</span>
                  <span className="text-cyan font-bold">{inf.indicator}</span>
                  <div className="text-slate-400 text-[10px] font-sans mt-0.5">{inf.details}</div>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold block">{inf.status}</span>
                  <span className="text-slate-400 text-[10px]">{inf.confidence}% CONF</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'persona' && (
        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
          <h3 className="text-base font-bold text-white font-sans">PERSONA CORRELATION RECORDS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {invPersonas.map(p => (
              <div key={p.id} className="p-4 rounded-xl bg-dark-850 border border-dark-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-white font-sans">{p.handle}</span>
                  <span className="text-cyan font-bold text-xs">{p.metrics.overallCorrelation}% CORR</span>
                </div>
                <div className="text-xs text-purple-300">{p.platform}</div>
                <p className="text-slate-300 font-sans text-xs">{p.aiSummary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
          <h3 className="text-base font-bold text-white font-sans">ANALYST CASE NOTES & FINDINGS</h3>
          
          {/* Note Input */}
          <div className="flex items-center space-x-2 bg-dark-850 p-2.5 rounded-lg border border-dark-700">
            <input
              type="text"
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
              placeholder="Append analyst note to case dossier..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 text-xs focus:outline-none font-sans"
            />
            <button
              onClick={handleAddNote}
              className="px-3 py-1.5 rounded-lg bg-cyan text-dark-950 font-bold hover:bg-cyan/90 transition-colors flex items-center space-x-1"
            >
              <Send className="w-3 h-3" />
              <span>APPEND NOTE</span>
            </button>
          </div>

          {/* Notes Log */}
          <div className="space-y-3">
            {currentInv.analystNotes.map(n => (
              <div key={n.id} className="p-3.5 rounded-lg bg-dark-850 border border-dark-700 space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span className="text-cyan font-bold">{n.author}</span>
                  <span>{n.timestamp}</span>
                </div>
                <p className="text-slate-200 font-sans text-xs leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'report' && (
        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
          <h3 className="text-base font-bold text-white font-sans">CASE DOSSIER EXPORT CENTER</h3>
          <p className="text-slate-300 font-sans text-xs">
            Generate verifiable intelligence packages with full cryptographic hashes, evidence attachments, and explainable confidence matrices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-dark-850 border border-dark-700 space-y-3">
              <span className="font-bold text-cyan text-sm block">PDF REPORT</span>
              <p className="text-slate-400 font-sans text-xs">Formatted court-ready executive brief with confidential watermarks.</p>
              <button
                onClick={() => exportInvestigationPDF(currentInv, leadActor, invIdentifiers, invInfra, invEvidence, store.relationships, invPersonas)}
                className="w-full py-2 rounded-lg bg-cyan text-dark-950 font-bold hover:bg-cyan/90 text-xs shadow-glow-cyan"
              >
                DOWNLOAD PDF
              </button>
            </div>

            <div className="p-4 rounded-xl bg-dark-850 border border-dark-700 space-y-3">
              <span className="font-bold text-purple-400 text-sm block">JSON EXPORT</span>
              <p className="text-slate-400 font-sans text-xs">STIX 2.1 compliant machine-readable intelligence schema.</p>
              <button
                onClick={() => exportInvestigationJSON(currentInv, leadActor, invIdentifiers, invInfra, invEvidence, store.relationships, invPersonas)}
                className="w-full py-2 rounded-lg bg-purple-500 text-white font-bold hover:bg-purple-600 text-xs shadow-glow-purple"
              >
                DOWNLOAD JSON
              </button>
            </div>

            <div className="p-4 rounded-xl bg-dark-850 border border-dark-700 space-y-3">
              <span className="font-bold text-amber-400 text-sm block">CSV DATASET</span>
              <p className="text-slate-400 font-sans text-xs">Spreadsheet containing all correlated indicators, IPs, and PGP fingerprints.</p>
              <button
                onClick={() => exportInvestigationCSV(currentInv, leadActor, invIdentifiers, invInfra, invEvidence)}
                className="w-full py-2 rounded-lg bg-amber-500 text-dark-950 font-bold hover:bg-amber-600 text-xs"
              >
                DOWNLOAD CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Investigation Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm select-none font-mono">
          <form
            onSubmit={handleCreateCase}
            className="w-full max-w-md bg-dark-800 border border-cyan/50 rounded-xl shadow-2xl p-5 space-y-4 text-xs"
          >
            <div className="flex justify-between items-center border-b border-dark-600 pb-2">
              <span className="text-sm font-bold text-white font-sans">INITIALIZE NEW INVESTIGATION</span>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-slate-400 text-[10px] block mb-1">CODENAME (E.G. OPERATION NEBULA)</label>
              <input
                type="text"
                required
                value={newCodename}
                onChange={(e) => setNewCodename(e.target.value)}
                placeholder="OPERATION ..."
                className="w-full bg-dark-900 border border-dark-600 focus:border-cyan text-white p-2 rounded text-xs focus:outline-none uppercase"
              />
            </div>

            <div>
              <label className="text-slate-400 text-[10px] block mb-1">OPERATION TITLE</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Brief descriptive title..."
                className="w-full bg-dark-900 border border-dark-600 focus:border-cyan text-white p-2 rounded text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 text-[10px] block mb-1">PRIORITY</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full bg-dark-900 border border-dark-600 text-white p-2 rounded text-xs focus:outline-none"
              >
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-[10px] block mb-1">EXECUTIVE SUMMARY</label>
              <textarea
                rows={3}
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                placeholder="Case scope, targeting objectives, and preliminary indicators..."
                className="w-full bg-dark-900 border border-dark-600 focus:border-cyan text-white p-2 rounded text-xs focus:outline-none font-sans"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-dark-600">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-3 py-1.5 rounded bg-dark-750 text-slate-300 hover:bg-dark-700"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-cyan text-dark-950 font-bold hover:bg-cyan/90 shadow-glow-cyan"
              >
                CREATE CASE
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
