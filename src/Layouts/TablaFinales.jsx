import { useState } from "react";
import Final from "../components/Final";

const Tabla = () => {
  const [finales, setFinal] = useState([
    {
      materia: "Algoritmos",
      carrera: "Analista de Sistemas",
      horarios: ["Lunes 8:00", "Jueves 8:00"],
      estadoInicial: "Inscribirse",
    },
    {
      materia: "Ingles",
      carrera: "Analista de Sistemas",
      horarios: ["Viernes 10:00"],
      estadoInicial: "Inscribirse",
    },
    {
      materia: "Economia",
      carrera: "Analista de Sistemas",
      horarios: ["Martes 10:00"],
      estadoInicial: "Inscribirse",
    },
  ]);

  return (
    <div className="flex flex-col items-center min-h-screen py-8 bg-gray-100">
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead className="bg-white border border-black">
          <tr>
            <th className="py-3 px-6 text-left">Materia</th>
            <th className="py-3 px-6 text-left">Horarios</th>
            <th className="py-3 px-6 text-left">Estado</th>
            <th className="py-3 px-6 text-left">Capacidad</th>
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
  );
};

export default Tabla;
