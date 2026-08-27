import React, { useState } from 'react';
import { Listing } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Handshake, Send, X } from 'lucide-react';

interface NegotiateModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

export const NegotiateModal: React.FC<NegotiateModalProps> = ({
  listing,
  isOpen,
  onClose
}) => {
  const { makeOffer } = useMarketplace();
  const [offerPrice, setOfferPrice] = useState<number>(listing.askingPrice || 5000);
  const [note, setNote] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (offerPrice <= 0) return;
    makeOffer(listing.id, offerPrice, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal-xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-brutal border-2 border-ink-near hover:bg-gray-100 transition-colors shadow-brutal-xs"
        >
          <X className="w-4 h-4 text-ink-near" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b-2 border-ink-near mb-5">
          <div className="w-10 h-10 rounded-brutal bg-papaya border-2 border-ink-near flex items-center justify-center shadow-brutal-xs">
            <Handshake className="w-5 h-5 text-ink-near" />
          </div>
          <div>
            <h3 className="font-display font-black text-lg text-ink-near uppercase">
              Make Negotiable Offer
            </h3>
            <p className="text-xs font-mono text-gray-500">
              Direct B2B Scrap Price Proposal
            </p>
          </div>
        </div>

        {/* Listing preview */}
        <div className="p-3 bg-surface-canvas rounded-brutal border-2 border-ink-near mb-5 flex items-center justify-between">
          <div>
            <h4 className="font-display font-bold text-xs text-ink-near line-clamp-1">{listing.title}</h4>
            <span className="text-[11px] font-mono text-gray-600">Seller Asking: ₹{listing.askingPrice?.toLocaleString('en-IN')}</span>
          </div>
          <span className="px-2 py-1 bg-papaya border border-ink-near text-[10px] font-mono font-bold rounded-brutal uppercase">
            Negotiable
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
              Your Offer Amount (in INR ₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 font-mono font-bold text-base text-gray-500">₹</span>
              <input
                type="number"
                min="100"
                step="100"
                required
                value={offerPrice}
                onChange={e => setOfferPrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal font-display font-bold text-xl text-ink-near focus:outline-none focus:bg-white focus:shadow-brutal-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
              Message / Logistics Terms to Seller
            </label>
            <textarea
              rows={3}
              placeholder="e.g. We have CPCB transport permit and can arrange direct forklift pickup this Thursday..."
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full p-3 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans focus:outline-none focus:bg-white"
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
              className="px-6 py-2.5 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-bold text-xs uppercase tracking-wider shadow-brutal active:translate-y-0.5 flex items-center gap-1.5"
            >
              <Send className="w-4 h-4 text-papaya" />
              <span>Send Offer & Start Chat</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
