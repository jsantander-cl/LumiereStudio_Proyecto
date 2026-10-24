import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Forzar que la página siempre cargue arriba del todo
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  const producto = searchParams.get('producto') || 'Sérum Puluk Lash Booster';
  const precio = searchParams.get('precio') || '$25.000';
  const tipo = searchParams.get('tipo') || 'producto';

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    rut: '',
    tarjeta: '',
    exp: '',
    cvv: ''
  });
  const [pagado, setPagado] = useState(false);

  const manejarSubmit = (e) => {
    e.preventDefault();
    setPagado(true);
  };

  if (pagado) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[var(--color-abrow-cream)] px-6 text-center">
        <div className="bg-white p-10 max-w-md shadow-md space-y-4 border border-[var(--color-abrow-dark)]/10">
          <span className="text-4xl">✨</span>
          <h2 className="font-serif text-3xl text-[var(--color-abrow-dark)]">¡Pago Exitoso!</h2>
          <p className="font-sans text-xs text-[var(--color-abrow-muted)] leading-relaxed">
            Hemos procesado la compra de <strong>{producto}</strong> por <strong>{precio}</strong>. Te enviamos el comprobante a tu correo.
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-[var(--color-abrow-dark)] text-white py-3 font-sans text-xs uppercase tracking-widest mt-4 cursor-pointer"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[var(--color-abrow-cream)] py-16 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Resumen del Pedido */}
        <div className="bg-white p-8 border border-[var(--color-abrow-dark)]/10 shadow-sm space-y-6 h-fit">
          <h3 className="font-serif text-2xl text-[var(--color-abrow-dark)]">Resumen de Compra</h3>
          
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <p className="font-serif text-lg text-[var(--color-abrow-dark)]">{producto}</p>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-abrow-muted)]">
                {tipo === 'giftcard' ? 'Gift Card Digital' : 'Producto Cosmético'}
              </span>
            </div>
            <span className="font-serif italic text-xl text-[var(--color-abrow-dark)]">{precio}</span>
          </div>

          <div className="flex justify-between items-center font-semibold pt-2 text-[var(--color-abrow-dark)]">
            <span>Total a Pagar</span>
            <span className="font-serif text-2xl">{precio}</span>
          </div>
        </div>

        {/* Formulario de Pago */}
        <div className="bg-white p-8 border border-[var(--color-abrow-dark)]/10 shadow-sm space-y-6">
          <h3 className="font-serif text-2xl text-[var(--color-abrow-dark)]">Pago con Tarjeta</h3>
          
          <form onSubmit={manejarSubmit} className="space-y-4 font-sans text-xs">
            <div>
              <label className="block text-[var(--color-abrow-muted)] uppercase tracking-wider mb-1">Nombre Completo</label>
              <input 
                type="text" 
                required 
                className="w-full border border-gray-200 p-2.5 focus:outline-none focus:border-[var(--color-abrow-dark)]"
                value={form.nombre}
                onChange={(e) => setForm({...form, nombre: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[var(--color-abrow-muted)] uppercase tracking-wider mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                required 
                className="w-full border border-gray-200 p-2.5 focus:outline-none focus:border-[var(--color-abrow-dark)]"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[var(--color-abrow-muted)] uppercase tracking-wider mb-1">Número de Tarjeta</label>
              <input 
                type="text" 
                maxLength="16"
                placeholder="**** **** **** ****" 
                required 
                className="w-full border border-gray-200 p-2.5 focus:outline-none focus:border-[var(--color-abrow-dark)]"
                value={form.tarjeta}
                onChange={(e) => setForm({...form, tarjeta: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--color-abrow-muted)] uppercase tracking-wider mb-1">Expiración (MM/AA)</label>
                <input 
                  type="text" 
                  placeholder="MM/AA" 
                  required 
                  className="w-full border border-gray-200 p-2.5 focus:outline-none focus:border-[var(--color-abrow-dark)]"
                  value={form.exp}
                  onChange={(e) => setForm({...form, exp: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[var(--color-abrow-muted)] uppercase tracking-wider mb-1">CVV</label>
                <input 
                  type="text" 
                  maxLength="4"
                  placeholder="123" 
                  required 
                  className="w-full border border-gray-200 p-2.5 focus:outline-none focus:border-[var(--color-abrow-dark)]"
                  value={form.cvv}
                  onChange={(e) => setForm({...form, cvv: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[var(--color-abrow-dark)] text-white py-3.5 font-sans text-xs uppercase tracking-widest hover:opacity-95 transition-opacity mt-6 cursor-pointer"
            >
              PAGAR AHORA
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}