'use client'

import React, { useState } from 'react'
import type { StaticImageData } from 'next/image'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

type Src = string | StaticImageData | undefined

interface ImageWithFallbackProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: Src
}

/**
 * Temporary bridge component from the pre-Next.js build, kept for M0 parity only.
 * Next.js static image imports resolve to a `StaticImageData` object (not a plain
 * URL string), so this unwraps `.src` before handing off to a plain <img>.
 * Section-by-section, this is being replaced by `next/image` directly (see the
 * Design System doc's flagged 32MB-of-uncompressed-screenshots finding) — do not
 * reach for this component in new code.
 */
export function ImageWithFallback({ src, alt, style, className, ...rest }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const resolvedSrc = typeof src === 'object' && src !== null ? src.src : src

  const handleError = () => {
    setDidError(true)
  }

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={resolvedSrc} />
      </div>
    </div>
  ) : (
    <img src={resolvedSrc} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
