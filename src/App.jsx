import Container from './components/Container'
import { Hero } from './components/sections/Hero'
import { Filosofia } from './components/sections/Filosofia'
import { Portfolio } from './components/sections/Portfolio'
import { Depoimentos } from './components/sections/Depoimentos'
import { CTAFinal } from './components/sections/CTAFinal'

const placeholders = []

export default function App() {
  return (
    <main>
      <Hero />
      <Filosofia />
      <Portfolio />
      <Depoimentos />
      <CTAFinal />
      {placeholders.map(({ id, label, bg }) => (
        <section
          key={id}
          id={id}
          style={{ backgroundColor: bg }}
          className="py-20 md:py-[140px]"
        >
          <Container>
            <div className="flex items-center justify-center h-24 border-2 border-dashed border-stone-300 rounded">
              <span className="font-mono text-sm text-stone-400">{label}</span>
            </div>
          </Container>
        </section>
      ))}
    </main>
  )
}
