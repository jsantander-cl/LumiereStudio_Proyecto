import React from 'react';

const imagenes = [
  '/img/INSTA1.png',
  '/img/INSTA2.png',
  '/img/INSTA6.png',
  '/img/INSTA4.png',
  '/img/INSTA5.png',
  '/img/ojoB.png',
];

export default function InstagramGaleria() {
  return (
    <section className="bg-[var(--color-abrow-cream)] py-10 px-6 md:px-0 relative">
      <div className="max-w-[1920px] mx-auto relative">
        <button
          aria-label="Anterior"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/70 items-center justify-center text-[var(--color-abrow-dark)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="grid grid-cols-3 md:grid-cols-6">
          {imagenes.map((img, idx) => (
            <div key={idx} className="aspect-square overflow-hidden">
              <img
                src={img}
                alt={`Publicación de Instagram ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <button
          aria-label="Siguiente"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/70 items-center justify-center text-[var(--color-abrow-dark)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
