import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Bell, CheckCheck, X, Gavel, Flame, MessageSquare, Tag, AlertCircle } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, openListingDetail } = useMarketplace();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'new_bid':
      case 'auction_won':
        return <Gavel className="w-4 h-4 text-stormy-teal" />;
      case 'outbid':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'auction_ending':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'new_message':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'offer_received':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-gunmetal" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-surface-pure border-l-3 border-ink-near h-full shadow-brutal-xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b-2 border-ink-near flex items-center justify-between bg-surface-canvas">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-brutal border-2 border-ink-near bg-papaya flex items-center justify-center shadow-brutal-xs">
              <Bell className="w-4 h-4 text-ink-near" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-ink-near">Notifications</h3>
              <p className="text-xs text-gunmetal font-mono">{unreadCount} unread alerts</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-xs font-bold text-stormy-teal hover:underline flex items-center gap-1 px-2 py-1 bg-white border border-ink-near rounded-brutal shadow-brutal-xs"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-brutal border-2 border-ink-near hover:bg-gray-100 transition-colors shadow-brutal-xs"
            >
              <X className="w-5 h-5 text-ink-near" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full border-2 border-ink-near bg-gray-100 mx-auto flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-gray-400" />
              </div>
              <h4 className="font-display font-bold text-gray-700">No Notifications Yet</h4>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                You will receive real-time alerts when you place bids, receive offers, or auctions are ending soon.
              </p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.listingId) {
                    openListingDetail(notif.listingId);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-brutal-lg border-2 border-ink-near transition-all cursor-pointer ${
                  !notif.read
                    ? 'bg-stormy-soft/60 shadow-brutal-sm hover:translate-x-1'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-brutal border border-ink-near bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-brutal-xs">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-display font-bold text-xs text-ink-near truncate">{notif.title}</h4>
                      <span className="font-mono text-[10px] text-gray-500 shrink-0">
                        {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-gunmetal mt-1 leading-snug">{notif.message}</p>
                    {notif.listingId && (
                      <span className="inline-block text-[11px] font-bold text-stormy-teal mt-2 underline">
                        View Listing →
                      </span>
                    )}
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-stormy-teal shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
