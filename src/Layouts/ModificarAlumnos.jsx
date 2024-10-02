import { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import InputField from "../Components/InputField";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Tooltip } from "@mui/material";

const ModificarAlumnos = () => {
    const [modalisopen, setModalIsOpen] = useState(false);
    const [alumno, setAlumno] = useState({
        nombre: "Alejandro",
        apellido: "Verteche",
        email: "",
        carrera: "Analista de Sistemas",
        usuario: "alee",
        dni: "45031132",
        contraseña: "",
    });
    const [carreras, setCarreras] = useState(["Analista de Sistemas", "Publicidad"]);
    const navigate = useNavigate();

    const open = () => setModalIsOpen(true);
    const close = () => setModalIsOpen(false);

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (!user || user !== "sandra2024") {
            navigate('/');
        }
    }, [navigate]);

    const resetContraseña = () => {
        setAlumno((prevAlumno) => ({
            ...prevAlumno,
            contraseña: prevAlumno.dni,
        }));
        alert('Contraseña restablecida a: ' + alumno.dni);
    };

    return (
        <div>
            <button className="rounded-lg p-2 bg-yellow-400 hover:bg-yellow-500" onClick={open}>
                <ModeEditIcon fontSize="medium" />
            </button>

            <Modal open={modalisopen} onClose={close}>
                <h1 className="text-2xl font-extrabold mb-6 text-center text-analista gap-5">Modificar Alumno</h1>
                <form>

                    {/* Campo Alumno - solo lectura */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista">Alumno:</label>
                        <p className="border p-2 bg-gray-100 rounded-lg">{alumno.apellido} {alumno.nombre}</p>
                    </div>

                    {/* Campo Usuario */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="usuario">Usuario:</label>
                        <InputField
                            id="usuario"
                            value={alumno.usuario}
                            placeholder=""
                            onChange={(e) => ({ ...alumno, usuario: e.target.value })}
                        />
                    </div>

                    {/* Campo Contraseña */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="contraseña">Contraseña:</label>
                        <div className="flex items-center">
                            <InputField
                                type="password"
                                id="contraseña"
                                value=""
                                placeholder=""
                                onChange={(e) => ({ ...alumno, contraseña: e.target.value })}
                            />
                            <Tooltip title="La contraseña por defecto es el DNI del usuario">
                                <HelpOutlineIcon className="ml-2 cursor-pointer text-analista" />
                            </Tooltip>
                        </div>
                        <button
                            type="button"
                            onClick={resetContraseña}
                            className="ml-12 analista-button text-white px-3 py-2 rounded-lg "
                        >
                            Restablecer
                        </button>
                    </div>

                    {/* Campo Apellido */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="apellido">Apellido:</label>
                        <InputField
                            id="apellido"
                            value=""
                            placeholder=""
                            onChange={(e) => ({ ...alumno, apellido: e.target.value })}
                        />
                    </div>

                    {/* Campo Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="email">Email:</label>
                        <InputField
                            id="email"
                            value=""
                            placeholder=""
                            onChange={(e) => ({ ...alumno, email: e.target.value })}
                        />
                    </div>

                    {/* Campo Select de Carreras */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="carrera">Carrera:</label>
                        <select
                            id="carrera"
                            value={alumno.carrera}
                            onChange={(e) => ({ ...alumno, carrera: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="" disabled>
                                Selecciona una carrera
                            </option>
                            {carreras.map((c, index) => (
                                <option key={index} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ModificarAlumnos;
