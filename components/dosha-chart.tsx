"use client"

import { useEffect, useRef } from "react"

export default function DoshaChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 400
    canvas.height = 300

    // Data for the chart
    const data = [
      { name: "Vata", value: 42, color: "#60A5FA" }, // blue-400
      { name: "Pitta", value: 35, color: "#F87171" }, // red-400
      { name: "Kapha", value: 23, color: "#4ADE80" }, // green-400
    ]

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw the donut chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40
    const innerRadius = radius * 0.6

    let startAngle = -Math.PI / 2 // Start from the top

    // Draw each segment
    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total
      const endAngle = startAngle + sliceAngle

      // Draw the slice
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      // Draw label line and text
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius + 20
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      // Draw line from donut to label
      ctx.beginPath()
      const lineStartX = centerX + Math.cos(midAngle) * radius
      const lineStartY = centerY + Math.sin(midAngle) * radius
      ctx.moveTo(lineStartX, lineStartY)
      ctx.lineTo(labelX, labelY)
      ctx.strokeStyle = item.color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw label text
      ctx.font = "bold 14px sans-serif"
      ctx.fillStyle = "#1F2937" // slate-800
      ctx.textAlign = midAngle < Math.PI ? "left" : "right"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.name} (${item.value}%)`, labelX + (midAngle < Math.PI ? 5 : -5), labelY)

      startAngle = endAngle
    })

    // Draw center circle with gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius * 0.5, centerX, centerY, innerRadius)
    gradient.addColorStop(0, "#FFFBEB") // amber-50
    gradient.addColorStop(1, "#FEF3C7") // amber-100

    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw center text
    ctx.font = "bold 16px sans-serif"
    ctx.fillStyle = "#92400E" // amber-800
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Dosha", centerX, centerY - 10)
    ctx.fillText("Balance", centerX, centerY + 10)
  }, [])

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
        style={{ width: "100%", maxWidth: "400px", height: "auto" }}
      />
    </div>
  )
}

