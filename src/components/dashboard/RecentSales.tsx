import { Clock, CreditCard, Banknote, Smartphone, HelpCircle } from 'lucide-react';
import { Sale } from '@/types/erp';
import { format } from 'date-fns';

interface RecentSalesProps {
  sales: Sale[];
}

const paymentIcons: Record<string, React.ElementType> = {
  card: CreditCard,
  cash: Banknote,
  mobile: Smartphone,
  other: HelpCircle,
};

export function RecentSales({ sales }: RecentSalesProps) {
  const recentSales = sales.slice(0, 5);

  return (
    <div className="stat-card h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Recent Sales</h3>
        <Clock className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {recentSales.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No sales yet</p>
        ) : (
          recentSales.map((sale) => {
            const Icon = paymentIcons[sale.payment_method] || HelpCircle;
            return (
              <div 
                key={sale.id}
                className="flex items-center justify-between rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {sale.payment_method} payment
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(sale.created_at), 'h:mm a')}
                    </p>
                  </div>
                </div>
                <p className="font-mono text-sm font-semibold text-foreground">
                  ${sale.total.toFixed(2)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
