export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'cash' | 'card';
  timestamp: Date;
}

export interface DashboardStats {
  todaySales: number;
  totalOrders: number;
  avgOrderValue: number;
  lowStockItems: number;
}

export type Category = 'all' | 'beverages' | 'food' | 'snacks' | 'desserts';
