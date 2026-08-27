import React from 'react';
import { HeroSection } from './HeroSection';
import { CategoryBar } from './CategoryBar';
import { FilterSidebar } from './FilterSidebar';
import { ListingGrid } from './ListingGrid';
import { 
  Search, 
  Eye, 
  Gavel, 
  Truck, 
  ShieldCheck, 
  CheckCircle2,
  FileCheck,
  Building2,
  Leaf
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const MarketplaceHome: React.FC = () => {
  const { setActiveTab } = useMarketplace();

  return (
    <div className="min-h-screen bg-surface-canvas flex flex-col">
      {/* Hero Banner with Impact Stats */}
      <HeroSection />

      {/* Category Filter Rail */}
      <CategoryBar />

      {/* Main Listings Discovery Section */}
      <main id="marketplace-listings-section" className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Filter Sidebar (4 cols) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-24">
              <FilterSidebar />
            </div>

            {/* Main Listings Grid / List (8 cols) */}
            <div className="lg:col-span-8">
              <ListingGrid />
            </div>
          </div>
        </div>
      </main>

      {/* How It Works Section (4 Steps) */}
      <section className="bg-surface-pure border-t-3 border-b-3 border-ink-near py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-brutal border-2 border-ink-near bg-papaya text-xs font-mono font-bold uppercase shadow-brutal-xs">
              <span>Circular Economy Lifecycle</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-ink-near uppercase tracking-tight">
              How Waste2Wonder Works
            </h2>
            <p className="text-xs sm:text-sm font-sans text-gunmetal max-w-lg mx-auto">
              A transparent B2B exchange engineered specifically for e-waste disposal, component harvesting, and precious metal refining.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 bg-surface-canvas rounded-brutal-xl border-3 border-ink-near shadow-brutal space-y-3 relative group hover:translate-y-[-2px] transition-transform">
              <div className="w-12 h-12 rounded-brutal bg-stormy-teal text-papaya border-2 border-ink-near flex items-center justify-center font-display font-black text-xl shadow-brutal-xs">
                1
              </div>
              <h3 className="font-display font-black text-base text-ink-near uppercase">
                Discover & Filter Lots
              </h3>
              <p className="text-xs text-gunmetal font-sans leading-relaxed">
                Filter by e-waste category (PCBs, servers, lithium batteries), condition, CPCB compliance, and regional Indian hubs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-surface-canvas rounded-brutal-xl border-3 border-ink-near shadow-brutal space-y-3 relative group hover:translate-y-[-2px] transition-transform">
              <div className="w-12 h-12 rounded-brutal bg-stormy-teal text-papaya border-2 border-ink-near flex items-center justify-center font-display font-black text-xl shadow-brutal-xs">
                2
              </div>
              <h3 className="font-display font-black text-base text-ink-near uppercase">
                Inspect Technical Specs
              </h3>
              <p className="text-xs text-gunmetal font-sans leading-relaxed">
                Review high-res photos, chip architecture, hazardous element disclosures, and data wiping certificates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-surface-canvas rounded-brutal-xl border-3 border-ink-near shadow-brutal space-y-3 relative group hover:translate-y-[-2px] transition-transform">
              <div className="w-12 h-12 rounded-brutal bg-stormy-teal text-papaya border-2 border-ink-near flex items-center justify-center font-display font-black text-xl shadow-brutal-xs">
                3
              </div>
              <h3 className="font-display font-black text-base text-ink-near uppercase">
                Bid or Propose Offer
              </h3>
              <p className="text-xs text-gunmetal font-sans leading-relaxed">
                Participate in live countdown auctions or submit negotiable price proposals directly to verified corporate sellers.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-surface-canvas rounded-brutal-xl border-3 border-ink-near shadow-brutal space-y-3 relative group hover:translate-y-[-2px] transition-transform">
              <div className="w-12 h-12 rounded-brutal bg-stormy-teal text-papaya border-2 border-ink-near flex items-center justify-center font-display font-black text-xl shadow-brutal-xs">
                4
              </div>
              <h3 className="font-display font-black text-base text-ink-near uppercase">
                Physical Yard Settlement
              </h3>
              <p className="text-xs text-gunmetal font-sans leading-relaxed">
                Inspect physical lots at the warehouse yard, verify weights, sign EPR manifests, and settle transactions directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-14 bg-surface-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-papaya rounded-brutal-2xl border-3 border-ink-near p-8 sm:p-12 shadow-brutal-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-ink-near rounded-brutal text-xs font-mono font-bold text-ink-near">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Retail Checkout • 100% Circular Exchange</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-ink-near uppercase tracking-tight">
                Ready to list or bid on recyclable electronics?
              </h2>
              <p className="text-xs sm:text-sm font-sans text-gunmetal leading-relaxed">
                Join 640+ authorized recyclers, dismantling plants, and corporate IT asset managers across India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={() => setActiveTab('post-listing')}
                className="px-6 py-3.5 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-bold text-xs uppercase tracking-wider shadow-brutal active:translate-y-0.5"
              >
                Post E-Waste Lot
              </button>
              <button
                onClick={() => {
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-brutal border-2 border-ink-near bg-white hover:bg-gray-100 text-ink-near font-display font-bold text-xs uppercase tracking-wider shadow-brutal active:translate-y-0.5"
              >
                Inspect Live Auctions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
