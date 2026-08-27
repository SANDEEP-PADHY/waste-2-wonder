import React, { useState } from 'react';
import { Listing } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MessageSquare, Send, X, ShieldCheck } from 'lucide-react';

interface ListingMessagingModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

export const ListingMessagingModal: React.FC<ListingMessagingModalProps> = ({
  listing,
  isOpen,
  onClose
}) => {
  const { startOrOpenThread, setSelectedThreadId, setActiveTab } = useMarketplace();
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const quickTemplates = [
    'Are these boards tested for power rail shorts?',
    'Can we inspect the lot in person at your GIDC warehouse this week?',
    'Do you have CPCB/EPR compliance manifest ready for transport?',
    'What is the total bare copper content in this lot?'
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const threadId = startOrOpenThread(listing.id, message.trim());
    setSelectedThreadId(threadId);
    setActiveTab('messages');
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
          <div className="w-10 h-10 rounded-brutal bg-stormy-teal border-2 border-ink-near flex items-center justify-center shadow-brutal-xs">
            <MessageSquare className="w-5 h-5 text-papaya" />
          </div>
          <div>
            <h3 className="font-display font-black text-lg text-ink-near uppercase">
              Message Seller
            </h3>
            <p className="text-xs font-mono text-gray-500">
              Direct Technical Q&A with {listing.seller.name}
            </p>
          </div>
        </div>

        {/* Listing preview banner */}
        <div className="p-3 bg-surface-canvas rounded-brutal border border-ink-near mb-4 flex items-center gap-3">
          <img src={listing.coverImage} alt="" className="w-10 h-10 rounded-brutal object-cover border border-ink-near shrink-0" />
          <div className="min-w-0 flex-1">
            <h4 className="font-display font-bold text-xs text-ink-near truncate">{listing.title}</h4>
            <span className="text-[10px] font-mono text-stormy-teal font-bold">
              {listing.listingType === 'Auction' 
                ? `Current Bid: ₹${(listing.currentBid || listing.startingBid)?.toLocaleString('en-IN')}`
                : `Asking: ₹${listing.askingPrice?.toLocaleString('en-IN')}`}
            </span>
          </div>
        </div>

        {/* Quick Question Chips */}
        <div className="mb-4">
          <label className="text-[11px] font-mono font-bold uppercase text-gray-500 block mb-1.5">
            Quick Inquiries:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {quickTemplates.map((tpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMessage(tpl)}
                className="text-[11px] font-sans text-left bg-surface-canvas hover:bg-stormy-soft hover:text-stormy-dark border border-gray-300 rounded-brutal px-2.5 py-1 transition-colors"
              >
                {tpl}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
              Your Message
            </label>
            <textarea
              rows={4}
              required
              placeholder="Ask about lot condition, pickup terms, loading dock access, or test logs..."
              value={message}
              onChange={e => setMessage(e.target.value)}
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
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
