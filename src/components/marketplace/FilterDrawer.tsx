import React from 'react';
import { FilterSidebar } from './FilterSidebar';
import { X } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-sm bg-surface-pure border-l-3 border-ink-near h-full shadow-brutal-xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b-2 border-ink-near flex items-center justify-between bg-surface-canvas">
          <h3 className="font-display font-bold text-base text-ink-near uppercase">Filter E-Waste Lots</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-brutal border-2 border-ink-near hover:bg-gray-100 transition-colors shadow-brutal-xs"
          >
            <X className="w-5 h-5 text-ink-near" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <FilterSidebar />
        </div>

        <div className="p-4 border-t-2 border-ink-near bg-surface-canvas">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-brutal border-2 border-ink-near bg-stormy-teal text-white font-display font-bold text-xs uppercase tracking-wider shadow-brutal"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
