/**
 * The site's one signature motion curve (Creative Direction, Design System: "one
 * easing curve, sitewide — no second curve for content reveals"). Previously this
 * exact array was independently redeclared in six separate component files; this
 * is the single source of truth every one of them now imports instead.
 *
 * Fast departure, long gentle deceleration, no overshoot — reads as a controlled,
 * confident arrival rather than a playful spring-back. The one sanctioned
 * exception is the case-study panel's surface-entrance spring (damping 32,
 * stiffness 300), reserved exclusively for large surfaces entering the screen.
 */
export const EASE = [0.16, 1, 0.3, 1] as const

/**
 * A JS easing function visually equivalent to `EASE` above, for libraries (Lenis)
 * that take a `(t: number) => number` function rather than a CSS cubic-bezier.
 * This is the standard "ease-out expo" curve — same fast-start/long-decel shape
 * as the cubic-bezier used everywhere else, so scroll feel and reveal motion read
 * as the same physical language rather than two different curves.
 */
export function lenisEasing(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/** The one sanctioned spring, reserved for large surfaces entering the screen (the case-study panel). */
export const SURFACE_SPRING = { type: 'spring', damping: 32, stiffness: 300 } as const
