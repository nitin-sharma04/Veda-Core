"use client"

import type React from "react"

import { useState, useRef, useEffect, Suspense, Component, memo } from "react"
import Link from "next/link"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { Environment, OrbitControls, Stars, Sky, PerspectiveCamera } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowLeft, Home, Info, Maximize, Minimize, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Cloud } from "@/components/three/cloud"
import { EnergyParticles } from "@/components/three/energy-particles"
import { OrbitalPath } from "@/components/three/orbital-path"
import PlanetComponent from "@/components/three/planet"
import { InfoPanel } from "@/components/three/info-panel"
import { PerformanceMonitor } from "@/components/three/performance-monitor"
import { type Group, type Mesh, Vector3 } from "three"
import { Text, Billboard } from "@react-three/drei"
import { useProgress } from "@react-three/drei"
import { BiosphereSidebar } from "@/components/three/biosphere-sidebar"
import { SimplifiedBiosphere } from "@/components/three/simplified-biosphere"

// Add this function to preload assets
function usePreloadAssets() {
  const [loaded, setLoaded] = useState(false)
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    // Preload font - using a try/catch to handle potential font loading errors
    try {
      const fontLoader = new FontLoader()
      // Try to load the font, but don't block if it fails
      fontLoader.load(
        "/fonts/Inter-Bold.ttf", 
        () => {
          // Font loaded successfully
          setFontLoaded(true)
        },
        () => {
          // Font loading progress
        },
        (err) => {
          // Font loading error - don't block the app
          console.warn("Font loading error:", err)
          setFontLoaded(true) // Mark as loaded anyway to prevent blocking
        }
      )
    } catch (error) {
      console.warn("Font preloading error:", error)
      setFontLoaded(true) // Mark as loaded anyway to prevent blocking
    }

    // Simulate other assets loading
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Return true when both conditions are met
  return loaded && fontLoaded
}

// Add this at the top of the file after imports
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas")
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")))
  } catch (e) {
    return false
  }
}

// Error boundary for catching 3D rendering errors
class ErrorBoundary extends Component<{ children: React.ReactNode; fallback: React.ReactNode }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Biosphere error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

// Update the LoadingScreen component to show more detailed progress
function LoadingScreen() {
  const { progress, item, loaded, total } = useProgress()
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      <div className="w-24 h-24 relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-50 blur-lg animate-pulse"></div>
        <div className="absolute inset-0 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white opacity-80"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white mt-6 font-serif">Loading Dosha Galaxy</h2>
      <p className="text-white/70 mt-2 mb-6">
        Preparing your personalized biosphere experience{dots}
        {item && <span className="block text-xs mt-1 text-white/50">{item}</span>}
      </p>

      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-white/50 mt-2 text-sm">
        {Math.round(progress)}% ({loaded}/{total} assets)
      </p>

      <div className="mt-8 flex gap-1">
        <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse animation-delay-500"></div>
        <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse animation-delay-1000"></div>
      </div>
    </div>
  )
}

