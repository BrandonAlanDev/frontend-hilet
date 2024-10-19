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


const resolucion_general = "6790/19";

const materiasPorAnoPubli = [
  // 1º año
  [
    { Materia: "Marketing general", Titular: "Profesor A", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Psicología", Titular: "Profesor B", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "7" },
    { Materia: "Fundamentos del diseño publicitario", Titular: "Profesor C", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Computación 1", Titular: "Profesor D", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Introducción a la publicidad", Titular: "Profesor E", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "6" },
    { Materia: "Producción gráfica", Titular: "Profesor F", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Producción radial", Titular: "Profesor G", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "9" },
    { Materia: "Producción audiovisual", Titular: "Profesor H", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Edi: Creatividad publicitaria 1", Titular: "Profesor I", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Edi: Comunicación digital", Titular: "Profesor J", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "7" },
    { Materia: "Edi: Gráfica Asistida 1", Titular: "Profesor K", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" }
  ],
  // 2º año
  [
    { Materia: "Computación 2", Titular: "Profesor L", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Inglés 1", Titular: "Profesor M", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Psicología social", Titular: "Profesor N", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Marketing directo", Titular: "Profesor O", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "7" },
    { Materia: "Arte, cine, literatura e historia de la publicidad", Titular: "Profesor P", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Redacción creativa 1", Titular: "Profesor Q", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "9" },
    { Materia: "Dirección de arte 1", Titular: "Profesor R", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Planificación estratégica de medios", Titular: "Profesor S", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Semiología publicitaria", Titular: "Profesor T", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Técnica promocional y pop", Titular: "Profesor U", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "7" },
    { Materia: "Edi: Creatividad publicitaria 2", Titular: "Profesor V", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Edi: Gráfica Asistida 2", Titular: "Profesor W", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "9" }
  ],
  // 3º año
  [
    { Materia: "Inglés 2", Titular: "Profesor X", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Investigación de mercados", Titular: "Profesor Y", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Redacción creativa 2", Titular: "Profesor Z", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Dirección de arte 2", Titular: "Profesor AA", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "9" },
    { Materia: "Seminario de práctica profesional", Titular: "Profesor BB", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Atención de cuentas", Titular: "Profesor CC", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "8" },
    { Materia: "Organización y administración de la agencia", Titular: "Profesor DD", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Derecho y legislación publicitaria", Titular: "Profesor EE", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "7" },
    { Materia: "Edi: Comunicación 2.0", Titular: "Profesor FF", Duracion: "Anual", estadoinicial: "Pendiente", notainicial: "-" },
    { Materia: "Edi: Fotografía", Titular: "Profesor GG", Duracion: "Anual", estadoinicial: "Aprobado", notainicial: "9" }
  ]
];

const TablaHistorial = ({ busqueda, estadoFiltro, buscador, color, carrera }) => {
  const [currentYear, setCurrentYear] = useState(0); // Año actual (0 = primer año)
  const [materias, setMaterias] = useState([]);
  useEffect(() => {
    if (carrera === "Analista de Sistemas") {
      setMaterias(materiasPorAno[currentYear]); // Cargar materias según el año seleccionado
    } else if (carrera === "Publicidad") {
      setMaterias(materiasPorAnoPubli[currentYear]); // Cargar materias según el año seleccionado
    }
  }, [currentYear, carrera]);

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
            <p className={`text-${color} text-3xl select-none`}>Años :</p>
        {materiasPorAno.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentYear(index)}
            className={`px-4 py-2 m-2 rounded-full select-none ${
              currentYear === index ? `bg-${color} text-white` : `bg-white text-${color} border-${color}`
            }`}
          >
            {index + 1}
          </button>
        ))}
        </div>
        {buscador}
      </div>

      <div className="mt-5 text-left">
        <p className={`text-xl font-bold text-${color}`}>
          Resolución : {resolucion_general}
        </p>
      </div>

      {/* Tabla con las materias filtradas */}

      <div className="mt-5">
        <Tabla color={color} headers={["Materia", "Titular", "Duracion", "Estado", "Nota"]}>
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