import React, { useState } from 'react';
import { useDarktraceStore } from '../store/useDarktraceStore';
import {
  Database,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ExternalLink,
  Layers
} from 'lucide-react';

export const DataExplorerPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const store = useDarktraceStore();
  const [activeTab, setActiveTab] = useState<'actors' | 'handles' | 'pgp' | 'wallets' | 'infra' | 'personas' | 'relationships' | 'events'>('actors');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const handleExportTableJSON = (data: any[], filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
    store.addToast({
      title: 'Data Exported',
      message: `Downloaded ${filename}.json successfully.`,
      type: 'success'
    });
  };

  const handleExportTableCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const rows = data.map(item =>
      headers.map(header => {
        const val = item[header];
        if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
        return `"${String(val || '').replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    store.addToast({
      title: 'Data Exported',
      message: `Downloaded ${filename}.csv successfully.`,
      type: 'success'
    });
  };

  // Raw data mapping
  let tableData: any[] = [];
  let columns: { key: string; label: string }[] = [];

  if (activeTab === 'actors') {
    tableData = store.actors;
    columns = [
      { key: 'name', label: 'Name' },
      { key: 'primaryHandle', label: 'Handle' },
      { key: 'riskLevel', label: 'Risk' },
      { key: 'status', label: 'Status' },
      { key: 'attributionConfidence', label: 'Confidence' },
      { key: 'firstObserved', label: 'First Seen' },
      { key: 'lastObserved', label: 'Last Seen' }
    ];
  } else if (activeTab === 'handles') {
    tableData = store.identifiers.filter(i => i.type === 'handle');
    columns = [
      { key: 'value', label: 'Handle' },
      { key: 'actorName', label: 'Attributed Actor' },
      { key: 'confidence', label: 'Confidence' },
      { key: 'source', label: 'Source Feed' },
      { key: 'firstSeen', label: 'First Seen' }
    ];
  } else if (activeTab === 'pgp') {
    tableData = store.identifiers.filter(i => i.type === 'pgp');
    columns = [
      { key: 'keyId', label: 'Key ID' },
      { key: 'fingerprint', label: 'Master Fingerprint' },
      { key: 'actorName', label: 'Attributed Actor' },
      { key: 'confidence', label: 'Confidence' },
      { key: 'source', label: 'Keyserver Source' }
    ];
  } else if (activeTab === 'wallets') {
    tableData = store.identifiers.filter(i => i.type === 'wallet');
    columns = [
      { key: 'currency', label: 'Currency' },
      { key: 'value', label: 'Address / UTXO' },
      { key: 'actorName', label: 'Attributed Actor' },
      { key: 'confidence', label: 'Confidence' },
      { key: 'source', label: 'Indexer' }
    ];
  } else if (activeTab === 'infra') {
    tableData = store.infrastructure;
    columns = [
      { key: 'indicator', label: 'Indicator' },
      { key: 'type', label: 'Type' },
      { key: 'actorName', label: 'Actor' },
      { key: 'confidence', label: 'Confidence' },
      { key: 'status', label: 'Status' }
    ];
  } else if (activeTab === 'personas') {
    tableData = store.personas;
    columns = [
      { key: 'handle', label: 'Handle' },
      { key: 'platform', label: 'Platform' },
      { key: 'actorName', label: 'Actor' },
      { key: 'postCount', label: 'Posts' }
    ];
  } else if (activeTab === 'relationships') {
    tableData = store.relationships;
    columns = [
      { key: 'sourceLabel', label: 'Source' },
      { key: 'relationshipType', label: 'Relationship' },
      { key: 'targetLabel', label: 'Target' },
      { key: 'confidence', label: 'Confidence' },
      { key: 'sourceCount', label: 'Sources' }
    ];
  } else if (activeTab === 'events') {
    tableData = store.timelineEvents;
    columns = [
      { key: 'date', label: 'Date' },
      { key: 'eventType', label: 'Event Type' },
      { key: 'title', label: 'Title' },
      { key: 'actorName', label: 'Actor' },
      { key: 'confidence', label: 'Confidence' },
      { key: 'significance', label: 'Significance' }
    ];
  }

  // Filter
  const filtered = tableData.filter(row => {
    if (!searchTerm) return true;
    return Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const pagedData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-600/70 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              SYNTHETIC DATA EXPLORER
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/40">
              CROSS-INDEX REPOSITORY
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Search, sort, filter, and export interconnected threat indicators and relationships
          </p>
        </div>

        {/* Global Export Options */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={() => handleExportTableCSV(filtered, `darktrace-${activeTab}`)}
            className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-600 text-slate-200 font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </button>
          <button
            onClick={() => handleExportTableJSON(filtered, `darktrace-${activeTab}`)}
            className="px-3 py-1.5 rounded-lg bg-cyan/15 hover:bg-cyan/25 border border-cyan text-cyan font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT JSON</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-dark-600 space-x-1 font-mono text-xs overflow-x-auto">
        {[
          { key: 'actors', label: `Actors (${store.actors.length})` },
          { key: 'handles', label: 'Handles' },
          { key: 'pgp', label: 'PGP Keys' },
          { key: 'wallets', label: 'Wallets' },
          { key: 'infra', label: `Infrastructure (${store.infrastructure.length})` },
          { key: 'personas', label: 'Personas' },
          { key: 'relationships', label: `Relationships (${store.relationships.length})` },
          { key: 'events', label: `Timeline Events (${store.timelineEvents.length})` }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => { setActiveTab(t.key as any); setCurrentPage(1); }}
            className={`px-4 py-2.5 border-b-2 font-bold whitespace-nowrap transition-colors ${
              activeTab === t.key
                ? 'border-cyan text-cyan bg-cyan/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search Bar & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center bg-dark-800 border border-dark-600 px-3 py-1.5 rounded-lg max-w-sm w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder={`Search across ${activeTab}...`}
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="text-slate-400 text-[11px]">
          Showing <strong className="text-white">{pagedData.length}</strong> of{' '}
          <strong className="text-white">{filtered.length}</strong> matched records
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-panel rounded-xl border border-dark-600 overflow-hidden font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-dark-850 border-b border-dark-600 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                {columns.map(col => (
                  <th key={col.key} className="py-3 px-3.5">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/60">
              {pagedData.map((row, i) => (
                <tr key={i} className="hover:bg-dark-800/60 transition-colors">
                  {columns.map(col => {
                    const val = row[col.key];
                    return (
                      <td key={col.key} className="py-3 px-3.5 font-medium text-slate-300">
                        {col.key === 'attributionConfidence' || col.key === 'confidence' ? (
                          <span className="text-cyan font-bold">{val}%</span>
                        ) : col.key === 'riskLevel' ? (
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                              val === 'CRITICAL'
                                ? 'bg-red-500/20 text-red-400'
                                : val === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {val}
                          </span>
                        ) : col.key === 'name' || col.key === 'primaryHandle' ? (
                          <span className="text-white font-bold font-sans">{val}</span>
                        ) : typeof val === 'object' ? (
                          JSON.stringify(val).slice(0, 30) + '...'
                        ) : (
                          String(val || '—')
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-dark-850 border-t border-dark-600 flex items-center justify-between text-[11px] text-slate-400">
          <div>
            Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
          </div>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-dark-750 hover:bg-dark-700 disabled:opacity-40 text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded bg-dark-750 hover:bg-dark-700 disabled:opacity-40 text-slate-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
