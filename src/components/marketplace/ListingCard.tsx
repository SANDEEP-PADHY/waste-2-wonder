import React from 'react';
import { Listing } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { StatusBadge } from '../common/StatusBadge';
import { AuctionTimer } from '../common/AuctionTimer';
import { 
  Bookmark, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Gavel, 
  ArrowRight, 
  Layers, 
  AlertTriangle,
  HardDriveDownload,
  Eye
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  layout?: 'grid' | 'list';
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, layout = 'grid' }) => {
  const { isSaved, toggleSaveListing, openListingDetail } = useMarketplace();
  const saved = isSaved(listing.id);

  const minNextBid = (listing.currentBid || listing.startingBid || 0) + (listing.bidIncrement || 100);

  if (layout === 'list') {
    return (
      <div className="group bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-4 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col sm:flex-row gap-5">
        {/* Left image */}
        <div className="sm:w-60 h-48 sm:h-auto rounded-brutal-lg overflow-hidden border-2 border-ink-near relative shrink-0">
          <img 
            src={listing.coverImage} 
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Top badges on image */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            <StatusBadge listingType={listing.listingType} size="sm" />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveListing(listing.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-brutal border-2 border-ink-near transition-transform active:scale-95 shadow-brutal-xs ${
              saved ? 'bg-papaya text-ink-near' : 'bg-white/90 text-gunmetal hover:text-ink-near'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-ink-near' : ''}`} />
          </button>
        </div>

        {/* Right Info */}
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">
                {listing.category}
              </span>
              <span>•</span>
              <span className="text-[11px] font-mono text-gray-500">
                {listing.quantity} {listing.unit} ({listing.weight} KG)
              </span>
              <span>•</span>
              <StatusBadge condition={listing.condition} size="sm" />
            </div>

            <h3 
              onClick={() => openListingDetail(listing.id)}
              className="font-display font-bold text-lg text-ink-near group-hover:text-stormy-teal transition-colors cursor-pointer line-clamp-1"
            >
              {listing.title}
            </h3>

            <p className="text-xs text-gunmetal line-clamp-2 mt-1 leading-relaxed">
              {listing.description}
            </p>

            {/* Seller & Location row */}
            <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs font-mono text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-ink-near">{listing.seller.name}</span>
                {listing.seller.verificationStatus === 'Verified' && (
                  <span title="CPCB Verified">
                    <ShieldCheck className="w-3.5 h-3.5 text-stormy-teal" />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{listing.seller.rating}</span>
                <span className="text-gray-400 font-normal">({listing.seller.reviewCount})</span>
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-stormy-teal" />
                <span>{listing.logistics.city}, {listing.logistics.state}</span>
              </div>
            </div>
          </div>

          {/* Bottom Pricing & CTA */}
          <div className="pt-3 border-t-2 border-ink-near flex flex-wrap items-center justify-between gap-4">
            <div>
              {listing.listingType === 'Auction' ? (
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Current Highest Bid</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-2xl text-ink-near">
                      ₹{listing.currentBid?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-mono text-gray-500">
                      ({listing.bids.length} bids)
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Asking Price (Negotiable)</span>
                  <span className="font-display font-black text-2xl text-ink-near">
                    ₹{listing.askingPrice?.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {listing.listingType === 'Auction' && listing.auctionEnd && (
                <AuctionTimer endTime={listing.auctionEnd} compact showIcon />
              )}

              <button
                onClick={() => openListingDetail(listing.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-brutal-sm active:translate-y-0.5"
              >
                <span>{listing.listingType === 'Auction' ? 'View & Bid' : 'View Listing'}</span>
                <ArrowRight className="w-4 h-4 text-papaya" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid Layout
  return (
    <div className="group bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b-2 border-ink-near bg-gray-100">
        <img 
          src={listing.coverImage} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          <StatusBadge listingType={listing.listingType} size="sm" />
          {listing.eWasteDetails.hazardousMaterial && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-brutal bg-red-600 text-white font-mono text-[10px] font-bold uppercase shadow-brutal-xs">
              <AlertTriangle className="w-3 h-3" />
              Hazardous
            </span>
          )}
        </div>

        {/* Save Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveListing(listing.id);
          }}
          title={saved ? 'Remove Bookmark' : 'Save Listing'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-brutal border-2 border-ink-near transition-transform active:scale-95 shadow-brutal-xs ${
            saved ? 'bg-papaya text-ink-near' : 'bg-white/90 text-gunmetal hover:text-ink-near'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-ink-near' : ''}`} />
        </button>

        {/* Bottom Timer Pill Overlay */}
        {listing.listingType === 'Auction' && listing.auctionEnd && (
          <div className="absolute bottom-2.5 left-2.5">
            <AuctionTimer endTime={listing.auctionEnd} compact />
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Condition */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-mono uppercase font-bold text-gray-500 truncate">
              {listing.category}
            </span>
            <StatusBadge condition={listing.condition} size="sm" />
          </div>

          {/* Title */}
          <h3 
            onClick={() => openListingDetail(listing.id)}
            className="font-display font-bold text-base text-ink-near group-hover:text-stormy-teal transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {listing.title}
          </h3>

          {/* Quantity & Weight */}
          <div className="flex items-center gap-2 mt-2 text-xs font-mono text-gunmetal">
            <span className="font-bold text-ink-near">{listing.quantity} {listing.unit}</span>
            <span>•</span>
            <span>Weight: {listing.weight} KG</span>
          </div>

          {/* Seller info */}
          <div className="flex items-center justify-between text-xs font-mono text-gray-600 mt-2.5 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 truncate max-w-[150px]">
              <span className="truncate">{listing.seller.name}</span>
              {listing.seller.verificationStatus === 'Verified' && (
                <ShieldCheck className="w-3.5 h-3.5 text-stormy-teal shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 text-amber-600 font-bold shrink-0">
              <Star className="w-3 h-3 fill-amber-500" />
              <span>{listing.seller.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-gray-500 mt-1">
            <MapPin className="w-3 h-3 text-stormy-teal shrink-0" />
            <span className="truncate">{listing.logistics.city}, {listing.logistics.state}</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t-2 border-ink-near">
          {listing.listingType === 'Auction' ? (
            <div className="flex items-end justify-between mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-gray-500 block">Current Bid</span>
                <span className="font-display font-black text-xl text-ink-near">
                  ₹{listing.currentBid?.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right font-mono text-[11px] text-gray-500">
                <span>{listing.bids.length} bids</span>
                <div className="text-[10px] text-stormy-teal font-bold">Min: ₹{minNextBid.toLocaleString('en-IN')}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-end justify-between mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-gray-500 block">Asking Price</span>
                <span className="font-display font-black text-xl text-ink-near">
                  ₹{listing.askingPrice?.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 rounded-brutal font-bold">
                Negotiable
              </span>
            </div>
          )}

          {/* Primary Action Button (Zero checkout) */}
          <button
            onClick={() => openListingDetail(listing.id)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <span>{listing.listingType === 'Auction' ? 'View & Place Bid' : 'View Listing & Inspect'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-papaya" />
          </button>
        </div>
      </div>
    </div>
  );
};
