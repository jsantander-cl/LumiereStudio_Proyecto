import ModalReportePDF from './ModalReportePDF'

export default function AdminKpis({ kpis, reservas = [], gastos = [], servicios = {} }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-lg text-[#3D1D1C]">Resumen Operativo</h2>
        <ModalReportePDF reservas={reservas} gastos={gastos} servicios={servicios} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* INGRESOS MES EN CURSO */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBE3DE] shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6260] block">
            Ingresos Mes en Curso
          </span>
          <span className="font-serif text-3xl text-[#3D1D1C] block mt-2">
            ${(kpis.ingresosMesActual || 0).toLocaleString('es-CL')}
          </span>
          <span className="text-xs text-emerald-600 block mt-2">Citas confirmadas del mes</span>
        </div>

        {/* TOTAL DE RESERVAS */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBE3DE] shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6260] block">
            Total de Reservas
          </span>
          <span className="font-serif text-3xl text-[#3D1D1C] block mt-2">{kpis.total}</span>
          <span className="text-xs text-[#7A6260] block mt-2">De más reciente a más antigua</span>
        </div>

        {/* CONFIRMADAS / PAGADAS */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBE3DE] shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6260] block">
            Confirmadas / Pagadas
          </span>
          <span className="font-serif text-3xl text-emerald-700 block mt-2">
            {kpis.confirmadas}
          </span>
          <span className="text-xs text-amber-600 block mt-2">{kpis.pendientes} pendientes</span>
        </div>

        {/* CITAS CANCELADAS */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBE3DE] shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6260] block">
            Citas Canceladas
          </span>
          <span className="font-serif text-3xl text-rose-700 block mt-2">{kpis.canceladas}</span>
          <span className="text-xs text-rose-600 block mt-2">Sincronizadas con Calendar</span>
        </div>
      </div>
    </div>
  )
}