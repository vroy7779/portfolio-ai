'use client'

import dynamic from 'next/dynamic'

// Spline only runs in the browser, so it loads on demand and never during server render.
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false, loading: () => null })

/**
 * Where the Spline scene URL comes from. Publish a scene in Spline (Export > Code > Public URL),
 * then put its `.splinecode` link in `.env.local` as NEXT_PUBLIC_SPLINE_SCENE_URL and restart the dev server.
 * Left empty, the hero shows the layered Ciena screens instead.
 */
export const SPLINE_SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? ''

export function SplineScene({ scene, className }: { scene: string; className?: string }) {
  return <Spline scene={scene} className={className} />
}
