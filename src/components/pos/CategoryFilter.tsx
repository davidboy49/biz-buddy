import { Coffee, UtensilsCrossed, Cookie, Cake, LayoutGrid } from 'lucide-react';
import { Category } from '@/types/erp';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All Items', icon: LayoutGrid },
  { id: 'beverages', label: 'Beverages', icon: Coffee },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'snacks', label: 'Snacks', icon: Cookie },
  { id: 'desserts', label: 'Desserts', icon: Cake },
];

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = selected === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-primary text-primary-foreground shadow-md glow-effect"
                : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
