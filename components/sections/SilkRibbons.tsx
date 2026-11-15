'use client'

import { useEffect, useRef, useState } from 'react'
import stillImage from '@/assets/hero-silk-still.jpg'
import s from './Silk.module.css'

/**
 * The hero silk: five translucent ribbons in plain WebGL (no libraries), ported from the approved Direction E
 * mockup. Each ribbon is a strip mesh (s along its length, v across it) on a cubic Bezier anchored at the right
 * edge, twisted and slightly curled in the vertex shader. The fragment shader adds silk fibres, feathered edges,
 * a view-angle tint, a sheen and fine highlight lines. A pre-rendered still sits underneath, so the page looks
 * the same with or without WebGL; the canvas fades in once it has drawn its first frame.
 *
 * p: control points [dx from the right edge, y] (half-height = 1); hw, tw: half width and twist, start to end;
 * c0, c1: colour across the width; c2: colour the length drifts toward; iri: view-angle tint; a: opacity; ph: phase.
 */
const RIBBONS = [
  { p: [[-1.8, 1.4], [-1.2, 0.55], [-0.55, -0.35], [0.35, -1.4]], hw: [0.6, 0.34], tw: [0.15, 0.85], c0: '#8FA2FF', c1: '#F07CFF', c2: '#FF6CC0', iri: '#FFD1F2', a: 0.92, ph: 0.0 },
  { p: [[-1.35, 1.45], [-0.88, 0.45], [-0.38, -0.45], [0.05, -1.45]], hw: [0.54, 0.28], tw: [-0.1, 1.55], c0: '#FF4FB2', c1: '#FF7A40', c2: '#FF4F96', iri: '#FFC4A8', a: 0.95, ph: 1.7 },
  { p: [[-0.9, 1.5], [-0.62, 0.5], [-0.42, -0.3], [-0.36, -1.5]], hw: [0.44, 0.22], tw: [0.2, 2.1], c0: '#FF8A2E', c1: '#FFB000', c2: '#FF9C12', iri: '#FFE7B0', a: 0.96, ph: 3.1 },
  { p: [[-0.46, 1.5], [-0.24, 0.4], [-0.56, -0.6], [-0.4, -1.5]], hw: [0.24, 0.2], tw: [0.0, 3.3], c0: '#FFC59A', c1: '#FFAE86', c2: '#FFD2B0', iri: '#FFF1E4', a: 0.94, ph: 4.4 },
  { p: [[-0.16, 1.45], [-0.2, 0.2], [0.05, -0.7], [0.42, -1.45]], hw: [0.2, 0.16], tw: [0.5, -0.8], c0: '#7E5DFF', c1: '#FF6DB6', c2: '#A86BFF', iri: '#E9D9FF', a: 0.96, ph: 5.6 },
]

