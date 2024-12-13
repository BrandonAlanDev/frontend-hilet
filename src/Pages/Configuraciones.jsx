import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Components/InputField';
import Navbar from '../Components/Navbar';
import Modal from '../Components/Modal';
import { UpdatePassword, UpdateCorreo } from '../Services/api';

const userRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{6,20}$/;
const passRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{8,20}$/;

const Configuraciones = () => {
    const [id, setId] = useState(null);
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [carrera, setCarrera] = useState('');
    const [userInput, setUserInput] = useState('');
    const [userErrorMessage, setUserErrorMessage] = useState('');
    const [passErrorMessage, setPassErrorMessage] = useState('');
    const [correoErrorMessage, setCorreoErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newCorreo, setNewCorreo] = useState('');
    const [confirmCorreo, setConfirmCorreo] = useState('');
    const [showModalPass, setShowModalPass] = useState(false);
    const [showModalCorreo, setShowModalCorreo] = useState(false);
    const [colorText, setColorText] = useState('');
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [fondoDegradado, setFondoDegradado] = useState('');
    const [boton, setBoton] = useState('');
    const [consultando, setConsultado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('user')) {
            navigate('/login');
        } else {
            setId(sessionStorage.getItem('id'));
            setUsuario(sessionStorage.getItem('user'));
            setNombre(sessionStorage.getItem('nombre'));
            setApellido(sessionStorage.getItem('apellido'));
            setCorreo(sessionStorage.getItem('correo'));
            setCarrera(sessionStorage.getItem('carrera'));
        }
    }, [navigate]);

    useEffect(() => {
        if (carrera === "Publicidad") {
            setColorText("text-publicidad");
            setFondoOpaco("bg-publicidad");
            setFondoDegradado("bg-hilet-publicidad");
            setBoton("publicidad-button");
        } else if (carrera === "Analista de sistemas" || carrera === "Administracion") {
            setColorText("text-analista");
            setFondoOpaco("bg-analista");
            setFondoDegradado("bg-hilet");
            setBoton("analista-button");
        } else {
            setColorText("text-otro");
            setFondoOpaco("bg-otro");
            setFondoDegradado("bg-hilet-otro");
            setBoton("otro-button");
        }
    }, [carrera]);

    const validateInput = (value, regex, setErrorMessage, errorMessage) => {
        if (regex.test(value)) {
            setErrorMessage('');
        } else {
            setErrorMessage(errorMessage);
        }
    };

        const handleChangeCorreo = async (e) => {
            e.preventDefault();
            if(!consultando){
                setConsultado(true);
                
                setPassErrorMessage('');
                setSuccessMessage('');
                
                if (!newCorreo || !confirmCorreo) {
                    setCorreoErrorMessage('Todos los campos son obligatorios.');
                    setConsultado(false);
                    return;
                }
                if (newCorreo.trim() !== confirmCorreo.trim()) {
                    setCorreoErrorMessage('Los correos ingresados no coinciden.');
                    setConsultado(false);
                    return;
                }
                
                const response = await UpdateCorreo(id, newCorreo);
                
                if (response.success) {
                    setSuccessMessage(response.message);
                    setCorreo(newCorreo);
                    sessionStorage.setItem('correo',newCorreo);
                    setNewCorreo('');
                    setConfirmCorreo('');
                    setShowModalCorreo(false);
                } else {
                    setCorreoErrorMessage(response.message);
                }
                setConsultado(false);
            }
        };      
        
        const handleChangePassword = async (e) => {
            e.preventDefault();
            if(!consultando){
                setConsultado(true);
                
                setPassErrorMessage('');
                setSuccessMessage('');
                
                if (!newPassword || !confirmPassword) {
                    setPassErrorMessage('Todos los campos son obligatorios.');
                    setConsultado(false);
                    return;
                }
                if (newPassword !== confirmPassword) {
                    setPassErrorMessage('Las contraseñas no coinciden.');
                    setConsultado(false);
                    return;
                }
                if (!passRegex.test(newPassword)) {
                    setPassErrorMessage(
                        'La contraseña debe contener entre 8 y 20 caracteres permitidos (Letras, Números, - _ @ .)'
                    );
                    setConsultado(false);
                    return;
                }
                
                const response = await UpdatePassword(id, newPassword);
                
                if (response.success) {
                    setSuccessMessage(response.message);
                    setNewPassword('');
                    setConfirmPassword('');
                    setShowModalPass(false);
                } else {
                    setPassErrorMessage(response.message);
                }
                setConsultado(false);
            }
        };        

    return (
        <>
            <div>
                <Navbar nombre={nombre+' '+apellido} carrera={carrera} />
                <div className={`"min-h-screen max-w-[100vw] flex items-center justify-evenly ${fondoDegradado} md:py-32 gap-8`}>
                    <div className="bg-blanco p-3 md:p-5 rounded-lg flex flex-col w-[100vw] max-w-full md:w-3/5 lg:flex-row items-center lg:space-x-8 h-[100vh] md:h-[75vh] lg:min-h-[65vh] shadow-2xl shadow-black">
                        <div className=" flex flex-col m-auto justify-between items-center activo w-full">
                            <h1 className={`text-2xl font-bold mt-3 mb-3 md:mt-0 md:mb-6 text-center ${colorText} titulo`}>Configuraciones</h1>
                            <div className="flex flex-col justify-between items-center w-full  space-y-3">
                                <hr className="my-4 border-t-2 border-gray-400 w-full" />
                                <div className='flex flex-row justify-around items-center w-full m-0 p-0 gap-0'>
                                    <h2 className={colorText}><strong>Nombre</strong></h2>
                                    <InputField
                                        id="nombre"
                                        label="nombre"
                                        type="text"
                                        placeholder=""
                                        value={nombre}
                                        ancho="w-[230px] lg:w-[275px]  "
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-row justify-around items-center w-full'>
                                    <h2 className={colorText}><strong>Apellido</strong></h2>
                                    <InputField
                                        id="apellido"
                                        label="apellido"
                                        type="text"
                                        placeholder=""
                                        value={apellido}
                                        ancho="w-[230px] lg:w-[275px] "
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-row justify-around items-center w-full'>
                                    <h2 className={colorText}><strong>Usuario</strong></h2>
                                    <InputField
                                        id="usuario"
                                        label="usuario"
                                        type="text"
                                        placeholder=""
                                        value={usuario}
                                        ancho="w-[230px] lg:w-[275px] "
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-row justify-around items-center w-full'>
                                    <h2 className={colorText}><strong>Correo</strong></h2>
                                    <InputField
                                        id="correo"
                                        label="correo"
                                        type="text"
                                        placeholder=""
                                        value={correo}
                                        ancho="w-[230px] lg:w-[275px] "
                                        disabled
                                    />
                                </div>
                                <br />
                                <hr className="my-4 border-t-2 border-gray-400 w-full" />
                                <div className="flex flex-col md:flex-row items-center justify-center w-full gap-5">
                                    <button
                                        className={`${boton} px-4 py-2 rounded-full select-none text-white w-48 whitespace-nowrap`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowModalPass(true);
                                        }}
                                    >
                                        <strong>Cambiar contraseña</strong>
                                    </button>
                                    <button
                                        className={`${boton} px-4 py-2 rounded-full select-none text-white w-48 whitespace-nowrap`}
                                        id='btnCorreo'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowModalCorreo(true);
                                        }}
                                    >
                                        <strong>Cambiar correo</strong>
                                    </button>
                                </div>

                                <Modal open={showModalPass} onClose={() => setShowModalPass(false)} onClick={handleChangePassword}>
                                    <h2 className={`text-2xl font-bold mb-4 ${colorText}`}>Cambiar Contraseña</h2>
                                    <div className="mb-4">
                                        <label className={`block text-sm font-bold ${colorText}`}>Contraseña nueva</label>
                                        <InputField
                                            id="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className={`block text-sm font-bold ${colorText}`}>Contraseña nueva (repetir)</label>
                                        <InputField
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    {passErrorMessage && (
                                        <p className="text-red-500 text-sm">{passErrorMessage}</p>
                                    )}
                                </Modal>

                                <Modal open={showModalCorreo} onClose={() => setShowModalCorreo(false)} onClick={handleChangeCorreo}>
                                    <h2 className={`text-2xl font-bold mb-4 ${colorText}`}>Cambiar Correo</h2>
                                    <div className="mb-4">
                                        <label className={`block text-sm font-bold ${colorText}`}>Correo nuevo</label>
                                        <InputField
                                            id="newCorreo"
                                            type="email"
                                            value={newCorreo}
                                            onChange={(e) => setNewCorreo(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className={`block text-sm font-bold ${colorText}`}>Correo nuevo (repetir)</label>
                                        <InputField
                                            id="confirmCorreo"
                                            type="email"
                                            value={confirmCorreo}
                                            onChange={(e) => setConfirmCorreo(e.target.value)}
                                        />
                                    </div>
                                    {correoErrorMessage && (
                                        <p className="text-red-500 text-sm">{correoErrorMessage}</p>
                                    )}
                                </Modal>

                                {successMessage && (
                                    <p className="text-green-500 font-bold mb-4">{successMessage}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
export default Configuraciones;