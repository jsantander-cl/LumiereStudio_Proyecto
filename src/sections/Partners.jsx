import React from 'react';

const marcas = ['Lash Colors', 'DLUX Professional', 'Lomansa', 'Perma Blend', 'TKTX', 'ZENA'];

export default function Partners() {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center space-y-10">
        <p className="font-sans text-sm text-[var(--color-abrow-muted)]">
          Trabajamos con las mejores <span className="italic underline underline-offset-4">marcas</span> del mercado para ofrecer a nuestros clientes los mejores productos.
        </p>

        <div className="flex items-center justify-center gap-6">
          <button aria-label="Anterior" className="text-[var(--color-abrow-muted)] hover:text-[var(--color-abrow-dark)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {marcas.map((marca) => (
              <span
                key={marca}
                className="font-serif italic text-lg md:text-xl text-[var(--color-abrow-muted)]/70 whitespace-nowrap"
              >
                {marca}
              </span>
            ))}
          </div>

          <button aria-label="Siguiente" className="text-[var(--color-abrow-muted)] hover:text-[var(--color-abrow-dark)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
