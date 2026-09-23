import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setError('')
    setMensaje('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setCargando(true)

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    setCargando(false)

    if (error) {
      setError('Error al actualizar: ' + error.message)
    } else {
      setMensaje('¡Contraseña actualizada con éxito! Redirigiendo al login...')
      setTimeout(() => {
        navigate('/admin')
      }, 2500)
    }
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <form
        onSubmit={handleUpdatePassword}
        className="w-full max-w-sm border border-[var(--color-abrow-dark)]/15 rounded-xl p-8"
      >
        <h1 className="font-serif text-2xl text-[var(--color-abrow-dark)] mb-6 text-center">
          Nueva Contraseña
        </h1>

        <div className="grid gap-4">
          <input
            required
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            className="border border-[var(--color-abrow-dark)]/20 rounded-lg px-3 py-2 bg-white text-[var(--color-abrow-dark)]"
          />
          <input
            required
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            className="border border-[var(--color-abrow-dark)]/20 rounded-lg px-3 py-2 bg-white text-[var(--color-abrow-dark)]"
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}
        {mensaje && <p className="text-green-700 text-sm mt-3 text-center">{mensaje}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="mt-6 w-full bg-[var(--color-abrow-dark)] text-white rounded-lg py-3 uppercase text-sm tracking-wide font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          {cargando ? 'Guardando...' : 'Actualizar contraseña'}
        </button>
      </form>
    </section>
  )
}