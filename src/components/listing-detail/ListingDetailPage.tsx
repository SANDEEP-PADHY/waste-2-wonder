import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ImageGallery } from './ImageGallery';
import { BiddingPanel } from './BiddingPanel';
import { TechnicalSpecs } from './TechnicalSpecs';
import { EWasteSafetyInfo } from './EWasteSafetyInfo';
import { LogisticsCard } from './LogisticsCard';
import { SellerTrustCard } from './SellerTrustCard';
import { ReportListingModal } from './ReportListingModal';
import { ListingMessagingModal } from './ListingMessagingModal';
import { StatusBadge } from '../common/StatusBadge';
import { ListingCard } from '../marketplace/ListingCard';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Layers, 
  AlertCircle,
  Share2,
  Bookmark
} from 'lucide-react';

export const ListingDetailPage: React.FC = () => {
  const { 
    selectedListingId, 
    listings, 
    setActiveTab, 
    setSelectedListingId,
    isSaved,
    toggleSaveListing
  } = useMarketplace();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const listing = listings.find(l => l.id === selectedListingId) || listings[0];
  const saved = isSaved(listing.id);

  const relatedListings = listings
    .filter(l => l.id !== listing.id && (l.category === listing.category || l.sellerId === listing.sellerId))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-surface-canvas py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setActiveTab('marketplace');
              setSelectedListingId(null);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-brutal border-2 border-ink-near bg-white hover:bg-gray-100 font-mono font-bold text-xs text-ink-near shadow-brutal-xs transition-transform active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-stormy-teal" />
            <span>Back to All Listings</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-500">
            <span>Marketplace</span>
            <span>/</span>
            <span className="font-bold text-ink-near">{listing.category}</span>
            <span>/</span>
            <span className="truncate max-w-[200px] text-gray-400">{listing.title}</span>
          </div>
        </div>

        {/* Title & Metadata Header Banner */}
        <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge listingType={listing.listingType} size="sm" />
            <StatusBadge condition={listing.condition} size="sm" />
            <span className="text-xs font-mono font-bold text-stormy-teal bg-stormy-soft px-2.5 py-0.5 rounded-brutal border border-stormy-teal">
              Lot ID: {listing.id.toUpperCase()}
            </span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-ink-near tracking-tight leading-tight">
            {listing.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-gray-600 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400">Seller:</span>
              <span className="font-bold text-ink-near">{listing.seller.name}</span>
              {listing.seller.verificationStatus === 'Verified' && (
                <ShieldCheck className="w-3.5 h-3.5 text-stormy-teal" />
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stormy-teal" />
              <span>{listing.logistics.city}, {listing.logistics.state}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gunmetal" />
              <span>Lot Size: {listing.quantity} {listing.unit} ({listing.weight} KG)</span>
            </div>

            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Listed on {new Date(listing.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Inspection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Images, Description, Tech Specs, E-Waste Safety, Logistics) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={listing.images} title={listing.title} />

            {/* Description Card */}
            <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal space-y-3">
              <h3 className="font-display font-black text-base text-ink-near uppercase pb-2 border-b-2 border-ink-near">
                Detailed Lot & Condition Description
              </h3>
              <p className="text-xs sm:text-sm font-sans text-gunmetal leading-relaxed whitespace-pre-line pt-1">
                {listing.description}
              </p>
            </div>

            {/* Technical Hardware Specs */}
            <TechnicalSpecs specs={listing.technicalSpecs} />

            {/* E-Waste & Safety Assessment */}
            <EWasteSafetyInfo eWaste={listing.eWasteDetails} />

            {/* Logistics & Pickup Card */}
            <LogisticsCard logistics={listing.logistics} />
          </div>

          {/* Right Column (Sticky Bidding & Negotiation Box, Seller Trust Profile) */}
          <div className="lg:col-span-5 space-y-8 sticky top-20">
            {/* Bidding Panel */}
            <BiddingPanel
              listing={listing}
              onOpenReport={() => setIsReportModalOpen(true)}
              onOpenMessage={() => setIsMessageModalOpen(true)}
            />

            {/* Seller Trust Profile Card */}
            <SellerTrustCard
              seller={listing.seller}
              onOpenMessage={() => setIsMessageModalOpen(true)}
            />
          </div>
        </div>

        {/* Related Lots Section */}
        {relatedListings.length > 0 && (
          <div className="pt-8 border-t-3 border-ink-near space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-black text-2xl text-ink-near uppercase">
                  Similar E-Waste Lots & Component Harvests
                </h3>
                <p className="text-xs font-mono text-gray-500">More recyclable stock from this category</p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('marketplace');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="font-mono text-xs font-bold text-stormy-teal hover:underline"
              >
                View All in Category →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedListings.map(rListing => (
                <ListingCard key={rListing.id} listing={rListing} layout="grid" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ReportListingModal
        listing={listing}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <ListingMessagingModal
        listing={listing}
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
      />
    </div>
  );
};
