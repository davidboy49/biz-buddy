import { Clock, CreditCard, Banknote } from 'lucide-react';

const recentSales = [
  { id: 1, items: 'Cappuccino, Croissant', total: 7.50, method: 'card', time: '2 min ago' },
  { id: 2, items: 'Latte x2, Sandwich', total: 17.50, method: 'card', time: '8 min ago' },
  { id: 3, items: 'Espresso', total: 3.50, method: 'cash', time: '15 min ago' },
  { id: 4, items: 'Smoothie, Protein Bar', total: 10.00, method: 'card', time: '23 min ago' },
  { id: 5, items: 'Cheesecake, Iced Americano', total: 10.00, method: 'cash', time: '31 min ago' },
];

export function RecentSales() {
  return (
    <div className="stat-card h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Recent Sales</h3>
        <Clock className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {recentSales.map((sale) => (
          <div 
            key={sale.id}
            className="flex items-center justify-between rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                {sale.method === 'card' ? (
                  <CreditCard className="h-4 w-4 text-primary" />
                ) : (
                  <Banknote className="h-4 w-4 text-success" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{sale.items}</p>
                <p className="text-xs text-muted-foreground">{sale.time}</p>
              </div>
            </div>
            <p className="font-mono text-sm font-semibold text-foreground">
              ${sale.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
