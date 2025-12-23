import { Coffee, UtensilsCrossed, Cookie, Cake, LayoutGrid } from 'lucide-react';
import { Category } from '@/types/erp';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (categoryId: string) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  beverages: Coffee,
  food: UtensilsCrossed,
  snacks: Cookie,
  desserts: Cake,
};

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelect('all')}
        className={cn(
          "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
          selected === 'all'
            ? "bg-primary text-primary-foreground shadow-md glow-effect"
            : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        All Items
      </button>
      {categories.map((category) => {
        const Icon = categoryIcons[category.name.toLowerCase()] || Coffee;
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
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
