import React from 'react';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toasts, removeToast } = useDarktraceStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map(toast => {
        let Icon = Info;
        let borderColor = 'border-cyan/50';
        let iconColor = 'text-cyan';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderColor = 'border-emerald-500/50';
          iconColor = 'text-emerald-400';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderColor = 'border-amber-500/50';
          iconColor = 'text-amber-400';
        } else if (toast.type === 'critical') {
          Icon = AlertCircle;
          borderColor = 'border-red-500/50';
          iconColor = 'text-red-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start space-x-3 p-3.5 rounded-lg bg-dark-800/95 backdrop-blur border ${borderColor} shadow-glass font-mono text-xs text-slate-200 transition-all transform translate-y-0 opacity-100`}
          >
            <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white tracking-wide">{toast.title}</span>
                <span className="text-[10px] text-slate-500">{toast.timestamp}</span>
              </div>
              <p className="mt-1 text-slate-400 text-[11px] leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
