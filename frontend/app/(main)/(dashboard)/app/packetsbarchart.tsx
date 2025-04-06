"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
  { time: "21:27", domain: "chat.google.com", visits: 27 },
  { time: "21:27", domain: "google.com", visits: 11 },
  { time: "21:27", domain: "chat.com", visits: 1 },
  { time: "21:28", domain: "chat.google.com", visits: 40 },
  { time: "21:28", domain: "google.com", visits: 22 },
  { time: "21:28", domain: "chat.com", visits: 4 },
  { time: "21:29", domain: "chat.google.com", visits: 33 },
  { time: "21:29", domain: "google.com", visits: 15 },
  { time: "21:29", domain: "chat.com", visits: 3 },
]

const colorMap = chartData.reduce((map, entry, index) => {
  map[entry.domain] = chartColors[index]
  return map
}, {})

export function PacketsBarChart() {
  const uniqueDomains = Array.from(new Set(chartData.map((data) => data.domain)))
  const maxDomains = uniqueDomains.slice(0, 5)

  const transformedData = maxDomains.reduce((acc, domain) => {
    chartData.filter((data) => data.domain === domain).forEach(({ time, visits }) => {
      const existingTimeData = acc.find((item) => item.time === time)
      if (existingTimeData) {
        existingTimeData[domain] = visits
      } else {
        acc.push({ time, [domain]: visits })
      }
    })
    return acc
  }, [] as { time: string; [key: string]: number }[])

  const chartConfig = {
    domains: maxDomains.reduce((acc, domain) => {
      acc[domain] = {
        label: domain,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      }
      return acc
    }, {} as Record<string, { label: string; color: string }>)
  }

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Time-based Visits</CardTitle>
          <CardDescription>Visits per domain over time</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            data={transformedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            {maxDomains.map((domain) => (
              <Bar
                key={domain}
                dataKey={domain}
                stackId="time" 
                fill={chartConfig.domains[domain].color}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
