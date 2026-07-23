import React from 'react';

export default function Contadores() {
  const stats = [
    { number: "2", title: "Especialistas", subtitle: "trabajando en Lumiere" },
    { number: "40+", title: "lifting realizados", subtitle: "cada mes" },
    { number: "150+", title: "clientes satisfechos", subtitle: "que nos recomiendan" },
    { number: "25+", title: "Microblading", subtitle: "realizados" },
    { number: "5", title: "cursos", subtitle: "de especializacion en estetica" }
  ];

  return (
    <section className="bg-[var(--color-abrow-darkbg2)] text-white py-14 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-1.5">
            <span className="font-serif text-4xl md:text-5xl text-[var(--color-abrow-cream)] font-light">
              {stat.number}
            </span>
            <span className="font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
              {stat.title}
            </span>
            <p className="font-serif italic text-xs text-[var(--color-abrow-muted)]/80">
              {stat.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}