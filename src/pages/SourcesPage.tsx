import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import { Radio, Search, Filter, ShieldCheck, CheckCircle2, AlertTriangle, Info, RefreshCw } from 'lucide-react';

export const SourcesPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [relFilter, setRelFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const filteredSources = store.sources.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRel = relFilter === 'ALL' || s.reliability === relFilter;
    const matchesType = typeFilter === 'ALL' || s.type === typeFilter;
    return matchesSearch && matchesRel && matchesType;
  });

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              MONITORED INTELLIGENCE SOURCES
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              {store.sources.length} ACTIVE COLLECTORS
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Automated synthetic crawler daemons, Tor keyserver mirrors, and blockchain ledger indexers
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={() => store.runAutonomousScan()}
            disabled={store.isScanning}
            className="px-3.5 py-1.5 rounded-lg bg-cyan/15 hover:bg-cyan/25 border border-cyan text-cyan font-bold flex items-center space-x-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${store.isScanning ? 'animate-spin' : ''}`} />
            <span>SYNC ALL FEEDS</span>
          </button>
        </div>
      </div>

      {/* Educational Reliability Classification Notice (Prompt Section 26) */}
      <div className="glass-panel p-4 rounded-xl border border-cyan/40 space-y-2 font-mono text-xs shadow-glass">
        <div className="flex items-center space-x-2 text-cyan font-bold">
          <Info className="w-4 h-4 text-cyan" />
          <span>METHODOLOGY NOTICE: SOURCE RELIABILITY VS. ATTRIBUTION CONFIDENCE</span>
        </div>
        <p className="text-slate-300 font-sans text-xs leading-relaxed">
          Source reliability (NATO Standard A-D grading) measures the structural credibility and historical integrity of the technical collector node. In contrast, attribution confidence measures the mathematical convergence of correlated identifiers linking a specific threat actor. A high-reliability source (Class A) may still report a low-confidence relationship if forensic indicators are incomplete.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[10px]">
          <div className="p-2 rounded bg-dark-850 border border-dark-700">
            <span className="text-emerald-400 font-bold">CLASS A:</span> Completely Reliable (Ledger sync, Keyserver RFC-4880)
          </div>
          <div className="p-2 rounded bg-dark-850 border border-dark-700">
            <span className="text-cyan font-bold">CLASS B:</span> Usually Reliable (Tor hidden service descriptor crawlers)
          </div>
          <div className="p-2 rounded bg-dark-850 border border-dark-700">
            <span className="text-amber-400 font-bold">CLASS C:</span> Fairly Reliable (Darknet forum public discussions)
          </div>
          <div className="p-2 rounded bg-dark-850 border border-dark-700">
            <span className="text-red-400 font-bold">CLASS D:</span> Not Usually Reliable (Unverified chat rooms)
          </div>
        </div>
      </div>

      {/* Sources Table with Search & Filters */}
      <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-600 pb-4">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-cyan" />
            <h3 className="text-base font-sans font-bold text-white">
              INTELLIGENCE INGEST FEEDS ({filteredSources.length})
            </h3>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center bg-dark-800 border border-dark-600 px-3 py-1.5 rounded-lg">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search source name..."
                className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-40"
              />
            </div>

            <select
              value={relFilter}
              onChange={(e) => setRelFilter(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Reliability</option>
              <option value="A">Grade A (High)</option>
              <option value="B">Grade B (Good)</option>
              <option value="C">Grade C (Fair)</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="MARKETPLACE">Marketplace</option>
              <option value="DARKNET_FORUM">Darknet Forum</option>
              <option value="BLOCKCHAIN_LEDGER">Blockchain Ledger</option>
              <option value="CERT_TRANSPARENCY">Certificate Transparency</option>
              <option value="INFRASTRUCTURE_PROBE">Infrastructure Probe</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-600 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                <th className="py-3 px-3">Collector Name</th>
                <th className="py-3 px-3">Source Type</th>
                <th className="py-3 px-3">Reliability</th>
                <th className="py-3 px-3">Indexed Indicators</th>
                <th className="py-3 px-3">Sync Frequency</th>
                <th className="py-3 px-3">Last Active</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/60">
              {filteredSources.map(s => (
                <tr key={s.id} className="hover:bg-dark-800/60 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white font-sans">{s.name}</div>
                    <div className="text-[10px] text-slate-400 font-sans">{s.description}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-dark-800 border border-dark-600 text-slate-300 uppercase">
                      {s.type.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        s.reliability === 'A'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : s.reliability === 'B'
                          ? 'bg-cyan/20 text-cyan border border-cyan/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      GRADE {s.reliability}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-cyan">
                    {s.indicatorsCount}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {s.feedFrequency}
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">
                    {s.lastCollection}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        s.status === 'ONLINE'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
