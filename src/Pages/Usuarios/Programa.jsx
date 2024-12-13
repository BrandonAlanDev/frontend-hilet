import { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import TablaHistorial from '../../Layouts/TablaHistorial'
import { useNavigate } from 'react-router-dom';
import Buscador from '../../Components/Buscador'

const Programa = () => {
    const [id, setId] = useState(null);
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [carrera, setCarrera] = useState('');
    const [color, setColor] = useState('');
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [fondoDegradado, setFondoDegradado] = useState('');
    const [busqueda,setBusqueda] = useState('');
    const [estadoFiltro,setEstadoFiltro] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('user')) {
            navigate('/login');
        } else {
            setId(sessionStorage.getItem('id'));
            setUsuario(sessionStorage.getItem('user'));
            setNombre(sessionStorage.getItem('nombre'));
            setApellido(sessionStorage.getItem('apellido'));
            setCorreo(sessionStorage.getItem('correo'));
            setCarrera(sessionStorage.getItem('carrera'));
        }
    }, [navigate]);

    useEffect(() => {
        if (carrera === "Publicidad") {
            setFondoOpaco("bg-publicidad");
            setFondoDegradado("bg-hilet-publicidad");
            setColor("publicidad");
        } else if (carrera === "Analista de sistemas" || carrera === "Administracion") {
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
            <Navbar nombre={nombre+' '+apellido} carrera={carrera} />
            <div className={`min-h-screen select-none flex flex-col items-center justify-evenly ${fondoDegradado} py-20 lg:py-32 gap-8`}>
                <div className='flex flex-col items-center justify-evenly bg-white p-8 rounded-3xl gap-8'>
                <p className={`text-${color} font-bold text-5xl select-none`}>Historial Academico de {carrera}</p>
                <div className=''>
                <TablaHistorial
                    carrera={carrera}
                    color={color}
                    busqueda={busqueda}
                    estadoFiltro={estadoFiltro}
                    buscador={<Buscador setBusqueda={setBusqueda} setEstadoFiltro={setEstadoFiltro} color={color} />}
                    idAlumno={id}
                    />
                </div>
                </div>
            </div>

        </div>
    )
}

export default Programa;