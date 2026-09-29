import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import { Infrastructure3D } from '../components/3d/Infrastructure3D';
import {
  Server,
  Search,
  Filter,
  Shield,
  Layers,
  ExternalLink,
  ChevronRight,
  Globe,
  Key,
  FolderPlus
} from 'lucide-react';
import { InfrastructureIndicator } from '../types';

export const InfrastructurePage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [selectedInfra, setSelectedInfra] = useState<InfrastructureIndicator | null>(null);

  const filteredInfra = store.infrastructure.filter(item => {
    const matchesSearch = item.indicator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.hostingProvider && item.hostingProvider.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'ALL' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              INFRASTRUCTURE INTELLIGENCE
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              {store.infrastructure.length} INDICATORS
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Correlating Tor v3 hidden services, self-signed TLS certificates, clearnet relays, and service banners
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={() => store.runAutonomousScan()}
            disabled={store.isScanning}
            className="px-3.5 py-1.5 rounded-lg bg-cyan/15 hover:bg-cyan/25 border border-cyan text-cyan font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Server className="w-3.5 h-3.5" />
            <span>DISCOVER NEW INDICATORS</span>
          </button>
        </div>
      </div>

      {/* 3D Infrastructure Visualization (Prompt Section 18) */}
      <div className="w-full h-[520px] rounded-xl overflow-hidden border border-dark-600 shadow-glass">
        <Infrastructure3D onSelectInfra={(infra) => setSelectedInfra(infra)} />
      </div>

      {/* Infrastructure Indicators Table (Prompt Section 17) */}
      <div className="glass-panel p-6 rounded-xl border border-dark-600 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-600 pb-4">
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-cyan" />
            <h3 className="text-base font-sans font-bold text-white">
              SYNTHETIC INFRASTRUCTURE INDICATORS ({filteredInfra.length})
            </h3>
          </div>

          {/* Table Filters */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center bg-dark-800 border border-dark-600 px-3 py-1.5 rounded-lg">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search indicator, IP, hash..."
                className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-44"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="hidden_service">Hidden Service (.onion)</option>
              <option value="server_ip">Server Host IP</option>
              <option value="tls_certificate">TLS Certificate</option>
              <option value="service_banner">Service Banner</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-600 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                <th className="py-3 px-3">Indicator / Endpoint</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Attributed Actor</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3">Observation Window</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/60">
              {filteredInfra.slice(0, 15).map(item => (
                <tr key={item.id} className="hover:bg-dark-800/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">
                    <div className="font-mono text-cyan truncate max-w-xs">{item.indicator}</div>
                    <div className="text-[10px] text-slate-400 font-sans truncate">{item.details}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-dark-800 border border-dark-600 text-slate-300 uppercase">
                      {item.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white font-sans">
                    {item.actorName}
                  </td>
                  <td className="py-3 px-3 font-bold text-cyan">
                    {item.confidence}%
                  </td>
                  <td className="py-3 px-3 text-[11px] text-slate-400">
                    {item.firstSeen} → {item.lastSeen}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        item.status === 'ONLINE'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : item.status === 'INTERMITTENT'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => store.addEntityToActiveInvestigation(item.id, item.type)}
                      className="px-2 py-1 rounded bg-cyan/15 hover:bg-cyan/25 text-cyan border border-cyan/40 text-[10px] font-bold transition-colors"
                    >
                      Add to Case
                    </button>
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
