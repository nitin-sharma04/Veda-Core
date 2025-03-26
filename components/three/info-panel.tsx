"use client"

import { useState, useEffect } from "react"
import { Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

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
  },
}

export function InfoPanel({
  activePlanet,
  onClose,
}: {
  activePlanet: string | null
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (activePlanet) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [activePlanet])

  if (!activePlanet || !visible) return null

  const info = doshaInfo[activePlanet as keyof typeof doshaInfo]

  return (
    <Html position={[0, 0, 0]} center>
      <Card className="w-80 bg-black/80 backdrop-blur-md border-gray-800 text-white shadow-xl animate-in fade-in zoom-in duration-300">
        <CardHeader className="relative pb-2">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl font-serif">{activePlanet} Dosha</CardTitle>
          <CardDescription className="text-gray-300">{info.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Qualities</h4>
            <div className="flex flex-wrap gap-1">
              {info.qualities.map((quality) => (
                <Badge key={quality} variant="outline" className="bg-white/10 text-white border-none">
                  {quality}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Balancing Practices</h4>
            <ul className="text-sm space-y-1 list-disc pl-4 text-gray-200">
              {info.balancingPractices.map((practice) => (
                <li key={practice}>{practice}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Signs of Imbalance</h4>
            <ul className="text-sm space-y-1 list-disc pl-4 text-gray-200">
              {info.imbalanceSigns.map((sign) => (
                <li key={sign}>{sign}</li>
              ))}
            </ul>
          </div>

          <Button
            className="w-full mt-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            onClick={onClose}
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </Html>
  )
}

