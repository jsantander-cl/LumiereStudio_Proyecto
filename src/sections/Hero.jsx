import React from 'react';

function Hero() {
  const redes = ['Instagram', 'Facebook', 'Twitter', 'Youtube'];

  return (
    <section className="bg-[var(--color-abrow-nude)] flex flex-col w-full select-none">
      {/* Parte Superior: título, redes sociales y logo decorativo */}
      <div className="relative w-full py-12 md:py-28 px-6 md:px-12 lg:px-24 overflow-hidden">
        
        {/* Contenedor Grid responsivo */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-8 md:gap-10">
          
          {/* LOGO LUMIERE (Arriba en móvil gracias a order-first, a la derecha en desktop gracias a md:order-last) */}
          <div className="flex items-center justify-center order-first md:order-last w-[300px] md:w-[320px] lg:w-[400px] aspect-square pointer-events-none justify-self-center">
            <img 
              src="/img/logosombra.png" 
              alt="Lumiere Logo Sombra" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Bloque de Textos y Redes */}
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--color-abrow-dark)] leading-[1.15]">
              Lumiere Studio : <span className="italic text-[var(--color-abrow-muted)] font-normal">El Arte</span>
              <br />
              <span className="italic text-[var(--color-abrow-muted)] font-normal">de Trasformar</span> tu Mirada
            </h1>

            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
              {redes.map((red) => (
                <a
                  key={red}
                  href="#"
                  className="font-sans text-[11px] tracking-widest uppercase underline underline-offset-4 text-[var(--color-abrow-dark)]/80 hover:text-[var(--color-abrow-dark)] transition-colors"
                >
                  {red}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Parte Inferior: imagen a lo ancho completo */}
      <div className="w-full h-[420px] md:h-[600px]">
        <img
          src="/img/hero.png"
          alt="Aplicación de maquillaje de cejas"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}

export default Hero;
