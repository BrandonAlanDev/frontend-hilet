import React, { useState } from 'react';

const BuscadorAlumnos = ({ setBusqueda, setEstadoFiltro }) => {
  const [busquedaTexto, setBusquedaTexto] = useState('');
  const [estado, setEstado] = useState('');

  const handleTextoChange = (event) => {
    setBusquedaTexto(event.target.value);
    setBusqueda(event.target.value);
  };

  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
    setEstadoFiltro(event.target.value);
  };

  return (
    <div className='flex flex-row w-[250px] lg:w-[40vw] justify-between flex-wrap gap-5'>
      <input
        type="text"
        placeholder="Buscar ..."
        className="border border-none p-2 rounded-lg w-[250px] lg:w-[18vw] text-lg"
        value={busquedaTexto}
        onChange={handleTextoChange}
      />
      <select
        className="border border-none p-2 rounded-lg w-[250px] lg:w-[18vw] text-lg"
        value={estado}
        onChange={handleEstadoChange}
      >
        <option value="" disabled>Seleccionar Estado</option>
        <option value="">Todos</option>
        <option value="Regular">Regular</option>
        <option value="Libre">Libre</option>
      </select>
    </div>
  );
};

export default BuscadorAlumnos;
