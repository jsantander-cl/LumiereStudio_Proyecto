import { useState } from 'react';

export default function Beneficios() {
  const [reproducir, setReproducir] = useState(false);

  return (
    <section className="bg-[var(--color-abrow-cream)] py-16 px-6 md:px-12 lg:px-24 select-none">
      <div className="max-w-7xl mx-auto space-y-12 flex flex-col items-center">
        
        {/* Contenedor del video con altura ajustada y más elegante en desktop */}
        <div className="relative w-full max-w-5xl h-[320px] sm:h-[400px] md:h-[450px] lg:h-[480px] overflow-hidden rounded-lg shadow-lg bg-black">
          {reproducir ? (
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/N-xB9DI8cu0?autoplay=1&rel=0&modestbranding=1"
              title="Beneficios de un Lifting Coreano de pestañas"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div 
              className="relative w-full h-full cursor-pointer group"
              onClick={() => setReproducir(true)}
            >
              {/* Imagen de previsualización personalizada */}
              <img
                src="/img/videofalso.webp"
                alt="Beneficios de un Lifting Coreano de pestañas"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Capa de contraste oscura sutil */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />

              {/* Botón de Play Circular Estilizado */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-7 h-7 md:w-8 md:h-8 text-[var(--color-abrow-dark)] ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}