import { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import InputField from "../Components/InputField"; // Componente de entrada reutilizable
import { useNavigate } from "react-router-dom";

const ModificarAlumnos = () => {
    const [modalisopen, setModalIsOpen] = useState(false);
    const [alumno, setAlumno] = useState({
        nombre: "",
        apellido: "",
        email: "",
        carrera: "",
        usuario: "alee",
        dni: "",
        contraseña: "",
    });
    const [carreras, setCarreras] = useState([]);
    const navigate = useNavigate();

    const open = () => setModalIsOpen(true);
    const close = () => setModalIsOpen(false);

    useEffect(() => {
        // Autocargar datos de alumno y usuario desde localStorage
        const alumnoStored = JSON.parse(localStorage.getItem('alumno')) || {};
        const usuarioStored = localStorage.getItem('usuario') || "";
        const storedCarreras = JSON.parse(localStorage.getItem('carreras')) || [];

        setAlumno((prevAlumno) => ({
            ...prevAlumno,
            ...alumnoStored,
            usuario: usuarioStored,
        }));

        setCarreras(storedCarreras);

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
            <button onClick={open}>
                Abrir modal
            </button>

            <Modal open={modalisopen} onClose={close}>
                <h1 className="text-2xl font-bold mb-6 text-center gap-5">Modificar Alumno</h1>
                <form>
    
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Alumno:</label>
                        <p className="border p-2 bg-gray-100 rounded">{alumno.nombre}</p>
                    </div>

                    <div className="mb-4">
                        <InputField
                            id="usuario"
                            label="Usuario"
                            value={alumno.usuario}
                            placeholder=""
                            onChange={(e) => {
                                setAlumno((prevAlumno) => ({
                                    ...prevAlumno,
                                    usuario: e.target.value,
                                }));
                            }}
                        />
                    </div>

                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Contraseña:</label>
                        <div className="flex items-center">
                            <input
                                type="password"
                                value={alumno.contraseña}
                                onChange={(e) => {
                                    setAlumno((prevAlumno) => ({
                                        ...prevAlumno,
                                        contraseña: e.target.value,
                                    }));
                                }}
                                className="flex-1 px-3 py-2 border rounded"
                            />
                            <button
                                type="button"
                                onClick={resetContraseña}
                                className="ml-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                            >
                                Restablecer
                            </button>
                        </div>
                    </div>

                   
                    <InputField
                        id="apellido"
                        label="Apellido"
                        value={alumno.apellido}
                        placeholder="Ingresa el apellido"
                        onChange={(e) => {
                            setAlumno((prevAlumno) => ({
                                ...prevAlumno,
                                apellido: e.target.value,
                            }));
                        }}
                    />

                    
                    <InputField
                        id="email"
                        label="Email"
                        value={alumno.email}
                        placeholder="Ingresa el email"
                        onChange={(e) => {
                            setAlumno((prevAlumno) => ({
                                ...prevAlumno,
                                email: e.target.value,
                            }));
                        }}
                    />

                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Carrera:</label>
                        <select
                            value={alumno.carrera}
                            onChange={(e) => {
                                setAlumno((prevAlumno) => ({
                                    ...prevAlumno,
                                    carrera: e.target.value,
                                }));
                            }}
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
