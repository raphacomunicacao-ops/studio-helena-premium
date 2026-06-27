import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Container from '../Container'

const projects = [
  {
    id: 1,
    title: 'Apartamento Higienópolis',
    category: 'Residencial',
    area: '280 m2',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Casa Jardins',
    category: 'Residencial',
    area: '420 m2',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&q=80',
  },
  {
    id: 3,
    title: 'Cobertura Itaim',
    category: 'Residencial',
    area: '195 m2',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=700&q=80',
  },
  {
    id: 4,
    title: 'Vila Madalena Loft',
    category: 'Residencial',
    area: '110 m2',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80',
  },
  {
    id: 5,
    title: 'Penthouse Brooklin',
    category: 'Residencial',
    area: '340 m2',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=700&q=80',
  },
]

// Tilt 3D — 21st.dev "Interactive Card" (useMotionValue + useSpring + useTransform)
function ProjectCard({ project, className = '', delay = 0, inView }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleMouseLeave() { x.set(0); y.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden bg-stone-200 ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-400" />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <span className="block font-mono text-[10px] tracking-[0.25em] text-stone-300 uppercase mb-2">
          {project.category} &nbsp;·&nbsp; {project.area}
        </span>
        <h3 className="font-serif-display text-2xl md:text-3xl text-white font-normal leading-tight">
          {project.title}
        </h3>
        <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-xs font-semibold tracking-widest text-white uppercase">
            Ver projeto
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [featured, ...rest] = projects

  return (
    <section id="portfolio" className="py-20 md:py-[140px] bg-[#F0EDE8]">
      <Container>
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="block font-mono text-xs tracking-[0.25em] text-stone-400 uppercase mb-4"
            >
              Projetos Selecionados
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-serif-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.1] text-stone-900 font-normal"
            >
              Um recorte do nosso trabalho
            </motion.h2>
          </div>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-2 text-sm font-semibold tracking-widest text-stone-600 uppercase hover:text-stone-900 transition-colors duration-200 whitespace-nowrap"
          >
            Ver todos
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>

        {/* Grid desktop: 3 colunas, card featured ocupa 2 linhas */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {/* Featured — col 1, row 1 e 2 */}
          <ProjectCard
            project={featured}
            className="row-span-2 min-h-[680px]"
            delay={0.1}
            inView={inView}
          />
          {/* Os 4 restantes em 2x2 */}
          {rest.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              className="h-[320px]"
              delay={0.15 + i * 0.1}
              inView={inView}
            />
          ))}
        </div>

        {/* Grid mobile: 1 coluna */}
        <div className="flex flex-col gap-6 md:hidden">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              className="h-[280px]"
              delay={0.05 + i * 0.08}
              inView={inView}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
