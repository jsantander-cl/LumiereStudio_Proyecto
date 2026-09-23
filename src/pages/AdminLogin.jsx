import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setCargando(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos.')
      setCargando(false)
      return
    }

    navigate('/admin/reservas')
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm border border-[var(--color-abrow-dark)]/15 rounded-xl p-8"
      >
        <h1 className="font-serif text-2xl text-[var(--color-abrow-dark)] mb-6 text-center">
          Panel de administración
        </h1>

        <div className="grid gap-4">
          <input
            required
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[var(--color-abrow-dark)]/20 rounded-lg px-3 py-2 bg-white text-[var(--color-abrow-dark)]"
          />
          <input
            required
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[var(--color-abrow-dark)]/20 rounded-lg px-3 py-2 bg-white text-[var(--color-abrow-dark)]"
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="mt-6 w-full bg-[var(--color-abrow-dark)] text-white rounded-lg py-3 uppercase text-sm tracking-wide font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </section>
  )
}