import React from 'react';
import dangerImage from '../assets/Image/danger.webp';
import waringImage from '../assets/Image/warning.webp';

const Baja = ({ final }) => {
  const { nombreMateria, horario, profesor, vocal1, vocal2, horarios } = final;

  // Disponibilidad horaria
  const allAvailable = horarios.every(h => h.disponible);
  const borderColor = allAvailable ? 'border-yellow-500' : 'border-red-500';
  const imageSrc = allAvailable ? waringImage : dangerImage;

  return (
    <div id="baja" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-white p-6 rounded-lg shadow-lg ${borderColor} border-4 w-auto h-auto md:max-w-md md:mx-4 overflow-y-auto`}>
        <div className="flex flex-col md:flex-row items-center">
          {/* Parte 1: Imagen */}
          <img src={imageSrc} alt="Estado" className="w-16 h-16 mb-4 md:mb-0 md:mr-4" />

          {/* Parte 2: Información del final */}
          <div className="flex-1 text-center md:text-left overflow-y-auto text negrita">
            <p className="text-analista mb-2">¿Quieres darte de baja de este final?</p>
            <p>Materia: {nombreMateria}</p>
            <p>Horario: {horario}</p>
            <p>Profesor: {profesor}</p>
            <p>Vocal 1: {vocal1}</p>
            <p>Vocal 2: {vocal2}</p>
            <p>Horarios del Final:</p>
            {horarios.map((h, index) => (
              <p key={index} className={`mb-1 ${h.disponible ? 'text-green-500' : 'text-red-500'}`}>
                {h.dia} {h.horario} {h.disponible ? '✔️ Disponible' : '❌ No disponible'}
              </p>
            ))}
          </div>
        </div>

        {/* Parte 3: Botones */}
        <div className="mt-4 flex justify-end gap-3">
          <button className="aceptar py-2 px-4 rounded">Aceptar</button>
          <button className="cancelar py-2 px-4 rounded mr-2">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Baja;
