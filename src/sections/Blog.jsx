import { useState } from 'react';

const ArticuloItem = ({ imagen, fechaCategoria, titulo, extracto, textoCompleto }) => {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="flex flex-col items-start space-y-3">
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img 
          src={imagen} 
          alt={titulo} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
        />
      </div>
      
      <span className="font-sans text-[10px] tracking-widest text-[var(--color-abrow-muted)] uppercase font-semibold">
        {fechaCategoria}
      </span>
      
      <h3 className="font-serif text-lg text-[var(--color-abrow-dark)] leading-snug">
        {titulo}
      </h3>
      
      <p className="font-sans text-sm text-[var(--color-abrow-muted)]/80 leading-relaxed whitespace-pre-line">
        {expandido ? textoCompleto : extracto}
      </p>

      <button 
        onClick={() => setExpandido(!expandido)}
        className="bg-[var(--color-abrow-dark)] text-white px-5 py-2 font-sans text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition-all mt-2 cursor-pointer"
      >
        {expandido ? 'OCULTAR' : 'LEER'}
      </button>
    </div>
  );
};

export default function Blog() {
  return (
    <section className="bg-[var(--color-abrow-cream)] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)]">
            Nuestras Noticias & <span className="italic text-[var(--color-abrow-muted)] font-normal">Artículos</span>
          </h2>
          <span className="block font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            TODO SOBRE BELLEZA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ArticuloItem 
            imagen="/img/BLOG 1.webp"
            fechaCategoria="12 FEB 2026 | CONSEJOS"
            titulo="¿Cómo Definir la Forma y el Color Perfectos para tus Cejas?"
            extracto="Primero, mide la distancia entre el interior de tu ceja y la comisura externa de tu ojo para determinar la longitud ideal de tu ceja..."
            textoCompleto={`Primero, mide la distancia entre el interior de tu ceja y la comisura externa de tu ojo para determinar la longitud ideal de tu ceja. Este visajismo inicial es clave para lograr simetría en el rostro.\n\nEl tono de pigmento debe seleccionarse considerando tanto el color de tu cabello natural como el subtono de tu piel. Un tono demasiado oscuro puede endurecer las facciones, mientras que uno muy claro no aportará el marco necesario.\n\nEn Lumiere utilizamos técnicas de visajismo personalizado para proyectar la ceja perfecta antes de cualquier procedimiento, logrando una definición elegante y completamente armónica.`}
          />
          <ArticuloItem 
            imagen="/img/BLOG 2.webp"
            fechaCategoria="02 MAR 2026 | SEGURIDAD"
            titulo="¿Cuáles son las Principales Normas de Seguridad para Realizar tus Cejas en Lumiere?"
            extracto="Nos tomamos muy en serio la higiene y la esterilización de nuestros instrumentos. Nuestra especialista sigue reglas claras: 1. Utilizar siempre la desinfección adecuada..."
            textoCompleto={`Nos tomamos muy en serio la higiene y la esterilización de nuestros instrumentos. Nuestra especialista sigue reglas estrictas de protocolo sanitario para garantizar la seguridad de cada clienta.\n\n1. Utilizar siempre insumos desechables e higienizados de un solo uso para cada procedimiento.\n2. Desinfección de grado médico en todas las áreas de trabajo antes y después de cada cita.\n3. Uso de pigmentos orgánicos biocompatibles certificados libre de metales pesados.\n\nTu salud y bienestar son nuestra prioridad absoluta. Puedes disfrutar de tu sesión de belleza con la tranquilidad de estar en un entorno seguro y profesional.`}
          />
          <ArticuloItem 
            imagen="/img/BLOG 3.webp"
            fechaCategoria="10 MAR 2026 | TIPS"
            titulo="¿Qué es el Microblading y Por Qué es la Mejor Solución para tus Cejas?"
            extracto="El microblading es una técnica de tatuaje de cejas semipermanente que se utiliza para crear la apariencia de vellos. El microblading es una forma de tatuaje..."
            textoCompleto={`El microblading es una técnica de pigmentación semipermanente que se utiliza para crear la apariencia de vellos finos y naturales en las áreas donde faltan o donde se busca más densidad.\n\nA diferencia del tatuaje tradicional, el pigmento se deposita en la capa epidérmica superficial mediante plumas de microagujas ultra finas, logrando un trazo nítido y nada artificial.\n\nEs la solución ideal para quienes buscan simplificar su rutina diaria de maquillaje y lucir unas cejas impecables, simétricas y definidas desde el momento en que despiertan.`}
          />
        </div>

      </div>
    </section>
  );
}