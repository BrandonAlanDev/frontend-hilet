import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Baja from '../Components/Baja';
import Final from '../Components/Final';
import TablaFinales from '../Layouts/TablaFinales';
import TablaHistorial from '../Layouts/TablaHistorial';
import Mosaico from '../Components/Mosaico';
import ProximosFinales from '../Layouts/ProximosFinales';


const Indice = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [colorText, setColorText] = useState('');
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [fondoDegradado, setFondoDegradado] = useState('');
    const [imagenCarrera, setImagenCarrera] = useState('');
    const navigate = useNavigate();

    // Este useEffect se ejecuta una sola vez al montar el componente
    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (!user) {
            navigate('/login'); // Redirige al login si no hay usuario en sessionStorage
        } else {
            setNombre(user); // Establece el nombre del usuario
        }
    }, [navigate]);

    // Este useEffect se ejecuta cuando nombre cambia
    useEffect(() => {
        if (nombre === "rama2024") {
            setCarrera("Analista de Sistemas");
        } else if (nombre === "juanperez") {
            setCarrera("Publicidad");
        } else if (nombre === "sandra2024") {
            setCarrera("Administración");
        } else {
            setCarrera("Yoga de gluteos")
        }
    }, [nombre]);

    // Este useEffect se ejecuta cuando carrera cambia
    useEffect(() => {
        if (carrera === "Publicidad") {
            setColorText("text-publicidad");
            setFondoOpaco("bg-publicidad");
            setFondoDegradado("bg-hilet-publicidad");
            setImagenCarrera("src/Assets/Image/LOGO-PUBLI.png");
        } else if (carrera === "Analista de Sistemas" || carrera === "Administración") {
            setColorText("text-analista");
            setFondoOpaco("bg-analista");
            setFondoDegradado("bg-hilet");
            setImagenCarrera("src/Assets/Image/LOGO-AS.png");
        }
        else {
            setColorText("text-otro");
            setFondoOpaco("bg-otro");
            setFondoDegradado("bg-hilet-otro");
            setImagenCarrera("src/Assets/Image/LOGO-OTRO.png");
        }
    }, [carrera]);

    const final = {
        nombreMateria: 'Matemáticas',
        horario: '10:00 - 12:00',
        profesor: 'Dr. García',
        vocal1: 'Dr. López',
        vocal2: 'Dra. Martínez',
        horarios: [
            { dia: '14/02/2024', horario: '10:00 - 12:00', disponible: true },
            { dia: '15/02/2024', horario: '14:00 - 16:00', disponible: true },
        ],
    };

    return (
        <div>
            <Navbar nombre={nombre} carrera={carrera} />
            <div className={`w-screen min-h-screen select-none flex flex-col items-center justify-between  overflow-hidden ${fondoDegradado} py-20 lg:py-32`}>
                {(carrera === "Administración") ?
                    (<div className={`flex flex-col md:flex-row mt-5 md:mt-0 mb-5 gap-5 items-center justify-center`}>
                        <div className={`flex flex-col justify-between items-start`}>
                            <div className='flex flex-col md:flex-row mt-5 mb-5 gap-6 justify-between items-center'>
                                <div className='flex flex-col mt-5 mb-5 gap-3 md:mt-0 justify-between items-start'>
                                    <h2 className="font-bold text-start text-white text-5xl gap-5 leading-10">¡Hola {nombre}!</h2>
                                    <h2 className="md font-bold text-start text-subtitular gap-5 leading-10">{carrera}</h2>
                                    <div className="flex flex-col md:flex-row md:flex-wrap gap-6 items-center justify-center">
                                        <Mosaico titulo="Gestion de Alumnos" navigateTo="/addalumno" colorText={colorText} imagen="src/Assets/Image/EstudianteGrandeInvisible.png" />
                                        <Mosaico titulo="Finales" navigateTo="" colorText={colorText} imagen="src/Assets/Image/FechaGrandeInvisible.png" />
                                    </div>
                                </div>
                                <ProximosFinales />
                            </div>
                            <div className="flex flex-col gap-6 items-start justify-center">
                                    <div className="flex flex-col md:flex-row md:flex-wrap gap-6 items-start justify-start">
                                        <Mosaico titulo="Gestion de Carreras" navigateTo="/addcarrera" colorText={colorText} imagen="src/Assets/Image/DiplomaGrandeInvisible.png" />
                                        <Mosaico titulo="Gestion de Materias" navigateTo="/addmaterias" colorText={colorText} imagen="src/Assets/Image/LibrosGrandeInvisible.png" />
                                        <Mosaico titulo="Gestion de Profesores" navigateTo="/addprofesor" colorText={colorText} imagen="src/Assets/Image/profesorGrandeInvisible.png" />
                                    </div>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <>
                            <div className='mt-5 gap-8 lg:mt-0'>
                                <h1 className="text-2xl font-bold mb-6 text-center text-titular gap-5">¡Hola {nombre}!</h1>
                                <h1 className="text-2xl font-bold text-center text-subtitular gap-5">{carrera}</h1>
                            </div>
                            <div className={`mt-6 lg:mt-0 lg:h-[18vh] lg:min-h-[250px]`}>
                                <div className="flex flex-col md:flex-row flex-wrap gap-8 items-start justify-center">
                                    <Mosaico titulo="Finales" texto="Primer año" colorText={colorText} imagen={imagenCarrera} />
                                    <Mosaico titulo="Finales" texto="Segundo año" colorText={colorText} imagen={imagenCarrera} />
                                    <Mosaico titulo="Finales" texto="Tercer año" colorText={colorText} imagen={imagenCarrera} />
                                </div>
                            </div>
                        </>
                    )}
            </div>
            {
            /* ACA ES DONDE PRUEBO COMO SE VEN LOS COMPONENTES /*<TablaFinales/> */}
            {/* ALT + FLECHITAS PARA IR MOVIENDO LOS COMENTARIOS */}
            {/* CIERRE SUPERIOR}
                {CIERRE INFERIOR*/}
        </div>
    );
};

export default Indice;