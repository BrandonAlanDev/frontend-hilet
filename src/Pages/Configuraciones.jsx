import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Components/InputField';
import Navbar from '../Components/Navbar';
import Modal from '../Components/Modal';
const Configuraciones = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [user, setUsuario] = useState('');
    const [carrera, setCarrera] = useState('');
    const [colorText, setColorText] = useState('');
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [fondoDegradado, setFondoDegradado] = useState('');
    const [userInput, setUserInput] = useState('');
    const [userErrorMessage, setUserErrorMessage] = useState('');
    const [passErrorMessage, setPassErrorMessage] = useState('');
    const navigate = useNavigate();

    const userRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{1,20}$/;
    const passRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{1,20}$/;

    const usuarios = [
        { nombre: "Ramiro", apellido: "Sansinanea", usuario: "rama2024", correo: "rama2024@gmail.com", carrera: "Analista de Sistemas" },
        { nombre: "Juan", apellido: "Pérez", usuario: "juanperez", correo: "juanperez@gmail.com", carrera: "Publicidad" },
        { nombre: "Sandra", apellido: "Becerra", usuario: "sandra2024", correo: "sandra2024@gmail.com", carrera: "Administración" }
    ];

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        const apellido = sessionStorage.getItem('apellido');
        const correo = sessionStorage.getItem('correo');
        const usuario = sessionStorage.getItem('usuario');
        if (!user) {
            navigate('/login');
        } else {
            const usuarioData = usuarios.find(u => u.usuario === user);
            if (usuarioData) {
                setNombre(usuarioData.nombre);
                setApellido(usuarioData.apellido);
                setUsuario(usuarioData.usuario);
                setCorreo(usuarioData.correo);
                setCarrera(usuarioData.carrera);
            }
        }
    }, [navigate]);

    useEffect(() => {
        if (user === "rama2024") {
            setCarrera("Analista de Sistemas");
        } else if (user === "juanperez") {
            setCarrera("Publicidad");
        } else if (user === "sandra2024") {
            setCarrera("Administración");
        } else {
            setCarrera("Yoga de gluteos");
        }
    }, [user]);

    useEffect(() => {
        if (carrera === "Publicidad") {
            setColorText("text-publicidad");
            setFondoOpaco("bg-publicidad");
            setFondoDegradado("bg-hilet-publicidad");
            // setBoton("publicidad-button");
            // setColorBorde("border-publicidad");
        } else if (carrera === "Analista de Sistemas" || carrera === "Administración") {
            setColorText("text-analista");
            setFondoOpaco("bg-analista");
            setFondoDegradado("bg-hilet");
            // setBoton("analista-button");
            // setColorBorde("border-analista");
        }
        else {
            setColorText("text-otro");
            setFondoOpaco("bg-otro");
            setFondoDegradado("bg-hilet-otro");
            // setBoton("otro-button");
            // setColorBorde("border-otro");
        }
    }, [carrera]);

    const validateInput = (value, regex, setErrorMessage, errorMessage) => {
        if (regex.test(value)) {
            setErrorMessage('');
        } else {
            setErrorMessage(errorMessage);
        }
    };

    const handleInputChangeUsuario = (e) => {
        const value = e.target.value;
        setUserInput(value);
        validateInput(
            value,
            userRegex,
            setUserErrorMessage,
            'El usuario debe contener entre 6 y 20 caracteres permitidos (Letras, Números, - _ @ .)'
        );
    };

    const handleInputChangePassword = (e) => {
        const value = e.target.value;
        setPassInput(value);
        validateInput(
            value,
            passRegex,
            setPassErrorMessage,
            'La contraseña debe contener entre 6 y 20 caracteres permitidos (Letras, Números, - _ @ .)'
        );
    };

    return (
        <>
            <div>
                <Navbar nombre={user} carrera={carrera} />
                <div className="min-h-screen flex items-center justify-evenly bg-hilet py-20 lg:py-32 gap-8">
                    <div className="bg-blanco p-8 rounded-lg w-11/12 sm:w-3/4 lg:w-3/5 flex flex-col lg:flex-row items-center lg:space-x-8 min-h-[65vh] shadow-2xl shadow-black">
                        <div className="lg:w-1/2 flex flex-col m-auto justify-between items-center activo">
                            <h1 className="text-2xl font-bold mb-6 text-center text-analista titulo">Configuraciones</h1>
                            <form method="POST" className="flex flex-col justify-between items-center w-full  space-y-3">
                                <hr className="my-4 border-t-2 border-gray-400 w-full" />
                                <div className='grid gap-x-0 grid-cols-2'>
                                    <h2 className='text-analista'><strong>Nombre</strong></h2>
                                    <InputField
                                        id="nombre"
                                        label="nombre"
                                        type="text"
                                        placeholder=""
                                        value={nombre}
                                        ancho="w-[250px] lg:w-[14vw]"
                                        disabled
                                    />
                                </div>
                                <div className='grid gap-x-0 grid-cols-2'>
                                    <h2 className='text-analista'><strong>Apellido</strong></h2>
                                    <InputField
                                        id="apellido"
                                        label="apellido"
                                        type="text"
                                        placeholder=""
                                        value={apellido}
                                        ancho="w-[250px] lg:w-[14vw]"
                                        disabled
                                    />
                                </div>
                                <div className='grid gap-x-0 grid-cols-2'>
                                    <h2 className='text-analista'><strong>Usuario</strong></h2>
                                    <InputField
                                        id="usuario"
                                        label="usuario"
                                        type="text"
                                        placeholder={user}
                                        value={userInput}
                                        onChange={handleInputChangeUsuario}
                                        errorMessage={passErrorMessage}
                                        ancho="w-[250px] lg:w-[14vw]"
                                    />
                                </div>
                                <div className='grid gap-x-0 grid-cols-2'>
                                    <h2 className='text-analista'><strong>Correo</strong></h2>
                                    <InputField
                                        id="correo"
                                        label="correo"
                                        type="text"
                                        placeholder=""
                                        value={correo}
                                        ancho="w-[250px] lg:w-[14vw]"
                                        disabled
                                    />
                                </div>
                                <hr className="my-4 border-t-2 border-gray-400 w-full" />
                                <div className="flex flex-row items-center justify-center w-full space-x-4"> 
                                    <button
                                        className="analista-button px-4 py-2 rounded-full select-none text-white w-48 whitespace-nowrap" 
                                        onClick={() => setShowModal(true)}
                                    >
                                        <strong>Cambiar contraseña</strong>
                                    </button>
                                    <button
                                        className="analista-button px-4 py-2 rounded-full select-none text-white w-48 whitespace-nowrap"
                                        onClick={() => setShowModal(true)}
                                    >
                                        <strong>Cambiar correo</strong>
                                    </button>
                                </div>
                                <hr className="my-4 border-t-2 border-gray-400 w-full" />
                                <br />
                                <div className="flex flex-col items-center w-full">
                                    <button
                                        type="submit"
                                        className="analista-button font-bold py-2 px-4 rounded-full w-full max-w-xs focus:outline-none focus:shadow-outline mb-4"
                                    >
                                        Guardar cambios
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Configuraciones;
