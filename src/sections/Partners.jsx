import { useRef, useEffect } from 'react';

const marcasOriginales = [
  'Lash Colors',
  'DLUX Professional',
  'Lomansa',
  'Perma Blend',
  'TKTX',
  'ZENA',
  'PULUK'
];

export default function Partners() {
  const contenedorRef = useRef(null);
  
  // Triplicamos el array para lograr el efecto de bucle infinito sin saltos
  const marcas = [...marcasOriginales, ...marcasOriginales, ...marcasOriginales];

  // Posicionar inicialmente en el centro exacto al cargar
  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (contenedor) {
      const tercioAncho = contenedor.scrollWidth / 3;
      contenedor.scrollLeft = tercioAncho;
    }
  }, []);

  // Lógica de bucle infinito (margen de holgura para ambas direcciones)
  const manejarScrollInfinito = () => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const tercioAncho = contenedor.scrollWidth / 3;

    if (contenedor.scrollLeft <= 10) {
      contenedor.scrollLeft = tercioAncho;
    } else if (contenedor.scrollLeft >= (tercioAncho * 2) - 10) {
      contenedor.scrollLeft = tercioAncho;
    }
  };

  const manejarScroll = (direccion) => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;
    const desplazamiento = direccion === 'izquierda' ? -250 : 250;
    contenedor.scrollBy({ left: desplazamiento, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-10 md:py-14 px-6 md:px-12 lg:px-24 select-none w-full overflow-hidden">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <p className="font-sans text-xs md:text-sm text-[var(--color-abrow-muted)] max-w-xl mx-auto leading-relaxed">
          Trabajamos con las mejores <span className="italic underline underline-offset-4">marcas</span> del mercado para ofrecer a nuestros clientes los mejores productos.
        </p>

        <div className="relative flex items-center justify-center w-full">
          {/* Botón Izquierda */}
          <button 
            onClick={() => manejarScroll('izquierda')}
            aria-label="Anterior"
            className="absolute left-0 z-10 bg-white/90 hover:bg-white text-[var(--color-abrow-muted)] hover:text-[var(--color-abrow-dark)] transition-colors p-2 shadow-sm rounded-full cursor-pointer -ml-2 md:-ml-4"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Tira Horizontal Continua e Infinita */}
          <div 
            ref={contenedorRef}
            onScroll={manejarScrollInfinito}
            className="w-full flex items-center gap-10 md:gap-16 overflow-x-auto scrollbar-none scroll-smooth px-8 py-1 whitespace-nowrap"
            style={{ 
              scrollbarWidth: 'none', 
              WebkitOverflowScrolling: 'touch' 
            }}
          >
            {marcas.map((marca, idx) => (
              <div 
                key={`${marca}-${idx}`}
                className="flex-shrink-0 text-center"
              >
                <span className="font-serif italic text-base md:text-xl text-[var(--color-abrow-muted)]/70 hover:text-[var(--color-abrow-dark)] transition-colors">
                  {marca}
                </span>
              </div>
            ))}
          </div>

          {/* Botón Derecha */}
          <button 
            onClick={() => manejarScroll('derecha')}
            aria-label="Siguiente"
            className="absolute right-0 z-10 bg-white/90 hover:bg-white text-[var(--color-abrow-muted)] hover:text-[var(--color-abrow-dark)] transition-colors p-2 shadow-sm rounded-full cursor-pointer -mr-2 md:-mr-4"
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