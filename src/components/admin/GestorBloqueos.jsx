import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function GestorBloqueos({ bloqueos, setBloqueos }) {
  const [tipoBloqueo, setTipoBloqueo] = useState('dia_completo')
  const [fechaBloqueo, setFechaBloqueo] = useState('')
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFin, setHoraFin] = useState('')
  const [motivo, setMotivo] = useState('')
  const [procesando, setProcesando] = useState(false)

  async function handleAgregarBloqueo(e) {
    e.preventDefault()
    if (!fechaBloqueo) return
    setProcesando(true)

    const esRango = tipoBloqueo === 'rango_horas' && horaInicio && horaFin
    const hInicio = esRango ? horaInicio : '08:00'
    const hFin = esRango ? horaFin : '20:00'
    const motivoTexto = motivo || 'Bloqueo Administrativo'

    let googleEventId = null

    try {
      const { data: calData, error: calError } = await supabase.functions.invoke('crear-evento-calendario', {
        body: {
          es_bloqueo: true,
          servicio_nombre: `🚫 BLOQUEO: ${motivoTexto}`,
          cliente_nombre: 'Lumiere Studio',
          cliente_email: 'admin@lumierestudio.cl',
          cliente_telefono: '',
          fecha: fechaBloqueo,
          hora_inicio: hInicio,
          hora_fin: hFin,
          notas: `Bloqueo (${esRango ? `${hInicio} - ${hFin}` : 'Día completo'})`,
        },
      })

      if (!calError && calData?.google_event_id) {
        googleEventId = calData.google_event_id
      }
    } catch (err) {
      console.warn('Google Calendar sync omitido:', err)
    }

    const payload = {
      fecha: fechaBloqueo,
      hora_inicio: esRango ? hInicio : null,
      hora_fin: esRango ? hFin : null,
      tipo: tipoBloqueo,
      motivo: motivoTexto,
      google_event_id: googleEventId,
    }

    const { data, error } = await supabase.from('bloqueos_agenda').insert([payload]).select()

    if (error) {
      alert(`Error al guardar en Supabase: ${error.message}`)
    } else if (data) {
      setBloqueos((prev) => [data[0], ...prev])
    }

    setFechaBloqueo('')
    setHoraInicio('')
    setHoraFin('')
    setMotivo('')
    setProcesando(false)
  }

  async function handleEliminarBloqueo(b) {
    if (!confirm('¿Eliminar este bloqueo?')) return

    if (b.google_event_id) {
      await supabase.functions.invoke('cancelar-evento-calendario', {
        body: { google_event_id: b.google_event_id },
      }).catch(() => {})
    }

    const { error } = await supabase.from('bloqueos_agenda').delete().eq('id', b.id)
    if (!error) {
      setBloqueos((prev) => prev.filter((item) => item.id !== b.id))
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EBE3DE] shadow-sm space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center pb-1">
        <h3 className="font-serif text-lg text-[#3D1D1C]">Bloqueo de Días y Horas</h3>
        <div className="flex gap-1 bg-[#F5F0EB] p-1 rounded-lg border border-[#EBE3DE]">
          <button
            type="button"
            onClick={() => setTipoBloqueo('dia_completo')}
            className={`text-[10px] uppercase font-medium px-2 py-0.5 rounded transition-colors ${
              tipoBloqueo === 'dia_completo' ? 'bg-[#3D1D1C] text-white' : 'text-[#7A6260]'
            }`}
          >
            Día Completo
          </button>
          <button
            type="button"
            onClick={() => setTipoBloqueo('rango_horas')}
            className={`text-[10px] uppercase font-medium px-2 py-0.5 rounded transition-colors ${
              tipoBloqueo === 'rango_horas' ? 'bg-[#3D1D1C] text-white' : 'text-[#7A6260]'
            }`}
          >
            Horas
          </button>
        </div>
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleAgregarBloqueo} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="date"
            value={fechaBloqueo}
            onChange={(e) => setFechaBloqueo(e.target.value)}
            className="bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
            required
          />
          <input
            type="text"
            placeholder="Motivo (ej. Feriado, Médico...)"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            className="bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
          />
        </div>

        {tipoBloqueo === 'rango_horas' && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] uppercase text-[#7A6260] block mb-0.5">Desde</label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="w-full bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
                required
              />
            </div>
            <div>
              <label className="text-[10px] uppercase text-[#7A6260] block mb-0.5">Hasta</label>
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="w-full bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
                required
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={procesando}
          className="w-full bg-[#3D1D1C] text-white text-xs uppercase tracking-wider py-2 rounded-xl hover:bg-[#592b2a] transition-colors disabled:opacity-50"
        >
          {procesando ? 'Guardando...' : 'Aplicar Bloqueo'}
        </button>
      </form>

      {/* LISTA DE BLOQUEOS (PEADA INMEDIATAMENTE AL BOTÓN) */}
      <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pt-3 border-t border-[#F5F0EB]">
        {bloqueos.length > 0 ? (
          bloqueos.map((b) => (
            <div
              key={b.id}
              className="flex justify-between items-center bg-[#F5F0EB] text-[#3D1D1C] text-xs px-3 py-1.5 rounded-xl border border-[#EBE3DE]"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">{b.fecha}</span>
                <span className="text-[11px] text-[#7A6260]">
                  {b.hora_inicio && b.hora_fin
                    ? `(${b.hora_inicio.slice(0, 5)} - ${b.hora_fin.slice(0, 5)})`
                    : '(Día Completo)'}
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#3D1D1C] border border-[#DCD0C7]">
                  {b.motivo}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleEliminarBloqueo(b)}
                className="text-rose-600 hover:text-rose-800 font-bold text-xs"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="text-xs text-[#7A6260] italic">No hay bloqueos activos.</p>
        )}
      </div>
    </div>
  )
}