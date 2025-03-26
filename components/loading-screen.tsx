"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
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
      <h2 className="text-2xl font-bold text-white mt-6 font-serif">Loading</h2>
      <p className="text-white/70 mt-2">Preparing your experience{dots}</p>
    </div>
  )
}

