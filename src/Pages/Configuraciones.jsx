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
    const [colorBoton, setBoton] = useState('');
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [fondoDegradado, setFondoDegradado] = useState('');
    const [userInput, setUserInput] = useState('');
    const [userErrorMessage, setUserErrorMessage] = useState('');
    const [passErrorMessage, setPassErrorMessage] = useState('');

    const [showModalPass, setShowModalPass] = useState(false);
    const [showModalCorreo, setShowModalCorreo] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentCorreo, setCurrentCorreo] = useState('');
    const [newCorreo, setNewCorreo] = useState('');
    const [confirmCorreo, setConfirmCorreo] = useState('');

    const navigate = useNavigate();

    const userRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{6,20}$/;
    const passRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{8,20}$/;

    const usuarios = [
        { nombre: "Ramiro", apellido: "Sansinanea", usuario: "rama2024", correo: "rama2024@gmail.com", carrera: "Analista de Sistemas" },
        { nombre: "Juan", apellido: "Pérez", usuario: "juanperez", correo: "juanperez@gmail.com", carrera: "Publicidad" },
        { nombre: "Sandra", apellido: "Becerra", usuario: "sandra2024", correo: "sandra2024@gmail.com", carrera: "Administración" },
        { nombre: "Luciano", apellido: "Celes", usuario: "luchito", correo: "luchito@gmail.com", carrera: "Yoga de gluteos" }
    ];

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        /*const apellido = sessionStorage.getItem('apellido');
        const correo = sessionStorage.getItem('correo');
        const usuario = sessionStorage.getItem('usuario');*/
        const storedPassword = sessionStorage.getItem('password');
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
            setBoton("publicidad-button");
            // setColorBorde("border-publicidad");
        } else if (carrera === "Analista de Sistemas" || carrera === "Administración") {
            setColorText("text-analista");
            setFondoOpaco("bg-analista");
            setFondoDegradado("bg-hilet");
            setBoton("analista-button");
            // setColorBorde("border-analista");
        }
        else {
            setColorText("text-otro");
            setFondoOpaco("bg-otro");
            setFondoDegradado("bg-hilet-otro");
            setBoton("otro-button");
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

    const handleChangePassword = (e) => {
        e.preventDefault();
        const storedPassword = sessionStorage.getItem('password');
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPassErrorMessage('Todos los campos son obligatorios.');
            return;
        }
        if (currentPassword !== storedPassword) {
            setPasswordErrorMessage('La contraseña actual es incorrecta.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordErrorMessage('Las contraseñas ingresadas no coinciden.');
            return;
        }
        sessionStorage.setItem('password', newPassword);
        setShowModalPass(false);
    };
    const handleGuardarCambios = (e) => {
        e.preventDefault();
        if (userInput.trim() === '') {
            alert('El nombre de usuario no puede estar vacío.');
            return; 
        }
        if (userErrorMessage === '') {
            sessionStorage.setItem('usuario', userInput);
            setUsuario(userInput);
        } else {
            alert('Corrige los errores antes de guardar.');
        }
    };

    return (
        <>
            <div>
                <Navbar nombre={user} carrera={carrera} />
                <div className={`"min-h-screen flex items-center justify-evenly ${fondoDegradado} py-20 lg:py-32 gap-8`}>
                    <div className="bg-blanco p-8 rounded-lg w-11/12 sm:w-3/4 lg:w-3/5 flex flex-col lg:flex-row items-center lg:space-x-8 min-h-[65vh] shadow-2xl shadow-black">
                        <div className="lg:w-1/2 flex flex-col m-auto justify-between items-center activo">
                            <h1 className={`text-2xl font-bold mb-6 text-center ${colorText} titulo`}>Configuraciones</h1>
                            <form method="POST" className="flex flex-col justify-between items-center w-full  space-y-3" onSubmit={handleGuardarCambios}>
                                <hr className="my-4 border-t-2 border-gray-400 w-full" />
                                <div className='grid gap-x-0 grid-cols-2'>
                                    <h2 className={colorText}><strong>Nombre</strong></h2>
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
                                    <h2 className={colorText}><strong>Apellido</strong></h2>
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
                                    <h2 className={colorText}><strong>Usuario</strong></h2>
                                    {carrera === "Administración" ? (
                                        <InputField
                                            id="usuario"
                                            label="usuario"
                                            type="text"
                                            placeholder={user}
                                            value={userInput}
                                            onChange={handleInputChangeUsuario}
                                            errorMessage={userErrorMessage}
                                            ancho="w-[250px] lg:w-[14vw]"
                                        />
                                    ) : (
                                        <InputField
                                            id="usuario"
                                            label="usuario"
                                            type="text"
                                            placeholder=""
                                            value={user}
                                            ancho="w-[250px] lg:w-[14vw]"
                                            disabled
                                        />
                                    )}
                                </div>
                                <div className='grid gap-x-0 grid-cols-2'>
                                    <h2 className={colorText}><strong>Correo</strong></h2>
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
                                        className={`${colorBoton} px-4 py-2 rounded-full select-none text-white w-48 whitespace-nowrap`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowModalPass(true);
                                        }}
                                    >
                                        <strong>Cambiar contraseña</strong>
                                    </button>
                                    <button
                                        className={`${colorBoton} px-4 py-2 rounded-full select-none text-white w-48 whitespace-nowrap`}
                                        id='btnCorreo'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowModalCorreo(true);
                                        }}
                                    >
                                        <strong>Cambiar correo</strong>
                                    </button>
                                </div>
                                {/* Modal para cambiar contraseña */}
                                <Modal open={showModalPass} onClose={() => setShowModalPass(false)} onClick={handleChangePassword}>
                                    <h2 className={`text-2xl font-bold mb-4 ${{ colorText }}`}>Cambiar Contraseña</h2>
                                    <div className="mb-4">
                                        <label className={`block text-sm font-bold ${{ colorText }}`}>Contraseña actual</label>
                                        <InputField
                                            id="currentPassword"
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className={`block text-sm font-bold ${{ colorText }}`}>Contraseña nueva</label>
                                        <InputField
                                            id="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className={`block text-sm font-bold ${{ colorText }}`}>Contraseña nueva (repetir)</label>
                                        <InputField
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </Modal>

                                {/* Modal para cambiar correo */}
                                <Modal open={showModalCorreo} onClose={() => setShowModalCorreo(false)}>
                                    <h2 className={`text-2xl font-bold mb-4 ${{ colorText }}`}>Cambiar Correo</h2>
                                    <div className="mb-4">
                                        <label className={`block text-sm font-bold ${{ colorText }}`}>Correo actual</label>
                                        <InputField
                                            id="currentCorreo"
                                            type="email"
                                            value={currentCorreo}
                                            onChange={(e) => setCurrentCorreo(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className={`block text-sm font-bold ${{ colorText }}`}>Correo nuevo</label>
                                        <InputField
                                            id="newCorreo"
                                            type="email"
                                            value={newCorreo}
                                            onChange={(e) => setNewCorreo(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className={`block text-sm font-bold ${{ colorText }}`}>Correo nuevo (repetir)</label>
                                        <InputField
                                            id="confirmCorreo"
                                            type="email"
                                            value={confirmCorreo}
                                            onChange={(e) => setConfirmCorreo(e.target.value)}
                                        />
                                    </div>
                                </Modal>
                                <hr className="my-4 border-t-2 border-gray-400 w-full" />
                                <br />
                                {carrera === "Administración" && (
                                    <div className="flex flex-col items-center w-full">
                                        <button
                                            type="submit"
                                            className={`${colorBoton} font-bold py-2 px-4 rounded-full w-full max-w-xs focus:outline-none focus:shadow-outline mb-4`}
                                            onClick={handleGuardarCambios}
                                        >
                                            Guardar cambios
                                        </button>

                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Configuraciones;
