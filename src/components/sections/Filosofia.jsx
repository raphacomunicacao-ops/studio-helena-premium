import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '../Container'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
})

export function Filosofia() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="filosofia" className="py-20 md:py-[140px] bg-[#FAFAF8]">
      <Container>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center"
        >
          {/* Coluna de texto */}
          <div>
            <motion.span
              {...fadeUp(0)}
              animate={inView ? fadeUp(0).animate : fadeUp(0).initial}
              className="block font-mono text-xs tracking-[0.25em] text-stone-400 uppercase mb-6"
            >
              Sobre o Studio
            </motion.span>

            <motion.h2
              {...fadeUp(0.1)}
              animate={inView ? fadeUp(0.1).animate : fadeUp(0.1).initial}
              className="font-serif-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.1] text-stone-900 font-normal mb-8"
            >
              Beleza que nasce da função
            </motion.h2>

            <motion.div
              {...fadeUp(0.2)}
              animate={inView ? fadeUp(0.2).animate : fadeUp(0.2).initial}
              className="flex gap-5 mb-8"
            >
              <div className="w-px bg-stone-300 flex-shrink-0" />
              <p className="font-serif-display text-xl italic text-stone-600 leading-relaxed">
                Todo espaço conta uma história. O nosso trabalho é ouvi-la antes de começar a desenhá-la.
              </p>
            </motion.div>

            <motion.p
              {...fadeUp(0.3)}
              animate={inView ? fadeUp(0.3).animate : fadeUp(0.3).initial}
              className="text-stone-500 leading-[1.85] mb-6 font-light"
            >
              O Studio Helena Marchetti nasceu da convicção de que um projeto de interiores vai muito além da estética. É sobre entender como as pessoas vivem, o que sentem quando entram em um cômodo, e o que precisam para se sentir em casa.
            </motion.p>

            <motion.p
              {...fadeUp(0.4)}
              animate={inView ? fadeUp(0.4).animate : fadeUp(0.4).initial}
              className="text-stone-500 leading-[1.85] mb-12 font-light"
            >
              Cada projeto é desenvolvido com escuta ativa, materiais selecionados à mão e um olhar que equilibra tendência e atemporalidade. O resultado é sempre singular.
            </motion.p>

            <motion.div
              {...fadeUp(0.5)}
              animate={inView ? fadeUp(0.5).animate : fadeUp(0.5).initial}
              className="flex items-center gap-4"
            >
              <div className="w-10 h-px bg-stone-400" />
              <span className="font-serif-display italic text-stone-600 text-lg">
                Helena Marchetti
              </span>
            </motion.div>
          </div>

          {/* Coluna de imagem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80"
                alt="Interior residencial projetado pelo Studio Helena Marchetti"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Detalhe decorativo */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-stone-300 -z-10 hidden md:block" />
          </motion.div>
        </div>

        {/* Numeros */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="grid grid-cols-3 gap-8 mt-20 md:mt-28 pt-12 border-t border-stone-200"
        >
          {[
            { number: '12', label: 'Anos de atuação' },
            { number: '140', label: 'Projetos entregues' },
            { number: '98', label: 'Clientes satisfeitos' },
          ].map(({ number, label }) => (
            <div key={label} className="text-center">
              <div className="font-serif-display text-[clamp(2.5rem,5vw,4rem)] text-stone-800 leading-none mb-2">
                {number}
              </div>
              <div className="text-xs tracking-[0.2em] text-stone-400 uppercase font-light">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
