// supabase/functions/cancelar-evento-calendario/index.ts
//
// Elimina un evento del Google Calendar del negocio dado su google_event_id.
// Se llama desde el panel admin al cancelar una reserva.

import { create, getNumericDate } from 'https://deno.land/x/djwt@v3.0.2/mod.ts'

const GOOGLE_CLIENT_EMAIL = Deno.env.get('GOOGLE_CLIENT_EMAIL')!
const GOOGLE_PRIVATE_KEY = Deno.env.get('GOOGLE_PRIVATE_KEY')!
const GOOGLE_CALENDAR_ID = Deno.env.get('GOOGLE_CALENDAR_ID')!

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
    console.error('Error obteniendo access token:', err)
    throw new Error(`Error obteniendo access token de Google: ${err}`)
  }

  const data = await res.json()
  return data.access_token
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { google_event_id } = body

    console.log('Petición recibida. google_event_id:', google_event_id)
    console.log('Usando GOOGLE_CALENDAR_ID:', GOOGLE_CALENDAR_ID)

    if (!google_event_id) {
      console.error('Falta google_event_id en el body recibido:', JSON.stringify(body))
      return new Response(JSON.stringify({ error: 'Falta google_event_id.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const accessToken = await obtenerAccessToken()
    console.log('Access token obtenido correctamente.')

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      GOOGLE_CALENDAR_ID
    )}/events/${encodeURIComponent(google_event_id)}`

    console.log('Llamando a DELETE:', url)

    const calRes = await fetch(url, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    console.log('Respuesta de Google Calendar. Status:', calRes.status)

    if (!calRes.ok && calRes.status !== 410) {
      const err = await calRes.text()
      console.error('Error eliminando evento. Body de respuesta:', err)
      throw new Error(`Error eliminando evento de Google Calendar (status ${calRes.status}): ${err}`)
    }

    console.log('Evento eliminado (o ya no existía) correctamente.')

    return new Response(JSON.stringify({ ok: true, status: calRes.status }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error general en la función:', error.message)
    return new Response(
      JSON.stringify({ error: error.message || 'Error desconocido cancelando el evento.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})