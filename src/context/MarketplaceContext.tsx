import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing, User, Bid, BidStatus, Notification, MessageThread, FilterState, Report, Review } from '../types';
import { MOCK_LISTINGS, CURRENT_USER, MOCK_NOTIFICATIONS, MOCK_THREADS, MOCK_REVIEWS } from '../data/mockData';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface MarketplaceContextType {
  listings: Listing[];
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  savedListingIds: string[];
  notifications: Notification[];
  messageThreads: MessageThread[];
  reports: Report[];
  reviews: Review[];
  activeTab: 'marketplace' | 'listing-detail' | 'post-listing' | 'seller-dashboard' | 'buyer-dashboard' | 'messages' | 'profile' | 'admin';
  setActiveTab: (tab: 'marketplace' | 'listing-detail' | 'post-listing' | 'seller-dashboard' | 'buyer-dashboard' | 'messages' | 'profile' | 'admin') => void;
  selectedListingId: string | null;
  setSelectedListingId: (id: string | null) => void;
  selectedThreadId: string | null;
  setSelectedThreadId: (id: string | null) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  placeBid: (listingId: string, amount: number) => boolean;
  makeOffer: (listingId: string, amount: number, note: string) => void;
  createListing: (newListing: Omit<Listing, 'id' | 'createdAt' | 'bids' | 'viewCount' | 'savesCount'>) => string;
  toggleSaveListing: (listingId: string) => void;
  isSaved: (listingId: string) => boolean;
  sendMessage: (threadId: string, text: string, offerAmount?: number) => void;
  startOrOpenThread: (listingId: string, initialMessage?: string) => string;
  reportListing: (listingId: string, reason: any, description: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  updateListingStatus: (listingId: string, status: any) => void;
  deleteListing: (listingId: string) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  openListingDetail: (listingId: string) => void;
}

const initialFilterState: FilterState = {
  searchQuery: '',
  category: 'All',
  subcategory: '',
  condition: [],
  locationCity: 'All India',
  maxDistanceKm: 500,
  listingType: 'All',
  hazardousOnly: false,
  rohsOnly: false,
  dataWipedOnly: false,
  batteryIncluded: false,
  minPrice: 0,
  maxPrice: 200000,
  sellerType: 'All',
  sortBy: 'recommended'
};

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial listings from local storage or mock
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('w2w_listings');
    return saved ? JSON.parse(saved) : MOCK_LISTINGS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('w2w_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [savedListingIds, setSavedListingIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('w2w_saved');
    return saved ? JSON.parse(saved) : ['list_dell_5490', 'list_rtx_salvage_lot'];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('w2w_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [messageThreads, setMessageThreads] = useState<MessageThread[]>(() => {
    const saved = localStorage.getItem('w2w_threads');
    return saved ? JSON.parse(saved) : MOCK_THREADS;
  });

  const [reports, setReports] = useState<Report[]>(() => {
    const saved = localStorage.getItem('w2w_reports');
    return saved ? JSON.parse(saved) : [
      {
        id: 'rep_01',
        reporterId: 'user_curr_01',
        listingId: 'list_broken_smartphones_50pcs',
        listingTitle: 'Smartphones Lot for Scrap (Samsung / Redmi)',
        reason: 'Data Privacy Breach (Unwiped Storage)',
        description: 'Listing mentions some storage modules are unwiped without cert.',
        status: 'Pending Review',
        createdAt: '2026-08-26T12:00:00.000Z'
      }
    ];
  });

  const [reviews] = useState<Review[]>(MOCK_REVIEWS);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'listing-detail' | 'post-listing' | 'seller-dashboard' | 'buyer-dashboard' | 'messages' | 'profile' | 'admin'>('marketplace');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('w2w_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('w2w_saved', JSON.stringify(savedListingIds));
  }, [savedListingIds]);

  useEffect(() => {
    localStorage.setItem('w2w_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('w2w_threads', JSON.stringify(messageThreads));
  }, [messageThreads]);

  useEffect(() => {
    localStorage.setItem('w2w_reports', JSON.stringify(reports));
  }, [reports]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openListingDetail = (listingId: string) => {
    setSelectedListingId(listingId);
    setActiveTab('listing-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilterState(initialFilterState);
  };

  const placeBid = (listingId: string, amount: number): boolean => {
    const listing = listings.find(l => l.id === listingId);
    if (!listing) {
      addToast('Error', 'Listing not found', 'error');
      return false;
    }

    const minBid = (listing.currentBid || listing.startingBid || 0) + (listing.bidIncrement || 100);
    if (amount < minBid) {
      addToast('Bid Too Low', `Minimum acceptable bid is ₹${minBid.toLocaleString('en-IN')}`, 'warning');
      return false;
    }

    const newBid: Bid = {
      id: 'bid_' + Date.now(),
      listingId,
      bidderId: currentUser.id,
      bidderAnonymousName: `${currentUser.name} (You)`,
      amount,
      createdAt: new Date().toISOString(),
      status: 'Leading',
      isUserBid: true
    };

    // Update existing bids status to Outbid
    const updatedBids: Bid[] = listing.bids.map(b => ({
      ...b,
      status: 'Outbid' as BidStatus
    }));
    updatedBids.push(newBid);

    // Update listing
    setListings(prev => prev.map(item => {
      if (item.id === listingId) {
        return {
          ...item,
          currentBid: amount,
          bids: updatedBids,
          viewCount: item.viewCount + 1
        };
      }
      return item;
    }));

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#15616D', '#FFECD1', '#080808', '#22C55E']
      });
    } catch {
      // ignore
    }

    // Add notification
    const newNotif: Notification = {
      id: 'notif_' + Date.now(),
      userId: currentUser.id,
      title: 'Bid Placed Successfully!',
      message: `You are now the leading bidder on "${listing.title}" at ₹${amount.toLocaleString('en-IN')}.`,
      type: 'new_bid',
      listingId,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    addToast('Bid Accepted!', `You are the leading bidder at ₹${amount.toLocaleString('en-IN')}`, 'success');
    return true;
  };

  const makeOffer = (listingId: string, amount: number, note: string) => {
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return;

    const threadId = startOrOpenThread(
      listingId, 
      `Hello, I would like to make an offer of ₹${amount.toLocaleString('en-IN')} for this scrap lot. Note: ${note || 'Ready for quick inspection and pickup.'}`
    );

    addToast('Offer Sent to Seller', `Offer of ₹${amount.toLocaleString('en-IN')} has been sent to ${listing.seller.name}.`, 'success');
    setSelectedThreadId(threadId);
    setActiveTab('messages');
  };

  const createListing = (newListingData: Omit<Listing, 'id' | 'createdAt' | 'bids' | 'viewCount' | 'savesCount'>): string => {
    const newId = 'list_' + Date.now();
    const createdListing: Listing = {
      ...newListingData,
      id: newId,
      sellerId: currentUser.id,
      seller: currentUser,
      bids: [],
      currentBid: newListingData.listingType === 'Auction' ? newListingData.startingBid : undefined,
      viewCount: 1,
      savesCount: 0,
      status: 'Active',
      createdAt: new Date().toISOString()
    };

    setListings(prev => [createdListing, ...prev]);

    // Confetti
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#15616D', '#FFECD1', '#080808']
      });
    } catch {
      // ignore
    }

    addToast('Listing Published Live!', `Your e-waste listing "${createdListing.title}" is now active in the marketplace.`, 'success');
    return newId;
  };

  const toggleSaveListing = (listingId: string) => {
    setSavedListingIds(prev => {
      const isAlreadySaved = prev.includes(listingId);
      const updated = isAlreadySaved ? prev.filter(id => id !== listingId) : [...prev, listingId];
      
      // Update listing savesCount
      setListings(lPrev => lPrev.map(item => {
        if (item.id === listingId) {
          return {
            ...item,
            savesCount: Math.max(0, item.savesCount + (isAlreadySaved ? -1 : 1))
          };
        }
        return item;
      }));

      addToast(
        isAlreadySaved ? 'Removed from Saved' : 'Saved to Bookmarks',
        isAlreadySaved ? 'Listing removed from your saved collection.' : 'You will receive status alerts for this listing.',
        'info'
      );

      return updated;
    });
  };

  const isSaved = (listingId: string) => savedListingIds.includes(listingId);

  const sendMessage = (threadId: string, text: string, offerAmount?: number) => {
    const thread = messageThreads.find(t => t.id === threadId);
    if (!thread) return;

    const newMessage = {
      id: 'msg_' + Date.now(),
      threadId,
      listingId: thread.listingId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: thread.otherUser.id,
      receiverName: thread.otherUser.name,
      message: text,
      offerAmount,
      createdAt: new Date().toISOString(),
      read: true
    };

    setMessageThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          lastMessage: text,
          lastMessageTime: 'Just now',
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));

    addToast('Message Sent', 'Your message has been delivered to the seller.', 'success');
  };

  const startOrOpenThread = (listingId: string, initialMessage?: string): string => {
    const existing = messageThreads.find(t => t.listingId === listingId);
    if (existing) {
      if (initialMessage) {
        sendMessage(existing.id, initialMessage);
      }
      return existing.id;
    }

    const listing = listings.find(l => l.id === listingId);
    if (!listing) return '';

    const newThreadId = 'thread_' + Date.now();
    const newThread: MessageThread = {
      id: newThreadId,
      listingId,
      listingTitle: listing.title,
      listingImage: listing.coverImage,
      listingPriceOrBid: listing.listingType === 'Auction' ? `₹${(listing.currentBid || listing.startingBid)?.toLocaleString('en-IN')} (Current Bid)` : `₹${listing.askingPrice?.toLocaleString('en-IN')} (Asking)`,
      otherUser: listing.seller,
      lastMessage: initialMessage || 'Conversation started regarding listing.',
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: initialMessage ? [
        {
          id: 'msg_' + Date.now(),
          threadId: newThreadId,
          listingId,
          senderId: currentUser.id,
          senderName: currentUser.name,
          receiverId: listing.seller.id,
          receiverName: listing.seller.name,
          message: initialMessage,
          createdAt: new Date().toISOString(),
          read: true
        }
      ] : []
    };

    setMessageThreads(prev => [newThread, ...prev]);
    return newThreadId;
  };

  const reportListing = (listingId: string, reason: any, description: string) => {
    const listing = listings.find(l => l.id === listingId);
    const newReport: Report = {
      id: 'rep_' + Date.now(),
      reporterId: currentUser.id,
      listingId,
      listingTitle: listing?.title || 'Unknown Listing',
      reason,
      description,
      status: 'Pending Review',
      createdAt: new Date().toISOString()
    };

    setReports(prev => [newReport, ...prev]);
    addToast('Safety Report Filed', 'Our moderation team will audit this listing within 2 hours.', 'warning');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  const updateListingStatus = (listingId: string, status: any) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, status } : l));
    addToast('Status Updated', `Listing status updated to ${status}.`, 'info');
  };

  const deleteListing = (listingId: string) => {
    setListings(prev => prev.filter(l => l.id !== listingId));
    addToast('Listing Removed', 'Listing has been archived and removed from discovery.', 'info');
  };

  return (
    <MarketplaceContext.Provider value={{
      listings,
      currentUser,
      setCurrentUser,
      savedListingIds,
      notifications,
      messageThreads,
      reports,
      reviews,
      activeTab,
      setActiveTab,
      selectedListingId,
      setSelectedListingId,
      selectedThreadId,
      setSelectedThreadId,
      filterState,
      setFilterState,
      resetFilters,
      placeBid,
      makeOffer,
      createListing,
      toggleSaveListing,
      isSaved,
      sendMessage,
      startOrOpenThread,
      reportListing,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      updateListingStatus,
      deleteListing,
      toasts,
      addToast,
      removeToast,
      openListingDetail
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
