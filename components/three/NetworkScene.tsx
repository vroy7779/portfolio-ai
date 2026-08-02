'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Purpose: the Hero's one deliberate 3D moment (Creative Direction addendum —
 * the network-graph metaphor now has a 3D expression reserved for this single
 * first-impression surface; every other instance of the graph stays the
 * lightweight 2D canvas in `components/graphics/NetworkGraphic.tsx`).
 *
 * Same palette, same connect-nearby-nodes algorithm as the 2D version, extended
 * into a shallow depth field with a subtle pointer-reactive parallax — not a
 * deep tunnel, not scroll-linked (Creative Direction rules out scroll-parallax).
 *
 * Props: `paused` — stops the render loop entirely (passed by HeroBackground
 * when the Hero has scrolled out of view, so this never spends a frame budget
 * on a canvas nobody can see).
 *
 * Accessibility: never mounted for a `prefers-reduced-motion` visitor at all —
 * that decision is made one level up, in HeroBackground, which renders the
 * static 2D canvas instead for them. This component assumes motion is wanted.
 *
 * Performance: nodes are a single InstancedMesh (one draw call regardless of
 * count); the pairwise nearest-neighbor connection check is O(n²) and is
 * deliberately throttled to run a few times a second, not every frame — the
 * same quadratic-scaling caution flagged for the 2D canvas in the Design
 * System doc.
 */

const PALETTE = [
  '#8b5cf6', // violet — matches components/graphics/NetworkGraphic.tsx exactly
  '#a855f7', // purple
  '#7c3aed', // deep purple
  '#fb923c', // orange
  '#f97316', // deep orange
  '#fdba74', // light orange
]

const NODE_COUNT = 70
const MAX_DISTANCE = 3.4
const CONNECTION_UPDATE_INTERVAL = 0.15 // seconds — throttles the O(n²) recompute
const BOUNDS = { x: 8.5, y: 4.6, z: 2.2 }

interface Node {
  position: THREE.Vector3
  velocity: THREE.Vector3
  color: THREE.Color
  scale: number
}

function createNodes(count: number): Node[] {
  return Array.from({ length: count }, () => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * BOUNDS.x * 2,
      (Math.random() - 0.5) * BOUNDS.y * 2,
      (Math.random() - 0.5) * BOUNDS.z * 2
    ),
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.2
    ),
    color: new THREE.Color(PALETTE[Math.floor(Math.random() * PALETTE.length)]),
    // ~15% of nodes render larger, echoing the 2D canvas's "glow" subset —
    // a cheap stand-in for a bloom pass, not worth the postprocessing dependency here.
    scale: Math.random() < 0.15 ? 1.8 : 1,
  }))
}

function NodeField() {
  const nodes = useMemo(() => createNodes(NODE_COUNT), [])
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const timeSinceConnectionUpdate = useRef(0)

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const maxSegments = (NODE_COUNT * (NODE_COUNT - 1)) / 2
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxSegments * 2 * 3), 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(maxSegments * 2 * 3), 3))
    geometry.setDrawRange(0, 0)
    return geometry
  }, [])

  // Per-instance color is set once — only positions change frame to frame.
  useEffect(() => {
    if (!meshRef.current) return
    nodes.forEach((node, i) => meshRef.current!.setColorAt(i, node.color))
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  }, [nodes])

  useFrame((state, delta) => {
    const dummy = new THREE.Object3D()

    for (const node of nodes) {
      node.position.addScaledVector(node.velocity, delta)
      if (Math.abs(node.position.x) > BOUNDS.x) node.velocity.x *= -1
      if (Math.abs(node.position.y) > BOUNDS.y) node.velocity.y *= -1
      if (Math.abs(node.position.z) > BOUNDS.z) node.velocity.z *= -1
    }

    if (meshRef.current) {
      nodes.forEach((node, i) => {
        dummy.position.copy(node.position)
        dummy.scale.setScalar(node.scale)
        dummy.updateMatrix()
        meshRef.current!.setMatrixAt(i, dummy.matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }

    timeSinceConnectionUpdate.current += delta
    if (timeSinceConnectionUpdate.current >= CONNECTION_UPDATE_INTERVAL) {
      timeSinceConnectionUpdate.current = 0

      const positions = lineGeometry.attributes.position.array as Float32Array
      const colors = lineGeometry.attributes.color.array as Float32Array
      let segments = 0

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position)
          if (dist < MAX_DISTANCE) {
            const p = segments * 6
            positions[p] = nodes[i].position.x
            positions[p + 1] = nodes[i].position.y
            positions[p + 2] = nodes[i].position.z
            positions[p + 3] = nodes[j].position.x
            positions[p + 4] = nodes[j].position.y
            positions[p + 5] = nodes[j].position.z

            colors[p] = nodes[i].color.r
            colors[p + 1] = nodes[i].color.g
            colors[p + 2] = nodes[i].color.b
            colors[p + 3] = nodes[j].color.r
            colors[p + 4] = nodes[j].color.g
            colors[p + 5] = nodes[j].color.b

            segments++
          }
        }
      }

      lineGeometry.setDrawRange(0, segments * 2)
      lineGeometry.attributes.position.needsUpdate = true
      lineGeometry.attributes.color.needsUpdate = true
    }

    // Subtle pointer-reactive parallax — ambient depth, not a scroll effect.
    if (groupRef.current) {
      const targetRotY = state.pointer.x * 0.1
      const targetRotX = -state.pointer.y * 0.06
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.45} toneMapped={false} />
      </lineSegments>
    </group>
  )
}

interface NetworkSceneProps {
  /** Stops the render loop entirely — pass `true` once the Hero scrolls out of view. */
  paused?: boolean
}

/**
 * Fills its parent at 100%/100% — absolute positioning is the parent container's
 * job (HeroBackground's wrapper div already handles `absolute inset-0`). Sizing
 * the Canvas itself with an explicit width/height, rather than relying on
 * `inset: 0` cascading through a second positioned element, is the R3F-documented
 * safe pattern — the alternative left the canvas stuck at the browser's default
 * 300×150 drawing buffer instead of its container's real size.
 */
export function NetworkScene({ paused = false }: NetworkSceneProps) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%', display: 'block' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 11], fov: 45 }}
      frameloop={paused ? 'never' : 'always'}
    >
      <NodeField />
    </Canvas>
  )
}
