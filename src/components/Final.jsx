import React from "react";
import { useEffect, useState } from "react";

const Final = ({ carrera, materia, horarios, estadoInicial }) => {
  const [estado, setEstado] = useState(estadoInicial);
  const [estilo, setEstilo] = useState("");
  const [capacidad, setCapacidad] = useState({ actual: 25, limite: 50 });

  const inscribirse = () => {
    if (estado !== "Inscripto" && capacidad.actual < capacidad.limite) {
      setEstado("Inscripto");
      setCapacidad((precapacidad) => ({
        actual: precapacidad.actual + 1,
        limite: precapacidad.limite,
      }));
    } else if (estado === "Inscripto") {
      setEstado("Inscribirse");
      setCapacidad((precapacidad) => ({
        actual: precapacidad.actual - 1,
        limite: precapacidad.limite,
      }));
    }
  };

  useEffect(() => {
    if (estado === "Inscripto") {
      if (carrera === "Analista de Sistemas") {
        setEstilo("analista-inscripto-button");
      } else if (carrera === "Publicidad") {
        setEstilo("publicidad-inscripto-button");
      } else if (carrera === "Administración") {
        setEstilo("analista-inscripto-button");
      } else {
        setEstilo("otro-inscripto-button");
      }
    } else {
      if (carrera === "Analista de Sistemas") {
        setEstilo("analista-button");
      } else if (carrera === "Publicidad") {
        setEstilo("publicidad-button");
      } else if (carrera === "Administración") {
        setEstilo("analista-button");
      } else {
        setEstilo("otro-button");
      }
    }
  }, [estado]);

  return (
    <tr className="text-center">
      <td>{materia}</td>
      <td>
        <select>
          {horarios.map((horario, index) => (
            <option key={index} value={horario}>
              {horario}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button className={estilo} onClick={inscribirse}>
          {estado}
        </button>
      </td>
      <td>
        Capacidad: {capacidad.actual} / {capacidad.limite}
      </td>
    </tr>
  );
};

export default Final;
