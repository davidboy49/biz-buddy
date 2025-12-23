import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light', icon: Sun, description: 'Light theme for daytime use' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Dark theme for nighttime use' },
    { value: 'system', label: 'System', icon: Monitor, description: 'Follow system preference' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Palette className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Appearance</h2>
          <p className="text-sm text-muted-foreground">Customize the look and feel</p>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base">Theme</Label>
        <div className="grid gap-3 md:grid-cols-3">
          {themes.map((t) => {
            const Icon = t.icon;
            return (
              <Button
                key={t.value}
                variant="outline"
                className={cn(
                  "h-auto flex-col items-start gap-2 p-4",
                  theme === t.value && "border-primary bg-primary/5"
                )}
                onClick={() => setTheme(t.value)}
              >
                <div className="flex w-full items-center justify-between">
                  <Icon className="h-5 w-5" />
                  {theme === t.value && (
                    <span className="text-xs font-medium text-primary">Active</span>
                  )}
                </div>
                <div className="text-left">
                  <span className="font-medium">{t.label}</span>
                  <p className="text-xs text-muted-foreground">{t.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
