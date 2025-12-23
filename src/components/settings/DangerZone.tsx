import { useState } from 'react';
import { AlertTriangle, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function DangerZone() {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleClearAllData = async () => {
    if (confirmText !== 'DELETE') {
      toast({ variant: 'destructive', title: 'Error', description: 'Please type DELETE to confirm' });
      return;
    }

    setIsDeleting(true);
    try {
      // Clear sale_items first (foreign key constraint)
      await supabase.from('sale_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      // Clear sales
      await supabase.from('sales').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      // Clear products
      await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      // Clear customers
      await supabase.from('customers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Clear local storage settings
      localStorage.removeItem('storeSettings');
      localStorage.removeItem('notificationSettings');
      
      toast({ title: 'Data cleared', description: 'All store data has been deleted.' });
      setConfirmText('');
      
      // Reload page to reset state
      window.location.reload();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to clear data' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
          <p className="text-sm text-muted-foreground">Irreversible actions</p>
        </div>
      </div>

      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <div className="flex items-start gap-3">
          <Trash2 className="h-5 w-5 text-destructive mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-destructive">Clear All Data</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This will permanently delete all products, sales, and customer data. This action cannot be undone.
            </p>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="mt-4">
                  Clear All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your products, sales history, and customer data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-2 py-4">
                  <Label htmlFor="confirm">Type DELETE to confirm</Label>
                  <Input
                    id="confirm"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="DELETE"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setConfirmText('')}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearAllData}
                    disabled={confirmText !== 'DELETE' || isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete Everything'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
