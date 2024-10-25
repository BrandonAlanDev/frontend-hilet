import { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import TablaAlumnos from '../../Layouts/TablaAlumnos';
import BuscadorAlumnos from '../../Components/BuscadorAlumnos';

const AddAlumnos = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [fondoDegradado, setFondoDegradado] = useState('');
    const [color,setColor] = useState('');
    const [busqueda,setBusqueda] = useState('');
    const [estadoFiltro,setEstadoFiltro] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (!user) {
            navigate('/login'); 
        } else {
            setNombre(user);
        }
    }, [navigate]);

    useEffect(() => {
        if (nombre === "rama2024") {
            setCarrera("Analista de Sistemas");
        } else if (nombre === "juanperez") {
            setCarrera("Publicidad");
        } else if (nombre === "sandra2024") {
            setCarrera("Administración");
        } else {
            setCarrera("Yoga de gluteos");
        }
    }, [nombre]);

    useEffect(() => {
        if (carrera === "Publicidad") {
            setFondoOpaco("bg-publicidad");
            setFondoDegradado("bg-hilet-publicidad");
            setColor("publicidad");
        } else if (carrera === "Analista de Sistemas" || carrera === "Administración") {
            setFondoOpaco("bg-analista");
            setFondoDegradado("bg-hilet");
            setColor("analista");
        }
        else {
            setFondoOpaco("bg-otro");
            setFondoDegradado("bg-hilet-otro");
            setColor("otro");
        }
    }, [carrera]);


    return (
        <div>
            <Navbar nombre={nombre} carrera={carrera} />
            <div className={`min-h-screen select-none flex flex-col items-center justify-evenly ${fondoDegradado} py-20 lg:py-32 gap-8`}>
                <p className='text-white font-bold text-5xl select-none'>Gestion de alumnos</p>
                <div className=''>
                <TablaAlumnos
                    carrera={carrera}
                    color={color}
                    busqueda={busqueda}
                    estadoFiltro={estadoFiltro}
                    buscador={<BuscadorAlumnos setBusqueda={setBusqueda} setEstadoFiltro={setEstadoFiltro} />}
                />
                </div>
            </div>

        </div>
    )
}

export default AddAlumnos;