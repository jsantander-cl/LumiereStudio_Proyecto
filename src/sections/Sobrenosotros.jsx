import React from 'react';

export default function Sobrenosotros() {
  return (
    <section id="sobre-nosotros" className="bg-[var(--color-abrow-nude)]/50 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Imagen del Bodegón de Productos */}
        <div className="flex justify-center">
          <img 
            src="/public/img/puluk.png" 
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

          <button className="mt-4 border border-[var(--color-abrow-dark)] px-7 py-2.5 font-sans text-[11px] uppercase tracking-widest text-[var(--color-abrow-dark)] hover:bg-[var(--color-abrow-dark)] hover:text-white transition-all duration-300">
              más información
          </button>
        </div>

      </div>
    </section>
  );
}