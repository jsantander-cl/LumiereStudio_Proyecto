// supabase/functions/crear-evento-calendario/index.ts
//
// Recibe el id de una reserva ya guardada + sus datos, crea el evento
// correspondiente en el Google Calendar del negocio (autenticándose como
// cuenta de servicio), y actualiza esa misma fila en "reservas" con el
// resultado (google_event_id + estado), usando el service_role key
// (que puede saltarse RLS, a diferencia del cliente público).

import { create, getNumericDate } from 'https://deno.land/x/djwt@v3.0.2/mod.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GOOGLE_CLIENT_EMAIL = Deno.env.get('GOOGLE_CLIENT_EMAIL')!
const GOOGLE_PRIVATE_KEY = Deno.env.get('GOOGLE_PRIVATE_KEY')!
const GOOGLE_CALENDAR_ID = Deno.env.get('GOOGLE_CALENDAR_ID')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL')!

// Mientras no haya un dominio propio verificado en Resend, solo se puede
// enviar desde esta dirección de prueba, y solo llega a la casilla con la
// que te registraste en Resend. Al verificar tu dominio, cambia esto por
// algo como "Lumiere Studio <reservas@lumierestudio.cl>".
const FROM_EMAIL = 'Lumiere Studio <onboarding@resend.dev>'

// SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY vienen inyectados automáticamente
// en toda Edge Function -- no hace falta configurarlos como secrets manuales.
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const pemBody = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\\n/g, '')
    .replace(/\n/g, '')
    .trim()

  const binaryDer = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0))

  return crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )
}

