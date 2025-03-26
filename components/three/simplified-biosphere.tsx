"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Info } from "lucide-react"
import { BiosphereSidebar } from "@/components/three/biosphere-sidebar"

// Dosha information
const doshaInfo = {
  Vata: {
    description: "Composed of Air and Space elements, Vata governs movement and change in the body and mind.",
    qualities: ["Light", "Cold", "Dry", "Rough", "Subtle", "Mobile"],
    balancingPractices: [
      "Maintain regular daily routines",
      "Stay warm and grounded",
      "Practice gentle yoga and meditation",
      "Eat warm, nourishing foods",
    ],
    imbalanceSigns: ["Anxiety and worry", "Insomnia", "Dry skin", "Constipation", "Feeling cold"],
    color: "#60A5FA",
  },
  Pitta: {
    description: "Composed of Fire and Water elements, Pitta governs metabolism, digestion, and transformation.",
    qualities: ["Hot", "Sharp", "Light", "Oily", "Liquid", "Spreading"],
    balancingPractices: [
      "Stay cool and avoid excessive heat",
      "Practice moderate exercise",
      "Eat cooling foods like vegetables and fruits",
      "Practice calming meditation",
    ],
    imbalanceSigns: ["Irritability and anger", "Acid reflux", "Inflammation", "Rashes or acne", "Excessive hunger"],
    color: "#F87171",
  },
  Kapha: {
    description: "Composed of Earth and Water elements, Kapha governs structure, stability, and lubrication.",
    qualities: ["Heavy", "Slow", "Cold", "Oily", "Smooth", "Dense", "Soft", "Stable"],
    balancingPractices: [
      "Stay active with regular exercise",
      "Embrace change and variety",
      "Eat light, warm, and spicy foods",
      "Practice stimulating breathing exercises",
    ],
    imbalanceSigns: [
      "Lethargy and sluggishness",
      "Weight gain",
      "Congestion",
      "Attachment and possessiveness",
      "Resistance to change",
    ],
    color: "#4ADE80",
  },
}

export function SimplifiedBiosphere() {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full px-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-full w-9 h-9 p-0"
              onClick={() => setShowSidebar(true)}
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">Help</span>
            </Button>

            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full w-9 h-9 p-0">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto pt-20 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mb-4">
              <svg
                width="32"
                height="32"
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
            <h1 className="text-3xl font-bold font-serif mb-2">Dosha Galaxy</h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Explore the three fundamental energies that govern your physical and mental processes in Ayurvedic
              medicine.
            </p>
          </div>

          <Tabs defaultValue="vata" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="vata" className="data-[state=active]:bg-blue-500/20">
                Vata
              </TabsTrigger>
              <TabsTrigger value="pitta" className="data-[state=active]:bg-red-500/20">
                Pitta
              </TabsTrigger>
              <TabsTrigger value="kapha" className="data-[state=active]:bg-green-500/20">
                Kapha
              </TabsTrigger>
            </TabsList>

            {Object.entries(doshaInfo).map(([dosha, info]) => (
              <TabsContent key={dosha} value={dosha.toLowerCase()} className="space-y-6">
                <Card className="border-none bg-white/5 backdrop-blur-sm">
                  <CardHeader style={{ borderBottom: `2px solid ${info.color}` }}>
                    <CardTitle className="text-2xl font-serif">{dosha} Dosha</CardTitle>
                    <CardDescription className="text-gray-300">{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Qualities</h3>
                      <div className="flex flex-wrap gap-2">
                        {info.qualities.map((quality) => (
                          <span key={quality} className="px-3 py-1 rounded-full text-sm bg-white/10">
                            {quality}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Balancing Practices</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        {info.balancingPractices.map((practice) => (
                          <li key={practice}>{practice}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Signs of Imbalance</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        {info.imbalanceSigns.map((sign) => (
                          <li key={sign}>{sign}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      onClick={() => setShowSidebar(true)}
                    >
                      Learn More About Doshas
                    </Button>
                  </CardFooter>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-none bg-white/5 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl">Recommended Daily Routine</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <span className="text-lg font-medium">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Morning</h4>
                            <p className="text-sm text-gray-300">
                              {dosha === "Vata" && "Wake up early, meditate, and have warm breakfast"}
                              {dosha === "Pitta" && "Cool shower, light exercise, and fresh fruit breakfast"}
                              {dosha === "Kapha" && "Early rising, vigorous exercise, and light breakfast"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <span className="text-lg font-medium">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Afternoon</h4>
                            <p className="text-sm text-gray-300">
                              {dosha === "Vata" && "Nourishing lunch, short walk, and brief rest"}
                              {dosha === "Pitta" && "Main meal at midday, followed by relaxation"}
                              {dosha === "Kapha" && "Stimulating activities and light, spicy lunch"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <span className="text-lg font-medium">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Evening</h4>
                            <p className="text-sm text-gray-300">
                              {dosha === "Vata" && "Light dinner, calming activities, early bedtime"}
                              {dosha === "Pitta" && "Cooling evening walk, light dinner, relaxation"}
                              {dosha === "Kapha" && "Energetic evening, light dinner, later bedtime"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none bg-white/5 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl">Dietary Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-1">Favor These Foods</h4>
                          <p className="text-sm text-gray-300">
                            {dosha === "Vata" &&
                              "Warm, cooked, moist foods. Sweet, sour, and salty tastes. Healthy oils and fats."}
                            {dosha === "Pitta" &&
                              "Cool or warm (not hot) foods. Sweet, bitter, and astringent tastes. Fresh vegetables and fruits."}
                            {dosha === "Kapha" &&
                              "Warm, light, dry foods. Pungent, bitter, and astringent tastes. Plenty of spices."}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-1">Limit These Foods</h4>
                          <p className="text-sm text-gray-300">
                            {dosha === "Vata" &&
                              "Cold, dry, light foods. Bitter and astringent tastes. Raw vegetables and dry snacks."}
                            {dosha === "Pitta" &&
                              "Hot, spicy, oily foods. Pungent, sour, and salty tastes. Fermented foods."}
                            {dosha === "Kapha" &&
                              "Cold, heavy, oily foods. Sweet, sour, and salty tastes. Dairy and wheat."}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-1">Eating Habits</h4>
                          <p className="text-sm text-gray-300">
                            {dosha === "Vata" &&
                              "Eat regularly, don't skip meals. Take time to eat mindfully in a calm environment."}
                            {dosha === "Pitta" &&
                              "Eat at regular times, avoid skipping meals. Don't eat when angry or upset."}
                            {dosha === "Kapha" &&
                              "Eat only when hungry, it's okay to skip meals occasionally. Avoid eating late at night."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Sidebar with educational content */}
      <BiosphereSidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
    </div>
  )
}

