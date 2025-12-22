import { useState, useCallback } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { POSTerminal } from '@/components/pos/POSTerminal';
import { ProductsPage } from '@/components/products/ProductsPage';
import { ReportsPage } from '@/components/reports/ReportsPage';
import { SettingsPage } from '@/components/settings/SettingsPage';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = useCallback((page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  }, []);

  // Keyboard shortcuts for navigation
  useKeyboardShortcuts([
    { key: '1', callback: () => navigateTo('dashboard') },
    { key: '2', callback: () => navigateTo('pos') },
    { key: '3', callback: () => navigateTo('products') },
    { key: '4', callback: () => navigateTo('reports') },
    { key: '5', callback: () => navigateTo('settings') },
  ]);

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
      <MobileHeader 
        isOpen={isMobileMenuOpen} 
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={navigateTo}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      <main className="pt-16 lg:ml-64 lg:pt-0">
        <div className="p-4 lg:p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default Index;
