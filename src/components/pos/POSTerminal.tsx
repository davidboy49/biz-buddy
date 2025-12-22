import { useState } from 'react';
import { useProducts, Product } from '@/hooks/useProducts';
import { useSales } from '@/hooks/useSales';
import { CartItem } from '@/types/erp';
import { ProductGrid } from './ProductGrid';
import { Cart } from './Cart';
import { CategoryFilter } from './CategoryFilter';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Hash, DollarSign, Loader2 } from 'lucide-react';

export function POSTerminal() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { products, categories, loading: productsLoading } = useProducts();
  const { createSale } = useSales();
  const { toast } = useToast();

  const activeProducts = products.filter(p => p.is_active && p.stock > 0);
  const filteredProducts = selectedCategory === 'all'
    ? activeProducts
    : activeProducts.filter(p => p.category_id === selectedCategory);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    const currentQuantity = existingItem?.quantity || 0;

    if (currentQuantity >= product.stock) {
      toast({
        variant: "destructive",
        title: "Out of stock",
        description: `Only ${product.stock} available`,
      });
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    toast({
      title: "Added to cart",
      description: `${product.name} added`,
      duration: 1500,
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } else {
      const item = cart.find(i => i.product.id === productId);
      if (item && quantity > item.product.stock) {
        toast({
          variant: "destructive",
          title: "Insufficient stock",
          description: `Only ${item.product.stock} available`,
        });
        return;
      }
      setCart(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => setCart([]);

  const handleCheckout = async (method: 'cash' | 'card') => {
    if (cart.length === 0) return;

    const items = cart.map(item => ({
      product_id: item.product.id,
      product_name: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.price,
      total_price: item.product.price * item.quantity,
    }));

    const sale = await createSale(items, method);

    if (sale) {
      clearCart();
    }
  };

  if (productsLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:h-[calc(100vh-2rem)]">
      {/* Quick Stats Bar */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-card p-4 shadow-sm animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Items in Cart</p>
            <p className="font-mono text-lg font-bold text-foreground">{cartItemCount}</p>
          </div>
        </div>
        <div className="h-8 w-px bg-border hidden sm:block" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <DollarSign className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Cart Value</p>
            <p className="font-mono text-lg font-bold text-foreground">${cartTotal.toFixed(2)}</p>
          </div>
        </div>
        <div className="h-8 w-px bg-border hidden sm:block" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Hash className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Products Available</p>
            <p className="font-mono text-lg font-bold text-foreground">{filteredProducts.length}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 lg:flex-row">
        {/* Products Section */}
        <div className="flex flex-1 flex-col space-y-4">
          <div className="animate-slide-up">
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Point of Sale</h1>
            <p className="text-muted-foreground">Select items to add to cart</p>
          </div>

          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <ProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
          />
        </div>

        {/* Cart Section */}
        <Cart
          items={cart}
          onUpdateQuantity={updateQuantity}
          onClear={clearCart}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
