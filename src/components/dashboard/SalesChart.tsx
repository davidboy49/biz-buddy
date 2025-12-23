import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sale } from '@/types/erp';
import { format, startOfHour, subHours, isWithinInterval } from 'date-fns';
import { useMemo } from 'react';

interface SalesChartProps {
  sales: Sale[];
}

export function SalesChart({ sales }: SalesChartProps) {
  const chartData = useMemo(() => {
    const now = new Date();
    const hours = Array.from({ length: 12 }, (_, i) => {
      const hour = subHours(startOfHour(now), 11 - i);
      return {
        hour,
        label: format(hour, 'ha'),
        sales: 0,
      };
    });

    sales.forEach((sale) => {
      const saleDate = new Date(sale.created_at);
      const hourIndex = hours.findIndex((h, i) => {
        const nextHour = hours[i + 1];
        if (!nextHour) {
          return isWithinInterval(saleDate, { start: h.hour, end: now });
        }
        return isWithinInterval(saleDate, { start: h.hour, end: nextHour.hour });
      });
      if (hourIndex !== -1) {
        hours[hourIndex].sales += sale.total;
      }
    });

    return hours.map((h) => ({
      time: h.label,
      sales: Math.round(h.sales * 100) / 100,
    }));
  }, [sales]);

  return (
    <div className="stat-card h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales Overview</h3>
        <p className="text-sm text-muted-foreground">Hourly sales performance</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fill="url(#salesGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
