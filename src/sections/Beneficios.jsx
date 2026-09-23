import React from 'react';

const beneficios = [
  {
    titulo: 'Reserva Online',
    texto: 'Elija una fecha y hora que le resulten convenientes.',
    iconoUrl: '/svg/007-appointment-1.svg',
  },
  {
    titulo: 'Excelente Atencion',
    texto: 'Especialista en diseño estetico altamente recomendada.',
    iconoUrl: '/svg/005-candidate.svg',
  },
  {
    titulo: 'Personalización',
    texto: 'Te ayudamos a resaltar tu belleza natural.',
    iconoUrl: '/svg/017-makeup.svg',
  },
  {
    titulo: 'Gift Cards',
    texto: 'El mejor regalo para tu amiga, madre o pareja.',
    iconoUrl: '/svg/011-gift-1.svg',
  },
  {
    titulo: 'Resultados perfectos',
    texto: 'Luce unas cejas y pestañas perfectas durante mucho tiempo.',
    iconoUrl: '/svg/015-love-yourself.svg',
  },
];

export default function Beneficios() {
  return (
    <section className="bg-[var(--color-abrow-nude)] py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Fila de Beneficios */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {beneficios.map((b) => (
            <div key={b.titulo} className="flex flex-col items-start space-y-3">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <img 
                  src={b.iconoUrl} 
                  alt={b.titulo} 
                  className="w-11 h-11 object-contain"
                />
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
            src="/img/videofalso.webp"
            alt="Sesión de cejas en el estudio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-colors">
              <svg viewBox="0 0 24 24" fill="var(--color-abrow-dark)" className="w-6 h-6 ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
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
