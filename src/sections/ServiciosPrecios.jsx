import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { supabase } from '../lib/supabaseClient'

// Orden por defecto por nombre en caso de que el campo 'orden' en Supabase no esté configurado
const ORDEN_DESEADO = [
  'perfilado de cejas',
  'microblading',
  'limpieza facial',
  'lifting coreano',
  'laminación de cejas',
  'laminacion de cejas',
  'corrección de cejas para hombres',
  'correccion de cejas para hombres',
]

const FilaTratamiento = ({ nombre, precio, desc }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-baseline justify-between border-b border-[var(--color-abrow-dark)]/15 pb-2">
      <h4 className="font-serif text-lg text-[var(--color-abrow-dark)]">{nombre}</h4>
      <span className="font-serif italic text-xl text-[var(--color-abrow-dark)]">
        {typeof precio === 'number' ? `$${precio.toLocaleString('es-CL')}` : precio}
      </span>
    </div>
    <p className="font-sans text-xs text-[var(--color-abrow-muted)]">{desc}</p>
  </div>
)

export default function ServiciosPrecios() {
  const [tratamientos, setTratamientos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function obtenerServicios() {
      const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .neq('activo', false)
        .order('orden', { ascending: true }) // Intenta ordenar por el campo orden de Supabase

      if (!error && data) {
        // Copiamos la data para aplicar ordenamiento dinámico
        const ordenados = [...data].sort((a, b) => {
          // Si ambos tienen el campo 'orden' definido y son distintos, usamos ese valor
          if (a.orden !== undefined && b.orden !== undefined && a.orden !== b.orden) {
            return a.orden - b.orden
          }
          // Fallback al orden por nombre de la imagen de diseño
          const idxA = ORDEN_DESEADO.indexOf(a.nombre.toLowerCase().trim())
          const idxB = ORDEN_DESEADO.indexOf(b.nombre.toLowerCase().trim())
          const posA = idxA !== -1 ? idxA : 99
          const posB = idxB !== -1 ? idxB : 99
          return posA - posB
        })

        const formateados = ordenados.map((s) => ({
          id: s.id,
          nombre: s.nombre,
          precio: s.precio ? `$${s.precio.toLocaleString('es-CL')}` : '$0',
          desc: s.descripcion || '',
        }))
        setTratamientos(formateados)
      }
      setCargando(false)
    }

    obtenerServicios()
  }, [])

  return (
    <section id="servicios" className="scroll-mt-20 bg-white py-5 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Encabezado */}
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)]">
            Nuestros Especialistas Tienen Todos los Tratamientos que{' '}
            <span className="italic text-[var(--color-abrow-muted)] font-normal">Necesitas</span> para Lucir Radiante.
          </h2>
          <span className="block font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            Luce siempre como una reina
          </span>
        </div>

        {/* Grid de precios dinámico conectado a Supabase */}
        {cargando ? (
          <p className="text-center text-xs text-[var(--color-abrow-muted)] py-8 font-sans">
            Cargando tratamientos...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto">
            {tratamientos.map((t) => (
              <FilaTratamiento key={t.id || t.nombre} {...t} />
            ))}
          </div>
        )}

        {/* 3 tarjetas: Gift Cards / Master Classes / CTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta 1: Gift Cards -> Redirecciona a #gift-cards */}
          <HashLink 
            smooth 
            to="/#gift-cards" 
            className="relative aspect-[3/4] overflow-hidden group block cursor-pointer"
          >
            <img 
              src="/img/giftcardlumiere.webp" 
              alt="Gift Cards" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white py-5 text-center shadow-sm">
              <h4 className="font-serif text-lg text-[var(--color-abrow-dark)]">Gift Cards</h4>
              <span className="font-sans text-[10px] tracking-widest text-[var(--color-abrow-muted)] uppercase block mt-1">
                MÁS INFORMACIÓN
              </span>
            </div>
          </HashLink>

          {/* Tarjeta 2: Otros Servicios / Master Classes -> Redirecciona a #master-classes */}
          <HashLink 
            smooth 
            to="/#master-classes" 
            className="relative aspect-[3/4] overflow-hidden group block cursor-pointer"
          >
            <img 
              src="/img/masinfo.webp" 
              alt="Otros Servicios" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white py-5 text-center shadow-sm">
              <h4 className="font-serif text-lg text-[var(--color-abrow-dark)]">Otros servicios</h4>
              <span className="font-sans text-[10px] tracking-widest text-[var(--color-abrow-muted)] uppercase block mt-1">
                MÁS INFORMACIÓN
              </span>
            </div>
          </HashLink>

          {/* Tarjeta 3: CTA Reserva */}
          <div className="bg-[var(--color-abrow-dark)] text-white aspect-[3/4] flex flex-col items-center justify-center text-center px-8 space-y-4">
            <div className="w-25">
              <img src="/img/cejasblanca.webp" alt="Cejas Perfectas" className="w-full h-full object-contain" />
            </div>
            <h4 className="font-serif text-2xl leading-snug">
              ¡Descubre el Poder de unas <span className="italic">Cejas Perfectas!</span>
            </h4>
            <p className="font-sans text-xs text-white/70">¡Reserve su cita hoy mismo!</p>
            <Link
              to="/agenda"
              className="bg-white text-[var(--color-abrow-dark)] px-6 py-3 font-sans text-[10px] uppercase tracking-widest hover:bg-white/90 transition-all"
            >
              Reserva ahora
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}