import React, { useState, useEffect } from 'react';

const AddAlumnoModal = () => {

    const [newAlumno, setNewAlumno] = useState({ nombre: "", apellido: "", dni: "", email: "", carrera: "", resolucion: "", usuario: "", password: "" });
    const [alumnos, setAlumnos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        // Cargar las carreras desde sessionStorage
        const storedCarreras = JSON.parse(sessionStorage.getItem('carreras')) || [];
        setCarreras(storedCarreras);
    }, []);

    const addAlumno = () => {
        if (newAlumno.nombre.trim() === "" || newAlumno.apellido.trim() === "" || newAlumno.dni.trim() === "" || newAlumno.email.trim() === "") {
            alert("Por favor, complete todos los campos requeridos.");
            return;
        }

        // Verificar si ya existe un alumno con el mismo DNI
        if (alumnos.some((alumno) => alumno.dni === newAlumno.dni)) {
            alert("El DNI ya está registrado.");
            return;
        }

        const updatedAlumnos = [...alumnos, newAlumno];
        setAlumnos(updatedAlumnos);
        sessionStorage.setItem("alumnos", JSON.stringify(updatedAlumnos));
        setNewAlumno({ nombre: "", apellido: "", dni: "", email: "", carrera: "", resolucion: "", usuario: "", password: "" });
        setShowModal(false);
    };

    const handleDniChange = (e) => {
        const dni = e.target.value;
        // Actualizar el estado con el DNI y autocompletar usuario y contraseña
        setNewAlumno({
            ...newAlumno,
            dni: dni,
            usuario: dni,
            password: dni,
        });
    };

    return (
        <>
            {/* Botón para abrir el modal */}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => setShowModal(true)}
            >
                Agregar Alumno
            </button>

            {/* Modal */}
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-analista">
                                Agregar Nuevo Alumno
                            </h2>
                            <input
                                type="text"
                                className="w-full p-2 border border-analista rounded mb-4"
                                placeholder="Nombre del Alumno"
                                value={newAlumno.nombre}
                                onChange={(e) => {
                                    setNewAlumno({ ...newAlumno, nombre: e.target.value });
                                }}
                            />
                            <input
                                type="text"
                                className="w-full p-2 border border-analista rounded mb-4"
                                placeholder="Apellido"
                                value={newAlumno.apellido}
                                onChange={(e) => {
                                    setNewAlumno({ ...newAlumno, apellido: e.target.value });
                                }}
                            />
                            <input
                                type="text"
                                className="w-full p-2 border border-analista rounded mb-4"
                                placeholder="DNI"
                                value={newAlumno.dni}
                                onChange={handleDniChange}
                            />
                            <input
                                type="text"
                                className="w-full p-2 border border-analista rounded mb-4"
                                placeholder="Correo"
                                value={newAlumno.email}
                                onChange={(e) => {
                                    setNewAlumno({ ...newAlumno, email: e.target.value });
                                }}
                            />

                            <select
                                className="w-full p-2 border border-analista rounded mb-4"
                                value={newAlumno.carrera}
                                onChange={(e) => setNewAlumno({ ...newAlumno, carrera: e.target.value })}
                            >
                                <option value="">Selecciona una carrera</option>
                                {carreras.map((carrera, index) => (
                                    <option key={index} value={carrera}>{carrera}</option>
                                ))}
                            </select>
                            <label htmlFor="usuario" className="w-full bg-white flex input text-left">Usuario</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-analista rounded mb-4"
                                value={newAlumno.usuario} // Autocompletar con el DNI
                                disabled
                            />
                            <label htmlFor="password" className="w-full bg-white flex input text-left">Contraseña</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-analista rounded mb-4"
                                value={newAlumno.password} // Autocompletar con el DNI
                                disabled
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
                                    onClick={addAlumno}
                                >
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );

}

export default AddAlumnoModal;