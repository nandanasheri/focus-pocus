"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

const chartData = [
  { domain: "google.com", packets: 846 },
  { domain: "discord.com", packets: 158 },
  { domain: "github.com", packets: 179 },
  { domain: "chat.ai", packets: 93 },
  { domain: "Other", packets: 90 },
]

const colorMap = chartData.reduce((map, entry, index) => {
  map[entry.domain] = chartColors[index]
  return map
}, {})


const chartConfig = chartData.reduce((config, entry) => {
  const key = entry.domain.toLowerCase().replace(/\./g, "") 
  config[key] = {
    label: entry.domain,
    color: colorMap[entry.domain] || "hsl(var(--chart-default))",
  }
  return config
}, {})

const trendingDomain = chartData.reduce((prev, current) =>
  prev.packets > current.packets ? prev : current
)

export function PieChartAddIn() {
  return (
    <Card className="flex flex-col col-span-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Packets</CardTitle>
        <CardDescription>Total visits per domain over time</CardDescription>
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
              data={chartData}
              dataKey="packets"
              nameKey="domain"
              innerRadius={60}
              outerRadius={80}
              labelLine={false}
              isAnimationActive={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorMap[entry.domain]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {trendingDomain.domain} is trending <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total packets per domain in the last 10 minutes
        </div>
      </CardFooter>
    </Card>
  )
}
