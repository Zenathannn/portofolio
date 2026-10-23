'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from './theme-provider'

// Fullscreen quad vertex shader
const VS_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// Fragment shader: smooth organic marbled liquid contours + risograph stipple spray
const FS_SOURCE = `
precision highp float;

varying vec2 v_uv;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color_bg;
uniform vec3 u_color_fg;
uniform vec3 u_color_accent;
uniform float u_dark;

// 2D Hash
vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// Smooth Perlin/Gradient Noise
float pnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    // Quintic hermite curve for silky smooth contours (eliminates all blocky artifacts)
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    float n00 = dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
    float n10 = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
    float n01 = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
    float n11 = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));

    return mix(mix(n00, n10, u.x), mix(n01, n11, u.x), u.y);
}

// 2-octave smooth FBM for broad liquid folds
float smoothFbm(vec2 p) {
    float v = pnoise(p) * 0.65;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    v += pnoise(rot * p * 1.85 + vec2(1.3, 2.7)) * 0.35;
    return v;
}

// High-frequency Risograph stipple noise
float stippleDither(vec2 coord) {
    // Interleaved gradient noise + golden ratio pseudo-randomness
    float ign = fract(52.9829189 * fract(dot(coord, vec2(0.06711056, 0.00583715))));
    float rnd = fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453);
    return mix(ign, rnd, 0.4);
}

void main() {
    // Screen aspect ratio correction
    vec2 aspect = vec2(u_resolution.x / min(u_resolution.x, u_resolution.y),
                       u_resolution.y / min(u_resolution.x, u_resolution.y));
    vec2 uv = (v_uv - 0.5) * aspect;

    // Scale coordinates for broad, bold fluid rivers
    vec2 p = uv * 2.2;

    // Idle animation: very smooth, slow fluid drift
    float t = u_time * 0.055;

    // Domain warping layer 1
    vec2 q = vec2(
        smoothFbm(p + vec2(0.0, 0.0) + vec2(t * 0.35, t * 0.28)),
        smoothFbm(p + vec2(4.8, 2.3) + vec2(-t * 0.28, t * 0.35))
    );

    // Domain warping layer 2: creates organic bends, loops, and meandering rivers
    vec2 r = vec2(
        smoothFbm(p + 1.85 * q + vec2(1.7, 9.2) + vec2(t * 0.22, -t * 0.24)),
        smoothFbm(p + 1.85 * q + vec2(8.3, 2.8) + vec2(-t * 0.20, t * 0.18))
    );

    // Final warped scalar field
    float field = smoothFbm(p + 2.2 * r);

    // Topographic level waves: generates the alternating fluid ribbons and contour islands
    float wave = field * 5.2;
    float band = sin(wave);

    // Distance metric: positive = inside blue ribbon, negative = inside white channel
    float dist = band;

    // Solid core: solid ink in the deep interior of blue shapes
    float solidInk = smoothstep(0.42, 0.75, dist);

    // Stipple spray probability: sprays fine ink dots across the boundary
    float stippleProb = smoothstep(-0.35, 0.50, dist);

    // Inner contour tracks (topographic elevation lines running parallel to the main shapes)
    float contourRing1 = 1.0 - smoothstep(0.0, 0.14, abs(dist - 0.0));
    float contourRing2 = 1.0 - smoothstep(0.0, 0.12, abs(dist + 0.52));
    float ringInk = contourRing1 * 0.7 + contourRing2 * 0.55;

    // Total ink density before stipple threshold
    float totalInk = max(stippleProb, ringInk);
    totalInk = clamp(totalInk, 0.0, 1.0);

    // Calculate stipple dither at current screen pixel
    vec2 screenPixel = gl_FragCoord.xy;
    float dither = stippleDither(screenPixel);

    // Threshold ink with stipple dither
    float dithered = step(dither, totalInk);

    // Blend: in thick regions it is solid ink, at the edges it is fine risograph stipple spray
    float finalInk = max(dithered, solidInk);

    // Color mixing: primary cobalt ink blended with deep accent in deep pockets
    vec3 ink = mix(u_color_fg, u_color_accent, smoothstep(0.3, 0.85, dist));

    // Subtle paper texture on the background
    float paperGrain = (dither - 0.5) * (u_dark > 0.5 ? 0.025 : 0.02);
    vec3 background = clamp(u_color_bg + paperGrain, 0.0, 1.0);

    // Compose final color
    vec3 color = mix(background, ink, finalInk);

    gl_FragColor = vec4(color, 1.0);
}
`

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const gl =
      canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        powerPreference: 'low-power',
      }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)

    if (!gl) return

    function createShader(
      glCtx: WebGLRenderingContext,
      type: number,
      source: string
    ) {
      const shader = glCtx.createShader(type)
      if (!shader) return null
      glCtx.shaderSource(shader, source)
      glCtx.compileShader(shader)
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error(glCtx.getShaderInfoLog(shader))
        glCtx.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VS_SOURCE)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Fullscreen quad
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const aPosition = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uBg = gl.getUniformLocation(program, 'u_color_bg')
    const uFg = gl.getUniformLocation(program, 'u_color_fg')
    const uAccent = gl.getUniformLocation(program, 'u_color_accent')
    const uDark = gl.getUniformLocation(program, 'u_dark')

    // Palettes calibrated to match the user's reference image in both modes
    function getThemeColors(isDark: boolean) {
      if (isDark) {
        return {
          bg: [18 / 255, 18 / 255, 18 / 255], // #121212 deep slate
          fg: [37 / 255, 99 / 255, 235 / 255], // #2563EB rich cobalt
          accent: [56 / 255, 189 / 255, 248 / 255], // #38BDF8 electric cyan highlight
          dark: 1.0,
        }
      }
      return {
        bg: [245 / 255, 245 / 255, 242 / 255], // #F5F5F2 warm risograph paper
        fg: [0 / 255, 82 / 255, 255 / 255], // #0052FF pure electric ultramarine blue
        accent: [0 / 255, 52 / 255, 204 / 255], // #0034CC deep royal ink
        dark: 0.0,
      }
    }

    let currentIsDark = theme === 'dark'
    let colors = getThemeColors(currentIsDark)

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const targetW = Math.floor(canvas.clientWidth * dpr)
      const targetH = Math.floor(canvas.clientHeight * dpr)

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW
        canvas.height = targetH
        gl!.viewport(0, 0, targetW, targetH)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    let animId: number
    let startTime = performance.now()
    let isVisible = true

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    function render(now: number) {
      if (!isVisible) {
        animId = requestAnimationFrame(render)
        return
      }

      const isDarkNow =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        theme === 'dark'
      if (isDarkNow !== currentIsDark) {
        currentIsDark = isDarkNow
        colors = getThemeColors(currentIsDark)
      }

      const elapsed = prefersReducedMotion ? 8.0 : (now - startTime) * 0.001

      gl!.useProgram(program)
      gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      gl!.uniform1f(uTime, elapsed)
      gl!.uniform3f(uBg, colors.bg[0], colors.bg[1], colors.bg[2])
      gl!.uniform3f(uFg, colors.fg[0], colors.fg[1], colors.fg[2])
      gl!.uniform3f(uAccent, colors.accent[0], colors.accent[1], colors.accent[2])
      gl!.uniform1f(uDark, colors.dark)

      gl!.drawArrays(gl!.TRIANGLES, 0, 6)

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      observer.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(positionBuffer)
    }
  }, [theme])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: 0.96,
        }}
      />
      {/* Editorial Scrim to preserve high contrast for hero typography */}
      <div
        className="hero-scrim"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
      <style>{`
        .hero-scrim {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.94) 0%,
            rgba(255, 255, 255, 0.88) 32%,
            rgba(255, 255, 255, 0.45) 55%,
            rgba(255, 255, 255, 0.05) 78%,
            transparent 100%
          );
        }
        [data-theme="dark"] .hero-scrim {
          background: linear-gradient(
            to right,
            rgba(18, 18, 18, 0.95) 0%,
            rgba(18, 18, 18, 0.90) 32%,
            rgba(18, 18, 18, 0.50) 55%,
            rgba(18, 18, 18, 0.08) 78%,
            transparent 100%
          );
        }
        @media (max-width: 900px) {
          .hero-scrim {
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.92) 0%,
              rgba(255, 255, 255, 0.75) 50%,
              rgba(255, 255, 255, 0.25) 100%
            );
          }
          [data-theme="dark"] .hero-scrim {
            background: linear-gradient(
              to bottom,
              rgba(18, 18, 18, 0.94) 0%,
              rgba(18, 18, 18, 0.82) 50%,
              rgba(18, 18, 18, 0.35) 100%
            );
          }
        }
      `}</style>
    </div>
  )
}
