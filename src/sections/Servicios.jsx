import { Link } from 'react-router-dom';

const FilaClase = ({ imagen, precio, fecha, titulo, descripcion, inverso, disponible = true }) => (
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
      
      {disponible ? (
        <Link 
          to={`/inscripcion-masterclass?titulo=${encodeURIComponent(titulo)}&precio=${encodeURIComponent(precio)}&fecha=${encodeURIComponent(fecha)}`}
          className="bg-[var(--color-abrow-dark)] text-white px-6 py-2.5 font-sans text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition-all mt-2 inline-block"
        >
          INSCRÍBETE
        </Link>
      ) : (
        <button 
          disabled 
          className="bg-gray-400 text-white px-6 py-2.5 font-sans text-[10px] uppercase tracking-widest cursor-not-allowed mt-2"
        >
          CUPOS AGOTADOS
        </button>
      )}
    </div>
  </div>
);

export default function Servicios() {
  return (
    <section id="master-classes" className="scroll-mt-20 bg-white py-5 md:py-20 px-6 md:px-12 lg:px-24 select-none">
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
            imagen="/img/INSTA3.webp"
            precio="$300.000"
            fecha="Próximamente, 2026"
            titulo="Formación con Modelos en Vivo"
            descripcion="Este taller está diseñado para brindarte los conocimientos y las habilidades que necesitas para convertirte en un artista de cejas exitoso, trabajando con una modelo en vivo en nuestro estudio."
            disponible={true}
          />
          <FilaClase 
            inverso={true}
            imagen="/img/SERVICIO2.webp"
            precio="$100.000"
            fecha="Próximamente, 2026"
            titulo="Perfecciona tus Técnicas de Microblading"
            descripcion="Este taller de un día te enseñará todos los fundamentos del microblading, desde una descripción detallada de la técnica hasta las últimas tendencias en microblading de cejas."
            disponible={true}
          />
        </div>

      </div>
    </section>
  );
}