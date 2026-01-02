import React, { useState } from 'react';
import { seccionesDisponibles } from '../data/seccionesDisponibles';

function ArmaTuWeb() {
  const [seleccionadas, setSeleccionadas] = useState(
    seccionesDisponibles.filter(s => s.incluidaPorDefecto)
  );

  const toggleSeleccion = (seccion) => {
    // Prevent unselecting if it's the only one left and it's the landing page? 
    // The original code implies we can remove anything, but Landing Page is usally base.
    // Following original logic.
    const existe = seleccionadas.find(s => s.id === seccion.id);
    if (existe) {
      setSeleccionadas(seleccionadas.filter(s => s.id !== seccion.id));
    } else {
      setSeleccionadas([...seleccionadas, seccion]);
    }
  };

  const total = seleccionadas.reduce((acc, s) => acc + s.precio, 0);

  // 🔗 Generar mensaje para WhatsApp
  const generarLinkWhatsApp = () => {
    const lista = seleccionadas
      .map(s => `• ${s.nombre} - $${s.precio.toLocaleString('es-CL')}`)
      .join('\n');

    const mensaje = `Hola, me interesa esta cotización para una web personalizada:\n\n${lista}\n\nTotal estimado: $${total.toLocaleString('es-CL')}\n\n¿Podemos conversar?`;

    const url = `https://wa.me/56941853607?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#00C853] font-display">Arma tu Web</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Selecciona las secciones que necesitas y calcula el valor final de tu sitio web.
          </p>
        </div>

        {/* Total Header */}
        <div className="text-center mb-8">
          <h4 className="text-2xl font-semibold">
            Total estimado: <span className="text-[#00C853] text-3xl font-bold">${total.toLocaleString('es-CL')}</span>
          </h4>
        </div>

        {/* Grid of Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seccionesDisponibles.map((seccion) => {
            const activa = seleccionadas.some(s => s.id === seccion.id);
            return (
              <div key={seccion.id} className="h-full">
                <div 
                  className={`
                    h-full flex flex-col p-6 rounded-xl border-2 transition-all duration-300 bg-white shadow-sm hover:shadow-md
                    ${activa ? 'border-[#00C853] ring-1 ring-[#00C853]' : 'border-gray-200'}
                  `}
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{seccion.nombre}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed h-[60px]">{seccion.descripcion}</p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-4">
                    <p className="text-right text-xl font-bold text-[#00C853] tracking-tight">
                      ${seccion.precio.toLocaleString('es-CL')}
                    </p>
                    <button
                      onClick={() => toggleSeleccion(seccion)}
                      className={`
                        w-full py-2.5 px-4 rounded-lg font-medium transition-colors duration-200
                        ${activa 
                          ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                          : 'bg-[#00C853] text-white hover:bg-[#00a844] shadow-sm hover:shadow'}
                      `}
                    >
                      {activa ? 'Quitar sección' : 'Agregar sección'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Total & CTA */}
        <div className="text-center mt-12 space-y-6">
          <div className="inline-block px-8 py-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-lg text-gray-500 mb-1">Inversión Final Estimada</h4>
            <span className="text-[#00C853] text-4xl font-bold">${total.toLocaleString('es-CL')}</span>
          </div>
          
          <div className="block">
            <button
              onClick={generarLinkWhatsApp}
              className="inline-flex items-center justify-center gap-2 bg-[#1A2A44] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#2a4066] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span>💬</span> Quiero esta cotización
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArmaTuWeb;
