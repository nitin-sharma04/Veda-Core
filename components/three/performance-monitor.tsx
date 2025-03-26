"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useThree } from "@react-three/fiber"

type PerformanceMonitorProps = {
  children: React.ReactNode
  onDecline?: (props: { factor: number }) => void
  onIncline?: (props: { factor: number }) => void
  threshold?: number
  interval?: number
}

export function PerformanceMonitor({
  children,
  onDecline,
  onIncline,
  threshold = 0.8,
  interval = 2000,
}: PerformanceMonitorProps) {
  const { gl } = useThree()
  const [fps, setFps] = useState<number[]>([])
  const [factor, setFactor] = useState(1)

  useEffect(() => {
    const lastTime = performance.now()
    let frames = 0
    let measuring = false
    let measureStartTime = 0
    let measureEndTime = 0
    let timeoutId: NodeJS.Timeout

    const measure = () => {
      if (!measuring) {
        measuring = true
        measureStartTime = performance.now()
        frames = 0
      }

      const currentTime = performance.now()
      frames++

      if (currentTime - measureStartTime >= interval) {
        measureEndTime = currentTime
        const elapsedTime = measureEndTime - measureStartTime
        const currentFps = Math.round((frames * 1000) / elapsedTime)

        setFps((prevFps) => {
          const newFps = [...prevFps, currentFps].slice(-5) // Keep last 5 measurements

          // Calculate average FPS
          const avgFps = newFps.reduce((sum, val) => sum + val, 0) / newFps.length

          // Determine performance factor (1.0 is optimal, lower means worse performance)
          const targetFps = 60
          const newFactor = Math.min(1, avgFps / targetFps)

          // Only trigger callbacks if factor changes significantly
          if (Math.abs(newFactor - factor) > 0.1) {
            setFactor(newFactor)

            if (newFactor < threshold && onDecline) {
              onDecline({ factor: newFactor })
            } else if (newFactor >= threshold && onIncline) {
              onIncline({ factor: newFactor })
            }
          }

          return newFps
        })

        measuring = false
      }

      timeoutId = setTimeout(measure, 100)
    }

    measure()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [onDecline, onIncline, threshold, interval, factor])

  return <>{children}</>
}

