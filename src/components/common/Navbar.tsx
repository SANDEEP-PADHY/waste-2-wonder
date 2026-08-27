import React, { useState, useRef, useEffect } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { INDIAN_CITIES } from '../../data/mockData';
import { 
  Recycle, 
  MapPin, 
  Search, 
  PlusCircle, 
  Bookmark, 
  Bell, 
  MessageSquare, 
  User as UserIcon, 
  ShieldCheck, 
  ChevronDown, 
  X,
  Gavel,
  Layers,
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser,
    activeTab, 
    setActiveTab, 
    savedListingIds, 
    notifications, 
    messageThreads, 
    filterState, 
    setFilterState,
    setSelectedListingId,
    listings,
    openListingDetail
  } = useMarketplace();

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchInput, setSearchInput] = useState(filterState.searchQuery);

  const cityRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadMessages = messageThreads.reduce((acc, t) => acc + t.unreadCount, 0);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick suggestions based on search input
  const searchSuggestions = searchInput.trim()
    ? listings
        .filter(l => 
          l.title.toLowerCase().includes(searchInput.toLowerCase()) || 
          l.category.toLowerCase().includes(searchInput.toLowerCase()) ||
          l.subcategory.toLowerCase().includes(searchInput.toLowerCase()) ||
          l.technicalSpecs.brand.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterState(prev => ({ ...prev, searchQuery: searchInput }));
    setActiveTab('marketplace');
    setSearchFocused(false);
  };

  const handleSelectCity = (city: string) => {
    setFilterState(prev => ({ ...prev, locationCity: city }));
    setIsCityDropdownOpen(false);
    if (activeTab !== 'marketplace') {
      setActiveTab('marketplace');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-pure/95 backdrop-blur-md border-b-2 border-ink-near">
        {/* Top announcement / Regulatory Bar */}
        <div className="bg-ink-near text-white px-4 py-1 text-xs font-mono flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300">
              CPCB & EPR Compliant Circular Economy Platform • 100% Zero Direct Checkout • B2B & Recycler Verified
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-300 text-[11px]">
            <span>1,420+ Tons Diverted</span>
            <span>•</span>
            <span className="text-papaya font-bold">Live Trading: 184 Lots</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setActiveTab('marketplace');
                setSelectedListingId(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-brutal border-2 border-ink-near bg-stormy-teal flex items-center justify-center shadow-brutal-sm group-hover:translate-y-[-1px] transition-transform">
                <Recycle className="w-5 h-5 text-papaya animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-xl tracking-tight text-ink-near">
                    WASTE<span className="text-stormy-teal">2</span>WONDER
                  </span>
                  <span className="px-1.5 py-0.2 bg-papaya border border-ink-near rounded-brutal text-[9px] font-mono font-bold text-ink-near uppercase">
                    B2B
                  </span>
                </div>
                <p className="text-[10px] font-mono text-gunmetal tracking-wider uppercase">
                  Industrial E-Waste Exchange
                </p>
              </div>
            </button>

            {/* City Location Selector Dropdown */}
            <div className="relative hidden lg:block" ref={cityRef}>
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-brutal border-2 border-ink-near bg-surface-canvas hover:bg-gray-100 text-xs font-mono font-bold transition-all shadow-brutal-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-stormy-teal shrink-0" />
                <span className="max-w-[130px] truncate">{filterState.locationCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gunmetal" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-surface-pure border-2 border-ink-near rounded-brutal-lg shadow-brutal-lg p-2 z-50 animate-fadeIn">
                  <div className="p-2 border-b border-gray-200">
                    <span className="text-[10px] font-mono uppercase text-gray-500 font-bold">Select Regional Hub</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {INDIAN_CITIES.map(city => (
                      <button
                        key={city}
                        onClick={() => handleSelectCity(city)}
                        className={`w-full text-left px-3 py-2 text-xs font-sans rounded-brutal flex items-center justify-between ${
                          filterState.locationCity === city
                            ? 'bg-stormy-soft text-stormy-teal font-bold'
                            : 'hover:bg-gray-100 text-ink-near'
                        }`}
                      >
                        <span>{city}</span>
                        {filterState.locationCity === city && <ShieldCheck className="w-3.5 h-3.5 text-stormy-teal" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar with Autocomplete */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search RTX 3060 scrap, PCB boards, Dell servers, copper wire, batteries..."
                  className="w-full pl-10 pr-10 py-2 bg-surface-canvas border-2 border-ink-near rounded-brutal text-xs font-sans placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-brutal-sm transition-all"
                />
                <Search className="w-4 h-4 text-gunmetal absolute left-3 pointer-events-none" />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('');
                      setFilterState(prev => ({ ...prev, searchQuery: '' }));
                    }}
                    className="absolute right-3 text-gray-400 hover:text-ink-near"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {searchFocused && searchInput.trim().length > 1 && (
              <div className="absolute left-0 right-0 mt-2 bg-surface-pure border-2 border-ink-near rounded-brutal-lg shadow-brutal-lg p-3 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 text-[11px] font-mono text-gray-500">
                  <span>Listings Matching "{searchInput}"</span>
                  <button 
                    onClick={() => setSearchFocused(false)} 
                    className="hover:text-ink-near font-bold"
                  >
                    Close
                  </button>
                </div>

                {searchSuggestions.length > 0 ? (
                  <div className="space-y-1.5">
                    {searchSuggestions.map(l => (
                      <div
                        key={l.id}
                        onClick={() => {
                          openListingDetail(l.id);
                          setSearchFocused(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-brutal hover:bg-stormy-soft cursor-pointer transition-colors"
                      >
                        <img 
                          src={l.coverImage} 
                          alt={l.title} 
                          className="w-10 h-10 rounded-brutal object-cover border border-ink-near shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-bold text-xs text-ink-near truncate">{l.title}</p>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-gunmetal">
                            <span>{l.category}</span>
                            <span>•</span>
                            <span className="font-bold text-stormy-teal">
                              {l.listingType === 'Auction' 
                                ? `Current Bid: ₹${(l.currentBid || l.startingBid)?.toLocaleString('en-IN')}` 
                                : `Asking: ₹${l.askingPrice?.toLocaleString('en-IN')}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 py-2 text-center">No matching listings found. Try searching for "PCB", "Dell", "Battery", or "Copper".</p>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons & Post Listing */}
          <div className="flex items-center gap-2.5">
            {/* Quick Navigation Links on Desktop */}
            <div className="hidden xl:flex items-center gap-1 mr-2 text-xs font-mono font-bold">
              <button
                onClick={() => {
                  setFilterState(prev => ({ ...prev, listingType: 'Auction' }));
                  setActiveTab('marketplace');
                }}
                className="px-2.5 py-1.5 rounded-brutal hover:bg-gray-100 text-ink-near flex items-center gap-1"
              >
                <Gavel className="w-3.5 h-3.5 text-stormy-teal" />
                Live Auctions
              </button>
              <button
                onClick={() => {
                  setFilterState(prev => ({ ...prev, listingType: 'All' }));
                  setActiveTab('marketplace');
                }}
                className="px-2.5 py-1.5 rounded-brutal hover:bg-gray-100 text-ink-near flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5 text-gunmetal" />
                All Scrap
              </button>
            </div>

            {/* Saved Bookmarks Button */}
            <button
              onClick={() => setActiveTab('buyer-dashboard')}
              title="Saved Listings"
              className="relative p-2 rounded-brutal border-2 border-ink-near bg-white hover:bg-gray-100 transition-colors shadow-brutal-xs"
            >
              <Bookmark className="w-4 h-4 text-ink-near" />
              {savedListingIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-papaya border border-ink-near text-[10px] font-mono font-bold flex items-center justify-center text-ink-near shadow-brutal-xs">
                  {savedListingIds.length}
                </span>
              )}
            </button>

            {/* Messages Thread Button */}
            <button
              onClick={() => setActiveTab('messages')}
              title="Listing Messages"
              className="relative p-2 rounded-brutal border-2 border-ink-near bg-white hover:bg-gray-100 transition-colors shadow-brutal-xs"
            >
              <MessageSquare className="w-4 h-4 text-ink-near" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-stormy-teal border border-ink-near text-[10px] font-mono font-bold flex items-center justify-center text-white shadow-brutal-xs">
                  {unreadMessages}
                </span>
              )}
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              title="Notifications"
              className="relative p-2 rounded-brutal border-2 border-ink-near bg-white hover:bg-gray-100 transition-colors shadow-brutal-xs"
            >
              <Bell className="w-4 h-4 text-ink-near" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 border border-ink-near text-[10px] font-mono font-bold flex items-center justify-center text-white shadow-brutal-xs animate-bounce">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* User Profile & Role Switcher Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-brutal border-2 border-ink-near bg-white hover:bg-gray-50 transition-colors shadow-brutal-xs"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-brutal object-cover border border-ink-near"
                />
                <span className="hidden md:inline font-display font-bold text-xs text-ink-near max-w-[90px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gunmetal hidden sm:block" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-surface-pure border-2 border-ink-near rounded-brutal-lg shadow-brutal-lg p-2 z-50 animate-fadeIn">
                  <div className="p-2.5 border-b border-gray-200 bg-surface-canvas rounded-brutal mb-2">
                    <div className="flex items-center gap-2">
                      <img src={currentUser.avatar} alt="" className="w-9 h-9 rounded-brutal border border-ink-near object-cover" />
                      <div className="min-w-0">
                        <p className="font-display font-bold text-xs text-ink-near truncate">{currentUser.name}</p>
                        <p className="text-[10px] font-mono text-stormy-teal font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          {currentUser.accountType} (CPCB Verified)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <button
                      onClick={() => {
                        setActiveTab('seller-dashboard');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-brutal hover:bg-stormy-soft flex items-center gap-2 text-ink-near font-bold"
                    >
                      <LayoutDashboard className="w-4 h-4 text-stormy-teal" />
                      Seller Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('buyer-dashboard');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-brutal hover:bg-stormy-soft flex items-center gap-2 text-ink-near font-bold"
                    >
                      <Gavel className="w-4 h-4 text-stormy-teal" />
                      Buyer Bids & Saved
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-brutal hover:bg-stormy-soft flex items-center gap-2 text-ink-near font-bold"
                    >
                      <UserIcon className="w-4 h-4 text-stormy-teal" />
                      My Profile & Certs
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-brutal hover:bg-red-50 text-red-800 flex items-center gap-2 font-bold"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                      Admin Moderation
                    </button>

                    <div className="pt-2 mt-1 border-t border-gray-200">
                      <span className="text-[10px] uppercase text-gray-400 font-bold block px-3 mb-1">Switch Persona</span>
                      <div className="grid grid-cols-2 gap-1 px-1">
                        {(['Recycler', 'Scrap Dealer', 'Business', 'Repair Shop'] as const).map(role => (
                          <button
                            key={role}
                            onClick={() => {
                              setCurrentUser(prev => ({ ...prev, accountType: role }));
                              setIsProfileDropdownOpen(false);
                            }}
                            className={`px-2 py-1 text-[10px] rounded-brutal border text-center font-bold ${
                              currentUser.accountType === role
                                ? 'bg-stormy-teal text-white border-ink-near'
                                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Post E-Waste CTA Button */}
            <button
              onClick={() => setActiveTab('post-listing')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <PlusCircle className="w-4 h-4 text-papaya" />
              <span className="hidden sm:inline">Post E-Waste</span>
              <span className="sm:hidden">Sell</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Drawer Modal */}
      <NotificationDrawer 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
    </>
  );
};
