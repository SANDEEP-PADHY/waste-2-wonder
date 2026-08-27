import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Store, Search, PlusCircle, Gavel, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setSelectedListingId } = useMarketplace();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-pure border-t-2 border-ink-near shadow-brutal-lg px-2 py-2 flex items-center justify-around">
      <button
        onClick={() => {
          setActiveTab('marketplace');
          setSelectedListingId(null);
        }}
        className={`flex flex-col items-center gap-1 px-3 py-1 rounded-brutal transition-all ${
          activeTab === 'marketplace' ? 'text-stormy-teal font-bold' : 'text-gunmetal'
        }`}
      >
        <Store className="w-5 h-5" />
        <span className="text-[10px] font-mono">Market</span>
      </button>

      <button
        onClick={() => {
          setActiveTab('marketplace');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 px-3 py-1 rounded-brutal transition-all text-gunmetal`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-mono">Filters</span>
      </button>

      {/* Prominent Sell Button */}
      <button
        onClick={() => setActiveTab('post-listing')}
        className="flex flex-col items-center justify-center -mt-5 bg-stormy-teal text-white w-12 h-12 rounded-brutal-lg border-2 border-ink-near shadow-brutal active:translate-y-0.5"
      >
        <PlusCircle className="w-6 h-6 text-papaya" />
      </button>

      <button
        onClick={() => setActiveTab('buyer-dashboard')}
        className={`flex flex-col items-center gap-1 px-3 py-1 rounded-brutal transition-all ${
          activeTab === 'buyer-dashboard' ? 'text-stormy-teal font-bold' : 'text-gunmetal'
        }`}
      >
        <Gavel className="w-5 h-5" />
        <span className="text-[10px] font-mono">Bids</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center gap-1 px-3 py-1 rounded-brutal transition-all ${
          activeTab === 'profile' ? 'text-stormy-teal font-bold' : 'text-gunmetal'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-mono">Profile</span>
      </button>
    </div>
  );
};
