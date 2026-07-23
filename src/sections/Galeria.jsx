import React from 'react';

export default function Galeria() {
  return (
    <section id="galeria" className="bg-[var(--color-abrow-darkbg)] text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Encabezado */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-white">
            Las Últimas <span className="italic text-[var(--color-abrow-muted)] font-normal">Técnicas</span> de Diseño de los Expertos.
          </h2>
          <span className="block font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            Works by our artists
          </span>
          <p className="font-sans text-xs text-gray-300 leading-relaxed pt-2">
            En LUMIERE, nuestra especialista se dedica a crear cejas y pestañas hermosas y de aspecto natural. Desarrollando su propio estilo y enfoque para realzar tu belleza natural. Nuestra especialista se especializa en técnicas modernas para dar forma, rellenar y definir las cejas perfectas y pestañas curvas.
          </p>
        </div>

        {/* Mosaico de Imágenes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Lado Izquierdo: Cuadrícula 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            <img src="/img/galeria 11.png" alt="Trabajo 1" className="w-full aspect-square object-cover" />
            <img src="/img/galeria 2.png" alt="Trabajo 2" className="w-full aspect-square object-cover" />
            <img src="/img/tania.png" alt="Trabajo 3" className="w-full aspect-square object-cover" />
            <img src="/img/galeria 4.png" alt="Trabajo 4" className="w-full aspect-square object-cover" />
          </div>

          {/* Lado Derecho: Imagen Alta */}
          <div className="w-full h-full min-h-[350px]">
            <img src="/img/galeria 5.png" alt="Trabajo Destacado" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Divisor Fino */}
        <div className="border-t border-white/10 my-12" />

        {/* Carrusel de Testimonios */}
        <div className="max-w-3xl mx-auto text-center space-y-6 relative px-8 md:px-16">
          <button
            aria-label="Testimonio anterior"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="font-serif text-5xl text-[var(--color-abrow-muted)] opacity-40 leading-none">“</div>

          <p className="font-serif italic text-lg md:text-xl text-white leading-relaxed">
            "Hoy fui a mi cita de microblading y estoy muy feliz con el resultado. La especialista fue muy profesional y me explicó todo el proceso. Mis cejas se ven naturales y definidas. ¡Definitivamente volveré!"
          </p>

          <span className="block font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            @_paz.is</span>

          {/* Dots de Navegación */}
          <div className="flex justify-center space-x-2 pt-4">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span>
          </div>

          <button
            aria-label="Testimonio siguiente"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}