// Update the BiosphereScene component to use React.memo for better performance
const BiosphereScene = memo(function BiosphereScene({
  autoRotate = true,
}: {
  autoRotate?: boolean
}) {
  const [activePlanet, setActivePlanet] = useState<string | null>(null)
  const [showEffects, setShowEffects] = useState(true)

  // Define planets data
  const planets = [
    {
      name: "Vata",
      position: [5, 0, 0],
      size: 1.2,
      color: "#60A5FA",
      rotationSpeed: 0.006,
      dosha: "Vata",
      orbitRadius: 8,
      orbitSpeed: 0.0003,
      orbitOffset: 0,
    },
    {
      name: "Pitta",
      position: [-4, 0, -7],
      size: 1.5,
      color: "#F87171",
      rotationSpeed: 0.004,
      dosha: "Pitta",
      orbitRadius: 12,
      orbitSpeed: 0.0002,
      orbitOffset: Math.PI * 0.66,
    },
    {
      name: "Kapha",
      position: [0, 0, 11],
      size: 1.8,
      color: "#4ADE80",
      rotationSpeed: 0.003,
      hasRings: true,
      dosha: "Kapha",
      orbitRadius: 16,
      orbitSpeed: 0.00015,
      orbitOffset: Math.PI * 1.33,
    },
  ]

  // Handle performance monitoring
  const handlePerformanceChange = ({ factor }: { factor: number }) => {
    setShowEffects(factor > 0.8)
  }

  return (
    <>
      {/* Performance monitoring to adjust quality based on device capability */}
      <PerformanceMonitor onDecline={handlePerformanceChange} onIncline={handlePerformanceChange}>
        {/* Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Sky with atmosphere */}
        <Sky
          distance={450000}
          sunPosition={[0, -1, 0]}
          inclination={0}
          azimuth={0.25}
          mieCoefficient={0.001}
          mieDirectionalG={0.99}
          rayleigh={0.5}
          turbidity={10}
        />

        {/* Ambient clouds */}
        {showEffects && (
          <>
            <Cloud position={[-10, -6, -10]} speed={0.2} opacity={0.3} />
            <Cloud position={[10, 6, -15]} speed={0.1} opacity={0.2} />
            <Cloud position={[0, 10, 10]} speed={0.3} opacity={0.4} />
          </>
        )}

        {/* Energy particles */}
        <EnergyParticles count={200} radius={30} color="#FFD700" />

        {/* Constellation lines connecting planets */}
        <ConstellationLines planets={planets} activePlanet={activePlanet} />

        {/* Orbital paths with different colors */}
        <OrbitalPath radius={8} color="#60A5FA" pulseColor="#3B82F6" visible={showEffects} />
        <OrbitalPath radius={12} color="#F87171" pulseColor="#EF4444" visible={showEffects} />
        <OrbitalPath radius={16} color="#4ADE80" pulseColor="#22C55E" visible={showEffects} />

        {/* Central core */}
        <CoreSphere />

        {/* Planets with enhanced visuals */}
        {planets.map((planet) => (
          <PlanetComponent
            key={planet.name}
            position={planet.position as [number, number, number]}
            size={planet.size}
            color={planet.color}
            name={planet.name}
            onClick={() => setActivePlanet(planet.name === activePlanet ? null : planet.name)}
            isActive={activePlanet === planet.name}
            rotationSpeed={planet.rotationSpeed}
            hasRings={planet.hasRings || false}
            dosha={planet.dosha}
            orbitRadius={planet.orbitRadius}
            orbitSpeed={planet.orbitSpeed}
            orbitOffset={planet.orbitOffset}
          />
        ))}

        {/* Info panel */}
        <InfoPanel activePlanet={activePlanet} onClose={() => setActivePlanet(null)} />

        {/* Post-processing effects */}
        {showEffects && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
            <ChromaticAberration offset={[0.0005, 0.0005]} />
            <Noise opacity={0.02} blendFunction={BlendFunction.ADD} />
          </EffectComposer>
        )}

        {/* Environment lighting */}
        <Environment preset="night" />

        {/* Dynamic lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#FFC107" />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={30}
          autoRotate={autoRotate}
          autoRotateSpeed={0.4}
          zoomSpeed={0.8}
        />

        {/* Main camera */}
        <PerspectiveCamera makeDefault position={[0, 5, 18]} fov={60} />
      </PerformanceMonitor>
    </>
  )
})

