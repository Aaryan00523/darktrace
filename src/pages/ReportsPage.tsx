import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import {
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Printer,
  FileCheck,
  Share2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { exportInvestigationPDF, exportInvestigationJSON, exportInvestigationCSV } from '../utils/exportUtils';

export const ReportsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();
  const currentInv = store.investigations.find(i => i.id === store.activeInvestigationId) || store.investigations[0];
  const leadActor = store.actors.find(a => a.id === currentInv.leadActorId) || store.actors[0];

  const invIdentifiers = store.identifiers.filter(i => i.associatedActorId === leadActor.id);
  const invInfra = store.infrastructure.filter(inf => inf.associatedActorId === leadActor.id);
  const invEvidence = store.evidenceList.filter(e => currentInv.evidenceIds.includes(e.id) || e.relatedEntities.some(re => re.id === leadActor.id));
  const invPersonas = store.personas.filter(p => p.actorId === leadActor.id);

  const [classification, setClassification] = useState('CONFIDENTIAL // LAWFUL RESEARCH PROTOTYPE');
  const [includeForensics, setIncludeForensics] = useState(true);
  const [includeStylometry, setIncludeStylometry] = useState(true);
  const [includeAnalystNotes, setIncludeAnalystNotes] = useState(true);

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              INVESTIGATION REPORT CENTER
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              COURT-READY DOSSIER ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Generate verifiable PDF, structured STIX JSON, and CSV evidentiary exports
          </p>
        </div>

        {/* Global Export Buttons */}
        <div className="flex items-center space-x-2.5 font-mono text-xs">
          <button
            onClick={() => exportInvestigationCSV(currentInv, leadActor, invIdentifiers, invInfra, invEvidence)}
            className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-600 text-slate-200 font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </button>
          <button
            onClick={() => exportInvestigationJSON(currentInv, leadActor, invIdentifiers, invInfra, invEvidence, store.relationships, invPersonas)}
            className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500 text-purple-300 font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT JSON</span>
          </button>
          <button
            onClick={() => exportInvestigationPDF(currentInv, leadActor, invIdentifiers, invInfra, invEvidence, store.relationships, invPersonas)}
            className="px-4 py-1.5 rounded-lg bg-cyan text-dark-950 font-bold flex items-center space-x-1.5 hover:bg-cyan/90 transition-colors shadow-glow-cyan"
          >
            <Download className="w-3.5 h-3.5" />
            <span>GENERATE PDF REPORT</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Configuration & Live Report Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Config Card (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-4 font-mono text-xs">
          <div className="glass-panel p-5 rounded-xl border border-dark-600 space-y-4">
            <h3 className="font-bold text-white font-sans text-sm flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-cyan" />
              <span>REPORT PARAMETERS</span>
            </h3>

            <div>
              <label className="text-slate-400 text-[10px] block mb-1">SELECT ACTIVE OPERATION</label>
              <select
                value={store.activeInvestigationId}
                onChange={(e) => store.setActiveInvestigationId(e.target.value)}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg p-2 text-white text-xs focus:outline-none"
              >
                {store.investigations.map(inv => (
                  <option key={inv.id} value={inv.id}>
                    {inv.codename} — {inv.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-[10px] block mb-1">CLASSIFICATION MARKING</label>
              <input
                type="text"
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg p-2 text-white text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-2 border-t border-dark-600 pt-3">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                SECTIONS TO INCLUDE
              </span>
              <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeForensics}
                  onChange={(e) => setIncludeForensics(e.target.checked)}
                  className="rounded bg-dark-900 border-dark-600 text-cyan focus:ring-0"
                />
                <span>Forensic Evidence Items ({invEvidence.length})</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeStylometry}
                  onChange={(e) => setIncludeStylometry(e.target.checked)}
                  className="rounded bg-dark-900 border-dark-600 text-cyan focus:ring-0"
                />
                <span>Stylometric NLP Cosine Scores</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeAnalystNotes}
                  onChange={(e) => setIncludeAnalystNotes(e.target.checked)}
                  className="rounded bg-dark-900 border-dark-600 text-cyan focus:ring-0"
                />
                <span>Analyst Case Notes ({currentInv.analystNotes.length})</span>
              </label>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-850 border border-dark-700 text-slate-400 text-xs font-sans leading-relaxed">
            <strong className="text-cyan font-mono block mb-1">AUDIT VERIFICATION:</strong>
            Reports generated through this portal embed SHA256 integrity checksums, source attribution metrics, and explicit confidence boundaries.
          </div>
        </div>

        {/* Right Live Document Preview (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-8 rounded-xl border border-dark-600 space-y-6 bg-slate-900/60 font-sans shadow-2xl">
          {/* Document Header */}
          <div className="border-b-2 border-cyan/40 pb-4">
            <div className="flex items-center justify-between text-xs font-mono text-cyan font-bold mb-1">
              <span>DARKTRACE THREAT ATTRIBUTION DOSSIER</span>
              <span>CONFIDENCE: {currentInv.overallConfidence}%</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {currentInv.codename}: {currentInv.title}
            </h2>
            <div className="text-xs text-slate-400 font-mono mt-1">
              Lead Target: {leadActor.name} ({leadActor.primaryHandle}) • Generated: {new Date().toUTCString()}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">
              1. EXECUTIVE SUMMARY
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed bg-dark-850 p-4 rounded-lg border border-dark-700 font-sans">
              {currentInv.summary}
            </p>
          </div>

          {/* Target Profile */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">
              2. PRIMARY TARGET ATTRIBUTION: {leadActor.name}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-dark-850 p-3.5 rounded-lg border border-dark-700">
              <div>Handle: <span className="text-white font-bold">{leadActor.primaryHandle}</span></div>
              <div>Aliases: <span className="text-white font-bold">{leadActor.aliases.join(', ')}</span></div>
              <div>First Observed: <span className="text-slate-300">{leadActor.firstObserved}</span></div>
              <div>Last Observed: <span className="text-slate-300">{leadActor.lastObserved}</span></div>
            </div>
          </div>

          {/* Explainable Confidence Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">
              3. EXPLAINABLE ATTRIBUTION CONFIDENCE MODEL
            </h4>
            <div className="space-y-1.5 text-xs font-mono bg-dark-850 p-3.5 rounded-lg border border-dark-700 text-slate-300">
              <div>• PGP Key Fingerprint Overlap: <strong className="text-purple-400">{leadActor.confidenceBreakdown.pgpScore}%</strong> (Weight 30%)</div>
              <div>• Infrastructure & Reverse Proxy Overlap: <strong className="text-red-400">{leadActor.confidenceBreakdown.infraScore}%</strong> (Weight 25%)</div>
              <div>• Wasabi UTXO Wallet Clustering (CIOH): <strong className="text-amber-400">{leadActor.confidenceBreakdown.walletScore}%</strong> (Weight 20%)</div>
              <div>• Cross-Platform Stylometry Match: <strong className="text-cyan">{leadActor.confidenceBreakdown.styleScore}%</strong> (Weight 15%)</div>
              <div>• Behavioral Timing Envelope: <strong className="text-emerald-400">{leadActor.confidenceBreakdown.behaviourScore}%</strong> (Weight 10%)</div>
              <div className="pt-2 border-t border-dark-700 font-bold text-white text-sm">
                NET ATTRIBUTION CONFIDENCE: <span className="text-cyan">{currentInv.overallConfidence}%</span>
              </div>
            </div>
          </div>

          {/* Evidence Table */}
          {includeForensics && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">
                4. FORENSIC EVIDENCE ARTIFACTS
              </h4>
              <div className="space-y-2 font-mono text-xs">
                {invEvidence.map(ev => (
                  <div key={ev.id} className="p-3 bg-dark-850 rounded border border-dark-700">
                    <div className="flex justify-between font-bold text-white">
                      <span>[{ev.id}] {ev.title}</span>
                      <span className="text-cyan">{ev.confidence}% CONF</span>
                    </div>
                    <p className="text-slate-400 text-[11px] font-sans mt-1">{ev.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analyst Notes */}
          {includeAnalystNotes && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">
                5. ANALYST SIGN-OFF & CASE NOTES
              </h4>
              <div className="space-y-2 font-mono text-xs">
                {currentInv.analystNotes.map(n => (
                  <div key={n.id} className="p-3 bg-dark-850 rounded border border-dark-700">
                    <div className="text-[10px] text-slate-500 mb-1">{n.author} • {n.timestamp}</div>
                    <p className="text-slate-200 font-sans text-xs">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
