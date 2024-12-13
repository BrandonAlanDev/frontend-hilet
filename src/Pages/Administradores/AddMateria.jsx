import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import agregar from "../../Assets/Image/signomas.png";
import Mosaico from "../../Components/Mosaico";
import { WindowSharp } from "@mui/icons-material";

const AddMateria = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [carreras, setCarreras] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [newResolucion, setNewResolucion] = useState('');
    const [newResolucionAnio, setNewResolucionAnio] = useState('');
    const [newResolucionId, setNewResolucionId] = useState('');
    const [resoluciones, setResoluciones] = useState([]);
    const [resolucionesLegacy, setResolucionesLegacy] = useState([]);
    const [resolucionesActuales, setResolucionesActuales] = useState([]);
    const [showModalModify, setShowModalModify] = useState(false);
    const [resolucionToModify, setResolucionToModify] = useState(null);
    const [carreraSelected,setCarreraSelected]=useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (!user || sessionStorage.getItem('carrera')!='Administracion') {
            navigate('/');
        } else {
            setNombre(sessionStorage.getItem('nombre')+' '+sessionStorage.getItem('apellido'));
            setCarrera("Administracion");
        }
        const storedCarreras = JSON.parse(sessionStorage.getItem('carreras')) || [];
        setCarreras(storedCarreras);
        const storedResoluciones = JSON.parse(sessionStorage.getItem('resoluciones')) || [];
        setResoluciones(storedResoluciones);
    }, [navigate]);
    useEffect(() => {
        refrescar();
    }, [resoluciones]);

    const refrescar = () => {
        const currentResolucionesMap = {};
    
        // Agrupar las resoluciones más recientes por carrera
        resoluciones.forEach(res => {
            if (!currentResolucionesMap[res.carrera]) {
                currentResolucionesMap[res.carrera] = res; // Guardar la resolución si no existe
            } else {
                // Comparar el año y actualizar si es más reciente
                if (res.anio > currentResolucionesMap[res.carrera].anio) {
                    currentResolucionesMap[res.carrera] = res;
                } else if (res.anio === currentResolucionesMap[res.carrera].anio) {
                    // Si el año es el mismo, guardar la más reciente por ID
                    if (res.id > currentResolucionesMap[res.carrera].id) {
                        currentResolucionesMap[res.carrera] = res;
                    }
                }
            }
        });
    
        // Convertir el mapa a un array
        const currentResoluciones = Object.values(currentResolucionesMap);
    
        // Ordenar todas las resoluciones del año más alto al más bajo
        const sortedResoluciones = [...resoluciones].sort((a, b) => b.anio - a.anio);
    
        // Actualizar los estados
        setResolucionesActuales(currentResoluciones);
        setResolucionesLegacy(sortedResoluciones); // Aquí puedes cambiar el nombre a algo más apropiado si no usas legacy
    };
    

    const addResolucion = () => {
        if (newResolucion.trim() === '' || newResolucionAnio.trim() === '') return;
        const nuevaResolucion = {
            id: Date.now(),
            carrera: carreraSelected,
            resolucion: newResolucion,
            anio: newResolucionAnio
        };
        if(nuevaResolucion.carrera && nuevaResolucion.resolucion && nuevaResolucion.anio && nuevaResolucion.anio>1980){
            const updatedResoluciones = [...resoluciones, nuevaResolucion];
            setResoluciones(updatedResoluciones);
            sessionStorage.setItem('resoluciones', JSON.stringify(updatedResoluciones));
            setNewResolucion('');
            setNewResolucionAnio('');
            setShowModalAdd(false);
            refrescar();
        } else{
            alert("Debes de llenar todos los campos");
        }

    };

    const modifyResolucion = () => {
        if (!resolucionToModify) return;
        const updatedResoluciones = resoluciones.map(res => {
            if (res.id === resolucionToModify.id) {
                return {
                    ...res,
                    resolucion: newResolucion,
                    anio: newResolucionAnio
                };
            }
            return res;
        });

        setResoluciones(updatedResoluciones);
        sessionStorage.setItem('resoluciones', JSON.stringify(updatedResoluciones));
        setShowModalModify(false);
        setNewResolucion('');
        setNewResolucionAnio('');
        refrescar();
    };

    const eliminarResolucion = (id) => {
        const updatedResoluciones = resoluciones.filter(res => res.id !== id);
        setResoluciones(updatedResoluciones);
        sessionStorage.setItem('resoluciones', JSON.stringify(updatedResoluciones));
        refrescar();
        setShowModalModify(false);
    };

    return (
        <>
            <div className="bg-hilet pb-20">
                <Navbar nombre={nombre}  ancho="aspect-w-1 aspect-h-2 w-[48vw] hover:w-[55vw] h-[59vw] hover:h-[62vw] max-w-[60vw] md:w-[17vw] md:hover:w-[20vw] md:max-w-[22vw] md:h-[30vw] md:hover:h-[32vw]"  carrera={carrera} />
                <div className={`min-h-screen select-none flex flex-col items-center justify-evenly py-20 lg:py-32 gap-8`}>
                    <div className='flex flex-col mt-5 gap-8 lg:mt-0'>
                        <h1 className="text-2xl select-none font-bold mb-6 text-center text-titular gap-5">Gestion de Materias</h1>
                        <h2 className="text-4xl select-none font-bold text-center text-white gap-5 mb-8">Resoluciones actuales</h2>
                    </div>
                    {(carrera === "Administracion") && (
                        <div className="flex flex-row flex-wrap gap-8 items-start justify-center lg:max-w-6xl">
                            <Mosaico titulo={"Agregar"}  ancho="aspect-w-1 aspect-h-2 w-[48vw] hover:w-[55vw] h-[59vw] hover:h-[62vw] max-w-[60vw] md:w-[17vw] md:hover:w-[20vw] md:max-w-[22vw] md:h-[30vw] md:hover:h-[32vw]"  texto={"Nueva Resolucion"} callback={() => setShowModalAdd(true)} imagen={agregar} />
                            {resolucionesActuales.map((c) => (
                                <Mosaico 
                                    key={c.id} 
                                    titulo={c.carrera} 
                                    html={`<div className="flex flex-row justify-between items-center gap-8"><p>Resolucion: ${c.resolucion}</p><p>Año: ${c.anio}</p></div>`}
                                    ancho="aspect-w-1 aspect-h-2 w-[48vw] hover:w-[55vw] h-[59vw] hover:h-[62vw] max-w-[60vw] md:w-[17vw] md:hover:w-[20vw] md:max-w-[22vw] md:h-[30vw] md:hover:h-[32vw]"
                                    callback={() => {
                                        setResolucionToModify(c);
                                        setNewResolucionId(c.id);
                                        setNewResolucion(c.resolucion);
                                        setNewResolucionAnio(c.anio);
                                        setShowModalModify(true);
                                    }} 
                                    imagen={(c.carrera=="Analista de sistemas")?"src/Assets/Image/LOGO-AS.png":(c.carrera=="Publicidad")?"src/Assets/Image/LOGO-PUBLI.png":"src/Assets/Image/school.png"}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {(resolucionesLegacy.length>-1) && (
                    <div className="flex flex-col justify-center align-top items-center gap-8 mt-3">
                        <h2 className="text-xl select-none font-bold text-center text-titular gap-5 mb-8">Todas las resoluciones</h2>
                        <div className="flex flex-wrap flex-row justify-center items-center gap-8 lg:max-w-7xl p-5">
                            {resoluciones.map((c, index) => (
                                <Mosaico key={index} titulo={c.carrera} ancho="aspect-w-1 aspect-h-2 w-[48vw] hover:w-[55vw] h-[59vw] hover:h-[62vw] max-w-[60vw] md:w-[17vw] md:hover:w-[20vw] md:max-w-[22vw] md:h-[30vw] md:hover:h-[32vw]" html={`<div className="flex flex-row justify-between items-center gap-8"><p>Resolucion: ${c.resolucion}</p><p>Año: ${c.anio}</p></div>`} callback={()=>{}} imagen={(c.carrera=="Analista de Sistemas")?"src/Assets/Image/LOGO-AS.png":(c.carrera=="Publicidad")?"src/Assets/Image/LOGO-PUBLI.png":"src/Assets/Image/school.png"} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModalAdd && (
                <div className="fixed select-none inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-analista">Agregar Nueva Resolucion</h2>
                        <select 
                            className="w-full p-2 border rounded mb-4" 
                            value={carreraSelected}
                            onChange={(e) => setCarreraSelected(e.target.value)}
                        >
                            <option value="">Seleccione una carrera</option>
                            {carreras.map((c, index) => (
                                <option key={index} value={c}>{c}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Resolución"
                            value={newResolucion}
                            onChange={(e) => setNewResolucion(e.target.value)}
                        />
                        <input
                            type="number"
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Año"
                            value={newResolucionAnio}
                            onChange={(e) => setNewResolucionAnio(e.target.value)}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="cancelar text-white px-4 py-2 rounded"
                                onClick={() => setShowModalAdd(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="aceptar text-white px-4 py-2 rounded"
                                onClick={addResolucion}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Modificar Resolución */}
            {showModalModify && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-analista">Modificar Resolución</h2>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Resolución"
                            value={newResolucion}
                            onChange={(e) => setNewResolucion(e.target.value)}
                        />
                        <input
                            type="number"
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Año"
                            value={newResolucionAnio}
                            onChange={(e) => setNewResolucionAnio(e.target.value)}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="cancelar text-white px-4 py-2 rounded"
                                onClick={() => eliminarResolucion(newResolucionId)}
                            >
                                Eliminar
                            </button>
                            <button
                                className="cancelar text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setShowModalModify(false);
                                    setResolucionToModify(null);
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                className="aceptar text-white px-4 py-2 rounded"
                                onClick={modifyResolucion}
                            >
                                Modificar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddMateria;
