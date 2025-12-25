import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function UserManagementSettings() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setEmail(user.email ?? '');

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .single();

      if (error) {
        return;
      }

      setFullName(data?.full_name ?? '');
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user || isSaving) return;
    setIsSaving(true);

    try {
      if (email && email !== user.email) {
        const { error } = await supabase.auth.updateUser({ email });
        if (error) {
          toast({ variant: 'destructive', title: 'Email update failed', description: error.message });
          return;
        }
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ user_id: user.id, full_name: fullName })
        .select()
        .single();

      if (profileError) {
        toast({ variant: 'destructive', title: 'Profile update failed', description: profileError.message });
        return;
      }

      toast({ title: 'Profile updated', description: 'Your account details have been saved.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading account details...</p>;
  }

  if (!user) {
    return <p className="text-sm text-muted-foreground">Sign in to manage your account.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">User Management</h2>
        <p className="text-sm text-muted-foreground">
          Update your account profile details and email address.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full-name">Full name</Label>
          <Input
            id="full-name"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <Button type="button" onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
}
