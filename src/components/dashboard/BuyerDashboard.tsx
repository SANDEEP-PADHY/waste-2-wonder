import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { StatusBadge } from '../common/StatusBadge';
import { AuctionTimer } from '../common/AuctionTimer';
import { 
  Gavel, 
  Bookmark, 
  ArrowUpRight, 
  Trash2, 
  Flame, 
  TrendingUp, 
  RotateCw,
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { BidModal } from '../listing-detail/BidModal';
import { Listing } from '../../types';

export const BuyerDashboard: React.FC = () => {
  const { 
    listings, 
    currentUser, 
    savedListingIds, 
    toggleSaveListing, 
    openListingDetail,
    setActiveTab,
    placeBid
  } = useMarketplace();

  const [activeTab, setActiveSubTab] = useState<'bids' | 'saved'>('bids');
  const [rebidListing, setRebidListing] = useState<Listing | null>(null);

  // Find all listings where current user has placed a bid
  const myBidListings = listings.filter(l => 
    l.bids.some(b => b.bidderId === currentUser.id || b.isUserBid)
  );

  // Saved listings
  const savedListings = listings.filter(l => savedListingIds.includes(l.id));

  // Determine user's bid status on a listing
  const getUserBidInfo = (listing: Listing) => {
    const userBids = listing.bids.filter(b => b.bidderId === currentUser.id || b.isUserBid);
    if (userBids.length === 0) return null;

    const highestUserBid = userBids.reduce((max, b) => b.amount > max.amount ? b : max, userBids[0]);
    const isLeading = listing.currentBid === highestUserBid.amount;
    const isEnded = listing.status === 'Ended' || listing.status === 'Sold/Closed';

    let status: 'Leading' | 'Outbid' | 'Won' | 'Lost' = 'Outbid';
    if (isEnded) {
      status = isLeading ? 'Won' : 'Lost';
    } else {
      status = isLeading ? 'Leading' : 'Outbid';
    }

    return {
      highestUserBid: highestUserBid.amount,
      status,
      isLeading
    };
  };

  const leadingCount = myBidListings.filter(l => getUserBidInfo(l)?.status === 'Leading').length;
  const outbidCount = myBidListings.filter(l => getUserBidInfo(l)?.status === 'Outbid').length;
  const wonCount = myBidListings.filter(l => getUserBidInfo(l)?.status === 'Won').length;

  return (
    <div className="min-h-screen bg-surface-canvas py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-ink-near uppercase tracking-tight">
                Buyer Bidding & Bookmarks
              </h1>
              <span className="px-2.5 py-0.5 bg-papaya border border-ink-near rounded-brutal text-xs font-mono font-bold">
                {currentUser.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-sans text-gunmetal mt-1">
              Track live bids on e-waste lots, review outbid alerts, and manage saved scrap bookmarks.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('marketplace')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-brutal border-2 border-ink-near bg-stormy-teal text-white font-display font-bold text-xs uppercase tracking-wider shadow-brutal active:translate-y-0.5"
          >
            <span>Explore More Lots</span>
            <ArrowUpRight className="w-4 h-4 text-papaya" />
          </button>
        </div>

        {/* Bidding Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[11px] font-mono uppercase font-bold">Active Bid Lots</span>
              <Gavel className="w-4 h-4 text-stormy-teal" />
            </div>
            <div className="font-display font-black text-3xl text-ink-near">{myBidListings.length}</div>
            <span className="text-[10px] font-mono text-gray-500">In Active Bidding</span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-brutal-xl border-3 border-emerald-700 shadow-brutal">
            <div className="flex items-center justify-between text-emerald-800 mb-1">
              <span className="text-[11px] font-mono uppercase font-bold">Currently Leading</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-display font-black text-3xl text-emerald-800">{leadingCount}</div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">Highest Bidder</span>
          </div>

          <div className="p-4 bg-amber-50 rounded-brutal-xl border-3 border-amber-600 shadow-brutal">
            <div className="flex items-center justify-between text-amber-900 mb-1">
              <span className="text-[11px] font-mono uppercase font-bold">Outbid Lots</span>
              <Flame className="w-4 h-4 text-red-500" />
            </div>
            <div className="font-display font-black text-3xl text-red-600">{outbidCount}</div>
            <span className="text-[10px] font-mono text-amber-800 font-bold">Requires Higher Bid</span>
          </div>

          <div className="p-4 bg-papaya rounded-brutal-xl border-3 border-ink-near shadow-brutal">
            <div className="flex items-center justify-between text-gunmetal mb-1">
              <span className="text-[11px] font-mono uppercase font-bold">Saved Bookmarks</span>
              <Bookmark className="w-4 h-4 text-stormy-teal" />
            </div>
            <div className="font-display font-black text-3xl text-ink-near">{savedListings.length}</div>
            <span className="text-[10px] font-mono text-gray-600">Saved for Inspection</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-surface-pure rounded-brutal-lg border-2 border-ink-near w-fit shadow-brutal-xs">
          <button
            onClick={() => setActiveSubTab('bids')}
            className={`flex items-center gap-2 px-5 py-2 rounded-brutal text-xs font-mono font-bold transition-all ${
              activeTab === 'bids'
                ? 'bg-stormy-teal text-white shadow-brutal-xs'
                : 'text-gunmetal hover:bg-gray-100'
            }`}
          >
            <Gavel className="w-4 h-4" />
            <span>My Active Bids ({myBidListings.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('saved')}
            className={`flex items-center gap-2 px-5 py-2 rounded-brutal text-xs font-mono font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-stormy-teal text-white shadow-brutal-xs'
                : 'text-gunmetal hover:bg-gray-100'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Lots ({savedListings.length})</span>
          </button>
        </div>

        {/* BIDS TAB CONTENT */}
        {activeTab === 'bids' && (
          <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal-lg overflow-hidden">
            {myBidListings.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-brutal bg-gray-100 border border-ink-near mx-auto flex items-center justify-center">
                  <Gavel className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-display font-bold text-base text-ink-near">No Active Bids Placed</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto font-mono">
                  You haven't placed bids on any live e-waste lots yet. Browse the discovery board to place bids.
                </p>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="px-4 py-2 rounded-brutal border-2 border-ink-near bg-stormy-teal text-white font-mono font-bold text-xs uppercase shadow-brutal-xs"
                >
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-surface-canvas border-b-2 border-ink-near text-[11px] font-bold uppercase text-gray-600">
                    <tr>
                      <th className="p-4">Lot Details</th>
                      <th className="p-4">Your Bid</th>
                      <th className="p-4">Current High Bid</th>
                      <th className="p-4">Bid Status</th>
                      <th className="p-4">Time Left</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {myBidListings.map(item => {
                      const bidInfo = getUserBidInfo(item);
                      const minNext = (item.currentBid || 0) + (item.bidIncrement || 100);

                      return (
                        <tr key={item.id} className="hover:bg-stormy-soft/20 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src={item.coverImage} alt="" className="w-12 h-12 rounded-brutal border border-ink-near object-cover shrink-0" />
                              <div>
                                <h4 
                                  onClick={() => openListingDetail(item.id)}
                                  className="font-display font-bold text-xs text-ink-near hover:text-stormy-teal cursor-pointer line-clamp-1"
                                >
                                  {item.title}
                                </h4>
                                <span className="text-[10px] text-gray-500">{item.logistics.city} • {item.quantity} {item.unit}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4 font-bold text-ink-near">
                            ₹{bidInfo?.highestUserBid.toLocaleString('en-IN')}
                          </td>

                          <td className="p-4 font-display font-black text-sm text-stormy-teal">
                            ₹{item.currentBid?.toLocaleString('en-IN')}
                          </td>

                          <td className="p-4">
                            {bidInfo?.status === 'Leading' && (
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-700 rounded-brutal text-[11px] font-bold uppercase shadow-brutal-xs inline-flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Leading
                              </span>
                            )}
                            {bidInfo?.status === 'Outbid' && (
                              <span className="px-2.5 py-1 bg-amber-100 text-red-700 border border-amber-500 rounded-brutal text-[11px] font-bold uppercase shadow-brutal-xs inline-flex items-center gap-1">
                                <Flame className="w-3.5 h-3.5" />
                                Outbid
                              </span>
                            )}
                            {bidInfo?.status === 'Won' && (
                              <span className="px-2.5 py-1 bg-teal-100 text-stormy-dark border border-stormy-teal rounded-brutal text-[11px] font-bold uppercase">
                                Auction Won!
                              </span>
                            )}
                          </td>

                          <td className="p-4">
                            {item.auctionEnd && <AuctionTimer endTime={item.auctionEnd} compact />}
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {bidInfo?.status === 'Outbid' && (
                                <button
                                  onClick={() => setRebidListing(item)}
                                  className="px-3 py-1.5 rounded-brutal border border-ink-near bg-stormy-teal text-white font-bold text-[10px] uppercase shadow-brutal-xs hover:bg-stormy-dark flex items-center gap-1"
                                >
                                  <RotateCw className="w-3 h-3 text-papaya" />
                                  <span>Re-bid (₹{minNext.toLocaleString('en-IN')})</span>
                                </button>
                              )}

                              <button
                                onClick={() => openListingDetail(item.id)}
                                className="p-1.5 rounded-brutal border border-ink-near bg-white hover:bg-gray-100"
                                title="Inspect Lot"
                              >
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SAVED TAB CONTENT */}
        {activeTab === 'saved' && (
          <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal-lg">
            {savedListings.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-brutal bg-gray-100 border border-ink-near mx-auto flex items-center justify-center">
                  <Bookmark className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-display font-bold text-base text-ink-near">No Saved Lots</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto font-mono">
                  Bookmark interesting scrap lots or motherboards to monitor bidding in real time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedListings.map(item => (
                  <div key={item.id} className="bg-surface-canvas rounded-brutal-lg border-2 border-ink-near p-4 shadow-brutal-xs flex flex-col justify-between space-y-3">
                    <div className="flex items-start gap-3">
                      <img src={item.coverImage} alt="" className="w-16 h-16 rounded-brutal border border-ink-near object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 
                          onClick={() => openListingDetail(item.id)}
                          className="font-display font-bold text-xs text-ink-near hover:text-stormy-teal cursor-pointer line-clamp-2"
                        >
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-mono text-gray-500">{item.logistics.city} • {item.quantity} {item.unit}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-gray-500 block">Current Price</span>
                        <span className="font-display font-bold text-sm text-ink-near">
                          ₹{(item.currentBid || item.startingBid || item.askingPrice)?.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSaveListing(item.id)}
                          className="p-1.5 rounded-brutal border border-gray-300 bg-white hover:bg-red-50 text-gray-500 hover:text-red-600"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openListingDetail(item.id)}
                          className="px-3 py-1.5 rounded-brutal border border-ink-near bg-stormy-teal text-white font-mono font-bold text-[10px] uppercase shadow-brutal-xs"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Re-bid Modal */}
        {rebidListing && (
          <BidModal
            listing={rebidListing}
            bidAmount={(rebidListing.currentBid || 0) + (rebidListing.bidIncrement || 100)}
            isOpen={Boolean(rebidListing)}
            onClose={() => setRebidListing(null)}
            onSuccess={() => setRebidListing(null)}
          />
        )}
      </div>
    </div>
  );
};
