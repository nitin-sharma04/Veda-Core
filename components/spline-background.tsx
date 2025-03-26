'use client'

import { Suspense, useEffect, useState } from "react"

type SplineBackgroundProps = {
  sceneUrl?: string
  className?: string
  fallbackColor?: boolean
}

export default function SplineBackground({
  sceneUrl = "https://prod.spline.design/CwLjPoa1LM25hh88/scene.splinecode",
  className = "",
  fallbackColor = true
}: SplineBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  
  // Handle errors and fallbacks
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        console.warn("Spline scene taking too long to load, showing fallback")
        setHasError(true)
      }
    }, 10000) // 10 second timeout
    
    return () => clearTimeout(timeout)
  }, [isLoaded])
  
  // Loading component for Spline
  function SplineLoader() {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 to-orange-50/20 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 blur-3xl"></div>
            <div className="absolute inset-0 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }
  
  // If there's an error or timeout, show a fallback gradient
  if (hasError && fallbackColor) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-b from-amber-50/20 to-orange-50/20 dark:from-amber-950/20 dark:to-orange-950/20 ${className}`}></div>
    )
  }
  
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <SplineLoader />
      {/* Placeholder for Spline scene */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-blue-200 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple-200 rounded-full blur-2xl animate-pulse"></div>
      </div>
    </div>
  )
}