"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

export function BiosphereSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-serif">Dosha Guide</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
          <SheetDescription>
            Explore the three fundamental energies that govern your physical and mental processes in Ayurvedic medicine.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vata">Vata</TabsTrigger>
            <TabsTrigger value="pitta">Pitta</TabsTrigger>
            <TabsTrigger value="kapha">Kapha</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3>What are Doshas?</h3>
              <p>
                In Ayurvedic medicine, doshas are the three energies that define a person's physical and mental
                constitution. Each person has a unique proportion of these three doshas, which influences their physical
                features, mental tendencies, and susceptibility to certain types of diseases.
              </p>

              <h3>The Three Doshas</h3>
              <p>
                <strong>Vata</strong> (Air + Space) - Controls movement and change in the body and mind.
                <br />
                <strong>Pitta</strong> (Fire + Water) - Governs metabolism, digestion, and transformation.
                <br />
                <strong>Kapha</strong> (Earth + Water) - Provides structure, stability, and lubrication.
              </p>

              <h3>Your Dosha Balance</h3>
              <p>
                While everyone has all three doshas, most people have one or two that are more dominant. This dominant
                combination is called your Prakriti, or natural constitution. When your doshas become imbalanced (called
                Vikriti), it can lead to physical and mental health issues.
              </p>

              <h3>Maintaining Balance</h3>
              <p>
                Ayurveda focuses on maintaining balance through diet, lifestyle, herbs, and practices that are specific
                to your constitution. By understanding your dominant doshas, you can make choices that help you stay
                balanced and healthy.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>The Dosha Galaxy</CardTitle>
                <CardDescription>
                  Explore the interactive 3D representation of the three doshas and their relationships.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  In our 3D Biosphere, each dosha is represented as a planet with its own characteristics:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>
                      <strong>Vata Planet</strong> - Blue, fast-moving, represents air and space
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>
                      <strong>Pitta Planet</strong> - Red, medium-sized, represents fire and water
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>
                      <strong>Kapha Planet</strong> - Green, large with rings, represents earth and water
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>
                      <strong>Central Core</strong> - Golden, represents the balance of all three doshas
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vata" className="space-y-6">
            <Card className="border-blue-500/30">
              <CardHeader className="bg-blue-500/10">
                <CardTitle className="text-xl font-serif">Vata Dosha</CardTitle>
                <CardDescription>
                  Composed of Air and Space elements, Vata governs movement and change in the body and mind.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Physical Characteristics</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Thin, light frame</li>
                      <li>Dry skin and hair</li>
                      <li>Cold hands and feet</li>
                      <li>Light, interrupted sleep</li>
                      <li>Irregular hunger and digestion</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Mental Characteristics</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Quick to learn, quick to forget</li>
                      <li>Creative and imaginative</li>
                      <li>Enthusiastic when balanced</li>
                      <li>Anxious or worried when imbalanced</li>
                      <li>Tendency toward change and movement</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Balancing Vata</h3>
                    <p className="text-sm mb-2">
                      Vata is balanced by warmth, moisture, routine, and grounding practices:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Follow a regular daily routine</li>
                      <li>Eat warm, cooked, slightly oily foods</li>
                      <li>Stay warm and avoid cold, windy conditions</li>
                      <li>Practice gentle, grounding yoga</li>
                      <li>Use calming meditation techniques</li>
                      <li>Get adequate rest and sleep</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pitta" className="space-y-6">
            <Card className="border-red-500/30">
              <CardHeader className="bg-red-500/10">
                <CardTitle className="text-xl font-serif">Pitta Dosha</CardTitle>
                <CardDescription>
                  Composed of Fire and Water elements, Pitta governs metabolism, digestion, and transformation.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Physical Characteristics</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Medium build with good muscle development</li>
                      <li>Warm skin, often reddish or flushed</li>
                      <li>Strong appetite and digestion</li>
                      <li>Tendency toward heat-related issues</li>
                      <li>Moderate, sound sleep</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Mental Characteristics</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Sharp intellect and good concentration</li>
                      <li>Strong leadership abilities</li>
                      <li>Determined and focused</li>
                      <li>Irritable or angry when imbalanced</li>
                      <li>Perfectionist tendencies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Balancing Pitta</h3>
                    <p className="text-sm mb-2">
                      Pitta is balanced by coolness, moderation, relaxation, and sweet tastes:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Avoid excessive heat and direct sunlight</li>
                      <li>Eat cooling foods like vegetables and sweet fruits</li>
                      <li>Practice moderate exercise, avoiding overheating</li>
                      <li>Take time for relaxation and play</li>
                      <li>Practice cooling, calming meditation</li>
                      <li>Avoid skipping meals</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kapha" className="space-y-6">
            <Card className="border-green-500/30">
              <CardHeader className="bg-green-500/10">
                <CardTitle className="text-xl font-serif">Kapha Dosha</CardTitle>
                <CardDescription>
                  Composed of Earth and Water elements, Kapha governs structure, stability, and lubrication.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Physical Characteristics</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Solid, heavy build with good endurance</li>
                      <li>Smooth, oily skin</li>
                      <li>Thick hair and strong teeth</li>
                      <li>Slow digestion with steady appetite</li>
                      <li>Deep, heavy sleep</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Mental Characteristics</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Calm, steady mind</li>
                      <li>Excellent long-term memory</li>
                      <li>Loyal and supportive</li>
                      <li>Tendency toward attachment</li>
                      <li>Resistant to change</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Balancing Kapha</h3>
                    <p className="text-sm mb-2">Kapha is balanced by stimulation, lightness, warmth, and variety:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Maintain regular, vigorous exercise</li>
                      <li>Eat light, warm, spicy foods</li>
                      <li>Embrace change and new experiences</li>
                      <li>Practice energizing yoga and breathing exercises</li>
                      <li>Wake up early and avoid daytime naps</li>
                      <li>Use stimulating aromas like eucalyptus and rosemary</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

