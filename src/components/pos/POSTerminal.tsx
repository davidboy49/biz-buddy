import { useState } from 'react';
import { products } from '@/data/products';
import { Product, CartItem, Category } from '@/types/erp';
import { ProductGrid } from './ProductGrid';
import { Cart } from './Cart';
import { CategoryFilter } from './CategoryFilter';

export function POSTerminal() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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
    console.log('Processing payment:', method, cart);
    clearCart();
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-6">
      {/* Products Section */}
      <div className="flex flex-1 flex-col space-y-4">
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground">Point of Sale</h1>
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
  );
}
