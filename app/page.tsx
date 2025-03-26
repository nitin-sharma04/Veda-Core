import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Globe, ShoppingBag, Bot, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <section className="flex-1 w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your Personalized Ayurvedic Health Journey
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover the perfect balance for your mind, body, and spirit with our integrated Ayurvedic health
                  platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 blur-3xl"></div>
                <div className="relative h-full w-full flex items-center justify-center">
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-amber-500"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Comprehensive Ayurvedic Health Tools
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform integrates modern technology with ancient Ayurvedic wisdom to provide a holistic health
                experience.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-muted/50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-800 flex items-center justify-center mb-2">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Pulse Sync</h3>
              <p className="text-center text-muted-foreground">
                Monitor your vital health metrics and track your progress over time.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-muted/50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-700 flex items-center justify-center mb-2">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Biosphere 3D</h3>
              <p className="text-center text-muted-foreground">
                Explore your dosha balance in an interactive 3D environment.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-muted/50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-600 to-teal-800 flex items-center justify-center mb-2">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Vital Market</h3>
              <p className="text-center text-muted-foreground">
                Discover and purchase health products tailored to your unique constitution.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-muted/50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-800 flex items-center justify-center mb-2">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Dhara AI</h3>
              <p className="text-center text-muted-foreground">
                Get personalized health advice and insights from your AI assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from people who have transformed their health with our platform.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-background p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
              </div>
              <p className="text-center text-muted-foreground">
                "The Biosphere 3D feature helped me understand my dosha imbalances in a way that finally made sense.
                I've seen remarkable improvements in my health."
              </p>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Priya S.</p>
                <p className="text-sm text-muted-foreground">Vata-Pitta Type</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-background p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
              </div>
              <p className="text-center text-muted-foreground">
                "Dhara AI has been like having an Ayurvedic practitioner available 24/7. The personalized
                recommendations have been spot on for my constitution."
              </p>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Michael T.</p>
                <p className="text-sm text-muted-foreground">Pitta-Kapha Type</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-background p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
              </div>
              <p className="text-center text-muted-foreground">
                "The products from Vital Market have transformed my daily routine. I love how they're specifically
                selected for my dosha type and health goals."
              </p>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Sarah K.</p>
                <p className="text-sm text-muted-foreground">Kapha-Vata Type</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Begin Your Journey?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start your personalized Ayurvedic health experience today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-bold">Veda</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">© 2023 Veda. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

