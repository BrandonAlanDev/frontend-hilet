import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import agregar from "../../Assets/Image/signomas.png";
import Mosaico from "../../Components/Mosaico";
import {GetAllCarreras} from "../../Services/apiAdmin/Carreras"

const AddCarrera = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [carreras, setCarreras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCarrera, setNewCarrera] = useState('');
    const [showModalModify, setShowModalModify] = useState(false);
    const [modifiedCarrera, setModifiedCarrera] = useState('');
    const [newModifiedCarrera, setNewModifiedCarrera] = useState('');
    const [carrerasPrueba, setCarrerasPrueba] = useState([]);
    const navigate = useNavigate();


    const refrescarCarreras= async ()=>{
        try {
            let carreras = await GetAllCarreras();
    
            if (carreras && carreras.length > 0) {
                console.log("Carreras obtenidas:", carreras);
                setCarrerasPrueba(carreras);
                sessionStorage.setItem('carreras', JSON.stringify(carreras)); // Guarda las carreras en sessionStorage
            } else {
                // Mensaje más específico si no hay carreras
                console.warn("La respuesta fue exitosa pero no se obtuvieron carreras. Posible cuerpo vacío o datos incorrectos.");
            }
        } catch (error) {
            // Mensaje más detallado del error
            console.error("Error al intentar obtener las carreras. Detalles:", error.message);
        }
    }

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
        refrescarCarreras();
    }, [navigate]);

    const addCarrera = () => {
        if (newCarrera.trim() === '') return;
        if (carreras.some(c => c.toLowerCase() === newCarrera.toLowerCase())) {
            alert("La carrera ya existe.");
            return;
        }
        const updatedCarreras = [...carreras, newCarrera];
        setCarreras(updatedCarreras);
        sessionStorage.setItem('carreras', JSON.stringify(updatedCarreras));
        setNewCarrera('');
        setShowModal(false);
    };
    const modificarCarrera = (nombreCarrera)=>{
        setModifiedCarrera(nombreCarrera);
        setNewModifiedCarrera(nombreCarrera);
        setShowModalModify(true);
    }
    const modificarCarreraFinal = () => {
        if (newModifiedCarrera.trim() === '') return;
        const updatedCarreras = carreras.map(c =>
            c === modifiedCarrera ? newModifiedCarrera : c
        );
        setCarreras(updatedCarreras);
        sessionStorage.setItem('carreras', JSON.stringify(updatedCarreras));
        setModifiedCarrera('');
        setNewModifiedCarrera('');
        setShowModalModify(false);
    };
    
    const eliminarCarrera = (nombreCarrera) => {
        const updatedCarreras = carreras.filter(c => c !== nombreCarrera);
        setCarreras(updatedCarreras);
        sessionStorage.setItem('carreras', JSON.stringify(updatedCarreras));
        setModifiedCarrera('');
        setNewModifiedCarrera('');
        setShowModalModify(false);
    };

    return (
        <>
            <div>
                <Navbar nombre={nombre} carrera={carrera} />
                <div className={`min-h-screen select-none flex flex-col items-center justify-evenly bg-hilet py-20 lg:py-32 gap-8`}>
                    <div className='mt-5 gap-8 lg:mt-0'>
                        <h1 className="text-2xl font-bold mb-6 text-center text-titular gap-5">Agregar carreras</h1>
                    </div>
                    {(carrera === "Administración") && (
                        <div className="flex flex-row flex-wrap gap-8 items-start justify-center lg:max-w-6xl">
                            <Mosaico titulo={"Agregar"} ancho={"max-w-[400px]"} callback={() => setShowModal(true)} imagen={agregar} />
                            {carreras.map((c, index) => (
                                <Mosaico key={index} ancho={"max-w-[400px]"} titulo={c} callback={()=>{modificarCarrera(c)}} imagen={(c=="Analista de Sistemas")?"src/Assets/Image/LOGO-AS.png":(c=="Publicidad")?"src/Assets/Image/LOGO-PUBLI.png":"src/Assets/Image/school.png"} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-analista">Agregar Nueva Carrera</h2>
                        <input
                            type="text"
                            className="w-full p-2 border border-analista rounded mb-4"
                            placeholder="Nombre de la carrera"
                            value={newCarrera}
                            onChange={(e) => setNewCarrera(e.target.value)}
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

            {/* Modal Modificar*/}
            {showModalModify && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-analista">Modificar carrera</h2>
                        <h4 className="text-md font-bold mb-4 text-gray-500">Modificando : {modifiedCarrera}</h4>
                        <input
                            type="text"
                            className="w-full p-2 border border-analista rounded mb-4"
                            placeholder="Nombre de la carrera"
                            value={newModifiedCarrera}
                            onChange={(e) => setNewModifiedCarrera(e.target.value)}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="cancelar text-white px-4 py-2 rounded"
                                onClick={() => eliminarCarrera(modifiedCarrera)}
                            >
                                Eliminar carrera
                            </button>
                            <button
                                className="cancelar text-white px-4 py-2 rounded"
                                onClick={()=>{
                                    setShowModalModify(false);
                                    setModifiedCarrera('');
                                    setNewModifiedCarrera('');
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                className="aceptar text-white px-4 py-2 rounded"
                                onClick={()=>{
                                    modificarCarreraFinal();
                                }}
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

export default AddCarrera;