// Update the BiospherePage component to use the preload mechanism
export default function BiospherePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
  const [dpr, setDpr] = useState(1.5)
  const [fallbackMode, setFallbackMode] = useState(false)
  const assetsLoaded = usePreloadAssets()

  // Check for WebGL support and handle loading state
  useEffect(() => {
    if (typeof window !== "undefined") {
      // First check if WebGL is available
      if (!isWebGLAvailable()) {
        console.log("WebGL not available, switching to fallback mode")
        setFallbackMode(true)
        setIsLoading(false)
        return;
      }
      
      // If WebGL is available and assets are loaded, stop loading
      if (assetsLoaded) {
        console.log("Assets loaded, showing 3D scene")
        // Use a short timeout to ensure smooth transition
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [assetsLoaded])

  // Handle performance issues
  const handlePerformanceIssue = () => {
    console.warn("Performance issue detected, switching to simplified mode")
    setFallbackMode(true)
    setIsLoading(false)
  }

  // Set up error detection
  useEffect(() => {
    // Set up error detection for WebGL context loss and other errors
    const errorHandler = (event: ErrorEvent) => {
      console.error("Error detected:", event)
      handlePerformanceIssue()
    }
    
    window.addEventListener("error", errorHandler)
    
    // Add a safety timeout to ensure we don't get stuck on loading screen
    const safetyTimer = setTimeout(() => {
      if (isLoading) {
        console.warn("Safety timeout triggered, forcing scene to load")
        setIsLoading(false)
      }
    }, 8000) // 8 second safety timeout

    return () => {
      window.removeEventListener("error", errorHandler)
      clearTimeout(safetyTimer)
    }
  }, [isLoading])

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f") toggleFullscreen()
      if (e.key === "h") setShowSidebar((prev) => !prev)
      if (e.key === "r") setAutoRotate((prev) => !prev)
      if (e.key === "?") setShowHelp((prev) => !showHelp)
      if (e.key === "s") setFallbackMode((prev) => !prev) // Toggle simplified mode for testing
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showHelp])

  return (
    <div className="min-h-screen bg-black">
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full px-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 rounded-full w-9 h-9 p-0"
                    onClick={() => setAutoRotate((prev) => !prev)}
                  >
                    <RotateCcw className={cn("h-4 w-4", !autoRotate && "text-orange-400")} />
                    <span className="sr-only">Toggle Rotation</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Toggle Auto-Rotation (R)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 rounded-full w-9 h-9 p-0"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    <span className="sr-only">Toggle Fullscreen</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Toggle Fullscreen (F)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 rounded-full w-9 h-9 p-0"
                    onClick={() => setShowSidebar(true)}
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Help</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Open Guide (H)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full w-9 h-9 p-0">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {isLoading ? (
        <LoadingScreen />
      ) : fallbackMode ? (
        <SimplifiedBiosphere />
      ) : (
        <div className="h-screen">
          <ErrorBoundary fallback={<SimplifiedBiosphere />}>
            <Canvas
              dpr={[1, dpr]}
              camera={{ position: [0, 5, 18], fov: 60 }}
              onCreated={({ gl }) => {
                gl.setClearColor(new THREE.Color("#000000"))
              }}
              onError={(e) => {
                console.error("Canvas error:", e)
                setFallbackMode(true)
              }}
            >
              <Suspense fallback={null}>
                <BiosphereScene autoRotate={autoRotate} />
              </Suspense>
            </Canvas>
          </ErrorBoundary>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
            <Card className="bg-black/60 backdrop-blur-sm border-none text-white">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
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
                <p className="text-sm">
                  <span className="font-bold">Dosha Galaxy:</span> Click on a planet to explore its properties and
                  recommended practices
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Help dialog */}
          <Sheet open={showHelp} onOpenChange={setShowHelp}>
            <SheetContent side="bottom" className="h-auto max-h-[50vh]">
              <SheetHeader>
                <SheetTitle>Keyboard Shortcuts</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Toggle Fullscreen</span>
                  <Badge variant="outline">F</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Open Guide</span>
                  <Badge variant="outline">H</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Toggle Auto-Rotation</span>
                  <Badge variant="outline">R</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Show Keyboard Shortcuts</span>
                  <Badge variant="outline">?</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Toggle Simplified Mode</span>
                  <Badge variant="outline">S</Badge>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Sidebar with educational content */}
      <BiosphereSidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
    </div>
  )
}

// Simplified constellation lines connecting planets
function ConstellationLines({ planets, activePlanet }: { planets: any[]; activePlanet: string | null }) {
  const linesRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!linesRef.current) return

    const t = clock.getElapsedTime()

    // Pulse opacity based on active planet
    linesRef.current.children.forEach((line, i) => {
      const material = (line as Mesh).material as any

      if (activePlanet) {
        // If a planet is active, highlight lines connected to it
        const isConnectedToActive =
          planets[i].name === activePlanet || planets[(i + 1) % planets.length].name === activePlanet
        material.opacity = isConnectedToActive
          ? 0.3 + Math.sin(t * 2) * 0.2
          : // Pulsing if connected
            0.05 // Dim if not connected
      } else {
        // Normal pulsing when no planet is active
        material.opacity = 0.1 + Math.sin(t * 0.5 + i * 0.2) * 0.05
      }
    })
  })

  return (
    <group ref={linesRef}>
      {planets.map((planet, i) => {
        const nextPlanet = planets[(i + 1) % planets.length]
        const start = new Vector3(...planet.position)
        const end = new Vector3(...nextPlanet.position)

        return (
          <mesh key={i}>
            <bufferGeometry>
              <bufferAttribute
                args={[new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z]), 3]}
                attach="attributes-position"
                array={new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={planet.color} transparent opacity={0.1} linewidth={1} />
          </mesh>
        )
      })}
    </group>
  )
}

// Simplified Central Core component
function CoreSphere() {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (meshRef.current) {
      // Pulsing animation
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 1 + Math.sin(t * 0.5) * 0.03
      meshRef.current.rotation.y = t * 0.1
    }
  })

  return (
    <group>
      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial color="#FFC107" transparent opacity={0.1} />
      </mesh>

      {/* Core body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#FFC107"
          emissive="#FFC107"
          emissiveIntensity={1}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Central label */}
      <Billboard position={[0, 3, 0]}>
        <Text
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.ttf"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          Harmony
        </Text>
      </Billboard>
    </group>
  )
}

