import React from 'react';
import { 
  Gavel, 
  Handshake, 
  ShieldCheck, 
  Leaf, 
  Battery, 
  HardDriveDownload, 
  AlertTriangle,
  Award,
  CheckCircle2
} from 'lucide-react';
import { ListingType, AuctionStatus, ListingCondition } from '../../types';

interface StatusBadgeProps {
  type?: 'listing-type' | 'auction-status' | 'condition' | 'hazardous' | 'rohs' | 'battery' | 'data-wiped' | 'verified';
  value?: string | boolean;
  listingType?: ListingType;
  auctionStatus?: AuctionStatus;
  condition?: ListingCondition;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  type = 'listing-type',
  value,
  listingType,
  auctionStatus,
  condition,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-[11px] gap-1' 
    : 'px-2.5 py-1 text-xs gap-1.5';

  if (listingType === 'Auction' || (type === 'listing-type' && value === 'Auction')) {
    return (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border-2 border-ink-near bg-stormy-teal text-white shadow-brutal-xs ${sizeClasses} ${className}`}>
        <Gavel className="w-3.5 h-3.5" />
        Live Auction
      </span>
    );
  }

  if (listingType === 'Negotiable Offer' || (type === 'listing-type' && value === 'Negotiable Offer')) {
    return (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border-2 border-ink-near bg-papaya text-ink-near shadow-brutal-xs ${sizeClasses} ${className}`}>
        <Handshake className="w-3.5 h-3.5" />
        Negotiable Offer
      </span>
    );
  }

  if (auctionStatus === 'Ending Soon' || value === 'Ending Soon') {
    return (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border-2 border-ink-near bg-amber-400 text-ink-near shadow-brutal-xs ${sizeClasses} ${className}`}>
        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping mr-0.5" />
        Ending Soon
      </span>
    );
  }

  if (auctionStatus === 'Ended' || value === 'Ended') {
    return (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border border-gray-400 bg-gray-200 text-gray-700 ${sizeClasses} ${className}`}>
        Closed
      </span>
    );
  }

  if (type === 'condition' || condition) {
    const val = condition || (value as string);
    const colorMap: Record<string, string> = {
      'Tested & Working': 'bg-emerald-100 text-emerald-900 border-emerald-800',
      'Partially Working': 'bg-blue-100 text-blue-900 border-blue-800',
      'For Parts': 'bg-amber-100 text-amber-900 border-amber-800',
      'Salvage / Non-Working': 'bg-orange-100 text-orange-900 border-orange-800',
      'Mixed Scrap Lot': 'bg-purple-100 text-purple-900 border-purple-800'
    };

    return (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border border-ink-near ${colorMap[val] || 'bg-gray-100 text-gray-800'} shadow-brutal-xs ${sizeClasses} ${className}`}>
        {val}
      </span>
    );
  }

  if (type === 'hazardous') {
    const isHazard = Boolean(value);
    return isHazard ? (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border-2 border-red-700 bg-red-100 text-red-900 shadow-brutal-xs ${sizeClasses} ${className}`}>
        <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
        Hazardous Material
      </span>
    ) : (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border border-emerald-600 bg-emerald-50 text-emerald-900 ${sizeClasses} ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        Non-Hazardous
      </span>
    );
  }

  if (type === 'rohs') {
    return (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border border-emerald-700 bg-emerald-50 text-emerald-800 ${sizeClasses} ${className}`}>
        <Leaf className="w-3.5 h-3.5 text-emerald-600" />
        RoHS Compliant
      </span>
    );
  }

  if (type === 'battery') {
    return (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border border-ink-near bg-amber-50 text-amber-900 ${sizeClasses} ${className}`}>
        <Battery className="w-3.5 h-3.5 text-amber-700" />
        Battery Included
      </span>
    );
  }

  if (type === 'data-wiped') {
    const isWiped = Boolean(value);
    return isWiped ? (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border border-teal-700 bg-teal-50 text-teal-900 ${sizeClasses} ${className}`}>
        <HardDriveDownload className="w-3.5 h-3.5 text-teal-700" />
        Data Sanitized (NIST 800-88)
      </span>
    ) : (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border border-red-500 bg-red-50 text-red-800 ${sizeClasses} ${className}`}>
        Storage Unwiped
      </span>
    );
  }

  if (type === 'verified') {
    return (
      <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border border-ink-near bg-stormy-teal text-white shadow-brutal-xs ${sizeClasses} ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-papaya" />
        CPCB Verified Recycler
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center font-mono font-bold uppercase rounded-brutal border border-ink-near bg-white text-ink-near ${sizeClasses} ${className}`}>
      {String(value)}
    </span>
  );
};
