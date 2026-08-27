import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  MessageSquare, 
  Send, 
  ArrowUpRight, 
  ShieldCheck, 
  Handshake, 
  User, 
  Clock,
  Sparkles
} from 'lucide-react';

export const MessagingCenter: React.FC = () => {
  const { 
    messageThreads, 
    selectedThreadId, 
    setSelectedThreadId, 
    sendMessage, 
    currentUser,
    openListingDetail,
    setActiveTab
  } = useMarketplace();

  const [inputMessage, setInputMessage] = useState('');

  const activeThread = messageThreads.find(t => t.id === selectedThreadId) || messageThreads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeThread) return;

    sendMessage(activeThread.id, inputMessage.trim());
    setInputMessage('');
  };

  const quickReplies = [
    'Can we arrange physical inspection tomorrow at 2 PM?',
    'We have valid CPCB recycler license for state transport.',
    'Could you share additional photos of the serial number labels?',
    'Price offer accepted. Let us coordinate forklift loading.'
  ];

  return (
    <div className="min-h-screen bg-surface-canvas py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-ink-near uppercase tracking-tight">
            Listing Communications & Q&A
          </h1>
          <p className="text-xs sm:text-sm font-sans text-gunmetal mt-1">
            Direct technical correspondence tied to specific e-waste lots and pickup coordination.
          </p>
        </div>

        {/* 2-Column Chat Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal-lg min-h-[600px] overflow-hidden">
          {/* Left Threads Column */}
          <div className="md:col-span-4 border-r-2 border-ink-near flex flex-col bg-surface-canvas">
            <div className="p-4 border-b-2 border-ink-near bg-white">
              <h3 className="font-display font-bold text-sm uppercase text-ink-near">
                Active Discussions ({messageThreads.length})
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
              {messageThreads.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-gray-500">
                  No conversations started yet.
                </div>
              ) : (
                messageThreads.map(thread => {
                  const isSelected = activeThread?.id === thread.id;
                  return (
                    <div
                      key={thread.id}
                      onClick={() => setSelectedThreadId(thread.id)}
                      className={`p-4 cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-stormy-soft/80 border-l-4 border-stormy-teal font-bold' 
                          : 'hover:bg-white bg-surface-canvas'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img 
                          src={thread.otherUser.avatar} 
                          alt="" 
                          className="w-10 h-10 rounded-brutal border border-ink-near object-cover shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-display font-bold text-xs text-ink-near truncate">
                              {thread.otherUser.name}
                            </h4>
                            <span className="text-[10px] font-mono text-gray-400 shrink-0">{thread.lastMessageTime}</span>
                          </div>

                          <p className="text-[11px] font-mono text-stormy-teal truncate mt-0.5">
                            Lot: {thread.listingTitle}
                          </p>

                          <p className="text-xs text-gray-600 line-clamp-1 mt-1 font-sans">
                            {thread.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Active Message Pane */}
          {activeThread ? (
            <div className="md:col-span-8 flex flex-col justify-between bg-surface-pure">
              {/* Top Listing Snippet Banner */}
              <div className="p-4 border-b-2 border-ink-near bg-surface-canvas flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={activeThread.listingImage}
                    alt=""
                    className="w-12 h-12 rounded-brutal border border-ink-near object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-sm text-ink-near truncate">
                      {activeThread.listingTitle}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                      <span>{activeThread.listingPriceOrBid}</span>
                      <span>•</span>
                      <span className="text-stormy-teal font-bold">{activeThread.otherUser.name}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openListingDetail(activeThread.listingId)}
                  className="px-3 py-1.5 rounded-brutal border-2 border-ink-near bg-white hover:bg-papaya font-mono font-bold text-xs uppercase shadow-brutal-xs flex items-center gap-1 shrink-0"
                >
                  <span>Inspect Lot</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[420px]">
                {activeThread.messages.map(msg => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-gray-400">
                        <span className="font-bold">{isMe ? 'You' : msg.senderName}</span>
                        <span>•</span>
                        <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>

                      <div
                        className={`max-w-md p-3.5 rounded-brutal-lg border-2 border-ink-near text-xs leading-relaxed ${
                          isMe
                            ? 'bg-stormy-teal text-white shadow-brutal-xs'
                            : 'bg-surface-canvas text-ink-near shadow-brutal-xs'
                        }`}
                      >
                        {msg.offerAmount && (
                          <div className="p-2 mb-2 bg-papaya text-ink-near rounded-brutal border border-ink-near flex items-center gap-2 font-mono font-bold">
                            <Handshake className="w-4 h-4 text-stormy-teal" />
                            <span>Proposed Offer: ₹{msg.offerAmount.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Reply Chips & Input */}
              <div className="p-4 border-t-2 border-ink-near bg-surface-canvas space-y-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {quickReplies.map((qr, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setInputMessage(qr)}
                      className="px-2.5 py-1 bg-white hover:bg-stormy-soft text-gunmetal border border-gray-300 rounded-brutal text-[11px] font-mono whitespace-nowrap"
                    >
                      {qr}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Type technical question, warehouse inquiry, or terms..."
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-white border-2 border-ink-near rounded-brutal text-xs font-sans focus:outline-none focus:shadow-brutal-xs"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-brutal border-2 border-ink-near bg-stormy-teal hover:bg-stormy-dark text-white font-display font-bold text-xs uppercase tracking-wider shadow-brutal active:translate-y-0.5 flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4 text-papaya" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="md:col-span-8 flex items-center justify-center p-12 text-center text-gray-500 font-mono text-xs">
              Select a conversation thread from the left to view messages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
