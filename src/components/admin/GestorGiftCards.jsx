import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function GestorGiftCards({ giftCards, setGiftCards, servicios }) {
  const [destinatario, setDestinatario] = useState('')
  const [remitente, setRemitente] = useState('')
  const [servicioId, setServicioId] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [fechaVencimiento, setFechaVencimiento] = useState(() => {
    const d = new Date()
    d.setMonth(d.getMonth() + 3) // 3 meses de vigencia por defecto
    return d.toISOString().split('T')[0]
  })
  const [creando, setCreando] = useState(false)
  const [mostrarQRUniversal, setMostrarQRUniversal] = useState(false)

  // Filtramos dinámicamente desde la tabla `servicios` de Supabase sin hardcodear nada
  const packsGiftCard = (servicios || []).filter((s) => s.es_pack_giftcard === true)
  const serviciosIndividuales = (servicios || []).filter((s) => !s.es_pack_giftcard)

  // URL pública fija donde apuntará el QR impreso en todas las tarjetas
  const urlRegaloPublica = `${window.location.origin}/regalo`
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&color=3D1D1C&bgcolor=FAF6F2&data=${encodeURIComponent(
    urlRegaloPublica
  )}`

  // Generador de código único estilo LUM-4829
  function generarCodigoUnico() {
    const num = Math.floor(1000 + Math.random() * 9000)
    return `LUM-${num}`
  }

  async function handleCrearGiftCard(e) {
    e.preventDefault()
    if (!destinatario || !remitente || !servicioId) return
    setCreando(true)

    const servicioObj = servicios.find((s) => s.id === servicioId)
    const nuevoCodigo = generarCodigoUnico()

    const payload = {
      codigo: nuevoCodigo,
      destinatario: destinatario.trim(),
      remitente: remitente.trim(),
      servicio_id: servicioId,
      servicio_nombre: servicioObj ? servicioObj.nombre : 'Tratamiento Lumiere',
      mensaje:
        mensaje.trim() ||
        'Un momento pensado especialmente para iluminar tu belleza natural.',
      estado: 'activa',
      fecha_vencimiento: fechaVencimiento || null,
    }

    const { data, error } = await supabase
      .from('gift_cards')
      .insert([payload])
      .select()

    if (!error && data) {
      setGiftCards((prev) => [data[0], ...prev])
      setDestinatario('')
      setRemitente('')
      setServicioId('')
      setMensaje('')
    } else {
      alert('Error al crear la Gift Card: ' + (error?.message || ''))
    }
    setCreando(false)
  }

  async function cambiarEstado(id, nuevoEstado) {
    const { error } = await supabase
      .from('gift_cards')
      .update({ estado: nuevoEstado })
      .eq('id', id)

    if (!error) {
      setGiftCards((prev) =>
        prev.map((gc) => (gc.id === id ? { ...gc, estado: nuevoEstado } : gc))
      )
    }
  }

  async function eliminarGiftCard(id) {
    if (!confirm('¿Eliminar permanentemente esta Gift Card?')) return
    const { error } = await supabase.from('gift_cards').delete().eq('id', id)
    if (!error) {
      setGiftCards((prev) => prev.filter((gc) => gc.id !== id))
    }
  }

  function copiarCodigo(gc) {
    const texto = `✨ ¡Hola ${gc.destinatario}! Has recibido una Gift Card de Lumiere Studio de parte de ${gc.remitente}.\n\n🎁 Descubre tu regalo ingresando a: ${urlRegaloPublica}\n🔑 Tu código secreto es: *${gc.codigo}*`
    navigator.clipboard.writeText(texto)
    alert(`¡Invitación y código ${gc.codigo} copiados al portapapeles!`)
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EBE3DE] shadow-sm space-y-5">
      {/* CABECERA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#EBE3DE] pb-3">
        <div>
          <h3 className="font-serif text-lg text-[#3D1D1C]">Gestión de Gift Cards</h3>
          <p className="text-xs text-[#7A6260]">
            Genera códigos secretos para tarjetas físicas o digitales
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMostrarQRUniversal(!mostrarQRUniversal)}
          className="text-xs bg-[#F5F0EB] text-[#3D1D1C] border border-[#DCD0C7] px-3.5 py-1.5 rounded-full hover:bg-[#EBE3DE] transition-colors font-medium"
        >
          {mostrarQRUniversal ? 'Ocultar QR Imprenta' : '🏁 Ver QR Universal (Imprenta)'}
        </button>
      </div>

      {/* PANEL DESPLEGABLE DEL QR UNIVERSAL PARA LA PARTE TRASERA */}
      {mostrarQRUniversal && (
        <div className="bg-[#FAF6F2] p-4 rounded-2xl border border-[#B88A72]/40 flex flex-col sm:flex-row items-center gap-4">
          <img
            src={qrImageUrl}
            alt="QR Universal Lumiere"
            className="w-28 h-28 rounded-xl border border-[#DCD0C7] bg-white p-1"
          />
          <div className="space-y-1.5 text-xs text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#B88A72] font-bold block">
              Código QR Único para Diseño Impreso
            </span>
            <p className="text-[#2D1A19]">
              Este QR dirige siempre a{' '}
              <strong className="text-[#3D1D1C]">{urlRegaloPublica}</strong>. Úsalo en
              todas tus tarjetas impresas; cada clienta activará la suya con su código
              secreto.
            </p>
            <a
              href={qrImageUrl}
              target="_blank"
              rel="noreferrer"
              download="QR-GiftCard-Lumiere.png"
              className="inline-block mt-1 bg-[#3D1D1C] text-white px-3 py-1 rounded-lg text-[11px] hover:bg-[#592b2a]"
            >
              Abrir / Guardar Imagen QR
            </a>
          </div>
        </div>
      )}

      {/* FORMULARIO CREAR GIFT CARD */}
      <form onSubmit={handleCrearGiftCard} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Para (Nombre destinatario)"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value)}
            className="bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
            required
          />
          <input
            type="text"
            placeholder="De parte de (Quien regala)"
            value={remitente}
            onChange={(e) => setRemitente(e.target.value)}
            className="bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
            required
          />
          <select
            value={servicioId}
            onChange={(e) => setServicioId(e.target.value)}
            className="bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
            required
          >
            <option value="">Selecciona tratamiento o pack...</option>

            {packsGiftCard.length > 0 && (
              <optgroup label="✦ Packs Gift Card">
                {packsGiftCard.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} (${(p.precio || 0).toLocaleString('es-CL')})
                  </option>
                ))}
              </optgroup>
            )}

            <optgroup label="✦ Servicios Individuales">
              {serviciosIndividuales.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre} (${(s.precio || 0).toLocaleString('es-CL')})
                </option>
              ))}
            </optgroup>
          </select>
          <input
            type="date"
            title="Fecha de vencimiento"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Mensaje o dedicatoria personalizada (opcional)..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="flex-1 bg-[#FDFBF9] border border-[#DCD0C7] rounded-xl px-3 py-1.5 text-xs text-[#2D1A19]"
          />
          <button
            type="submit"
            disabled={creando}
            className="bg-[#3D1D1C] text-white text-xs uppercase tracking-wider px-5 py-2 rounded-xl hover:bg-[#592b2a] transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {creando ? 'Generando...' : '+ Generar Código Gift Card'}
          </button>
        </div>
      </form>

      {/* LISTADO DE GIFT CARDS EMITIDAS */}
      <div className="space-y-2 max-h-56 overflow-y-auto pt-2 border-t border-[#F5F0EB]">
        {giftCards && giftCards.length > 0 ? (
          giftCards.map((gc) => (
            <div
              key={gc.id}
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 rounded-xl border text-xs ${
                gc.estado === 'activa'
                  ? 'bg-[#FDFBF9] border-[#EBE3DE]'
                  : 'bg-gray-50 border-gray-200 opacity-70'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm bg-[#3D1D1C] text-white px-2.5 py-0.5 rounded-md tracking-wider">
                    {gc.codigo}
                  </span>
                  <span className="font-semibold text-[#3D1D1C]">{gc.servicio_nombre}</span>
                </div>
                <p className="text-[11px] text-[#7A6260]">
                  Para: <strong className="text-[#2D1A19]">{gc.destinatario}</strong> · De:{' '}
                  <strong className="text-[#2D1A19]">{gc.remitente}</strong>
                  {gc.fecha_vencimiento && ` · Vence: ${gc.fecha_vencimiento}`}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => copiarCodigo(gc)}
                  className="text-[11px] bg-[#F5F0EB] text-[#3D1D1C] px-2.5 py-1 rounded-lg border border-[#DCD0C7] hover:bg-[#EBE3DE]"
                  title="Copiar mensaje para WhatsApp"
                >
                  📋 Copiar
                </button>

                <select
                  value={gc.estado}
                  onChange={(e) => cambiarEstado(gc.id, e.target.value)}
                  className={`text-[10px] uppercase font-semibold px-2 py-1 rounded-full border ${
                    gc.estado === 'activa'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : gc.estado === 'canjeada'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  <option value="activa">Activa</option>
                  <option value="canjeada">Canjeada</option>
                  <option value="expirada">Expirada</option>
                </select>

                <button
                  type="button"
                  onClick={() => eliminarGiftCard(gc.id)}
                  className="text-rose-600 hover:text-rose-800 font-bold px-1 text-xs"
                  title="Eliminar Gift Card"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-[#7A6260] italic">
            Aún no has emitido ninguna Gift Card.
          </p>
        )}
      </div>
    </div>
  )
}