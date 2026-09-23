import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const ESTADO_COLOR = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  confirmada: 'bg-green-100 text-green-800',
  pagada: 'bg-blue-100 text-blue-800',
  cancelada: 'bg-red-100 text-red-800',
  completada: 'bg-gray-100 text-gray-600',
}

export default function AdminReservas() {
  const [sesionLista, setSesionLista] = useState(false)
  const [reservas, setReservas] = useState([])
  const [servicios, setServicios] = useState({})
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [cancelandoId, setCancelandoId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin')
        return
      }
      setSesionLista(true)
    })
  }, [navigate])

  useEffect(() => {
    if (!sesionLista) return
    cargarDatos()
  }, [sesionLista])

  async function cargarDatos() {
    setCargando(true)
    setError('')

    const [{ data: reservasData, error: errR }, { data: serviciosData, error: errS }] =
      await Promise.all([
        supabase
          .from('reservas')
          .select('*')
          .order('fecha', { ascending: true })
          .order('hora_inicio', { ascending: true }),
        supabase.from('servicios').select('id, nombre'),
      ])

    if (errR || errS) {
      setError('No se pudieron cargar las reservas.')
      setCargando(false)
      return
    }

    const mapaServicios = {}
    serviciosData.forEach((s) => (mapaServicios[s.id] = s.nombre))

    setServicios(mapaServicios)
    setReservas(reservasData)
    setCargando(false)
  }

  async function cancelarReserva(reserva) {
    if (!confirm(`¿Cancelar la reserva de ${reserva.cliente_nombre}?`)) return

    setCancelandoId(reserva.id)

    // Si tiene evento en Google Calendar, lo eliminamos también
    let calendarError = null
    if (reserva.google_event_id) {
      const { error: errCal } = await supabase.functions.invoke('cancelar-evento-calendario', {
        body: { google_event_id: reserva.google_event_id },
      })
      calendarError = errCal
    }

    const { error } = await supabase
      .from('reservas')
      .update({ estado: 'cancelada' })
      .eq('id', reserva.id)

    if (error) {
      alert('No se pudo cancelar la reserva. Intenta de nuevo.')
    } else {
      setReservas((prev) =>
        prev.map((r) => (r.id === reserva.id ? { ...r, estado: 'cancelada' } : r))
      )
      if (calendarError) {
        alert(
          'La reserva se canceló, pero no pudimos eliminar el evento de Google Calendar automáticamente. Bórralo manualmente por esta vez.'
        )
      }
    }

    setCancelandoId(null)
  }

  async function cerrarSesion() {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  if (!sesionLista) return null

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-[var(--color-abrow-dark)]">Reservas</h1>
        <button
          onClick={cerrarSesion}
          className="text-sm text-[var(--color-abrow-muted)] hover:text-[var(--color-abrow-dark)]"
        >
          Cerrar sesión
        </button>
      </div>

      {cargando && <p className="text-[var(--color-abrow-muted)]">Cargando reservas...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {!cargando && !error && reservas.length === 0 && (
        <p className="text-[var(--color-abrow-muted)]">No hay reservas todavía.</p>
      )}

      {!cargando && reservas.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-abrow-dark)]/15 text-left text-[var(--color-abrow-muted)]">
                <th className="py-2 pr-4">Fecha</th>
                <th className="py-2 pr-4">Hora</th>
                <th className="py-2 pr-4">Servicio</th>
                <th className="py-2 pr-4">Cliente</th>
                <th className="py-2 pr-4">Contacto</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id} className="border-b border-[var(--color-abrow-dark)]/5">
                  <td className="py-3 pr-4 text-[var(--color-abrow-dark)]">{r.fecha}</td>
                  <td className="py-3 pr-4 text-[var(--color-abrow-dark)]">
                    {r.hora_inicio?.slice(0, 5)}
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-abrow-dark)]">
                    {servicios[r.servicio_id] || '—'}
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-abrow-dark)]">{r.cliente_nombre}</td>
                  <td className="py-3 pr-4 text-[var(--color-abrow-muted)]">
                    <div>{r.cliente_email}</div>
                    <div>{r.cliente_telefono}</div>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ESTADO_COLOR[r.estado] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {r.estado}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {r.estado !== 'cancelada' && (
                      <button
                        onClick={() => cancelarReserva(r)}
                        disabled={cancelandoId === r.id}
                        className="text-red-600 hover:underline text-xs disabled:opacity-50"
                      >
                        {cancelandoId === r.id ? 'Cancelando...' : 'Cancelar'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}