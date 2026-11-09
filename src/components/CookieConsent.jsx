import { useState, useEffect } from 'react';

function CookieConsent() {
  const [consentState, setConsentState] = useState(null); // 'accepted', 'rejected' o null
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lumiere_cookie_consent');
    if (consent) {
      setConsentState(consent);
      setAcceptedState(true);
    }
  }, []);

  const handleAction = (status) => {
    localStorage.setItem('lumiere_cookie_consent', status);
    setConsentState(status);
  };

  const [acceptedState, setAcceptedState] = useState(false);
  // Si rechaza, consideramos listo el flujo para ocultar el modal de inmediato
  const isReady = consentState === 'rejected' || (consentState === 'accepted' && isVideoReady);

  useEffect(() => {
    const handleVideoLoaded = () => {
      setIsVideoReady(true);
    };

    window.addEventListener('lumiere-video-ready', handleVideoLoaded);
    return () => {
      window.removeEventListener('lumiere-video-ready', handleVideoLoaded);
    };
  }, []);

  const shouldHide = consentState !== null && isReady;

  if (isDismissed) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl transition-all duration-700 px-4 ${
        shouldHide ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
      onTransitionEnd={() => {
        if (shouldHide) setIsDismissed(true);
      }}
    >
      {/* SPINNER DE CARGA (Solo aparece si acepta y el video del Hero sigue cargando) */}
      {consentState === 'accepted' && !isVideoReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-md text-white select-none z-10">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="w-10 h-10 border-2 border-transparent border-t-[#f5e6e0] border-r-[#f5e6e0] rounded-full animate-spin" />
          </div>
          <span className="font-serif tracking-[0.3em] text-xs uppercase text-[#f5e6e0]/90 mt-6 font-light">
            Cargando Lumiere Studio
          </span>
        </div>
      )}

      {/* VENTANA FLOTANTE DE COOKIES Y PRIVACIDAD */}
      {consentState === null && (
        <div className="relative w-full max-w-lg bg-[#251010]/95 border border-white/15 rounded-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-center flex flex-col items-center animate-fade-in">
          
          {/* Sutil acento visual */}
          <div className="w-12 h-[1px] bg-[#f5e6e0]/40 mb-6" />

          <h3 className="font-serif text-xl sm:text-2xl text-white font-normal tracking-wide mb-3">
            Bienvenida a <span className="italic font-light text-[#f5e6e0]">Lumiere</span>
          </h3>

          <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light mb-6 px-2 text-justify sm:text-center">
            En <span className="text-[#f5e6e0] font-medium">Lumiere Studio</span> utilizamos cookies técnicas y analíticas para mejorar tu experiencia de navegación. Asimismo, los datos personales que nos proporciones a través de nuestros formularios de contacto, reservas o inscripciones serán tratados con estricta confidencialidad de acuerdo con las normativas de protección de datos para gestionar tus solicitudes.
          </p>

          <div className="w-full flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={() => handleAction('rejected')}
              className="w-full sm:w-1/2 border border-white/30 text-white hover:bg-white/10 font-sans text-xs uppercase tracking-[0.2em] py-3.5 rounded-full transition-all duration-300 font-medium"
            >
              Rechazar
            </button>
            <button
              onClick={() => handleAction('accepted')}
              className="w-full sm:w-1/2 bg-[#f5e6e0] text-[#251010] hover:bg-white font-sans text-xs uppercase tracking-[0.2em] py-3.5 rounded-full transition-all duration-300 font-medium shadow-lg hover:scale-[1.02]"
            >
              Aceptar Todo
            </button>
          </div>

          <div className="w-8 h-[1px] bg-white/10 mt-8" />
        </div>
      )}
    </div>
  );
}

export default CookieConsent;