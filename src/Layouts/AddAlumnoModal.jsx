import React, { useState, useEffect } from 'react';
import InputField from '../Components/InputField';
import Modal from '../Components/Modal';
import { useNavigate } from "react-router-dom";

const AddAlumnoModal = ({ setAlumnos }) => { // Accept setAlumnos as a prop
    const [newAlumno, setNewAlumno] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        carrera: "",
        resolucion: "",
        usuario: "",
        password: ""
    });
    const [carreras, setCarreras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (!user || user !== "sandra2024") {
            navigate('/');
        }
        const storedCarreras = JSON.parse(sessionStorage.getItem('carreras')) || [];
        setCarreras(storedCarreras);
    }, [navigate]);

    const addAlumno = () => {
        const storedAlumnos = JSON.parse(sessionStorage.getItem('alumnos')) || ALUMNOS;

        if (
            newAlumno.nombre.trim() === "" ||
            newAlumno.apellido.trim() === "" ||
            newAlumno.dni.trim() === "" ||
            newAlumno.email.trim() === "" ||
            newAlumno.carrera.trim() === ""
        ) {
            alert("Por favor, complete todos los campos requeridos.");
            return;
        }

        const alumnoExistente = storedAlumnos.some((carrera) =>
            carrera.alumnos.some((alumno) => alumno.dni === newAlumno.dni)
        );

        if (alumnoExistente) {
            alert("El DNI ya está registrado.");
            return;
        }

        const alumnoConAno = { ...newAlumno, año: 1 };

        const updatedALUMNOS = storedAlumnos.map((carrera) => {
            if (carrera.carrera === newAlumno.carrera) {
                return {
                    ...carrera,
                    alumnos: [...carrera.alumnos, alumnoConAno],
                };
            }
            return carrera;
        });

        sessionStorage.setItem('alumnos', JSON.stringify(updatedALUMNOS));
        setAlumnos(updatedALUMNOS); // Update the state in TablaAlumnos
        setNewAlumno({ // Clear the newAlumno state
            nombre: "",
            apellido: "",
            dni: "",
            email: "",
            carrera: "",
            resolucion: "",
            usuario: "",
            password: ""
        });
        setShowModal(false); // Close the modal after adding
    };

    const handleDniChange = (e) => {
        const dni = e.target.value;
        setNewAlumno({
            ...newAlumno,
            dni: dni,
            usuario: dni,
            password: dni,
        });
    };

    return (
        <>
            <button
                className="analista-button px-4 py-2 rounded-full select-none text-white w-48"
                onClick={() => setShowModal(true)}
            >
                <strong>Nuevo alumno</strong>
            </button>

            <Modal open={showModal} onClose={() => setShowModal(false)} onClick={addAlumno}>
                <h2 className="text-2xl font-bold mb-4 text-analista">Agregar Nuevo Alumno</h2>

                <div className="mb-4">
                    <label className="block text-sm font-bold text-analista">Nombre</label>
                    <InputField
                        id="text"
                        placeholder=""
                        value={newAlumno.nombre}
                        onChange={(e) => setNewAlumno({ ...newAlumno, nombre: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-analista">Apellido</label>
                    <InputField
                        type="text"
                        placeholder=""
                        value={newAlumno.apellido}
                        onChange={(e) => setNewAlumno({ ...newAlumno, apellido: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-analista">DNI</label>
                    <InputField
                        type="text"
                        placeholder=""
                        value={newAlumno.dni}
                        onChange={handleDniChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-analista">Correo</label>
                    <InputField
                        type="text"
                        placeholder=""
                        value={newAlumno.email}
                        onChange={(e) => setNewAlumno({ ...newAlumno, email: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-analista">Selecciona una carrera</label>
                    <select
                        className="w-full p-2 border border-analista rounded mb-4"
                        value={newAlumno.carrera}
                        onChange={(e) => setNewAlumno({ ...newAlumno, carrera: e.target.value })}
                    >
                        <option value="">Seleccionar carrera</option>
                        {carreras.map((carrera, index) => (
                            <option key={index} value={carrera}>{carrera}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-analista">Usuario</label>
                    <InputField
                        type="text"
                        value={newAlumno.usuario} // Autocompletar con el DNI
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-analista">Contraseña</label>
                    <InputField
                        type="password"
                        value={newAlumno.password} // Autocompletar con el DNI
                        disabled
                    />
                </div>
            </Modal>
        </>
    );
}

export default AddAlumnoModal;
