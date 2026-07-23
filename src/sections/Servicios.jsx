import React from 'react';

const FilaClase = ({ imagen, precio, fecha, titulo, descripcion, inverso }) => (
  <div className={`flex flex-col ${inverso ? 'lg:flex-row-reverse' : 'lg:flex-row'} w-full items-stretch`}>
    <div className="w-full lg:w-1/2">
      <img src={imagen} alt={titulo} className="w-full h-full object-cover min-h-[300px] lg:min-h-[380px]" />
    </div>
    
    <div className="w-full lg:w-1/2 bg-[var(--color-abrow-nude)]/40 flex flex-col justify-center items-start p-8 md:p-14 space-y-4">
      <span className="font-sans text-xs text-[var(--color-abrow-muted)] font-medium">
        {precio} | <span className="italic">{fecha}</span>
      </span>
      <h3 className="font-serif text-2xl text-[var(--color-abrow-dark)]">{titulo}</h3>
      <p className="font-sans text-xs text-[var(--color-abrow-muted)] leading-relaxed">{descripcion}</p>
      
      <button className="bg-[var(--color-abrow-dark)] text-white px-6 py-2.5 font-sans text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition-all mt-2">
        INSCRIBETE
      </button>
    </div>
  </div>
);

export default function Servicios() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Encabezado */}
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)]">
            Visita Nuestra Sección <span className="italic text-[var(--color-abrow-muted)] font-normal">de próximas</span> Master Classes
          </h2>
          <span className="block font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            Master Classes
          </span>
        </div>

        {/* Filas en Zigzag */}
        <div className="max-w-5xl mx-auto space-y-0 shadow-sm overflow-hidden">
          <FilaClase 
            inverso={false}
            imagen="/public/img/INSTA3.png"
            precio="$300.000"
            fecha="Proximamente, 2026"
            titulo="Formación con Modelos en Vivo"
            descripcion="Este taller está diseñado para brindarte los conocimientos y las habilidades que necesitas para convertirte en un artista de cejas exitoso, trabajando con una modelo en vivo en nuestro estudio."
          />
          <FilaClase 
            inverso={true}
            imagen="/public/img/SERVICIO2.png"
            precio="$100.000"
            fecha="Proximamente, 2026"
            titulo="Perfecciona tus Técnicas de Microblading"
            descripcion="Este taller de un día te enseñará todos los fundamentos del microblading, desde una descripción detallada de la técnica hasta las últimas tendencias en microblading de cejas."
          />
        </div>

      </div>
    </section>
  );
}