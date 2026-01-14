"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

type ServicesChartProps = {
  data: { name: string; value: number }[];
  className?: string;
}

const chartConfig = {
  agua: {
    label: "Agua",
    color: "hsl(var(--chart-1))",
  },
  predial: {
    label: "Predial",
    color: "hsl(var(--chart-2))",
  },
  catastro: {
    label: "Catastro",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function ServicesChart({ data, className }: ServicesChartProps) {
    const totalValue = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.value, 0);
    }, [data]);

  return (
    <Card className={className}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline">Distribución de Servicios</CardTitle>
        <CardDescription>Por tipo de servicio</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              strokeWidth={5}
            >
             <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Servicios
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
