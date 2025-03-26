import Link from "next/link"
import { Activity, Globe, ShoppingBag, Bot, TrendingUp, Calendar, Leaf, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Arjun</h1>
          <p className="text-muted-foreground">
            Here's an overview of your health journey and personalized recommendations.
          </p>
        </div>

        {/* Health Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Dosha Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">Vata</span>
                    <span className="text-xs font-semibold">42%</span>
                  </div>
                  <Progress value={42} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">Pitta</span>
                    <span className="text-xs font-semibold">35%</span>
                  </div>
                  <Progress value={35} className="h-2 bg-red-100" indicatorClassName="bg-red-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">Kapha</span>
                    <span className="text-xs font-semibold">23%</span>
                  </div>
                  <Progress value={23} className="h-2 bg-green-100" indicatorClassName="bg-green-500" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/biosphere" className="w-full">
                <Button variant="outline" className="w-full">
                  View in 3D
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Health Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-rose-500" />
                    <span className="text-sm">Heart Rate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">72</span>
                    <span className="text-xs text-muted-foreground">bpm</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Blood Pressure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">120/80</span>
                    <span className="text-xs text-muted-foreground">mmHg</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Stress Level</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Medium</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/pulse-sync" className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Morning Meditation</p>
                    <p className="text-xs text-muted-foreground">Today, 7:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dhara AI Check-in</p>
                    <p className="text-xs text-muted-foreground">Today, 6:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Calendar
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main Features */}
        <h2 className="text-xl font-semibold mt-4">Your Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/pulse-sync" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-800 flex items-center justify-center mb-2">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Pulse Sync</CardTitle>
                <CardDescription>Monitor your vital health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track your heart rate, sleep patterns, and other vital signs to maintain optimal health.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="bg-purple-50">
                  Last synced: 2h ago
                </Badge>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/biosphere" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-700 flex items-center justify-center mb-2">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Biosphere 3D</CardTitle>
                <CardDescription>Explore your dosha balance in 3D</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visualize your Ayurvedic constitution in an interactive 3D environment.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="bg-amber-50">
                  Updated today
                </Badge>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/vital-market" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-teal-800 flex items-center justify-center mb-2">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Vital Market</CardTitle>
                <CardDescription>Personalized health products</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover and purchase health products tailored to your unique constitution.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="bg-emerald-50">
                  3 new recommendations
                </Badge>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dhara-ai" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-800 flex items-center justify-center mb-2">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Dhara AI</CardTitle>
                <CardDescription>Your AI health assistant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get personalized health advice and insights from your AI assistant.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="bg-blue-50">
                  Ready to chat
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

