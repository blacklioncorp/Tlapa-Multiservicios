import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

type KpiCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  trendValue: string;
  trendIcon?: LucideIcon;
  trendDirection?: "good" | "bad";
};

export function KpiCard({
  title,
  value,
  icon: Icon,
  trendValue,
  trendIcon,
  trendDirection = "good",
}: KpiCardProps) {
    const TrendIcon = trendIcon || (trendDirection === "good" ? ArrowUpRight : ArrowDownRight);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
            "text-xs text-muted-foreground",
            trendDirection === 'good' ? 'text-emerald-600' : 'text-rose-600'
        )}>
          <span className="flex items-center gap-1">
            <TrendIcon className="h-3 w-3" />
            {trendValue} vs mes anterior
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
