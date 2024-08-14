import React from 'react';
import { useEffect, useState } from 'react';

const Final = ({ carrera,materia, horarios, estadoInicial }) => {
    const [estado,setEstado] = useState(estadoInicial);
    const [estilo,setEstilo] = useState('');

    useEffect(()=>{
        if (estado==="Inscripto") {
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
    },[estado]);

    return (
        <tr>
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
                <button className={estilo} onClick={() => setEstado(estado === "Inscripto" ? "Inscribirse" : "Inscripto")}>
                    {estado}
                </button>
            </td>
        </tr>
    );
};

export default Final;