import { useState } from 'react';

const SliderComparador = ({ imgBefore, imgAfter, titulo, especialista }) => {
  const [posicion, setPosicion] = useState(50);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full aspect-[4/5] overflow-hidden select-none group">
        {/* Imagen del 'Después' */}
        <img
          src={imgAfter}
          alt="Después"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Imagen del 'Antes' (Recortada según el slider) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `polygon(0 0, ${posicion}% 0, ${posicion}% 100%, 0 100%)`,
          }}
        >
          <img
            src={imgBefore}
            alt="Antes"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Línea Divisoria Superior */}
        <div
          className="absolute top-0 bottom-[calc(50%+20px)] w-[3px] bg-white"
          style={{ left: `${posicion}%` }}
        />

        {/* Controlador (Círculo Central) */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-[4px] border-white flex items-center justify-center shadow-md pointer-events-none"
          style={{ left: `${posicion}%` }}
        >
          <svg viewBox="0 0 48 48" className="w-6 h-6">
            <polygon points="20,10 6,24 20,38" fill="white" />
            <polygon points="28,10 42,24 28,38" fill="white" />
          </svg>
        </div>

        {/* Línea Divisoria Inferior */}
        <div
          className="absolute top-[calc(50%+20px)] bottom-0 w-[3px] bg-white"
          style={{ left: `${posicion}%` }}
        />

        {/* Input transparente para interactuar */}
        <input
          type="range"
          min="0"
          max="100"
          value={posicion}
          onChange={(e) => setPosicion(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        />
      </div>

      <h4 className="font-serif text-lg text-[var(--color-abrow-dark)] mt-4">
        {titulo}
      </h4>
      <p className="font-sans text-[10px] tracking-widest text-[var(--color-abrow-muted)] uppercase mt-1">
        {especialista}
      </p>
    </div>
  );
};

export default function Caracteristicas() {
  return (
    <section className="bg-[var(--color-abrow-cream)] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        
        {/* Columna Texto */}
        <div className="flex flex-col items-start space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)] leading-tight">
            Mira los Resultados <br />
            Reales de <span className="italic text-[var(--color-abrow-muted)] font-normal">LUMIERE</span> <br />
          </h2>

          <span className="font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            Antes y después
          </span>

          <p className="font-sans text-xs md:text-sm text-[var(--color-abrow-muted)] leading-relaxed max-w-sm">
            La forma y el color de las cejas cambian significativamente la apariencia general de una persona y la forma en que los demás la perceiben. ¡Compruébalo tú mismo!
          </p>

          <button className="mt-4 border border-[var(--color-abrow-dark)] px-7 py-2.5 font-sans text-[11px] uppercase tracking-widest text-[var(--color-abrow-dark)] hover:bg-[var(--color-abrow-dark)] hover:text-white transition-all duration-300">
            VER MÁS
          </button>
        </div>

        {/* Columna Sliders */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <SliderComparador 
            imgBefore="/img/ojoA.webp" 
            imgAfter="/img/ojoB.webp" 
            titulo="Lifting Coreano" 
            especialista="CORRECCIÓN DE PESTAÑAS" 
          />
          <SliderComparador 
            imgBefore="/img/ojoC.webp" 
            imgAfter="/img/ojoD.webp" 
            titulo="Microblading" 
            especialista="Corrección de cejas" 
          />
        </div>

      </div>
    </section>
  );
}
