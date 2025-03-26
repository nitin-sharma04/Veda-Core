"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Mesh } from "three"

export function Cloud({
  position = [0, 0, 0],
  speed = 0.2,
  opacity = 0.5,
}: {
  position?: [number, number, number]
  speed?: number
  opacity?: number
}) {
  const meshRef = useRef<Mesh>(null)

  // Create particles for the cloud
  const particles = useMemo(() => {
    const temp = []
    const particleCount = 20

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 5
      const z = (Math.random() - 0.5) * 10
      temp.push({ x, y, z })
    }

    return temp
  }, [])

  // Create geometry for the cloud
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(particles.length * 3)
    const sizes = new Float32Array(particles.length)

    particles.forEach((particle, i) => {
      positions[i * 3] = particle.x
      positions[i * 3 + 1] = particle.y
      positions[i * 3 + 2] = particle.z
      sizes[i] = Math.random() * 2 + 1
    })

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    return geo
  }, [particles])

  // Animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.1
      meshRef.current.rotation.z = clock.getElapsedTime() * speed * 0.05
    }
  })

  return (
    <points ref={meshRef} position={position} geometry={geometry}>
      <pointsMaterial
        size={2}
        color="#ffffff"
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

