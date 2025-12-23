import { Coffee, UtensilsCrossed, Cookie, Cake } from 'lucide-react';
import { Product } from '@/types/erp';
import { cn } from '@/lib/utils';

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
        const categoryName = product.category_name?.toLowerCase() || '';
        const Icon = categoryIcons[categoryName] || Coffee;
        
        return (
          <button
            key={product.id}
            onClick={() => onAddToCart(product)}
            className={cn(
              "group relative flex flex-col items-center justify-center rounded-xl bg-card p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-primary/20",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-1 text-center text-sm font-medium text-foreground line-clamp-2">
              {product.name}
            </h3>
            <p className="font-mono text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
            <span className="mt-1 text-xs text-muted-foreground">
              {product.stock} in stock
            </span>
          </button>
        );
      })}
    </div>
  );
}
