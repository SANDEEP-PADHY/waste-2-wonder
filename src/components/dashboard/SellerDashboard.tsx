import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { StatusBadge } from '../common/StatusBadge';
import { AuctionTimer } from '../common/AuctionTimer';
import { 
  PlusCircle, 
  Eye, 
  Gavel, 
  CheckCircle2, 
  Pause, 
  Play, 
  Trash2, 
  ArrowUpRight, 
  TrendingUp, 
  Users, 
  ShieldCheck,
  History,
  MessageSquare,
  Clock
} from 'lucide-react';
import { Listing } from '../../types';

export const SellerDashboard: React.FC = () => {
  const { 
    listings, 
    currentUser, 
    setActiveTab, 
    setSelectedListingId, 
    updateListingStatus, 
    deleteListing,
    openListingDetail,
    startOrOpenThread,
    setSelectedThreadId,
    addToast
  } = useMarketplace();

  const [activeSubTab, setActiveSubTab] = useState<'active' | 'ending' | 'ended' | 'all'>('active');
  const [inspectBidsListing, setInspectBidsListing] = useState<Listing | null>(null);

  const sellerListings = listings.filter(l => l.sellerId === currentUser.id || l.seller.id === currentUser.id);

  // Filter based on tab
  const filteredListings = sellerListings.filter(l => {
    if (activeSubTab === 'active') return l.status === 'Active' || l.status === 'Ending Soon';
    if (activeSubTab === 'ending') return l.status === 'Ending Soon';
    if (activeSubTab === 'ended') return l.status === 'Ended' || l.status === 'Sold/Closed';
    return true;
  });

  // Calculate seller stats
  const totalViews = sellerListings.reduce((acc, l) => acc + l.viewCount, 0);
  const totalBidsReceived = sellerListings.reduce((acc, l) => acc + l.bids.length, 0);
  const totalSaves = sellerListings.reduce((acc, l) => acc + l.savesCount, 0);
  const totalActiveValue = sellerListings.reduce((acc, l) => {
    const val = l.listingType === 'Auction' ? (l.currentBid || l.startingBid || 0) : (l.askingPrice || 0);
    return acc + val;
  }, 0);

  const handleContactBidder = (listing: Listing, bidderId: string) => {
    const threadId = startOrOpenThread(listing.id, `Hello! We are reviewing the bids on "${listing.title}" and would like to coordinate warehouse inspection.`);
    setSelectedThreadId(threadId);
    setActiveTab('messages');
  };

  return (
    <div className="min-h-screen bg-surface-canvas py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Title & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-ink-near uppercase tracking-tight">
                Seller Control Center
              </h1>
              <span className="px-2.5 py-0.5 bg-stormy-soft text-stormy-teal border border-stormy-teal rounded-brutal text-xs font-mono font-bold">
                {currentUser.accountType}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-sans text-gunmetal mt-1">
              Manage live scrap lots, inspect incoming recycler bids, and settle physical pickup manifests.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('post-listing')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-bold text-xs uppercase tracking-wider shadow-brutal active:translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4 text-papaya" />
            <span>Create New Lot</span>
          </button>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[11px] font-mono uppercase font-bold">Active Listings</span>
              <Gavel className="w-4 h-4 text-stormy-teal" />
            </div>
            <div className="font-display font-black text-3xl text-ink-near">{sellerListings.length}</div>
            <span className="text-[10px] font-mono text-gray-500">Live on Exchange</span>
          </div>

          <div className="p-4 bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[11px] font-mono uppercase font-bold">Bids Received</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-display font-black text-3xl text-emerald-700">{totalBidsReceived}</div>
            <span className="text-[10px] font-mono text-gray-500">Recycler Proposals</span>
          </div>

          <div className="p-4 bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[11px] font-mono uppercase font-bold">Total Lot Views</span>
              <Eye className="w-4 h-4 text-gunmetal" />
            </div>
            <div className="font-display font-black text-3xl text-ink-near">{totalViews}</div>
            <span className="text-[10px] font-mono text-gray-500">Physical Inspections Viewed</span>
          </div>

          <div className="p-4 bg-papaya rounded-brutal-xl border-3 border-ink-near shadow-brutal">
            <div className="flex items-center justify-between text-gunmetal mb-1">
              <span className="text-[11px] font-mono uppercase font-bold">Trading Volume</span>
              <ShieldCheck className="w-4 h-4 text-stormy-teal" />
            </div>
            <div className="font-display font-black text-3xl text-ink-near">
              ₹{totalActiveValue.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] font-mono text-gray-600">Value in Circulation</span>
          </div>
        </div>

        {/* Listings Table Management Card */}
        <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal-lg overflow-hidden">
          {/* Tabs bar */}
          <div className="p-4 border-b-2 border-ink-near bg-surface-canvas flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-brutal border border-ink-near">
              {[
                { key: 'active', label: 'Active & Live' },
                { key: 'ending', label: 'Ending Soon' },
                { key: 'ended', label: 'Ended & Closed' },
                { key: 'all', label: 'All Lots' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveSubTab(tab.key as any)}
                  className={`px-3 py-1.5 rounded-brutal text-xs font-mono font-bold transition-all ${
                    activeSubTab === tab.key
                      ? 'bg-stormy-teal text-white shadow-brutal-xs'
                      : 'text-gunmetal hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-gray-500">
              Showing {filteredListings.length} of {sellerListings.length} total lots
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {filteredListings.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-mono text-gray-500">No listings found under this tab.</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface-canvas border-b-2 border-ink-near text-[11px] font-bold uppercase text-gray-600">
                  <tr>
                    <th className="p-4">Lot Information</th>
                    <th className="p-4">Condition & Qty</th>
                    <th className="p-4">Price / Highest Bid</th>
                    <th className="p-4">Status & Time</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredListings.map(item => {
                    const highestBid = item.currentBid || item.startingBid || 0;
                    return (
                      <tr key={item.id} className="hover:bg-stormy-soft/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.coverImage}
                              alt=""
                              className="w-12 h-12 rounded-brutal border border-ink-near object-cover shrink-0"
                            />
                            <div>
                              <h4 
                                onClick={() => openListingDetail(item.id)}
                                className="font-display font-bold text-xs text-ink-near hover:text-stormy-teal cursor-pointer line-clamp-1"
                              >
                                {item.title}
                              </h4>
                              <span className="text-[10px] text-gray-500 uppercase">{item.category}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div>
                            <span className="font-bold text-ink-near block">{item.quantity} {item.unit}</span>
                            <span className="text-[10px] text-gray-500">{item.weight} KG • {item.condition}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          {item.listingType === 'Auction' ? (
                            <div>
                              <span className="font-display font-bold text-sm text-ink-near block">
                                ₹{highestBid.toLocaleString('en-IN')}
                              </span>
                              <button
                                onClick={() => setInspectBidsListing(item)}
                                className="text-[10px] text-stormy-teal font-bold hover:underline"
                              >
                                {item.bids.length} bids (Inspect →)
                              </button>
                            </div>
                          ) : (
                            <div>
                              <span className="font-display font-bold text-sm text-ink-near block">
                                ₹{item.askingPrice?.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[10px] text-emerald-700 font-bold">Negotiable</span>
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="space-y-1">
                            <StatusBadge listingType={item.listingType} size="sm" />
                            {item.listingType === 'Auction' && item.auctionEnd && (
                              <div>
                                <AuctionTimer endTime={item.auctionEnd} compact />
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openListingDetail(item.id)}
                              className="p-1.5 rounded-brutal border border-ink-near bg-white hover:bg-gray-100 text-ink-near"
                              title="View Public Listing"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>

                            {item.status === 'Active' ? (
                              <button
                                onClick={() => updateListingStatus(item.id, 'Sold/Closed')}
                                className="px-2.5 py-1 rounded-brutal border border-ink-near bg-emerald-600 text-white font-bold text-[10px] uppercase hover:bg-emerald-700 shadow-brutal-xs"
                                title="Mark Sold & Settle"
                              >
                                Close Deal
                              </button>
                            ) : (
                              <button
                                onClick={() => updateListingStatus(item.id, 'Active')}
                                className="px-2.5 py-1 rounded-brutal border border-ink-near bg-stormy-teal text-white font-bold text-[10px] uppercase shadow-brutal-xs"
                              >
                                Re-activate
                              </button>
                            )}

                            <button
                              onClick={() => deleteListing(item.id)}
                              className="p-1.5 rounded-brutal border border-red-500 bg-red-50 text-red-700 hover:bg-red-100"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Inspect Bids Modal */}
        {inspectBidsListing && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-lg bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-ink-near">
                <div>
                  <h3 className="font-display font-black text-base text-ink-near uppercase">
                    Inspect Incoming Bids
                  </h3>
                  <p className="text-xs font-mono text-gray-500 truncate max-w-sm">
                    {inspectBidsListing.title}
                  </p>
                </div>
                <button
                  onClick={() => setInspectBidsListing(null)}
                  className="px-2.5 py-1 rounded-brutal border border-ink-near font-bold text-xs"
                >
                  Close
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {inspectBidsListing.bids.length === 0 ? (
                  <p className="text-xs text-gray-500 py-4 text-center">No bids recorded on this lot yet.</p>
                ) : (
                  inspectBidsListing.bids.slice().reverse().map((bid, i) => (
                    <div key={bid.id} className="p-3 bg-surface-canvas rounded-brutal border border-ink-near flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="font-bold text-ink-near block">{bid.bidderAnonymousName}</span>
                        <span className="text-[10px] text-gray-500">{new Date(bid.createdAt).toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-display font-black text-base text-stormy-teal">
                          ₹{bid.amount.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => {
                            handleContactBidder(inspectBidsListing, bid.bidderId);
                            setInspectBidsListing(null);
                          }}
                          className="px-2 py-1 rounded-brutal border border-ink-near bg-white hover:bg-papaya font-bold text-[10px]"
                        >
                          Contact Bidder
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
