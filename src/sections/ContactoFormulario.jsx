import { useState } from 'react';

export default function ContactoFormulario() {
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Aquí se puede conectar el envío real (API, email, etc.)
    setEnviado(true);
  };

  return (
    <section className="bg-[var(--color-abrow-nude)] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-stretch">
        {/* Formulario */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)] mb-8">
            <span className="italic text-[var(--color-abrow-muted)]">Contáctanos</span> ahora
          </h2>

          <form onSubmit={manejarEnvio} className="space-y-6 font-sans text-sm">
            <input
              type="text"
              required
              placeholder="Introduzca su nombre completo*"
              className="w-full bg-transparent border-b border-[var(--color-abrow-dark)]/30 pb-2 placeholder:text-[var(--color-abrow-muted)] text-[var(--color-abrow-dark)] focus:outline-none focus:border-[var(--color-abrow-dark)] transition-colors"
            />
            <input
              type="tel"
              required
              placeholder="Introduce tu número de teléfono*"
              className="w-full bg-transparent border-b border-[var(--color-abrow-dark)]/30 pb-2 placeholder:text-[var(--color-abrow-muted)] text-[var(--color-abrow-dark)] focus:outline-none focus:border-[var(--color-abrow-dark)] transition-colors"
            />
            <input
              type="date"
              placeholder="Seleccione una fecha"
              className="w-full bg-transparent border-b border-[var(--color-abrow-dark)]/30 pb-2 placeholder:text-[var(--color-abrow-muted)] text-[var(--color-abrow-dark)] focus:outline-none focus:border-[var(--color-abrow-dark)] transition-colors"
            />
            <textarea
              placeholder="Escribe tu mensaje"
              rows={3}
              className="w-full bg-transparent border-b border-[var(--color-abrow-dark)]/30 pb-2 placeholder:text-[var(--color-abrow-muted)] text-[var(--color-abrow-dark)] focus:outline-none focus:border-[var(--color-abrow-dark)] transition-colors resize-none"
            />

            <button
              type="submit"
              className="w-full bg-[var(--color-abrow-dark)] text-white font-[var(--font-btn)] text-sm font-semibold uppercase tracking-wide py-4 hover:opacity-90 transition-opacity"
            >
              Reserva una cita
            </button>

            {enviado && (
              <p className="text-[var(--color-abrow-muted)] text-sm">
                ¡Gracias! Tu mensaje fue enviado, te contactaremos pronto.
              </p>
            )}
          </form>
        </div>

        {/* Mapa */}
        <div className="min-h-[320px] md:min-h-0 w-full overflow-hidden shadow-md">
          <iframe
            title="Ubicación A-Brow"
            src="https://www.google.com/maps?q=Oficina+Solferino+236+Antofagasta+Chile&output=embed"
            className="w-full h-full min-h-[320px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}