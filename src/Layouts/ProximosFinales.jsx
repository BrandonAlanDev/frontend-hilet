import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ProximosFinales = () => {
  const [carreraIndex, setCarreraIndex] = useState(0);
  const [pagina, setPagina] = useState(0);

  const carreras = ["Analista de Sistemas", "Publicidad"];

  const finales = [
    [
      { id: 1, materia: "Algoritmos III", fecha: "2024-12-20" },
      { id: 2, materia: "Bases de Datos", fecha: "2024-11-27" },
      { id: 3, materia: "Analisis Matematico II", fecha: "2024-12-05" },
    ],
    [
      { id: 1, materia: "Marketing Digital", fecha: "2024-10-28" },
      { id: 2, materia: "Publicidad Audiovisual", fecha: "2024-11-10" },
      { id: 3, materia: "Diseño", fecha: "2024-11-28" },
    ],
  ];

  const finalesPorPagina = 2; // Número de finales por página

  // Cambiar carrera con las flechas
  const siguienteCarrera = () =>
    setCarreraIndex((prev) => (prev + 1) % carreras.length);
  const anteriorCarrera = () =>
    setCarreraIndex((prev) => (prev - 1 + carreras.length) % carreras.length);

  // Cambiar página con las flechas
  const siguientePagina = () =>
    setPagina((prev) => (prev + 1) % Math.ceil(finales[carreraIndex].length / finalesPorPagina));
  const anteriorPagina = () =>
    setPagina((prev) => (prev - 1 + Math.ceil(finales[carreraIndex].length / finalesPorPagina)) % Math.ceil(finales[carreraIndex].length / finalesPorPagina));

  // Obtener los finales de la página actual
  const finalesActuales = finales[carreraIndex].slice(
    pagina * finalesPorPagina,
    (pagina + 1) * finalesPorPagina
  );

  const totalPaginas = Math.ceil(finales[carreraIndex].length / finalesPorPagina);
  const puntos = Array.from({ length: totalPaginas }, (_, index) => index);

  return (
    <div className="p-6 bg-blanco w-[15vw] h-[47vh] rounded-lg mt-[-160px] flex flex-col justify-center">
      <h1 className="text-2xl text-analista font-bold text-center mb-4">Próximos Finales</h1>
      <div className="flex justify-between items-center mb-6 bg-analista w-full p-0 rounded-xl">
        <button
          className="text-white"
          onClick={anteriorCarrera}
        >
          <ArrowBackIcon fontSize="medium" />
        </button>
        <h2 className="text-xl font-semibold text-center text-white p-2 m-0">{carreras[carreraIndex]}</h2>
        <button
          className="text-white"
          onClick={siguienteCarrera}
        >
          <ArrowForwardIcon fontSize="medium" />
        </button>
      </div>
      <div className="flex-grow gap-4">
        {finalesActuales.map((final) => (
          <div
            key={final.id}
            className="p-4 mb-5 bg-white shadow-md rounded-md hover:shadow-lg"
          >
            <h3 className="text-lg text-analista font-bold mb-2">{final.materia}</h3>
            <p className="text-gray-700">Fecha: {final.fecha}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="text-analista"
          onClick={anteriorPagina}
        >
          <ArrowBackIcon fontSize="medium" />
        </button>
        <div className="flex items-center gap-1">
          {puntos.map((punto) => (
            <div
              key={punto}
              className={`w-2 h-2 rounded-full ${punto === pagina ? 'bg-analista' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <button
          className="text-analista"
          onClick={siguientePagina}
        >
          <ArrowForwardIcon fontSize="medium" />
        </button>
      </div>
    </div>
  );
};

export default ProximosFinales;
