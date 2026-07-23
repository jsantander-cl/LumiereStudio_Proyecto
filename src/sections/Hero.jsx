import React from 'react';

function Hero() {
  const redes = ['Instagram', 'Facebook', 'Twitter', 'Youtube'];

  return (
    <section className="bg-[var(--color-abrow-nude)] flex flex-col w-full">
      {/* Parte Superior: título + redes sociales, con flores decorativas a la derecha */}
      <div className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* LOGO LUMIERE */}
        <div
          className="absolute -left--10 -right-0 top-5 w-[360px] h-[360px] pointer-events-none hidden md:block"
        >
          <img src="/public/img/logosombra.png" alt="Trabajo 1" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-serif text-4xl md:text-6xl text-[var(--color-abrow-dark)] leading-[1.15]">
            Lumiere Studio : <span className="italic text-[var(--color-abrow-muted)] font-normal">El Arte</span>
            <br />
            <span className="italic text-[var(--color-abrow-muted)] font-normal">de Trasformar</span> tu Mirada
          </h1>

          <div className="flex flex-wrap gap-6 mt-8">
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

      {/* Parte Inferior: imagen a lo ancho completo */}
      <div className="w-full h-[420px] md:h-[600px]">
        <img
          src="/hero.png"
          alt="Aplicación de maquillaje de cejas"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}

export default Hero;
