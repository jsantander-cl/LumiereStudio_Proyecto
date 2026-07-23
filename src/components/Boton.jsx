import React from 'react';

function Boton({ children, onClick, variante = 'oscuro', className = '' }) {
  const estilosBase = "inline-block px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 text-center";
  
  const variantes = {
    oscuro: "bg-chocolate text-nude-claro hover:bg-chocolate-hover",
    claro: "bg-nude-claro text-chocolate border border-chocolate/20 hover:bg-nude-medio",
    linea: "border border-chocolate text-chocolate hover:bg-chocolate hover:text-nude-claro"
  };

  return (
    <button 
      onClick={onClick}
      className={`${estilosBase} ${variantes[variante]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Boton;