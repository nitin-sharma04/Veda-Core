"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Camera, Check, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import MandalaBg from "@/components/mandala-bg"

export default function PulseScanPage() {
  const [scanStage, setScanStage] = useState<"intro" | "scanning" | "processing" | "complete">("intro")
  const [scanProgress, setScanProgress] = useState(0)
  const [wristPosition, setWristPosition] = useState({ x: 0, y: 0 })

  // Animate wrist position for the scanning visual
  useEffect(() => {
    if (scanStage !== "scanning") return

    const interval = setInterval(() => {
      setWristPosition({
        x: Math.sin(Date.now() / 1000) * 5,
        y: Math.cos(Date.now() / 1000) * 3,
      })
    }, 50)

    return () => clearInterval(interval)
  }, [scanStage])

  const startScan = () => {
    setScanStage("scanning")

    // Simulate scanning progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 1.5
      setScanProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setScanStage("processing")

        // Simulate processing delay
        setTimeout(() => {
          setScanStage("complete")
        }, 2000)
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50 flex flex-col">
      <div className="absolute inset-0 z-0 opacity-10">
        <MandalaBg />
      </div>

      <header className="container mx-auto py-6 relative z-10">
        <Link href="/" className="inline-flex items-center text-slate-700 hover:text-orange-600 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <main className="flex-1 container mx-auto flex items-center justify-center py-12 relative z-10">
        <Card className="w-full max-w-3xl bg-white/90 backdrop-blur-sm shadow-xl border-orange-100 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
          <CardContent className="p-8">
            {scanStage === "intro" && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-orange-200">
                  <Camera className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4 font-serif">Pulse Sync</h1>
                <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                  Experience AI-driven Naadi Pariksha using your smartphone camera. This will analyze your pulse
                  patterns to determine your unique dosha balance.
                </p>

                <div className="bg-orange-50 rounded-lg p-6 mb-10 text-left border border-orange-100 shadow-sm">
                  <h3 className="font-medium text-slate-900 mb-4 flex items-center text-lg">
                    <Info className="h-5 w-5 mr-2 text-orange-500" />
                    How to prepare
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Find a quiet, well-lit space</p>
                        <p className="text-sm text-slate-600 mt-1">
                          Minimize distractions and ensure good lighting for optimal scan quality
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Position your wrist correctly</p>
                        <p className="text-sm text-slate-600 mt-1">
                          Place your wrist in front of the camera with your palm facing up
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Remain still during scanning</p>
                        <p className="text-sm text-slate-600 mt-1">
                          Stay as motionless as possible during the scanning process (approximately 30 seconds)
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={startScan}
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 rounded-full shadow-lg shadow-orange-200/50 px-8 py-6 text-base"
                >
                  Start Pulse Scan
                </Button>
              </div>
            )}

            {scanStage === "scanning" && (
              <div className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-10 overflow-hidden border-4 border-orange-200 rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=256&width=256"
                      alt="Camera feed"
                      className="w-full h-full object-cover"
                      style={{
                        transform: `translate(${wristPosition.x}px, ${wristPosition.y}px)`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Pulse animation */}
                      <div className="w-48 h-48 border-2 border-dashed border-orange-500 rounded-full animate-ping opacity-30 absolute"></div>
                      <div className="w-48 h-48 border-2 border-orange-500 rounded-full absolute"></div>

                      {/* Scanning lines */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="h-full w-full border-t-2 border-orange-400/50 absolute animate-scan"></div>
                      </div>

                      {/* Target points animation */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4">
                        <div className="w-20 h-8 border-2 border-orange-500 rounded-lg flex items-center justify-center relative">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-orange-500 font-medium">
                            Pulse Point
                          </div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Scanning Pulse</h2>
                <p className="text-slate-600 mb-8">Please keep your wrist steady for accurate results</p>

                <div className="w-full mb-8">
                  <Progress
                    value={scanProgress}
                    className="h-3 bg-orange-100"
                    indicatorClassName="bg-gradient-to-r from-amber-500 to-orange-500"
                  />
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>Capturing data</span>
                    <span>{Math.round(scanProgress)}%</span>
                  </div>
                </div>

                <div className="text-sm text-slate-500 max-w-md mx-auto">
                  <p className="mb-2 font-medium">Analysis in progress:</p>
                  <div className="space-y-1 text-left">
                    <p>• Detecting pulse rhythm variations...</p>
                    <p>• Analyzing strength and quality...</p>
                    <p>• Measuring rate and regularity...</p>
                    <p>• Identifying dosha patterns...</p>
                  </div>
                </div>
              </div>
            )}

            {scanStage === "processing" && (
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                  <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Processing Results</h2>
                <p className="text-slate-600 mb-8">
                  Our AI is analyzing your pulse data and calculating your dosha balance
                </p>

                <div className="flex justify-center space-x-8 text-sm text-slate-500">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mb-2 animate-ping"></div>
                    <span>Analyzing patterns</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mb-2 animate-ping animation-delay-500"></div>
                    <span>Calculating ratios</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mb-2 animate-ping animation-delay-1000"></div>
                    <span>Generating insights</span>
                  </div>
                </div>
              </div>
            )}

            {scanStage === "complete" && (
              <div>
                <div className="text-center mb-10">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Scan Complete!</h2>
                  <p className="text-slate-600">We've analyzed your pulse patterns and determined your dosha balance</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-orange-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 font-serif">Your Dosha Profile</h3>

                  <div className="space-y-6">
                    <TooltipProvider>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <span className="font-medium text-slate-700 text-lg">Vata</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 ml-1 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-4 bg-slate-900 text-white">
                                <p>
                                  Vata energy governs movement and is associated with air and space elements. When in
                                  balance, it promotes creativity and flexibility.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <span className="text-sm font-bold text-blue-600">42%</span>
                        </div>
                        <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                            style={{ width: "42%" }}
                          ></div>
                        </div>
                        <div className="mt-1 text-xs text-blue-600">Dominant energy</div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <span className="font-medium text-slate-700 text-lg">Pitta</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 ml-1 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-4 bg-slate-900 text-white">
                                <p>
                                  Pitta energy governs transformation and is associated with fire and water elements.
                                  When in balance, it promotes intelligence and metabolism.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <span className="text-sm font-bold text-red-600">35%</span>
                        </div>
                        <div className="w-full h-3 bg-red-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                        <div className="mt-1 text-xs text-red-600">Secondary energy</div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <span className="font-medium text-slate-700 text-lg">Kapha</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 ml-1 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-4 bg-slate-900 text-white">
                                <p>
                                  Kapha energy governs structure and is associated with earth and water elements. When
                                  in balance, it promotes strength and stability.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <span className="text-sm font-bold text-green-600">23%</span>
                        </div>
                        <div className="w-full h-3 bg-green-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                            style={{ width: "23%" }}
                          ></div>
                        </div>
                        <div className="mt-1 text-xs text-green-600">Supporting energy</div>
                      </div>
                    </TooltipProvider>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-amber-500"
                        >
                          <path
                            d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 19.5C7.86 19.5 4.5 16.14 4.5 12C4.5 7.86 7.86 4.5 12 4.5C16.14 4.5 19.5 7.86 19.5 12C19.5 16.14 16.14 19.5 12 19.5Z"
                            fill="currentColor"
                          />
                          <path d="M15 6.5H9V12.5H15V6.5Z" fill="currentColor" />
                          <path d="M16.25 12.75H7.75V17.75H16.25V12.75Z" fill="currentColor" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-800 mb-2 text-lg">Primary Constitution: Vata-Pitta</h4>
                        <p className="text-amber-700">
                          Your constitution shows a Vata-Pitta dominance, indicating you may benefit from grounding
                          practices and cooling foods to maintain balance. This dual influence gives you creativity and
                          drive, but requires mindful management to prevent burnout.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 rounded-full shadow-lg shadow-orange-200/50 w-full px-8 py-6 text-base"
                    >
                      View Full Dashboard
                    </Button>
                  </Link>
                  <Link href="/biosphere">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-orange-200 text-slate-700 hover:bg-orange-50 rounded-full w-full px-8 py-6 text-base"
                    >
                      Explore Biosphere 3D
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

