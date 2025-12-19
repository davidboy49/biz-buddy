import { Store, Bell, Shield, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const settingsSections = [
  {
    title: 'Store Settings',
    description: 'Configure your store name, address, and contact information',
    icon: Store,
  },
  {
    title: 'Notifications',
    description: 'Manage email and push notification preferences',
    icon: Bell,
  },
  {
    title: 'Security',
    description: 'Update password and manage access permissions',
    icon: Shield,
  },
  {
    title: 'Appearance',
    description: 'Customize theme colors and display options',
    icon: Palette,
  },
];

export function SettingsPage() {
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
            <div 
              key={section.title}
              className="stat-card cursor-pointer animate-fade-in"
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
            </div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <div className="stat-card border-destructive/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <h3 className="font-semibold text-destructive">Danger Zone</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Irreversible actions that affect your store data
        </p>
        <div className="mt-4 flex gap-3">
          <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground">
            Clear All Data
          </Button>
        </div>
      </div>
    </div>
  );
}
