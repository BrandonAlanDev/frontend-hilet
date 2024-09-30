import { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import TablaHistorial from '../../Layouts/TablaHistorial'
import { useNavigate } from 'react-router-dom';
import Buscador from '../../Components/Buscador'

const Programa = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [colorText, setColorText] = useState('');
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [fondoDegradado, setFondoDegradado] = useState('');
    const [boton, setBoton] = useState('');
    const [colorBorde, setColorBorde] = useState('');
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
            setColorText("text-publicidad");
            setFondoOpaco("bg-publicidad");
            setFondoDegradado("bg-hilet-publicidad");
            setBoton("publicidad-button");
            setColorBorde("border-publicidad");
        } else if (carrera === "Analista de Sistemas" || carrera === "Administración") {
            setColorText("text-analista");
            setFondoOpaco("bg-analista");
            setFondoDegradado("bg-hilet");
            setBoton("analista-button");
            setColorBorde("border-analista");
        }
        else {
            setColorText("text-otro");
            setFondoOpaco("bg-otro");
            setFondoDegradado("bg-hilet-otro");
            setBoton("otro-button");
            setColorBorde("border-otro");
        }
    }, [carrera]);


    return (
        <div>
            <Navbar nombre={nombre} carrera={carrera} />
            <div className={`min-h-screen select-none flex flex-col items-center justify-evenly ${fondoDegradado} py-20 lg:py-32 gap-8`}>
                <p className='text-white font-bold text-5xl select-none'>Programa de {carrera}</p>
                <div className=''>
                <TablaHistorial
                    carrera={carrera}
                    color={fondoOpaco}
                    busqueda={busqueda}
                    estadoFiltro={estadoFiltro}
                    buscador={<Buscador setBusqueda={setBusqueda} setEstadoFiltro={setEstadoFiltro} />}
                />
                </div>
            </div>

        </div>
    )
}

export default Programa;