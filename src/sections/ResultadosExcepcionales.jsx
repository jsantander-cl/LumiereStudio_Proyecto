const puntos = [
  {
    titulo: 'Lugar Acogedor',
    texto: 'Nuestro estudio está ubicado en una villa cerrada con áreas verdes.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <image href="/svg/001-hair-salon.svg" width="24" height="24" />
      </svg>
    ),
  },
  {
    titulo: 'Herramientas Seguras',
    texto: 'Todos los instrumentos que utilizamos están esterilizados.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <image href="/svg/002-eyebrow-pencil.svg" width="24" height="24" />
      </svg>
    ),
  },
  {
    titulo: 'Servicio Rápido',
    texto: '¡Consigue tus cejas en tan solo una hora y media!',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <image href="/svg/016-beauty-salon.svg" width="24" height="24" />
      </svg>
    ),
  },
];

export default function ResultadosExcepcionales() {
  return (
    <section className="bg-[var(--color-abrow-darkbg)] text-white grid grid-cols-1 lg:grid-cols-2">
      {/* Columna Texto */}
      <div className="px-6 md:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-center space-y-6 relative overflow-hidden">
        <div className="relative z-10 space-y-6 max-w-lg">
          <h2 className="font-serif text-3xl md:text-5xl leading-tight">
            Ofreciendo Resultados <span className="italic">Excepcionales</span> en Todo Momento
          </h2>
          <span className="block font-sans text-[10px] tracking-[0.2em] text-white uppercase font-semibold">
            Tu mirada: nuestra pasión
          </span>
          <p className="font-sans text-sm text-white/70 leading-relaxed">
            Estilista de cejas profesional altamente capacitada que se especializa en las técnicas para dar forma y arreglar las cejas y pestañas a la perfección. Utiliza una variedad de herramientas y productos para realzar la forma y el arco de las cejas y pestañas, rellenar las zonas con menos vello y crear un look personalizado.
          </p>

          <div className="space-y-6 pt-2 font-black">
            {puntos.map((p) => (
              <div key={p.titulo} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  {p.icono}
                </div>
                <div>
                  <h4 className="font-serif text-lg">{p.titulo}</h4>
                  <p className="font-sans italic text-xs text-white/60">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-sans text-sm text-white/70 leading-relaxed pt-2">
            Nuestra especialista en cejas crea un look impecable y natural que dura semanas. Además, te asesora sobre cómo mantener la forma de tus cejas y te da consejos para elegir los productos y herramientas adecuados.
          </p>
        </div>
      </div>

      {/* Columna Imagen */}
      <div className="min-h-[360px] lg:min-h-[640px]">
        <img
          src="/img/trabajando.webp"
          alt="Artista trabajando en cejas"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
