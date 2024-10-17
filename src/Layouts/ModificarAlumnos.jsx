import { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import InputField from "../Components/InputField";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Tooltip } from "@mui/material";

const ModificarAlumnos = ({ alumno, onAlumnoModificado }) => {
    const [modalisopen, setModalIsOpen] = useState(false);
    const [initialModalOpen, setInitialModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // New delete modal state
    const [alumnoData, setAlumnoData] = useState(alumno);
    const navigate = useNavigate();

    // Open and close functions for modals
    const open = () => setInitialModalOpen(true);
    const closeInitialModal = () => setInitialModalOpen(false);
    const closeModifyModal = () => setModalIsOpen(false);
    const closeDeleteModal = () => setDeleteModalOpen(false); // Close delete modal

    // Open the "Modificar Alumno" modal after initial modal
    const openModifyModal = () => {
        setInitialModalOpen(false); // Close initial modal
        setModalIsOpen(true); // Open modify modal
    };

    useEffect(() => {
        setAlumnoData(alumno);
    }, [alumno]);

    // Reset password to DNI
    const resetContraseña = () => {
        setAlumnoData((prevAlumno) => ({
            ...prevAlumno,
            contraseña: prevAlumno.dni,
        }));
        alert('Contraseña restablecida a: ' + alumnoData.dni);
    };

    // Modify student data
    const modificarAlumno = () => {
        onAlumnoModificado(alumnoData);
        const storedAlumnos = JSON.parse(sessionStorage.getItem("alumnos")) || [];
        const updatedAlumnos = storedAlumnos.map((carrera) => {
            if (carrera.carrera === alumnoData.carrera) {
                return {
                    ...carrera,
                    alumnos: carrera.alumnos.map((alumno) =>
                        alumno.dni === alumnoData.dni ? alumnoData : alumno
                    ),
                };
            }
            return carrera;
        });
        sessionStorage.setItem("alumnos", JSON.stringify(updatedAlumnos)); // Save data
        setModalIsOpen(false);
    };

    // Confirm delete user
    const confirmDeleteUser = () => {
        setDeleteModalOpen(true); // Open delete confirmation modal
    };

    // Handle delete action
    const deleteUser = () => {
        // Logic to delete the user
        alert(`${alumnoData.nombre} eliminado.`);
        setDeleteModalOpen(false); // Close delete modal after deletion
        setInitialModalOpen(false); // Optionally close the initial modal if needed
    };

    return (
        <div>
            <button className="rounded-lg p-2 bg-yellow-400 hover:bg-yellow-500" onClick={open}>
                <ModeEditIcon fontSize="medium" />
            </button>

            {/* Initial Modal - What do you want to do with the student? */}
            <Modal open={initialModalOpen} onClose={closeInitialModal}>
                <h1 className="text-2xl font-extrabold mb-6 text-center text-analista">
                    ¿Qué deseas hacer con {alumnoData.nombre}?
                </h1>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={openModifyModal}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg"
                    >
                        Modificar Alumno
                    </button>
                    <button
                        onClick={() => navigate(`/alumno/${alumnoData.dni}/status`)}
                        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Situación Académica
                    </button>
                    <button
                        onClick={confirmDeleteUser} // Open delete confirmation modal
                        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Eliminar Usuario
                    </button>
                    <button
                        onClick={closeInitialModal}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
                <h2 className="text-xl font-extrabold mb-4 text-center text-red-600">
                    Confirmar Eliminación
                </h2>
                <p className="text-center mb-6">¿Estás seguro de que quieres eliminar a {alumnoData.nombre}?</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={deleteUser} // Delete user action
                        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={closeDeleteModal}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>

            {/* Existing "Modificar Alumno" Modal */}
            <Modal open={modalisopen} onClose={closeModifyModal} onClick={modificarAlumno}>
                <h1 className="text-2xl font-extrabold mb-6 text-center text-analista">Modificar Alumno</h1>
                <form>
                    {/* Alumno details */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista">Alumno:</label>
                        <p className="border p-2 bg-gray-100 rounded-lg">{alumnoData.apellido} {alumnoData.nombre}</p>
                    </div>

                    {/* User field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="usuario">Usuario:</label>
                        <InputField
                            id="usuario"
                            value={alumnoData.usuario}
                            onChange={(e) => setAlumnoData({ ...alumnoData, usuario: e.target.value })}
                        />
                    </div>

                    {/* Password field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="contraseña">Contraseña:</label>
                        <div className="flex items-center">
                            <InputField
                                type="password"
                                id="contraseña"
                                value={alumnoData.contraseña}
                                disabled
                                className="bg-gray-300"
                            />
                            <button
                                type="button"
                                onClick={resetContraseña}
                                className="analista-button text-white px-3 py-2 rounded-lg"
                            >
                                Restablecer
                            </button>
                            <Tooltip title="La contraseña por defecto es el DNI del usuario">
                                <HelpOutlineIcon className="ml-2 cursor-pointer text-analista" />
                            </Tooltip>
                        </div>
                    </div>

                    {/* Name field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="nombre">Nombre:</label>
                        <InputField
                            id="nombre"
                            value={alumnoData.nombre}
                            onChange={(e) => setAlumnoData({ ...alumnoData, nombre: e.target.value })}
                        />
                    </div>

                    {/* Surname field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="apellido">Apellido:</label>
                        <InputField
                            id="apellido"
                            value={alumnoData.apellido}
                            onChange={(e) => setAlumnoData({ ...alumnoData, apellido: e.target.value })}
                        />
                    </div>

                    {/* Email field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="email">Email:</label>
                        <InputField
                            id="email"
                            value={alumnoData.email}
                            onChange={(e) => setAlumnoData({ ...alumnoData, email: e.target.value })}
                        />
                    </div>

                    {/* Select field for career */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="carrera">Carrera:</label>
                        <select
                            id="carrera"
                            value={alumnoData.carrera}
                            onChange={(e) => setAlumnoData({ ...alumnoData, carrera: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="Analista de Sistemas">Analista de Sistemas</option>
                            <option value="Publicidad">Publicidad</option>
                            {/* Add more career options here */}
                        </select>
                    </div>
                </form>
                <div className="flex justify-end">
                    <button
                        onClick={modificarAlumno}
                        className="analista-button text-white px-4 py-2 rounded-lg"
                    >
                        Guardar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ModificarAlumnos;
