import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { PLATFORM_STATS } from '../../data/mockData';
import { 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck, 
  TrendingUp, 
  Leaf, 
  Scale, 
  Gavel, 
  Sparkles 
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab, setFilterState } = useMarketplace();

  const scrollToMarket = () => {
    const el = document.getElementById('marketplace-listings-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-surface-canvas border-b-3 border-ink-near py-12 lg:py-16">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Mission & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-brutal border-2 border-ink-near bg-papaya text-ink-near text-xs font-mono font-bold shadow-brutal-xs">
              <Sparkles className="w-3.5 h-3.5 text-stormy-teal animate-spin-slow" />
              <span>Certified Industrial E-Waste Trading Exchange</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-ink-near tracking-tight leading-[1.08]">
              Give electronics <br />
              <span className="text-stormy-teal underline decoration-papaya decoration-wavy underline-offset-8">
                a second life.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gunmetal leading-relaxed max-w-xl font-sans">
              The professional listing and bidding marketplace for recovered electronic waste, decommissioned IT assets, high-grade circuit boards, and industrial recyclable materials.
            </p>

            {/* Zero-Checkout Badge notice */}
            <div className="flex items-center gap-2 text-xs font-mono text-gray-600 bg-white/80 backdrop-blur-sm border border-ink-near rounded-brutal px-3 py-1.5 w-fit shadow-brutal-xs">
              <span className="font-bold text-stormy-teal">Model:</span>
              <span>Discover → Inspect → Bid → Negotiate Directly</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToMarket}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-bold text-sm uppercase tracking-wider transition-all shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <span>Browse Live Listings</span>
                <ArrowRight className="w-4 h-4 text-papaya" />
              </button>

              <button
                onClick={() => setActiveTab('post-listing')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-brutal border-2 border-ink-near bg-surface-pure hover:bg-papaya text-ink-near font-display font-bold text-sm uppercase tracking-wider transition-all shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <PlusCircle className="w-4 h-4 text-stormy-teal" />
                <span>Post E-Waste Lot</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-gunmetal">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>CPCB Verified Sellers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gavel className="w-4 h-4 text-stormy-teal" />
                <span>Anonymized Escrow Bidding</span>
              </div>
            </div>
          </div>

          {/* Right Column: Circular Impact Bento Box */}
          <div className="lg:col-span-5">
            <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal-lg relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-ink-near">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-brutal bg-stormy-teal border border-ink-near flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-papaya" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-ink-near uppercase">Circular Impact Index</h3>
                    <p className="text-[10px] font-mono text-gray-500">Live Indian National Metrics</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-brutal bg-emerald-100 text-emerald-800 border border-emerald-700 text-[10px] font-mono font-bold uppercase">
                  Active
                </span>
              </div>

              {/* 2x2 Bento Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3.5 bg-surface-canvas rounded-brutal border-2 border-ink-near shadow-brutal-xs">
                  <div className="flex items-center justify-between text-gray-500 mb-1">
                    <span className="text-[11px] font-mono uppercase font-bold">E-Waste Diverted</span>
                    <TrendingUp className="w-3.5 h-3.5 text-stormy-teal" />
                  </div>
                  <div className="font-display font-black text-2xl text-ink-near">{PLATFORM_STATS.tonsDiverted}</div>
                  <span className="text-[10px] font-mono text-gray-500">Metric Tons</span>
                </div>

                <div className="p-3.5 bg-surface-canvas rounded-brutal border-2 border-ink-near shadow-brutal-xs">
                  <div className="flex items-center justify-between text-gray-500 mb-1">
                    <span className="text-[11px] font-mono uppercase font-bold">CO₂ Avoided</span>
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="font-display font-black text-2xl text-emerald-700">{PLATFORM_STATS.co2AvoidedTons} T</div>
                  <span className="text-[10px] font-mono text-gray-500">Carbon Offset</span>
                </div>

                <div className="p-3.5 bg-surface-canvas rounded-brutal border-2 border-ink-near shadow-brutal-xs">
                  <div className="flex items-center justify-between text-gray-500 mb-1">
                    <span className="text-[11px] font-mono uppercase font-bold">Precious Metals</span>
                    <Scale className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="font-display font-black text-2xl text-amber-600">{PLATFORM_STATS.preciousMetalsGrams}</div>
                  <span className="text-[10px] font-mono text-gray-500">Gold / Silver / Palladium</span>
                </div>

                <div className="p-3.5 bg-papaya rounded-brutal border-2 border-ink-near shadow-brutal-xs">
                  <div className="flex items-center justify-between text-gunmetal mb-1">
                    <span className="text-[11px] font-mono uppercase font-bold">Value Recovered</span>
                    <TrendingUp className="w-3.5 h-3.5 text-stormy-teal" />
                  </div>
                  <div className="font-display font-black text-2xl text-ink-near">{PLATFORM_STATS.valueRecoveredInr}</div>
                  <span className="text-[10px] font-mono text-gray-600">Circulated Capital</span>
                </div>
              </div>

              {/* Bottom live auctions ticker */}
              <div className="mt-4 p-3 bg-stormy-soft rounded-brutal border border-ink-near flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span className="font-bold text-stormy-dark">184 Live Auctions Active</span>
                </div>
                <button
                  onClick={() => {
                    setFilterState(prev => ({ ...prev, listingType: 'Auction' }));
                    scrollToMarket();
                  }}
                  className="font-bold text-stormy-teal hover:underline"
                >
                  View Live →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
