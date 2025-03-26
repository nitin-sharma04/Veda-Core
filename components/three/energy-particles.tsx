"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Points } from "three"

export function EnergyParticles({
  count = 100,
  radius = 20,
  color = "#ffffff",
}: {
  count?: number
  radius?: number
  color?: string
}) {
  const pointsRef = useRef<Points>(null)

  // Create particles
  const particles = useMemo(() => {
    const temp = []

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      temp.push({ x, y, z, velocity: Math.random() * 0.02 + 0.01 })
    }

    return temp
  }, [count, radius])

  // Create geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    particles.forEach((particle, i) => {
      positions[i * 3] = particle.x
      positions[i * 3 + 1] = particle.y
      positions[i * 3 + 2] = particle.z
      sizes[i] = Math.random() * 1.5 + 0.5
    })

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    return geo
  }, [particles, count])

  // Animation
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      const time = clock.getElapsedTime()

      for (let i = 0; i < count; i++) {
        const i3 = i * 3

        // Create flowing motion
        const x = positions[i3]
        const y = positions[i3 + 1]
        const z = positions[i3 + 2]

        // Calculate distance from center
        const distance = Math.sqrt(x * x + y * y + z * z)

        // Normalize to get direction vector
        const nx = x / distance
        const ny = y / distance
        const nz = z / distance

        // Apply sine wave motion
        const wave = Math.sin(time * particles[i].velocity + i * 0.1) * 2

        positions[i3] = x + nx * wave * 0.1
        positions[i3 + 1] = y + ny * wave * 0.1
        positions[i3 + 2] = z + nz * wave * 0.1
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={1.5}
        color={color}
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

