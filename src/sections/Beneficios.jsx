import React, { useState } from 'react';

const beneficios = [
  {
    titulo: 'Reserva Online',
    texto: 'Elija una fecha y hora que le resulten convenientes.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <image href="/public/svg/007-appointment-1.svg" width="24" height="24" />
      </svg>
    ),
  },
  {
    titulo: 'Excelente Atencion',
    texto: 'Especialista en diseño estetico altamente recomendada.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <image href="/public/svg/005-candidate.svg" width="24" height="24" />
      </svg>
    ),
  },
  {
    titulo: 'Personalización',
    texto: 'Te ayudamos a resaltar tu belleza natural.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <image href="/public/svg/017-makeup.svg" width="24" height="24" />
      </svg>
    ),
  },
  {
    titulo: 'Gift Cards',
    texto: 'El mejor regalo para tu amiga, madre o pareja.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <image href="/public/svg/011-gift-1.svg" width="24" height="24" />
      </svg>
    ),
  },
  {
    titulo: 'Resultados perfectos',
    texto: 'Luce unas cejas y pestañas perfectas durante mucho tiempo.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <image href="/public/svg/015-love-yourself.svg" width="24" height="24" />
      </svg>
    ),
  },
];

export default function Beneficios() {
  const [reproduciendo, setReproduciendo] = useState(false);

  return (
    <section className="bg-[var(--color-abrow-nude)] py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Fila de Beneficios */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {beneficios.map((b) => (
            <div key={b.titulo} className="flex flex-col items-start space-y-3">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[var(--color-abrow-dark)]">
                {b.icono}
              </div>
              <h4 className="font-serif text-lg text-[var(--color-abrow-dark)]">{b.titulo}</h4>
              <div className="w-10 h-[2px] bg-[var(--color-abrow-dark)]" />
              <p className="font-sans text-xs text-[var(--color-abrow-muted)] leading-relaxed">{b.texto}</p>
            </div>
          ))}
        </div>

        {/* Video / Imagen destacada */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden group cursor-pointer">
          <img
            src="/public/img/videofalso.png"
            alt="Sesión de cejas en el estudio"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setReproduciendo(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Reproducir video"
          >
            <span className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-colors">
              <svg viewBox="0 0 24 24" fill="var(--color-abrow-dark)" className="w-6 h-6 ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </div>

        {/* Cita destacada */}
        <div className="text-center space-y-2">
          <p className="font-serif text-2xl md:text-3xl text-[var(--color-abrow-dark)]">
            "<span className="underline underline-offset-4">Nadie</span> nace con{' '}
            <span className="italic text-[var(--color-abrow-muted)] font-normal">cejas perfectas</span>."
          </p>
          <span className="block font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold pt-2">
            Linda Evangelista
          </span>
        </div>
      </div>
    </section>
  );
}
