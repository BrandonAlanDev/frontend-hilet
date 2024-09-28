import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import agregar from "../../Assets/Image/signomas.png";

const AddMateria = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [carreras, setCarreras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newResolucion, setnewResolucion] = useState('');
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
            <div>
                <Navbar nombre={nombre} carrera={carrera} />
                <div className={`min-h-screen select-none flex flex-col items-center justify-evenly bg-hilet py-20 lg:py-32 gap-8`}>
                    <div className='mt-5 gap-8 lg:mt-0'>
                        <h1 className="text-2xl select-none font-bold mb-6 text-center text-titular gap-5">Cargar materias</h1>
                    </div>
                    {(carrera === "Administración") && (
                        <div className="flex flex-row flex-wrap gap-8 items-start justify-center lg:max-w-6xl">
                            {carreras.map((c, index) => (
                                <div key={index} className="bg-blanco p-8 rounded-lg flex flex-col items-center justify-between mosaicos shadow-2xl shadow-black w-[300px] h-[360px]">
                                    <div className="text-mosaico">
                                        <h4 className={`text-2xl select-none font-bold mt-4 text-center text-mosaico text-analista`}>{c}</h4>
                                    </div>
                                    <img className="flex select-none justify-center items-center activo aspect-square w-[100px] h-[100px]" src={(c=="Analista de Sistemas")?"src/Assets/Image/LOGO-AS.png":(c=="Publicidad")?"src/Assets/Image/LOGO-PUBLI.png":"src/Assets/Image/school.png"} alt="Logo instituto"/>
                                    <div className="text-mosaico">
                                        <h4 className={`text-2xl select-none font-bold mt-4 text-center text-mosaico text-analista`}>{"6790/9"}</h4>
                                    </div>
                                </div>
                            ))}
                            <div
                                className="opacity-85 select-none bg-slate-100 p-8 rounded-lg flex flex-col items-center justify-between mosaicos shadow-2xl shadow-black cursor-pointer w-[300px] h-[360px]"
                                onClick={() => setShowModal(true)}
                            >
                                <div>
                                    <h4 className={`text-2xl select-none font-bold mt-4 text-center text-mosaico opacity-100 text-analista`}>Nueva carrera</h4>
                                </div>
                                <img className="flex select-none justify-center items-center activo aspect-square w-[100px] h-[100px]" src={agregar} alt="Signo de agregar" />
                                <div>
                                    <h4 className={`text-2xl select-none font-bold mt-4 text-center text-mosaico opacity-100 text-analista`}>Nueva resolucion</h4>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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
