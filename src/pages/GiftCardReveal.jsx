import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

// Parte delantera exacta de la Gift Card Lumiere usando tus archivos SVG reales + efecto Foil
function FrenteTarjetaLumiere({ brilloPos }) {
  const foilOffset = brilloPos.activo ? brilloPos.x : 32

  return (
    <div
      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
      className="absolute inset-0 w-full h-full rounded-[22px] sm:rounded-[26px] bg-gradient-to-br from-[#F7F1EC] via-[#F3EAE2] to-[#ECE1D8] text-[#4A2C24] shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_25px_rgba(184,138,114,0.25)] border-[1.5px] border-[#C9A088] overflow-hidden select-none"
    >
      {/* Destello Foil especular limpio que barre la tarjeta al aparecer, mover o girar */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out z-20"
        style={{
          opacity: brilloPos.activo ? 0.85 : 0.25,
          background: `linear-gradient(115deg, transparent ${foilOffset - 28}%, rgba(255, 250, 245, 0.92) ${foilOffset}%, rgba(214, 165, 138, 0.4) ${foilOffset + 14}%, transparent ${foilOffset + 38}%)`,
        }}
      />

      {/* LÍNEA DIVISORIA VERTICAL CENTRAL */}
      <div className="absolute top-[13%] bottom-[13%] left-[44%] w-[1px] bg-gradient-to-b from-transparent via-[#8C5E48]/60 to-transparent pointer-events-none z-10" />

      {/* RAMA BOTÁNICA SUPERIOR DERECHA (Archivo real: /svg/hojasGiftcard.svg) */}
      <img
        src="/svg/hojasGiftcard.svg"
        alt=""
        aria-hidden="true"
        className="absolute -top-0.5 -right-0.5 w-[44%] h-auto object-contain pointer-events-none z-10"
      />

      {/* CONTENIDO PRINCIPAL DIVIDIDO EN 2 COLUMNAS */}
      <div className="relative z-10 w-full h-full grid grid-cols-12 items-center px-3 sm:px-5">
        {/* ================= MITAD IZQUIERDA: LOGO SVG CON EFECTO FOIL COBRIZO ================= */}
        <div className="col-span-5 flex items-center justify-center pr-1">
          <div
            className="w-full max-w-[165px] aspect-[0.88/1] transition-all duration-500"
            style={{
              backgroundImage: `linear-gradient(125deg, #4A2B22 0%, #8C5847 ${Math.max(10, foilOffset - 22)}%, #E6BBA4 ${foilOffset}%, #7A4B3C ${Math.min(90, foilOffset + 22)}%, #3B2019 100%)`,
              WebkitMaskImage: "url('/svg/LogoLumiereSVG2.svg')",
              maskImage: "url('/svg/LogoLumiereSVG2.svg')",
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
            aria-label="Logo Lumiere Studio"
          />
        </div>

        {/* ================= MITAD DERECHA: GIFT CARD (MÁS ANCHA, GRUESA Y ACHATADA) ================= */}
        <div className="col-span-7 flex flex-col items-center justify-center pl-2 pt-7 text-center">
          {/* Bloque tipográfico GIFT + CARD */}
          <div className="flex flex-col items-center leading-none">
            {/* GIFT */}
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                backgroundImage: `linear-gradient(110deg, #8C5847 0%, #E7BFA9 ${foilOffset}%, #5A3328 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0px 1px 0px rgba(255,255,255,0.65))',
              }}
              className="text-[14px] sm:text-[17px] tracking-[0.5em] uppercase font-semibold ml-3 -mb-1 sm:-mb-1.5 z-10 transition-all duration-500"
            >
              GIFT
            </span>

            {/* CARD */}
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                transform: 'scaleX(1.16) scaleY(0.92)',
                backgroundImage: `linear-gradient(115deg, #7A4A3B 0%, #C6927A ${Math.max(8, foilOffset - 18)}%, #F4D5C3 ${foilOffset}%, #6B3E31 ${Math.min(92, foilOffset + 20)}%, #381D16 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0px 1px 0px rgba(255,255,255,0.7))',
              }}
              className="flex items-baseline justify-center font-bold tracking-[0.03em] leading-[0.88] origin-center transition-all duration-500"
            >
              <span className="text-[54px] sm:text-[68px] mr-[1px]">C</span>
              <span className="text-[44px] sm:text-[55px]">ARD</span>
            </h2>
          </div>

          {/* ORNAMENTO CALIGRÁFICO CURVO EN FORMA DE OLA + ESTRELLA CENTRAL ✦ */}
          <div className="w-full max-w-[235px] flex items-center justify-center my-2">
            <svg viewBox="0 0 360 32" className="w-full h-5 overflow-visible">
              <path
                d="M 4 25 C 32 4, 72 8, 108 17 C 134 23, 152 21, 166 13 C 151 19, 134 20, 109 14 C 72 5, 32 2, 4 25 Z"
                fill="#4A2B22"
              />
              <path
                d="M 180 3 L 182.4 13.2 L 191 15.5 L 182.4 17.8 L 180 28 L 177.6 17.8 L 169 15.5 L 177.6 13.2 Z"
                fill="#3D1D1C"
              />
              <path
                d="M 356 23 C 328 3, 288 7, 252 16 C 226 22, 208 20, 194 12 C 209 18, 226 19, 251 13 C 288 4, 328 1, 356 23 Z"
                fill="#4A2B22"
              />
            </svg>
          </div>

          {/* Lema: BELLEZA QUE ILUMINA */}
          <p
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-[8.5px] sm:text-[10px] tracking-[0.34em] uppercase text-[#5C3A30] font-medium"
          >
            BELLEZA QUE ILUMINA
          </p>

          {/* Líneas laterales + Corazón real (w-8 h-8) */}
          <div className="flex items-center justify-center gap-3 mt-1.5 w-full max-w-[175px]">
            <span className="h-[1px] flex-1 bg-[#5C3A30]/55" />
            <div
              className="w-8 h-8 shrink-0 bg-[#3D1D1C]"
              style={{
                WebkitMaskImage: "url('/svg/corazon%20giftcard.svg')",
                maskImage: "url('/svg/corazon%20giftcard.svg')",
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
              aria-hidden="true"
            />
            <span className="h-[1px] flex-1 bg-[#5C3A30]/55" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Formatea fecha YYYY-MM-DD (o ISO) a dd-mm-aaaa
function formatearFechaDDMMAAAA(fechaStr) {
  if (!fechaStr) return 'Válida 3 meses'
  const soloFecha = String(fechaStr).split('T')[0]
  const partes = soloFecha.split('-')
  if (partes.length === 3 && partes[0].length === 4) {
    return `${partes[2]}-${partes[1]}-${partes[0]}`
  }
  return fechaStr
}

// Cara trasera exacta (sin remitente arriba a la derecha y fecha dd-mm-aaaa)
function ReversoTarjetaLumiere({ giftCard }) {
  return (
    <div
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
      }}
      className="absolute inset-0 w-full h-full rounded-[22px] sm:rounded-[26px] bg-[#FAF4EE] text-[#3D1D1C] px-4 py-3 sm:px-8 sm:py-5 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_25px_rgba(184,138,114,0.25)] border-[1.5px] border-[#C9A088] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ONDA DE ACUARELA ESQUINA SUPERIOR IZQUIERDA */}
      <svg
        viewBox="0 0 320 200"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-[44%] h-[36%] pointer-events-none z-0"
        aria-hidden="true"
      >
        <path
          d="M 0 0 L 295 0 C 235 48, 175 64, 118 76 C 65 88, 28 122, 0 172 Z"
          fill="#EFE0D3"
          opacity="0.72"
        />
        <path
          d="M 0 155 C 32 104, 88 76, 172 68"
          fill="none"
          stroke="#DFC4B0"
          strokeWidth="2.2"
          opacity="0.85"
        />
        <path
          d="M 0 185 C 40 124, 102 88, 204 64"
          fill="none"
          stroke="#D7B69E"
          strokeWidth="1.6"
          opacity="0.75"
        />
      </svg>

      {/* ONDA DE ACUARELA ESQUINA INFERIOR DERECHA */}
      <svg
        viewBox="0 0 320 200"
        preserveAspectRatio="none"
        className="absolute bottom-0 right-0 w-[48%] h-[44%] pointer-events-none z-0"
        aria-hidden="true"
      >
        <path
          d="M 320 200 L 18 200 C 82 168, 146 154, 198 118 C 246 84, 282 54, 320 32 Z"
          fill="#EFE0D3"
          opacity="0.76"
        />
        <path
          d="M 320 58 C 272 86, 224 128, 152 162"
          fill="none"
          stroke="#DFC4B0"
          strokeWidth="2.2"
          opacity="0.8"
        />
      </svg>

      {/* RAMA BOTÁNICA SUPERIOR DERECHA (Archivo real: /svg/hojasGiftcard.svg) */}
      <img
        src="/svg/hojasGiftcard.svg"
        alt=""
        aria-hidden="true"
        className="absolute -top-1 -right-1 w-[43%] h-auto object-contain pointer-events-none z-10"
      />

      {/* RAMA BOTÁNICA LATERAL IZQUIERDA (Archivo real: /svg/hoja2.svg) */}
      <img
        src="/svg/hoja2.svg"
        alt=""
        aria-hidden="true"
        className="absolute bottom-[13%] -left-1 w-[21%] sm:w-[22%] h-auto object-contain pointer-events-none z-10"
      />

      {/* ==================== ENCABEZADO: PARA (SIN TEXTO SOBRE LA HOJA DERECHA) ==================== */}
      <div className="relative z-20 flex justify-between items-end border-b border-[#B88A72]/65 pb-1.5 sm:pb-2.5 pt-1 sm:pt-2">
        <div className="text-left min-w-0 max-w-[65%]">
          <span
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-[7px] sm:text-[9px] uppercase tracking-[0.26em] text-[#7A4A3B] font-semibold block leading-none mb-1"
          >
            PARA
          </span>
          <span
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-[13px] sm:text-[19px] text-[#3B2019] font-normal leading-tight block truncate"
          >
            {giftCard.destinatario}
          </span>
        </div>
      </div>

      {/* ==================== CENTRO: ESTRELLA + EXPERIENCIA REGALO + SERVICIO ==================== */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto px-6 sm:px-10">
        {/* Líneas laterales + Estrella de 4 puntas cobriza */}
        <div className="flex items-center justify-center gap-3 w-full max-w-[165px] sm:max-w-[220px] mb-1 sm:mb-2">
          <span className="h-[1px] flex-1 bg-[#B88A72]/75" />
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
            <path
              d="M12 1 L14.6 9.4 L23 12 L14.6 14.6 L12 23 L9.4 14.6 L1 12 L9.4 9.4 Z"
              fill="#9E6248"
            />
          </svg>
          <span className="h-[1px] flex-1 bg-[#B88A72]/75" />
        </div>

        {/* Subtítulo: EXPERIENCIA REGALO */}
        <span
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-[7px] sm:text-[9.5px] uppercase tracking-[0.3em] text-[#5C3A30] font-medium block leading-none"
        >
          EXPERIENCIA REGALO
        </span>

        {/* Nombre del servicio en tipografía editorial */}
        <h3
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-[19px] sm:text-[29px] text-[#8E5641] font-normal leading-tight mt-0.5 sm:mt-1 line-clamp-1"
        >
          {giftCard.servicio_nombre}
        </h3>

        {/* Mensaje con líneas laterales */}
        {giftCard.mensaje && (
          <div className="flex items-center justify-center gap-2.5 w-full max-w-[215px] sm:max-w-[295px] mt-1 sm:mt-1.5">
            <span className="h-[1px] flex-1 bg-[#B88A72]/65" />
            <p
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="italic text-[10px] sm:text-[13.5px] text-[#3B2019] truncate max-w-[140px] sm:max-w-[200px] leading-tight"
            >
              “{giftCard.mensaje}”
            </p>
            <span className="h-[1px] flex-1 bg-[#B88A72]/65" />
          </div>
        )}
      </div>

      {/* ==================== PIE: CÁPSULA CÓDIGO DE CANJE | VIGENCIA (dd-mm-aaaa) ==================== */}
      <div className="relative z-20 flex items-center justify-between bg-[#FAF4EE]/85 backdrop-blur-[2px] rounded-full px-3.5 sm:px-6 py-1.5 sm:py-2.5 border border-[#C59B82]">
        <div className="text-left">
          <span
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-[6.5px] sm:text-[8.5px] uppercase tracking-[0.22em] text-[#5C3A30] font-medium block leading-none mb-0.5 sm:mb-1"
          >
            CÓDIGO DE CANJE
          </span>
          <span
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-[11px] sm:text-[15px] font-semibold tracking-[0.24em] text-[#3B2019] leading-none block"
          >
            {giftCard.codigo}
          </span>
        </div>

        {/* Separador vertical central */}
        <div className="h-5 sm:h-7 w-[1px] bg-[#C59B82]/75 mx-2" />

        <div className="text-right">
          <span
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-[6.5px] sm:text-[8.5px] uppercase tracking-[0.22em] text-[#5C3A30] font-medium block leading-none mb-0.5 sm:mb-1"
          >
            VIGENCIA
          </span>
          <span
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-[10.5px] sm:text-[14px] font-normal tracking-[0.06em] text-[#3B2019] leading-none block"
          >
            {formatearFechaDDMMAAAA(giftCard.fecha_vencimiento)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function GiftCardReveal() {
  // Etapas: 'codigo' -> 'sobre' -> 'revelada'
  const [etapa, setEtapa] = useState('codigo')
  const [codigoInput, setCodigoInput] = useState('')
  const [giftCard, setGiftCard] = useState(null)
  const [buscando, setBuscando] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Fases coreografiadas del sobre:
  // 'cerrado' | 'girandoSello' | 'abriendoListones' | 'cerrandoListones' | 'cerrandoSello'
  const [faseSobre, setFaseSobre] = useState('cerrado')
  const [guardandoTarjeta, setGuardandoTarjeta] = useState(false)

  // Estados para la rotación 180° y brillo Foil
  const [rotada, setRotada] = useState(false)
  const [brilloPos, setBrilloPos] = useState({ x: 32, y: 50, activo: false })
  const [copiado, setCopiado] = useState(false)

  const canvasRef = useRef(null)

  // Partículas ambientales doradas en Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.12,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.03 + 0.01,
    }))

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.y += p.speedY
        p.x += p.speedX
        p.alpha += Math.sin(Date.now() * 0.002) * p.pulse

        if (p.y < 0) {
          p.y = canvas.height + 5
          p.x = Math.random() * canvas.width
        }
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0

        ctx.fillStyle = `rgba(230, 199, 134, ${Math.max(0.08, Math.min(0.85, p.alpha))})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Validar código contra Supabase
  async function handleValidarCodigo(e) {
    e.preventDefault()
    const codigoLimpio = codigoInput.trim().toUpperCase()
    if (!codigoLimpio) return

    setBuscando(true)
    setErrorMsg('')

    const { data, error } = await supabase
      .from('gift_cards')
      .select('*')
      .ilike('codigo', codigoLimpio)
      .maybeSingle()

    if (error || !data) {
      setErrorMsg('No encontramos una Gift Card con ese código. Verifica los caracteres e inténtalo nuevamente.')
      setBuscando(false)
      return
    }

    if (data.estado === 'canjeada') {
      setErrorMsg('Esta Gift Card ya fue canjeada anteriormente en Lumiere Studio.')
      setBuscando(false)
      return
    }

    if (data.estado === 'expirada') {
      setErrorMsg('Esta Gift Card ha superado su fecha de vigencia.')
      setBuscando(false)
      return
    }

    setGiftCard(data)
    setBuscando(false)
    setFaseSobre('cerrado')
    setEtapa('sobre')
  }

  // APERTURA EN 2 PASOS:
  // Paso 1: Sello dorado gira 360° -> Paso 2: Se abren listones bordó y solapa -> Paso 3: Emerge tarjeta 3D
  function handleDesatarSobre() {
    if (faseSobre !== 'cerrado') return
    setFaseSobre('girandoSello')

    // Al terminar el giro 360° del botón (580ms), se abren los listones bordó y la solapa
    setTimeout(() => {
      setFaseSobre('abriendoListones')

      // Al terminar de abrirse los listones (750ms después), emerge la tarjeta
      setTimeout(() => {
        setRotada(false)
        setGuardandoTarjeta(false)
        setEtapa('revelada')
        setFaseSobre('cerrado')

        // Destello automático que recorre la tarjeta apenas termina de emerger
        setTimeout(() => {
          setBrilloPos({ x: 15, y: 50, activo: true })
          setTimeout(() => setBrilloPos({ x: 85, y: 50, activo: true }), 260)
          setTimeout(() => setBrilloPos({ x: 35, y: 50, activo: false }), 950)
        }, 450)
      }, 750)
    }, 580)
  }

  // CIERRE EN REVERSA:
  // Paso 1: La tarjeta se guarda hacia el sobre -> Paso 2: Se cierran listones bordó -> Paso 3: Sello gira -360°
  function handleCerrarSobreReversa() {
    if (guardandoTarjeta) return
    setGuardandoTarjeta(true)

    // Espera a que termine la animación de guardado de la tarjeta (550ms)
    setTimeout(() => {
      setRotada(false)
      setFaseSobre('cerrandoListones')
      setEtapa('sobre')
      setGuardandoTarjeta(false)

      // Luego de cerrarse los listones y solapa (650ms), el sello gira -360° para quedar cerrado
      setTimeout(() => {
        setFaseSobre('cerrandoSello')
        setTimeout(() => {
          setFaseSobre('cerrado')
        }, 580)
      }, 650)
    }, 550)
  }

  // Efecto de destello foil al mover el mouse o dedo sobre la tarjeta
  function handleMovimientoTarjeta(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setBrilloPos({ x, y, activo: true })
  }

  // Al presionar el botón rotar, también hace un barrido de luz foil
  function handleRotarConBrillo() {
    setBrilloPos({ x: rotada ? 20 : 80, y: 50, activo: true })
    setRotada((prev) => !prev)
    setTimeout(() => setBrilloPos((p) => ({ ...p, activo: false })), 750)
  }

  function handleCopiarCodigo() {
    if (!giftCard?.codigo) return
    navigator.clipboard.writeText(giftCard.codigo)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2200)
  }

  // Estados derivados para controlar visualmente el sobre en apertura y reversa
  const listonesAbiertos = faseSobre === 'abriendoListones' || faseSobre === 'cerrandoListones'
  const selloGirando360 = faseSobre === 'girandoSello'
  const selloOculto = faseSobre === 'abriendoListones' || faseSobre === 'cerrandoListones'

  return (
    <div className="min-h-[100dvh] bg-[#140D0C] text-[#FAF6F2] flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans select-none">
      {/* Animaciones personalizadas de revelación y guardado en reversa */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

        @keyframes revelarTarjeta3D {
          0% {
            opacity: 0;
            transform: translateY(75px) scale(0.84) rotateX(28deg) rotateY(-14deg);
          }
          55% {
            opacity: 1;
            transform: translateY(-10px) scale(1.03) rotateX(-5deg) rotateY(5deg);
          }
          80% {
            transform: translateY(3px) scale(0.995) rotateX(2deg) rotateY(-2deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1) rotateX(0deg) rotateY(0deg);
          }
        }

        @keyframes guardarTarjeta3D {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1) rotateX(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(80px) scale(0.84) rotateX(24deg);
          }
        }

        @keyframes fadeUpControls {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .animate-revelar-tarjeta {
          animation: revelarTarjeta3D 1.05s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-guardar-tarjeta {
          animation: guardarTarjeta3D 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-controles-entrada {
          opacity: 0;
          animation: fadeUpControls 0.65s ease-out 0.35s forwards;
        }
      `}</style>

      {/* Resplandor ambiental central */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(184,138,114,0.18)_0%,rgba(29,18,17,0.85)_55%,rgba(16,10,9,1)_95%)] z-0" />

      {/* Canvas de polvo dorado flotante */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-75" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full max-w-[460px] md:max-w-[520px] relative z-10 flex flex-col items-center">
        {/* CINTA SUPERIOR DE MARCA */}
        <div className="w-full flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6C786] shadow-[0_0_8px_rgba(230,199,134,0.9)]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#D0C5B5]">
              Lumiere Studio
            </span>
          </div>
          {giftCard && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A1B1A]/90 border border-[#B88A72]/40 backdrop-blur-md">
              <span className="text-[#E6C786] text-[10px]">✦</span>
              <span className="text-[9px] text-[#E6C786] uppercase tracking-widest font-semibold">
                Autenticado
              </span>
            </div>
          )}
        </div>

        {/* ===================================================================== */}
        {/* ETAPA 1: INGRESO DE CÓDIGO SECRETO (EL CANDADO DEL SOBRE)             */}
        {/* ===================================================================== */}
        {etapa === 'codigo' && (
          <div className="w-full bg-[#FAF6F2] text-[#3D1D1C] rounded-[28px] p-8 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.85)] border border-[#B88A72]/60 relative overflow-hidden transition-all duration-500">
            <div className="absolute inset-3 rounded-[20px] border border-[#B88A72]/35 pointer-events-none" />

            <div className="text-center space-y-2 mb-7 relative z-10">
              <h1 className="font-serif text-3xl sm:text-4xl tracking-wide text-[#3D1D1C]">
                GIFT <span className="italic font-normal text-[#8C5E48]">CARD</span>
              </h1>
              <div className="flex items-center justify-center gap-3 pt-1">
                <span className="h-[1px] w-12 bg-[#B88A72]/50" />
                <span className="text-[#8C5E48] text-xs">✦</span>
                <span className="h-[1px] w-12 bg-[#B88A72]/50" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#7A6260] pt-1">
                Belleza que ilumina
              </p>
            </div>

            <form onSubmit={handleValidarCodigo} className="space-y-5 relative z-10">
              <div className="text-center space-y-2">
                <label className="text-xs text-[#7A6260] block">
                  Ingresa el código secreto impreso en tu tarjeta para desbloquear tu sobre
                </label>
                <input
                  type="text"
                  placeholder="EJ. LUM-8492"
                  value={codigoInput}
                  onChange={(e) => setCodigoInput(e.target.value.toUpperCase())}
                  className="w-full text-center font-mono text-xl sm:text-2xl tracking-[0.25em] uppercase bg-white border border-[#B88A72]/60 rounded-2xl py-3.5 px-4 text-[#3D1D1C] placeholder:text-[#7A6260]/35 focus:outline-none focus:border-[#3D1D1C] shadow-inner"
                  required
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3 text-center">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={buscando}
                className="w-full bg-[#3D1D1C] text-[#FAF6F2] text-xs uppercase tracking-[0.22em] py-4 rounded-2xl hover:bg-[#592b2a] transition-all shadow-lg disabled:opacity-50"
              >
                {buscando ? 'Verificando código...' : 'Continuar al sobre'}
              </button>
            </form>

            <div className="flex items-center justify-center gap-3 mt-7 relative z-10">
              <span className="h-[1px] w-10 bg-[#3D1D1C]/25" />
              <span className="text-[#3D1D1C] text-base">♡</span>
              <span className="h-[1px] w-10 bg-[#3D1D1C]/25" />
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* ETAPA 2: SOBRE BLANCO HUESO CON LISTONES BORDÓ Y SELLO DE LACRE       */}
        {/* ===================================================================== */}
        {etapa === 'sobre' && giftCard && (
          <div
            className={`w-full flex flex-col items-center space-y-6 transition-all duration-700 ${
              faseSobre === 'abriendoListones'
                ? 'scale-105 opacity-0 translate-y-4'
                : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <div className="text-center space-y-1">
              <h2 className="font-serif text-3xl text-[#FAF6F2] italic">
                Un Obsequio Reservado
              </h2>
              <p className="text-xs text-[#D0C5B5]/80 max-w-[290px] mx-auto">
                Para <strong className="text-[#FAF6F2]">{giftCard.destinatario}</strong> — Tienes una experiencia esperando ser descubierta
              </p>
            </div>

            {/* EL SOBRE BLANCO HUESO INTERACTIVO */}
            <div className="relative w-full aspect-[1.52/1] rounded-2xl bg-gradient-to-br from-[#FAF6F2] via-[#F2E9DF] to-[#E6D9CC] shadow-[0_28px_60px_-10px_rgba(0,0,0,0.85),0_0_25px_rgba(250,246,242,0.18)] border border-[#D4C2B2] p-5 flex flex-col justify-between overflow-hidden">
              {/* Marco fino interior del papel */}
              <div className="absolute inset-2 rounded-xl border border-[#B88A72]/30 pointer-events-none z-5" />

              {/* Asomo luminoso de la tarjeta subiendo al abrirse el sobre (y bajando en reversa) */}
              <div
                className={`absolute inset-x-6 bottom-2 h-[78%] rounded-t-xl bg-gradient-to-b from-[#FFFFFF] to-[#F4ECE5] border border-[#C9A088] shadow-2xl transition-all duration-700 ease-out z-5 ${
                  listonesAbiertos ? '-translate-y-12 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              />

              {/* Solapa triangular superior en tono hueso ligeramente sombreado */}
              <div
                className={`absolute top-0 inset-x-0 h-[52%] bg-gradient-to-b from-[#EAE0D5] to-[#DFD2C5] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-[0_8px_18px_rgba(61,29,28,0.12)] pointer-events-none z-10 origin-top transition-transform duration-700 ease-in-out ${
                  listonesAbiertos ? '-scale-y-0 opacity-0' : 'scale-y-100 opacity-100'
                }`}
              />
              {/* Filo cobrizo en el borde de la solapa */}
              <div
                className={`absolute top-0 inset-x-0 h-[52.5%] bg-gradient-to-b from-transparent via-[#B88A72]/20 to-[#8C5E48]/45 [clip-path:polygon(0_0,100%_0,50%_100%)] pointer-events-none z-10 transition-opacity duration-500 ${
                  listonesAbiertos ? 'opacity-0' : 'opacity-70'
                }`}
              />

              {/* Listón horizontal BORDÓ */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8 bg-gradient-to-r from-[#3D161A] via-[#5C2026] to-[#3D161A] shadow-[0_4px_14px_rgba(61,22,26,0.38)] flex items-center justify-center z-15 transition-transform duration-700 ease-in-out ${
                  listonesAbiertos ? 'scale-x-0' : 'scale-x-100'
                }`}
              >
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E6C786]/65 to-transparent" />
              </div>

              {/* Listón vertical BORDÓ */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 bg-gradient-to-b from-[#5C2026] via-[#3D161A] to-[#5C2026] shadow-[0_0_16px_rgba(61,22,26,0.4)] flex justify-center z-15 transition-transform duration-700 ease-in-out ${
                  listonesAbiertos ? 'scale-y-0' : 'scale-y-100'
                }`}
              >
                <div className="h-full w-[1px] bg-gradient-to-b from-[#E6C786]/65 via-[#E6C786]/35 to-transparent" />
              </div>

              {/* Detalles superiores sobre el papel blanco hueso */}
              <div className="relative z-20 flex justify-between items-start w-full pointer-events-none">
                <div className="flex flex-col">
                  <span className="text-[9px] tracking-[0.22em] text-[#5C2026] uppercase font-bold">
                    Lumiere Studio
                  </span>
                  <span className="text-[10px] text-[#7A6260]">Edición Exclusiva</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#3D161A]/10 border border-[#5C2026]/25 backdrop-blur-sm">
                  <span className="font-mono text-[10px] text-[#4A1B20] font-semibold tracking-wider">
                    {giftCard.codigo}
                  </span>
                </div>
              </div>

              {/* SELLO DE LACRE DORADO CON GIRO 360° ANTES DE ABRIR LISTONES */}
              <div className="relative z-30 flex items-center justify-center my-auto">
                <button
                  type="button"
                  onClick={handleDesatarSobre}
                  aria-label="Girar sello y abrir sobre"
                  style={{
                    transform: selloGirando360
                      ? 'rotate(360deg) scale(1.08)'
                      : selloOculto
                      ? 'rotate(360deg) scale(0.5)'
                      : 'rotate(0deg) scale(1)',
                  }}
                  className={`group relative w-[76px] h-[76px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#F5DFAD] via-[#D8B47C] to-[#8C5E48] shadow-[0_10px_25px_rgba(61,22,26,0.45),0_0_25px_rgba(230,199,134,0.4)] active:scale-95 transition-all duration-500 ease-in-out focus:outline-none cursor-pointer ${
                    selloOculto ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-105'
                  }`}
                >
                  <div className="absolute -inset-2.5 rounded-full bg-[#E6C786]/35 blur-sm animate-ping pointer-events-none" />
                  <div className="absolute inset-1 rounded-full border border-[#3D161A]/35 pointer-events-none" />

                  <svg
                    className="w-11 h-11 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
                    fill="none"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="44" stroke="#3D161A" strokeOpacity="0.4" strokeWidth="2" />
                    <circle cx="50" cy="50" r="38" stroke="#3D161A" strokeDasharray="3 3" strokeWidth="1.5" />
                    <path
                      d="M50 15L59 41L85 50L59 59L50 85L41 59L15 50L41 41L50 15Z"
                      fill="#3D161A"
                      fillOpacity="0.92"
                    />
                    <circle cx="50" cy="50" fill="#FAF6F2" r="5" />
                  </svg>
                </button>
              </div>

              {/* Pie del sobre */}
              <div className="relative z-20 flex justify-end items-end w-full pointer-events-none">
                <span className="font-serif italic text-sm text-[#4A1B20] font-medium">
                  De: {giftCard.remitente}
                </span>
              </div>
            </div>

            {/* Botón Principal Dorado */}
            <div className="w-full space-y-2 text-center pt-1">
              <button
                type="button"
                onClick={handleDesatarSobre}
                disabled={faseSobre !== 'cerrado'}
                className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#F3DCAB] via-[#E2C083] to-[#C69B63] py-4 px-6 text-[#2D1A19] shadow-[0_12px_32px_rgba(230,199,134,0.28)] active:scale-[0.98] transition-all disabled:opacity-75 cursor-pointer"
              >
                <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <span>✦</span> Tocar para desatar y revelar
                </span>
              </button>
              <p className="text-[10px] text-[#D0C5B5]/60 uppercase tracking-wider">
                Presiona el sello dorado o el botón para abrir tu tarjeta
              </p>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* ETAPA 3: TARJETA FÍSICA RECREADA CON ANIMACIÓN DE EMERGENCIA + 180°   */}
        {/* ===================================================================== */}
        {etapa === 'revelada' && giftCard && (
          <div className="w-full space-y-5">
            <div
              className={`text-center space-y-0.5 transition-opacity duration-300 ${
                guardandoTarjeta ? 'opacity-0' : 'animate-controles-entrada'
              }`}
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#E6C786] block">
                {rotada ? 'Detalles de tu Experiencia' : 'Tu Gift Card Oficial'}
              </span>
              <p className="text-xs text-[#D0C5B5]/80">
                {rotada
                  ? 'Presenta este código al agendar o asistir a tu cita'
                  : 'Gira la tarjeta para descubrir el tratamiento incluido'}
              </p>
            </div>

            {/* ESCENARIO 3D CON ANIMACIÓN DE EMERGENCIA Y GUARDADO EN REVERSA */}
            <div
              className={`relative w-full [perspective:1500px] ${
                guardandoTarjeta ? 'animate-guardar-tarjeta' : 'animate-revelar-tarjeta'
              }`}
              onMouseMove={handleMovimientoTarjeta}
              onTouchMove={handleMovimientoTarjeta}
              onMouseLeave={() => setBrilloPos((p) => ({ ...p, activo: false }))}
            >
              {/* Halo cobrizo detrás de la tarjeta */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#B88A72]/25 via-[#E6C786]/15 to-transparent rounded-3xl blur-2xl pointer-events-none" />

              {/* CONTENEDOR ROTABLE 180° */}
              <div
                onClick={handleRotarConBrillo}
                style={{
                  transform: rotada ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full aspect-[1.586/1] transition-transform duration-700 ease-out cursor-pointer"
              >
                {/* ==================== CARA FRONTAL (DISEÑO EXACTO TARJETA LUMIERE + FOIL) ==================== */}
                <FrenteTarjetaLumiere brilloPos={brilloPos} />

                {/* ==================== CARA TRASERA (NUEVO DISEÑO BOTÁNICO CON ONDAS) ==================== */}
                <ReversoTarjetaLumiere giftCard={giftCard} />
              </div>
            </div>

            {/* CONTROLES INTERACTIVOS BAJO LA TARJETA (ROTAR 180° Y COPIAR CÓDIGO) */}
            <div
              className={`grid grid-cols-2 gap-2.5 transition-opacity duration-300 ${
                guardandoTarjeta ? 'opacity-0' : 'animate-controles-entrada'
              }`}
            >
              <button
                type="button"
                onClick={handleRotarConBrillo}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#261716] hover:bg-[#34201F] border border-[#B88A72]/50 text-[#FAF6F2] transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <span
                  className={`text-[#E6C786] text-base transition-transform duration-500 ${
                    rotada ? 'rotate-180' : ''
                  }`}
                >
                  ↻
                </span>
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  Rotar Tarjeta
                </span>
              </button>

              <button
                type="button"
                onClick={handleCopiarCodigo}
                className="flex items-center justify-center py-3 px-4 rounded-2xl bg-[#261716] hover:bg-[#34201F] border border-[#B88A72]/50 text-[#FAF6F2] transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  {copiado ? 'Código Copiado' : 'Copiar Código'}
                </span>
              </button>
            </div>

            {/* BOTÓN PRINCIPAL PARA AGENDAR */}
            <div
              className={`space-y-2.5 pt-1 transition-opacity duration-300 ${
                guardandoTarjeta ? 'opacity-0' : 'animate-controles-entrada'
              }`}
            >
              <Link
                to="/agenda"
                className="block w-full text-center bg-gradient-to-r from-[#F3DCAB] via-[#E2C083] to-[#C69B63] text-[#2D1A19] font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-full shadow-lg hover:brightness-105 transition-all"
              >
                Agendar mi cita ahora
              </Link>
              <button
                type="button"
                onClick={handleCerrarSobreReversa}
                disabled={guardandoTarjeta}
                className="w-full text-center py-2 text-[11px] text-[#D0C5B5]/70 hover:text-[#FAF6F2] uppercase tracking-widest transition-colors cursor-pointer"
              >
                ↺ Volver a cerrar el sobre
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enlace discreto para volver a la web */}
      <Link
        to="/"
        className="mt-8 text-[10px] text-[#FAF6F2]/50 hover:text-[#FAF6F2] tracking-[0.25em] uppercase transition-colors z-10"
      >
        ← Volver a Lumiere Studio
      </Link>
    </div>
  )
}