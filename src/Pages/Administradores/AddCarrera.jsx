import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import agregar from "../../Assets/Image/signomas.png";
import Mosaico from "../../Components/Mosaico";

const AddCarrera = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [carreras, setCarreras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCarrera, setNewCarrera] = useState('');
    const [showModalModify, setShowModalModify] = useState(false);
    const [modifiedCarrera, setModifiedCarrera] = useState('');
    const [newModifiedCarrera, setNewModifiedCarrera] = useState('');
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
                            <Mosaico titulo={"Agregar"} callback={() => setShowModal(true)} imagen={agregar} />
                            {carreras.map((c, index) => (
                                <Mosaico key={index} titulo={c} callback={()=>{modificarCarrera(c)}} imagen={(c=="Analista de Sistemas")?"src/Assets/Image/LOGO-AS.png":(c=="Publicidad")?"src/Assets/Image/LOGO-PUBLI.png":"src/Assets/Image/school.png"} />
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
                                    /* CAMBIO POR API */
                                    setShowModalModify(false);
                                    setModifiedCarrera('');
                                    setNewModifiedCarrera('');
                                }}
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

export default AddCarrera;
