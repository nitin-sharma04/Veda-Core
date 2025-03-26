import { Activity, Heart, Moon, TrendingUp, Zap, Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { HealthMetricsChart, dailyHealthData, weeklyHealthData, monthlyHealthData } from "@/components/health-metrics-chart"
import { HealthDataSyncButton } from "@/components/health-data-sync"

export default function PulseSyncPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Pulse Sync</h1>
          <p className="text-muted-foreground">Monitor your vital health metrics and track your progress over time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
              <Heart className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72 BPM</div>
              <p className="text-xs text-muted-foreground">Normal range: 60-100 BPM</p>
              <div className="mt-4 h-1 w-full bg-rose-100 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: "45%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
              <Moon className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.5 hrs</div>
              <p className="text-xs text-muted-foreground">Deep sleep: 2.3 hrs</p>
              <div className="mt-4 h-1 w-full bg-indigo-100 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: "75%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activity Level</CardTitle>
              <Zap className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,432</div>
              <p className="text-xs text-muted-foreground">Steps today</p>
              <div className="mt-4 h-1 w-full bg-amber-100 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "65%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120/80</div>
              <p className="text-xs text-muted-foreground">Normal range</p>
              <div className="mt-4 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "50%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Health Metrics</CardTitle>
                <CardDescription>Your health data for today, June 15, 2023</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <HealthMetricsChart data={dailyHealthData} period="daily" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Average Heart Rate</p>
                      <p className="text-xs text-muted-foreground">72 BPM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Active Time</p>
                      <p className="text-xs text-muted-foreground">3.5 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Meditation Sessions</p>
                      <p className="text-xs text-muted-foreground">2 sessions (30 min)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="weekly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Health Metrics</CardTitle>
                <CardDescription>Your health data for the week of June 10-16, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <HealthMetricsChart data={weeklyHealthData} period="weekly" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="monthly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Health Metrics</CardTitle>
                <CardDescription>Your health data for June 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <HealthMetricsChart data={monthlyHealthData} period="monthly" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Improve Sleep Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your sleep patterns show irregular deep sleep cycles. Consider these Vata-balancing practices:
                </p>
                <ul className="mt-2 space-y-1 text-sm list-disc list-inside text-muted-foreground">
                  <li>Establish a regular sleep schedule</li>
                  <li>Practice gentle yoga before bed</li>
                  <li>Use calming essential oils like lavender</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Optimize Exercise Routine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Based on your activity patterns, we recommend:</p>
                <ul className="mt-2 space-y-1 text-sm list-disc list-inside text-muted-foreground">
                  <li>Add 15 minutes of morning stretching</li>
                  <li>Incorporate 2 strength training sessions weekly</li>
                  <li>Try walking meditation to balance Vata and reduce stress</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <HealthDataSyncButton />
        </div>
      </div>
    </div>
  )
}

