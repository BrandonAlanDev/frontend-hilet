import React, { useState, useEffect } from "react";
import Tabla from "../Components/Tabla";
import ModificarAlumnos from "../Layouts/ModificarAlumnos";
import AddAlumnoModal from "./AddAlumnoModal";

const ALUMNOS = [
  {
    carrera: "Analista de Sistemas",
    años: 3,
    alumnos: [
      {
        usuario: "ElSergi",
        apellido: "Gonzales",
        nombre: "Sergio",
        dni: "44888666",
        regular: true,
        año: 2,
        email: "gonzalessergio@gmail.com",
      },
      {
        usuario: "Elmanolo",
        apellido: "Pirelli",
        nombre: "Manolo",
        dni: "33777555",
        regular: true,
        año: 1,
        email: "manolo@gmail.com",
      },
      {
        usuario: "laPulga",
        apellido: "Messi",
        nombre: "Lionel",
        dni: "12345678",
        regular: true,
        año: 3,
        email: "leomessi@gmail.com",
      },
    ],
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
        año: 2,
      },
      {
        apellido: "Perez",
        nombre: "Juan",
        dni: "31231212",
        regular: true,
        año: 3,
      },
    ],
  },
  {
    carrera: "Otra Carrera", // Agregamos la nueva carrera aquí
    años: 3,
    alumnos: [],
  },
];

const TablaAlumnos = ({ color, busqueda, estadoFiltro, buscador }) => {
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [currentCarrera, setCurrentCarrera] = useState("Analista de Sistemas");
  const [currentYear, setCurrentYear] = useState(0);
  const [selectedAlumno, setSelectedAlumno] = useState(null); // Estado para el alumno seleccionado
  const [alumnos, setAlumnos] = useState(() => {
    const storedAlumnos = sessionStorage.getItem("alumnos");
    return storedAlumnos ? JSON.parse(storedAlumnos) : ALUMNOS;
  });

  useEffect(() => {
    const carreraData = alumnos.find((carrera) => carrera.carrera === currentCarrera);
    
    if (carreraData && carreraData.años) {
      const filtro =
        estadoFiltro === "Regular"
          ? carreraData.alumnos.filter((alumno) => alumno.regular)
          : estadoFiltro === "Libre"
          ? carreraData.alumnos.filter((alumno) => !alumno.regular)
          : carreraData.alumnos;

      const resultados = filtro.filter((alumno) => {
        const isInCurrentYear = alumno.año === currentYear + 1;
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
    } else {

    }
  }, [currentCarrera, currentYear, busqueda, estadoFiltro, alumnos]);

  // Función para actualizar los datos de un alumno
  const modificarAlumno = (alumnoActualizado) => {
    const updatedAlumnos = alumnos.map((carrera) => {
      if (carrera.carrera === currentCarrera) {
        return {
          ...carrera,
          alumnos: carrera.alumnos.map((alumno) =>
            alumno.dni === alumnoActualizado.dni ? alumnoActualizado : alumno
          ),
        };
      }
      return carrera;
    });

    setAlumnos(updatedAlumnos);
    sessionStorage.setItem("alumnos", JSON.stringify(updatedAlumnos)); // Guardar en sessionStorage
    setSelectedAlumno(null); // Cerrar el modal después de guardar
  };

  const headers = ["DNI", "Apellido", "Nombre", "Correo", "Regular", "Acciones"];

  return (
    <div className={`gap-8 flex flex-col rounded-xl bg-white p-8`}>
      {/* Botones de Carrera */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-between w-[48%] gap-8">
          <div className="flex flex-row gap-2 mb-4">
            <p className="text-analista text-3xl select-none"><strong>Carrera</strong></p>
            {alumnos.map((alumno, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentCarrera(alumno.carrera);
                  setCurrentYear(0);
                }}
                className={`px-4 py-2 rounded-full select-none ${
                  currentCarrera === alumno.carrera ? `${color} text-white` : "bg-white text-analista border-analista"
                }`}
              >
                {alumno.carrera}
              </button>
            ))}
          </div>

          {/* Botones de Año */}
          <div className="flex flex-row gap-8 mb-4">
            <p className="text-analista text-3xl select-none"><strong>Año</strong></p>
            {[...Array(alumnos.find((a) => a.carrera === currentCarrera).años)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentYear(index)}
                className={`px-4 py-2 rounded-full select-none ${
                  currentYear === index ? `${color} text-white` : "bg-white text-analista border-analista"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between items-end w-[48%] gap-8">
          <AddAlumnoModal setAlumnos={setAlumnos} />
          {buscador}
        </div>
      </div>

      <Tabla headers={headers} color={color}>
        {alumnosFiltrados.map((alumno, index) => (
          <tr key={index}>
            <td className="py-3 px-5 text-center">{alumno.dni}</td>
            <td className="py-3 px-5 text-center">{alumno.apellido}</td>
            <td className="py-3 px-5 text-center">{alumno.nombre}</td>
            <td className="py-3 px-5 text-center">{alumno.email}</td>
            <td className="py-3 px-5 text-center">{alumno.regular ? "Regular" : "Libre"}</td>
            <td className="py-3 px-5">
              <div className="flex justify-center">
                <ModificarAlumnos
                  alumno={alumno} // Pasar el alumno a modificar
                  onAlumnoModificado={modificarAlumno} // Función para actualizar el alumno
                />
              </div>
            </td>
          </tr>
        ))}
      </Tabla>

      {/* Mostrar modal si hay un alumno seleccionado */}
      {selectedAlumno && (
        <ModificarAlumnos
          alumno={selectedAlumno}
          onClose={() => setSelectedAlumno(null)} // Cerrar el modal sin guardar
          onSave={modificarAlumno} // Guardar cambios
        />
      )}
    </div>
  );
};

export default TablaAlumnos;
