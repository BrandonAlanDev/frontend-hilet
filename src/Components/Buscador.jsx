import React, { useState, useEffect } from 'react';
import InputField from './InputField';

const Buscador = ({ setBusqueda, setEstadoFiltro, color }) => {
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
      <div className='flex flex-row w-[50vw] justify-evenly gap-5'>
        <InputField
          type="text"
          placeholder="Buscar ..."
          value={busquedaTexto}
          onChange={handleTextoChange}
          ancho="w-[250px] lg:w-[18vw]"
          borde={color}
          >
        </InputField>
        <select
          className={`border p-2 rounded-full flex-1 appearance-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 leading-tight placeholder-analista placeholder-opacity-100 negrita w-[250px]  lg:w-[18vw] text-lg border-${color}`}
          value={estado}
          onChange={handleEstadoChange}
        >
          <option value="" disabled>Estado</option>
          <option value="">Todos</option>
          <option value="Aprobado">Aprobado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Desaprobado">Desaprobado</option>
          <option value="Correlativa pendiente">Correlativa pendiente</option>
          <option value="Por cursar">Por cursar</option>
          
        </select>
      </div>
    </>
  );
};

export default Buscador;