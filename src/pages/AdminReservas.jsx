import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import AdminKpis from '../components/admin/AdminKpis'
import GestorBloqueos from '../components/admin/GestorBloqueos'
import GestorServicios from '../components/admin/GestorServicios'
import GestorGastos from '../components/admin/GestorGastos'
import GestorGiftCards from '../components/admin/GestorGiftCards'
import TablaReservas from '../components/admin/TablaReservas'
import ModalCliente from '../components/admin/ModalCliente'
import ReporteFinanciero from '../components/admin/ReporteFinanciero'

export default function AdminReservas() {
  const [sesionLista, setSesionLista] = useState(false)
  const [reservas, setReservas] = useState([])
  const [servicios, setServicios] = useState([])
  const [bloqueos, setBloqueos] = useState([])
  const [gastos, setGastos] = useState([])
  const [giftCards, setGiftCards] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  
  const [filtroEstado, setFiltroEstado] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return navigate('/admin')
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

    const [
      { data: rData, error: errR },
      { data: sData, error: errS },
      { data: bData },
      { data: gData },
      { data: gcData }
    ] = await Promise.all([
      supabase.from('reservas').select('*').order('fecha', { ascending: false }).order('hora_inicio', { ascending: false }),
      supabase.from('servicios').select('*').order('orden', { ascending: true }),
      supabase.from('bloqueos_agenda').select('*').order('fecha', { ascending: false }),
      supabase.from('gastos').select('*').order('fecha', { ascending: false }),
      supabase.from('gift_cards').select('*').order('created_at', { ascending: false }),
    ])

    if (errR || errS) {
      setError('Error al cargar datos desde Supabase.')
      setCargando(false)
      return
    }

    const mPrecios = {}
    if (sData) {
      sData.forEach((s) => {
        mPrecios[s.id] = s.precio || 0
      })
    }

    setServicios(sData || [])
    setReservas((rData || []).map((r) => ({ ...r, valor: r.valor ?? (mPrecios[r.servicio_id] || 0) })))
    setBloqueos(bData || [])
    setGastos(gData || [])
    setGiftCards(gcData || [])
    setCargando(false)
  }

  const mapaServiciosNombres = useMemo(() => {
    const mapa = {}
    servicios.forEach((s) => {
      mapa[s.id] = s.nombre
    })
    return mapa
  }, [servicios])

  async function cambiarEstado(id, nuevoEstado) {
    const { error } = await supabase.from('reservas').update({ estado: nuevoEstado }).eq('id', id)
    if (!error) setReservas((prev) => prev.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r)))
  }

  async function cancelarReserva(r) {
    if (!confirm(`¿Cancelar la reserva de ${r.cliente_nombre}?`)) return
    if (r.google_event_id) {
      await supabase.functions.invoke('cancelar-evento-calendario', { body: { google_event_id: r.google_event_id } }).catch(() => {})
    }
    const { error } = await supabase.from('reservas').update({ estado: 'cancelada' }).eq('id', r.id)
    if (!error) setReservas((prev) => prev.map((item) => (item.id === r.id ? { ...item, estado: 'cancelada' } : item)))
  }

  const kpis = useMemo(() => {
    const ahora = new Date()
    const mesStr = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}`
    const confirmadas = reservas.filter((r) => r.estado === 'confirmada' || r.estado === 'pagada')
    
    return {
      total: reservas.length,
      confirmadas: confirmadas.length,
      canceladas: reservas.filter((r) => r.estado === 'cancelada').length,
      pendientes: reservas.filter((r) => r.estado === 'pendiente').length,
      ingresosMesActual: confirmadas.reduce((acc, r) => (r.fecha?.startsWith(mesStr) ? acc + (Number(r.valor) || 0) : acc), 0),
    }
  }, [reservas])

  const reservasFiltradas = useMemo(() => {
    return reservas.filter((r) => {
      const matchEstado = filtroEstado === 'todas' || r.estado === filtroEstado
      const q = busqueda.toLowerCase()
      const matchBusqueda =
        (r.cliente_nombre || '').toLowerCase().includes(q) ||
        (r.cliente_email || '').toLowerCase().includes(q) ||
        (mapaServiciosNombres[r.servicio_id] || '').toLowerCase().includes(q)
      return matchEstado && matchBusqueda
    })
  }, [reservas, filtroEstado, busqueda, mapaServiciosNombres])

  if (!sesionLista) return null

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#2D1A19] p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center border-b border-[#EBE3DE] pb-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#3D1D1C]">
              Dashboard de Reservas
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6260] mt-1">
              Lumiere Studio Management
            </p>
          </div>
          <button
            onClick={() =>
              supabase.auth.signOut().then(() => navigate('/admin'))
            }
            className="text-xs border border-rose-200 text-rose-700 px-4 py-2 rounded-full"
          >
            Cerrar sesión
          </button>
        </div>

        {/* METRICAS + INFORME PDF */}
        <AdminKpis
          kpis={kpis}
          reservas={reservas}
          gastos={gastos}
          servicios={mapaServiciosNombres}
        />

        {/* FILA 1: BLOQUEOS DE AGENDA Y CATÁLOGO DE SERVICIOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GestorBloqueos bloqueos={bloqueos} setBloqueos={setBloqueos} />
          <GestorServicios servicios={servicios} setServicios={setServicios} />
        </div>

        {/* FILA 2: GESTIÓN DE GIFT CARDS */}
        <div>
          <GestorGiftCards
            giftCards={giftCards}
            setGiftCards={setGiftCards}
            servicios={servicios}
          />
        </div>

        {/* FILA 3: REGISTRO DE GASTOS */}
        <div>
          <GestorGastos gastos={gastos} setGastos={setGastos} />
        </div>

        {/* REPORTE FINANCIERO */}
        <ReporteFinanciero
          reservas={reservas}
          servicios={mapaServiciosNombres}
        />

        {/* TABLA PRINCIPAL */}
        {!cargando && (
          <TablaReservas
            reservasFiltradas={reservasFiltradas}
            servicios={mapaServiciosNombres}
            filtroEstado={filtroEstado}
            setFiltroEstado={setFiltroEstado}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setReservas={setReservas}
            onSeleccionarCliente={(r) => setClienteSeleccionado(r)}
            onCancelarReserva={cancelarReserva}
            onCambiarEstado={cambiarEstado}
          />
        )}
      </div>

      <ModalCliente
        cliente={clienteSeleccionado}
        historial={reservas.filter(
          (r) => r.cliente_email === clienteSeleccionado?.cliente_email
        )}
        servicios={mapaServiciosNombres}
        onClose={() => setClienteSeleccionado(null)}
        onActualizarReserva={(id, camposActualizados) => {
          setReservas((prev) =>
            prev.map((r) =>
              r.id === id ? { ...r, ...camposActualizados } : r
            )
          )
        }}
      />
    </div>
  )
}