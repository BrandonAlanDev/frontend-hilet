import React, { useState } from 'react';

const Buscador = ({ setBusqueda, setEstadoFiltro }) => {
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
    <>
      <div className='flex flex-row w-[50vw] justify-evenly'>
        <input
          type="text"
          placeholder="Buscar ..."
          className="border border-none p-2 rounded-lg w-[20vw] text-lg"
          value={busquedaTexto}
          onChange={handleTextoChange}
        />
        <select
          className="border border-none p-2 rounded-lg w-[20vw] text-lg"
          value={estado}
          onChange={handleEstadoChange}
        >
          <option value="" disabled>Estado</option>
          <option value="">Todos</option>
          <option value="Aprobado">Aprobado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Desaprobado">Desaprobado</option>
        </select>
      </div>
    </>
  );
};

export default Buscador;