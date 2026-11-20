import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function GestorServicios({ servicios, setServicios }) {
  const [editandoId, setEditandoId] = useState(null)
  
  // Estado para la edición completa del servicio seleccionado
  const [formEdicion, setFormEdicion] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    duracion_minutos: '',
  })

  // Estado para nuevo servicio
  const [mostrarFormNuevo, setMostrarFormNuevo] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoPrecio, setNuevoPrecio] = useState('')
  const [nuevaDuracion, setNuevaDuracion] = useState('60')
  const [nuevaDescripcion, setNuevaDescripcion] = useState('')
  const [guardando, setGuardando] = useState(false)

  // Abrir modo de edición completa para una card
  function iniciarEdicion(s) {
    setEditandoId(s.id)
    setFormEdicion({
      nombre: s.nombre || '',
      descripcion: s.descripcion || '',
      precio: s.precio || 0,
      duracion_minutos: s.duracion_minutos || 60,
    })
  }

  // Guardar edición completa en Supabase
  async function guardarEdicion(id) {
    const payload = {
      nombre: formEdicion.nombre,
      descripcion: formEdicion.descripcion,
      precio: parseInt(formEdicion.precio, 10) || 0,
      duracion_minutos: parseInt(formEdicion.duracion_minutos, 10) || 60,
    }

    const { error } = await supabase
      .from('servicios')
      .update(payload)
      .eq('id', id)

    if (!error) {
      setServicios((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...payload } : s))
      )
      setEditandoId(null)
    } else {
      alert('Error al actualizar el servicio en Supabase: ' + error.message)
    }
  }

  // Eliminar servicio en Supabase
  async function eliminarServicio(s) {
    if (!confirm(`¿Estás segura de que deseas eliminar permanentemente "${s.nombre}"?`)) return

    const { error } = await supabase
      .from('servicios')
      .delete()
      .eq('id', s.id)

    if (!error) {
      setServicios((prev) => prev.filter((item) => item.id !== s.id))
    } else {
      alert('No se pudo eliminar el servicio: ' + error.message)
    }
  }

  // Alternar visibilidad (Activar / Ocultar)
  async function toggleActivo(servicio) {
    const nuevoEstado = !servicio.activo
    const { error } = await supabase
      .from('servicios')
      .update({ activo: nuevoEstado })
      .eq('id', servicio.id)

    if (!error) {
      setServicios((prev) =>
        prev.map((s) => (s.id === servicio.id ? { ...s, activo: nuevoEstado } : s))
      )
    } else {
      alert('Error al cambiar el estado del servicio.')
    }
  }

  // Mover orden (Subir / Bajar card)
  async function moverOrden(index, direccion) {
    const nuevoIndex = direccion === 'arriba' ? index - 1 : index + 1
    if (nuevoIndex < 0 || nuevoIndex >= servicios.length) return

    const nuevaLista = [...servicios]
    const temp = nuevaLista[index]
    nuevaLista[index] = nuevaLista[nuevoIndex]
    nuevaLista[nuevoIndex] = temp

    // Asignar campo orden correlativo
    const listaConOrden = nuevaLista.map((s, idx) => ({ ...s, orden: idx }))
    setServicios(listaConOrden)

    // Guardar cambios en Supabase en segundo plano
    for (const item of listaConOrden) {
      await supabase.from('servicios').update({ orden: item.orden }).eq('id', item.id)
    }
  }

  // Crear nuevo servicio
  async function handleCrearServicio(e) {
    e.preventDefault()
    if (!nuevoNombre || !nuevoPrecio) return
    setGuardando(true)

    const payload = {
      nombre: nuevoNombre,
      precio: parseInt(nuevoPrecio, 10) || 0,
      duracion_minutos: parseInt(nuevaDuracion, 10) || 60,
      descripcion: nuevaDescripcion,
      activo: true,
      orden: servicios.length,
    }

    const { data, error } = await supabase.from('servicios').insert([payload]).select()

    if (!error && data) {
      setServicios((prev) => [...prev, data[0]])
      setNuevoNombre('')
      setNuevoPrecio('')
      setNuevaDuracion('60')
      setNuevaDescripcion('')
      setMostrarFormNuevo(false)
    } else {
      alert('Error al crear el servicio en Supabase.')
    }
    setGuardando(false)
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EBE3DE] shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b border-[#EBE3DE] pb-3">
        <div>
          <h3 className="font-serif text-lg text-[#3D1D1C]">Catálogo de Servicios</h3>
          <p className="text-xs text-[#7A6260]">Edita textos, precios, reordena las tarjetas o elimina servicios</p>
        </div>
        <button
          type="button"
          onClick={() => setMostrarFormNuevo(!mostrarFormNuevo)}
          className="text-xs bg-[#3D1D1C] text-white px-3 py-1.5 rounded-full hover:bg-[#592b2a] transition-colors"
        >
          {mostrarFormNuevo ? 'Cancelar' : '+ Nuevo Servicio'}
        </button>
      </div>

      {/* FORMULARIO NUEVO SERVICIO */}
      {mostrarFormNuevo && (
        <form onSubmit={handleCrearServicio} className="bg-[#FDFBF9] p-4 rounded-xl border border-[#EBE3DE] space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Nombre del tratamiento"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              className="bg-white border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
              required
            />
            <input
              type="number"
              placeholder="Precio ($ CLP)"
              value={nuevoPrecio}
              onChange={(e) => setNuevoPrecio(e.target.value)}
              className="bg-white border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
              required
            />
            <input
              type="number"
              placeholder="Duración (minutos)"
              value={nuevaDuracion}
              onChange={(e) => setNuevaDuracion(e.target.value)}
              className="bg-white border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
              required
            />
          </div>
          <textarea
            placeholder="Descripción corta para la web..."
            value={nuevaDescripcion}
            onChange={(e) => setNuevaDescripcion(e.target.value)}
            className="w-full bg-white border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
            rows={2}
          />
          <button
            type="submit"
            disabled={guardando}
            className="w-full bg-[#3D1D1C] text-white text-xs uppercase tracking-wider py-2 rounded-xl hover:bg-[#592b2a] transition-colors disabled:opacity-50"
          >
            {guardando ? 'Guardando...' : 'Guardar Servicio'}
          </button>
        </form>
      )}

      {/* LISTA DE SERVICIOS */}
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {servicios.map((s, index) => (
          <div
            key={s.id}
            className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors ${
              s.activo !== false ? 'bg-[#FDFBF9] border-[#EBE3DE]' : 'bg-gray-50 border-gray-200 opacity-60'
            }`}
          >
            {editandoId === s.id ? (
              /* MODO EDICIÓN COMPLETA */
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-[#7A6260] uppercase">Nombre</label>
                    <input
                      type="text"
                      value={formEdicion.nombre}
                      onChange={(e) => setFormEdicion({ ...formEdicion, nombre: e.target.value })}
                      className="w-full bg-white border border-[#3D1D1C] rounded-lg px-2.5 py-1 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[#7A6260] uppercase">Precio ($)</label>
                      <input
                        type="number"
                        value={formEdicion.precio}
                        onChange={(e) => setFormEdicion({ ...formEdicion, precio: e.target.value })}
                        className="w-full bg-white border border-[#3D1D1C] rounded-lg px-2.5 py-1 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#7A6260] uppercase">Duración (min)</label>
                      <input
                        type="number"
                        value={formEdicion.duracion_minutos}
                        onChange={(e) => setFormEdicion({ ...formEdicion, duracion_minutos: e.target.value })}
                        className="w-full bg-white border border-[#3D1D1C] rounded-lg px-2.5 py-1 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#7A6260] uppercase">Descripción</label>
                  <textarea
                    value={formEdicion.descripcion}
                    onChange={(e) => setFormEdicion({ ...formEdicion, descripcion: e.target.value })}
                    className="w-full bg-white border border-[#3D1D1C] rounded-lg px-2.5 py-1 text-xs"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setEditandoId(null)}
                    className="text-xs px-3 py-1 border border-gray-300 rounded-lg text-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => guardarEdicion(s.id)}
                    className="text-xs bg-[#3D1D1C] text-white px-4 py-1 rounded-lg hover:bg-[#592b2a]"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            ) : (
              /* MODO VISTA NORMAL */
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                {/* BOTONES REORDENAR */}
                <div className="flex items-center gap-1">
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => moverOrden(index, 'arriba')}
                      disabled={index === 0}
                      className="text-[10px] text-[#7A6260] hover:text-[#3D1D1C] disabled:opacity-20 px-1"
                      title="Subir posición"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => moverOrden(index, 'abajo')}
                      disabled={index === servicios.length - 1}
                      className="text-[10px] text-[#7A6260] hover:text-[#3D1D1C] disabled:opacity-20 px-1"
                      title="Bajar posición"
                    >
                      ▼
                    </button>
                  </div>

                  <div>
                    <span className="font-medium text-[#2D1A19] text-sm">{s.nombre}</span>
                    <p className="text-[11px] text-[#7A6260] line-clamp-1">
                      {s.descripcion || 'Sin descripción'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="font-semibold text-[#3D1D1C] block text-sm">
                      ${(s.precio || 0).toLocaleString('es-CL')}
                    </span>
                    <span className="text-[#7A6260] text-[10px] block">
                      {s.duracion_minutos || 60} min
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 border-l border-[#EBE3DE] pl-3">
                    <button
                      type="button"
                      onClick={() => iniciarEdicion(s)}
                      className="text-xs bg-[#F5F0EB] text-[#3D1D1C] px-2.5 py-1 rounded-lg border border-[#EBE3DE] hover:bg-[#EBE3DE]"
                      title="Editar todo"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleActivo(s)}
                      className={`text-[10px] uppercase font-medium px-2 py-1 rounded-full border ${
                        s.activo !== false
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-200 text-gray-600 border-gray-300'
                      }`}
                    >
                      {s.activo !== false ? 'Activo' : 'Oculto'}
                    </button>

                    <button
                      type="button"
                      onClick={() => eliminarServicio(s)}
                      className="text-xs text-rose-600 hover:text-rose-800 p-1 font-bold"
                      title="Eliminar servicio"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}