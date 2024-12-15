import { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import InputField from "../Components/InputField";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Tooltip } from "@mui/material";
import { GetCarrerasActivas, GetResolucionesActivas } from "../Services/apiAdmin/Carreras";
import { UpdateAlumno } from "../Services/apiAdmin/Alumnos";

const ModificarAlumnos = ({ alumno, onAlumnoModificado, onAlumnoEliminado, fetchAlumnos }) => {
    const [modalisopen, setModalIsOpen] = useState(false);
    const [initialModalOpen, setInitialModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // modal para confirmar delete
    const [alumnoData, setAlumnoData] = useState(alumno);
    const [carreras, setCarreras] = useState([]);
    const [resoluciones, setResoluciones] = useState([]);
    const [filteredResoluciones, setFilteredResoluciones] = useState([]);
    const navigate = useNavigate();

    const getCarreras = async () => {
        try {
            const response = await GetCarrerasActivas();
            setCarreras(response);
        } catch (error) {
            console.error("Error al obtener carreras:", error);
        }
    };

    const getResoluciones = async () => {
        try {
            const response = await GetResolucionesActivas();
            setResoluciones(response || []);
        } catch (error) {
            console.error("Error al obtener resoluciones:", error);
        }
    };

    useEffect(() => {
        getCarreras();
        getResoluciones();
    }, []);

    useEffect(() => {
        setAlumnoData(alumno);
        console.log(alumnoData);
    }, [alumno]);

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

    const handleCarreraChange = (e) => {
        const id_carrera = e.target.value;
        setAlumnoData({ ...alumnoData, idResolucion: "" });
        setFilteredResoluciones(resoluciones.filter((res) => res.id_carrera.toString() === id_carrera));
    };

    // Modify student data
    const modificarAlumno = async () => {
        const idResolucionAEnviar = (alumnoData.idResolucion === "") ? 9999999 : alumnoData.idResolucion;

        try {
            const result = await UpdateAlumno(
            {   id_usuario:alumnoData.id ,
                nombre_usuario:alumnoData.nombre,
                apellido_usuario:alumnoData.apellido,
                dni:alumnoData.dni,
                correo_usuario:alumnoData.email,
                password:"abc123",
                fechasFinales:[2525,2525],
                idResolucion:idResolucionAEnviar
            }
            );
            console.log(result);
            if (result.succes) {
                setModalIsOpen(false);
                fetchAlumnos();
                alert("Alumno modificado correctamente");
            } else {
                alert("Hubo un error al modificar el alumno.");
            }
        } catch (error) {
            console.error("Error al modificar alumno:", error);
            alert("Hubo un error al modificar el alumno.");
        }
    };
    const resetContraseña = () => { setAlumnoData({ ...alumnoData, password: alumnoData.dni }); };

    // Confirm delete user
    const confirmDeleteUser = () => {
        setDeleteModalOpen(true); // Open delete confirmation modal
    };
    const deleteUser = () => {
        //este no todavia no lo vamos a implementar
      };

    return (
        <div>
            <button className="rounded-lg p-2 bg-yellow-400 hover:bg-yellow-500" onClick={open}>
                <ModeEditIcon fontSize="medium" />
            </button>

            {/* Initial Modal - What do you want to do with the student? */}
            <Modal open={initialModalOpen} onClose={closeInitialModal} aceptar={false}>
                <h1 className="text-2xl font-extrabold mb-6 text-center text-analista">
                    ¿Qué acción tomar con : {alumnoData.nombre} ?
                </h1>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={openModifyModal}
                        className="analista-button text-white px-4 py-2 rounded-lg"
                    >
                        Modificar Alumno
                    </button>
                    <button
                        onClick={() => navigate(`/alumno/${alumnoData.dni}/status`)}
                        className="analista-button text-white px-4 py-2 rounded-lg"
                    >
                        Situación Académica
                    </button>
                    <button
                        onClick={confirmDeleteUser} // Open delete confirmation modal
                        className="otro-button text-white px-4 py-2 rounded-lg"
                    >
                        <strong>Eliminar Usuario</strong>
                    </button>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal open={deleteModalOpen} onClose={closeDeleteModal} onClick={deleteUser}>
                <h2 className="text-xl font-extrabold mb-4 text-center text-red-600">
                    Confirmar Eliminación
                </h2>
                <p className="text-center mb-6">¿Estás seguro de que quieres eliminar a {alumnoData.nombre}?</p>
            </Modal>

            {/* Existing "Modificar Alumno" Modal */}
            <Modal open={modalisopen} onClose={closeModifyModal} onClick={modificarAlumno} aceptar={false}>
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
                        <div className="flex items-center justify-between">
                            <InputField
                                type="password"
                                id="contraseña"
                                value={alumnoData.contraseña}
                                disabled
                                className="bg-gray-300"
                                bg="bg-gray-300"
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
                            value={alumnoData.id_carrera}
                            onChange={handleCarreraChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                            <option value="">Seleccionar carrera</option>
                            {carreras && carreras.map((carrera) => (
                                <option key={carrera.id_carrera} value={carrera.id_carrera}>
                                    {carrera.nombre_carrera}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Select field for resolution */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="resolucion">Resolución:</label>
                        <select
                            id="resolucion"
                            value={alumnoData.idResolucion}
                            onChange={(e) => setAlumnoData({ ...alumnoData, idResolucion: parseInt(e.target.value, 10) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">No quiero cambiar resolucion</option>
                            {filteredResoluciones && filteredResoluciones.map((resolucion) => (
                                <option key={resolucion.id_resolucion} value={resolucion.id_resolucion}>
                                    {resolucion.nombre_resolucion}
                                </option>
                            ))}
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
