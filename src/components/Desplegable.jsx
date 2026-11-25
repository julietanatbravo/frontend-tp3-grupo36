// Usa <details> y <summary>: se abren con clic y con teclado (Enter o Espacio) sin JavaScript extra.
export default function Desplegable({ titulo, destacado = false, children }) {
  return (
    <details
      className={`group rounded-2xl border bg-superficie transition-colors open:bg-superficie-2 ${
        destacado ? 'border-humano/40' : 'border-borde'
      }`}
    >
      <summary className="flex cursor-pointer items-center gap-3 rounded-2xl px-5 py-4 text-lg font-semibold hover:text-espectro">
        <span aria-hidden="true" className="chevron text-espectro transition-transform duration-200">
          ▸
        </span>
        {titulo}
        {destacado && (
          <span className="ml-auto rounded-full bg-humano/15 px-2.5 py-0.5 text-xs font-semibold text-humano">Excepción</span>
        )}
      </summary>
      <div className="space-y-3 px-5 pb-5 pl-12 leading-relaxed text-texto/90">{children}</div>
    </details>
  )
}
