import { useMemo, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CategorySettings() {
  const { categories, addCategory } = useProducts();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name)),
    [categories]
  );

  const handleAddCategory = async () => {
    if (isAdding) return;
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) return;

    const existingCategory = categories.find(
      (category) => category.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingCategory) {
      setNewCategoryName('');
      return;
    }

    setIsAdding(true);
    try {
      await addCategory(trimmedName);
      setNewCategoryName('');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Product Categories</h2>
        <p className="text-sm text-muted-foreground">
          Create and manage the categories used in products and POS filtering.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-category">Add category</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="new-category"
            placeholder="e.g. Snacks"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button type="button" onClick={handleAddCategory} disabled={isAdding}>
            {isAdding ? 'Adding...' : 'Add Category'}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Existing categories</h3>
        {sortedCategories.length === 0 ? (
          <p className="text-sm text-muted-foreground">No categories yet. Add your first one above.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {sortedCategories.map((category) => (
              <span
                key={category.id}
                className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
