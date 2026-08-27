import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useMarketplace();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          error: <XCircle className="w-5 h-5 text-red-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-stormy-teal shrink-0" />
        };

        const borderColors = {
          success: 'border-emerald-600 bg-emerald-50',
          warning: 'border-amber-500 bg-amber-50',
          error: 'border-red-600 bg-red-50',
          info: 'border-stormy-teal bg-teal-50'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 bg-surface-pure rounded-brutal-lg border-2 ${borderColors[toast.type]} shadow-brutal-lg transition-all transform translate-y-0 duration-200`}
          >
            <div className="mt-0.5">{icons[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-display font-bold text-sm text-ink-near">{toast.title}</h4>
              <p className="font-sans text-xs text-gunmetal mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-ink-near transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
