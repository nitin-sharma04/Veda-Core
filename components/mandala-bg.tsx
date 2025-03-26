"use client"

import { useEffect, useRef } from "react"

export default function MandalaBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match the window
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawMandala()
    }

    window.addEventListener("resize", resize)
    resize()

    function drawMandala() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.8

      // Drawing various concentric patterns
      drawConcentricCircles(centerX, centerY, maxRadius)
      drawRadialLines(centerX, centerY, maxRadius * 0.9, 24)
      drawFlowerOfLife(centerX, centerY, maxRadius * 0.8)
      drawSriYantra(centerX, centerY, maxRadius * 0.6)
    }

    function drawConcentricCircles(x: number, y: number, maxRadius: number) {
      const numCircles = 8

      for (let i = 0; i < numCircles; i++) {
        const radius = (maxRadius / numCircles) * (i + 1)
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = "#FFF"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    function drawRadialLines(x: number, y: number, radius: number, numLines: number) {
      for (let i = 0; i < numLines; i++) {
        const angle = ((Math.PI * 2) / numLines) * i
        const endX = x + Math.cos(angle) * radius
        const endY = y + Math.sin(angle) * radius

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = "#FFF"
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    function drawFlowerOfLife(x: number, y: number, maxRadius: number) {
      const numPetals = 6
      const petalRadius = maxRadius / 4

      for (let i = 0; i < numPetals; i++) {
        const angle = ((Math.PI * 2) / numPetals) * i
        const petalX = x + Math.cos(angle) * petalRadius
        const petalY = y + Math.sin(angle) * petalRadius

        ctx.beginPath()
        ctx.arc(petalX, petalY, petalRadius, 0, Math.PI * 2)
        ctx.strokeStyle = "#FFF"
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Center circle
      ctx.beginPath()
      ctx.arc(x, y, petalRadius, 0, Math.PI * 2)
      ctx.strokeStyle = "#FFF"
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    function drawSriYantra(x: number, y: number, size: number) {
      const triangleSize = size / 2

      // Draw downward triangle
      ctx.beginPath()
      ctx.moveTo(x, y - triangleSize / 2)
      ctx.lineTo(x + triangleSize / 2, y + triangleSize / 2)
      ctx.lineTo(x - triangleSize / 2, y + triangleSize / 2)
      ctx.closePath()
      ctx.strokeStyle = "#FFF"
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Draw upward triangle
      ctx.beginPath()
      ctx.moveTo(x, y + triangleSize / 2)
      ctx.lineTo(x + triangleSize / 2, y - triangleSize / 2)
      ctx.lineTo(x - triangleSize / 2, y - triangleSize / 2)
      ctx.closePath()
      ctx.strokeStyle = "#FFF"
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

