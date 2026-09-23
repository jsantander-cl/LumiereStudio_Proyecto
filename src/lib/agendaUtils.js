import { supabase } from './supabaseClient'

// Convierte "08:00" a minutos desde medianoche (480)
function horaAMinutos(hora) {
  const [h, m] = hora.split(':').map(Number)
  return h * 60 + m
}

function minutosAHora(minutos) {
  const h = Math.floor(minutos / 60).toString().padStart(2, '0')
  const m = (minutos % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

/**
 * Calcula los horarios disponibles para una fecha y servicio dados.
 * Cruza: horario de atención del día, reservas existentes y bloqueos.
 */
export async function obtenerHorariosDisponibles(fecha, duracionMinutos) {
  const diaSemana = new Date(fecha + 'T00:00:00').getDay()

  const { data: horario, error: errHorario } = await supabase
    .from('horarios_atencion')
    .select('hora_inicio, hora_fin')
    .eq('dia_semana', diaSemana)
    .eq('activo', true)
    .maybeSingle()

  if (errHorario || !horario) return []

  const { data: reservas, error: errReservas } = await supabase
    .from('reservas')
    .select('hora_inicio, hora_fin')
    .eq('fecha', fecha)
    .in('estado', ['pendiente', 'confirmada', 'pagada'])

  if (errReservas) throw errReservas

  const { data: bloqueos, error: errBloqueos } = await supabase
    .from('bloqueos')
    .select('hora_inicio, hora_fin')
    .eq('fecha', fecha)

  if (errBloqueos) throw errBloqueos

  if (bloqueos.some((b) => b.hora_inicio === null)) return []

  const inicioAtencion = horaAMinutos(horario.hora_inicio)
  const finAtencion = horaAMinutos(horario.hora_fin)

  const ocupados = [
    ...reservas.map((r) => ({
      inicio: horaAMinutos(r.hora_inicio),
      fin: horaAMinutos(r.hora_fin),
    })),
    ...bloqueos
      .filter((b) => b.hora_inicio !== null)
      .map((b) => ({
        inicio: horaAMinutos(b.hora_inicio),
        fin: horaAMinutos(b.hora_fin),
      })),
  ]

  const PASO = 15
  const slotsDisponibles = []

  for (let inicio = inicioAtencion; inicio + duracionMinutos <= finAtencion; inicio += PASO) {
    const fin = inicio + duracionMinutos
    const seSolapa = ocupados.some((o) => inicio < o.fin && fin > o.inicio)

    if (!seSolapa) {
      slotsDisponibles.push({
        hora_inicio: minutosAHora(inicio),
        hora_fin: minutosAHora(fin),
      })
    }
  }

  const hoy = new Date()
  const esHoy = fecha === hoy.toISOString().split('T')[0]
  if (esHoy) {
    const minutosAhora = hoy.getHours() * 60 + hoy.getMinutes()
    return slotsDisponibles.filter((s) => horaAMinutos(s.hora_inicio) > minutosAhora)
  }

  return slotsDisponibles
}

/**
 * Crea la reserva en Supabase (con un id generado en el navegador para poder
 * referenciarla después, ya que el cliente público no tiene permiso de leer
 * filas de vuelta), y luego espera la confirmación de la Edge Function que
 * sincroniza el evento con Google Calendar antes de devolver el control.
 *
 * Si el paso de Calendar falla, la reserva NO se pierde -- queda guardada
 * en estado 'pendiente' con una nota del error, para que el admin la revise
 * y sincronice manualmente. Al usuario se le informa que su horario quedó
 * reservado pero que la confirmación final está pendiente.
 */
export async function crearReserva({
  servicio_id,
  servicio_nombre,
  cliente_nombre,
  cliente_email,
  cliente_telefono,
  fecha,
  hora_inicio,
  hora_fin,
  notas,
}) {
  const reservaId = crypto.randomUUID()

  const { error: insertError } = await supabase.from('reservas').insert({
    id: reservaId,
    servicio_id,
    cliente_nombre,
    cliente_email,
    cliente_telefono,
    fecha,
    hora_inicio,
    hora_fin,
    notas,
    estado: 'pendiente',
  })

  if (insertError) {
    if (insertError.code === '23505') {
      throw new Error('Ese horario ya fue reservado por otra persona. Elige otro.')
    }
    throw insertError
  }

  // El horario ya está bloqueado en la base de datos. Ahora esperamos
  // la confirmación real de Google Calendar antes de avisar éxito.
  const { data, error: calendarError } = await supabase.functions.invoke(
    'crear-evento-calendario',
    {
      body: {
        reserva_id: reservaId,
        servicio_nombre,
        cliente_nombre,
        cliente_email,
        cliente_telefono,
        fecha,
        hora_inicio,
        hora_fin,
        notas,
      },
    }
  )

  if (calendarError) {
    // La reserva SÍ quedó guardada (el horario está protegido), pero no
    // se pudo sincronizar con Calendar. Se lo hacemos saber al usuario.
    return {
      fecha,
      hora_inicio,
      hora_fin,
      sincronizada: false,
    }
  }

  return {
    fecha,
    hora_inicio,
    hora_fin,
    sincronizada: true,
    google_event_id: data?.google_event_id ?? null,
  }
}