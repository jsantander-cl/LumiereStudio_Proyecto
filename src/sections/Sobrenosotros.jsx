import { useState } from 'react';

export default function Sobrenosotros() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <section id="sobre-nosotros" className="bg-[var(--color-abrow-nude)]/50 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Imagen del Bodegón de Productos */}
        <div className="flex justify-center">
          <img 
            src="/img/puluk.png" 
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

          {/* Botón con disparador de Modal */}
          <button 
            onClick={() => setModalAbierto(true)}
            className="mt-4 border border-[var(--color-abrow-dark)] px-7 py-2.5 font-sans text-[11px] uppercase tracking-widest text-[var(--color-abrow-dark)] hover:bg-[var(--color-abrow-dark)] hover:text-white transition-all duration-300 cursor-pointer"
          >
            MÁS INFORMACIÓN
          </button>
        </div>
      </div>

      {/* VENTANA EMERGENTE (MODAL DE YOUTUBE) */}
      {modalAbierto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setModalAbierto(false)}
        >
          {/* Contenedor del reproductor */}
          <div 
            className="relative w-full max-w-3xl aspect-video bg-black shadow-2xl rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer click dentro del video
          >
            {/* Botón de cierre superior */}
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 flex items-center gap-1 font-sans text-xs tracking-wider uppercase cursor-pointer"
            >
              Cerrar ✕
            </button>

            {/* Reproductor de Video */}
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
