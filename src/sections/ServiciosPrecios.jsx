import React from 'react';

const tratamientos = [
  { nombre: 'Perfilado de cejas', precio: '$10.000', desc: "Mejora la forma o la apariencia de tus cejas." },
  { nombre: 'Microblading', precio: '$120.000', desc: '¡Olvídate del maquillaje durante 18 a 30 semanas con el microblading!' },
  { nombre: 'Limpieza Facial', precio: '$20.000', desc: 'Limpia y exfolia tu piel para dejarla suave y radiante.' },
  { nombre: 'Lifting Coreano', precio: '$35.000', desc: 'Eleva, alarga y fortalece y nutre tus pestañas desde la raíz' },
  { nombre: 'Laminación de cejas', precio: '$25.000', desc: 'Te da unas cejas con apariencia más poblada y corrige su forma natural.' },
  { nombre: 'Corrección de cejas para hombres', precio: '$20.000', desc: 'Consigue una mejor forma para tus cejas o cambia su aspecto.' },
];

const FilaTratamiento = ({ nombre, precio, desc }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-baseline justify-between border-b border-[var(--color-abrow-dark)]/15 pb-2">
      <h4 className="font-serif text-lg text-[var(--color-abrow-dark)]">{nombre}</h4>
      <span className="font-serif italic text-xl text-[var(--color-abrow-dark)]">{precio}</span>
    </div>
    <p className="font-sans text-xs text-[var(--color-abrow-muted)]">{desc}</p>
  </div>
);

export default function ServiciosPrecios() {
  return (
    <section id="servicios" className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Encabezado */}
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)]">
            Nuestros Especialistas Tienen Todos los Tratamientos que{' '}
            <span className="italic text-[var(--color-abrow-muted)] font-normal">Necesitas</span> para Lucir Radiante.
          </h2>
          <span className="block font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            Luce siempre como una reina
          </span>
        </div>

        {/* Grid de precios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto">
          {tratamientos.map((t) => (
            <FilaTratamiento key={t.nombre} {...t} />
          ))}
        </div>

        {/* 3 tarjetas: Gift Cards / Other Services / CTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-[3/4] overflow-hidden group">
            <img src="/public/img/giftcardlumiere.png" alt="Gift Cards" className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 right-6 bg-white py-5 text-center">
              <h4 className="font-serif text-lg text-[var(--color-abrow-dark)]">Gift Cards</h4>
              <span className="font-sans text-[10px] tracking-widest text-[var(--color-abrow-muted)] uppercase">
                MÁS INFORMACIÓN
              </span>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden group">
            <img src="/public/img/masinfo.png" alt="Other Services" className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 right-6 bg-white py-5 text-center">
              <h4 className="font-serif text-lg text-[var(--color-abrow-dark)]">Otros servicios</h4>
              <span className="font-sans text-[10px] tracking-widest text-[var(--color-abrow-muted)] uppercase">
                MÁS INFORMACIÓN
              </span>
            </div>
          </div>

          <div className="bg-[var(--color-abrow-dark)] text-white aspect-[3/4] flex flex-col items-center justify-center text-center px-8 space-y-4">
            <div viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-25">
              <img src="/public/img/cejasblanca.png" alt="Cejas Perfectas" className="w-full h-full object-contain" />
            </div>
            <h4 className="font-serif text-2xl leading-snug">
              Descubre el Poder de unas <span className="italic">Cejas Perfectas!</span>
            </h4>
            <p className="font-sans text-xs text-white/70">¡Reserve su cita hoy mismo!</p>
            <a
              href="#contacto"
              className="bg-white text-[var(--color-abrow-dark)] px-6 py-3 font-sans text-[10px] uppercase tracking-widest hover:bg-white/90 transition-all"
            >
              Reserva ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
