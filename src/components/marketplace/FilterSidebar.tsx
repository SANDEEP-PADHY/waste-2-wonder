import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MOCK_CATEGORIES, INDIAN_CITIES } from '../../data/mockData';
import { 
  Filter, 
  RotateCcw, 
  Gavel, 
  Handshake, 
  MapPin, 
  Check, 
  ShieldCheck, 
  Leaf, 
  AlertTriangle,
  HardDriveDownload,
  Battery
} from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  const { filterState, setFilterState, resetFilters, listings } = useMarketplace();

  const conditions = [
    'Tested & Working',
    'Partially Working',
    'For Parts',
    'Salvage / Non-Working',
    'Mixed Scrap Lot'
  ];

  const handleConditionToggle = (cond: string) => {
    setFilterState(prev => {
      const exists = prev.condition.includes(cond);
      const updated = exists 
        ? prev.condition.filter(c => c !== cond) 
        : [...prev.condition, cond];
      return { ...prev, condition: updated };
    });
  };

  const selectedCategoryObj = MOCK_CATEGORIES.find(c => c.name === filterState.category);

  return (
    <aside className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-5 shadow-brutal space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-ink-near">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-stormy-teal" />
          <h3 className="font-display font-black text-sm uppercase tracking-wider text-ink-near">
            Filters
          </h3>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-[11px] font-mono font-bold text-gray-500 hover:text-stormy-teal transition-colors px-2 py-1 rounded-brutal hover:bg-gray-100"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Listing Format (Auction vs Negotiable) */}
      <div className="space-y-2.5">
        <label className="text-xs font-mono font-bold uppercase text-gray-600 block">
          Trading Format
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-canvas rounded-brutal border border-ink-near">
          {(['All', 'Auction', 'Negotiable'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterState(prev => ({ ...prev, listingType: type }))}
              className={`py-1.5 px-2 rounded-brutal text-[11px] font-mono font-bold transition-all ${
                filterState.listingType === type
                  ? 'bg-stormy-teal text-white shadow-brutal-xs'
                  : 'text-gunmetal hover:bg-gray-200'
              }`}
            >
              {type === 'Auction' ? 'Live Bid' : type === 'Negotiable' ? 'Offer' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Category & Subcategory */}
      <div className="space-y-2.5">
        <label className="text-xs font-mono font-bold uppercase text-gray-600 block">
          Category
        </label>
        <select
          value={filterState.category}
          onChange={e => setFilterState(prev => ({ ...prev, category: e.target.value, subcategory: '' }))}
          className="w-full px-3 py-2 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans font-medium focus:outline-none focus:bg-white"
        >
          <option value="All">All Categories ({listings.length} Lots)</option>
          {MOCK_CATEGORIES.map(c => (
            <option key={c.id} value={c.name}>
              {c.name} ({c.count})
            </option>
          ))}
        </select>

        {selectedCategoryObj && selectedCategoryObj.subcategories.length > 0 && (
          <div className="pt-2">
            <label className="text-[11px] font-mono font-bold uppercase text-gray-500 block mb-1.5">
              Subcategory
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setFilterState(prev => ({ ...prev, subcategory: '' }))}
                className={`w-full text-left px-2.5 py-1 text-xs rounded-brutal ${
                  filterState.subcategory === ''
                    ? 'bg-stormy-soft text-stormy-teal font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Subcategories
              </button>
              {selectedCategoryObj.subcategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setFilterState(prev => ({ ...prev, subcategory: sub }))}
                  className={`w-full text-left px-2.5 py-1 text-xs rounded-brutal ${
                    filterState.subcategory === sub
                      ? 'bg-stormy-soft text-stormy-teal font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Condition Multi-select */}
      <div className="space-y-2.5">
        <label className="text-xs font-mono font-bold uppercase text-gray-600 block">
          Hardware Condition
        </label>
        <div className="space-y-2">
          {conditions.map(cond => {
            const isChecked = filterState.condition.includes(cond);
            return (
              <label
                key={cond}
                onClick={() => handleConditionToggle(cond)}
                className="flex items-center gap-2.5 text-xs text-ink-near cursor-pointer group select-none"
              >
                <div
                  className={`w-4 h-4 rounded-brutal border-2 border-ink-near flex items-center justify-center transition-all ${
                    isChecked ? 'bg-stormy-teal text-white' : 'bg-white group-hover:bg-gray-100'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={isChecked ? 'font-bold text-stormy-teal' : 'text-gunmetal'}>
                  {cond}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Regional Location & Distance */}
      <div className="space-y-2.5">
        <label className="text-xs font-mono font-bold uppercase text-gray-600 block">
          Location Hub
        </label>
        <div className="relative">
          <select
            value={filterState.locationCity}
            onChange={e => setFilterState(prev => ({ ...prev, locationCity: e.target.value }))}
            className="w-full px-3 py-2 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans font-medium focus:outline-none focus:bg-white"
          >
            {INDIAN_CITIES.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {filterState.locationCity !== 'All India' && (
          <div className="pt-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-600 mb-1">
              <span>Radius Distance</span>
              <span className="font-bold text-ink-near">Within {filterState.maxDistanceKm} KM</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={filterState.maxDistanceKm}
              onChange={e => setFilterState(prev => ({ ...prev, maxDistanceKm: Number(e.target.value) }))}
              className="w-full accent-stormy-teal"
            />
          </div>
        )}
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold uppercase text-gray-600">
            Price / Starting Bid
          </label>
          <span className="text-[11px] font-mono font-bold text-stormy-teal">
            Up to ₹{filterState.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="200000"
          step="1000"
          value={filterState.maxPrice}
          onChange={e => setFilterState(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-stormy-teal"
        />
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
          <span>₹1,000</span>
          <span>₹1,00,000</span>
          <span>₹2,00,000+</span>
        </div>
      </div>

      {/* Safety & Compliance Fast Toggles */}
      <div className="space-y-3 pt-2 border-t-2 border-ink-near">
        <label className="text-xs font-mono font-bold uppercase text-gray-600 block">
          Safety & Compliance
        </label>

        {/* RoHS toggle */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-gunmetal group-hover:text-ink-near">RoHS Compliant (Lead Free)</span>
          </div>
          <input
            type="checkbox"
            checked={filterState.rohsOnly}
            onChange={e => setFilterState(prev => ({ ...prev, rohsOnly: e.target.checked }))}
            className="rounded border-ink-near text-stormy-teal focus:ring-stormy-teal"
          />
        </label>

        {/* Data Wiped toggle */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-xs">
            <HardDriveDownload className="w-3.5 h-3.5 text-stormy-teal" />
            <span className="text-gunmetal group-hover:text-ink-near">NIST 800-88 Data Sanitized</span>
          </div>
          <input
            type="checkbox"
            checked={filterState.dataWipedOnly}
            onChange={e => setFilterState(prev => ({ ...prev, dataWipedOnly: e.target.checked }))}
            className="rounded border-ink-near text-stormy-teal focus:ring-stormy-teal"
          />
        </label>

        {/* Battery included toggle */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-xs">
            <Battery className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-gunmetal group-hover:text-ink-near">Battery Included Only</span>
          </div>
          <input
            type="checkbox"
            checked={filterState.batteryIncluded}
            onChange={e => setFilterState(prev => ({ ...prev, batteryIncluded: e.target.checked }))}
            className="rounded border-ink-near text-stormy-teal focus:ring-stormy-teal"
          />
        </label>
      </div>
    </aside>
  );
};
