import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import {
  Users,
  Shield,
  Search,
  Filter,
  ExternalLink,
  Key,
  Wallet,
  Server,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  FolderGit2
} from 'lucide-react';

export const ActorsPage: React.FC<{
  actorId?: string;
  onNavigate: (path: string) => void;
}> = ({ actorId, onNavigate }) => {
  const store = useDarktraceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Currently viewed actor
  const currentActor = store.actors.find(a => a.id === (actorId || store.selectedActorId)) || store.actors[0];

  // Associated Data
  const actorIdentifiers = store.identifiers.filter(i => i.associatedActorId === currentActor.id);
  const actorInfra = store.infrastructure.filter(inf => inf.associatedActorId === currentActor.id);
  const actorEvidence = store.evidenceList.filter(e => currentActor.evidenceIds.includes(e.id) || e.relatedEntities.some(re => re.id === currentActor.id));
  const actorPersonas = store.personas.filter(p => p.actorId === currentActor.id);

  // Filtered Actors List
  const filteredActors = store.actors.filter(actor => {
    const matchesSearch = actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      actor.primaryHandle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      actor.aliases.some(al => al.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRisk = riskFilter === 'ALL' || actor.riskLevel === riskFilter;
    const matchesCategory = categoryFilter === 'ALL' || actor.categories.includes(categoryFilter);
    return matchesSearch && matchesRisk && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              THREAT ACTOR PROFILES
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              {store.actors.length} ENTITIES TRACKED
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            De-anonymization dossiers, multi-source correlations, and explainable confidence metrics
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={() => onNavigate('/identity-graph')}
            className="px-3.5 py-1.5 rounded-lg bg-cyan/15 hover:bg-cyan/25 border border-cyan text-cyan font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            <span>VIEW IN 3D GRAPH</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Left Search/List + Right Detailed Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Actors Directory (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-3 font-mono">
          {/* Search & Filters */}
          <div className="glass-panel p-3 rounded-xl border border-dark-600 space-y-2.5">
            <div className="flex items-center bg-dark-800 border border-dark-600 px-3 py-1.5 rounded-lg">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter actors or aliases..."
                className="w-full bg-transparent text-white placeholder-slate-500 text-xs focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 text-[10px]">
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="bg-dark-800 border border-dark-600 rounded px-2 py-1 text-slate-300 focus:outline-none"
              >
                <option value="ALL">All Risk Levels</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-dark-800 border border-dark-600 rounded px-2 py-1 text-slate-300 focus:outline-none flex-1 truncate"
              >
                <option value="ALL">All Categories</option>
                <option value="Credential Trading">Credential Trading</option>
                <option value="Data Theft">Data Theft</option>
                <option value="Fraud">Fraud</option>
                <option value="Ransomware Access Broker">Ransomware Access</option>
                <option value="Bulletproof Hosting">Bulletproof Hosting</option>
              </select>
            </div>
          </div>

          {/* List of Actors */}
          <div className="glass-panel rounded-xl border border-dark-600 p-2 h-[680px] overflow-y-auto space-y-1.5">
            {filteredActors.map(actor => {
              const isSelected = actor.id === currentActor.id;

              return (
                <button
                  key={actor.id}
                  onClick={() => {
                    store.setSelectedActorId(actor.id);
                    onNavigate(`/actors/${actor.id}`);
                  }}
                  className={`w-full p-3 rounded-lg text-left transition-all border ${
                    isSelected
                      ? 'bg-cyan/15 border-cyan text-white shadow-glow-cyan'
                      : 'bg-dark-800/80 hover:bg-dark-750 border-dark-600/70 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white font-sans text-xs truncate">
                      {actor.name}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                        actor.riskLevel === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : actor.riskLevel === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}
                    >
                      {actor.riskLevel}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 mb-1.5 truncate">
                    Handle: <span className="text-cyan">{actor.primaryHandle}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-dark-700/60 pt-1.5">
                    <span>{actor.categories[0]}</span>
                    <span className="text-cyan font-bold">{actor.attributionConfidence}% CONF</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Actor Detailed Dossier (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* Header Card */}
          <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-600/80 pb-4">
              <div>
                <div className="flex items-center space-x-2.5">
                  <h2 className="text-3xl font-extrabold text-white font-sans tracking-tight">
                    {currentActor.name}
                  </h2>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded font-mono font-bold ${
                      currentActor.riskLevel === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-400 border border-red-500'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500'
                    }`}
                  >
                    RISK: {currentActor.riskLevel}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500 font-mono font-bold">
                    STATUS: {currentActor.status}
                  </span>
                </div>
                <div className="text-xs font-mono text-cyan mt-1">
                  Primary Market: {currentActor.primaryMarketplace}
                </div>
              </div>

              {/* Attribution Confidence Badge */}
              <div className="bg-dark-850 p-3.5 rounded-xl border border-cyan/40 text-right font-mono flex items-center space-x-3 shadow-glow-cyan">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                    ATTRIBUTION CONFIDENCE
                  </div>
                  <div className="text-3xl font-extrabold text-cyan font-sans leading-none mt-0.5">
                    {currentActor.attributionConfidence}%
                  </div>
                </div>
                <TrendingUp className="w-6 h-6 text-cyan" />
              </div>
            </div>

            {/* Description & Observation Window */}
            <p className="text-slate-300 text-xs font-sans leading-relaxed">
              {currentActor.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-2">
              <div className="bg-dark-800 p-2.5 rounded-lg border border-dark-700">
                <span className="text-slate-500 text-[10px] block">FIRST OBSERVED</span>
                <span className="text-white font-semibold">{currentActor.firstObserved}</span>
              </div>
              <div className="bg-dark-800 p-2.5 rounded-lg border border-dark-700">
                <span className="text-slate-500 text-[10px] block">LAST OBSERVED</span>
                <span className="text-white font-semibold">{currentActor.lastObserved}</span>
              </div>
              <div className="bg-dark-800 p-2.5 rounded-lg border border-dark-700">
                <span className="text-slate-500 text-[10px] block">KNOWN ALIASES</span>
                <span className="text-white font-semibold">{currentActor.aliases.length} Handles</span>
              </div>
              <div className="bg-dark-800 p-2.5 rounded-lg border border-dark-700">
                <span className="text-slate-500 text-[10px] block">EVIDENCE ITEMS</span>
                <span className="text-cyan font-semibold">{actorEvidence.length} Correlated</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px] pt-1">
              <span className="text-slate-500 self-center mr-1">CATEGORIES:</span>
              {currentActor.categories.map(cat => (
                <span key={cat} className="px-2 py-0.5 rounded bg-dark-800 border border-dark-600 text-slate-300">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Explainable Attribution Confidence Engine (Prompt Section 14) */}
          <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-dark-600 pb-3">
              <div className="flex items-center space-x-2">
                <BrainCircuit className="w-5 h-5 text-cyan animate-pulse" />
                <h3 className="text-base font-sans font-bold text-white">
                  EXPLAINABLE ATTRIBUTION CONFIDENCE ENGINE
                </h3>
              </div>
              <span className="text-cyan font-bold text-sm">
                OVERALL: {currentActor.attributionConfidence}%
              </span>
            </div>

            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              {currentActor.confidenceBreakdown.explanation}
            </p>

            {/* Weighted Factor Progress Bars */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">
                    PGP Key Fingerprint Match <span className="text-slate-500">(Weight: 30%)</span>
                  </span>
                  <span className="text-purple-400 font-bold">{currentActor.confidenceBreakdown.pgpScore}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${currentActor.confidenceBreakdown.pgpScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">
                    Infrastructure & TLS Overlap <span className="text-slate-500">(Weight: 25%)</span>
                  </span>
                  <span className="text-red-400 font-bold">{currentActor.confidenceBreakdown.infraScore}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all"
                    style={{ width: `${currentActor.confidenceBreakdown.infraScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">
                    Cryptocurrency Wallet UTXO Link <span className="text-slate-500">(Weight: 20%)</span>
                  </span>
                  <span className="text-amber-400 font-bold">{currentActor.confidenceBreakdown.walletScore}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${currentActor.confidenceBreakdown.walletScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">
                    NLP Stylometry Similarity <span className="text-slate-500">(Weight: 15%)</span>
                  </span>
                  <span className="text-cyan font-bold">{currentActor.confidenceBreakdown.styleScore}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan rounded-full transition-all"
                    style={{ width: `${currentActor.confidenceBreakdown.styleScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">
                    Behavior & Activity Timing <span className="text-slate-500">(Weight: 10%)</span>
                  </span>
                  <span className="text-emerald-400 font-bold">{currentActor.confidenceBreakdown.behaviourScore}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${currentActor.confidenceBreakdown.behaviourScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mandatory Methodology Disclaimer (Prompt Section 14) */}
            <div className="p-3 rounded-lg bg-dark-850 border border-dark-700 text-slate-400 text-[11px] font-sans flex items-start space-x-2">
              <Lock className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
              <div>
                <strong>Attribution Methodology Disclaimer:</strong> Confidence represents the strength of observed correlations in the available dataset. It is not proof of identity.
              </div>
            </div>
          </div>

          {/* Identifiers & Forensic Artifacts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            {/* PGP Identifiers */}
            <div className="glass-panel p-4 rounded-xl border border-dark-600 space-y-3">
              <div className="flex items-center space-x-2 text-xs text-purple-400 font-bold">
                <Key className="w-4 h-4" />
                <span>CRYPTOGRAPHIC PGP KEYS</span>
              </div>
              <div className="space-y-2 text-[11px]">
                {currentActor.associatedPGP.map((pgp, i) => (
                  <div key={i} className="p-2.5 rounded bg-dark-850 border border-dark-700">
                    <div className="text-[10px] text-slate-500">RSA-4096 MASTER FINGERPRINT:</div>
                    <div className="text-white font-mono break-all font-semibold mt-0.5">{pgp}</div>
                    <div className="text-[9px] text-emerald-400 mt-1">Status: VERIFIED ON KEYSERVER</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wallets */}
            <div className="glass-panel p-4 rounded-xl border border-dark-600 space-y-3">
              <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold">
                <Wallet className="w-4 h-4" />
                <span>CRYPTOCURRENCY WALLETS</span>
              </div>
              <div className="space-y-2 text-[11px]">
                {currentActor.associatedWallets.map((wallet, i) => (
                  <div key={i} className="p-2.5 rounded bg-dark-850 border border-dark-700">
                    <div className="text-[10px] text-slate-500">
                      {wallet.startsWith('888') ? 'MONERO (XMR) MIX INGEST:' : 'BITCOIN (BTC) UTXO CLUSTER:'}
                    </div>
                    <div className="text-white font-mono break-all font-semibold mt-0.5">{wallet}</div>
                    <div className="text-[9px] text-cyan mt-1">Multi-input transaction link verified</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Evidence Cards (Prompt Section 13 & 27) */}
          <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-dark-600 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyan" />
                <h3 className="text-base font-sans font-bold text-white">
                  SUPPORTING FORENSIC EVIDENCE ({actorEvidence.length})
                </h3>
              </div>
              <span className="text-xs text-slate-400">Verifiable Audit Trail</span>
            </div>

            <div className="space-y-3">
              {actorEvidence.map(ev => (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl bg-dark-850 border border-dark-700 hover:border-cyan/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{ev.id}:</span>
                      <span className="text-white font-bold font-sans">{ev.title}</span>
                    </div>
                    <span className="text-cyan font-bold">{ev.confidence}% CONF</span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs mb-2.5 leading-relaxed">
                    {ev.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 border-t border-dark-700 pt-2">
                    <div>
                      Source: <strong className="text-white">{ev.sourceName}</strong> ({ev.sourceReliability})
                    </div>
                    <div>Observed: {ev.observedDate}</div>
                    <button
                      onClick={() => store.addEntityToActiveInvestigation(ev.id, 'Evidence')}
                      className="px-2.5 py-1 rounded bg-cyan/15 hover:bg-cyan/25 text-cyan border border-cyan/40 font-bold transition-colors"
                    >
                      ADD TO INVESTIGATION
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
