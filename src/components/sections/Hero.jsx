import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Container from '../Container'

const SPEED = 35

function createPixel(ctx, canvas, x, y, gap, baseSpeed, delay) {
  const rand = (min, max) => Math.random() * (max - min) + min

  const p = {
    x, y, ctx,
    speed: rand(0.08, 0.4) * baseSpeed,
    size: 0,
    sizeStep: rand(0.18, 0.36),
    minSize: 0.5,
    maxSize: rand(gap * 0.4, gap * 0.9),
    delay,
    counter: 0,
    counterStep: rand(1.8, 3.2) + (canvas.width + canvas.height) * 0.008,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = gap * 0.5 - p.size * 0.5
      ctx.clearRect(p.x + offset, p.y + offset, p.size, p.size)
    },
    appear() {
      if (p.counter <= p.delay) { p.counter += p.counterStep; return }
      if (p.size >= p.maxSize) p.isShimmer = true
      if (p.isShimmer) p.shimmer()
      else p.size += p.sizeStep
      p.draw()
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true
      else if (p.size <= p.minSize) p.isReverse = false
      p.size += p.isReverse ? -p.speed : p.speed
    },
  }
  return p
}

function PixelRevealCanvas() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const pixelsRef = useRef([])
  const rafRef = useRef(0)
  const lastFrameRef = useRef(performance.now())

  const init = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mobile = window.innerWidth < 768
    const gap = mobile ? 14 : 8
    // Limitar resolução a 1x no mobile para não sobrecarregar o canvas
    const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2)

    const { width, height } = wrap.getBoundingClientRect()
    const w = Math.floor(width)
    const h = Math.floor(height)
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delayMult = mobile ? 0.1 : 0.18
    const spd = reduced ? 0 : Math.min(SPEED, 100) * 0.001
    const pixels = []

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const dx = x - w / 2
        const dy = y - h / 2
        const delay = reduced ? 0 : Math.sqrt(dx * dx + dy * dy) * delayMult
        pixels.push(createPixel(ctx, canvas, x, y, gap, spd, delay))
      }
    }
    pixelsRef.current = pixels
  }, [])

  const startLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    const frameMs = 1000 / 60

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)
      const now = performance.now()
      const elapsed = now - lastFrameRef.current
      if (elapsed < frameMs) return
      lastFrameRef.current = now - (elapsed % frameMs)

      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return

      const mobile = window.innerWidth < 768
      const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      ctx.fillStyle = 'rgba(10, 10, 10, 0.97)'
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      for (const p of pixelsRef.current) p.appear()
    }

    rafRef.current = requestAnimationFrame(loop)
  }, [])

  useEffect(() => {
    init()
    startLoop()

    // Remove o div de prevenção de flash após o canvas pintar o primeiro frame
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const flash = document.getElementById('hero-flash')
      if (flash) {
        flash.style.transition = 'opacity 0.12s ease'
        flash.style.opacity = '0'
        setTimeout(() => flash.remove(), 150)
      }
    }))

    const resizeObserver = new ResizeObserver(() => init())
    if (wrapRef.current) resizeObserver.observe(wrapRef.current)

    const fadeTimer = setTimeout(() => {
      const wrap = wrapRef.current
      if (!wrap) return
      wrap.style.transition = 'opacity 0.6s ease'
      wrap.style.opacity = '0'
      setTimeout(() => {
        cancelAnimationFrame(rafRef.current)
        wrap.remove()
      }, 650)
    }, 1600)

    return () => {
      clearTimeout(fadeTimer)
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
    }
  }, [init, startLoop])

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 20 }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
})

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=80)' }}
      />
      <div className="absolute inset-0 bg-black/55" />
      {/* Previne flash da imagem antes do canvas inicializar */}
      <div id="hero-flash" className="absolute inset-0" style={{ backgroundColor: 'rgb(10,10,10)', zIndex: 19 }} />

      <PixelRevealCanvas />

      <Container className="relative py-20 md:py-[140px]" style={{ zIndex: 10 }}>
        <motion.span
          {...fadeUp(0.9)}
          className="block font-mono text-xs tracking-[0.25em] text-stone-300 uppercase mb-6"
        >
          Arquitetura de Interiores
        </motion.span>

        <h1 className="font-serif-display text-[clamp(3rem,7vw,6rem)] leading-[1.05] font-normal max-w-3xl mb-8">
          <span className="shimmer-headline">
            Espaços que revelam quem você é
          </span>
        </h1>

        <motion.p
          {...fadeUp(1.1)}
          className="text-stone-300 text-lg leading-relaxed max-w-lg mb-12 font-light"
        >
          Projetos residenciais autorais em São Paulo. Do conceito à entrega final, cada detalhe pensado para durar.
        </motion.p>

        <motion.div {...fadeUp(1.3)} className="flex flex-col sm:flex-row gap-4">
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-stone-900 text-sm font-semibold tracking-widest uppercase hover:bg-stone-100 transition-colors duration-300"
          >
            Ver Projetos
          </a>
          <a
            href="#filosofia"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/50 text-white text-sm font-semibold tracking-widest uppercase hover:border-white transition-colors duration-300"
          >
            Sobre o Studio
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
