import { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import InputField from "../Components/InputField";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Tooltip } from "@mui/material";

const ModificarAlumnos = () => {
    const [modalisopen, setModalIsOpen] = useState(false);
    const [nombre, setNombre] = useState("");
    const [alumno, setAlumno] = useState({
        nombre: "Alejandro",
        apellido: "Verteche",
        email: "alejandroverteche@gmail.com",
        carrera: "Analista de Sistemas",
        usuario: "alee",
        dni: "45031132",
        contraseña: "",
    });
    const [carrera, setCarrera] = useState("");
    const [carreras, setCarreras] = useState(["Analista de Sistemas", "Publicidad"]);
    const navigate = useNavigate();

    const open = () => setModalIsOpen(true);
    const close = () => setModalIsOpen(false);

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

    const resetContraseña = () => {
        setAlumno((prevAlumno) => ({
            ...prevAlumno,
            contraseña: prevAlumno.dni,
        }));
        alert('Contraseña restablecida a: ' + alumno.dni);
    };

    const modificarAlumno = () => {
        sessionStorage.setItem("alumnos", JSON.stringify(alumno));
        alert('Datos del alumno actualizados');
        setModalIsOpen(false);
    }

    return (
        <div>
            <button className="rounded-lg p-2 bg-yellow-400 hover:bg-yellow-500" onClick={open}>
                <ModeEditIcon fontSize="medium" />
            </button>

            <Modal open={modalisopen} onClose={close} onClick={modificarAlumno}>
                <h1 className="text-2xl font-extrabold mb-6 text-center text-analista">Modificar Alumno</h1>
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
                            onChange={(e) => setAlumno({ ...alumno, usuario: e.target.value })}
                        />
                    </div>

                    {/* Campo Contraseña */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="contraseña">Contraseña:</label>
                        <div className="flex items-center">
                            <InputField
                                type="password"
                                id="contraseña"
                                value={alumno.contraseña}
                                placeholder=""
                                onChange={(e) => setAlumno({ ...alumno, contraseña: e.target.value })}
                            />
                            <Tooltip title="La contraseña por defecto es el DNI del usuario">
                                <HelpOutlineIcon className="ml-2 cursor-pointer text-analista" />
                            </Tooltip>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={resetContraseña}
                                className="analista-button text-white px-3 py-2 rounded-lg "
                            >
                                Restablecer
                            </button>
                        </div>
                    </div>

                    {/* Campo Nombre */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="nombre">Nombre:</label>
                        <InputField
                            id="nombre"
                            value={alumno.nombre}
                            placeholder=""
                            onChange={(e) => setAlumno({ ...alumno, nombre: e.target.value })}
                        />
                    </div>

                    {/* Campo Apellido */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="apellido">Apellido:</label>
                        <InputField
                            id="apellido"
                            value={alumno.apellido}
                            placeholder=""
                            onChange={(e) => setAlumno({ ...alumno, apellido: e.target.value })}
                        />
                    </div>

                    {/* Campo Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="email">Email:</label>
                        <InputField
                            id="email"
                            value={alumno.email}
                            placeholder=""
                            onChange={(e) => setAlumno({ ...alumno, email: e.target.value })}
                        />
                    </div>

                    {/* Campo Select de Carreras */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-analista" htmlFor="carrera">Carrera:</label>
                        <select
                            id="carrera"
                            value={alumno.carrera}
                            onChange={(e) => setAlumno({ ...alumno, carrera: e.target.value })}
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
