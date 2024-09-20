import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Baja from '../Components/Baja';
import Final from '../Components/Final';
import TablaFinales from '../Layouts/TablaFinales';
import TablaHistorial from '../Layouts/TablaHistorial';

const Indice = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [colorText, setColorText] = useState('');
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [fondoDegradado, setFondoDegradado] = useState('');
    const [boton, setBoton] = useState('');
    const [colorBorde, setColorBorde] = useState('');
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
            setBoton("publicidad-button");
            setColorBorde("border-publicidad");
        } else if (carrera === "Analista de Sistemas"||carrera==="Administración") {
            setColorText("text-analista");
            setFondoOpaco("bg-analista");
            setFondoDegradado("bg-hilet");
            setBoton("analista-button");
            setColorBorde("border-analista");
        }
        else{
            setColorText("text-otro");
            setFondoOpaco("bg-otro");
            setFondoDegradado("bg-hilet-otro");
            setBoton("otro-button");
            setColorBorde("border-otro");
        }
    }, [carrera]);
        
    const final = {
        nombreMateria: 'Matemáticas',
        horario: '10:00 - 12:00',
        profesor: 'Dr. García',
        vocal1: 'Dr. López',
        vocal2: 'Dra. Martínez',
        horarios: [
          { dia:'14/02/2024', horario: '10:00 - 12:00', disponible: true },
          { dia:'15/02/2024',horario: '14:00 - 16:00', disponible: true },
        ],
      };
    return (
        <div>
            <Navbar nombre={nombre} carrera={carrera} />
            <div className={`min-h-screen flex flex-col items-center justify-evenly ${fondoDegradado} py-20 lg:py-32`}>
                <div className='mt-5 gap-8 lg:mt-0'>
                    <h1 className="text-2xl font-bold mb-6 text-center text-titular gap-5">¡Hola {nombre}!</h1>
                    <h1 className="text-2xl font-bold text-center text-subtitular gap-5">{carrera}</h1>
                </div>
                {(carrera==="Administración")? (<div></div>) : (
                <div className={`mt-6 lg:mt-0 lg:h-[18vh] lg:min-h-[250px]`}>
                    <div className="flex flex-row flex-wrap gap-8 items-start justify-center">
                        <div className="bg-blanco p-8 rounded-lg flex flex-col items-center mosaicos shadow-2xl shadow-black">
                            <div className="flex-grow flex justify-center items-center bg-figuras activo aspect-square">
                            </div>
                            <div className="text-mosaico">
                                <h4 className={`text-2xl font-bold mt-4 text-center ${colorText} text-mosaico`}>Primer año</h4>
                            </div>
                        </div>
                        <div className="bg-blanco p-8 rounded-lg flex flex-col items-center mosaicos shadow-2xl shadow-black">
                            <div className="flex-grow flex justify-center items-center bg-figuras activo aspect-square">
                            </div>
                            <div>
                                <h4 className={`text-2xl font-bold mt-4 text-center ${colorText} text-mosaico`}>Segundo año</h4>
                            </div>
                        </div>
                        <div className="bg-blanco p-8 rounded-lg flex flex-col items-center mosaicos shadow-2xl shadow-black">
                            <div className="flex-grow flex justify-center items-center bg-figuras activo aspect-square">
                            </div>
                            <div>
                                <h4 className={`text-2xl font-bold mt-4 text-center ${colorText} text-mosaico`}>Tercer año</h4>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            {   
            <div className="flex w-full items-center justify-center">
                <TablaFinales color={fondoOpaco}/>
            </div>
            /* ACA ES DONDE PRUEBO COMO SE VEN LOS COMPONENTES /*<TablaFinales/> */}
            {/* ALT + FLECHITAS PARA IR MOVIENDO LOS COMENTARIOS */}
            {/* CIERRE SUPERIOR}
            <Baja final={final}/>
            <table>
                <Final carrera="Analista de Sistemas" materia="Algoritmos 1" horarios={["13/12/2024 8:00","20/12/2024 10:20"]} estadoInicial="Inscribirse"/>
                <Final carrera="Analista de Sistemas" materia="Algoritmos 2" horarios={["13/12/2024 8:00","20/12/2024 10:20"]} estadoInicial="Inscribirse"/>
                <Final carrera="Analista de Sistemas" materia="Algoritmos 3" horarios={["13/12/2024 8:00","20/12/2024 10:20"]} estadoInicial="Inscribirse"/>
                <Final carrera="Analista de Sistemas" materia="Ingenieria de Software 1" horarios={["13/12/2024 8:00","20/12/2024 10:20"]} estadoInicial="Inscribirse"/>
                <Final carrera="Analista de Sistemas" materia="Ingenieria de Software 2" horarios={["13/12/2024 8:00","20/12/2024 10:20"]} estadoInicial="Inscribirse"/>
            </table>
                {CIERRE INFERIOR*/}
        </div>
    );
};

export default Indice;