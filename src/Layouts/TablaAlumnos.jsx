
import React from "react";
import { useState, useEffect } from "react";
import Tabla from "../Components/Tabla";
import ModificarAlumnos from "../Layouts/ModificarAlumnos";

const ALUMNOS = [
  {
    carrera: "Analista de Sistemas",
    años: 3,
    alumnos: [
      {
        apellido: "Gonzales",
        nombre: "Sergio",
        dni: "44888666",
        regular: true,
        año: 2
      },
      {
        apellido: "Pirelli",
        nombre: "Manolo",
        dni: "33777555",
        regular: true,
        año: 1
      },
      {
        apellido: "Messi",
        nombre: "Lionel",
        dni: "12345678",
        regular: true,
        año: 3
      },
    ]
  },
  {
    carrera: "Publicidad",
    años: 3,
    alumnos: [
      {
        apellido: "Splinter",
        nombre: "Maestro",
        dni: "21848646",
        regular: true,
        año: 2
      },
      {
        apellido: "Perez",
        nombre: "Juan",
        dni: "31231212",
        regular: true,
        año: 3
      },
    ]
  },
];

const TablaAlumnos = ({ color, busqueda, estadoFiltro, buscador }) => {
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [currentCarrera, setCurrentCarrera] = useState("Analista de Sistemas");
  const [currentYear, setCurrentYear] = useState(0);

  useEffect(() => {
    const carreraData = ALUMNOS.find((carrera) => carrera.carrera === currentCarrera);
    if (carreraData) {
      const alumnos = carreraData.alumnos;

      // Filtrar alumnos según el estado (Regular o Libre)
      const filtro = estadoFiltro === "Regular"
        ? alumnos.filter((alumno) => alumno.regular)
        : estadoFiltro === "Libre"
          ? alumnos.filter((alumno) => !alumno.regular)
          : alumnos;

      // Filtrar alumnos por año y búsqueda
      const resultados = filtro.filter((alumno) => {
        const isInCurrentYear = alumno.año === currentYear + 1; // Compara con el año actual (0-indexado)
        const fullName = `${alumno.nombre} ${alumno.apellido}`.toLowerCase();
        const reverseFullName = `${alumno.apellido} ${alumno.nombre}`.toLowerCase();
        const searchTerm = busqueda.toLowerCase();

        return (
          isInCurrentYear &&
          (fullName.includes(searchTerm) ||
            reverseFullName.includes(searchTerm) ||
            alumno.dni.includes(searchTerm))
        );
      });

      setAlumnosFiltrados(resultados);
    }
  }, [currentCarrera, currentYear, busqueda, estadoFiltro]);

  const headers = ["DNI", "Apellido", "Nombre", "Regular", "Acciones"];

  return (
    <div className={`gap-8 flex flex-col rounded-xl bg-white p-8`}>
      {/* Botones para seleccionar carrera */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-between w-[48%] gap-8">
          <div className="flex flex-row gap-2 mb-4">
            <p className="text-analista text-3xl select-none"><strong>Carrera</strong></p>
            {ALUMNOS.map((alumno, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentCarrera(alumno.carrera);
                  setCurrentYear(0); // Reiniciar año al cambiar carrera
                }}
                className={`px-4 py-2 rounded-full select-none ${currentCarrera === alumno.carrera ? `${color} text-white` : "bg-white text-analista border-analista"
                  }`}
              >
                {alumno.carrera}
              </button>
            ))}
          </div>

          {/* Botones para seleccionar año */}
          <div className="flex flex-row gap-8 mb-4">
            <p className="text-analista text-3xl select-none"><strong>Año</strong></p>
            {[...Array(ALUMNOS.find((a) => a.carrera === currentCarrera).años)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentYear(index)}
                className={`px-4 py-2 rounded-full select-none ${currentYear === index ? `${color} text-white` : "bg-white text-analista border-analista"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between items-end w-[48%] gap-8">
          <button className="analista-button px-4 py-2 rounded-full select-none text-white w-48"><strong>Nuevo alumno</strong> </button>
          {buscador}
        </div>
      </div>
      <Tabla headers={headers} color={color}>
        {alumnosFiltrados.map((alumno, index) => (
          <tr key={index}>
            <td className="py-3 px-5 text-center">{alumno.dni}</td>
            <td className="py-3 px-5 text-center">{alumno.apellido}</td>
            <td className="py-3 px-5 text-center">{alumno.nombre}</td>
            <td className="py-3 px-5 text-center">{alumno.regular ? "Regular" : "Libre"}</td>
            <td className="py-3 px-5">
              <div className="flex justify-center">
                <ModificarAlumnos />
              </div>
            </td>
          </tr>
        ))}
      </Tabla>
    </div>
  );
};

export default TablaAlumnos;