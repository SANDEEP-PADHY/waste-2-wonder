import React, { useState } from 'react';
import { Listing, Report } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Flag, X, AlertTriangle } from 'lucide-react';

interface ReportListingModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportListingModal: React.FC<ReportListingModalProps> = ({ listing, isOpen, onClose }) => {
  const { reportListing } = useMarketplace();
  const [reason, setReason] = useState<Report['reason']>('Fraud / Misleading Specs');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reportListing(listing.id, reason, description);
    onClose();
  };

  const reportReasons: Report['reason'][] = [
    'Fraud / Misleading Specs',
    'Prohibited / Unsafe Hazardous Material',
    'Data Privacy Breach (Unwiped Storage)',
    'Wrong Category',
    'Duplicate / Spam',
    'Illegal Scrap Trading',
    'Other'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="w-full max-w-md bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal-xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-brutal border-2 border-ink-near hover:bg-gray-100 transition-colors shadow-brutal-xs"
        >
          <X className="w-4 h-4 text-ink-near" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b-2 border-ink-near mb-5">
          <div className="w-10 h-10 rounded-brutal bg-red-100 border-2 border-red-700 text-red-700 flex items-center justify-center shadow-brutal-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-lg text-ink-near uppercase">
              Report Safety Violation
            </h3>
            <p className="text-xs font-mono text-gray-500">
              Moderation Desk Review
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
              Reason for Report
            </label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value as any)}
              className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans focus:outline-none"
            >
              {reportReasons.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
              Details & Evidence
            </label>
            <textarea
              rows={4}
              required
              placeholder="Explain the specific issue (e.g. hazardous battery leaking without declared class, falsified NIST data cert, non-matching images)..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-3 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-brutal border-2 border-ink-near bg-white font-mono font-bold text-xs text-ink-near hover:bg-gray-100 shadow-brutal-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-brutal border-2 border-ink-near bg-red-600 hover:bg-red-700 text-white font-display font-bold text-xs uppercase tracking-wider shadow-brutal active:translate-y-0.5"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
