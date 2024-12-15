import React, { useState, useEffect } from "react";
import Tabla from "../Components/Tabla";
import ModificarAlumnos from "../Layouts/ModificarAlumnos";
import AddAlumnoModal from "./AddAlumnoModal";
import { GetAllAlumnos } from "../Services/apiAdmin/Alumnos";

const TablaAlumnos = ({ color, busqueda, estadoFiltro, buscador }) => {
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [currentCarrera, setCurrentCarrera] = useState("Analista de Sistemas");
  const [currentYear, setCurrentYear] = useState(0);
  const [selectedAlumno, setSelectedAlumno] = useState(null); // Estado para el alumno seleccionado
  const [alumnos, setAlumnos] = useState([]);

  const fetchAlumnos = async () => {
    try {
      let response = await GetAllAlumnos();
      if (response) {
        // Convertir los datos del backend al formato esperado
        const formattedData = response.map((carrera) => ({
          ...carrera,
          alumnos: carrera.alumnos.map((alumno) => ({
            ...alumno,
            regular: alumno.regular === 1, // Convertir 1/0 a true/false
            email: alumno.email || "Sin correo", // Manejar la ausencia de email
          })),
        }));
        setAlumnos(formattedData);
        console.log(formattedData);
      } else {
        console.warn("No se encontraron datos de alumnos.");
      }
    } catch (error) {
      console.error("Error al intentar obtener los alumnos: ", error.message);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  useEffect(() => {
    const carreraData = alumnos.find((carrera) => carrera.carrera === currentCarrera);
  
    if (carreraData && carreraData.alumnos) {
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
      setAlumnosFiltrados([]);
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

  const eliminarAlumno = (dni) => {
    const updatedAlumnos = alumnos.map((carrera) => {
      if (carrera.carrera === currentCarrera) {
        return {
          ...carrera,
          alumnos: carrera.alumnos.filter((alumno) => alumno.dni !== dni),
        };
      }
      return carrera;
    });
  
    setAlumnos(updatedAlumnos);
    sessionStorage.setItem("alumnos", JSON.stringify(updatedAlumnos)); // Update session storage
    setSelectedAlumno(null); // Close any open modals if needed
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
                  currentCarrera === alumno.carrera ? `bg-${color} text-white` : "bg-white text-analista border-analista"
                }`}
              >
                {alumno.carrera}
              </button>
            ))}
          </div>

          {/* Botones de Año */}
          {alumnos.find((a) => a.carrera === currentCarrera) && (
            <div className="flex flex-row gap-8 mb-4">
              <p className="text-analista text-3xl select-none"><strong>Año</strong></p>
              {[...Array(alumnos.find((a) => a.carrera === currentCarrera).años)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentYear(index)}
                  className={`px-4 py-2 rounded-full select-none ${
                    currentYear === index ? `bg-${color} text-white` : "bg-white text-analista border-analista"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between items-end w-[48%] gap-8">
          <AddAlumnoModal fetchAlumnos={fetchAlumnos} />
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
                  onAlumnoEliminado={eliminarAlumno}
                  fetchAlumnos={fetchAlumnos}
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
          onClose={() => setSelectedAlumno(null)}
          onSave={modificarAlumno}
          onAlumnoModificado={modificarAlumno}
          onAlumnoEliminado={eliminarAlumno}
          fetchAlumnos={fetchAlumnos}
        />
      )}
    </div>
  );
};
export default TablaAlumnos;
