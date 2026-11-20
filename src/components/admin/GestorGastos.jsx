import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function GestorGastos({ gastos, setGastos }) {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [categoria, setCategoria] = useState('Insumos')
  const [concepto, setConcepto] = useState('')
  const [monto, setMonto] = useState('')
  const [medioPago, setMedioPago] = useState('Transferencia')
  const [guardando, setGuardando] = useState(false)

  async function handleAgregarGasto(e) {
    e.preventDefault()
    if (!monto || !concepto) return
    setGuardando(true)

    const payload = {
      fecha,
      categoria,
      concepto,
      monto: parseInt(monto, 10) || 0,
      medio_pago: medioPago,
    }

    const { data, error } = await supabase.from('gastos').insert([payload]).select()

    if (!error && data) {
      setGastos((prev) => [data[0], ...prev])
      setConcepto('')
      setMonto('')
    } else {
      alert('Error al guardar el gasto en Supabase: ' + (error?.message || ''))
    }
    setGuardando(false)
  }

  async function handleEliminarGasto(id) {
    if (!confirm('¿Eliminar este registro de gasto?')) return
    const { error } = await supabase.from('gastos').delete().eq('id', id)
    if (!error) {
      setGastos((prev) => prev.filter((g) => g.id !== id))
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EBE3DE] shadow-sm space-y-4">
      <div className="border-b border-[#EBE3DE] pb-2">
        <h3 className="font-serif text-lg text-[#3D1D1C]">Registro de Gastos</h3>
        <p className="text-xs text-[#7A6260]">Insumos, publicidad e implementación del estudio</p>
      </div>

      <form onSubmit={handleAgregarGasto} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
            required
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
          >
            <option value="Insumos">Compra de Insumos</option>
            <option value="Implementación">Implementación</option>
            <option value="Publicidad">Pagos de Publicidad</option>
            <option value="Otros">Otros Gastos</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Concepto / Detalle (ej. Pigmentos Lote #2)"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            className="sm:col-span-2 bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
            required
          />
          <input
            type="number"
            placeholder="Monto ($ CLP)"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={guardando}
          className="w-full bg-[#3D1D1C] text-white text-xs uppercase tracking-wider py-2 rounded-xl hover:bg-[#592b2a] transition-colors disabled:opacity-50"
        >
          {guardando ? 'Guardando...' : '+ Registrar Gasto'}
        </button>
      </form>

      {/* LISTA DE RECIENTES */}
      <div className="space-y-2 max-h-40 overflow-y-auto pt-2 border-t border-[#F5F0EB]">
        {gastos.length > 0 ? (
          gastos.map((g) => (
            <div
              key={g.id}
              className="flex justify-between items-center bg-[#FDFBF9] p-2.5 rounded-xl border border-[#EBE3DE] text-xs"
            >
              <div>
                <span className="font-medium text-[#2D1A19]">{g.concepto}</span>
                <div className="flex gap-2 text-[10px] text-[#7A6260]">
                  <span>{g.fecha}</span>
                  <span className="font-semibold text-[#3D1D1C]">{g.categoria}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-rose-700">-${(g.monto || 0).toLocaleString('es-CL')}</span>
                <button
                  type="button"
                  onClick={() => handleEliminarGasto(g.id)}
                  className="text-rose-600 hover:text-rose-800 font-bold px-1 text-xs"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-[#7A6260] italic">No hay gastos registrados.</p>
        )}
      </div>
    </div>
  )
}