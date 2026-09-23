import { HashLink } from 'react-router-hash-link';

export default function Introduccion() {
  return (
    <section id="sobre-nosotros" className="scroll-mt-20 bg-[var(--color-abrow-nude)] py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        <div className="space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-abrow-dark)] leading-tight">
            Libera el Poder de tu Mirada con los Expertos de{' '}
            <span className="italic text-[var(--color-abrow-muted)] font-normal">LUMIERE</span>
          </h2>
          <span className="block font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            LUMIERE — cejas y pestañas perfectas, tú perfecta
          </span>
        </div>

        <div className="space-y-6 font-sans text-sm text-[var(--color-abrow-muted)] leading-relaxed">
          <p>
            ¡Bienvenido al estudio de cejas más prestigioso de la ciudad de Antofagasta! Nuestro experimentado equipo de expertos se especializa en crear cejas y pestañas personalizadas de aspecto natural que enmarcan perfectamente tu rostro.
          </p>
          <p>
            Desde el diseño y tinte de cejas hasta el maquillaje permanente y la aplicación de maquillaje, brindamos el más alto nivel de atención a todos nuestros clientes.
          </p>
          <p className="font-serif text-[var(--color-abrow-dark)] text-base">
            INICIA:{' '}
            <HashLink smooth to="/#servicios" className="italic underline underline-offset-4">
              Corrección de cejas
            </HashLink>{' '}
            <HashLink smooth to="/#servicios" className="italic underline underline-offset-4 ml-4">
              Corrección de pestañas
            </HashLink>
          </p>
        </div>
      </div>
    </section>
  );
}