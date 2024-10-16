import { useState } from "react";

const ProximosFinales = () => {
  const [carreraIndex, setCarreraIndex] = useState(0);

  const carreras = ["Analista de Sistemas", "Publicidad"];
  const finales = [
    // Lista de finales para cada carrera
    [
      { id: 1, materia: "Programación", fecha: "2024-10-30" },
      { id: 2, materia: "Bases de Datos", fecha: "2024-11-05" },
    ],
    [
      { id: 1, materia: "Marketing Digital", fecha: "2024-10-28" },
      { id: 2, materia: "Publicidad Audiovisual", fecha: "2024-11-10" },
    ],
  ];

  // Cambiar carrera con las flechas
  const siguiente = () =>
    setCarreraIndex((prev) => (prev + 1) % carreras.length);
  const anterior = () =>
    setCarreraIndex((prev) => (prev - 1 + carreras.length) % carreras.length);

  return (
    <div className="p-6 bg-gray-100 w-[15vw] h-[47vh] rounded-xl mt-[-165px]">
      <h1 className="text-3xl font-bold text-center mb-4">Próximos Finales</h1>
      <div className="flex justify-between items-center mb-6">
        <button
          className="text-xl px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={anterior}
        >
          ⬅️
        </button>
        <h2 className="text-2xl font-semibold">{carreras[carreraIndex]}</h2>
        <button
          className="text-xl px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={siguiente}
        >
          ➡️
        </button>
      </div>

      <div className="grid gap-4 grid-rows-1 sm:grid-rows-2 lg:grid-rows-3">
        {finales[carreraIndex].map((final) => (
          <div
            key={final.id}
            className="p-4 bg-white shadow-md rounded-md hover:shadow-lg"
          >
            <h3 className="text-lg font-bold mb-2">{final.materia}</h3>
            <p className="text-gray-700">Fecha: {final.fecha}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProximosFinales;
