import React from 'react';
import { User } from '../../types';
import { ShieldCheck, Star, Award, Building2, MessageSquare, CheckCircle2 } from 'lucide-react';

interface SellerTrustCardProps {
  seller: User;
  onOpenMessage: () => void;
}

export const SellerTrustCard: React.FC<SellerTrustCardProps> = ({ seller, onOpenMessage }) => {
  return (
    <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal space-y-4">
      <div className="flex items-center justify-between pb-3 border-b-2 border-ink-near">
        <h3 className="font-display font-black text-base text-ink-near uppercase">
          Verified Seller & Disposer Trust Profile
        </h3>
        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-700 rounded-brutal text-[10px] font-mono font-bold uppercase">
          KYC & CPCB Verified
        </span>
      </div>

      <div className="flex items-start gap-4">
        <img
          src={seller.avatar}
          alt={seller.name}
          className="w-14 h-14 rounded-brutal border-2 border-ink-near object-cover shadow-brutal-xs shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-display font-black text-base text-ink-near truncate">{seller.name}</h4>
            <ShieldCheck className="w-4 h-4 text-stormy-teal shrink-0" />
          </div>
          <p className="text-xs font-mono text-gray-500">{seller.accountType} • {seller.location.city}, {seller.location.state}</p>

          <div className="flex items-center gap-3 mt-2 text-xs font-mono">
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>{seller.rating} Rating</span>
              <span className="text-gray-400 font-normal">({seller.reviewCount} reviews)</span>
            </div>
            <span>•</span>
            <span className="font-bold text-ink-near">{seller.completedListings} Completed Deals</span>
          </div>
        </div>
      </div>

      {seller.about && (
        <p className="text-xs text-gunmetal font-sans bg-surface-canvas p-3 rounded-brutal border border-gray-200 leading-relaxed">
          {seller.about}
        </p>
      )}

      {/* EPR Certificate row */}
      {seller.eprRegistrationNo && (
        <div className="p-3 bg-stormy-soft rounded-brutal border border-stormy-teal flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-stormy-dark" />
            <span className="text-stormy-dark">EPR Reg: <span className="font-bold text-ink-near">{seller.eprRegistrationNo}</span></span>
          </div>
          <span className="text-[10px] font-bold text-stormy-teal uppercase">Authorized Recycler</span>
        </div>
      )}

      <button
        onClick={onOpenMessage}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-brutal border-2 border-ink-near bg-white hover:bg-papaya text-ink-near font-display font-bold text-xs uppercase tracking-wider transition-colors shadow-brutal-xs active:translate-y-0.5"
      >
        <MessageSquare className="w-4 h-4 text-stormy-teal" />
        <span>Contact Seller About Inspection</span>
      </button>
    </div>
  );
};
