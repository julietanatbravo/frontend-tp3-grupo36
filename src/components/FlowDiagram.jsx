import { Fragment } from 'react'

// Diagrama de flujo armado con HTML y CSS a partir de los datos de cada propuesta.
// La prop `activo` ('si' | 'no' | null) resalta el camino de un caso de prueba.

const TIPOS = {
  dato: { etiqueta: 'Dato de entrada', icono: '◇' },
  herramienta: { etiqueta: 'Herramienta', icono: '⚙' },
  accion: { etiqueta: 'Acción', icono: '▸' },
  control: { etiqueta: 'Control', icono: '✓' },
  humano: { etiqueta: 'Persona', icono: '☺' },
  fin: { etiqueta: 'Resultado', icono: '■' },
  inicio: { etiqueta: 'Inicio', icono: '●' },
}

function Origen({ origen }) {
  if (!origen) return null
  const esSentencia = origen === 'sentencia'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
        esSentencia ? 'bg-espectro/10 text-espectro' : 'bg-grupo/10 text-grupo'
      }`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${esSentencia ? 'bg-espectro' : 'bg-grupo'}`} />
      {esSentencia ? 'Sentencia' : 'Decisión del grupo'}
    </span>
  )
}

function Nodo({ nodo, tipo = nodo.tipo, apagado }) {
  const info = TIPOS[tipo]
  const esExtremo = tipo === 'inicio' || tipo === 'fin'
  const esHumano = tipo === 'humano'
  const borde =
    nodo.origen === 'grupo'
      ? 'border-dashed border-grupo/60'
      : nodo.origen === 'sentencia'
        ? 'border-solid border-espectro/50'
        : 'border-solid border-borde'

  return (
    <li
      className={`relative w-full rounded-2xl border-2 ${borde} ${
        esHumano ? 'bg-humano/10' : esExtremo ? 'bg-superficie-2' : 'bg-superficie'
      } px-4 py-3 transition-opacity duration-300 ${apagado ? 'opacity-25' : 'opacity-100'}`}
    >
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
        <span className={`text-xs font-semibold ${esHumano ? 'text-humano' : 'text-suave'}`}>
          <span aria-hidden="true" className="mr-1">{info.icono}</span>
          {info.etiqueta}
        </span>
        <Origen origen={nodo.origen} />
      </div>
      <p className={`text-[15px] leading-snug ${esExtremo ? 'font-semibold' : ''}`}>{nodo.texto}</p>
    </li>
  )
}

function Flecha({ apagado, color = 'bg-borde' }) {
  return (
    <li aria-hidden="true" className={`flex flex-col items-center transition-opacity duration-300 ${apagado ? 'opacity-25' : ''}`}>
      <span className={`h-6 w-0.5 ${color}`} />
      <span className={`-mt-1 text-sm leading-none ${color === 'bg-borde' ? 'text-borde' : color.replace('bg-', 'text-')}`}>▼</span>
    </li>
  )
}

function Rama({ nodos, rama, activo }) {
  const esSi = rama === 'si'
  const apagado = activo !== null && activo !== rama
  const resaltado = activo === rama
  return (
    <div
      className={`flex flex-col rounded-3xl border p-3 transition-colors duration-300 ${
        resaltado ? (esSi ? 'border-si/60 bg-si/5' : 'border-no/60 bg-no/5') : 'border-transparent'
      }`}
    >
      <p
        className={`mb-2 self-center rounded-full px-4 py-1 font-mono text-sm tracking-wider transition-opacity duration-300 ${
          esSi ? 'bg-si/15 text-si' : 'bg-no/15 text-no'
        } ${apagado ? 'opacity-25' : ''}`}
      >
        {esSi ? 'SÍ' : 'NO'}
      </p>
      <ol className="flex flex-col items-stretch" aria-label={esSi ? 'Camino si se cumple la condición' : 'Camino si no se cumple la condición'}>
        {nodos.map((nodo, i) => (
          <Fragment key={i}>
            {i > 0 && <Flecha apagado={apagado} color={esSi ? 'bg-si/60' : 'bg-no/60'} />}
            <Nodo nodo={nodo} apagado={apagado} />
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

export default function FlowDiagram({ flujo, activo = null, titulo }) {
  return (
    <figure className="rounded-3xl border border-borde bg-fondo/60 p-5 md:p-8">
      <figcaption className="sr-only">{titulo}</figcaption>

      <ol className="mx-auto flex max-w-xl flex-col items-stretch">
        <Nodo nodo={flujo.inicio} tipo="inicio" />
        {flujo.pasos.map((paso, i) => (
          <Fragment key={i}>
            <Flecha />
            <Nodo nodo={paso} />
          </Fragment>
        ))}
        <Flecha />
        <li className="relative w-full rounded-2xl border-2 border-espectro bg-espectro/10 px-4 py-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span aria-hidden="true" className="inline-block size-3 rotate-45 border-2 border-espectro" />
            <span className="text-xs font-semibold uppercase tracking-wider text-espectro">Decisión</span>
          </div>
          <p className="font-display text-lg font-bold">{flujo.decision.texto}</p>
          <div className="mt-2 flex justify-center">
            <Origen origen={flujo.decision.origen} />
          </div>
        </li>
      </ol>

      {/* Bifurcación: las líneas caen sobre el centro de cada columna */}
      <div aria-hidden="true" className="hidden h-10 md:block">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M50 0 V14 H25 V40"
            fill="none"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className={`transition-opacity duration-300 ${activo === 'no' ? 'opacity-25' : ''}`}
            stroke="var(--color-si)"
          />
          <path
            d="M50 0 V14 H75 V40"
            fill="none"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className={`transition-opacity duration-300 ${activo === 'si' ? 'opacity-25' : ''}`}
            stroke="var(--color-no)"
          />
        </svg>
      </div>

      <div className="mt-4 grid gap-4 md:mt-0 md:grid-cols-2 md:gap-0">
        <Rama nodos={flujo.si} rama="si" activo={activo} />
        <Rama nodos={flujo.no} rama="no" activo={activo} />
      </div>
    </figure>
  )
}

export function Leyenda() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-suave" aria-label="Cómo leer el diagrama">
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="inline-block h-4 w-6 rounded border-2 border-espectro/50" />
        Lo establece la sentencia
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="inline-block h-4 w-6 rounded border-2 border-dashed border-grupo/60" />
        Decisión del grupo (la regla no lo define)
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="inline-block h-4 w-6 rounded bg-humano/30" />
        Interviene una persona
      </li>
    </ul>
  )
}
