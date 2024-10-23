import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import agregar from "../../Assets/Image/signomas.png";
import Mosaico from "../../Components/Mosaico";

const AddMateria = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [carreras, setCarreras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newResolucion, setnewResolucion] = useState('');
    const [resoluciones, setResoluciones] = useState([]);
    const [resolucionesLegacy, setResolucionesLegacy] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (!user || user !== "sandra2024") {
            navigate('/');
        } else {
            setNombre(user);
            setCarrera("Administración");
        }
        const storedCarreras = JSON.parse(sessionStorage.getItem('carreras')) || [];
        setCarreras(storedCarreras);
        setResolucionesLegacy([
            {
                id:1,
                carrera:"Analista de Sistemas",
                resolucion:"123",
                anio:2002
            },
            {
                id:2,
                carrera:"Analista de Sistemas",
                resolucion:"345",
                anio:2002
            },
            {
                id:3,
                carrera:"Publicidad",
                resolucion:"567",
                anio:2002
            },
            {
                id:4,
                carrera:"Diseño",
                resolucion:"789",
                anio:2002
            },
        ])
    }, [navigate]);

    const addCarrera = () => {
        if (newResolucion.trim() === '') return;
        if (carreras.some(c => c.toLowerCase() === newResolucion.toLowerCase())) {
            alert("La carrera ya existe.");
            return;
        }
        const updatedCarreras = [...carreras, newResolucion];
        setCarreras(updatedCarreras);
        sessionStorage.setItem('carreras', JSON.stringify(updatedCarreras));
        setnewResolucion('');
        setShowModal(false);
    };

    return (
        <>
            <div className="bg-hilet pb-20">
                <Navbar nombre={nombre}  ancho="aspect-w-1 aspect-h-2 w-[48vw] hover:w-[55vw] h-[59vw] hover:h-[62vw] max-w-[60vw] md:w-[17vw] md:hover:w-[20vw] md:max-w-[22vw] md:h-[30vw] md:hover:h-[32vw]"  carrera={carrera} />
                <div className={`min-h-screen select-none flex flex-col items-center justify-evenly py-20 lg:py-32 gap-8`}>
                    <div className='mt-5 gap-8 lg:mt-0'>
                        <h1 className="text-2xl select-none font-bold mb-6 text-center text-titular gap-5">Gestion de Materias</h1>
                    </div>
                    {(carrera === "Administración") && (
                        <div className="flex flex-row flex-wrap gap-8 items-start justify-center lg:max-w-6xl">
                            <Mosaico titulo={"Agregar"}  ancho="aspect-w-1 aspect-h-2 w-[48vw] hover:w-[55vw] h-[59vw] hover:h-[62vw] max-w-[60vw] md:w-[17vw] md:hover:w-[20vw] md:max-w-[22vw] md:h-[30vw] md:hover:h-[32vw]"  texto={"Nueva Resolucion"} callback={() => setShowModal(true)} imagen={agregar} />
                            {carreras.map((c, index) => (
                                <Mosaico key={index} titulo={c}  ancho="aspect-w-1 aspect-h-2 w-[48vw] hover:w-[55vw] h-[59vw] hover:h-[62vw] max-w-[60vw] md:w-[17vw] md:hover:w-[20vw] md:max-w-[22vw] md:h-[30vw] md:hover:h-[32vw]"  texto={"Resolucion: "} callback={()=>{modificarCarrera(c)}} imagen={(c=="Analista de Sistemas")?"src/Assets/Image/LOGO-AS.png":(c=="Publicidad")?"src/Assets/Image/LOGO-PUBLI.png":"src/Assets/Image/school.png"} />
                            ))}
                        </div>
                    )}
                </div>
                {(resolucionesLegacy.length>-1) && (
                    <div className="flex flex-col justify-center align-top items-center gap-8 mt-3">
                        <h2 className="text-2xl select-none font-bold text-center text-titular gap-5 mb-8">Resoluciones anteriores</h2>
                        <div className="flex flex-wrap flex-row justify-center items-center gap-8 lg:max-w-7xl p-5">
                            {resolucionesLegacy.map((c, index) => (
                                <Mosaico key={index} titulo={c.carrera} ancho="aspect-w-1 aspect-h-2 w-[48vw] hover:w-[55vw] h-[59vw] hover:h-[62vw] max-w-[60vw] md:w-[17vw] md:hover:w-[20vw] md:max-w-[22vw] md:h-[30vw] md:hover:h-[32vw]" html={`<div className="flex flex-row justify-between items-center gap-8"><p>Resolucion: ${c.resolucion}</p><p>Año: ${c.anio}</p></div>`} callback={()=>{}} imagen={(c.carrera=="Analista de Sistemas")?"src/Assets/Image/LOGO-AS.png":(c.carrera=="Publicidad")?"src/Assets/Image/LOGO-PUBLI.png":"src/Assets/Image/school.png"} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed select-none inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-analista">Agregar Nueva Carrera</h2>
                        <input
                            type="text"
                            className="w-full p-2 border border-analista rounded mb-4"
                            placeholder="Nombre de la carrera"
                            value={newResolucion}
                            onChange={(e) => setnewResolucion(e.target.value)}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="cancelar text-white px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="aceptar text-white px-4 py-2 rounded"
                                onClick={addCarrera}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddMateria;
