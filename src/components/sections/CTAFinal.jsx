import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import Container from '../Container'

// Magnetic Button — 21st.dev "Magnetic Button" (similarity 1.674)
const SPRING_CONFIG = { damping: 100, stiffness: 400 }

function MagneticButton({ children, distance = 0.5 }) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING_CONFIG)
  const springY = useSpring(y, SPRING_CONFIG)

  useEffect(() => {
    const calc = (e) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      if (isHovered) {
        x.set((e.clientX - cx) * distance)
        y.set((e.clientY - cy) * distance)
      } else {
        x.set(0); y.set(0)
      }
    }
    document.addEventListener('mousemove', calc)
    return () => document.removeEventListener('mousemove', calc)
  }, [isHovered])

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
})

export function CTAFinal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="cta" className="py-20 md:py-[140px] bg-[#F0EDE8]">
      <Container>
        <div ref={ref} className="max-w-2xl mx-auto text-center">

          {/* Linha decorativa */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-12 h-px bg-stone-400 mx-auto mb-10 origin-left"
          />

          <motion.span
            {...fadeUp(0.1)}
            animate={inView ? fadeUp(0.1).animate : fadeUp(0.1).initial}
            className="block font-mono text-xs tracking-[0.25em] text-stone-400 uppercase mb-6"
          >
            Vamos conversar
          </motion.span>

          <motion.h2
            {...fadeUp(0.2)}
            animate={inView ? fadeUp(0.2).animate : fadeUp(0.2).initial}
            className="font-serif-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-stone-900 font-normal mb-6"
          >
            Seu próximo projeto começa com uma conversa
          </motion.h2>

          <motion.p
            {...fadeUp(0.3)}
            animate={inView ? fadeUp(0.3).animate : fadeUp(0.3).initial}
            className="text-stone-500 text-lg leading-relaxed mb-12 font-light"
          >
            Conte sobre o seu espaço, seus hábitos e o que você sonha para ele. A primeira consulta é gratuita e sem compromisso.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            animate={inView ? fadeUp(0.4).animate : fadeUp(0.4).initial}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <MagneticButton>
              <a
                href="https://wa.me/5511999999999"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-stone-900 text-white text-sm font-semibold tracking-widest uppercase hover:bg-stone-800 transition-colors duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar pelo WhatsApp
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="mailto:contato@studiohelena.com.br"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-stone-400 text-stone-700 text-sm font-semibold tracking-widest uppercase hover:border-stone-700 hover:text-stone-900 transition-colors duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Enviar um email
              </a>
            </MagneticButton>
          </motion.div>

          <motion.p
            {...fadeUp(0.5)}
            animate={inView ? fadeUp(0.5).animate : fadeUp(0.5).initial}
            className="font-mono text-xs tracking-[0.2em] text-stone-400"
          >
            +55 (11) 9 9999-9999 &nbsp;&nbsp;·&nbsp;&nbsp; São Paulo, SP
          </motion.p>
        </div>

        {/* Rodape minimo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 md:mt-28 pt-8 border-t border-stone-300 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-mono tracking-wide"
        >
          <span>Studio Helena Marchetti</span>
          <span>Arquitetura de Interiores Residencial</span>
          <span>São Paulo · 2025</span>
        </motion.div>
      </Container>
    </section>
  )
}
