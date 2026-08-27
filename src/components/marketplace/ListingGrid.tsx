import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ListingCard } from './ListingCard';
import { 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  SlidersHorizontal, 
  X, 
  AlertCircle, 
  Flame, 
  Sparkles 
} from 'lucide-react';
import { FilterDrawer } from './FilterDrawer';

export const ListingGrid: React.FC = () => {
  const { listings, filterState, setFilterState, resetFilters } = useMarketplace();
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Apply filters
  const filteredListings = listings.filter(item => {
    // Search filter
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchBrand = item.technicalSpecs.brand.toLowerCase().includes(q);
      const matchMat = item.eWasteDetails.materialType.some(m => m.toLowerCase().includes(q));
      if (!matchTitle && !matchCat && !matchDesc && !matchBrand && !matchMat) {
        return false;
      }
    }

    // Category filter
    if (filterState.category !== 'All' && item.category !== filterState.category) {
      return false;
    }

    // Subcategory filter
    if (filterState.subcategory && item.subcategory !== filterState.subcategory) {
      return false;
    }

    // Condition filter
    if (filterState.condition.length > 0 && !filterState.condition.includes(item.condition)) {
      return false;
    }

    // Location Hub filter
    if (filterState.locationCity !== 'All India') {
      const cityPrefix = filterState.locationCity.split(',')[0].trim().toLowerCase();
      if (!item.logistics.city.toLowerCase().includes(cityPrefix)) {
        return false;
      }
    }

    // Trading Type filter
    if (filterState.listingType === 'Auction' && item.listingType !== 'Auction') {
      return false;
    }
    if (filterState.listingType === 'Negotiable' && item.listingType !== 'Negotiable Offer') {
      return false;
    }

    // Max Price filter
    const effectivePrice = item.listingType === 'Auction' ? (item.currentBid || item.startingBid || 0) : (item.askingPrice || 0);
    if (effectivePrice > filterState.maxPrice) {
      return false;
    }

    // RoHS Compliant filter
    if (filterState.rohsOnly && !item.eWasteDetails.rohsCompliant) {
      return false;
    }

    // Data Sanitized filter
    if (filterState.dataWipedOnly && !item.eWasteDetails.dataWiped) {
      return false;
    }

    // Battery Included filter
    if (filterState.batteryIncluded && !item.eWasteDetails.batteryIncluded) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (filterState.sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'ending_soon': {
        const timeA = a.auctionEnd ? new Date(a.auctionEnd).getTime() : Infinity;
        const timeB = b.auctionEnd ? new Date(b.auctionEnd).getTime() : Infinity;
        return timeA - timeB;
      }
      case 'lowest_bid': {
        const priceA = a.listingType === 'Auction' ? (a.currentBid || a.startingBid || 0) : (a.askingPrice || 0);
        const priceB = b.listingType === 'Auction' ? (b.currentBid || b.startingBid || 0) : (b.askingPrice || 0);
        return priceA - priceB;
      }
      case 'highest_bid': {
        const priceA = a.listingType === 'Auction' ? (a.currentBid || a.startingBid || 0) : (a.askingPrice || 0);
        const priceB = b.listingType === 'Auction' ? (b.currentBid || b.startingBid || 0) : (b.askingPrice || 0);
        return priceB - priceA;
      }
      case 'most_viewed':
        return b.viewCount - a.viewCount;
      default:
        // recommended (featured first)
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  // Ending soon spotlight lot
  const endingSoonLot = listings.find(l => l.status === 'Ending Soon' && l.listingType === 'Auction');

  return (
    <div className="space-y-6">
      {/* Ending Soon Alert Banner */}
      {endingSoonLot && filterState.listingType !== 'Negotiable' && (
        <div className="p-4 bg-papaya rounded-brutal-xl border-3 border-ink-near shadow-brutal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-brutal bg-red-500 text-white border-2 border-ink-near flex items-center justify-center shrink-0 animate-pulse">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm uppercase text-ink-near tracking-wide">
                  Live Auction Ending Soon:
                </span>
                <span className="text-xs font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-brutal border border-red-400">
                  Closing Today
                </span>
              </div>
              <p className="text-xs font-sans text-gunmetal mt-0.5 font-medium line-clamp-1">
                {endingSoonLot.title} — Current Bid ₹{endingSoonLot.currentBid?.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setFilterState(prev => ({ ...prev, sortBy: 'ending_soon', listingType: 'Auction' }));
            }}
            className="px-4 py-2 bg-stormy-teal text-white border-2 border-ink-near rounded-brutal font-display font-bold text-xs uppercase tracking-wider hover:bg-stormy-dark shadow-brutal-xs shrink-0"
          >
            Inspect Auction →
          </button>
        </div>
      )}

      {/* Control Bar: Total count, Sorting, Layout toggle, Mobile filter trigger */}
      <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-4 shadow-brutal flex flex-wrap items-center justify-between gap-4">
        {/* Left Count & Active Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display font-bold text-sm text-ink-near">
            Showing <span className="text-stormy-teal font-black">{sortedListings.length}</span> E-Waste Lots
          </span>

          {filterState.category !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stormy-soft text-stormy-teal border border-stormy-teal rounded-brutal text-xs font-mono font-bold">
              {filterState.category}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                onClick={() => setFilterState(prev => ({ ...prev, category: 'All' }))}
              />
            </span>
          )}

          {filterState.listingType !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-papaya text-ink-near border border-ink-near rounded-brutal text-xs font-mono font-bold">
              {filterState.listingType}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                onClick={() => setFilterState(prev => ({ ...prev, listingType: 'All' }))}
              />
            </span>
          )}

          {filterState.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-200 text-ink-near border border-ink-near rounded-brutal text-xs font-mono">
              "{filterState.searchQuery}"
              <X 
                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
              />
            </span>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-brutal border-2 border-ink-near bg-surface-canvas font-mono font-bold text-xs text-ink-near shadow-brutal-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-stormy-teal" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-gunmetal hidden sm:block" />
            <select
              value={filterState.sortBy}
              onChange={e => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="px-3 py-1.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-mono font-bold focus:outline-none focus:bg-white shadow-brutal-xs cursor-pointer"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="ending_soon">Sort: Ending Soon ⏱</option>
              <option value="newest">Sort: Newest Listed</option>
              <option value="lowest_bid">Sort: Lowest Starting Bid</option>
              <option value="highest_bid">Sort: Highest Current Bid</option>
              <option value="most_viewed">Sort: Most Viewed</option>
            </select>
          </div>

          {/* Layout Toggle (Desktop) */}
          <div className="hidden sm:flex items-center p-1 bg-surface-canvas rounded-brutal border border-ink-near">
            <button
              onClick={() => setLayout('grid')}
              title="Grid View"
              className={`p-1.5 rounded-brutal transition-all ${
                layout === 'grid' ? 'bg-stormy-teal text-white shadow-brutal-xs' : 'text-gunmetal hover:bg-gray-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              title="List View"
              className={`p-1.5 rounded-brutal transition-all ${
                layout === 'list' ? 'bg-stormy-teal text-white shadow-brutal-xs' : 'text-gunmetal hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Listings Container */}
      {sortedListings.length === 0 ? (
        <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-12 text-center shadow-brutal">
          <div className="w-16 h-16 rounded-brutal-lg bg-papaya border-2 border-ink-near mx-auto flex items-center justify-center mb-4 shadow-brutal-sm">
            <AlertCircle className="w-8 h-8 text-stormy-teal" />
          </div>
          <h3 className="font-display font-black text-xl text-ink-near uppercase">
            No Matching E-Waste Lots Found
          </h3>
          <p className="text-xs text-gunmetal max-w-md mx-auto mt-2 leading-relaxed font-sans">
            We couldn't find any listings matching your current filter criteria. Try expanding your price range, clearing specific tags, or selecting "All Categories".
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 px-6 py-2.5 rounded-brutal border-2 border-ink-near bg-stormy-teal text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-stormy-dark shadow-brutal active:translate-y-0.5"
          >
            Clear All Filters
          </button>
        </div>
      ) : layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} layout="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} layout="list" />
          ))}
        </div>
      )}

      {/* Mobile Filter Drawer */}
      <FilterDrawer 
        isOpen={isMobileFilterOpen} 
        onClose={() => setIsMobileFilterOpen(false)} 
      />
    </div>
  );
};
