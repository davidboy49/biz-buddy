import { useState } from 'react';
import { Store, Bell, Shield, Palette, ChevronLeft, Package, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StoreSettings } from './StoreSettings';
import { NotificationSettings } from './NotificationSettings';
import { SecuritySettings } from './SecuritySettings';
import { AppearanceSettings } from './AppearanceSettings';
import { DangerZone } from './DangerZone';
import { CategorySettings } from './CategorySettings';
import { UserManagementSettings } from './UserManagementSettings';

type SettingsSection = 'main' | 'store' | 'notifications' | 'security' | 'appearance' | 'categories' | 'users';

const settingsSections = [
  {
    id: 'store' as const,
    title: 'Store Settings',
    description: 'Configure your store name, address, and contact information',
    icon: Store,
  },
  {
    id: 'notifications' as const,
    title: 'Notifications',
    description: 'Manage email and push notification preferences',
    icon: Bell,
  },
  {
    id: 'security' as const,
    title: 'Security',
    description: 'Update password and manage access permissions',
    icon: Shield,
  },
  {
    id: 'appearance' as const,
    title: 'Appearance',
    description: 'Customize theme colors and display options',
    icon: Palette,
  },
  {
    id: 'categories' as const,
    title: 'Categories',
    description: 'Manage product categories for inventory and POS filters',
    icon: Package,
  },
  {
    id: 'users' as const,
    title: 'User Management',
    description: 'Update profile details and account information',
    icon: Users,
  },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('main');

  const renderSection = () => {
    switch (activeSection) {
      case 'store':
        return <StoreSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'categories':
        return <CategorySettings />;
      case 'users':
        return <UserManagementSettings />;
      default:
        return null;
    }
  };

  if (activeSection !== 'main') {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          className="gap-2 mb-2"
          onClick={() => setActiveSection('main')}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Settings
        </Button>
        
        <div className="stat-card animate-fade-in">
          {renderSection()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your store preferences</p>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          
          return (
            <button 
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="stat-card cursor-pointer animate-fade-in text-left hover:border-primary/50 transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Danger Zone */}
      <div className="stat-card animate-fade-in" style={{ animationDelay: '200ms' }}>
        <DangerZone />
      </div>
    </div>
  );
}
