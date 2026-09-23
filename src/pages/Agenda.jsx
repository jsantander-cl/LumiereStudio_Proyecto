import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../lib/supabaseClient'
import { obtenerHorariosDisponibles, crearReserva } from '../lib/agendaUtils'

const PASOS = { SERVICIO: 0, FECHA_HORA: 1, DATOS: 2, CONFIRMADO: 3 }
const NOMBRES_PASO = ['Servicio', 'Fecha y hora', 'Tus datos', 'Listo']

const DIAS_SEMANA = ['D', 'L', 'M', 'X', 'J', 'V', 'S']
const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

// Ícono simple por tipo de servicio, basado en palabras clave del nombre.
function iconoServicio(nombre = '') {
  const n = nombre.toLowerCase()
  if (n.includes('cejas') && n.includes('microblading')) return ''
  if (n.includes('microblading')) return ''
  if (n.includes('lifting')) return ''
  if (n.includes('limpieza')) return ''
  if (n.includes('laminaci')) return ''
  if (n.includes('cejas')) return ''
  return ''
}

function formatearFechaLarga(fechaStr) {
  if (!fechaStr) return ''
  const [y, m, d] = fechaStr.split('-').map(Number)
  const fecha = new Date(y, m - 1, d)
  const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  return `${dias[fecha.getDay()]} ${d} de ${MESES[m - 1]}`
}

