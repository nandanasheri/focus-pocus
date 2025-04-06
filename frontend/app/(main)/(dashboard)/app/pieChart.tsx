"use client"

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
  } from "@/components/ui/card";

  import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  const chartData = [
    { browser: "google", packets: 846, fill: "var(--color-chrome)" },
    { browser: "discord", packets: 158, fill: "var(--color-safari)" },
    { browser: "github", packets: 179, fill: "var(--color-firefox)" },
    { browser: "chat", packets: 93, fill: "var(--color-edge)" },
    { browser: "other", packets: 90, fill: "var(--color-other)" },
  ]
  
  const chartConfig = {
    packets: {
      label: "Packets",
    },
    chrome: {
      label: "google",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "discord",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "github",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "chat",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  export function PieChartAddIn() {
    return (
      <Card className="flex flex-col col-span-4">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Packets</CardTitle>
          <CardDescription></CardDescription>
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
                nameKey="browser"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Google is trending <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total packets up to date
          </div>
        </CardFooter>
      </Card>
    )
  }