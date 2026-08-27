export type AccountType = 
  | 'Individual'
  | 'Recycler'
  | 'Scrap Dealer'
  | 'Business'
  | 'Repair Shop'
  | 'Manufacturer'
  | 'Refurbisher';

export type ListingCondition = 
  | 'Tested & Working'
  | 'Partially Working'
  | 'For Parts'
  | 'Salvage / Non-Working'
  | 'Mixed Scrap Lot';

export type ListingType = 'Auction' | 'Negotiable Offer';

export type AuctionStatus = 
  | 'Upcoming'
  | 'Active'
  | 'Ending Soon'
  | 'Ended'
  | 'Cancelled'
  | 'Sold/Closed';

export type BidStatus = 'Leading' | 'Outbid' | 'Won' | 'Lost' | 'Pending';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  accountType: AccountType;
  location: {
    city: string;
    state: string;
    pincode: string;
    distanceKm?: number;
  };
  verificationStatus: 'Verified' | 'Pending' | 'Unverified';
  eprRegistrationNo?: string;
  cpcbCertificate?: boolean;
  rating: number;
  reviewCount: number;
  completedListings: number;
  activeListingsCount: number;
  joinedDate: string;
  about?: string;
}

export interface Bid {
  id: string;
  listingId: string;
  bidderId: string;
  bidderAnonymousName: string;
  amount: number;
  createdAt: string; // ISO string
  status: BidStatus;
  isUserBid?: boolean;
}

export interface TechnicalSpecs {
  brand: string;
  model: string;
  partNumber?: string;
  manufacturingYear?: string | number;
  voltagePower?: string;
  capacitySpecs?: string;
  compatibility?: string;
  serialNumberAvailable?: boolean;
  dimensions?: string;
  weightKg?: number;
}

export interface EWasteDetails {
  eWasteCategory: string;
  materialType: string[]; // e.g. Gold-plated PCB, Copper wire, Lithium Cells, Aluminum casing
  estimatedWeightKg: number;
  reusableComponents: string[]; // e.g. RAM slots, capacitors, chokes, heatsinks
  recyclableMaterials: string[];
  hazardousMaterial: boolean;
  hazardousDetails?: string; // e.g. Lead solder, Mercury CCFL, Cadmium
  rohsCompliant: boolean;
  batteryIncluded: boolean;
  batteryType?: string; // e.g. Li-ion, Ni-MH, Lead-acid
  dataStoragePresent: boolean;
  dataWiped: boolean;
  dataWipingCertificateAvailable?: boolean;
  dismantledStatus: 'Fully Intact' | 'Partially Dismantled' | 'Fully Stripped PCB / Shell';
  workingStatus: 'Working' | 'Partially Working' | 'Non-working / Scrap';
}

export interface LogisticsDetails {
  pickupAvailable: boolean;
  shippingAvailable: boolean;
  pickupAddress: string;
  city: string;
  state: string;
  pincode: string;
  preferredPickupMethod: string;
  loadingAssistanceAvailable: boolean;
  warehouseHours: string;
}

export interface Listing {
  id: string;
  sellerId: string;
  seller: User;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  images: string[];
  coverImage: string;
  condition: ListingCondition;
  quantity: number;
  unit: 'Units' | 'KG' | 'Tons' | 'Pallets' | 'Lots';
  weight: number; // in kg
  technicalSpecs: TechnicalSpecs;
  eWasteDetails: EWasteDetails;
  logistics: LogisticsDetails;
  listingType: ListingType;
  startingBid?: number;
  currentBid?: number;
  reservePrice?: number;
  bidIncrement?: number;
  askingPrice?: number; // for negotiable
  negotiable?: boolean;
  bids: Bid[];
  auctionStart?: string; // ISO string
  auctionEnd?: string; // ISO string
  status: AuctionStatus;
  viewCount: number;
  savesCount: number;
  featured?: boolean;
  verifiedListing?: boolean;
  createdAt: string;
}

export interface SavedListing {
  id: string;
  userId: string;
  listingId: string;
  savedAt: string;
}

export interface Message {
  id: string;
  threadId: string;
  listingId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  message: string;
  offerAmount?: number;
  createdAt: string;
  read: boolean;
}

export interface MessageThread {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingPriceOrBid: string;
  otherUser: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface Review {
  id: string;
  listingId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  revieweeId: string;
  rating: number;
  comment: string;
  transactionType: 'Auction Purchase' | 'Negotiated Scrap Lot' | 'Bulk Component Supply';
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  listingId: string;
  listingTitle: string;
  reason: 
    | 'Fraud / Misleading Specs'
    | 'Prohibited / Unsafe Hazardous Material'
    | 'Data Privacy Breach (Unwiped Storage)'
    | 'Wrong Category'
    | 'Duplicate / Spam'
    | 'Illegal Scrap Trading'
    | 'Other';
  description: string;
  status: 'Pending Review' | 'Resolved' | 'Dismissed';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'outbid' | 'auction_ending' | 'auction_won' | 'new_bid' | 'new_message' | 'offer_received' | 'listing_approved' | 'system';
  listingId?: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  subcategory: string;
  condition: string[];
  locationCity: string;
  maxDistanceKm: number;
  listingType: 'All' | 'Auction' | 'Negotiable';
  hazardousOnly?: boolean;
  rohsOnly?: boolean;
  dataWipedOnly?: boolean;
  batteryIncluded?: boolean;
  minPrice: number;
  maxPrice: number;
  sellerType: string;
  sortBy: 'recommended' | 'newest' | 'ending_soon' | 'lowest_bid' | 'highest_bid' | 'closest' | 'most_viewed';
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  description: string;
  subcategories: string[];
}