function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Mini-calendario propio: navegación de mes, días pasados atenuados. */
function Calendario({ fechaSeleccionada, onSeleccionar, minFecha, maxFecha }) {
  const inicial = fechaSeleccionada
    ? new Date(fechaSeleccionada + 'T00:00:00')
    : new Date(minFecha + 'T00:00:00')
  const [mesVisible, setMesVisible] = useState(new Date(inicial.getFullYear(), inicial.getMonth(), 1))

  const min = new Date(minFecha + 'T00:00:00')
  const max = new Date(maxFecha + 'T00:00:00')

  const dias = useMemo(() => {
    const primerDiaMes = new Date(mesVisible.getFullYear(), mesVisible.getMonth(), 1)
    const offset = primerDiaMes.getDay()
    const diasEnMes = new Date(mesVisible.getFullYear(), mesVisible.getMonth() + 1, 0).getDate()

    const celdas = []
    for (let i = 0; i < offset; i++) celdas.push(null)
    for (let d = 1; d <= diasEnMes; d++) {
      celdas.push(new Date(mesVisible.getFullYear(), mesVisible.getMonth(), d))
    }
    return celdas
  }, [mesVisible])

  const puedeRetroceder =
    new Date(mesVisible.getFullYear(), mesVisible.getMonth(), 1) >
    new Date(min.getFullYear(), min.getMonth(), 1)
  const puedeAvanzar =
    new Date(mesVisible.getFullYear(), mesVisible.getMonth(), 1) <
    new Date(max.getFullYear(), max.getMonth(), 1)

  return (
    <div className="border border-[var(--color-abrow-dark)]/12 rounded-2xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => puedeRetroceder && setMesVisible(new Date(mesVisible.getFullYear(), mesVisible.getMonth() - 1, 1))}
          disabled={!puedeRetroceder}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-abrow-dark)] hover:bg-[var(--color-abrow-nude)] disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <span className="font-serif text-lg text-[var(--color-abrow-dark)]">
          {MESES[mesVisible.getMonth()]} {mesVisible.getFullYear()}
        </span>
        <button
          type="button"
          onClick={() => puedeAvanzar && setMesVisible(new Date(mesVisible.getFullYear(), mesVisible.getMonth() + 1, 1))}
          disabled={!puedeAvanzar}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-abrow-dark)] hover:bg-[var(--color-abrow-nude)] disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1 text-center text-xs text-[var(--color-abrow-muted)] font-medium">
        {DIAS_SEMANA.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dias.map((dia, i) => {
          if (!dia) return <span key={i} />
          const iso = toISO(dia)
          const fueraDeRango = dia < min || dia > max
          const seleccionado = iso === fechaSeleccionada

          return (
            <button
              type="button"
              key={i}
              disabled={fueraDeRango}
              onClick={() => onSeleccionar(iso)}
              className={`aspect-square rounded-lg text-sm transition-colors ${
                seleccionado
                  ? 'bg-[var(--color-abrow-dark)] text-white font-semibold'
                  : fueraDeRango
                  ? 'text-[var(--color-abrow-muted)]/30 cursor-not-allowed'
                  : 'text-[var(--color-abrow-dark)] hover:bg-[var(--color-abrow-nude)]'
              }`}
            >
              {dia.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Agenda() {
  const [paso, setPaso] = useState(PASOS.SERVICIO)
  const [servicios, setServicios] = useState([])
  const [cargandoServicios, setCargandoServicios] = useState(true)
  const [errorServicios, setErrorServicios] = useState('')
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null)
  const [fecha, setFecha] = useState('')
  const [horarios, setHorarios] = useState([])
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null)
  const [cargandoHorarios, setCargandoHorarios] = useState(false)
  const [datosCliente, setDatosCliente] = useState({ nombre: '', email: '', telefono: '', notas: '' })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [reservaConfirmada, setReservaConfirmada] = useState(null)

  useEffect(() => {
    supabase
      .from('servicios')
      .select('*')
      .eq('activo', true)
      .then(({ data, error }) => {
        if (error) {
          setErrorServicios('No pudimos cargar los servicios. Intenta recargar la página.')
          return
        }
        setServicios(data || [])
      })
      .finally(() => setCargandoServicios(false))
  }, [])

  useEffect(() => {
    if (!fecha || !servicioSeleccionado) return
    setCargandoHorarios(true)
    setError('')
    setHorarioSeleccionado(null)
    obtenerHorariosDisponibles(fecha, servicioSeleccionado.duracion_minutos)
      .then(setHorarios)
      .catch(() => setError('No pudimos cargar los horarios. Intenta de nuevo.'))
      .finally(() => setCargandoHorarios(false))
  }, [fecha, servicioSeleccionado])

  const elegirServicio = (servicio) => {
    setServicioSeleccionado(servicio)
    setPaso(PASOS.FECHA_HORA)
  }

  const elegirHorario = (h) => {
    setHorarioSeleccionado(h)
    setPaso(PASOS.DATOS)
  }

  const confirmarReserva = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setError('')
    try {
      const reserva = await crearReserva({
        servicio_id: servicioSeleccionado.id,
        servicio_nombre: servicioSeleccionado.nombre,
        cliente_nombre: datosCliente.nombre,
        cliente_email: datosCliente.email,
        cliente_telefono: datosCliente.telefono,
        fecha,
        hora_inicio: horarioSeleccionado.hora_inicio,
        hora_fin: horarioSeleccionado.hora_fin,
        notas: datosCliente.notas,
      })
      setReservaConfirmada(reserva)
      setPaso(PASOS.CONFIRMADO)
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  const hoy = new Date().toISOString().split('T')[0]
  const maxFecha = new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0]

  const horariosManana = horarios.filter((h) => h.hora_inicio < '13:00')
  const horariosTarde = horarios.filter((h) => h.hora_inicio >= '13:00')

  return (
    <section id="agenda" className="py-16 md:py-20 px-6 max-w-2xl mx-auto min-h-[75vh]">
      <div className="text-center mb-10">
        <span className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--color-abrow-muted)] mb-3">
          Lumiere Studio
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)] mb-2">
          Reserva tu hora
        </h1>
        <p className="text-[var(--color-abrow-muted)] text-sm">
          Lunes a viernes, 08:00 a 19:00
        </p>
      </div>

      {/* Stepper conectado */}
      <div className="flex items-center justify-center mb-12 px-2">
        {NOMBRES_PASO.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  paso > i
                    ? 'bg-[var(--color-abrow-dark)] text-white'
                    : paso === i
                    ? 'bg-[var(--color-abrow-dark)] text-white ring-4 ring-[var(--color-abrow-dark)]/15'
                    : 'bg-[var(--color-abrow-nude)] text-[var(--color-abrow-muted)]'
                }`}
              >
                {paso > i ? '✓' : i + 1}
              </div>
              <span
                className={`text-[10px] uppercase tracking-wide text-center whitespace-nowrap ${
                  paso >= i ? 'text-[var(--color-abrow-dark)]' : 'text-[var(--color-abrow-muted)]'
                }`}
              >
                {label}
              </span>
            </div>
            {i < NOMBRES_PASO.length - 1 && (
              <div
                className={`h-px flex-1 mx-2 mb-4 transition-colors ${
                  paso > i ? 'bg-[var(--color-abrow-dark)]' : 'bg-[var(--color-abrow-dark)]/12'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* PASO 1 — SERVICIO */}
      {paso === PASOS.SERVICIO && (
        <div>
          {cargandoServicios && (
            <p className="text-center text-[var(--color-abrow-muted)]">Cargando servicios...</p>
          )}
          {errorServicios && <p className="text-center text-red-600 text-sm">{errorServicios}</p>}
          {!cargandoServicios && !errorServicios && (
            <div className="grid sm:grid-cols-2 gap-3">
              {servicios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => elegirServicio(s)}
                  className="group text-center border border-[var(--color-abrow-dark)]/12 rounded-2xl p-6 hover:border-[var(--color-abrow-dark)] hover:shadow-sm transition-all bg-white flex flex-col items-center"
                >
                  <span className="text-3xl mb-3">{iconoServicio(s.nombre)}</span>
                  <div className="font-medium text-[var(--color-abrow-dark)] group-hover:underline underline-offset-4">
                    {s.nombre}
                  </div>
                  {s.descripcion && (
                    <p className="text-xs text-[var(--color-abrow-muted)] mt-1.5 line-clamp-2">
                      {s.descripcion}
                    </p>
                  )}
                  <span className="text-[11px] uppercase tracking-wide text-[var(--color-abrow-muted)] border border-[var(--color-abrow-dark)]/15 rounded-full px-2 py-0.5 mt-4">
                    {s.duracion_minutos} min
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PASO 2 — FECHA Y HORA */}
      {paso === PASOS.FECHA_HORA && (
        <div>
          <button
            onClick={() => setPaso(PASOS.SERVICIO)}
            className="text-sm text-[var(--color-abrow-muted)] mb-4 hover:text-[var(--color-abrow-dark)] transition-colors"
          >
            ← Cambiar servicio
          </button>

          <div className="flex items-center gap-2 mb-6 bg-[var(--color-abrow-nude)] rounded-xl px-4 py-3">
            <span className="text-xl">{iconoServicio(servicioSeleccionado.nombre)}</span>
            <div>
              <p className="font-medium text-[var(--color-abrow-dark)] text-sm">
                {servicioSeleccionado.nombre}
              </p>
              <p className="text-xs text-[var(--color-abrow-muted)]">
                {servicioSeleccionado.duracion_minutos} minutos
              </p>
            </div>
          </div>

          <Calendario
            fechaSeleccionada={fecha}
            onSeleccionar={setFecha}
            minFecha={hoy}
            maxFecha={maxFecha}
          />

          {/* Modal de horarios, se abre al elegir un día */}
          {fecha && (
            <div
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[var(--color-abrow-dark)]/30 backdrop-blur-[2px]"
              onClick={() => setFecha('')}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto shadow-xl"
              >
                <div className="flex items-center justify-between mb-5">
                  <p className="text-base font-medium text-[var(--color-abrow-dark)] capitalize">
                    {formatearFechaLarga(fecha)}
                  </p>
                  <button
                    onClick={() => setFecha('')}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-abrow-muted)] hover:bg-[var(--color-abrow-nude)] hover:text-[var(--color-abrow-dark)] transition-colors"
                    aria-label="Cerrar"
                  >
                    ✕
                  </button>
                </div>

                {cargandoHorarios && (
                  <p className="text-[var(--color-abrow-muted)] text-sm">Buscando horarios...</p>
                )}
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                {!cargandoHorarios && horarios.length === 0 && !error && (
                  <div className="text-center py-6">
                    <p className="text-[var(--color-abrow-muted)] text-sm mb-4">
                      No hay horarios disponibles ese día.
                    </p>
                    <button
                      onClick={() => setFecha('')}
                      className="text-sm text-[var(--color-abrow-dark)] underline underline-offset-4"
                    >
                      Elegir otra fecha
                    </button>
                  </div>
                )}

                {!cargandoHorarios && horariosManana.length > 0 && (
                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-wide text-[var(--color-abrow-muted)] mb-2">
                      Mañana
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {horariosManana.map((h) => (
                        <button
                          key={h.hora_inicio}
                          onClick={() => elegirHorario(h)}
                          className="border border-[var(--color-abrow-dark)]/15 rounded-full px-4 py-2 text-sm text-[var(--color-abrow-dark)] hover:border-[var(--color-abrow-dark)] hover:bg-[var(--color-abrow-dark)] hover:text-white transition-colors"
                        >
                          {h.hora_inicio}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!cargandoHorarios && horariosTarde.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[var(--color-abrow-muted)] mb-2">
                      Tarde
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {horariosTarde.map((h) => (
                        <button
                          key={h.hora_inicio}
                          onClick={() => elegirHorario(h)}
                          className="border border-[var(--color-abrow-dark)]/15 rounded-full px-4 py-2 text-sm text-[var(--color-abrow-dark)] hover:border-[var(--color-abrow-dark)] hover:bg-[var(--color-abrow-dark)] hover:text-white transition-colors"
                        >
                          {h.hora_inicio}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PASO 3 — DATOS */}
      {paso === PASOS.DATOS && (
        <form onSubmit={confirmarReserva}>
          <button
            type="button"
            onClick={() => setPaso(PASOS.FECHA_HORA)}
            className="text-sm text-[var(--color-abrow-muted)] mb-4 hover:text-[var(--color-abrow-dark)] transition-colors"
          >
            ← Cambiar horario
          </button>

          <div className="flex items-center gap-3 bg-[var(--color-abrow-nude)] rounded-xl px-4 py-4 mb-6">
            <span className="text-2xl">{iconoServicio(servicioSeleccionado.nombre)}</span>
            <div className="text-sm text-[var(--color-abrow-dark)]">
              <p className="font-medium">{servicioSeleccionado.nombre}</p>
              <p className="text-[var(--color-abrow-muted)] capitalize">
                {formatearFechaLarga(fecha)} · {horarioSeleccionado.hora_inicio} hrs
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            <input
              required
              placeholder="Nombre completo"
              value={datosCliente.nombre}
              onChange={(e) => setDatosCliente({ ...datosCliente, nombre: e.target.value })}
              className="border border-[var(--color-abrow-dark)]/20 rounded-xl px-4 py-3 bg-white text-[var(--color-abrow-dark)] focus:outline-none focus:border-[var(--color-abrow-dark)] transition-colors"
            />
            <input
              required
              type="email"
              placeholder="Correo electrónico"
              value={datosCliente.email}
              onChange={(e) => setDatosCliente({ ...datosCliente, email: e.target.value })}
              className="border border-[var(--color-abrow-dark)]/20 rounded-xl px-4 py-3 bg-white text-[var(--color-abrow-dark)] focus:outline-none focus:border-[var(--color-abrow-dark)] transition-colors"
            />
            <input
              required
              type="tel"
              placeholder="Teléfono (ej. +56 9 1234 5678)"
              value={datosCliente.telefono}
              onChange={(e) => setDatosCliente({ ...datosCliente, telefono: e.target.value })}
              className="border border-[var(--color-abrow-dark)]/20 rounded-xl px-4 py-3 bg-white text-[var(--color-abrow-dark)] focus:outline-none focus:border-[var(--color-abrow-dark)] transition-colors"
            />
            <textarea
              placeholder="Notas (opcional)"
              value={datosCliente.notas}
              onChange={(e) => setDatosCliente({ ...datosCliente, notas: e.target.value })}
              className="border border-[var(--color-abrow-dark)]/20 rounded-xl px-4 py-3 bg-white text-[var(--color-abrow-dark)] focus:outline-none focus:border-[var(--color-abrow-dark)] transition-colors"
              rows={3}
            />
          </div>

          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="mt-6 w-full bg-[var(--color-abrow-dark)] text-white rounded-xl py-4 uppercase text-sm tracking-wide font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            {enviando ? 'Confirmando...' : 'Confirmar reserva'}
          </button>
        </form>
      )}

      {/* PASO 4 — CONFIRMADO */}
      {paso === PASOS.CONFIRMADO && (
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-[var(--color-abrow-dark)] text-white text-2xl flex items-center justify-center mx-auto mb-6">
            ✓
          </div>

          <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-abrow-dark)] mb-2">
            {reservaConfirmada?.sincronizada === false ? 'Tu hora quedó reservada' : '¡Reserva confirmada!'}
          </h2>

          <div className="inline-flex items-center gap-3 bg-[var(--color-abrow-nude)] rounded-xl px-5 py-4 my-4 text-left">
            <span className="text-2xl">{iconoServicio(servicioSeleccionado.nombre)}</span>
            <div className="text-sm text-[var(--color-abrow-dark)]">
              <p className="font-medium">{servicioSeleccionado.nombre}</p>
              <p className="text-[var(--color-abrow-muted)] capitalize">
                {formatearFechaLarga(fecha)} · {horarioSeleccionado.hora_inicio} hrs
              </p>
            </div>
          </div>

          {reservaConfirmada?.sincronizada === false ? (
            <p className="text-sm text-[var(--color-abrow-muted)] max-w-sm mx-auto">
              Tu horario está guardado y protegido. Estamos terminando de confirmar los detalles
              — te contactaremos a {datosCliente.email} o {datosCliente.telefono}.
            </p>
          ) : (
            <p className="text-sm text-[var(--color-abrow-muted)]">
              Enviamos los detalles a {datosCliente.email}.
            </p>
          )}
        </div>
      )}
    </section>
  )
}