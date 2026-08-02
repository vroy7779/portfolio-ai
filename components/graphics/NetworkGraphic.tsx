'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
  glow: boolean
}

const PALETTE = [
  '#8b5cf6', // violet
  '#a855f7', // purple
  '#7c3aed', // deep purple
  '#fb923c', // orange
  '#f97316', // deep orange
  '#fdba74', // light orange
]

interface NetworkGraphicProps {
  className?: string
  nodeCount?: number
  maxDistance?: number
}

export function NetworkGraphic({ className = '', nodeCount = 85, maxDistance = 170 }: NetworkGraphicProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    let frameId = 0

    const createNodes = () => {
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 1.6,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        glow: Math.random() < 0.16,
      }))
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createNodes()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDistance) {
            const t = 1 - dist / maxDistance
            const alpha = 0.32 + t * 0.68
            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            gradient.addColorStop(0, a.color)
            gradient.addColorStop(1, b.color)
            ctx.strokeStyle = gradient
            ctx.globalAlpha = alpha
            ctx.lineWidth = 1.3
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      for (const node of nodes) {
        if (node.glow) {
          ctx.shadowColor = node.color
          ctx.shadowBlur = 14
        } else {
          ctx.shadowBlur = 0
        }
        ctx.beginPath()
        ctx.fillStyle = node.color
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    const step = () => {
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }
      draw()
      frameId = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReducedMotion) {
      draw()
    } else {
      frameId = requestAnimationFrame(step)
    }

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameId)
    }
  }, [nodeCount, maxDistance])

  return <canvas ref={canvasRef} className={className} />
}
