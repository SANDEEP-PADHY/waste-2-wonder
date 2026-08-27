import React from 'react';
import { Listing } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Gavel, ShieldCheck, AlertCircle, X, Check } from 'lucide-react';

interface BidModalProps {
  listing: Listing;
  bidAmount: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const BidModal: React.FC<BidModalProps> = ({
  listing,
  bidAmount,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { placeBid } = useMarketplace();

  if (!isOpen) return null;

  const currentHighest = listing.currentBid || listing.startingBid || 0;
  const minNextBid = currentHighest + (listing.bidIncrement || 100);

  const handleConfirm = () => {
    const success = placeBid(listing.id, bidAmount);
    if (success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal-xl relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-brutal border-2 border-ink-near hover:bg-gray-100 transition-colors shadow-brutal-xs"
        >
          <X className="w-4 h-4 text-ink-near" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b-2 border-ink-near mb-5">
          <div className="w-10 h-10 rounded-brutal bg-stormy-teal border-2 border-ink-near flex items-center justify-center shadow-brutal-xs">
            <Gavel className="w-5 h-5 text-papaya" />
          </div>
          <div>
            <h3 className="font-display font-black text-lg text-ink-near uppercase">
              Confirm Live Auction Bid
            </h3>
            <p className="text-xs font-mono text-gray-500">
              Legally Binding B2B Recycling Exchange Bid
            </p>
          </div>
        </div>

        {/* Listing Preview Snippet */}
        <div className="p-3.5 bg-surface-canvas rounded-brutal border-2 border-ink-near mb-5 flex items-center gap-3">
          <img 
            src={listing.coverImage} 
            alt={listing.title} 
            className="w-12 h-12 rounded-brutal border border-ink-near object-cover shrink-0" 
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-display font-bold text-xs text-ink-near line-clamp-1">{listing.title}</h4>
            <p className="text-[11px] font-mono text-gray-600 mt-0.5">
              {listing.quantity} {listing.unit} • {listing.logistics.city}, {listing.logistics.state}
            </p>
          </div>
        </div>

        {/* Bid Comparison Card */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3.5 bg-gray-100 rounded-brutal border border-gray-300">
            <span className="text-[10px] font-mono uppercase text-gray-500 block">Current High Bid</span>
            <span className="font-display font-bold text-lg text-gray-700">
              ₹{currentHighest.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="p-3.5 bg-stormy-soft rounded-brutal border-2 border-stormy-teal shadow-brutal-xs">
            <span className="text-[10px] font-mono uppercase text-stormy-teal font-bold block">Your New Bid</span>
            <span className="font-display font-black text-2xl text-stormy-dark">
              ₹{bidAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="space-y-2 mb-6 text-xs text-gunmetal bg-papaya/60 p-3.5 rounded-brutal border border-ink-near">
          <div className="flex items-start gap-2 font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              If your bid wins when the timer expires, the seller will be connected with your contact details for warehouse lot inspection and direct settlement.
            </span>
          </div>
          <div className="flex items-start gap-2 font-mono text-[11px]">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>No online checkout or gateway fee is charged on this platform.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-brutal border-2 border-ink-near bg-white font-mono font-bold text-xs text-ink-near hover:bg-gray-100 shadow-brutal-xs"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-bold text-xs uppercase tracking-wider shadow-brutal active:translate-y-0.5 flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 text-papaya" />
            <span>Confirm & Place Bid</span>
          </button>
        </div>
      </div>
    </div>
  );
};