async function obtenerAccessToken(): Promise<string> {
  const privateKey = await importPrivateKey(GOOGLE_PRIVATE_KEY)

  const jwt = await create(
    { alg: 'RS256', typ: 'JWT' },
    {
      iss: GOOGLE_CLIENT_EMAIL,
      scope: 'https://www.googleapis.com/auth/calendar',
      aud: 'https://oauth2.googleapis.com/token',
      exp: getNumericDate(60 * 60),
      iat: getNumericDate(0),
    },
    privateKey
  )

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Error obteniendo access token de Google: ${err}`)
  }

  const data = await res.json()
  return data.access_token
}

function formatearFechaLarga(fechaStr: string): string {
  const [y, m, d] = fechaStr.split('-').map(Number)
  const fecha = new Date(y, m - 1, d)
  const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ]
  return `${dias[fecha.getDay()]} ${d} de ${meses[m - 1]}`
}

async function enviarEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`Error enviando email a ${to}:`, err)
    return false
  }
  return true
}

async function enviarNotificaciones({
  servicio_nombre,
  cliente_nombre,
  cliente_email,
  cliente_telefono,
  fecha,
  hora_inicio,
  notas,
}: {
  servicio_nombre: string
  cliente_nombre: string
  cliente_email: string
  cliente_telefono: string
  fecha: string
  hora_inicio: string
  notas?: string
}) {
  const fechaLarga = formatearFechaLarga(fecha)

  const htmlCliente = `
    <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #3a2a25;">
      <h2 style="font-weight: normal;">¡Tu reserva está confirmada!</h2>
      <p>Hola ${cliente_nombre}, te esperamos en Lumiere Studio.</p>
      <div style="background: #f4ece7; border-radius: 12px; padding: 16px 20px; margin: 20px 0;">
        <p style="margin: 4px 0;"><strong>Servicio:</strong> ${servicio_nombre}</p>
        <p style="margin: 4px 0;"><strong>Fecha:</strong> ${fechaLarga}</p>
        <p style="margin: 4px 0;"><strong>Hora:</strong> ${hora_inicio} hrs</p>
      </div>
      <p style="font-size: 14px; color: #7a6a63;">
        Si necesitas reprogramar o cancelar, contáctanos respondiendo este correo.
      </p>
    </div>
  `

  const htmlAdmin = `
    <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #3a2a25;">
      <h2 style="font-weight: normal;">Nueva reserva</h2>
      <div style="background: #f4ece7; border-radius: 12px; padding: 16px 20px; margin: 20px 0;">
        <p style="margin: 4px 0;"><strong>Servicio:</strong> ${servicio_nombre}</p>
        <p style="margin: 4px 0;"><strong>Fecha:</strong> ${fechaLarga}</p>
        <p style="margin: 4px 0;"><strong>Hora:</strong> ${hora_inicio} hrs</p>
        <p style="margin: 4px 0;"><strong>Cliente:</strong> ${cliente_nombre}</p>
        <p style="margin: 4px 0;"><strong>Email:</strong> ${cliente_email}</p>
        <p style="margin: 4px 0;"><strong>Teléfono:</strong> ${cliente_telefono}</p>
        ${notas ? `<p style="margin: 4px 0;"><strong>Notas:</strong> ${notas}</p>` : ''}
      </div>
    </div>
  `

  // No usamos Promise.all para que un fallo en uno no cancele el otro.
  const okCliente = await enviarEmail(
    cliente_email,
    'Tu reserva en Lumiere Studio está confirmada',
    htmlCliente
  )
  const okAdmin = await enviarEmail(ADMIN_EMAIL, `Nueva reserva: ${cliente_nombre}`, htmlAdmin)

  return { okCliente, okAdmin }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  let reserva_id: string | undefined

  try {
    const body = await req.json()
    reserva_id = body.reserva_id

    const {
      servicio_nombre,
      cliente_nombre,
      cliente_email,
      cliente_telefono,
      fecha,
      hora_inicio,
      hora_fin,
      notas,
    } = body

    if (!reserva_id || !servicio_nombre || !fecha || !hora_inicio || !hora_fin) {
      return new Response(
        JSON.stringify({ error: 'Faltan datos requeridos para crear el evento.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const accessToken = await obtenerAccessToken()
    const TIMEZONE = 'America/Santiago'

    const evento = {
      summary: `${servicio_nombre} — ${cliente_nombre}`,
      description: [
        `Servicio: ${servicio_nombre}`,
        `Cliente: ${cliente_nombre}`,
        `Email: ${cliente_email}`,
        `Teléfono: ${cliente_telefono}`,
        notas ? `Notas: ${notas}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
      start: { dateTime: `${fecha}T${hora_inicio}:00`, timeZone: TIMEZONE },
      end: { dateTime: `${fecha}T${hora_fin}:00`, timeZone: TIMEZONE },
      // Sin "attendees": las cuentas de servicio no pueden invitar sin
      // Domain-Wide Delegation. Los datos del cliente van en la descripción.
      reminders: {
        useDefault: false,
        overrides: [{ method: 'email', minutes: 24 * 60 }],
      },
    }

    const calRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evento),
      }
    )

    if (!calRes.ok) {
      const err = await calRes.text()
      throw new Error(`Error creando evento en Google Calendar: ${err}`)
    }

    const eventoCreado = await calRes.json()

    // Actualizamos la reserva ya existente con el resultado. Como usamos
    // el service_role key, esto se salta RLS -- es seguro porque corre
    // solo dentro de la Edge Function, nunca expuesto al navegador.
    const { error: updateError } = await supabaseAdmin
      .from('reservas')
      .update({
        google_event_id: eventoCreado.id,
        estado: 'confirmada',
      })
      .eq('id', reserva_id)

    if (updateError) {
      throw new Error(`Evento creado en Calendar pero no se pudo actualizar la reserva: ${updateError.message}`)
    }

    // El envío de correos no debe bloquear la respuesta al cliente ni
    // hacer fallar la reserva si Resend tiene algún problema puntual.
    const { okCliente, okAdmin } = await enviarNotificaciones({
      servicio_nombre,
      cliente_nombre,
      cliente_email,
      cliente_telefono,
      fecha,
      hora_inicio,
      notas,
    }).catch((e) => {
      console.error('Error enviando notificaciones:', e)
      return { okCliente: false, okAdmin: false }
    })

    return new Response(
      JSON.stringify({
        google_event_id: eventoCreado.id,
        htmlLink: eventoCreado.htmlLink,
        emailCliente: okCliente,
        emailAdmin: okAdmin,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error(error)

    // Si falló la sincronización, dejamos constancia en la reserva
    // (que ya existe en la tabla) para que el admin la revise manualmente.
    if (reserva_id) {
      await supabaseAdmin
        .from('reservas')
        .update({ estado: 'pendiente', notas: `[Error sync Calendar: ${error.message}]` })
        .eq('id', reserva_id)
        .then(() => {})
        .catch(() => {})
    }

    return new Response(
      JSON.stringify({ error: error.message || 'Error desconocido creando el evento.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})