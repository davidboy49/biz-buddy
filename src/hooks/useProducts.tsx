import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string | null;
  category_name?: string;
  stock: number;
  sku: string | null;
  barcode: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name)
      `)
      .order('name');

    if (error) {
      toast({ variant: 'destructive', title: 'Error loading products', description: error.message });
      return;
    }

    const formattedProducts = data.map((p: any) => ({
      ...p,
      category_name: p.categories?.name || 'Uncategorized',
    }));

    setProducts(formattedProducts);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      toast({ variant: 'destructive', title: 'Error loading categories', description: error.message });
      return;
    }

    setCategories(data || []);
  };

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]).finally(() => setLoading(false));
  }, []);

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category_name'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) {
      toast({ variant: 'destructive', title: 'Error adding product', description: error.message });
      return null;
    }

    await fetchProducts();
    toast({ title: 'Product added', description: `${product.name} has been added.` });
    return data;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error updating product', description: error.message });
      return false;
    }

    await fetchProducts();
    toast({ title: 'Product updated' });
    return true;
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error deleting product', description: error.message });
      return false;
    }

    await fetchProducts();
    toast({ title: 'Product deleted' });
    return true;
  };

  const addCategory = async (name: string) => {
    const { data, error } = await supabase
      .from('categories')
      .insert({ name })
      .select()
      .single();

    if (error) {
      toast({ variant: 'destructive', title: 'Error adding category', description: error.message });
      return null;
    }

    await fetchCategories();
    return data;
  };

  return {
    products,
    categories,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    refetch: () => Promise.all([fetchProducts(), fetchCategories()]),
  };
}
