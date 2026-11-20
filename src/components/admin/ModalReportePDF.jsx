import { useState } from 'react'

export default function ModalReportePDF({ reservas, gastos, servicios }) {
  const [abierto, setAbierto] = useState(false)
  
  // Por defecto mes actual
  const hoy = new Date()
  const mesActualStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`
  const [mesInicio, setMesInicio] = useState(mesActualStr)
  const [mesFin, setMesFin] = useState(mesActualStr)

  // Filtrado de datos por rango de meses
  const reservasFiltradas = reservas.filter((r) => {
    if (!r.fecha) return false
    const mes = r.fecha.slice(0, 7)
    return mes >= mesInicio && mes <= mesFin && (r.estado === 'confirmada' || r.estado === 'pagada')
  })

  const gastosFiltrados = gastos.filter((g) => {
    if (!g.fecha) return false
    const mes = g.fecha.slice(0, 7)
    return mes >= mesInicio && mes <= mesFin
  })

  const totalIngresos = reservasFiltradas.reduce((acc, r) => acc + (Number(r.valor) || 0), 0)
  const totalGastos = gastosFiltrados.reduce((acc, g) => acc + (Number(g.monto) || 0), 0)
  const balanceNeto = totalIngresos - totalGastos

  function imprimirPDF() {
    window.print()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="text-xs bg-[#3D1D1C] text-white px-4 py-2 rounded-full hover:bg-[#592b2a] transition-colors flex items-center gap-2"
      >
        📄 Generar Informe PDF
      </button>

      {abierto && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-xl border border-[#EBE3DE] flex flex-col justify-between">
            
            {/* NO IMPRIMIR ESTE CABEZAL DE FILTROS */}
            <div className="p-6 border-b border-[#EBE3DE] bg-[#FDFBF9] flex justify-between items-center print:hidden">
              <div>
                <h3 className="font-serif text-xl text-[#3D1D1C]">Configurar Informe Financiero</h3>
                <p className="text-xs text-[#7A6260]">Selecciona el rango de periodos a exportar</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs">
                  <label className="text-[#7A6260]">Desde:</label>
                  <input
                    type="month"
                    value={mesInicio}
                    onChange={(e) => setMesInicio(e.target.value)}
                    className="border border-[#DCD0C7] rounded-lg px-2 py-1 text-xs bg-white"
                  />
                  <label className="text-[#7A6260] ml-2">Hasta:</label>
                  <input
                    type="month"
                    value={mesFin}
                    onChange={(e) => setMesFin(e.target.value)}
                    className="border border-[#DCD0C7] rounded-lg px-2 py-1 text-xs bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setAbierto(false)}
                  className="text-gray-400 hover:text-[#3D1D1C] font-bold text-xl px-2"
                >
                  ×
                </button>
              </div>
            </div>

            {/* CONTENIDO DEL REPORTE (IMPRIMIBLE) */}
            <div id="seccion-imprimible" className="p-8 overflow-y-auto space-y-6 text-[#2D1A19]">
              <div className="flex justify-between items-start border-b border-[#EBE3DE] pb-4">
                <div>
                  <h1 className="font-serif text-3xl text-[#3D1D1C]">Lumiere Studio</h1>
                  <p className="text-xs text-[#7A6260]">Informe de Ingresos y Gastos</p>
                </div>
                <div className="text-right text-xs text-[#7A6260]">
                  <p className="font-semibold text-[#3D1D1C]">Periodo:</p>
                  <p>{mesInicio} / {mesFin}</p>
                </div>
              </div>

              {/* RESUMEN EJECUTIVO */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#FDFBF9] p-3 rounded-xl border border-[#EBE3DE]">
                  <span className="text-[10px] uppercase text-[#7A6260] font-bold block">Total Ingresos</span>
                  <span className="font-serif text-xl text-emerald-700 block mt-1">${totalIngresos.toLocaleString('es-CL')}</span>
                </div>
                <div className="bg-[#FDFBF9] p-3 rounded-xl border border-[#EBE3DE]">
                  <span className="text-[10px] uppercase text-[#7A6260] font-bold block">Total Gastos</span>
                  <span className="font-serif text-xl text-rose-700 block mt-1">${totalGastos.toLocaleString('es-CL')}</span>
                </div>
                <div className="bg-[#FDFBF9] p-3 rounded-xl border border-[#EBE3DE]">
                  <span className="text-[10px] uppercase text-[#7A6260] font-bold block">Balance Neto</span>
                  <span className={`font-serif text-xl block mt-1 ${balanceNeto >= 0 ? 'text-[#3D1D1C]' : 'text-rose-700'}`}>
                    ${balanceNeto.toLocaleString('es-CL')}
                  </span>
                </div>
              </div>

              {/* TABLA INGRESOS */}
              <div>
                <h4 className="font-serif text-sm text-[#3D1D1C] mb-2 border-b border-[#F5F0EB] pb-1">Desglose de Ingresos ({reservasFiltradas.length})</h4>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[#7A6260] border-b text-[10px] uppercase">
                      <th className="py-1">Fecha</th>
                      <th className="py-1">Cliente</th>
                      <th className="py-1">Tratamiento</th>
                      <th className="py-1 text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reservasFiltradas.map((r) => (
                      <tr key={r.id}>
                        <td className="py-1">{r.fecha}</td>
                        <td className="py-1">{r.cliente_nombre}</td>
                        <td className="py-1">{servicios[r.servicio_id] || r.servicio_nombre || 'Tratamiento'}</td>
                        <td className="py-1 text-right font-medium">${(Number(r.valor) || 0).toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TABLA GASTOS */}
              <div>
                <h4 className="font-serif text-sm text-[#3D1D1C] mb-2 border-b border-[#F5F0EB] pb-1">Desglose de Gastos ({gastosFiltrados.length})</h4>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[#7A6260] border-b text-[10px] uppercase">
                      <th className="py-1">Fecha</th>
                      <th className="py-1">Categoría</th>
                      <th className="py-1">Concepto</th>
                      <th className="py-1 text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {gastosFiltrados.map((g) => (
                      <tr key={g.id}>
                        <td className="py-1">{g.fecha}</td>
                        <td className="py-1 font-medium">{g.categoria}</td>
                        <td className="py-1">{g.concepto}</td>
                        <td className="py-1 text-right font-medium text-rose-700">-${(Number(g.monto) || 0).toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BOTONES ACCIÓN */}
            <div className="p-4 border-t border-[#EBE3DE] bg-[#FDFBF9] flex justify-end gap-2 print:hidden">
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="text-xs bg-white border border-[#DCD0C7] text-[#3D1D1C] px-4 py-2 rounded-xl hover:bg-[#F5F0EB]"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={imprimirPDF}
                className="text-xs bg-[#3D1D1C] text-white px-5 py-2 rounded-xl hover:bg-[#592b2a]"
              >
                🖨️ Imprimir / Descargar PDF
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}