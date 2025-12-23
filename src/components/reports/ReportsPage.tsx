import { TrendingUp, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { useSales } from '@/hooks/useSales';

export function ReportsPage() {
  const { sales } = useSales();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">View analytics and export data</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 animate-fade-in">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="number-display">$18,420</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="number-display">$72,350</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Year</p>
              <p className="number-display">$542,890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <SalesChart sales={sales} />
      </div>
    </div>
  );
}
