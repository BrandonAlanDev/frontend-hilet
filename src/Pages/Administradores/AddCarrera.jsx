import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import agregar from "../../Assets/Image/signomas.png";
import Mosaico from "../../Components/Mosaico";
import { GetAllCarreras, CreateCarrera, UpdateCarrera, DeleteCarrera } from "../../Services/apiAdmin/Carreras";

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

    const refrescarCarreras = async () => {
        try {
            let response = await GetAllCarreras();
            if (response && response.data && response.data.length > 0) {
                const carreras = response.data.filter(c => c.estado_carrera).map(c => ({ id: c.id_carrera, nombre: c.nombre_carrera }));
                setCarreras(carreras);
                sessionStorage.setItem('carreras', JSON.stringify(carreras)); // Guarda las carreras en sessionStorage
            } else {
                console.warn("La respuesta fue exitosa pero no se obtuvieron carreras.");
            }
        } catch (error) {
            console.error("Error al intentar obtener las carreras. Detalles:", error.message);
        }
    };

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
        refrescarCarreras();
    }, [navigate]);

    const addCarrera = async () => {
        if (newCarrera.trim() === '') return;
        if (carreras.some(c => c.nombre.toLowerCase() === newCarrera.toLowerCase())) {
            alert("La carrera ya existe.");
            return;
        }
        try {
            await CreateCarrera(newCarrera);
            const updatedCarreras = [...carreras, { nombre: newCarrera }];
            setCarreras(updatedCarreras);
            sessionStorage.setItem('carreras', JSON.stringify(updatedCarreras));
            setNewCarrera('');
            refrescarCarreras();
            setShowModal(false);
        } catch (error) {
            console.error("Error al agregar la carrera. Detalles:", error.message);
        }
    };

    const modificarCarrera = (carrera) => {
        setModifiedCarrera(carrera);
        setNewModifiedCarrera(carrera.nombre);
        setShowModalModify(true);
    };

    const modificarCarreraFinal = async () => {
        if (newModifiedCarrera.trim() === '') return;
        try {
            await UpdateCarrera(modifiedCarrera.id, newModifiedCarrera);
            const updatedCarreras = carreras.map(c => (c.id === modifiedCarrera.id ? { ...c, nombre: newModifiedCarrera } : c));
            setCarreras(updatedCarreras);
            sessionStorage.setItem('carreras', JSON.stringify(updatedCarreras));
            setModifiedCarrera('');
            setNewModifiedCarrera('');
            refrescarCarreras();
            setShowModalModify(false);
        } catch (error) {
            console.error("Error al modificar la carrera. Detalles:", error.message);
        }
    };

    const eliminarCarrera = async (idCarrera) => {
        try {
            await DeleteCarrera(idCarrera);
            const updatedCarreras = carreras.filter(c => c.id !== idCarrera);
            setCarreras(updatedCarreras);
            sessionStorage.setItem('carreras', JSON.stringify(updatedCarreras));
            setModifiedCarrera('');
            setNewModifiedCarrera('');
            refrescarCarreras();
            setShowModalModify(false);
        } catch (error) {
            console.error("Error al eliminar la carrera. Detalles:", error.message);
        }
    };

    return (
        <>
            <div>
                <Navbar nombre={nombre} carrera={carrera} />
                <div className={`min-h-screen select-none flex flex-col items-center justify-evenly bg-hilet py-20 lg:py-32 gap-8`}>
                    <div className='mt-5 gap-8 lg:mt-0'>
                        <h1 className="text-2xl font-bold mb-6 text-center text-titular gap-5">Agregar carreras</h1>
                    </div>
                    {(carrera === "Administracion") && (
                        <div className="flex flex-row flex-wrap gap-8 items-start justify-center lg:max-w-6xl">
                            <Mosaico titulo={"Agregar"} ancho={"max-w-[400px]"} callback={() => setShowModal(true)} imagen={agregar} />
                            {carreras.map((c, index) => (
                                <Mosaico key={index} ancho={"max-w-[400px]"} titulo={c.nombre} callback={() => modificarCarrera(c)} imagen={(c.nombre === "Analista de sistemas") ? "src/Assets/Image/LOGO-AS.png" : (c.nombre === "Publicidad") ? "src/Assets/Image/LOGO-PUBLI.png" : "src/Assets/Image/school.png"} />
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
                        <h4 className="text-md font-bold mb-4 text-gray-500">Modificando: {modifiedCarrera.nombre}</h4>
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
                                onClick={() => eliminarCarrera(modifiedCarrera.id)}
                            >
                                Eliminar carrera
                            </button>
                            <button
                                className="cancelar text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setShowModalModify(false);
                                    setModifiedCarrera('');
                                    setNewModifiedCarrera('');
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                className="aceptar text-white px-4 py-2 rounded"
                                onClick={() => modificarCarreraFinal()}
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
