import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import agregar from "../../Assets/Image/signomas.png";

const AddCarrera = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [carreras, setCarreras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCarrera, setNewCarrera] = useState('');
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

    return (
        <>
            <div>
                <Navbar nombre={nombre} carrera={carrera} />
                <div className={`min-h-screen select-none flex flex-col items-center justify-evenly bg-hilet py-20 lg:py-32`}>
                    <div className='mt-5 gap-8 lg:mt-0'>
                        <h1 className="text-2xl font-bold mb-6 text-center text-titular gap-5">Agregar carreras</h1>
                    </div>
                    {(carrera === "Administración") && (
                        <div className="flex flex-row flex-wrap gap-8 items-start justify-center lg:max-w-6xl">
                            <div
                                className="opacity-85 bg-slate-100 p-8 rounded-lg flex flex-col items-center mosaicos shadow-2xl shadow-black cursor-pointer"
                                onClick={() => setShowModal(true)}
                            >
                                <img className="flex-grow h-10 flex justify-center items-center activo aspect-square" src={agregar} alt="Signo de agregar" />
                                <div>
                                    <h4 className={`text-2xl font-bold mt-4 text-center text-mosaico opacity-100 text-analista`}>Agregar</h4>
                                </div>
                            </div>
                            {carreras.map((c, index) => (
                                <div key={index} className="bg-blanco p-8 rounded-lg flex flex-col items-center mosaicos shadow-2xl shadow-black">
                                    <div className="flex-grow flex justify-center items-center bg-figuras activo aspect-square">
                                    </div>
                                    <div className="text-mosaico">
                                        <h4 className={`text-2xl font-bold mt-4 text-center text-mosaico text-analista`}>{c}</h4>
                                    </div>
                                </div>
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
        </>
    );
};

export default AddCarrera;
