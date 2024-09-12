import { useState, useEffect } from "react";
import Tabla from "../Components/Tabla";
import Historial from "../Components/Historial";

const TablaHistorial = ({ busqueda, estadoFiltro }) => {
    const [historial, setHistorial] = useState([
        {
            Materia: "Algoritmos",
            Titular: "Rama",
            Duracion: "Anual",
            estadoinicial: "Aprobado",
            notainicial: "9"
        },
        {
            Materia: "Algoritmos 2",
            Titular: "Marcelo",
            Duracion: "Anual",
            estadoinicial: "Desaprobado",
            notainicial: "2"
        },
        {
            Materia: "Algoritmos 3",
            Titular: "Javier",
            Duracion: "Anual",
            estadoinicial: "Pendiente",
            notainicial: "-"
        },
        {
            Materia: "Economia",
            Titular: "Fabian",
            Duracion: "Anual",
            estadoinicial: "Pendiente",
            notainicial: "-"
        }
    ]);

    const historialFiltrado = historial.filter(item =>
        item.Materia.toLowerCase().includes(busqueda.toLowerCase()) &&
        (estadoFiltro === "" || item.estadoinicial === estadoFiltro)
    );

    return (
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
    );
};

export default TablaHistorial;
