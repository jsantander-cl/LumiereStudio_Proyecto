import { useState, useEffect } from 'react';

const preguntasIzquierda = [
  {
    pregunta: '¿Cuánto duran los procedimientos?',
    respuesta:
      'La mayoría de nuestros tratamientos de cejas y pestañas duran entre 60 y 90 minutos, dependiendo de la técnica elegida.',
  },
  {
    pregunta: '¿Es doloroso el microblading?',
    respuesta:
      'Aplicamos anestesia tópica antes de comenzar, por lo que la mayoría de las clientas solo sienten una leve molestia.',
  },
  {
    pregunta: '¿Podría aconsejarme qué tratamiento elegir?',
    respuesta:
      'Nuestra experta te ofrecerá un asesoramiento honesto sobre tu tipo de rostro, la forma actual de tus cejas y los estilos de pestañas que mejor te sentarán.',
  },
];

const preguntasDerecha = [
  {
    pregunta: '¿Puedo venir con un amigo o pareja?',
    respuesta: 'Por supuesto, contamos con una sala de espera cómoda para quien te acompañe.',
  },
  {
    pregunta: '¿Cómo puedo comprar una tarjeta de regalo?',
    respuesta: 'Puedes adquirir tarjetas de regalo directamente desde nuestra sección "Tarjetas de Regalo" en el sitio o de manera presencial.',
  },
  {
    pregunta: '¿Qué ocurre si quiero cancelar mi cita?',
    respuesta:
      'Puedes reprogramar tu cita sin costo hasta 24 horas antes escribiéndonos por cualquiera de nuestros canales. Si deseas cancelar un servicio agendado no se realiza reembolso de reserva.',
  },
];

function ItemAcordeon({ item, abierto, onClick }) {
  return (
    <div className="border-b border-[var(--color-abrow-dark)]/10 py-5">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <span className="font-serif text-lg md:text-xl text-[var(--color-abrow-dark)]">
          {item.pregunta}
        </span>
        <svg
          className={`w-4 h-4 shrink-0 text-[var(--color-abrow-dark)] transition-transform duration-300 ${
            abierto ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          abierto ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <p className="overflow-hidden font-sans text-sm text-[var(--color-abrow-muted)] leading-relaxed">
          {item.respuesta}
        </p>
      </div>
    </div>
  );
}

export default function PreguntasFrecuentes() {
  // 1. Iniciar con el acordeón cerrado para evitar desplazamientos accidentales
  const [abierto, setAbierto] = useState(null);

  // 2. Forzar scroll al inicio cuando se monta el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const alternar = (id) => setAbierto((actual) => (actual === id ? null : id));

  return (
    <section className="bg-[var(--color-abrow-nude)] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-abrow-dark)]">
          ¿Aún tienes <span className="italic text-[var(--color-abrow-muted)]">preguntas?</span>
        </h2>

        <p className="font-sans text-xs tracking-widest uppercase text-[var(--color-abrow-muted)] mb-2 mt-10">
          Preguntas frecuentes
        </p>
        <p className="font-sans italic text-sm text-[var(--color-abrow-muted)] mb-6">
          Nos esforzamos por brindar un servicio personalizado a cada uno de nuestros clientes. Si no
          encontró la respuesta a su pregunta, contáctenos por el medio que le resulte más conveniente.
        </p>

        <div className="grid md:grid-cols-2 gap-x-16">
          {preguntasIzquierda.map((item, i) => (
            <div key={`fila-${i}`} className="contents">
              <ItemAcordeon
                item={item}
                abierto={abierto === `izq-${i}`}
                onClick={() => alternar(`izq-${i}`)}
              />
              <ItemAcordeon
                item={preguntasDerecha[i]}
                abierto={abierto === `der-${i}`}
                onClick={() => alternar(`der-${i}`)}
              />
            </div>
          ))}
        </div>
      </div>  
    </section>
  );
}