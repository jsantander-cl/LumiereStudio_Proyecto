import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function TablaReservas({
  reservasFiltradas,
  servicios,
  filtroEstado,
  setFiltroEstado,
  busqueda,
  setBusqueda,
  setReservas,
  onSeleccionarCliente,
  onCancelarReserva,
  onCambiarEstado,
}) {
  const [editandoReservaId, setEditandoReservaId] = useState(null)
  const [abonoTemp, setAbonoTemp] = useState('')
  const [medioPagoTemp, setMedioPagoTemp] = useState('Transferencia')
  const [valorTemp, setValorTemp] = useState('')

  // Iniciar edición de pago
  function iniciarEdicionPago(r) {
    setEditandoReservaId(r.id)
    setAbonoTemp(r.abono || 0)
    setMedioPagoTemp(r.medio_pago || 'Transferencia')
    setValorTemp(r.valor || 0)
  }

  // Guardar abono y medio de pago en Supabase
  async function guardarDatosPago(id) {
    const abonoNum = parseInt(abonoTemp, 10) || 0
    const valorNum = parseInt(valorTemp, 10) || 0

    const payload = {
      abono: abonoNum,
      medio_pago: medioPagoTemp,
      valor: valorNum,
    }

    const { error } = await supabase
      .from('reservas')
      .update(payload)
      .eq('id', id)

    if (!error) {
      setReservas((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...payload } : r))
      )
      setEditandoReservaId(null)
    } else {
      alert('Error al actualizar datos de pago en Supabase: ' + error.message)
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EBE3DE] shadow-sm space-y-4">
      {/* BARRA DE FILTROS Y BÚSQUEDA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#EBE3DE] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['todas', 'pendiente', 'confirmada', 'pagada', 'cancelada'].map((est) => (
            <button
              key={est}
              onClick={() => setFiltroEstado(est)}
              className={`text-xs capitalize px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                filtroEstado === est
                  ? 'bg-[#3D1D1C] text-white border-[#3D1D1C]'
                  : 'bg-[#FDFBF9] text-[#7A6260] border-[#EBE3DE] hover:border-[#3D1D1C]'
              }`}
            >
              {est}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Buscar por cliente, correo o servicio..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:w-64 bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19] focus:outline-none focus:border-[#3D1D1C]"
        />
      </div>

      {/* TABLA DE RESERVAS */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#2D1A19]">
          <thead>
            <tr className="border-b border-[#EBE3DE] text-[#7A6260] uppercase text-[10px] tracking-wider font-medium">
              <th className="py-3 px-2">Fecha y Hora</th>
              <th className="py-3 px-2">Cliente</th>
              <th className="py-3 px-2">Servicio</th>
              <th className="py-3 px-2">Valor Total</th>
              <th className="py-3 px-2">Abono / Medio</th>
              <th className="py-3 px-2">Saldo Pendiente</th>
              <th className="py-3 px-2">Estado</th>
              <th className="py-3 px-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F0EB]">
            {reservasFiltradas.length > 0 ? (
              reservasFiltradas.map((r) => {
                const total = Number(r.valor) || 0
                const abono = Number(r.abono) || 0
                const saldoPendiente = Math.max(0, total - abono)
                const estaEditando = editandoReservaId === r.id

                return (
                  <tr key={r.id} className="hover:bg-[#FDFBF9] transition-colors">
                    {/* FECHA Y HORA */}
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span className="font-semibold block">{r.fecha}</span>
                      <span className="text-[#7A6260] text-[11px]">{r.hora_inicio?.slice(0, 5)} hrs</span>
                    </td>

                    {/* CLIENTE */}
                    <td className="py-3 px-2">
                      <button
                        onClick={() => onSeleccionarCliente(r)}
                        className="font-medium hover:underline text-[#3D1D1C] text-left block"
                      >
                        {r.cliente_nombre}
                      </button>
                      <span className="text-[#7A6260] text-[10px] block">{r.cliente_telefono}</span>
                    </td>

                    {/* SERVICIO */}
                    <td className="py-3 px-2">
                      <span className="font-medium">{servicios[r.servicio_id] || r.servicio_nombre || 'Tratamiento'}</span>
                    </td>

                    {/* VALOR TOTAL */}
                    <td className="py-3 px-2 font-semibold whitespace-nowrap">
                      {estaEditando ? (
                        <input
                          type="number"
                          value={valorTemp}
                          onChange={(e) => setValorTemp(e.target.value)}
                          className="w-20 border border-[#3D1D1C] rounded px-1.5 py-0.5 text-xs bg-white"
                        />
                      ) : (
                        `$${total.toLocaleString('es-CL')}`
                      )}
                    </td>

                    {/* ABONO Y MEDIO DE PAGO */}
                    <td className="py-3 px-2 whitespace-nowrap">
                      {estaEditando ? (
                        <div className="flex flex-col gap-1">
                          <input
                            type="number"
                            placeholder="Abono ($)"
                            value={abonoTemp}
                            onChange={(e) => setAbonoTemp(e.target.value)}
                            className="w-20 border border-[#3D1D1C] rounded px-1.5 py-0.5 text-xs bg-white"
                          />
                          <select
                            value={medioPagoTemp}
                            onChange={(e) => setMedioPagoTemp(e.target.value)}
                            className="w-20 border border-[#3D1D1C] rounded px-1 py-0.5 text-[10px] bg-white"
                          >
                            <option value="Transferencia">Transf.</option>
                            <option value="Webpay">Webpay</option>
                            <option value="Efectivo">Efectivo</option>
                          </select>
                        </div>
                      ) : (
                        <div>
                          <span className="font-medium text-emerald-700 block">
                            ${abono.toLocaleString('es-CL')}
                          </span>
                          <span className="text-[10px] text-[#7A6260] uppercase">
                            {r.medio_pago || 'Sin registrar'}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* SALDO PENDIENTE */}
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                          saldoPendiente === 0
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {saldoPendiente === 0 ? '✓ Pagado' : `$${saldoPendiente.toLocaleString('es-CL')}`}
                      </span>
                    </td>

                    {/* ESTADO */}
                    <td className="py-3 px-2">
                      <select
                        value={r.estado}
                        onChange={(e) => onCambiarEstado(r.id, e.target.value)}
                        className={`text-[10px] uppercase font-semibold px-2 py-1 rounded-full border ${
                          r.estado === 'confirmada'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : r.estado === 'pagada'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : r.estado === 'cancelada'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmada">Confirmada</option>
                        <option value="pagada">Pagada</option>
                        <option value="cancelada">Cancelada</option>
                      </select>
                    </td>

                    {/* ACCIONES */}
                    <td className="py-3 px-2 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {estaEditando ? (
                          <button
                            onClick={() => guardarDatosPago(r.id)}
                            className="bg-[#3D1D1C] text-white px-2 py-1 rounded text-[10px]"
                          >
                            OK
                          </button>
                        ) : (
                          <button
                            onClick={() => iniciarEdicionPago(r)}
                            className="text-[10px] bg-[#F5F0EB] text-[#3D1D1C] px-2 py-1 rounded border border-[#EBE3DE] hover:bg-[#EBE3DE]"
                            title="Editar Pago / Abono"
                          >
                            💳 Pago
                          </button>
                        )}

                        <button
                          onClick={() => onCancelarReserva(r)}
                          className="text-rose-600 hover:text-rose-800 font-bold px-1 text-xs"
                          title="Cancelar Cita"
                        >
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-[#7A6260] italic">
                  No se encontraron reservas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 