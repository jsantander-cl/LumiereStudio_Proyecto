const ArticuloItem = ({ imagen, fechaCategoria, titulo, extracto }) => (
  <div className="flex flex-col items-start space-y-3">
    <div className="w-full aspect-[4/3] overflow-hidden">
      <img src={imagen} alt={titulo} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
    </div>
    
    <span className="font-sans text-[10px] tracking-widest text-[var(--color-abrow-muted)] uppercase font-semibold">
      {fechaCategoria}
    </span>
    
    <h3 className="font-serif text-lg text-[var(--color-abrow-dark)] leading-snug">
      {titulo}
    </h3>
    
    <p className="font-sans text-sm text-[var(--color-abrow-muted)]/80 leading-relaxed line-clamp-3">
      {extracto}
    </p>

    <button className="bg-[var(--color-abrow-dark)] text-white px-5 py-2 font-sans text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition-all mt-2">
      LEER
    </button>
  </div>
);

export default function Blog() {
  return (
    <section className="bg-[var(--color-abrow-cream)] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)]">
            Nuestras Noticias & <span className="italic text-[var(--color-abrow-muted)] font-normal">Articulos</span>
          </h2>
          <span className="block font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            TODO SOBRE BELLEZA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ArticuloItem 
            imagen="/img/BLOG 1.png"
            fechaCategoria="12 FEB 2026 | CONSEJOS"
            titulo="¿Cómo Definir la Forma y el Color Perfectos para tus Cejas?"
            extracto="Primero, mide la distancia entre el interior de tu ceja y la comisura externa de tu ojo para determinar la longitud ideal de tu ceja..."
          />
          <ArticuloItem 
            imagen="/img/BLOG 2.png"
            fechaCategoria="02 MAR 2026 | SEGURIDAD"
            titulo="¿Cuáles son las Principales Normas de Seguridad para Realizar tus Cejas en Lumiere?"
            extracto="Nos tomamos muy en serio la higiene y la esterilización de nuestros instrumentos. Nuestra especialista sigue reglas claras: 1. Utilizar siempre la desinfección adecuada..."
          />
          <ArticuloItem 
            imagen="/img/BLOG 3.png"
            fechaCategoria="10 MAR 2026 | TIPS"
            titulo="¿Qué es el Microblading y Por Qué es la Mejor Solución para tus Cejas?"
            extracto="El microblading es una técnica de tatuaje de cejas semipermanente que se utiliza para crear la apariencia de vellos. El microblading es una forma de tatuaje..."
          />
        </div>

      </div>
    </section>
  );
}