const VERT = `
attribute vec2 aUV;
uniform float uTime;
uniform float uAspect;
uniform vec2 uTilt;
uniform mat4 uProj;
uniform vec2 uP0; uniform vec2 uP1; uniform vec2 uP2; uniform vec2 uP3;
uniform vec2 uHW; uniform vec2 uTW; uniform float uPh;
varying float vS; varying float vV; varying vec3 vN; varying vec3 vPos;
vec3 P0; vec3 P1; vec3 P2; vec3 P3;
vec3 bez(float s){ float m=1.0-s; return P0*m*m*m+P1*3.0*m*m*s+P2*3.0*m*s*s+P3*s*s*s; }
vec3 pos(float s,float v){
  vec3 c=bez(s);
  vec3 T=normalize(bez(min(s+0.002,1.0))-bez(max(s-0.002,0.0)));
  vec3 B=normalize(cross(T,vec3(0.0,0.0,1.0)));
  vec3 N=cross(B,T);
  float a=mix(uTW.x,uTW.y,s)+0.22*sin(uTime*0.15+uPh+s*2.0);
  float hw=mix(uHW.x,uHW.y,s);
  vec3 Wd=B*cos(a)+N*sin(a);
  vec3 Nd=N*cos(a)-B*sin(a);
  return c+Wd*(v*hw)+Nd*(0.35*hw*v*v)+vec3(uTilt.x*0.03*(1.0+uPh*0.1),uTilt.y*0.02,0.0);
}
void main(){
  P0=vec3(uAspect+uP0.x,uP0.y,0.0);
  P1=vec3(uAspect+uP1.x,uP1.y,0.0)+vec3(0.06*sin(uTime*0.19+uPh),0.04*cos(uTime*0.23+uPh),0.25*sin(uTime*0.13+uPh));
  P2=vec3(uAspect+uP2.x,uP2.y,0.0)+vec3(0.07*cos(uTime*0.17+uPh),0.05*sin(uTime*0.21+uPh),0.25*cos(uTime*0.11+uPh));
  P3=vec3(uAspect+uP3.x,uP3.y,0.0);
  float s=aUV.x; float v=aUV.y;
  vec3 p=pos(s,v);
  vec3 du=pos(min(s+0.002,1.0),v)-pos(max(s-0.002,0.0),v);
  vec3 dv=pos(s,v+0.05)-pos(s,v-0.05);
  vN=normalize(cross(du,dv));
  vS=s; vV=v; vPos=p;
  gl_Position=uProj*vec4(p.x,p.y,p.z-4.0,1.0);
}`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform float uFTime; uniform vec2 uRes;
/* own names: vertex and fragment uniforms may differ in precision, so none are shared */
uniform vec2 uFHW; uniform float uFPh; uniform float uAlpha;
uniform vec3 uC0; uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uIri;
varying float vS; varying float vV; varying vec3 vN; varying vec3 vPos;
/* sine-free hash: stable on mobile GPUs */
float hash(vec2 p){ vec3 p3=fract(vec3(p.xyx)*0.1031); p3+=dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float vnoise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),f.x),f.y); }
void main(){
  float s=vS; float v=vV;
  vec3 n=normalize(vN);
  vec3 V=normalize(vec3(0.0,0.0,4.0)-vPos);
  if(dot(n,V)<0.0) n=-n;
  vec3 L=normalize(vec3(-0.4,0.7,0.6));
  float ndv=clamp(abs(dot(n,V)),0.0,1.0);
  float ndl=max(dot(n,L),0.0);
  float hw=mix(uFHW.x,uFHW.y,s); float F=170.0*hw;
  float fib=vnoise(vec2(v*F,s*4.0-uFTime*0.04+uFPh*7.0))*0.6+vnoise(vec2(v*F*2.3,s*9.0+uFPh*3.0))*0.4;
  vec3 col=mix(uC0,uC1,v*0.5+0.5);
  col=mix(col,uC2,smoothstep(0.35,1.0,s)*0.55);
  col=mix(col,uIri,(1.0-ndv)*0.30);
  col*=0.92+0.14*ndl;
  col*=0.95+0.10*fib;
  col*=0.84+0.16*sqrt(ndv);
  vec3 H=normalize(L+V);
  float sheen=pow(max(dot(n,H),0.0),18.0)*0.30;
  float fold=pow(1.0-ndv,6.0)*0.55;
  float d=(v-0.80)/0.035;
  float hl=exp(-d*d)*0.42*(0.6+0.4*fib);
  col=mix(col,vec3(1.0),clamp(sheen+fold+hl,0.0,0.75));
  col=clamp(col,0.0,1.0);
  float a=uAlpha*(0.90+0.10*fib);
  a*=1.0-smoothstep(0.80,1.0,abs(v)+(fib-0.5)*0.08);
  a*=smoothstep(0.0,0.12,gl_FragCoord.x/uRes.x);
  a=clamp(a,0.0,1.0);
  gl_FragColor=vec4(col*a,a);
}`

function rgb(hex: string): number[] {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

/** Camera at z = 4; the canvas half-height is exactly 1 unit at z = 0. */
function perspective(aspect: number): Float32Array {
  const f = 4.0
  const near = 0.1
  const far = 20.0
  const nf = 1 / (near - far)
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0])
}

export function SilkRibbons() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [live, setLive] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const hero = canvas.closest('section') as HTMLElement | null

    let disabled = false
    const fail = (reason: string, detail?: unknown) => {
      // eslint-disable-next-line no-console
      console.warn('[hero] WebGL disabled: ' + reason, detail ?? '')
      disabled = true
      setLive(false)
      setFailed(true)
    }

    let gl: WebGLRenderingContext | null = null
    try {
      const opts = { alpha: true, premultipliedAlpha: true, antialias: true, depth: false, stencil: false, powerPreference: 'high-performance' as const }
      gl = (canvas.getContext('webgl', opts) || canvas.getContext('experimental-webgl', opts)) as WebGLRenderingContext | null
    } catch {
      gl = null
    }
    if (!gl) {
      fail('no context')
      return
    }
    const g = gl

    const compile = (type: number, src: string) => {
      const sh = g.createShader(type)
      if (!sh) return null
      g.shaderSource(sh, src)
      g.compileShader(sh)
      if (!g.getShaderParameter(sh, g.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.warn('[hero] shader compile error:', g.getShaderInfoLog(sh))
        g.deleteShader(sh)
        return null
      }
      return sh
    }

    const SU = 240
    const SV = 24
    let indexCount = 0
    const u: Record<string, WebGLUniformLocation | null> = {}
    let prog: WebGLProgram | null = null
    let vbo: WebGLBuffer | null = null
    let ibo: WebGLBuffer | null = null
    const ribbons = RIBBONS.map((r) => ({ ...r, C0: rgb(r.c0), C1: rgb(r.c1), C2: rgb(r.c2), IRI: rgb(r.iri) }))

    try {
      const vs = compile(g.VERTEX_SHADER, VERT)
      const fs = compile(g.FRAGMENT_SHADER, FRAG)
      if (!vs || !fs) {
        fail('compile')
        return
      }
      prog = g.createProgram()!
      g.attachShader(prog, vs)
      g.attachShader(prog, fs)
      g.linkProgram(prog)
      if (!g.getProgramParameter(prog, g.LINK_STATUS)) {
        fail('link', g.getProgramInfoLog(prog))
        return
      }
      g.useProgram(prog)

      const verts = new Float32Array((SU + 1) * (SV + 1) * 2)
      let k = 0
      for (let i = 0; i <= SU; i++) {
        for (let j = 0; j <= SV; j++) {
          verts[k++] = i / SU
          verts[k++] = (j / SV) * 2 - 1
        }
      }
      const idx = new Uint16Array(SU * SV * 6)
      k = 0
      for (let i = 0; i < SU; i++) {
        for (let j = 0; j < SV; j++) {
          const a = i * (SV + 1) + j
          const b = a + SV + 1
          idx[k++] = a
          idx[k++] = b
          idx[k++] = a + 1
          idx[k++] = a + 1
          idx[k++] = b
          idx[k++] = b + 1
        }
      }
      indexCount = idx.length
      vbo = g.createBuffer()
      g.bindBuffer(g.ARRAY_BUFFER, vbo)
      g.bufferData(g.ARRAY_BUFFER, verts, g.STATIC_DRAW)
      ibo = g.createBuffer()
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, ibo)
      g.bufferData(g.ELEMENT_ARRAY_BUFFER, idx, g.STATIC_DRAW)
      const aUV = g.getAttribLocation(prog, 'aUV')
      g.enableVertexAttribArray(aUV)
      g.vertexAttribPointer(aUV, 2, g.FLOAT, false, 0, 0)
      ;['uTime', 'uAspect', 'uTilt', 'uProj', 'uRes', 'uP0', 'uP1', 'uP2', 'uP3', 'uHW', 'uTW', 'uPh', 'uAlpha', 'uFTime', 'uFHW', 'uFPh', 'uC0', 'uC1', 'uC2', 'uIri'].forEach(
        (name) => {
          u[name] = g.getUniformLocation(prog!, name)
        }
      )

      g.disable(g.DEPTH_TEST)
      g.disable(g.CULL_FACE)
      g.enable(g.BLEND)
      g.blendFunc(g.ONE, g.ONE_MINUS_SRC_ALPHA) // premultiplied "over", back to front
      g.clearColor(0, 0, 0, 0)
    } catch (e) {
      fail('setup', e)
      return
    }

    const MAX_PIXELS = 2200000
    let aspect = 1
    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return false
      const scale = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / (w * h)))
      const cw = Math.max(1, Math.round(w * scale))
      const ch = Math.max(1, Math.round(h * scale))
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw
        canvas.height = ch
      }
      g.viewport(0, 0, cw, ch)
      aspect = w / h
      return true
    }

    const reduceMQ = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
    let time = 5.0
    let last = 0
    let raf = 0
    let onScreen = true
    let drewOnce = false
    const tilt = [0, 0]
    const tiltTarget = [0, 0]
    let stopped = false

    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const draw = () => {
      if (!resize()) return
      g.clear(g.COLOR_BUFFER_BIT)
      g.uniformMatrix4fv(u.uProj, false, perspective(aspect))
      g.uniform1f(u.uAspect, aspect)
      g.uniform1f(u.uTime, time)
      g.uniform1f(u.uFTime, time)
      g.uniform2f(u.uTilt, tilt[0], tilt[1])
      g.uniform2f(u.uRes, canvas.width, canvas.height)
      for (const R of ribbons) {
        g.uniform2f(u.uP0, R.p[0][0], R.p[0][1])
        g.uniform2f(u.uP1, R.p[1][0], R.p[1][1])
        g.uniform2f(u.uP2, R.p[2][0], R.p[2][1])
        g.uniform2f(u.uP3, R.p[3][0], R.p[3][1])
        g.uniform2f(u.uHW, R.hw[0], R.hw[1])
        g.uniform2f(u.uFHW, R.hw[0], R.hw[1])
        g.uniform2f(u.uTW, R.tw[0], R.tw[1])
        g.uniform1f(u.uPh, R.ph)
        g.uniform1f(u.uFPh, R.ph)
        g.uniform1f(u.uAlpha, R.a)
        g.uniform3fv(u.uC0, R.C0)
        g.uniform3fv(u.uC1, R.C1)
        g.uniform3fv(u.uC2, R.C2)
        g.uniform3fv(u.uIri, R.IRI)
        g.drawElements(g.TRIANGLES, indexCount, g.UNSIGNED_SHORT, 0)
      }
      const err = g.getError()
      if (err !== g.NO_ERROR && err !== g.CONTEXT_LOST_WEBGL) {
        fail('draw error', err)
        stop()
        return
      }
      if (!drewOnce) {
        drewOnce = true
        setLive(true)
      }
    }

    const shouldRun = () => onScreen && !document.hidden && !(reduceMQ && reduceMQ.matches) && !disabled && !stopped
    const frame = (now: number) => {
      raf = 0
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
      last = now
      time += dt
      tilt[0] += (tiltTarget[0] - tilt[0]) * 0.03
      tilt[1] += (tiltTarget[1] - tilt[1]) * 0.03
      draw()
      if (shouldRun()) raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (!raf && shouldRun()) {
        last = 0
        raf = requestAnimationFrame(frame)
      }
    }
    const sync = () => {
      if (shouldRun()) start()
      else {
        stop()
        if (!disabled && !stopped) draw()
      }
    }

    const onReduce = () => sync()
    reduceMQ?.addEventListener?.('change', onReduce)
    const io = new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting
      sync()
    })
    io.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    const ro = new ResizeObserver(() => {
      if (!raf && !disabled && !stopped) draw()
    })
    ro.observe(canvas)

    const onMove = (e: PointerEvent) => {
      if (reduceMQ && reduceMQ.matches) return
      tiltTarget[0] = (e.clientX / window.innerWidth - 0.5) * 2
      tiltTarget[1] = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    hero?.addEventListener('pointermove', onMove)
    const onLost = (e: Event) => {
      e.preventDefault()
      stop()
      fail('context lost')
    }
    canvas.addEventListener('webglcontextlost', onLost, false)

    try {
      sync()
    } catch (e) {
      fail('first draw', e)
    }

    return () => {
      stopped = true
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', sync)
      reduceMQ?.removeEventListener?.('change', onReduce)
      hero?.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('webglcontextlost', onLost, false)
      try {
        if (vbo) g.deleteBuffer(vbo)
        if (ibo) g.deleteBuffer(ibo)
        if (prog) g.deleteProgram(prog)
      } catch {
        /* the context may already be gone */
      }
    }
  }, [])

  return (
    <div className={`${s.silk} ${live ? s.live : ''} ${failed ? s.noWebgl : ''}`} aria-hidden="true">
      <img className={s.still} src={stillImage.src} width={1440} height={1364} alt="" decoding="async" />
      <canvas ref={canvasRef} className={s.canvas} />
    </div>
  )
}
