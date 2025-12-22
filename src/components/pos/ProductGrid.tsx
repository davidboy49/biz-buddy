import { Product } from '@/types/erp';
import { Coffee, UtensilsCrossed, Cookie, Cake } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  beverages: Coffee,
  food: UtensilsCrossed,
  snacks: Cookie,
  desserts: Cake,
};

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid flex-1 auto-rows-min gap-3 overflow-y-auto grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => {
        const Icon = categoryIcons[product.category] || Coffee;
        
        return (
          <button
            key={product.id}
            onClick={() => onAddToCart(product)}
            className="pos-item text-left animate-scale-in"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground">{product.name}</h3>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-mono text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">
                Stock: {product.stock}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
