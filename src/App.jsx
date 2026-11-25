import { startup, equipo, propuestas } from './data/contenido.js'
import Propuesta from './components/Propuesta.jsx'

const NAV = [
  { href: '#startup', texto: 'La startup' },
  { href: '#sentencias', texto: 'Sentencias' },
  { href: '#propuesta-fuente', texto: 'Propuesta 01' },
  { href: '#propuesta-indicios', texto: 'Propuesta 02' },
  { href: '#equipo', texto: 'Equipo' },
]

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-borde bg-fondo/85 backdrop-blur">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-espectro focus:px-3 focus:py-2 focus:text-fondo">
        Saltar al contenido
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={startup.logo} alt="" className="size-9 rounded-lg" />
          <span className="font-display font-bold">{startup.nombre}</span>
        </a>
        <nav aria-label="Secciones">
          <ul className="flex flex-wrap gap-1 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-3 py-1.5 text-suave transition-colors hover:bg-superficie-2 hover:text-texto">
                  {item.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-espectro/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-espectro">TP3 · DOS SENTENCIAS, DOS SOLUCIONES</p>
        <h1 className="mx-auto mt-5 max-w-5xl font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl">
          Dos flujos agénticos para revisar contenido sin acusar en falso
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-suave">
          Una propuesta del {equipo.grupo} del IFTS 29 para {startup.nombre}: un agente que rastrea la fuente de un material y otro
          que señala indicios visuales con prudencia.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#propuesta-fuente" className="rounded-full bg-espectro px-5 py-2.5 font-semibold text-fondo transition-opacity hover:opacity-90">
            Ver las propuestas
          </a>
          <a href="#startup" className="rounded-full border border-borde px-5 py-2.5 font-semibold transition-colors hover:border-suave">
            Conocer la startup
          </a>
        </div>
      </div>
    </section>
  )
}

function Startup() {
  return (
    <section id="startup" aria-labelledby="titulo-startup" className="border-t border-borde py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[minmax(0,22rem)_1fr]">
        <figure className="mx-auto w-full max-w-sm">
          <img
            src={startup.logo}
            alt={`Logo original de ${startup.nombre}: una figura espectral blanca con dos engranajes sobre fondo negro`}
            className="aspect-square w-full rounded-3xl border border-borde object-contain"
          />
          <figcaption className="mt-3 text-center text-sm text-suave">Logo original de la startup</figcaption>
        </figure>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-espectro">LA STARTUP Y SU NECESIDAD</p>
          <h2 id="titulo-startup" className="mt-3 font-display text-5xl font-bold tracking-tight">{startup.nombre}</h2>
          <p className="mt-2 text-xl text-suave">{startup.rubro}</p>
          <dl className="mt-8 space-y-5">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-suave">Servicio</dt>
              <dd className="mt-1 text-lg">{startup.objetivo}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-suave">El problema</dt>
              <dd className="mt-1 text-lg leading-relaxed">{startup.necesidad}</dd>
            </div>
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2 text-sm">
            <li className="rounded-full border border-borde px-3 py-1">Asignación <strong>{startup.codigo}</strong></li>
            <li className="rounded-full border border-borde px-3 py-1">Bloque: <strong>{startup.bloque}</strong></li>
            <li className="rounded-full border border-borde px-3 py-1">Propuesta del <strong>{equipo.grupo}</strong></li>
          </ul>
          <p className="mt-6 rounded-xl bg-superficie p-4 text-sm text-suave">
            <strong className="text-texto">Origen:</strong> {startup.origen} Nosotros, desde Frontend en el IFTS 29, proponemos cómo
            resolver dos de esas reglas.
          </p>
        </div>
      </div>
    </section>
  )
}

function Sentencias() {
  return (
    <section id="sentencias" aria-labelledby="titulo-sentencias" className="border-t border-borde py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-espectro">BLOQUE «{startup.bloque.toUpperCase()}»</p>
        <h2 id="titulo-sentencias" className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">Dos sentencias, desarmadas</h2>
        <p className="mt-3 max-w-2xl text-lg text-suave">
          Antes de proponer, separamos cada regla en sus partes: qué datos necesita, cuál es la condición y qué consecuencia establece.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {propuestas.map((p) => (
            <article key={p.id} className="flex flex-col rounded-3xl border border-borde bg-superficie p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-espectro">Sentencia {p.regla}</p>
              <blockquote className="mt-3 font-display text-lg leading-relaxed">«{p.sentencia}»</blockquote>
              <ol className="mt-6 space-y-3 text-[15px]">
                <li className="rounded-xl bg-superficie-2 p-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-suave">1 · Datos necesarios</span>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {p.ficha.datos.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </li>
                <li aria-hidden="true" className="text-center text-suave">↓</li>
                <li className="rounded-xl bg-superficie-2 p-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-suave">2 · Condición</span>
                  <p className="mt-2">{p.ficha.condicion}</p>
                </li>
                <li aria-hidden="true" className="text-center text-suave">↓</li>
                <li className="rounded-xl bg-superficie-2 p-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-suave">3 · Consecuencia</span>
                  <p className="mt-2">{p.ficha.consecuencia}</p>
                </li>
              </ol>
              <p className="mt-4 text-sm text-suave">
                <strong className="text-texto">Ojo con los conectores:</strong> {p.ficha.conectores}
              </p>
              <a href={`#propuesta-${p.id}`} className="mt-auto pt-6 font-semibold text-espectro hover:underline">
                Ver la propuesta «{p.titulo}» →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Equipo() {
  return (
    <section id="equipo" aria-labelledby="titulo-equipo" className="border-t border-borde py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-espectro">QUIÉN PROPONE</p>
          <h2 id="titulo-equipo" className="mt-3 font-display text-4xl font-bold tracking-tight">{equipo.grupo}</h2>
          <p className="mt-2 text-suave">{equipo.instituto}</p>
          <ul className="mt-6 space-y-2">
            {equipo.integrantes.map((nombre) => (
              <li key={nombre} className="rounded-xl border border-borde bg-superficie px-4 py-3">
                <span className="font-semibold">{nombre}</span>
                <span className="block text-sm text-suave">{equipo.modalidad}: análisis de las sentencias, propuestas, dirección del agente y revisión</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-borde bg-superficie p-6">
          <h3 className="font-display text-xl font-bold">Cómo se construyó</h3>
          <p className="mt-3 leading-relaxed text-texto/90">
            La landing se hizo de forma 100% agéntica: el código lo generó y lo modificó un agente de programación a partir de instrucciones
            y revisiones, sin editarlo a mano. Las decisiones sobre las sentencias y los flujos fueron del grupo.
          </p>
          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-suave">Aplicación</dt>
            <dd>Claude (app de escritorio)</dd>
            <dt className="text-suave">Modelo</dt>
            <dd>Claude Opus 5.5</dd>
          </dl>
          <p className="mt-4 text-sm text-suave">
            Los flujos son una propuesta: esta página no ejecuta agentes ni se conecta a servicios reales.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Startup />
        <Sentencias />
        {propuestas.map((p) => (
          <Propuesta key={p.id} propuesta={p} />
        ))}
        <Equipo />
      </main>
      <footer className="border-t border-borde py-8 text-center text-sm text-suave">
        {equipo.grupo} · IFTS 29 · Frontend 2026 · Propuesta para {startup.nombre} (IFTS 16)
      </footer>
    </>
  )
}
