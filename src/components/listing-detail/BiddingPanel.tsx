import React, { useState } from 'react';
import { Listing } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { AuctionTimer } from '../common/AuctionTimer';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Gavel, 
  Handshake, 
  Bookmark, 
  Share2, 
  Flag, 
  ShieldCheck, 
  TrendingUp, 
  History, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BidModal } from './BidModal';
import { NegotiateModal } from './NegotiateModal';

interface BiddingPanelProps {
  listing: Listing;
  onOpenReport: () => void;
  onOpenMessage: () => void;
}

export const BiddingPanel: React.FC<BiddingPanelProps> = ({
  listing,
  onOpenReport,
  onOpenMessage
}) => {
  const { isSaved, toggleSaveListing, addToast } = useMarketplace();
  const saved = isSaved(listing.id);

  const currentPrice = listing.currentBid || listing.startingBid || 0;
  const increment = listing.bidIncrement || 100;
  const minNextBid = currentPrice + increment;

  const [customBid, setCustomBid] = useState<number>(minNextBid);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isNegotiateModalOpen, setIsNegotiateModalOpen] = useState(false);

  const handleQuickAdd = (amount: number) => {
    setCustomBid(prev => Math.max(minNextBid, prev + amount));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Link Copied', 'Listing link copied to clipboard.', 'info');
  };

  const isAuctionEnded = listing.status === 'Ended' || listing.status === 'Sold/Closed';

  return (
    <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal-lg space-y-6">
      {/* Top Status & Timers */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b-2 border-ink-near">
        <div className="flex items-center gap-2">
          <StatusBadge listingType={listing.listingType} />
          {listing.status === 'Ending Soon' && (
            <StatusBadge auctionStatus={listing.status} />
          )}
        </div>

        {listing.listingType === 'Auction' && listing.auctionEnd && (
          <div className="flex items-center gap-1.5">
            <AuctionTimer endTime={listing.auctionEnd} size="md" />
          </div>
        )}
      </div>

      {/* Main Pricing / Bidding Section */}
      {listing.listingType === 'Auction' ? (
        <div className="space-y-4">
          <div className="p-4 bg-surface-canvas rounded-brutal border-2 border-ink-near shadow-brutal-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-gray-500 block">
                Current Highest Bid
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-3xl sm:text-4xl text-ink-near">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-mono text-gray-500 font-bold">
                  ({listing.bids.length} total bids)
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-gray-500 block">Starting Bid</span>
              <span className="font-mono font-bold text-sm text-gray-700">
                ₹{listing.startingBid?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {!isAuctionEnded ? (
            <div className="space-y-3 pt-2">
              {/* Bid Input Box */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="font-bold text-gray-700">Place Your Bid:</span>
                  <span className="text-stormy-teal font-bold">
                    Minimum Next: ₹{minNextBid.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="relative flex items-center">
                  <span className="absolute left-3.5 font-mono font-bold text-lg text-gray-500">₹</span>
                  <input
                    type="number"
                    min={minNextBid}
                    step={increment}
                    value={customBid}
                    onChange={e => setCustomBid(Number(e.target.value))}
                    className="w-full pl-9 pr-24 py-3 bg-surface-canvas border-2 border-ink-near rounded-brutal font-display font-bold text-xl text-ink-near focus:outline-none focus:bg-white focus:shadow-brutal-sm"
                  />
                  <div className="absolute right-2 flex items-center gap-1 font-mono text-xs text-gray-400">
                    INR
                  </div>
                </div>
              </div>

              {/* Quick Increment Chips */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-gray-500">Quick add:</span>
                {[100, 500, 1000, 2000].map(addVal => (
                  <button
                    key={addVal}
                    type="button"
                    onClick={() => handleQuickAdd(addVal)}
                    className="px-2.5 py-1 rounded-brutal border border-ink-near bg-surface-canvas hover:bg-papaya font-mono text-xs font-bold text-ink-near shadow-brutal-xs transition-all active:scale-95"
                  >
                    +₹{addVal}
                  </button>
                ))}
              </div>

              {/* Primary Bid Action Button */}
              <button
                type="button"
                onClick={() => {
                  if (customBid < minNextBid) {
                    addToast('Bid Too Low', `Minimum next bid must be at least ₹${minNextBid.toLocaleString('en-IN')}`, 'warning');
                    return;
                  }
                  setIsBidModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-black text-sm uppercase tracking-wider shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <Gavel className="w-4 h-4 text-papaya" />
                <span>Place Bid (₹{customBid.toLocaleString('en-IN')})</span>
              </button>
            </div>
          ) : (
            <div className="p-4 bg-gray-100 rounded-brutal border-2 border-gray-400 text-center font-mono font-bold text-gray-700">
              This auction has concluded. Winning bid: ₹{currentPrice.toLocaleString('en-IN')}.
            </div>
          )}
        </div>
      ) : (
        /* Negotiable Fixed Offer Box */
        <div className="space-y-4">
          <div className="p-4 bg-surface-canvas rounded-brutal border-2 border-ink-near shadow-brutal-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-gray-500 block">
                Asking Price (Negotiable)
              </span>
              <span className="font-display font-black text-3xl sm:text-4xl text-ink-near">
                ₹{listing.askingPrice?.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="px-3 py-1 bg-papaya text-ink-near border border-ink-near rounded-brutal text-xs font-mono font-bold uppercase shadow-brutal-xs">
              Direct B2B Offer
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsNegotiateModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-black text-sm uppercase tracking-wider shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <Handshake className="w-4 h-4 text-papaya" />
            <span>Make Price Offer to Seller</span>
          </button>
        </div>
      )}

      {/* Secondary Actions: Message, Save, Share, Report */}
      <div className="grid grid-cols-4 gap-2 pt-2">
        <button
          onClick={onOpenMessage}
          className="col-span-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-brutal border-2 border-ink-near bg-surface-canvas hover:bg-gray-100 font-display font-bold text-xs text-ink-near shadow-brutal-xs"
        >
          <span>Ask Seller Question</span>
        </button>

        <button
          onClick={() => toggleSaveListing(listing.id)}
          className={`flex items-center justify-center gap-1 py-2 px-2 rounded-brutal border-2 border-ink-near font-mono font-bold text-xs transition-all shadow-brutal-xs ${
            saved ? 'bg-papaya text-ink-near' : 'bg-white hover:bg-gray-100 text-gunmetal'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-ink-near' : ''}`} />
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-1 py-2 px-2 rounded-brutal border-2 border-ink-near bg-white hover:bg-gray-100 font-mono font-bold text-xs text-gunmetal shadow-brutal-xs"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Transparent Bid History Log */}
      {listing.listingType === 'Auction' && (
        <div className="pt-4 border-t-2 border-ink-near space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-stormy-teal" />
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-near">
                Transparent Bid History ({listing.bids.length})
              </h4>
            </div>
            <span className="text-[10px] font-mono text-gray-400">Anonymized B2B Ledger</span>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-200 rounded-brutal p-2 bg-surface-canvas">
            {listing.bids.length === 0 ? (
              <p className="text-xs font-mono text-gray-500 py-3 text-center">No bids placed yet. Be the first bidder!</p>
            ) : (
              listing.bids
                .slice()
                .reverse()
                .map((b, idx) => (
                  <div
                    key={b.id}
                    className={`flex items-center justify-between p-2 rounded-brutal text-xs font-mono ${
                      idx === 0
                        ? 'bg-emerald-50 border border-emerald-400 text-emerald-950 font-bold'
                        : 'bg-white border border-gray-200 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {idx === 0 && (
                        <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded text-[9px] font-bold">
                          LEADING
                        </span>
                      )}
                      <span>{b.bidderAnonymousName}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-ink-near">₹{b.amount.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* Report Listing Trigger */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onOpenReport}
          className="flex items-center gap-1 text-[11px] font-mono text-gray-400 hover:text-red-600 transition-colors"
        >
          <Flag className="w-3 h-3" />
          <span>Report safety violation / incorrect specs</span>
        </button>
      </div>

      {/* Modals */}
      <BidModal
        listing={listing}
        bidAmount={customBid}
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        onSuccess={() => setCustomBid(customBid + increment)}
      />

      <NegotiateModal
        listing={listing}
        isOpen={isNegotiateModalOpen}
        onClose={() => setIsNegotiateModalOpen(false)}
      />
    </div>
  );
};
