import { useMemo } from 'react'

export default function ReporteFinanciero({ reservas, servicios }) {
  const metricasFinancieras = useMemo(() => {
    const ahora = new Date()
    const anoActual = ahora.getFullYear()
    const mesActual = ahora.getMonth() // 0-indexed

    const fechaMesAnterior = new Date(anoActual, mesActual - 1, 1)
    const anoAnterior = fechaMesAnterior.getFullYear()
    const mesAnteriorNum = fechaMesAnterior.getMonth()

    const prefixMesActual = `${anoActual}-${String(mesActual + 1).padStart(2, '0')}`
    const prefixMesAnterior = `${anoAnterior}-${String(mesAnteriorNum + 1).padStart(2, '0')}`

    // Filtrar solo citas confirmadas o pagadas
    const validas = reservas.filter((r) => r.estado === 'confirmada' || r.estado === 'pagada')

    const delMesActual = validas.filter((r) => r.fecha?.startsWith(prefixMesActual))
    const delMesAnterior = validas.filter((r) => r.fecha?.startsWith(prefixMesAnterior))

    const ingresosMesActual = delMesActual.reduce((acc, r) => acc + (Number(r.valor) || 0), 0)
    const ingresosMesAnterior = delMesAnterior.reduce((acc, r) => acc + (Number(r.valor) || 0), 0)

    // Variación porcentual vs mes anterior
    let diferenciaPorcentaje = 0
    if (ingresosMesAnterior > 0) {
      diferenciaPorcentaje = Math.round(((ingresosMesActual - ingresosMesAnterior) / ingresosMesAnterior) * 100)
    } else if (ingresosMesActual > 0) {
      diferenciaPorcentaje = 100
    }

    // Ticket promedio
    const ticketPromedio = delMesActual.length > 0 ? Math.round(ingresosMesActual / delMesActual.length) : 0

    // Desglose de ingresos por servicio (mes actual)
    const desglosePorServicio = {}
    delMesActual.forEach((r) => {
      const nombreServicio = servicios[r.servicio_id] || r.servicio_nombre || 'Tratamiento General'
      const monto = Number(r.valor) || 0
      desglosePorServicio[nombreServicio] = (desglosePorServicio[nombreServicio] || 0) + monto
    })

    const listaServicios = Object.entries(desglosePorServicio)
      .map(([nombre, monto]) => ({
        nombre,
        monto,
        porcentaje: ingresosMesActual > 0 ? Math.round((monto / ingresosMesActual) * 100) : 0,
      }))
      .sort((a, b) => b.monto - a.monto)

    return {
      ingresosMesActual,
      ingresosMesAnterior,
      diferenciaPorcentaje,
      ticketPromedio,
      totalCitasMes: delMesActual.length,
      listaServicios,
    }
  }, [reservas, servicios])

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EBE3DE] shadow-sm space-y-6">
      <div className="border-b border-[#EBE3DE] pb-3">
        <h3 className="font-serif text-lg text-[#3D1D1C]">Rendimiento Financiero</h3>
        <p className="text-xs text-[#7A6260]">Análisis de ingresos y ticket promedio del mes en curso</p>
      </div>

      {/* TARJETAS RESUMEN DE INGRESOS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FDFBF9] p-4 rounded-xl border border-[#EBE3DE]">
          <span className="text-[10px] uppercase font-bold text-[#7A6260] block">Ingresos Mes Actual</span>
          <span className="font-serif text-2xl text-[#3D1D1C] block mt-1">
            ${metricasFinancieras.ingresosMesActual.toLocaleString('es-CL')}
          </span>
          <span
            className={`text-[10px] font-semibold inline-block mt-1 ${
              metricasFinancieras.diferenciaPorcentaje >= 0 ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {metricasFinancieras.diferenciaPorcentaje >= 0 ? '▲ +' : '▼ '}
            {metricasFinancieras.diferenciaPorcentaje}% vs mes anterior
          </span>
        </div>

        <div className="bg-[#FDFBF9] p-4 rounded-xl border border-[#EBE3DE]">
          <span className="text-[10px] uppercase font-bold text-[#7A6260] block">Ticket Promedio / Cita</span>
          <span className="font-serif text-2xl text-[#3D1D1C] block mt-1">
            ${metricasFinancieras.ticketPromedio.toLocaleString('es-CL')}
          </span>
          <span className="text-[10px] text-[#7A6260] block mt-1">
            Basado en {metricasFinancieras.totalCitasMes} atención(es)
          </span>
        </div>

        <div className="bg-[#FDFBF9] p-4 rounded-xl border border-[#EBE3DE]">
          <span className="text-[10px] uppercase font-bold text-[#7A6260] block">Mes Anterior</span>
          <span className="font-serif text-2xl text-[#7A6260] block mt-1">
            ${metricasFinancieras.ingresosMesAnterior.toLocaleString('es-CL')}
          </span>
          <span className="text-[10px] text-[#7A6260] block mt-1">Cierre mensual previo</span>
        </div>
      </div>

      {/* DESGLOSE POR SERVICIO MÁS RENTABLE */}
      <div>
        <h4 className="font-serif text-sm text-[#3D1D1C] mb-3">Distribución de Ingresos por Tratamiento</h4>
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
          {metricasFinancieras.listaServicios.length > 0 ? (
            metricasFinancieras.listaServicios.map((s) => (
              <div key={s.nombre} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#2D1A19]">{s.nombre}</span>
                  <span className="font-semibold text-[#3D1D1C]">
                    ${s.monto.toLocaleString('es-CL')} ({s.porcentaje}%)
                  </span>
                </div>
                <div className="w-full bg-[#F5F0EB] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#3D1D1C] h-full rounded-full transition-all duration-500"
                    style={{ width: `${s.porcentaje}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#7A6260] italic">No hay ingresos registrados en el mes actual.</p>
          )}
        </div>
      </div>
    </div>
  )
}