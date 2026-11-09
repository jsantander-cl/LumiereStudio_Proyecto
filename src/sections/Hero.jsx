function Hero() {
  const redes = [
    { nombre: 'Instagram', url: 'https://www.instagram.com/lumiere.antofagasta/' },
    { nombre: 'Facebook', url: 'https://web.facebook.com/profile.php?id=61574360982174' },
    { nombre: 'Tiktok', url: 'https://www.tiktok.com/@lumiere.antofagasta' },
    { nombre: 'Youtube', url: 'https://www.youtube.com/@lumiereestudio' },
  ];

  return (
    <section className="relative flex flex-col w-full select-none bg-[#3D1D1C]">
      {/* CONTENEDOR WRAPPER */}
      <div className="relative w-full md:h-[200vh]">
        
        {/* CAPA 1: VÍDEO PRINCIPAL A PANTALLA COMPLETA */}
        <div className="relative md:sticky top-0 w-full h-screen pt-24 pb-8 md:pt-44 md:pb-28 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between overflow-hidden bg-black z-0">
          
          {/* VÍDEO MOBILE EXCLUSIVO (1024(2).mp4) */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none block md:hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              onCanPlayThrough={() => window.dispatchEvent(new Event('lumiere-video-ready'))}
              className="w-full h-full object-cover object-center scale-105"
            >
              <source src="/video/1024(2).mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          </div>

          {/* VÍDEO DESKTOP EXCLUSIVO (1024(1).mp4) */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none hidden md:block">
            <video
              autoPlay
              muted
              loop
              playsInline
              onCanPlayThrough={() => window.dispatchEvent(new Event('lumiere-video-ready'))}
              className="w-full h-full object-cover object-center scale-105"
            >
              <source src="/video/1024(1).mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          </div>

          {/* Contenido adaptable: Título arriba en mobile, Grid original en desktop */}
          <div className="relative z-10 mx-auto max-w-7xl w-full h-full flex flex-col justify-between items-center md:grid md:grid-cols-[1fr_auto] md:items-center gap-6 md:gap-10">
            
            {/* Bloque de Textos */}
            <div className="w-full text-center md:text-left order-1 md:order-1 pt-2 md:pt-0 max-w-2xl">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] drop-shadow-lg">
                Lumiere Studio:
                <span className="md:hidden">{' '}</span>
                <span className="hidden md:inline"><br /></span>
                <span className="italic text-[#f5e6e0] font-normal"> El </span>
                Arte
                <br className="md:hidden" />
                <span className="italic text-[#f5e6e0] font-normal">de Transformar tu </span>
                <br className="hidden md:inline" />
                Mirada
              </h1>

              {/* Redes sociales solo visibles en desktop en su posición original */}
              <div className="hidden md:flex flex-wrap justify-start gap-6 mt-8">
                {redes.map((red) => (
                  <a
                    key={red.nombre}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[11px] tracking-widest uppercase underline underline-offset-4 text-white/90 hover:text-white transition-colors drop-shadow"
                  >
                    {red.nombre}
                  </a>
                ))}
              </div>
            </div>

            {/* LOGO LUMIERE (Visible en desktop, oculto en mobile) */}
            <div className="hidden md:flex items-center justify-center order-2 w-[160px] sm:w-[220px] md:w-[320px] lg:w-[400px] aspect-square pointer-events-none justify-self-center">
              <img 
                src="/img/logolumiere.png" 
                alt="Lumiere Logo Sombra" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

          </div>

          {/* BLOQUE INFERIOR MOBILE: Redes Sociales en Box responsivo horizontal y Mouse */}
          <div className="relative z-10 w-full flex flex-col items-center gap-3 pb-2 md:hidden">
            <div className="flex flex-row justify-between items-center w-full max-w-sm px-2">
              {redes.map((red) => (
                <a
                  key={red.nombre}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] sm:text-[11px] tracking-wider uppercase underline underline-offset-4 text-white/90 hover:text-white transition-colors drop-shadow whitespace-nowrap px-1"
                >
                  {red.nombre}
                </a>
              ))}
            </div>

            {/* Indicador de scroll mobile */}
            <div className="flex flex-col items-center gap-1.5 pointer-events-none opacity-85 mt-1">
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/80 font-medium drop-shadow">
                Descubre Más
              </span>
              <div className="w-4 h-7 rounded-full border-2 border-white/60 flex justify-center p-1 shadow-sm">
                <div className="w-1 h-1.5 bg-white rounded-full animate-bounce" />
              </div>
            </div>
          </div>

          {/* INDICADOR ANIMADO DE DESKTOP (Original) */}
          <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 pointer-events-none opacity-85">
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/80 font-medium drop-shadow">
              Descubre Más
            </span>
            <div className="w-4 h-7 sm:w-6 sm:h-10 rounded-full border-2 border-white/60 flex justify-center p-1 shadow-sm">
              <div className="w-1 h-1.5 sm:h-2.5 bg-white rounded-full animate-bounce" />
            </div>
          </div>

        </div>

        {/* CAPA 2: IMAGEN INFERIOR (Solo visible en Desktop con efecto parallax) */}
        <div className="hidden md:block absolute bottom-0 left-0 z-20 w-full h-screen overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,0.9)] bg-[#3D1D1C]">
          <img
            src="/img/hero.webp"
            alt="Aplicación de maquillaje de cejas"
            className="w-full h-full object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;