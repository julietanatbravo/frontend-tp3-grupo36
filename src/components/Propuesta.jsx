import { useState } from 'react'
import FlowDiagram, { Leyenda } from './FlowDiagram.jsx'
import Desplegable from './Desplegable.jsx'

export default function Propuesta({ propuesta }) {
  const [activo, setActivo] = useState(null)
  const casoActivo = propuesta.casos.find((c) => c.rama === activo)

  return (
    <section id={`propuesta-${propuesta.id}`} aria-labelledby={`titulo-${propuesta.id}`} className="border-t border-borde py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-espectro">
          PROPUESTA {propuesta.numero} · SENTENCIA {propuesta.regla}
        </p>
        <h2 id={`titulo-${propuesta.id}`} className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {propuesta.titulo}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-suave">{propuesta.bajada}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <blockquote className="rounded-2xl border border-espectro/30 bg-espectro/5 p-6 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-espectro">Sentencia original · {propuesta.regla}</p>
            <p className="mt-3 font-display text-xl leading-relaxed">«{propuesta.sentencia}»</p>
          </blockquote>
          <div className="rounded-2xl border border-borde bg-superficie p-6 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-suave">Beneficio</p>
            <p className="mt-3 leading-relaxed">{propuesta.beneficio}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-bold tracking-tight">El recorrido</h3>
          <Leyenda />
        </div>

        <div className="mt-5 rounded-2xl border border-borde bg-superficie p-4">
          <p id={`recorrer-${propuesta.id}`} className="text-sm text-suave">
            Probá el flujo con un ejemplo: el diagrama resalta el camino que sigue cada caso.
          </p>
          <div role="group" aria-labelledby={`recorrer-${propuesta.id}`} className="mt-3 flex flex-wrap gap-2">
            {propuesta.casos.map((caso) => (
              <button
                key={caso.rama}
                type="button"
                aria-pressed={activo === caso.rama}
                onClick={() => setActivo(activo === caso.rama ? null : caso.rama)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  activo === caso.rama
                    ? caso.rama === 'si'
                      ? 'border-si bg-si text-fondo'
                      : 'border-no bg-no text-fondo'
                    : 'border-borde bg-superficie-2 hover:border-suave'
                }`}
              >
                Caso: {caso.titulo.toLowerCase()}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setActivo(null)}
              disabled={activo === null}
              className="cursor-pointer rounded-full border border-borde px-4 py-2 text-sm text-suave transition-colors hover:border-suave disabled:cursor-default disabled:opacity-40"
            >
              Ver el flujo completo
            </button>
          </div>
          <div aria-live="polite">
            {casoActivo && (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <p className="rounded-xl bg-superficie-2 p-4 text-[15px] leading-relaxed">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-suave">Ejemplo</span>
                  {casoActivo.texto}
                </p>
                <p
                  className={`rounded-xl p-4 text-[15px] leading-relaxed ${
                    casoActivo.rama === 'si' ? 'bg-si/10' : 'bg-no/10'
                  }`}
                >
                  <span className={`mb-1 block text-xs font-semibold uppercase tracking-wider ${casoActivo.rama === 'si' ? 'text-si' : 'text-no'}`}>
                    Resultado · camino {casoActivo.rama === 'si' ? 'SÍ' : 'NO'}
                  </span>
                  {casoActivo.resultado}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <FlowDiagram flujo={propuesta.flujo} activo={activo} titulo={`Diagrama de flujo de la propuesta ${propuesta.titulo}`} />
        </div>

        <h3 className="mt-14 font-display text-2xl font-bold tracking-tight">Los detalles</h3>
        <p className="mt-2 text-suave">Abrí cada punto con un clic, o con Tab y Enter.</p>
        <div className="mt-5 grid gap-3">
          {propuesta.detalles.map((detalle) => (
            <Desplegable key={detalle.titulo} titulo={detalle.titulo} destacado={detalle.titulo === 'Caso límite'}>
              {detalle.texto.map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </Desplegable>
          ))}
        </div>
      </div>
    </section>
  )
}
