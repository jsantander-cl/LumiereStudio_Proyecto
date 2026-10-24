import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Sobrenosotros() {
  const [modalAbierto, setModalAbierto] = useState(false);

  // Cerrar la ventana modal al presionar la tecla Escape (ESC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModalAbierto(false);
      }
    };

    if (modalAbierto) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalAbierto]);

  return (
    <section className="bg-[var(--color-abrow-nude)]/50 py-20 px-6 md:px-12 lg:px-24 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Imagen del Bodegón de Productos */}
        <div className="flex justify-center">
          <img 
            src="/img/puluk.webp" 
            alt="Premium Products" 
            className="max-h-[380px] object-contain drop-shadow-sm"
          />
        </div>

        {/* Bloque de Texto Editorial */}
        <div className="flex flex-col items-start space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)] leading-tight">
            Productos de <br />
            <span className="italic text-[var(--color-abrow-muted)] font-normal">Primera Calidad</span> y de Alta Gama
          </h2>

          <span className="font-sans text-[11px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            cosméticos profesionales
          </span>

          <p className="font-sans text-xs md:text-sm text-[var(--color-abrow-muted)] leading-relaxed max-w-md">
            En nuestro estudio, las clientas pueden adquirir cosméticos profesionales para realzar y dar forma a sus cejas en casa. Nuestra selección incluye lápices, geles y polvos para cejas, así como otras herramientas como pinzas y pinceles para cejas.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button 
              onClick={() => setModalAbierto(true)}
              className="border border-[var(--color-abrow-dark)] px-7 py-2.5 font-sans text-[11px] uppercase tracking-widest text-[var(--color-abrow-dark)] hover:bg-[var(--color-abrow-dark)] hover:text-white transition-all duration-300 cursor-pointer"
            >
              MÁS INFORMACIÓN
            </button>

            <Link 
              to="/checkout?producto=S%C3%A9rum%20Puluk%20Lash%20Booster&precio=$25.000&tipo=producto" 
              className="bg-[var(--color-abrow-dark)] border border-[var(--color-abrow-dark)] px-7 py-2.5 font-sans text-[11px] uppercase tracking-widest text-white hover:opacity-90 transition-all duration-300 inline-block"
            >
              COMPRAR
            </Link>
          </div>
        </div>

      </div>

      {/* VENTANA EMERGENTE (MODAL DE YOUTUBE) */}
      {modalAbierto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setModalAbierto(false)}
        >
          {/* Contenedor del reproductor */}
          <div 
            className="relative w-full max-w-3xl aspect-video bg-black shadow-2xl rounded-lg overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cierre visible y flotante dentro del reproductor */}
            <button 
              onClick={() => setModalAbierto(false)}
              className="absolute top-3 right-3 z-50 bg-black/70 hover:bg-black text-white hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer border border-white/30"
              aria-label="Cerrar ventana"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Reproductor de Video de YouTube */}
            <iframe 
              src="https://www.youtube.com/embed/h9ckg7MqXkQ" 
              title="Cómo conseguir unas pestañas largas y fuertes con el suero Puluk Grow" 
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen 
            />
          </div>
        </div>
      )}
    </section>
  );
}