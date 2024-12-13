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
        if (!sessionStorage.getItem('nombre')) {
            navigate('/login');
        } else {
            const NombreCompleto = sessionStorage.getItem('nombre')+' '+sessionStorage.getItem('apellido');
            setNombre(NombreCompleto);
            setCarrera(sessionStorage.getItem('carrera'))
        }
    }, [navigate]);

    // Este useEffect se ejecuta cuando carrera cambia
    useEffect(() => {
        if (carrera === "Publicidad") {
            setColorText("text-publicidad");
            setFondoOpaco("bg-publicidad");
            setFondoDegradado("bg-hilet-publicidad");
            setImagenCarrera("src/Assets/Image/LOGO-PUBLI.png");
        } else if (carrera === "Analista de sistemas" || carrera === "Administracion") {
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
            <div className={`w-screen min-h-screen select-none flex flex-col items-center justify-between  overflow-hidden ${fondoDegradado} py-20 lg:py-15`}>
                {(carrera === "Administracion") ?
                    (<div className={`flex flex-col md:flex-row mt-0 md:mt-0 mb-5 gap-2 items-center lg:items-start justify-start`}>
                        <div className={`flex flex-col justify-center sm:justify-between items-center sm:items-start`}>
                            <div className='flex flex-col md:flex-row mt-5 mb-5 gap-6 justify-center sm:justify-start items-start sm:items-end'>
                                <div className='flex flex-col mt-5 mb-1 gap-2 md:mt-0 justify-between items-center sm:items-start'>
                                    <h2 className="font-bold text-start text-white text-5xl gap-5 leading-10">¡Hola {nombre}!</h2>
                                    <h2 className="md font-bold text-start text-subtitular gap-5 leading-10">{carrera}</h2>
                                    <div className="flex flex-col md:flex-row md:flex-wrap gap-6 items-center justify-center">
                                        <Mosaico titulo="Gestion de Alumnos"  ancho="aspect-w-1 aspect-h-1 w-[80vw] hover:w-[85vw] h-[80vw] hover:h-[85vw] sm:w-[17vw] sm:hover:w-[14vw] sm:max-w-[18vw] sm:h-[14vw] sm:hover:h-[18vw]"   navigateTo="/addalumno" colorText={colorText} imagen="src/Assets/Image/EstudianteGrandeInvisible.png" />
                                        <Mosaico titulo="Finales" navigateTo="/finales"  ancho="aspect-w-1 aspect-h-1 w-[80vw] hover:w-[85vw] h-[80vw] hover:h-[85vw] sm:w-[17vw] sm:hover:w-[14vw] sm:max-w-[18vw] sm:h-[14vw] sm:hover:h-[18vw]"  colorText={colorText} imagen="src/Assets/Image/FechaGrandeInvisible.png" />
                                    </div>
                                </div>
                                <ProximosFinales />
                            </div>
                            <div className="flex flex-col gap-6 items-start justify-center">
                                    <div className="flex flex-col md:flex-row md:flex-wrap gap-6 items-start justify-start">
                                        <Mosaico titulo="Gestion de Carreras" navigateTo="/addcarrera"  ancho="aspect-w-1 aspect-h-1 w-[80vw] hover:w-[85vw] h-[80vw] hover:h-[85vw] sm:w-[17vw] sm:hover:w-[14vw] sm:max-w-[18vw] sm:h-[14vw] sm:hover:h-[18vw]"  colorText={colorText} imagen="src/Assets/Image/DiplomaGrandeInvisible.png" />
                                        <Mosaico titulo="Gestion de Materias" navigateTo="/addmaterias"  ancho="aspect-w-1 aspect-h-1 w-[80vw] hover:w-[85vw] h-[80vw] hover:h-[85vw] sm:w-[17vw] sm:hover:w-[14vw] sm:max-w-[18vw] sm:h-[14vw] sm:hover:h-[18vw]"  colorText={colorText} imagen="src/Assets/Image/LibrosGrandeInvisible.png" />
                                        <Mosaico titulo="Gestion de Profesores" navigateTo="/addprofesor" ancho="aspect-w-1 aspect-h-1 w-[80vw] hover:w-[85vw] h-[80vw] hover:h-[85vw] sm:w-[17vw] sm:hover:w-[14vw] sm:max-w-[18vw] sm:h-[14vw] sm:hover:h-[18vw]" colorText={colorText} imagen="src/Assets/Image/profesorGrandeInvisible.png" />
                                    </div>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <>
                            <div className={`flex flex-col mt-0 md:mt-0 mb-5 gap-8 items-center justify-start`}>
                            <div className=' items-center mt-5 gap-8 pt-5'>
                                <h1 className="text-2xl font-bold mb-6 text-center text-titular gap-5 leading-normal">¡Hola {nombre}!</h1>
                                <h1 className="text-2xl font-bold text-center text-subtitular gap-5 leading-normal">{carrera}</h1>
                            </div>
                            <div className={`mt-6 lg:mt-0 lg:h-[18vh] lg:min-h-[250px]`}>
                                <div className="flex flex-col md:flex-row flex-wrap gap-8 items-start justify-center">
                                    <Mosaico titulo="Finales" texto="Primer año" colorText={colorText} imagen={imagenCarrera} />
                                    <Mosaico titulo="Finales" texto="Segundo año" colorText={colorText} imagen={imagenCarrera} />
                                    <Mosaico titulo="Finales" texto="Tercer año" colorText={colorText} imagen={imagenCarrera} />
                                </div>
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