import React from 'react';

export default function BannerTransicion() {
  return (
    <section className="bg-[var(--color-abrow-nude)] py-12 px-6 border-y border-[var(--color-abrow-dark)]/5 relative overflow-hidden">
      {/* Fondo Floral Discreto */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#3D1E16_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h3 className="font-serif text-2xl md:text-3xl text-[var(--color-abrow-dark)] font-normal tracking-wide">
          Celebra Tu Belleza Natural
        </h3>
      </div>
    </section>
  );
}