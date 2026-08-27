import React from 'react';
import { useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { MarketplaceHome } from './components/marketplace/MarketplaceHome';
import { ListingDetailPage } from './components/listing-detail/ListingDetailPage';
import { PostListingWizard } from './components/post-listing/PostListingWizard';
import { SellerDashboard } from './components/dashboard/SellerDashboard';
import { BuyerDashboard } from './components/dashboard/BuyerDashboard';
import { MessagingCenter } from './components/messages/MessagingCenter';
import { UserProfilePage } from './components/profile/UserProfilePage';
import { AdminModerationPanel } from './components/admin/AdminModerationPanel';

export const AppContent: React.FC = () => {
  const { activeTab } = useMarketplace();

  const renderContent = () => {
    switch (activeTab) {
      case 'marketplace':
        return <MarketplaceHome />;
      case 'listing-detail':
        return <ListingDetailPage />;
      case 'post-listing':
        return <PostListingWizard />;
      case 'seller-dashboard':
        return <SellerDashboard />;
      case 'buyer-dashboard':
        return <BuyerDashboard />;
      case 'messages':
        return <MessagingCenter />;
      case 'profile':
        return <UserProfilePage />;
      case 'admin':
        return <AdminModerationPanel />;
      default:
        return <MarketplaceHome />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pb-16 md:pb-0">
        {renderContent()}
      </div>
      <Footer />
      <BottomNav />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return <AppContent />;
}

export default App;
