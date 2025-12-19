import { DollarSign, ShoppingBag, TrendingUp, AlertTriangle } from 'lucide-react';
import { StatCard } from './StatCard';
import { RecentSales } from './RecentSales';
import { SalesChart } from './SalesChart';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Sales"
          value="$2,847"
          change="+12.5% from yesterday"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value="124"
          change="+8 new orders"
          changeType="positive"
          icon={ShoppingBag}
        />
        <StatCard
          title="Avg Order Value"
          value="$22.96"
          change="+2.3% this week"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="Low Stock Items"
          value="7"
          change="Needs attention"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-warning"
        />
      </div>

      {/* Charts and Lists */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <SalesChart />
        </div>
        <div className="lg:col-span-3">
          <RecentSales />
        </div>
      </div>
    </div>
  );
}
