import { useEffect, useState } from "react";
import HelpIcon from '@mui/icons-material/Help';

const Historial = ({ materia, titular, duracion, estadoInicial, notaInicial }) => {
    const [estado, setEstado] = useState(estadoInicial);
    const [nota, setNota] = useState(notaInicial);
    const [estilo, setEstilo] = useState("");

    useEffect(() => {
        if (estado === "Aprobado") {
            setEstilo("coloraprobado");
        } else if (estado === "Pendiente") {
            setEstilo("");
        } else {
            setEstilo("colordesaprobado");
        }
    }, [estado]);

    useEffect(() => {
        setEstado(estadoInicial);
        setNota(notaInicial);
    }, [estadoInicial, notaInicial]);
    

    return (
        <tr className="text-center h-10">
            <td>{materia}</td>
            <td>{titular}</td>
            <td>{duracion}</td>
            <td className={estilo}>
                {estado} {estado === "Pendiente" && <HelpIcon className="inline ml-2" />}
            </td>
            <td>{notaInicial}</td>
        </tr>
    );
};

export default Historial;
