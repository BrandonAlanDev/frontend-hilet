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
      <h1 className='text-white font-bold text-2xl mb-1'>Filtrar por ...</h1>
      <input
        type="text"
        placeholder="Materia"
        className="border border-none p-2 rounded-lg w-[20vw] text-lg"
        value={busquedaTexto}
        onChange={handleTextoChange}
      />
      <select
        className="border border-none p-2 rounded-lg w-[20vw] text-lg mt-2"
        value={estado}
        onChange={handleEstadoChange}
      >
        <option value="" disabled selected>Estado</option>
        <option value="">Todos</option>
        <option value="Aprobado">Aprobado</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Desaprobado">Desaprobado</option>
      </select>
    </>
  );
};

export default Buscador;
