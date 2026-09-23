import { useRef, useState, useEffect } from 'react';

const imagenesOriginales = [
  '/img/INSTA1.webp',
  '/img/INSTA2.webp',
  '/img/INSTA6.webp',
  '/img/INSTA4.webp',
  '/img/INSTA5.webp',
  '/img/ojoB.webp',
];

export default function InstagramGaleria() {
  const contenedorRef = useRef(null);
  
  // Triplicamos el array para cubrir el desplazamiento hacia ambos lados sin cortes
  const imagenes = [...imagenesOriginales, ...imagenesOriginales, ...imagenesOriginales];

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Posicionar inicialmente en el centro exacto al cargar
  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (contenedor) {
      const tercioAncho = contenedor.scrollWidth / 3;
      contenedor.scrollLeft = tercioAncho;
    }
  }, []);

  // LÓGICA DE BUCLE INFINITO CORREGIDA (CON MARGEN DE HOLGURA PARA AMBAS DIRECCIONES)
  const manejarScrollInfinito = () => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const tercioAncho = contenedor.scrollWidth / 3;

    // DIRECCIÓN IZQUIERDA: Si se acerca al inicio de la tira (bloque izquierdo), saltamos al centro
    if (contenedor.scrollLeft <= 10) {
      contenedor.scrollLeft = tercioAncho;
    } 
    // DIRECCIÓN DERECHA: Si llega cerca del final del segundo bloque, regresamos al centro de forma invisible
    else if (contenedor.scrollLeft >= (tercioAncho * 2) - 10) {
      contenedor.scrollLeft = tercioAncho;
    }
  };

  const navegar = (direccion) => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const anchoImagen = contenedor.clientWidth / (window.innerWidth < 768 ? 3 : 6);
    const desplazamiento = direccion === 'siguiente' ? anchoImagen : -anchoImagen;

    contenedor.scrollBy({
      left: desplazamiento,
      behavior: 'smooth',
    });
  };

  const mouseAbajo = (e) => {
    setIsDown(true);
    setStartX(e.pageX - contenedorRef.current.offsetLeft);
    setScrollLeft(contenedorRef.current.scrollLeft);
  };

  const mouseSuelta = () => {
    setIsDown(false);
  };

  const mouseMueve = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - contenedorRef.current.offsetLeft;
    const caminar = (x - startX) * 1.5; // Ajusta este número si quieres que ruede más rápido o lento al arrastrar
    contenedorRef.current.scrollLeft = scrollLeft - caminar;
  };

  return (
    <section className="bg-[var(--color-abrow-cream)] py-10 px-0 relative select-none w-full overflow-hidden">
      <div className="max-w-[1920px] mx-auto relative flex items-center">
        
        {/* Botón Anterior */}
        <button
          onClick={() => navegar('anterior')}
          aria-label="Anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-[var(--color-abrow-dark)] transition-colors shadow-sm cursor-pointer md:w-10 md:h-10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Tira Horizontal Continua */}
        <div
          ref={contenedorRef}
          onScroll={manejarScrollInfinito}
          onMouseDown={mouseAbajo}
          onMouseLeave={mouseSuelta}
          onMouseUp={mouseSuelta}
          onMouseMove={mouseMueve}
          className={`w-full flex items-center overflow-x-scroll scrollbar-none snap-none ${
            isDown ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none'
          }}
        >
          {imagenes.map((img, idx) => (
            <div
              key={`${img}-${idx}`}
              className="w-1/3 md:w-1/6 aspect-square overflow-hidden flex-shrink-0"
            >
              <img
                src={img}
                alt={`Publicación de Instagram ${idx + 1}`}
                draggable="false"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={() => navegar('siguiente')}
          aria-label="Siguiente"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-[var(--color-abrow-dark)] transition-colors shadow-sm cursor-pointer md:w-10 md:h-10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
      </div>
    </section>
  );
}
