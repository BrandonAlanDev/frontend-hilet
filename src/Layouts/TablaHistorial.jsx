import { useState, useEffect } from "react";
import Tabla from "../Components/Tabla";
import Historial from "../Components/Historial";

const materiasPorAno = [
  [
    { Materia: "Inglés I", Titular: "Profesor A", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Ciencia Tecnología y Sociedad", Titular: "Profesor B", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Análisis Matemático I", Titular: "Profesor C", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "7" },
    { Materia: "Algebra", Titular: "Profesor D", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "9" },
    { Materia: "Algoritmos y estructuras de datos I", Titular: "Profesor E", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Sistemas y Organizaciones", Titular: "Profesor F", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "6" },
    { Materia: "Arquitectura de Computadores", Titular: "Profesor G", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Prácticas Profesionalizantes I", Titular: "Profesor H", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "9" },
  ],
  [
    { Materia: "Inglés II", Titular: "Profesor A", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Análisis Matemático II", Titular: "Profesor B", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Estadística", Titular: "Profesor C", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Ingeniería de Software I", Titular: "Profesor D", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "7" },
    { Materia: "Algoritmos y estructuras de datos II", Titular: "Profesor E", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Sistemas Operativos", Titular: "Profesor F", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Base de Datos", Titular: "Profesor G", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Prácticas Profesionalizantes II", Titular: "Profesor H", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "7" },
  ],
  [
    { Materia: "Inglés III", Titular: "Profesor A", Duracion: "Anual", estadoinicial: "Desaprobado", notainicial: "2" },
    { Materia: "Aspectos legales de la Profesión", Titular: "Profesor B", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Seminario de actualización", Titular: "Profesor C", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Redes y Comunicaciones", Titular: "Profesor D", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "9" },
    { Materia: "Ingeniería de Software II", Titular: "Profesor E", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Algoritmos y estructuras de datos III", Titular: "Profesor F", Duracion: "Anual", estadoinicial: "Desaprobado", notainicial: "2" },
    { Materia: "Prácticas Profesionalizantes III (Auditoria)", Titular: "Profesor G", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Prácticas Profesionalizantes III (PHP)", Titular: "Profesor H", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Prácticas Profesionalizantes III (Economia empresarial)", Titular: "Profesor I", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "9" },
  ],
];

const TablaHistorial = ({ busqueda, estadoFiltro, buscador }) => {
  const [currentYear, setCurrentYear] = useState(0); // Año actual (0 = primer año)
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    setMaterias(materiasPorAno[currentYear]); // Cargar materias según el año seleccionado
  }, [currentYear]);

  const historialFiltrado = materias.filter(
    (item) =>
      item.Materia.toLowerCase().includes(busqueda.toLowerCase()) &&
      (estadoFiltro === "" || item.estadoinicial === estadoFiltro)
  );

  return (
    <div>
      {/* Botones para navegar entre años */}
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row gap-1 items-center">
            <p className="text-white text-3xl select-none">Años :</p>
        {materiasPorAno.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentYear(index)}
            className={`px-4 py-2 m-2 rounded-full select-none ${
              currentYear === index ? "bg-white text-analista" : "bg-analista text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
        </div>
        {buscador}
      </div>

      {/* Tabla con las materias filtradas */}
      <div className="mt-5">
        <Tabla headers={["Materia", "Titular", "Duracion", "Estado", "Nota"]}>
            {historialFiltrado.map((item, index) => (
            <Historial
                key={index}
                materia={item.Materia}
                titular={item.Titular}
                duracion={item.Duracion}
                estadoInicial={item.estadoinicial}
                notaInicial={item.notainicial}
            />
            ))}
        </Tabla>
      </div>
    </div>
  );
};

export default TablaHistorial;