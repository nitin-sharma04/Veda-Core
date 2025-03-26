"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Mesh, Group } from "three"
import { Text } from "@react-three/drei"

export default function PlanetComponent({
  position = [0, 0, 0],
  size = 1,
  color = "#ffffff",
  name = "Planet",
  onClick = () => {},
  isActive = false,
  rotationSpeed = 0.005,
  hasRings = false,
  dosha = "",
  orbitRadius = 10,
  orbitSpeed = 0.0002,
  orbitOffset = 0,
}: {
  position?: [number, number, number]
  size?: number
  color?: string
  name?: string
  onClick?: () => void
  isActive?: boolean
  rotationSpeed?: number
  hasRings?: boolean
  dosha?: string
  orbitRadius?: number
  orbitSpeed?: number
  orbitOffset?: number
}) {
  const planetRef = useRef<Mesh>(null)
  const cloudsRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)
  const ringsRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [initialPosition] = useState(position)

  // Handle hover state
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [hovered])

  // Animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (groupRef.current) {
      // Orbital movement
      const angle = time * orbitSpeed + orbitOffset
      groupRef.current.position.x = Math.cos(angle) * orbitRadius
      groupRef.current.position.z = Math.sin(angle) * orbitRadius
    }

    if (planetRef.current) {
      // Self rotation
      planetRef.current.rotation.y += rotationSpeed

      // Scale animation when active or hovered
      const targetScale = isActive || hovered ? 1.1 : 1
      planetRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }

    if (cloudsRef.current) {
      // Clouds rotation (slightly different speed)
      cloudsRef.current.rotation.y += rotationSpeed * 0.6
    }

    if (ringsRef.current && hasRings) {
      // Rings wobble
      ringsRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.2) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={initialPosition}>
      <group onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Planet sphere */}
        <mesh ref={planetRef} castShadow receiveShadow>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            metalness={0.2}
            roughness={0.8}
            emissive={color}
            emissiveIntensity={isActive ? 0.3 : 0.1}
          />
        </mesh>

        {/* Cloud layer */}
        <mesh ref={cloudsRef} scale={1.05}>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} depthWrite={false} />
        </mesh>

        {/* Rings (if enabled) */}
        {hasRings && (
          <mesh ref={ringsRef} rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry args={[size * 1.5, size * 2.2, 64]} />
            <meshStandardMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Glow effect */}
        <mesh scale={1.2}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={isActive ? 0.1 : 0.05} depthWrite={false} />
        </mesh>

        {/* Planet name label */}
        <Text
          position={[0, size * 1.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.ttf"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </group>
    </group>
  )
}

