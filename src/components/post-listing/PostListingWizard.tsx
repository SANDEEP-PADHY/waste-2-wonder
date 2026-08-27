import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MOCK_CATEGORIES, INDIAN_CITIES } from '../../data/mockData';
import { ListingCondition, ListingType } from '../../types';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Sparkles, 
  Gavel, 
  Handshake, 
  Leaf, 
  ShieldCheck, 
  Image as ImageIcon,
  Layers,
  MapPin,
  Truck,
  AlertTriangle,
  Info
} from 'lucide-react';
import { ListingCard } from '../marketplace/ListingCard';

export const PostListingWizard: React.FC = () => {
  const { createListing, setActiveTab, setSelectedListingId, currentUser } = useMarketplace();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Category
    category: 'PCBs & Circuit Boards',
    subcategory: 'Motherboards',

    // Step 2: Basic Info
    title: '',
    description: '',
    brand: '',
    model: '',
    partNumber: '',
    condition: 'For Parts' as ListingCondition,
    quantity: 10,
    unit: 'Units' as 'Units' | 'KG' | 'Tons' | 'Pallets' | 'Lots',
    weight: 5.0,

    // Step 3: E-Waste & Safety
    workingStatus: 'Non-working / Scrap' as 'Working' | 'Partially Working' | 'Non-working / Scrap',
    materialTypes: ['FR4 High Grade PCB', 'Gold-plated Edge Connectors', 'Copper Heat Pipes'],
    newMaterialInput: '',
    reusableComponents: ['RAM Sockets', 'SMD Capacitors', 'Voltage Regulators'],
    newComponentInput: '',
    hazardousMaterial: false,
    hazardousDetails: '',
    rohsCompliant: true,
    batteryIncluded: false,
    batteryType: 'None',
    dataStoragePresent: false,
    dataWiped: true,
    dismantledStatus: 'Fully Intact' as 'Fully Intact' | 'Partially Dismantled' | 'Fully Stripped PCB / Shell',

    // Step 4: Photos
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',

    // Step 5: Listing Type & Pricing
    listingType: 'Auction' as ListingType,
    startingBid: 2500,
    reservePrice: 3000,
    bidIncrement: 100,
    auctionDurationDays: 3,
    askingPrice: 4500,
    negotiable: true,

    // Step 6: Logistics
    pickupAvailable: true,
    shippingAvailable: true,
    pickupAddress: 'Phase 2, GIDC Industrial Area',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382445',
    preferredPickupMethod: 'Direct Warehouse Pickup or Certified Freight Truck',
    loadingAssistanceAvailable: true,
    warehouseHours: 'Mon-Sat: 09:30 AM to 06:00 PM'
  });

  const presetPhotos = [
    { name: 'Motherboard Lot', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80' },
    { name: 'Server Rack Lot', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80' },
    { name: 'GPU Scrap Cards', url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80' },
    { name: 'Lithium Battery Packs', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80' },
    { name: 'Bare Copper Cables', url: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80' },
    { name: 'Industrial PLC Boards', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80' }
  ];

  const steps = [
    { id: 1, name: 'Category' },
    { id: 2, name: 'Basic Info' },
    { id: 3, name: 'E-Waste Specs' },
    { id: 4, name: 'Photos' },
    { id: 5, name: 'Listing & Pricing' },
    { id: 6, name: 'Logistics' },
    { id: 7, name: 'Preview & Publish' }
  ];

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePublish = () => {
    const calculatedAuctionEnd = new Date(
      Date.now() + formData.auctionDurationDays * 24 * 60 * 60 * 1000
    ).toISOString();

    const newId = createListing({
      sellerId: currentUser.id,
      seller: currentUser,
      title: formData.title || `${formData.brand} ${formData.model} E-Waste Lot (${formData.quantity} ${formData.unit})`,
      description: formData.description || 'Verified industrial electronic waste lot available for certified recycling and component harvesting.',
      category: formData.category,
      subcategory: formData.subcategory,
      images: formData.images,
      coverImage: formData.coverImage,
      condition: formData.condition,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      weight: Number(formData.weight),
      technicalSpecs: {
        brand: formData.brand || 'OEM Industrial',
        model: formData.model || 'Standard Lot',
        partNumber: formData.partNumber,
        manufacturingYear: 2021,
        weightKg: Number(formData.weight)
      },
      eWasteDetails: {
        eWasteCategory: formData.category,
        materialType: formData.materialTypes,
        estimatedWeightKg: Number(formData.weight),
        reusableComponents: formData.reusableComponents,
        recyclableMaterials: ['High Grade Copper', 'Gold Flash Pins', 'Aluminum Alloy'],
        hazardousMaterial: formData.hazardousMaterial,
        hazardousDetails: formData.hazardousDetails,
        rohsCompliant: formData.rohsCompliant,
        batteryIncluded: formData.batteryIncluded,
        batteryType: formData.batteryType,
        dataStoragePresent: formData.dataStoragePresent,
        dataWiped: formData.dataWiped,
        dismantledStatus: formData.dismantledStatus,
        workingStatus: formData.workingStatus
      },
      logistics: {
        pickupAvailable: formData.pickupAvailable,
        shippingAvailable: formData.shippingAvailable,
        pickupAddress: formData.pickupAddress,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        preferredPickupMethod: formData.preferredPickupMethod,
        loadingAssistanceAvailable: formData.loadingAssistanceAvailable,
        warehouseHours: formData.warehouseHours
      },
      listingType: formData.listingType,
      startingBid: formData.listingType === 'Auction' ? Number(formData.startingBid) : undefined,
      currentBid: formData.listingType === 'Auction' ? Number(formData.startingBid) : undefined,
      reservePrice: formData.listingType === 'Auction' ? Number(formData.reservePrice) : undefined,
      bidIncrement: Number(formData.bidIncrement),
      askingPrice: formData.listingType === 'Negotiable Offer' ? Number(formData.askingPrice) : undefined,
      negotiable: formData.negotiable,
      auctionStart: formData.listingType === 'Auction' ? new Date().toISOString() : undefined,
      auctionEnd: formData.listingType === 'Auction' ? calculatedAuctionEnd : undefined,
      status: 'Active',
      featured: true,
      verifiedListing: true
    });

    setSelectedListingId(newId);
    setActiveTab('listing-detail');
  };

  const selectedCategoryObj = MOCK_CATEGORIES.find(c => c.name === formData.category);

  return (
    <div className="min-h-screen bg-surface-canvas py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-brutal border-2 border-ink-near bg-papaya text-xs font-mono font-bold uppercase shadow-brutal-xs">
            <Sparkles className="w-3.5 h-3.5 text-stormy-teal" />
            <span>7-Step E-Waste Lot Creation</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-ink-near uppercase tracking-tight">
            Post Industrial E-Waste Lot
          </h1>
          <p className="text-xs sm:text-sm font-sans text-gunmetal max-w-md mx-auto">
            List recyclable electronic materials, scrap boards, battery packs, or decommissioned enterprise IT for certified buyers.
          </p>
        </div>

        {/* 7-Step Stepper Header */}
        <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-4 shadow-brutal overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px] gap-2">
            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div 
                  key={step.id} 
                  onClick={() => {
                    if (isCompleted) setCurrentStep(step.id);
                  }}
                  className={`flex items-center gap-2 cursor-pointer ${isCompleted ? 'hover:opacity-80' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-brutal border-2 border-ink-near flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-stormy-teal text-white shadow-brutal-xs'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-surface-canvas text-gray-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={`text-xs font-display font-bold whitespace-nowrap ${isCurrent ? 'text-ink-near' : 'text-gray-400'}`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Form Body */}
        <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 sm:p-8 shadow-brutal-lg">
          {/* STEP 1: CATEGORY */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b-2 border-ink-near pb-3">
                <h3 className="font-display font-black text-xl text-ink-near uppercase">
                  Step 1: Select E-Waste Category & Stream
                </h3>
                <p className="text-xs font-mono text-gray-500">
                  Categorize the primary material stream for compliant recycler matching.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_CATEGORIES.map(cat => {
                  const isSelected = formData.category === cat.name;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.name, subcategory: cat.subcategories[0] || '' }))}
                      className={`p-4 rounded-brutal-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-stormy-teal bg-stormy-soft shadow-brutal-sm'
                          : 'border-ink-near bg-surface-canvas hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-display font-bold text-sm text-ink-near">{cat.name}</h4>
                        {isSelected && <Check className="w-4 h-4 text-stormy-teal" />}
                      </div>
                      <p className="text-xs text-gunmetal leading-snug">{cat.description}</p>
                    </div>
                  );
                })}
              </div>

              {selectedCategoryObj && (
                <div className="pt-4 border-t border-gray-200">
                  <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-2">
                    Subcategory Focus
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategoryObj.subcategories.map(sub => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, subcategory: sub }))}
                        className={`px-3 py-1.5 rounded-brutal text-xs font-mono font-bold border transition-all ${
                          formData.subcategory === sub
                            ? 'bg-stormy-teal text-white border-ink-near shadow-brutal-xs'
                            : 'bg-surface-canvas border-gray-300 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: BASIC INFO */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b-2 border-ink-near pb-3">
                <h3 className="font-display font-black text-xl text-ink-near uppercase">
                  Step 2: Basic Lot Information
                </h3>
                <p className="text-xs font-mono text-gray-500">
                  Give buyers a descriptive title, brand, model series, and physical quantity.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                    Listing Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dell Latitude 5490 Motherboards Lot — 12 Units (Salvage)"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 bg-surface-canvas border-2 border-ink-near rounded-brutal font-display font-bold text-sm text-ink-near focus:outline-none focus:bg-white focus:shadow-brutal-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      Brand / OEM
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dell, Cisco, HP, NVIDIA"
                      value={formData.brand}
                      onChange={e => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      Model / Series
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Latitude 5490 / LA-F401P"
                      value={formData.model}
                      onChange={e => setFormData(prev => ({ ...prev, model: e.target.value }))}
                      className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      Part / Lot Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CN-0N13FD-70166"
                      value={formData.partNumber}
                      onChange={e => setFormData(prev => ({ ...prev, partNumber: e.target.value }))}
                      className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans"
                    />
                  </div>
                </div>

                {/* Condition Selector */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-2">
                    Hardware Condition *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(['Tested & Working', 'Partially Working', 'For Parts', 'Salvage / Non-Working', 'Mixed Scrap Lot'] as ListingCondition[]).map(cond => (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, condition: cond }))}
                        className={`p-2.5 rounded-brutal border text-xs font-mono font-bold transition-all text-left ${
                          formData.condition === cond
                            ? 'bg-stormy-teal text-white border-ink-near shadow-brutal-xs'
                            : 'bg-surface-canvas border-gray-300 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Unit & Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={e => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                      className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      Quantity Unit
                    </label>
                    <select
                      value={formData.unit}
                      onChange={e => setFormData(prev => ({ ...prev, unit: e.target.value as any }))}
                      className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-mono font-bold"
                    >
                      <option value="Units">Units (Pieces)</option>
                      <option value="KG">Kilograms (KG)</option>
                      <option value="Tons">Metric Tons</option>
                      <option value="Pallets">Pallets</option>
                      <option value="Lots">Whole Lots</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      Estimated Weight (in KG) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={formData.weight}
                      onChange={e => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
                      className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                    Lot Description & Condition Summary
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide full details on origin (e.g. corporate IT decommission), visible defects, missing parts, and component recovery highlights..."
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: E-WASTE & SAFETY SPECS */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b-2 border-ink-near pb-3">
                <h3 className="font-display font-black text-xl text-ink-near uppercase">
                  Step 3: E-Waste Technical & Safety Disclosure
                </h3>
                <p className="text-xs font-mono text-gray-500">
                  Mandatory environmental compliance declarations under CPCB E-Waste Management Rules.
                </p>
              </div>

              {/* Working & Dismantled Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                    Operating / Power Status
                  </label>
                  <select
                    value={formData.workingStatus}
                    onChange={e => setFormData(prev => ({ ...prev, workingStatus: e.target.value as any }))}
                    className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-mono"
                  >
                    <option value="Working">100% Tested Working</option>
                    <option value="Partially Working">Partially Working / Intermittent Fault</option>
                    <option value="Non-working / Scrap">Non-working / Pure Scrap Harvest</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                    Dismantling State
                  </label>
                  <select
                    value={formData.dismantledStatus}
                    onChange={e => setFormData(prev => ({ ...prev, dismantledStatus: e.target.value as any }))}
                    className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-mono"
                  >
                    <option value="Fully Intact">Fully Intact (In Enclosure/Chassis)</option>
                    <option value="Partially Dismantled">Partially Dismantled (Casing Removed)</option>
                    <option value="Fully Stripped PCB / Shell">Fully Stripped PCB / Bare Shell</option>
                  </select>
                </div>
              </div>

              {/* Compliance Toggles */}
              <div className="space-y-3 p-4 bg-surface-canvas rounded-brutal-lg border-2 border-ink-near">
                <h4 className="font-display font-bold text-xs uppercase text-ink-near">
                  Compliance & Hazardous Checklist
                </h4>

                <label className="flex items-center justify-between cursor-pointer py-1">
                  <div className="text-xs">
                    <span className="font-bold text-ink-near block">RoHS Compliant (Lead-Free Solder)</span>
                    <span className="text-gray-500">Board manufactured using lead-free SAC305/RoHS alloy.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.rohsCompliant}
                    onChange={e => setFormData(prev => ({ ...prev, rohsCompliant: e.target.checked }))}
                    className="rounded border-ink-near text-stormy-teal focus:ring-stormy-teal w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer py-1 border-t border-gray-200">
                  <div className="text-xs">
                    <span className="font-bold text-ink-near block">Contains Hazardous / Toxic Substance</span>
                    <span className="text-gray-500">Contains mercury lamps, beryllium, or industrial lead.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.hazardousMaterial}
                    onChange={e => setFormData(prev => ({ ...prev, hazardousMaterial: e.target.checked }))}
                    className="rounded border-ink-near text-red-600 focus:ring-red-600 w-4 h-4"
                  />
                </label>

                {formData.hazardousMaterial && (
                  <div className="pt-1">
                    <input
                      type="text"
                      placeholder="Specify hazardous substances (e.g. Mercury CCFL backlights, PCB lead)"
                      value={formData.hazardousDetails}
                      onChange={e => setFormData(prev => ({ ...prev, hazardousDetails: e.target.value }))}
                      className="w-full p-2 bg-white border border-red-400 rounded-brutal text-xs"
                    />
                  </div>
                )}

                <label className="flex items-center justify-between cursor-pointer py-1 border-t border-gray-200">
                  <div className="text-xs">
                    <span className="font-bold text-ink-near block">Battery Included in Lot</span>
                    <span className="text-gray-500">Declare if Li-ion or Lead-Acid cells are bundled.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.batteryIncluded}
                    onChange={e => setFormData(prev => ({ ...prev, batteryIncluded: e.target.checked }))}
                    className="rounded border-ink-near text-amber-600 focus:ring-amber-600 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer py-1 border-t border-gray-200">
                  <div className="text-xs">
                    <span className="font-bold text-ink-near block">Storage Media Wiped (NIST 800-88)</span>
                    <span className="text-gray-500">Hard drives / SSDs sanitized with data destruction log.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.dataWiped}
                    onChange={e => setFormData(prev => ({ ...prev, dataWiped: e.target.checked }))}
                    className="rounded border-ink-near text-stormy-teal focus:ring-stormy-teal w-4 h-4"
                  />
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: PHOTOS */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b-2 border-ink-near pb-3">
                <h3 className="font-display font-black text-xl text-ink-near uppercase">
                  Step 4: Physical Lot Photos
                </h3>
                <p className="text-xs font-mono text-gray-500">
                  High-resolution pictures of circuit boards, serial labels, and lot conditions.
                </p>
              </div>

              {/* Upload Dropzone simulation */}
              <div className="p-8 border-2 border-dashed border-ink-near rounded-brutal-xl bg-surface-canvas text-center space-y-3">
                <div className="w-12 h-12 rounded-brutal bg-stormy-teal text-papaya border-2 border-ink-near mx-auto flex items-center justify-center shadow-brutal-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-sm text-ink-near">
                  Drag & Drop Real E-Waste Photos
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto font-mono">
                  Supported formats: JPG, PNG, WEBP (Max 15MB each). Include close-ups of chipsets and serial numbers.
                </p>
              </div>

              {/* Presets Library */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono font-bold uppercase text-gray-700 block">
                  Quick Select Sample E-Waste Photography Presets:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {presetPhotos.map((p, idx) => {
                    const isCover = formData.coverImage === p.url;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            coverImage: p.url,
                            images: [p.url, ...prev.images.filter(x => x !== p.url)]
                          }));
                        }}
                        className={`p-2 rounded-brutal border-2 cursor-pointer transition-all ${
                          isCover 
                            ? 'border-stormy-teal bg-stormy-soft ring-2 ring-stormy-teal shadow-brutal-xs' 
                            : 'border-ink-near bg-surface-canvas hover:bg-gray-100'
                        }`}
                      >
                        <img src={p.url} alt={p.name} className="w-full h-24 object-cover rounded-brutal border border-ink-near mb-1.5" />
                        <span className="text-[11px] font-mono font-bold text-ink-near block truncate">{p.name}</span>
                        {isCover && (
                          <span className="text-[9px] font-mono font-bold text-stormy-teal uppercase">Cover Photo Selected</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: LISTING TYPE & PRICING */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b-2 border-ink-near pb-3">
                <h3 className="font-display font-black text-xl text-ink-near uppercase">
                  Step 5: Trading Model & Pricing (INR ₹)
                </h3>
                <p className="text-xs font-mono text-gray-500">
                  Select between competitive Live Auction or Fixed Negotiable B2B Offer.
                </p>
              </div>

              {/* Model Selector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setFormData(prev => ({ ...prev, listingType: 'Auction' }))}
                  className={`p-5 rounded-brutal-xl border-3 cursor-pointer transition-all ${
                    formData.listingType === 'Auction'
                      ? 'border-stormy-teal bg-stormy-soft shadow-brutal-sm ring-2 ring-stormy-teal'
                      : 'border-ink-near bg-surface-canvas hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Gavel className="w-5 h-5 text-stormy-teal" />
                    <h4 className="font-display font-black text-base text-ink-near uppercase">
                      Live Auction
                    </h4>
                  </div>
                  <p className="text-xs text-gunmetal leading-relaxed">
                    Set a starting bid, minimum increment, and countdown timer. Certified recyclers bid in real-time.
                  </p>
                </div>

                <div
                  onClick={() => setFormData(prev => ({ ...prev, listingType: 'Negotiable Offer' }))}
                  className={`p-5 rounded-brutal-xl border-3 cursor-pointer transition-all ${
                    formData.listingType === 'Negotiable Offer'
                      ? 'border-stormy-teal bg-papaya shadow-brutal-sm ring-2 ring-stormy-teal'
                      : 'border-ink-near bg-surface-canvas hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Handshake className="w-5 h-5 text-ink-near" />
                    <h4 className="font-display font-black text-base text-ink-near uppercase">
                      Negotiable B2B Offer
                    </h4>
                  </div>
                  <p className="text-xs text-gunmetal leading-relaxed">
                    Set an asking target price. Buyers submit counter-proposals and negotiate directly via chat.
                  </p>
                </div>
              </div>

              {/* Auction Fields */}
              {formData.listingType === 'Auction' ? (
                <div className="space-y-4 p-4 bg-surface-canvas rounded-brutal-lg border-2 border-ink-near">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                        Starting Bid (₹) *
                      </label>
                      <input
                        type="number"
                        min="100"
                        step="100"
                        value={formData.startingBid}
                        onChange={e => setFormData(prev => ({ ...prev, startingBid: Number(e.target.value) }))}
                        className="w-full p-2.5 bg-white border-2 border-ink-near rounded-brutal font-display font-bold text-base"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                        Reserve Floor Price (₹)
                      </label>
                      <input
                        type="number"
                        min="100"
                        step="100"
                        value={formData.reservePrice}
                        onChange={e => setFormData(prev => ({ ...prev, reservePrice: Number(e.target.value) }))}
                        className="w-full p-2.5 bg-white border-2 border-ink-near rounded-brutal font-display font-bold text-base"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                        Minimum Increment (₹)
                      </label>
                      <input
                        type="number"
                        min="50"
                        step="50"
                        value={formData.bidIncrement}
                        onChange={e => setFormData(prev => ({ ...prev, bidIncrement: Number(e.target.value) }))}
                        className="w-full p-2.5 bg-white border-2 border-ink-near rounded-brutal font-mono font-bold text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      Auction Duration
                    </label>
                    <div className="flex gap-2">
                      {[1, 3, 5, 7].map(days => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, auctionDurationDays: days }))}
                          className={`px-4 py-2 rounded-brutal border text-xs font-mono font-bold ${
                            formData.auctionDurationDays === days
                              ? 'bg-stormy-teal text-white border-ink-near shadow-brutal-xs'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {days} {days === 1 ? 'Day' : 'Days'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Negotiable Fields */
                <div className="p-4 bg-surface-canvas rounded-brutal-lg border-2 border-ink-near space-y-4">
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      Target Asking Price (₹) *
                    </label>
                    <input
                      type="number"
                      min="500"
                      step="500"
                      value={formData.askingPrice}
                      onChange={e => setFormData(prev => ({ ...prev, askingPrice: Number(e.target.value) }))}
                      className="w-full p-2.5 bg-white border-2 border-ink-near rounded-brutal font-display font-bold text-xl text-ink-near"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.negotiable}
                      onChange={e => setFormData(prev => ({ ...prev, negotiable: e.target.checked }))}
                      className="rounded border-ink-near text-stormy-teal focus:ring-stormy-teal"
                    />
                    <span className="text-xs font-mono font-bold text-ink-near">
                      Open to volume counter-offers from verified buyers
                    </span>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: LOGISTICS */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b-2 border-ink-near pb-3">
                <h3 className="font-display font-black text-xl text-ink-near uppercase">
                  Step 6: Logistics & Warehouse Pickup Location
                </h3>
                <p className="text-xs font-mono text-gray-500">
                  Where will the winning buyer physically inspect and collect this lot?
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      Regional City Hub *
                    </label>
                    <select
                      value={formData.city}
                      onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-mono font-bold"
                    >
                      {INDIAN_CITIES.filter(c => c !== 'All India').map(city => (
                        <option key={city} value={city.split(',')[0]}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={e => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                      className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                    Warehouse Yard Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.pickupAddress}
                    onChange={e => setFormData(prev => ({ ...prev, pickupAddress: e.target.value }))}
                    className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-gray-700 block mb-1.5">
                    Warehouse Loading Hours
                  </label>
                  <input
                    type="text"
                    value={formData.warehouseHours}
                    onChange={e => setFormData(prev => ({ ...prev, warehouseHours: e.target.value }))}
                    className="w-full p-2.5 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono font-bold text-ink-near">
                    <input
                      type="checkbox"
                      checked={formData.loadingAssistanceAvailable}
                      onChange={e => setFormData(prev => ({ ...prev, loadingAssistanceAvailable: e.target.checked }))}
                      className="rounded border-ink-near text-stormy-teal focus:ring-stormy-teal"
                    />
                    <span>Forklift / Loading Dock Available</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono font-bold text-ink-near">
                    <input
                      type="checkbox"
                      checked={formData.shippingAvailable}
                      onChange={e => setFormData(prev => ({ ...prev, shippingAvailable: e.target.checked }))}
                      className="rounded border-ink-near text-stormy-teal focus:ring-stormy-teal"
                    />
                    <span>Commercial Freight Transport Supported</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: PREVIEW & PUBLISH */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b-2 border-ink-near pb-3">
                <h3 className="font-display font-black text-xl text-ink-near uppercase">
                  Step 7: Final Review & Live Launch
                </h3>
                <p className="text-xs font-mono text-gray-500">
                  Verify your lot specifications before instant publication to the live marketplace.
                </p>
              </div>

              {/* Summary Review Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Card Preview */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-gray-500 block mb-2">
                    Marketplace Card Live Preview:
                  </label>
                  <div className="pointer-events-none opacity-95">
                    <ListingCard
                      listing={{
                        id: 'temp_preview',
                        sellerId: currentUser.id,
                        seller: currentUser,
                        title: formData.title || 'Untitled E-Waste Lot',
                        description: formData.description,
                        category: formData.category,
                        subcategory: formData.subcategory,
                        images: formData.images,
                        coverImage: formData.coverImage,
                        condition: formData.condition,
                        quantity: Number(formData.quantity),
                        unit: formData.unit,
                        weight: Number(formData.weight),
                        technicalSpecs: {
                          brand: formData.brand || 'OEM',
                          model: formData.model || 'Standard',
                          weightKg: Number(formData.weight)
                        },
                        eWasteDetails: {
                          eWasteCategory: formData.category,
                          materialType: formData.materialTypes,
                          estimatedWeightKg: Number(formData.weight),
                          reusableComponents: formData.reusableComponents,
                          recyclableMaterials: ['Copper', 'Gold Pins'],
                          hazardousMaterial: formData.hazardousMaterial,
                          rohsCompliant: formData.rohsCompliant,
                          batteryIncluded: formData.batteryIncluded,
                          dataStoragePresent: formData.dataStoragePresent,
                          dataWiped: formData.dataWiped,
                          dismantledStatus: formData.dismantledStatus,
                          workingStatus: formData.workingStatus
                        },
                        logistics: {
                          pickupAvailable: formData.pickupAvailable,
                          shippingAvailable: formData.shippingAvailable,
                          pickupAddress: formData.pickupAddress,
                          city: formData.city,
                          state: formData.state,
                          pincode: formData.pincode,
                          preferredPickupMethod: formData.preferredPickupMethod,
                          loadingAssistanceAvailable: formData.loadingAssistanceAvailable,
                          warehouseHours: formData.warehouseHours
                        },
                        listingType: formData.listingType,
                        startingBid: formData.startingBid,
                        currentBid: formData.startingBid,
                        askingPrice: formData.askingPrice,
                        bids: [],
                        status: 'Active',
                        viewCount: 1,
                        savesCount: 0,
                        createdAt: new Date().toISOString()
                      }}
                    />
                  </div>
                </div>

                {/* Right Checklist */}
                <div className="space-y-4">
                  <div className="p-4 bg-surface-canvas rounded-brutal border-2 border-ink-near space-y-2 text-xs font-mono">
                    <h4 className="font-display font-bold text-sm text-ink-near uppercase border-b pb-1">
                      Lot Parameters
                    </h4>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-bold text-ink-near">{formData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Trading Model:</span>
                      <span className="font-bold text-stormy-teal">{formData.listingType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price / Starting Bid:</span>
                      <span className="font-bold text-ink-near">
                        ₹{(formData.listingType === 'Auction' ? formData.startingBid : formData.askingPrice)?.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Quantity & Weight:</span>
                      <span className="font-bold text-ink-near">{formData.quantity} {formData.unit} ({formData.weight} KG)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pickup Hub:</span>
                      <span className="font-bold text-ink-near">{formData.city}, {formData.state}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-papaya rounded-brutal border-2 border-ink-near space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-ink-near">
                      <ShieldCheck className="w-4 h-4 text-stormy-teal" />
                      <span>Zero-Checkout Seller Guarantee</span>
                    </div>
                    <p className="text-xs text-gunmetal leading-relaxed">
                      Your lot will be made instantly available to verified circular economy recyclers. No fees are deducted on this listing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Bottom Controls */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t-2 border-ink-near">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-brutal border-2 border-ink-near font-mono font-bold text-xs uppercase shadow-brutal-xs transition-all ${
                currentStep === 1
                  ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-white hover:bg-gray-100 text-ink-near active:scale-95'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            {currentStep < 7 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-bold text-xs uppercase tracking-wider shadow-brutal active:translate-y-0.5"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4 text-papaya" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="flex items-center gap-2 px-8 py-3 rounded-brutal border-2 border-ink-near bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-sm uppercase tracking-wider shadow-brutal active:translate-y-0.5 animate-bounce"
              >
                <Sparkles className="w-4 h-4 text-papaya" />
                <span>Publish Listing Live</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
