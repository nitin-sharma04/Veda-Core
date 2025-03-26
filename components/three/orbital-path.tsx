"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Line } from "three"

export function OrbitalPath({
  radius = 10,
  color = "#ffffff",
  pulseColor = "#ffffff",
  visible = true,
}: {
  radius?: number
  color?: string
  pulseColor?: string
  visible?: boolean
}) {
  const lineRef = useRef<Line>(null)
  const pulseRef = useRef<Line>(null)
  const pulsePositionRef = useRef(0)

  // Create orbital path points
  const points = useMemo(() => {
    const temp = []
    const segments = 64

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      const x = radius * Math.cos(theta)
      const z = radius * Math.sin(theta)
      temp.push(new THREE.Vector3(x, 0, z))
    }

    return temp
  }, [radius])

  // Create geometry
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  // Create pulse geometry (just a small segment)
  const pulseGeometry = useMemo(() => {
    const pulsePoints = []
    const pulseLength = 0.1 // 10% of the circle

    for (let i = 0; i <= 10; i++) {
      const theta = (i / 10) * Math.PI * 2 * pulseLength
      const x = radius * Math.cos(theta)
      const z = radius * Math.sin(theta)
      pulsePoints.push(new THREE.Vector3(x, 0, z))
    }

    return new THREE.BufferGeometry().setFromPoints(pulsePoints)
  }, [radius])

  // Animation
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const time = clock.getElapsedTime()

      // Update pulse position
      pulsePositionRef.current = (time * 0.2) % 1
      const angle = pulsePositionRef.current * Math.PI * 2

      // Rotate the pulse around the orbit
      pulseRef.current.rotation.y = angle

      // Pulse opacity
      const material = pulseRef.current.material as THREE.LineBasicMaterial
      material.opacity = (Math.sin(time * 3) + 1) * 0.5
    }
  })

  if (!visible) return null

  return (
    <group>
      {/* Main orbital path */}
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>

      {/* Pulse that travels around the path */}
      <line ref={pulseRef} geometry={pulseGeometry}>
        <lineBasicMaterial color={pulseColor} transparent opacity={0.8} />
      </line>
    </group>
  )
}

