import React from 'react';
import { Recycle, ShieldCheck, FileCheck, ArrowUpRight, Scale, Leaf, MapPin } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const Footer: React.FC = () => {
  const { setFilterState, setActiveTab, setSelectedListingId } = useMarketplace();

  return (
    <footer className="bg-ink-near text-white border-t-3 border-ink-near mt-auto">
      {/* Upper Circular Economy Banner */}
      <div className="border-b border-gray-800 bg-surface-subtle/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-brutal bg-stormy-teal border-2 border-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-papaya" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">CPCB & GPCB Compliant</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                All scrap aggregators and dismantling partners operate under Extended Producer Responsibility (EPR) guidelines.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-brutal bg-stormy-teal border-2 border-white/20 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5 text-papaya" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Zero Online Checkout</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Transparent listing & live bidding model. Final payments and manifests are settled directly upon physical lot inspection.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-brutal bg-stormy-teal border-2 border-white/20 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-papaya" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">100% Circular Recovery</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Diverting high-grade copper, gold-edge PCBs, lithium cells, and rare earth minerals from unorganized landfill dumps.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-brutal bg-stormy-teal border-2 border-white/20 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-papaya" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Escrow & Bid Privacy</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Bidder identity is anonymized on live public boards to protect commercial bidding competitiveness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-brutal border-2 border-white/30 bg-stormy-teal flex items-center justify-center shadow-brutal-sm">
                <Recycle className="w-5 h-5 text-papaya" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                WASTE<span className="text-stormy-teal">2</span>WONDER
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              India's premier industrial electronic waste and salvage marketplace. Connecting IT recyclers, scrap yards, corporate asset managers, and refurbishers for certified circular exchange.
            </p>
            <div className="pt-2 text-xs font-mono text-gray-500">
              National E-Waste Hub • Registered Office: GIDC Electronics Zone, Sector 25, Gandhinagar - 382028, Gujarat.
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="font-display font-bold text-sm text-papaya uppercase tracking-wider mb-3">
              E-Waste Categories
            </h5>
            <ul className="space-y-2 text-xs text-gray-400 font-sans">
              {['PCBs & Circuit Boards', 'Servers & Networking', 'Batteries & Energy Storage', 'Laptops & Computers', 'Cables & Recoverable Metals', 'Smartphones & Tablets'].map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setFilterState(prev => ({ ...prev, category: cat }));
                      setActiveTab('marketplace');
                      setSelectedListingId(null);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>{cat}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-stormy-teal" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Regional Hubs */}
          <div>
            <h5 className="font-display font-bold text-sm text-papaya uppercase tracking-wider mb-3">
              Regional Hubs
            </h5>
            <ul className="space-y-2 text-xs text-gray-400 font-sans">
              {['Ahmedabad GIDC', 'Vadodara Makarpura', 'Surat Nanpura', 'Mumbai Andheri/Turbhe', 'Bengaluru Peenya', 'Delhi NCR / Noida'].map(loc => (
                <li key={loc}>
                  <button
                    onClick={() => {
                      setFilterState(prev => ({ ...prev, locationCity: loc.split(' ')[0] }));
                      setActiveTab('marketplace');
                      setSelectedListingId(null);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-stormy-teal" />
                    <span>{loc}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform & Compliance */}
          <div>
            <h5 className="font-display font-bold text-sm text-papaya uppercase tracking-wider mb-3">
              Compliance & Safety
            </h5>
            <ul className="space-y-2 text-xs text-gray-400 font-sans">
              <li><span className="hover:text-white cursor-pointer">EPR Framework 2022 Guidelines</span></li>
              <li><span className="hover:text-white cursor-pointer">Hazardous Waste Manifest Rules</span></li>
              <li><span className="hover:text-white cursor-pointer">NIST 800-88 Data Sanitization</span></li>
              <li><span className="hover:text-white cursor-pointer">RoHS Chemical Limits</span></li>
              <li><span className="hover:text-white cursor-pointer">Safe Battery Transport Protocols</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => setActiveTab('admin')}>Admin Moderation Desk</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} Waste2Wonder Marketplace. Built for the Circular Economy.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-papaya">Strict B2B Listing & Bidding Exchange</span>
            <span>•</span>
            <span>No E-Commerce Cart or Payment Gateway</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
