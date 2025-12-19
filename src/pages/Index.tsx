import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { POSTerminal } from '@/components/pos/POSTerminal';
import { ProductsPage } from '@/components/products/ProductsPage';
import { ReportsPage } from '@/components/reports/ReportsPage';
import { SettingsPage } from '@/components/settings/SettingsPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'pos':
        return <POSTerminal />;
      case 'products':
        return <ProductsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="ml-64 p-6">
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;
