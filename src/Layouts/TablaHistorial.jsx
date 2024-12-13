import { useState, useEffect } from "react";
import Tabla from "../Components/Tabla";
import Historial from "../Components/Historial";
import { FetchMaterias } from "../Services/api";

const TablaHistorial = ({ busqueda, estadoFiltro, buscador, color }) => {
  const [currentYear, setCurrentYear] = useState(0);
  const [allMaterias, setAllMaterias] = useState([]); // Estado para almacenar todas las materias
  const [materias, setMaterias] = useState([]); // Estado para almacenar las materias del año actual
  const [resolucion_general, setResolucion] = useState(''); 

  useEffect(() => {
    setResolucion(sessionStorage.getItem('resolucion'));
    const fetchMaterias = async () => {
      try {
        const data = await FetchMaterias(sessionStorage.getItem('id'));
        setAllMaterias(Array.isArray(data) ? data : []); // Guardar todas las materias como un arreglo
        setMaterias((Array.isArray(data) && data[currentYear]) ? data[currentYear] : []); // Cargar materias del año actual
      } catch (error) {
        console.error('Error al obtener las materias:', error);
      }
    };

    fetchMaterias();
  }, []);

  useEffect(() => {
    setMaterias((Array.isArray(allMaterias) && allMaterias[currentYear]) ? allMaterias[currentYear] : []); // Cargar materias según el año seleccionado
  }, [currentYear, allMaterias]);

  const historialFiltrado = (materias || []).filter(
    (item) =>
      item?.materia?.toLowerCase().includes(busqueda.toLowerCase()) && // Verificar que materia no sea undefined
      (estadoFiltro === "" || item.estadoinicial === estadoFiltro)
  );

  return (
    <div>
      {/* Botones para navegar entre años */}
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row gap-1 items-center">
          <p className={`text-${color} text-3xl select-none`}>Años :</p>
          {Array.isArray(allMaterias) && allMaterias.map((_, index) => (
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
              materia={item.materia} // Asegúrate de usar el nombre correcto de la propiedad
              titular={item.titular} // Asegúrate de usar el nombre correcto de la propiedad
              duracion={item.duracion} // Asegúrate de usar el nombre correcto de la propiedad
              estadoInicial={item.estadoinicial} // Asegúrate de usar el nombre correcto de la propiedad
              notaInicial={item.notainicial} // Asegúrate de usar el nombre correcto de la propiedad
            />
          ))}
        </Tabla>
      </div>
    </div>
  );
};

export default TablaHistorial;
