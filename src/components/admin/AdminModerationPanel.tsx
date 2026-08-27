import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Eye, 
  Users, 
  Gavel, 
  Layers, 
  ArrowUpRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export const AdminModerationPanel: React.FC = () => {
  const { 
    listings, 
    reports, 
    updateListingStatus, 
    deleteListing, 
    openListingDetail,
    addToast
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'listings' | 'reports' | 'stats'>('reports');

  const pendingReports = reports.filter(r => r.status === 'Pending Review');

  const handleResolveReport = (reportId: string, action: 'resolved' | 'dismissed') => {
    addToast(
      action === 'resolved' ? 'Report Resolved' : 'Report Dismissed',
      `Audit log updated for report #${reportId.slice(-4)}.`,
      'info'
    );
  };

  return (
    <div className="min-h-screen bg-surface-canvas py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-brutal bg-red-600 text-white border-2 border-ink-near flex items-center justify-center shadow-brutal-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-ink-near uppercase tracking-tight">
                Platform Safety & Moderation Desk
              </h1>
              <p className="text-xs font-mono text-gray-500">
                CPCB Compliance Audits, Fraud Prevention & Listing Moderation
              </p>
            </div>
          </div>

          <span className="px-3 py-1 bg-red-100 text-red-800 border-2 border-red-700 rounded-brutal text-xs font-mono font-bold uppercase shadow-brutal-xs">
            Admin Mode Active
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 bg-surface-pure rounded-brutal-lg border-2 border-ink-near w-fit shadow-brutal-xs">
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-4 py-2 rounded-brutal text-xs font-mono font-bold transition-all ${
              activeTab === 'reports' ? 'bg-red-600 text-white shadow-brutal-xs' : 'text-gunmetal hover:bg-gray-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Safety Reports ({reports.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-brutal text-xs font-mono font-bold transition-all ${
              activeTab === 'listings' ? 'bg-stormy-teal text-white shadow-brutal-xs' : 'text-gunmetal hover:bg-gray-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All Listings ({listings.length})</span>
          </button>
        </div>

        {/* REPORTS DESK */}
        {activeTab === 'reports' && (
          <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal-lg space-y-4">
            <h3 className="font-display font-black text-base text-ink-near uppercase pb-2 border-b-2 border-ink-near">
              Flagged Lot Reports & Safety Inquiries
            </h3>

            {reports.length === 0 ? (
              <p className="text-xs font-mono text-gray-500 py-6 text-center">No reports filed.</p>
            ) : (
              <div className="space-y-4">
                {reports.map(rep => (
                  <div key={rep.id} className="p-4 bg-surface-canvas rounded-brutal-lg border-2 border-ink-near space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-mono font-bold uppercase">
                          {rep.reason}
                        </span>
                        <span className="font-display font-bold text-xs text-ink-near">
                          Target Lot: {rep.listingTitle}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">
                        {new Date(rep.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs font-sans text-gunmetal bg-white p-3 rounded-brutal border border-gray-300">
                      "{rep.description}"
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => openListingDetail(rep.listingId)}
                        className="text-xs font-mono font-bold text-stormy-teal hover:underline flex items-center gap-1"
                      >
                        <span>Inspect Listing →</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleResolveReport(rep.id, 'dismissed')}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 border border-ink-near text-ink-near font-mono text-xs font-bold rounded-brutal shadow-brutal-xs"
                        >
                          Dismiss Report
                        </button>
                        <button
                          onClick={() => {
                            deleteListing(rep.listingId);
                            handleResolveReport(rep.id, 'resolved');
                          }}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white border border-ink-near font-mono text-xs font-bold rounded-brutal shadow-brutal-xs"
                        >
                          Remove Listing & Ban
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LISTINGS DESK */}
        {activeTab === 'listings' && (
          <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near shadow-brutal-lg overflow-hidden">
            <div className="p-4 bg-surface-canvas border-b-2 border-ink-near flex justify-between items-center">
              <h3 className="font-display font-black text-sm uppercase text-ink-near">
                Platform Inventory ({listings.length} Active Lots)
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface-canvas border-b-2 border-ink-near uppercase text-gray-600">
                  <tr>
                    <th className="p-4">Lot</th>
                    <th className="p-4">Seller</th>
                    <th className="p-4">Trading Model</th>
                    <th className="p-4">Current Price</th>
                    <th className="p-4 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {listings.map(l => (
                    <tr key={l.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <span className="font-bold text-ink-near block">{l.title}</span>
                        <span className="text-[10px] text-gray-500">{l.category} • {l.quantity} {l.unit}</span>
                      </td>
                      <td className="p-4 font-medium">{l.seller.name}</td>
                      <td className="p-4">{l.listingType}</td>
                      <td className="p-4 font-bold">
                        ₹{(l.currentBid || l.startingBid || l.askingPrice)?.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openListingDetail(l.id)}
                          className="px-2.5 py-1 bg-white border border-ink-near rounded-brutal text-xs hover:bg-gray-100"
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteListing(l.id)}
                          className="px-2.5 py-1 bg-red-100 text-red-800 border border-red-400 rounded-brutal text-xs hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
