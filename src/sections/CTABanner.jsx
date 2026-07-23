import { Link } from 'react-router-dom';

export default function CTABanner() {
  return (
    // z-index bajo (z-0) y sin bg propio: esta sección es la "ventana" por la que
    // se asoma la imagen fija. Las secciones vecinas (BannerTransicion arriba,
    // Galeria abajo) llevan z-index mayor y fondo sólido, por lo que al hacer
    // scroll "tapan" la imagen fija generando el efecto de cortina.
    <section className="relative z-0 overflow-hidden min-h-[80vh] md:min-h-screen flex items-end">
      {/* Imagen de fondo FIJA (bg-fixed): no se mueve con el scroll, queda
          anclada al viewport mientras las secciones sólidas de arriba/abajo
          se deslizan por encima, revelándola u ocultándola progresivamente. */}
      <div
        className="absolute inset-0 -z-10 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/img/banner.png')" }}
      />
      {/* Velo oscuro para legibilidad del texto */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="max-w-7xl mx-auto w-full flex justify-end relative z-10 px-6 md:px-12 lg:px-24 pb-12 md:pb-20">
        <div className="bg-[var(--color-abrow-cream)] text-right space-y-3 max-w-md p-8 md:p-10 shadow-xl">
          <h3 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)] leading-tight">
            Cuidamos tu Mirada con la Atención{' '}
            <span className="italic text-[var(--color-abrow-muted)] font-normal">que Merece.</span>
          </h3>
          
          <Link
            to="/contacto"
            className="inline-block font-sans text-[11px] tracking-widest uppercase underline underline-offset-4 text-[var(--color-abrow-dark)]"
          >
            Reservar una cita
          </Link>
        </div>
      </div>
    </section>
  );
}