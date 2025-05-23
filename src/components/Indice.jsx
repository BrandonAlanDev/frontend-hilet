import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Baja from './Baja';

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
            navigate('/'); // Redirige al login si no hay usuario en sessionStorage
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
        } else {
            setColorText("text-analista");
            setFondoOpaco("bg-analista");
            setFondoDegradado("bg-hilet");
            setBoton("analista-button");
            setColorBorde("border-analista");
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
            </div>
            {/*}
            <Baja final={final}/>
            {*/}
        </div>
    );
};

export default Indice;