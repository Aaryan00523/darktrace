import React from 'react';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import {
  LayoutDashboard,
  FolderGit2,
  Users,
  Network,
  Server,
  BrainCircuit,
  Calendar,
  Radio,
  Cpu,
  Database,
  FileText,
  Layers,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  collapsed,
  onToggleCollapse
}) => {
  const store = useDarktraceStore();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: null },
    { label: 'Investigations', path: '/investigations', icon: FolderGit2, badge: store.investigations.length },
    { label: 'Threat Actors', path: '/actors', icon: Users, badge: store.actors.length },
    { label: 'Identity Graph', path: '/identity-graph', icon: Network, badge: '3D' },
    { label: 'Infrastructure', path: '/infrastructure', icon: Server, badge: store.infrastructure.length },
    { label: 'Persona AI', path: '/persona-intelligence', icon: BrainCircuit, badge: store.personas.length },
    { label: 'Attribution Timeline', path: '/timeline', icon: Calendar, badge: null },
    { label: 'Intelligence Sources', path: '/sources', icon: Radio, badge: store.sources.length },
    { label: 'Autonomous Monitor', path: '/autonomous-monitor', icon: Cpu, badge: 'LIVE' },
    { label: 'Data Explorer', path: '/data-explorer', icon: Database, badge: null },
    { label: 'Report Center', path: '/reports', icon: FileText, badge: null },
    { label: 'System Architecture', path: '/architecture', icon: Layers, badge: '3D' },
    { label: 'Methodology & Legal', path: '/about', icon: HelpCircle, badge: null },
    { label: 'Settings', path: '/settings', icon: Settings, badge: null }
  ];

  return (
    <aside
      className={`relative z-20 flex-shrink-0 bg-dark-850/95 backdrop-blur-md border-r border-dark-600 transition-all duration-300 flex flex-col font-mono text-xs select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Navigation List */}
      <div className="flex-1 py-4 overflow-y-auto space-y-1 px-2.5">
        {!collapsed && (
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Operational Modules
          </div>
        )}

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || (item.path !== '/' && item.path !== '/dashboard' && currentPath.startsWith(item.path));

          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left group ${
                isActive
                  ? 'bg-cyan/15 text-cyan border border-cyan/40 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-dark-750/70 border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center space-x-3 truncate">
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    isActive ? 'text-cyan' : 'text-slate-400 group-hover:text-cyan'
                  }`}
                />
                {!collapsed && (
                  <span className="truncate font-sans font-medium text-xs tracking-tight">
                    {item.label}
                  </span>
                )}
              </div>

              {!collapsed && item.badge !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                    isActive
                      ? 'bg-cyan text-dark-950'
                      : item.badge === 'LIVE'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : item.badge === '3D'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-dark-700 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Collapse / Expand Toggle at Bottom */}
      <div className="p-3 border-t border-dark-600 flex items-center justify-between bg-dark-900/60">
        {!collapsed && (
          <div className="flex items-center space-x-2 text-[10px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>SYSTEM NORMAL</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-dark-700 text-slate-400 hover:text-white transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
