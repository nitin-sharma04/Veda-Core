"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface HealthMetricsChartProps {
  data: any[]
  period: "daily" | "weekly" | "monthly"
}

export function HealthMetricsChart({ data, period }: HealthMetricsChartProps) {
  // Different chart types based on period
  const renderChart = () => {
    if (period === "daily") {
      return (
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickLine={false} 
            axisLine={false}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Line 
            type="monotone" 
            dataKey="heartRate" 
            name="Heart Rate" 
            stroke="hsl(var(--chart-1))" 
            strokeWidth={2}
            dot={{ r: 3, fill: "hsl(var(--chart-1))", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "hsl(var(--chart-1))", stroke: "white", strokeWidth: 2 }}
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="bloodPressure" 
            name="Blood Pressure" 
            stroke="hsl(var(--chart-2))" 
            strokeWidth={2}
            dot={{ r: 3, fill: "hsl(var(--chart-2))", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "hsl(var(--chart-2))", stroke: "white", strokeWidth: 2 }}
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="stressLevel" 
            name="Stress Level" 
            stroke="hsl(var(--chart-3))" 
            strokeWidth={2}
            dot={{ r: 3, fill: "hsl(var(--chart-3))", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "hsl(var(--chart-3))", stroke: "white", strokeWidth: 2 }}
            connectNulls
          />
        </LineChart>
      )
    } else if (period === "weekly") {
      return (
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickLine={false} 
            axisLine={false}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Bar 
            dataKey="heartRate" 
            name="Avg Heart Rate" 
            fill="hsl(var(--chart-1))" 
            radius={[4, 4, 0, 0]}
            barSize={20}
            animationDuration={1000}
          />
          <Bar 
            dataKey="sleepHours" 
            name="Sleep Hours" 
            fill="hsl(var(--chart-4))" 
            radius={[4, 4, 0, 0]}
            barSize={20}
            animationDuration={1200}
          />
          <Bar 
            dataKey="steps" 
            name="Steps (k)" 
            fill="hsl(var(--chart-3))" 
            radius={[4, 4, 0, 0]}
            barSize={20}
            animationDuration={1400}
          />
        </BarChart>
      )
    } else {
      return (
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="week" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickLine={false} 
            axisLine={false}
            width={30}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Area 
            type="monotone" 
            dataKey="vata" 
            name="Vata" 
            stackId="1"
            stroke="hsl(var(--chart-2))" 
            fill="hsl(var(--chart-2))" 
            fillOpacity={0.6}
            animationDuration={1000}
          />
          <Area 
            type="monotone" 
            dataKey="pitta" 
            name="Pitta" 
            stackId="1"
            stroke="hsl(var(--chart-1))" 
            fill="hsl(var(--chart-1))" 
            fillOpacity={0.6}
            animationDuration={1200}
          />
          <Area 
            type="monotone" 
            dataKey="kapha" 
            name="Kapha" 
            stackId="1"
            stroke="hsl(var(--chart-5))" 
            fill="hsl(var(--chart-5))" 
            fillOpacity={0.6}
            animationDuration={1400}
          />
        </AreaChart>
      )
    }
  }

  return (
    <ChartContainer 
      className="h-[300px] w-full" 
      config={{
        heartRate: { label: "Heart Rate", theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" } },
        bloodPressure: { label: "Blood Pressure", theme: { light: "hsl(var(--chart-2))", dark: "hsl(var(--chart-2))" } },
        stressLevel: { label: "Stress Level", theme: { light: "hsl(var(--chart-3))", dark: "hsl(var(--chart-3))" } },
        sleepHours: { label: "Sleep Hours", theme: { light: "hsl(var(--chart-4))", dark: "hsl(var(--chart-4))" } },
        steps: { label: "Steps (k)", theme: { light: "hsl(var(--chart-3))", dark: "hsl(var(--chart-3))" } },
        vata: { label: "Vata", theme: { light: "hsl(var(--chart-2))", dark: "hsl(var(--chart-2))" } },
        pitta: { label: "Pitta", theme: { light: "hsl(var(--chart-1))", dark: "hsl(var(--chart-1))" } },
        kapha: { label: "Kapha", theme: { light: "hsl(var(--chart-5))", dark: "hsl(var(--chart-5))" } },
      }}
    >
      {renderChart()}
    </ChartContainer>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border/50 rounded-lg p-2 shadow-md text-xs">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}: </span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

// Sample data for different periods
export const dailyHealthData = [
  { time: "6 AM", heartRate: 68, bloodPressure: 115, stressLevel: 2 },
  { time: "9 AM", heartRate: 72, bloodPressure: 118, stressLevel: 3 },
  { time: "12 PM", heartRate: 75, bloodPressure: 120, stressLevel: 4 },
  { time: "3 PM", heartRate: 73, bloodPressure: 122, stressLevel: 5 },
  { time: "6 PM", heartRate: 70, bloodPressure: 119, stressLevel: 3 },
  { time: "9 PM", heartRate: 65, bloodPressure: 117, stressLevel: 2 },
]

export const weeklyHealthData = [
  { day: "Mon", heartRate: 70, sleepHours: 7.2, steps: 8.5 },
  { day: "Tue", heartRate: 72, sleepHours: 6.8, steps: 7.2 },
  { day: "Wed", heartRate: 71, sleepHours: 7.5, steps: 9.1 },
  { day: "Thu", heartRate: 73, sleepHours: 7.0, steps: 8.3 },
  { day: "Fri", heartRate: 74, sleepHours: 6.5, steps: 7.8 },
  { day: "Sat", heartRate: 68, sleepHours: 8.2, steps: 6.5 },
  { day: "Sun", heartRate: 67, sleepHours: 8.5, steps: 5.2 },
]

export const monthlyHealthData = [
  { week: "Week 1", vata: 40, pitta: 35, kapha: 25 },
  { week: "Week 2", vata: 42, pitta: 33, kapha: 25 },
  { week: "Week 3", vata: 38, pitta: 37, kapha: 25 },
  { week: "Week 4", vata: 41, pitta: 34, kapha: 25 },
]