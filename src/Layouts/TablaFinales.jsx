import { useState } from "react";
import Final from "../Components/Final";
import Tabla from "../Components/Tabla";

const TablaFinales = () => {
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
      horarios: ["8/12/23 10:00hs", "16/12/23 10:00hs"],
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
    <Tabla headers={["Materia","Horarios", "Estado","Capacidad"]}>
      {finales.map((final, index) => (
        <Final
          key={index}
          materia={final.materia}
          carrera={final.carrera}
          horarios={final.horarios}
          estadoInicial={final.estadoInicial}
        />
      ))}
    </Tabla>
  );
};

export default TablaFinales;
