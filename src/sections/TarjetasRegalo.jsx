import React from 'react';

const GiftCardItem = ({ price, description, features }) => (
  <div className="bg-white p-8 flex flex-col justify-between items-start shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="space-y-4 w-full">
      <div className="flex items-baseline space-x-2">
        <span className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)]">{price}</span>
        <span className="font-sans text-[10px] tracking-widest text-[#B39B8B] uppercase font-medium">GIFT CARD</span>
      </div>
      
      <p className="font-serif italic text-xs text-[var(--color-abrow-muted)] leading-relaxed">
        {description}
      </p>
      
      <ul className="space-y-2 pt-2 border-t border-gray-100">
        {features.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-2 text-xs font-sans text-gray-600">
            <span className="text-[10px] text-[var(--color-abrow-dark)]">✦</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <button className="mt-8 w-full bg-[var(--color-abrow-dark)] text-white py-3 font-sans text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition-all">
      COMPRAR
    </button>
  </div>
);

export default function TarjetasRegalo() {
  return (
    <section id="gift-cards" className="bg-[var(--color-abrow-cream)] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Encabezado */}
        <div className="space-y-2">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-abrow-dark)]">
            Sorprende a tus <span className="italic text-[var(--color-abrow-muted)] font-normal">Seres Queridos</span> <br />
            con Nuestras Tarjetas de Regalo
          </h2>
          <span className="block font-sans text-[10px] tracking-[0.2em] text-[var(--color-abrow-muted)] uppercase font-semibold">
            NUESTRAS Gift Cards
          </span>
        </div>

        {/* Grid 3 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GiftCardItem 
            price="$70.000"
            description="Un bonito regalo para una amiga en cualquier ocasión. Se puede usar varias veces al mes."
            features={["1 Lifting Coreano;", "1 Laminacion de Cejas;", "1 Limpieza Facial."]}
          />
          <GiftCardItem 
            price="$150.000"
            description="Un regalo estupendo para tu amiga o pareja o familiar. El regalo incluye los siguientes servicios:"
            features={["1 Microblading;", "1 lifting Coreano;", "1 Limpieza Facial."]}
          />
          <GiftCardItem 
            price="$200.000"
            description="¡El destinatario se olvidará del maquillaje de cejas! La tarjeta de regalo incluye:"
            features={["1 Microblading;", "3 lifting Coreano;", "2 Limpieza Facial."]}
          />
        </div>

      </div>
    </section>
  );
}