import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Award, 
  FileText, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Mail, 
  Calendar,
  Layers,
  Edit3,
  Gavel
} from 'lucide-react';
import { ListingCard } from '../marketplace/ListingCard';

export const UserProfilePage: React.FC = () => {
  const { currentUser, setCurrentUser, listings, reviews, addToast } = useMarketplace();
  const [activeTab, setActiveTab] = useState<'listings' | 'certs' | 'reviews'>('listings');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    about: currentUser.about || '',
    phone: currentUser.phone,
    city: currentUser.location.city,
    state: currentUser.location.state,
    accountType: currentUser.accountType
  });

  const userListings = listings.filter(l => l.sellerId === currentUser.id || l.seller.id === currentUser.id);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name: editForm.name,
      about: editForm.about,
      phone: editForm.phone,
      accountType: editForm.accountType as any,
      location: {
        ...prev.location,
        city: editForm.city,
        state: editForm.state
      }
    }));
    setIsEditing(false);
    addToast('Profile Updated', 'Your company profile details have been saved.', 'success');
  };

  return (
    <div className="min-h-screen bg-surface-canvas py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Banner */}
        <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 sm:p-8 shadow-brutal-lg relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-brutal-lg border-3 border-ink-near object-cover shadow-brutal"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-ink-near uppercase">
                    {currentUser.name}
                  </h1>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-700 rounded-brutal text-xs font-mono font-bold uppercase inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    CPCB Certified
                  </span>
                </div>

                <p className="text-xs font-mono text-gray-500 font-bold">
                  {currentUser.accountType} • Member Since {currentUser.joinedDate}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-600 pt-1">
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{currentUser.rating} ★ ({currentUser.reviewCount} Reviews)</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-stormy-teal" />
                    <span>{currentUser.location.city}, {currentUser.location.state}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-bold text-ink-near">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{currentUser.completedListings} Completed Deals</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-brutal border-2 border-ink-near bg-white hover:bg-papaya font-mono font-bold text-xs uppercase shadow-brutal-xs flex items-center gap-1.5 shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Edit Profile Form Drawer */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t-2 border-ink-near space-y-4 bg-surface-canvas p-4 rounded-brutal-lg border-2">
              <h3 className="font-display font-bold text-sm text-ink-near uppercase">Edit Profile & Company Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <label className="block text-gray-600 mb-1 font-bold uppercase">Name / Entity</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 bg-white border border-ink-near rounded-brutal"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-bold uppercase">Phone</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={e => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-2 bg-white border border-ink-near rounded-brutal"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-bold uppercase">Account Role</label>
                  <select
                    value={editForm.accountType}
                    onChange={e => setEditForm(prev => ({ ...prev, accountType: e.target.value as any }))}
                    className="w-full p-2 bg-white border border-ink-near rounded-brutal"
                  >
                    <option value="Recycler">Recycler</option>
                    <option value="Scrap Dealer">Scrap Dealer</option>
                    <option value="Business">Business / Enterprise</option>
                    <option value="Repair Shop">Repair Shop</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Refurbisher">Refurbisher</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1 font-mono text-xs font-bold uppercase">About & Facilities</label>
                <textarea
                  rows={2}
                  value={editForm.about}
                  onChange={e => setEditForm(prev => ({ ...prev, about: e.target.value }))}
                  className="w-full p-2 bg-white border border-ink-near rounded-brutal text-xs"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-stormy-teal text-white border-2 border-ink-near rounded-brutal font-mono font-bold text-xs uppercase shadow-brutal-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            currentUser.about && (
              <p className="mt-4 pt-4 border-t border-gray-200 text-xs font-sans text-gunmetal leading-relaxed">
                {currentUser.about}
              </p>
            )
          )}
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-surface-pure rounded-brutal-lg border-2 border-ink-near w-fit shadow-brutal-xs">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-brutal text-xs font-mono font-bold transition-all ${
              activeTab === 'listings' ? 'bg-stormy-teal text-white shadow-brutal-xs' : 'text-gunmetal hover:bg-gray-100'
            }`}
          >
            Active Listings ({userListings.length})
          </button>
          <button
            onClick={() => setActiveTab('certs')}
            className={`px-4 py-2 rounded-brutal text-xs font-mono font-bold transition-all ${
              activeTab === 'certs' ? 'bg-stormy-teal text-white shadow-brutal-xs' : 'text-gunmetal hover:bg-gray-100'
            }`}
          >
            Compliance & EPR Licenses
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-brutal text-xs font-mono font-bold transition-all ${
              activeTab === 'reviews' ? 'bg-stormy-teal text-white shadow-brutal-xs' : 'text-gunmetal hover:bg-gray-100'
            }`}
          >
            Buyer & Seller Reviews ({reviews.length})
          </button>
        </div>

        {/* LISTINGS TAB */}
        {activeTab === 'listings' && (
          <div>
            {userListings.length === 0 ? (
              <div className="p-12 bg-surface-pure rounded-brutal-xl border-3 border-ink-near text-center text-xs font-mono text-gray-500 shadow-brutal">
                No active listings published yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} layout="grid" />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CERTS TAB */}
        {activeTab === 'certs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-brutal bg-stormy-teal border-2 border-ink-near flex items-center justify-center shadow-brutal-xs">
                  <Award className="w-5 h-5 text-papaya" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-ink-near">CPCB EPR Authorized Dismantler</h3>
                  <span className="text-xs font-mono text-emerald-700 font-bold">Status: Active & Valid (2024-2029)</span>
                </div>
              </div>
              <p className="text-xs text-gunmetal font-sans leading-relaxed">
                Authorized to collect, transport, dismantle, and recycle IT motherboards, lead-acid batteries, and telecoms scrap in Gujarat & Maharashtra.
              </p>
              <div className="p-3 bg-surface-canvas rounded-brutal border border-ink-near font-mono text-xs text-gray-700">
                Registration No: <span className="font-bold text-ink-near">{currentUser.eprRegistrationNo || 'CPCB/EPR-2024/GJ-8849'}</span>
              </div>
            </div>

            <div className="p-6 bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-brutal bg-papaya border-2 border-ink-near flex items-center justify-center shadow-brutal-xs">
                  <FileText className="w-5 h-5 text-ink-near" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-ink-near">NIST 800-88 Data Sanitization Certified</h3>
                  <span className="text-xs font-mono text-teal-800 font-bold">Standard 3-Pass Erasure</span>
                </div>
              </div>
              <p className="text-xs text-gunmetal font-sans leading-relaxed">
                Hardware cryptographic wiping facility equipped for on-site hard drive degaussing and enterprise NVMe shredding.
              </p>
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {reviews.map(rev => (
              <div key={rev.id} className="p-5 bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={rev.reviewerAvatar} alt="" className="w-9 h-9 rounded-brutal border border-ink-near object-cover" />
                    <div>
                      <h4 className="font-display font-bold text-xs text-ink-near">{rev.reviewerName}</h4>
                      <span className="text-[10px] font-mono text-gray-500">{rev.transactionType}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-600 font-bold text-xs font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{rev.rating} / 5.0</span>
                  </div>
                </div>

                <p className="text-xs text-gunmetal font-sans pt-1 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
