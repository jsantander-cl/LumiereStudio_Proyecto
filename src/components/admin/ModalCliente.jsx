import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ModalCliente({ cliente, historial, servicios, onClose, onActualizarReserva }) {
  const [notaEdicion, setNotaEdicion] = useState({})
  const [guardandoId, setGuardandoId] = useState(null)

  useEffect(() => {
    if (historial && historial.length > 0) {
      const mapaNotas = {}
      historial.forEach((res) => {
        mapaNotas[res.id] = res.notas_tecnicas || ''
      })
      setNotaEdicion(mapaNotas)
    }
  }, [historial])

  if (!cliente) return null

  async function guardarNotaTecnica(reservaId) {
    setGuardandoId(reservaId)
    const nuevaNota = notaEdicion[reservaId] || ''

    const { error } = await supabase
      .from('reservas')
      .update({ notas_tecnicas: nuevaNota })
      .eq('id', reservaId)

    if (!error) {
      if (onActualizarReserva) {
        onActualizarReserva(reservaId, { notas_tecnicas: nuevaNota })
      }
      alert('Nota técnica guardada correctamente en la ficha del cliente.')
    } else {
      alert('Error al guardar la nota técnica: ' + error.message)
    }
    setGuardandoId(null)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl border border-[#EBE3DE] flex flex-col justify-between">
        
        {/* CABECERA DEL CLIENTE */}
        <div className="p-6 border-b border-[#EBE3DE] bg-[#FDFBF9] flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#7A6260] font-semibold">
              Ficha Clínica & Historial
            </span>
            <h2 className="font-serif text-2xl text-[#3D1D1C]">{cliente.cliente_nombre}</h2>
            <div className="flex gap-4 text-xs text-[#7A6260] mt-1">
              <span>📧 {cliente.cliente_email || 'Sin correo registrado'}</span>
              <span>📞 {cliente.cliente_telefono || 'Sin teléfono'}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-[#3D1D1C] font-bold text-xl px-2"
          >
            ×
          </button>
        </div>

        {/* HISTORIAL DE SESIONES Y NOTAS TÉCNICAS */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <h3 className="font-serif text-sm text-[#3D1D1C] border-b border-[#F5F0EB] pb-2">
            Historial de Citas y Observaciones Internas
          </h3>

          {historial && historial.length > 0 ? (
            historial.map((res) => (
              <div
                key={res.id}
                className="bg-[#FDFBF9] p-4 rounded-2xl border border-[#EBE3DE] space-y-3"
              >
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-[#3D1D1C]">
                      {servicios[res.servicio_id] || res.servicio_nombre || 'Tratamiento'}
                    </span>
                    <span className="text-[#7A6260] ml-2">({res.fecha})</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold ${
                      res.estado === 'confirmada' || res.estado === 'pagada'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {res.estado}
                  </span>
                </div>

                {/* NOTA GENERAL DEL CLIENTE */}
                {res.notas && (
                  <p className="text-[11px] text-[#7A6260] bg-white p-2 rounded-xl border border-[#EBE3DE] italic">
                    Cliente dijo: "{res.notas}"
                  </p>
                )}

                {/* BLOQUE DE NOTA TÉCNICA (EXCLUSIVO ADMIN) */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#3D1D1C] font-bold block">
                    📝 Ficha Técnica Privada (Curvatura, adhesivo, pigmento, observaciones):
                  </label>
                  <textarea
                    value={notaEdicion[res.id] ?? res.notas_tecnicas ?? ''}
                    onChange={(e) =>
                      setNotaEdicion({ ...notaEdicion, [res.id]: e.target.value })
                    }
                    placeholder="Ej. Sensibilidad ligera en ojo derecho. Curvatura D 9-11mm. Lote pigmento #04..."
                    className="w-full bg-white border border-[#DCD0C7] rounded-xl p-2.5 text-xs text-[#2D1A19] focus:outline-none focus:border-[#3D1D1C]"
                    rows={2}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => guardarNotaTecnica(res.id)}
                      disabled={guardandoId === res.id}
                      className="bg-[#3D1D1C] text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg hover:bg-[#592b2a] disabled:opacity-50"
                    >
                      {guardandoId === res.id ? 'Guardando...' : 'Guardar Ficha'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#7A6260] italic">No hay historial previo para este cliente.</p>
          )}
        </div>

        {/* PIE DEL MODAL */}
        <div className="p-4 border-t border-[#EBE3DE] bg-[#FDFBF9] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-xs bg-white border border-[#DCD0C7] text-[#3D1D1C] px-4 py-2 rounded-xl hover:bg-[#F5F0EB]"
          >
            Cerrar Ficha
          </button>
        </div>

      </div>
    </div>
  )
}