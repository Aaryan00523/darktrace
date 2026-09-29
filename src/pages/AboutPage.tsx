import React from 'react';
import { Shield, Lock, BrainCircuit, Network, Server, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const pipelineSteps = [
    { name: 'COLLECT', desc: 'Passive crawler daemons and keyserver monitors ingest synthetic indicators without active port scanning or illicit marketplace transactions.' },
    { name: 'NORMALIZE', desc: 'Raw artifacts are mapped into standardized STIX 2.1 schemas, cryptographic subkeys are parsed, and UTXO hops are deduplicated.' },
    { name: 'CORRELATE', desc: 'Multi-layer graph traversal matches PGP master fingerprints, Wasabi mixer endpoints, and reverse proxy HTTP response headers.' },
    { name: 'ANALYZE', desc: 'NLP stylometric vector engines measure lexical diversity, idiosyncratic punctuation, and UTC activity time envelopes across forums.' },
    { name: 'ATTRIBUTE', desc: 'Explainable Multi-Factor Confidence Engine weights 5 forensic dimensions to calculate probabilistic attribution confidence.' },
    { name: 'INVESTIGATE', desc: 'Analysts explore interconnected 3D entity graphs, examine evidence cards, append observations, and correlate infrastructure.' },
    { name: 'REPORT', desc: 'Automated compiler generates court-ready PDF dossiers, structured STIX JSON bundles, and CSV indicators for law enforcement and SOC teams.' }
  ];

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-dark-600/70 pb-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            METHODOLOGY & RESEARCH FRAMEWORK
          </h1>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
            DE-ANONYMIZATION METHODOLOGY
          </span>
        </div>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Architectural principles, mathematical confidence modeling, and ethical safeguards
        </p>
      </div>

      {/* Lawful Research Safeguards Banner */}
      <div className="glass-panel p-6 rounded-xl border border-cyan/40 space-y-3 shadow-glass font-mono text-xs">
        <div className="flex items-center space-x-2 text-cyan font-bold">
          <Lock className="w-4 h-4 text-cyan" />
          <span>ETHICAL & LEGAL SAFEGUARDS NOTICE</span>
        </div>
        <p className="text-slate-300 font-sans text-xs leading-relaxed">
          DARKTRACE is an intelligence-analysis prototype designed exclusively for lawful cybersecurity research and threat intelligence investigation. The demonstration dataset is 100% synthetic and does not represent real persons, active cybercriminal cartels, or real-world illicit services. The platform strictly prohibits unauthorized intrusion, hidden service exploitation, credential harvesting, or facilitating illicit transactions.
        </p>
      </div>

      {/* 7-Step Pipeline Diagram */}
      <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-6 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-dark-600 pb-3">
          <h3 className="font-bold text-white font-sans text-base">
            END-TO-END INTELLIGENCE LIFECYCLE
          </h3>
          <span className="text-cyan font-bold text-xs">
            COLLECT → NORMALIZE → CORRELATE → ANALYZE → ATTRIBUTE → INVESTIGATE → REPORT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {pipelineSteps.map((step, i) => (
            <div key={step.name} className="p-4 rounded-xl bg-dark-850 border border-dark-700 space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-cyan font-bold">0{i + 1}</span>
                <span className="text-slate-500 uppercase">STAGE</span>
              </div>
              <h4 className="text-white font-sans font-bold text-xs">{step.name}</h4>
              <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence Engine Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-3">
          <h3 className="font-bold text-white font-sans text-base flex items-center space-x-2 text-cyan">
            <BrainCircuit className="w-4 h-4 text-cyan" />
            <span>EXPLAINABLE ATTRIBUTION CONFIDENCE</span>
          </h3>
          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            Rather than relying on opaque black-box machine learning predictions, DARKTRACE calculates an explainable confidence score across five weighted dimensions:
          </p>
          <ul className="space-y-2 text-slate-300 font-sans text-xs pt-2">
            <li>• <strong className="text-purple-400">Cryptographic PGP Fingerprints (30%):</strong> Verifiable mathematical proof of identical subkeys.</li>
            <li>• <strong className="text-red-400">Infrastructure & Banner Fingerprints (25%):</strong> Shared TLS certificate SHA256 hashes and reverse proxy headers.</li>
            <li>• <strong className="text-amber-400">Blockchain UTXO Clustering (20%):</strong> Common Input Ownership Heuristic (CIOH) linking addresses.</li>
            <li>• <strong className="text-cyan">NLP Stylometric Vectors (15%):</strong> Cosine similarity on sentence lengths and rare vocabulary.</li>
            <li>• <strong className="text-emerald-400">Activity Cadence & Timing (10%):</strong> Overlapping UTC activity envelopes.</li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-3">
          <h3 className="font-bold text-white font-sans text-base flex items-center space-x-2 text-purple-400">
            <Network className="w-4 h-4 text-purple-400" />
            <span>CROSS-MARKETPLACE IDENTITY RESOLUTION</span>
          </h3>
          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            Dark web threat actors routinely practice compartmentalization, adopting different handles across forums (e.g. Dread), escrow markets (e.g. SilkCore), and messaging relays. DARKTRACE resolves these fragmented digital footprints into a unified identity graph by detecting involuntary operational security (OPSEC) failures such as subkey reuse and backend server misconfigurations.
          </p>
        </div>
      </div>
    </div>
  );
};
