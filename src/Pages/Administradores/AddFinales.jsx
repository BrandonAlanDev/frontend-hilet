import { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import TablaAlumnos from '../../Layouts/TablaAlumnos';
import BuscadorAlumnos from '../../Components/BuscadorAlumnos';
import TablaFinalesAdministracion from '../../Layouts/TablaFinalesAdministracion';
import BuscadorFinalesAdmin from '../../Components/BuscadorFinalesAdmin';

const AddFinales = () => {
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
        if (!user || sessionStorage.getItem('carrera')!='Administracion') {
            navigate('/');
        } else {
            setNombre(sessionStorage.getItem('nombre')+' '+sessionStorage.getItem('apellido'));
            setCarrera("Administracion");
        }
    }, [navigate]);

    useEffect(() => {
        setFondoOpaco("bg-analista");
        setFondoDegradado("bg-hilet");
        setColor("analista");
    }, [carrera]);

    return (
        <div>
            <Navbar nombre={nombre} carrera={carrera} />
            <div className={`min-h-screen select-none flex flex-col items-center justify-evenly ${fondoDegradado} py-20 lg:py-32 gap-8`}>
                <p className='text-white font-bold text-5xl select-none'>Gestion de Finales</p>
                <p className='text-white font-bold text-xl select-none'>{"(Seccion en construccion)"}</p>
                <div className=''>
                <TablaFinalesAdministracion
                    carrera={carrera}
                    color={color}
                    busqueda={busqueda}
                    estadoFiltro={estadoFiltro}
                    buscador={<BuscadorFinalesAdmin setBusqueda={setBusqueda} setEstadoFiltro={setEstadoFiltro} />}
                />
                </div>
            </div>

        </div>
    )
}

export default AddFinales;