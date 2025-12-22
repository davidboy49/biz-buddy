import { DollarSign, ShoppingBag, TrendingUp, AlertTriangle, Sun, Moon, Sunset, Loader2 } from 'lucide-react';
import { StatCard } from './StatCard';
import { RecentSales } from './RecentSales';
import { SalesChart } from './SalesChart';
import { useSales } from '@/hooks/useSales';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good morning', icon: Sun };
  if (hour < 17) return { text: 'Good afternoon', icon: Sunset };
  return { text: 'Good evening', icon: Moon };
}

export function Dashboard() {
  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;
  const { stats, sales, loading } = useSales();

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
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <GreetingIcon className="h-4 w-4" />
          <span className="text-sm">{greeting.text}</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Here's your business overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Sales"
          value={`$${stats.todaySales.toFixed(2)}`}
          change={`${stats.totalOrders} orders today`}
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          change="Orders placed today"
          changeType="positive"
          icon={ShoppingBag}
        />
        <StatCard
          title="Avg Order Value"
          value={`$${stats.avgOrderValue.toFixed(2)}`}
          change="Per transaction"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStockItems.toString()}
          change={stats.lowStockItems > 0 ? "Needs attention" : "All stocked"}
          changeType={stats.lowStockItems > 0 ? "negative" : "positive"}
          icon={AlertTriangle}
          iconColor={stats.lowStockItems > 0 ? "text-warning" : undefined}
        />
      </div>

      {/* Charts and Lists */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <SalesChart sales={sales} />
        </div>
        <div className="lg:col-span-3">
          <RecentSales sales={sales} />
        </div>
      </div>
    </div>
  );
}
