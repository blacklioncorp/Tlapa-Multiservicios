"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type RevenueChartProps = {
  data: { month: string; total: number }[];
  className?: string;
}

const chartConfig = {
  revenue: {
    label: "Recaudación",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function RevenueChart({ data, className }: RevenueChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="font-headline">Recaudación Mensual</CardTitle>
        <CardDescription>Últimos 12 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis 
                tickFormatter={(value) => `$${Number(value) / 1000}k`}
            />
            <ChartTooltip
              content={<ChartTooltipContent 
                formatter={(value) => `$${Number(value).toLocaleString()}`}
              />}
            />
            <Bar dataKey="total" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
