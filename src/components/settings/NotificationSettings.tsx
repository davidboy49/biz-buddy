import { useState, useEffect } from 'react';
import { Bell, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface NotificationPrefs {
  lowStockAlerts: boolean;
  dailySalesReport: boolean;
  newOrderNotifications: boolean;
  customerFeedback: boolean;
  systemUpdates: boolean;
}

const defaultNotificationPrefs: NotificationPrefs = {
  lowStockAlerts: true,
  dailySalesReport: false,
  newOrderNotifications: true,
  customerFeedback: false,
  systemUpdates: true,
};

export function NotificationSettings() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(defaultNotificationPrefs);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      setPrefs(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(prefs));
      toast({ title: 'Settings saved', description: 'Notification preferences have been updated.' });
    } finally {
      setIsSaving(false);
    }
  };

  const notificationItems = [
    { key: 'lowStockAlerts' as const, label: 'Low Stock Alerts', description: 'Get notified when products are running low' },
    { key: 'dailySalesReport' as const, label: 'Daily Sales Report', description: 'Receive daily sales summary via email' },
    { key: 'newOrderNotifications' as const, label: 'New Order Notifications', description: 'Get notified for new sales' },
    { key: 'customerFeedback' as const, label: 'Customer Feedback', description: 'Receive notifications for customer reviews' },
    { key: 'systemUpdates' as const, label: 'System Updates', description: 'Get notified about system changes and updates' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Notification Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
        </div>
      </div>

      <div className="space-y-4">
        {notificationItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor={item.key} className="text-base font-medium">{item.label}</Label>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <Switch
              id={item.key}
              checked={prefs[item.key]}
              onCheckedChange={(checked) => setPrefs({ ...prefs, [item.key]: checked })}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleSave} disabled={isSaving} className="gap-2">
        <Save className="h-4 w-4" />
        Save Preferences
      </Button>
    </div>
  );
}
