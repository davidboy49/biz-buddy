import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';

export interface SaleItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Sale {
  id: string;
  cashier_id: string;
  customer_id: string | null;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  payment_method: 'cash' | 'card' | 'mobile' | 'other';
  notes: string | null;
  created_at: string;
  items?: SaleItem[];
}

export interface SaleStats {
  todaySales: number;
  totalOrders: number;
  avgOrderValue: number;
  lowStockItems: number;
}

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [stats, setStats] = useState<SaleStats>({
    todaySales: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    lowStockItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchSales = async () => {
    const { data, error } = await supabase
      .from('sales')
      .select(`
        *,
        sale_items(*)
      `)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      toast({ variant: 'destructive', title: 'Error loading sales', description: error.message });
      return;
    }

    setSales(data || []);
  };

  const fetchStats = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get today's sales
    const { data: todaySalesData } = await supabase
      .from('sales')
      .select('total')
      .gte('created_at', today.toISOString());

    const todaySales = todaySalesData?.reduce((sum, s) => sum + Number(s.total), 0) || 0;
    const totalOrders = todaySalesData?.length || 0;
    const avgOrderValue = totalOrders > 0 ? todaySales / totalOrders : 0;

    // Get low stock items
    const { count: lowStockItems } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .lt('stock', 10)
      .eq('is_active', true);

    setStats({
      todaySales,
      totalOrders,
      avgOrderValue,
      lowStockItems: lowStockItems || 0,
    });
  };

  useEffect(() => {
    Promise.all([fetchSales(), fetchStats()]).finally(() => setLoading(false));
  }, []);

  const createSale = async (
    items: SaleItem[],
    paymentMethod: 'cash' | 'card' | 'mobile' | 'other',
    discount: number = 0,
    customerId: string | null = null,
    notes: string | null = null
  ) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to make a sale.' });
      return null;
    }

    const subtotal = items.reduce((sum, item) => sum + item.total_price, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax - discount;

    // Create sale
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert({
        cashier_id: user.id,
        customer_id: customerId,
        subtotal,
        discount,
        tax,
        total,
        payment_method: paymentMethod,
        notes,
      })
      .select()
      .single();

    if (saleError) {
      toast({ variant: 'destructive', title: 'Error creating sale', description: saleError.message });
      return null;
    }

    // Create sale items
    const saleItems = items.map((item) => ({
      sale_id: sale.id,
      product_id: item.product_id,
      product_name: item.product_name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price,
    }));

    const { error: itemsError } = await supabase
      .from('sale_items')
      .insert(saleItems);

    if (itemsError) {
      toast({ variant: 'destructive', title: 'Error adding sale items', description: itemsError.message });
      return null;
    }

    await Promise.all([fetchSales(), fetchStats()]);
    toast({ title: 'Sale completed!', description: `Total: $${total.toFixed(2)}` });
    return sale;
  };

  return {
    sales,
    stats,
    loading,
    createSale,
    refetch: () => Promise.all([fetchSales(), fetchStats()]),
  };
}
