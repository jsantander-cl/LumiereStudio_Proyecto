import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function InscripcionMasterClass() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const titulo = searchParams.get('titulo') || 'Master Class de Belleza';
  const precio = searchParams.get('precio') || '$100.000';
  const fecha = searchParams.get('fecha') || 'Próximamente, 2026';

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    experiencia: 'Principiante',
    comentario: ''
  });

  const [enviado, setEnviado] = useState(false);

  const manejarSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[var(--color-abrow-cream)] px-6 text-center">
        <div className="bg-white p-10 max-w-md shadow-sm border border-[var(--color-abrow-dark)]/10 space-y-4">
          <span className="text-4xl">🎓</span>
          <h2 className="font-serif text-3xl text-[var(--color-abrow-dark)]">¡Solicitud Recibida!</h2>
          <p className="font-sans text-xs text-[var(--color-abrow-muted)] leading-relaxed">
            Te has pre-inscrito con éxito en la <strong>{titulo}</strong>. Nos pondremos en contacto al correo <strong>{form.email}</strong> para coordinar la reserva de tu cupo y el pago inicial.
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-[var(--color-abrow-dark)] text-white py-3 font-sans text-xs uppercase tracking-widest mt-4 hover:opacity-95 transition-opacity"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[var(--color-abrow-cream)] py-16 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navegación posterior */}
        <Link 
          to="/#master-classes" 
          className="inline-flex items-center gap-2 font-sans text-xs text-[var(--color-abrow-muted)] hover:text-[var(--color-abrow-dark)] uppercase tracking-wider transition-colors"
        >
          ← Volver a Master Classes
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Detalles del Taller */}
          <div className="bg-white p-8 border border-[var(--color-abrow-dark)]/10 shadow-sm space-y-6">
            <span className="font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold block">
              Formación Profesional
            </span>
            
            <h2 className="font-serif text-3xl text-[var(--color-abrow-dark)] leading-tight">
              {titulo}
            </h2>

            <div className="space-y-2 border-t border-b border-gray-100 py-4 font-sans text-xs">
              <div className="flex justify-between text-[var(--color-abrow-muted)]">
                <span>Inversión Total:</span>
                <strong className="font-serif text-base text-[var(--color-abrow-dark)]">{precio}</strong>
              </div>
              <div className="flex justify-between text-[var(--color-abrow-muted)]">
                <span>Fecha Programada:</span>
                <span className="italic text-[var(--color-abrow-dark)]">{fecha}</span>
              </div>
              <div className="flex justify-between text-[var(--color-abrow-muted)]">
                <span>Modalidad:</span>
                <span className="text-[var(--color-abrow-dark)]">Presencial / Cupos Limitados</span>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs text-[var(--color-abrow-muted)] leading-relaxed">
              <p className="font-semibold text-[var(--color-abrow-dark)]">¿Qué incluye la formación?</p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Materiales e insumos para la práctica</li>
                <li>Certificado de participación acreditado</li>
                <li>Coffee break y asesoría personalizada post-taller</li>
              </ul>
            </div>
          </div>

          {/* Formulario de Inscripción */}
          <div className="bg-white p-8 border border-[var(--color-abrow-dark)]/10 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl text-[var(--color-abrow-dark)]">Formulario de Inscripción</h3>
            
            <form onSubmit={manejarSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-[var(--color-abrow-muted)] uppercase tracking-wider mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border border-gray-200 p-2.5 focus:outline-none focus:border-[var(--color-abrow-dark)]"
                  value={form.nombre}
                  onChange={(e) => setForm({...form, nombre: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[var(--color-abrow-muted)] uppercase tracking-wider mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  className="w-full border border-gray-200 p-2.5 focus:outline-none focus:border-[var(--color-abrow-dark)]"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[var(--color-abrow-muted)] uppercase tracking-wider mb-1">Teléfono / WhatsApp</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+56 9 1234 5678"
                  className="w-full border border-gray-200 p-2.5 focus:outline-none focus:border-[var(--color-abrow-dark)]"
                  value={form.telefono}
                  onChange={(e) => setForm({...form, telefono: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[var(--color-abrow-muted)] uppercase tracking-wider mb-1">Nivel de Experiencia Previas</label>
                <select 
                  className="w-full border border-gray-200 p-2.5 focus:outline-none focus:border-[var(--color-abrow-dark)] bg-white"
                  value={form.experiencia}
                  onChange={(e) => setForm({...form, experiencia: e.target.value})}
                >
                  <option value="Principiante">Principiante (Sin experiencia)</option>
                  <option value="Intermedio">Intermedio (Conocimientos básicos)</option>
                  <option value="Avanzado">Avanzado (Profesional del rubro)</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--color-abrow-muted)] uppercase tracking-wider mb-1">Comentario o Consulta (Opcional)</label>
                <textarea 
                  rows="3"
                  className="w-full border border-gray-200 p-2.5 focus:outline-none focus:border-[var(--color-abrow-dark)]"
                  value={form.comentario}
                  onChange={(e) => setForm({...form, comentario: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[var(--color-abrow-dark)] text-white py-3.5 font-sans text-xs uppercase tracking-widest hover:opacity-95 transition-opacity mt-4 cursor-pointer"
              >
                SOLICITAR CUPO
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}