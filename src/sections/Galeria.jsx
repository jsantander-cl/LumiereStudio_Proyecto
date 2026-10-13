import { useState } from 'react';

const testimonios = [
  {
    texto: "Hoy fui a mi cita de microblading y estoy muy feliz con el resultado. La especialista fue muy profesional y me explicó todo el proceso. Mis cejas se ven naturales y definidas. ¡Definitivamente volveré!",
    usuario: "@_PAZ.IS"
  },
  {
    texto: "El servicio de lifting coreano superó completamente mis expectativas. Mis pestañas quedaron increíbles, con un rizo perfecto y súper naturales. El ambiente del estudio es muy acogedor y profesional.",
    usuario: "@VALENTINA.M"
  },
  {
    texto: "Excelente atención y cuidado en cada detalle. Me hice la laminación de cejas y el cambio fue inmediato pero suave. Además me asesoraron muy bien sobre los cuidados posteriores. 100% recomendado.",
    usuario: "@CAMILA_ST"
  }
];

export default function Galeria() {
  const [indiceActual, setIndiceActual] = useState(0);

  const anteriorTestimonio = () => {
    setIndiceActual((prev) => (prev === 0 ? testimonios.length - 1 : prev - 1));
  };

  const siguienteTestimonio = () => {
    setIndiceActual((prev) => (prev === testimonios.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[var(--color-abrow-darkbg2)] text-white py-16 px-6 md:px-12 lg:px-24 border-t border-b border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Comillas decorativas */}
        <span className="font-serif text-5xl text-white/30 leading-none select-none">
          “
        </span>

        {/* Contenido del Testimonio Dinámico */}
        <div className="relative w-full px-8 md:px-16 min-h-[120px] flex flex-col items-center justify-center">
          {/* Botón Flecha Izquierda */}
          <button
            onClick={anteriorTestimonio}
            aria-label="Testimonio anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-2xl transition-colors cursor-pointer p-2"
          >
            ‹
          </button>

          {/* Texto y Usuario */}
          <div className="space-y-4 animate-[fadeIn_0.3s_ease-in-out]">
            <p className="font-serif italic text-base md:text-lg leading-relaxed text-white/90 max-w-2xl">
              "{testimonios[indiceActual].texto}"
            </p>
            <span className="block font-sans text-xs tracking-widest text-white/60 uppercase font-medium">
              {testimonios[indiceActual].usuario}
            </span>
          </div>

          {/* Botón Flecha Derecha */}
          <button
            onClick={siguienteTestimonio}
            aria-label="Siguiente testimonio"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-2xl transition-colors cursor-pointer p-2"
          >
            ›
          </button>
        </div>

        {/* Puntos de Navegación (Paginadores) */}
        <div className="flex items-center gap-2.5 pt-2">
          {testimonios.map((_, index) => (
            <button
              key={index}
              onClick={() => setIndiceActual(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                indiceActual === index
                  ? 'w-6 bg-white'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}