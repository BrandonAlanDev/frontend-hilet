import { useState } from "react";
import Final from "../Components/Final";

const Tabla = () => {
  const [finales, setFinal] = useState([
    {
      materia: "Algoritmos",
      carrera: "Analista de Sistemas",
      horarios: ["06/12/23 8:00hs", "12/12/23 8:00hs"],
      estadoInicial: "Inscribirse",
    },
    {
      materia: "Ingles",
      carrera: "Analista de Sistemas",
      horarios: ["8/12/23 10:00hs"],
      estadoInicial: "Inscribirse",
    },
    {
      materia: "Economia",
      carrera: "Analista de Sistemas",
      horarios: ["13/12/23 10:00hs"],
      estadoInicial: "Inscribirse",
    },
  ]);

  return (
    <>
      <div className="lg:mt-0 lg:h-[18vh] lg:min-h-[250px] lg:w-[60vw] overflow-hidden rounded-3xl items-center">
        <div className="flex flex-row items-start justify-center w-full h-full">
          <table className="border border-slate-300 w-full h-full">
            <thead className="bg-analista text-white border border-b-2 border-stone-300">
              <tr>
                <th className="py-3 px-5 text-center">Materia</th>
                <th className="py-3 px-5 text-center">Fecha y Horarios</th>
                <th className="py-3 px-5 text-center">Estado</th>
                <th className="py-3 px-5 text-center">Capacidad</th>
              </tr>
            </thead>
            <tbody>
              {finales.map((final, index) => (
                <Final
                  key={index}
                  materia={final.materia}
                  carrera={final.carrera}
                  horarios={final.horarios}
                  estadoInicial={final.estadoInicial}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tabla;
