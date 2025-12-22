import { Minus, Plus, Trash2, CreditCard, Banknote, ShoppingCart } from 'lucide-react';
import { CartItem } from '@/types/erp';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClear: () => void;
  onCheckout: (method: 'cash' | 'card') => void;
}

export function Cart({ items, onUpdateQuantity, onClear, onCheckout }: CartProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex w-full flex-col rounded-2xl bg-card shadow-lg lg:w-96">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Current Order</h2>
        </div>
        {items.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <ShoppingCart className="mb-3 h-12 w-12 text-muted-foreground/40" />
            <p className="text-muted-foreground">Cart is empty</p>
            <p className="text-sm text-muted-foreground/70">Add items to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div 
                key={item.product.id}
                className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.product.name}</p>
                  <p className="font-mono text-sm text-primary">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-mono font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary & Actions */}
      <div className="border-t border-border p-4">
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-mono text-foreground">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span className="font-mono text-foreground">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="number-display text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="pos"
            size="lg"
            onClick={() => onCheckout('cash')}
            disabled={items.length === 0}
            className="flex-col gap-1 py-6"
          >
            <Banknote className="h-6 w-6" />
            <span>Cash</span>
          </Button>
          <Button
            variant="pos-action"
            size="lg"
            onClick={() => onCheckout('card')}
            disabled={items.length === 0}
            className="flex-col gap-1 py-6"
          >
            <CreditCard className="h-6 w-6" />
            <span>Card</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
