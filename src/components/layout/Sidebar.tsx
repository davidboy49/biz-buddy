import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Settings,
  LogOut,
  Zap,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, shortcut: '1' },
  { id: 'pos', label: 'Point of Sale', icon: ShoppingCart, shortcut: '2' },
  { id: 'products', label: 'Products', icon: Package, shortcut: '3' },
  { id: 'reports', label: 'Reports', icon: BarChart3, shortcut: '4' },
  { id: 'settings', label: 'Settings', icon: Settings, shortcut: '5' },
];

export function Sidebar({ currentPage, onNavigate, isMobileOpen, onMobileClose }: SidebarProps) {
  const handleNavigate = (page: string) => {
    onNavigate(page);
    onMobileClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen w-64 sidebar-gradient border-r border-sidebar-border transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary glow-effect">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">FlowPOS</h1>
                <p className="text-xs text-sidebar-foreground/60">Enterprise Suite</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-sidebar-foreground"
              onClick={onMobileClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md glow-effect"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </div>
                  <kbd className={cn(
                    "hidden rounded bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-mono lg:inline-block",
                    isActive ? "bg-sidebar-primary-foreground/20" : "opacity-50 group-hover:opacity-100"
                  )}>
                    {item.shortcut}
                  </kbd>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
