import React from 'react';

export default function CTABanner() {
  return (
    <section className="bg-[var(--color-abrow-cream)] py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-end relative z-10">
        <div className="text-right space-y-3 max-w-md">
          <h3 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)] leading-tight">
            Cuidamos tu Mirada con la Atención{' '}
            <span className="italic text-[var(--color-abrow-muted)] font-normal">que Merece.</span>
          </h3>
          <a
            href="#contacto"
            className="inline-block font-sans text-[11px] tracking-widest uppercase underline underline-offset-4 text-[var(--color-abrow-dark)]"
          >
            Reservar una cita
          </a>
        </div>
      </div>
    </section>
  );
}
