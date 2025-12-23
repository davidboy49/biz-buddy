import { useState, useEffect } from 'react';
import { Store, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface StoreData {
  storeName: string;
  address: string;
  phone: string;
  email: string;
  taxId: string;
  currency: string;
}

const defaultStoreData: StoreData = {
  storeName: '',
  address: '',
  phone: '',
  email: '',
  taxId: '',
  currency: 'USD',
};

export function StoreSettings() {
  const [storeData, setStoreData] = useState<StoreData>(defaultStoreData);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('storeSettings');
    if (saved) {
      setStoreData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('storeSettings', JSON.stringify(storeData));
      toast({ title: 'Settings saved', description: 'Store settings have been updated.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Store className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Store Settings</h2>
          <p className="text-sm text-muted-foreground">Configure your store information</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            id="storeName"
            value={storeData.storeName}
            onChange={(e) => setStoreData({ ...storeData, storeName: e.target.value })}
            placeholder="My Store"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={storeData.email}
            onChange={(e) => setStoreData({ ...storeData, email: e.target.value })}
            placeholder="store@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={storeData.phone}
            onChange={(e) => setStoreData({ ...storeData, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxId">Tax ID</Label>
          <Input
            id="taxId"
            value={storeData.taxId}
            onChange={(e) => setStoreData({ ...storeData, taxId: e.target.value })}
            placeholder="XX-XXXXXXX"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Input
            id="currency"
            value={storeData.currency}
            onChange={(e) => setStoreData({ ...storeData, currency: e.target.value })}
            placeholder="USD"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={storeData.address}
          onChange={(e) => setStoreData({ ...storeData, address: e.target.value })}
          placeholder="123 Main Street, City, Country"
          rows={3}
        />
      </div>

      <Button onClick={handleSave} disabled={isSaving} className="gap-2">
        <Save className="h-4 w-4" />
        Save Settings
      </Button>
    </div>
  );
}
