function Hero() {
  const redes = [
    { nombre: 'Instagram', url: 'https://www.instagram.com/lumiere.antofagasta/' },
    { nombre: 'Facebook', url: 'https://web.facebook.com/profile.php?id=61574360982174' },
    { nombre: 'Tiktok', url: 'https://www.tiktok.com/@lumiere.antofagasta' },
    { nombre: 'Youtube', url: 'https://www.youtube.com/@lumiereestudio' },
  ];

  return (
    <section className="flex flex-col w-full select-none">
      {/* Sección Hero con video a pantalla completa y padding superior para el Header flotante */}
      <div className="relative w-full min-h-[90vh] md:min-h-0 pt-36 pb-16 md:pt-44 md:pb-28 px-6 md:px-12 lg:px-24 flex items-center justify-center overflow-hidden bg-black">
        
        {/* Video de fondo a pantalla completa */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src="/video/1024(1).mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          {/* Capa de contraste sutil para lectura perfecta */}
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        </div>

        {/* Contenido Grid superpuesto sobre el video */}
        <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 md:gap-10">
          
          {/* Bloque de Textos y Redes */}
          <div className="max-w-2xl text-center md:text-left order-2 md:order-1">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.2] md:leading-[1.15] drop-shadow-md">
              Lumiere Studio:
              <br />
              <span className="italic text-[#f5e6e0] font-normal">El Arte</span>
              <br />
              <span className="italic text-[#f5e6e0] font-normal">de Transformar tu</span>
              <br />
              Mirada
            </h1>

            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 md:mt-8">
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

          {/* LOGO LUMIERE */}
          <div className="flex items-center justify-center order-1 md:order-2 w-[220px] sm:w-[260px] md:w-[320px] lg:w-[400px] aspect-square pointer-events-none justify-self-center">
            <img 
              src="/img/logolumiere.png" 
              alt="Lumiere Logo Sombra" 
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>

        </div>
      </div>

      {/* Parte Inferior: Imagen original (hero.webp) */}
      <div className="w-full h-[420px] md:h-[600px]">
        <img
          src="/img/hero.webp"
          alt="Aplicación de maquillaje de cejas"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}

export default Hero;