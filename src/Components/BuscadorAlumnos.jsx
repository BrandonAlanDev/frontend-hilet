import React, { useState } from 'react';
import InputField from './InputField';

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
      <InputField
        type="text"
        placeholder="Buscar ..."
        value={busquedaTexto}
        onChange={handleTextoChange}
        ancho="w-[250px] lg:w-[18vw]"
        >
      </InputField>
      <select
        className="border p-2 rounded-full flex-1 appearance-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 leading-tight placeholder-analista placeholder-opacity-100 negrita w-[250px]  lg:w-[18vw] text-lg border-analista"
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
