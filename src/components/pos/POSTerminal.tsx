import { useState } from 'react';
import { products } from '@/data/products';
import { Product, CartItem, Category } from '@/types/erp';
import { ProductGrid } from './ProductGrid';
import { Cart } from './Cart';
import { CategoryFilter } from './CategoryFilter';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Hash, DollarSign } from 'lucide-react';

export function POSTerminal() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const { toast } = useToast();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (product: Product) => {
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
      setCart(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => setCart([]);

  const handleCheckout = (method: 'cash' | 'card') => {
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) * 1.08;
    
    toast({
      title: "Payment successful!",
      description: `$${total.toFixed(2)} paid via ${method}`,
      duration: 3000,
    });
    
    clearCart();
  };

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
