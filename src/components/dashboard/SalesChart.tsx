import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '9AM', sales: 120 },
  { name: '10AM', sales: 280 },
  { name: '11AM', sales: 350 },
  { name: '12PM', sales: 520 },
  { name: '1PM', sales: 480 },
  { name: '2PM', sales: 320 },
  { name: '3PM', sales: 290 },
  { name: '4PM', sales: 410 },
  { name: '5PM', sales: 380 },
];

export function SalesChart() {
  return (
    <div className="stat-card h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales Overview</h3>
        <p className="text-sm text-muted-foreground">Hourly sales performance</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(173, 80%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(173, 80%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
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
                boxShadow: 'var(--shadow-lg)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`$${value}`, 'Sales']}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(173, 80%, 45%)"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
