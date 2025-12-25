import { useState } from 'react';
import { Search, Plus, Package, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useProducts, Product } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { products, categories, loading, addProduct, updateProduct, deleteProduct, addCategory } = useProducts();
  const { toast } = useToast();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    stock: '',
    sku: '',
    barcode: '',
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.sku?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const resetForm = () => {
    setFormData({ name: '', price: '', category_id: '', stock: '', sku: '', barcode: '' });
    setEditingProduct(null);
    setNewCategoryName('');
  };

  const handleDialogChange = (open: boolean) => {
    if (isSubmitting) return; // Prevent closing during submission
    setIsAddDialogOpen(open);
    if (!open) resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const priceValue = Number.parseFloat(formData.price);
      const stockValue = Number.parseInt(formData.stock, 10);

      if (!Number.isFinite(priceValue) || priceValue < 0) {
        toast({ variant: 'destructive', title: 'Invalid price', description: 'Enter a valid price amount.' });
        return;
      }

      if (!Number.isFinite(stockValue) || stockValue < 0) {
        toast({ variant: 'destructive', title: 'Invalid stock', description: 'Enter a valid stock quantity.' });
        return;
      }

      const productData = {
        name: formData.name.trim(),
        price: priceValue,
        category_id: formData.category_id && formData.category_id.trim() !== '' ? formData.category_id : null,
        stock: stockValue,
        sku: formData.sku.trim() || null,
        barcode: formData.barcode.trim() || null,
        image_url: null,
        is_active: true,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }

      setIsAddDialogOpen(false);
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = async () => {
    if (isAddingCategory) return;
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) return;

    const existingCategory = categories.find(
      (category) => category.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingCategory) {
      setFormData((prev) => ({ ...prev, category_id: existingCategory.id }));
      setNewCategoryName('');
      return;
    }

    setIsAddingCategory(true);
    try {
      const createdCategory = await addCategory(trimmedName);
      if (createdCategory?.id) {
        setFormData((prev) => ({ ...prev, category_id: createdCategory.id }));
        setNewCategoryName('');
      }
    } finally {
      setIsAddingCategory(false);
    }
  };

  const handlePriceChange = (value: string) => {
    const sanitized = value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    const [integerPart, ...decimalParts] = sanitized.split('.');
    const normalized = decimalParts.length
      ? `${integerPart}.${decimalParts.join('')}`
      : integerPart;
    setFormData((prev) => ({ ...prev, price: normalized }));
  };

  const handleDigitsChange = (field: 'stock' | 'sku' | 'barcode', value: string) => {
    const sanitized = value.replace(/\D/g, '');
    setFormData((prev) => ({ ...prev, [field]: sanitized }));
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category_id: product.category_id || '',
      stock: product.stock.toString(),
      sku: product.sku || '',
      barcode: product.barcode || '',
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your inventory and products</p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={handleDialogChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => handleDigitsChange('stock', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new category"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button type="button" variant="secondary" onClick={handleAddCategory} disabled={isAddingCategory}>
                    {isAddingCategory ? 'Adding...' : 'Add'}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    type="text"
                    inputMode="numeric"
                    placeholder="Digits only"
                    value={formData.sku}
                    onChange={(e) => handleDigitsChange('sku', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input
                    id="barcode"
                    type="text"
                    inputMode="numeric"
                    placeholder="Digits only"
                    value={formData.barcode}
                    onChange={(e) => handleDigitsChange('barcode', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => handleDialogChange(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingProduct ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>{editingProduct ? 'Update' : 'Add'} Product</>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md animate-fade-in">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center rounded-xl border-2 border-dashed border-border">
          <div className="text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-2 text-muted-foreground">No products found</p>
            <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add your first product
            </Button>
          </div>
        </div>
      ) : (
        <div className="stat-card overflow-hidden p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  SKU
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Stock
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-muted/30 animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-muted-foreground">{product.sku || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize text-secondary-foreground">
                      {product.category_name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                      product.stock > 20
                        ? "bg-success/10 text-success"
                        : product.stock > 10
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                    )}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(product)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
