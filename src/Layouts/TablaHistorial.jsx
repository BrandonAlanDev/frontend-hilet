import { useState, useEffect } from "react"
import Tabla from "../Components/Tabla"
import Historial from "../Components/Historial"

const TablaHistorial = () => {
    const [historial, setHistorial] = useState([
        {
            Materia: "Algoritmos",
            Titular: "Rama",
            Duracion: "2 años",
            estadoinicial: "Aprobado",
            notainicial: "9"
        },
        {
            Materia: "Algoritmos 2",
            Titular: "Marcelo",
            Duracion: "1 año",
            estadoinicial: "Desaprobado",
            notainicial: "2"
        },
        {
            Materia: "Algoritmos 3",
            Titular: "Javier",
            Duracion: "2 años",
            estadoinicial: "Pendiente",
            notainicial: "-"
        }
    ])

    return (
        <Tabla headers={["Materia", "Titular", "Duracion", "Estado", "Nota"]}>
            {historial.map((item, index) => (
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

}

export default TablaHistorial;