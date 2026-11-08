import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BtnRegresar({ className = '' }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3D1D1C]/20 bg-[#faf7f5]/80 backdrop-blur-sm font-sans text-xs uppercase tracking-widest text-[#3D1D1C] hover:bg-[#3D1D1C] hover:text-white hover:border-[#3D1D1C] transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer ${className}`}
    >
      <span className="transition-transform duration-300 group-hover:-translate-x-1 font-bold">
        ←
      </span>
      <span>Regresar</span>
    </button>
  );
}