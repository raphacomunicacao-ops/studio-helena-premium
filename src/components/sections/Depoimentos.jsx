import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Container from '../Container'

const depoimentos = [
  {
    id: 1,
    texto:
      'Helena transformou nosso apartamento em um espaço que nunca imaginamos que poderíamos ter. Cada detalhe foi pensado para nós. O processo foi transparente do início ao fim.',
    nome: 'Mariana e Felipe Costa',
    projeto: 'Apartamento Higienópolis',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  },
  {
    id: 2,
    texto:
      'O que mais me surpreendeu foi a escuta. Helena entendeu o que eu queria antes mesmo de eu conseguir colocar em palavras. O resultado superou todas as minhas expectativas.',
    nome: 'Ricardo Almeida',
    projeto: 'Casa Jardins',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
  },
  {
    id: 3,
    texto:
      'Profissionalismo impecável e um resultado deslumbrante. Nossa cobertura virou referência para todos os amigos. Recomendo sem hesitar para quem busca qualidade de verdade.',
    nome: 'Cláudia Ferreira',
    projeto: 'Cobertura Itaim',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
  },
]

export function Depoimentos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  function go(next) {
    setDirection(next > current ? 1 : -1)
    setCurrent(next)
  }

  function prev() {
    go(current === 0 ? depoimentos.length - 1 : current - 1)
  }

  function next() {
    go(current === depoimentos.length - 1 ? 0 : current + 1)
  }

  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d * -40 }),
  }

  return (
    <section id="depoimentos" className="py-20 md:py-[140px] bg-[#FAFAF8]">
      <Container>
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="block font-mono text-xs tracking-[0.25em] text-stone-400 uppercase mb-4">
              O que dizem nossos clientes
            </span>
            <h2 className="font-serif-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.1] text-stone-900 font-normal">
              Histórias de quem viveu o processo
            </h2>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {/* Quote */}
            <div className="relative min-h-[180px] md:min-h-[160px] mb-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {/* Aspas decorativas */}
                  <span className="font-serif-display text-[6rem] leading-none text-stone-200 select-none absolute -top-6 -left-2">
                    &ldquo;
                  </span>
                  <p className="font-serif-display text-xl md:text-2xl italic text-stone-700 leading-relaxed pt-8 px-4 md:px-0">
                    {depoimentos[current].texto}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Cliente */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current + '-author'}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex items-center gap-5"
              >
                <img
                  src={depoimentos[current].avatar}
                  alt={depoimentos[current].nome}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-stone-200"
                />
                <div>
                  <p className="font-semibold text-stone-800 text-sm">
                    {depoimentos[current].nome}
                  </p>
                  <p className="text-xs text-stone-400 tracking-wide mt-0.5">
                    {depoimentos[current].projeto}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles */}
            <div className="flex items-center justify-between mt-12">
              {/* Indicadores */}
              <div className="flex gap-2">
                {depoimentos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Depoimento ${i + 1}`}
                    className={`h-px transition-all duration-300 ${
                      i === current
                        ? 'w-8 bg-stone-700'
                        : 'w-4 bg-stone-300 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>

              {/* Botoes */}
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  aria-label="Depoimento anterior"
                  className="w-11 h-11 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-stone-600 hover:text-stone-900 transition-colors duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="Próximo depoimento"
                  className="w-11 h-11 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-stone-600 hover:text-stone-900 transition-colors duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
