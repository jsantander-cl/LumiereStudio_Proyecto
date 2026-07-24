import { useState } from 'react';

const marcas = [
  'Lash Colors', 
  'DLUX Professional', 
  'Lomansa', 
  'Perma Blend', 
  'TKTX', 
  'ZENA', 
  'PULUK'
];

export default function Partners() {
  const [indiceActual, setIndiceActual] = useState(0);
  
  // Definimos cuántas marcas queremos ver fijas al mismo tiempo en pantalla
  const visiblesEnEscritorio = 5;

  const manejarAnterior = () => {
    setIndiceActual((prev) => (prev === 0 ? marcas.length - 1 : prev - 1));
  };

  const manejarSiguiente = () => {
    setIndiceActual((prev) => (prev === marcas.length - 1 ? 0 : prev + 1));
  };

  // Esta función organiza el orden del array dinámicamente para que la tira nunca desaparezca
  const obtenerMarcasVisibles = () => {
    const resultado = [];
    for (let i = 0; i < visiblesEnEscritorio; i++) {
      const idx = (indiceActual + i) % marcas.length;
      resultado.push(marcas[idx]);
    }
    return resultado;
  };

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24 select-none w-full">
      <div className="max-w-7xl mx-auto text-center space-y-10">
        <p className="font-sans text-sm text-[var(--color-abrow-muted)]">
          Trabajamos con las mejores <span className="italic underline underline-offset-4">marcas</span> del mercado para ofrecer a nuestros clientes los mejores productos.
        </p>

        <div className="flex items-center justify-between gap-4 w-full">
          {/* Botón Anterior */}
          <button
            onClick={manejarAnterior}
            aria-label="Anterior"
            className="text-[var(--color-abrow-muted)] hover:text-[var(--color-abrow-dark)] transition-colors p-2 flex-shrink-0 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Fila Fija y Estable con Grid Nativo */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
            {obtenerMarcasVisibles().map((marca, idx) => (
              <div 
                key={`${marca}-${idx}`} 
                className="w-full text-center animate-fade-in duration-300"
              >
                <span className="font-serif italic text-base md:text-lg text-[var(--color-abrow-muted)]/70 hover:text-[var(--color-abrow-dark)] transition-colors block truncate">
                  {marca}
                </span>
              </div>
            ))}
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={manejarSiguiente}
            aria-label="Siguiente"
            className="text-[var(--color-abrow-muted)] hover:text-[var(--color-abrow-dark)] transition-colors p-2 flex-shrink-0 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
