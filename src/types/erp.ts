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
}

export interface CartItem {
  product: Product;
  quantity: number;
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
}

export interface DashboardStats {
  todaySales: number;
  totalOrders: number;
  avgOrderValue: number;
  lowStockItems: number;
}

export interface Category {
  id: string;
  name: string;
}
