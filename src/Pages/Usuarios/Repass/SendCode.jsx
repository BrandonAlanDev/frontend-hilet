import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUsuario from '../../../Assets/Image/user.png';
import logoEmail from '../../../Assets/Image/email.webp';
import { Link } from 'react-router-dom';

const SendCode = () => {
    const [selection, setSelection] = useState('email'); // Selección entre usuario o email
    const [inputValue, setInputValue] = useState(''); // Valor del input (email o usuario)
    const [userValue, setUserValue] = useState(''); // Usuario o email encontrado
    const [codigo, setCodigo] = useState('');
    const [codigoEnviado, setCodigoEnviado] = useState('');
    const [contador, setContador] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [emailMascara, setEmailMascara] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (contador > 0) {
            const timer = setTimeout(() => setContador(contador - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [contador]);

    const enviarCodigo = () => {
        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
        setCodigoEnviado(generatedCode);
        console.log("Código enviado: ", generatedCode); // Mostrar en consola
        setContador(60); // Contador de 60 segundos
    };

    const mostrarEmailMascara = (email) => {
        const [localPart, domain] = email.split('@');
        const visiblePart = localPart.slice(0, 2);
        return `${visiblePart}******@${domain}`;
    };

    const handleSelectionChange = (e) => {
        setSelection(e.target.value);
        setInputValue('');
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUsers = JSON.parse(sessionStorage.getItem('users') || '{}');
    
        // Buscar usuario o email
        const userFound = Object.keys(storedUsers).find(key => {
            return (
                (selection === 'email' && storedUsers[key].email === inputValue) ||
                (selection === 'username' && key === inputValue)
            );
        });
    
        if (userFound) {
            setUserValue(userFound);
            setEmailMascara(mostrarEmailMascara(storedUsers[userFound].email));
            enviarCodigo(); // Llama a la función para enviar el código
    
            // Muestra el mensaje de que se envió el código
            setErrorMessage(selection === 'email' ? `Código enviado a: ${mostrarEmailMascara(storedUsers[userFound].email)}` : '');
        } else {
            setErrorMessage('Usuario o correo no encontrado');
        }
    };

    const manejarAceptar = () => {
        const storedUsers = JSON.parse(sessionStorage.getItem('users') || '{}');
    
        const userFound = Object.keys(storedUsers).find(key => {
            return (
                (selection === 'email' && storedUsers[key].email === inputValue) ||
                (selection === 'username' && key === inputValue)
            );
        });
    
        if (codigo === codigoEnviado) {
            if (userFound) {
                navigate('/repass', { state: { email: storedUsers[userFound].email } });
            } else {
                alert('No se encontró el usuario.');
            }
        } else {
            alert('Código incorrecto');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-evenly bg-hilet py-20 lg:py-32">
            <div className="bg-blanco p-4 rounded-lg w-11/12 sm:w-3/4 lg:w-2/5 flex flex-col lg:flex-row items-center lg:space-x-8 min-h-[55vh] shadow-2xl shadow-black">
                <div className="flex flex-col m-auto justify-between items-center activo">
                    <h1 className="select-none text-2xl font-bold mb-12 text-center text-analista titulo">Cambio de contraseña</h1>
                    
                    {/* Selector para elegir entre usuario o email */}
                    <div className="flex items-center mb-6">
                        <label className={`select-none flex items-center cursor-pointer rounded-full p-2 mx-2 w-32 text-lg text-center ${selection === 'email' ? 'bg-white text-analista' : 'bg-analista text-white'} transition duration-200`}>
                            <input
                                type="radio"
                                value="email"
                                checked={selection === 'email'}
                                onChange={handleSelectionChange}
                                className="text-center"
                                hidden // Oculta el radio original
                            />
                            <strong>
                            Email
                            </strong>
                        </label>
                        <label className={`select-none flex items-center cursor-pointer rounded-full p-2 mx-2 w-32 text-lg text-center ${selection === 'username' ? 'bg-white text-analista' : 'bg-analista text-white'} transition duration-200`}>
                            <input
                                type="radio"
                                value="username"
                                checked={selection === 'username'}
                                onChange={handleSelectionChange}
                                className="text-center"
                                hidden // Oculta el radio original
                            />
                            <strong>
                            Usuario
                            </strong>
                        </label>
                    </div>

                    {/* Input para email o usuario */}
                    <label className="mb-4 w-full rounded-full border-analista bg-white p-2 flex input text-left">
                        <img
                            src={selection === 'email' ? logoEmail : logoUsuario}
                            alt="Icono"
                            className="w-6 h-6 aspect-square rounded-full mr-2"
                        />
                        <input
                            type="text"
                            placeholder={selection === 'email' ? 'Ingrese su email' : 'Ingrese su usuario'}
                            value={inputValue}
                            onChange={handleInputChange}
                            className="flex-1 appearance-none border-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 leading-tight placeholder-analista negrita"
                        />
                    </label>

                    {/* Mensaje de error */}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    {/* Si se envía el código y es email, mostrar email enmascarado */}
                    {emailMascara && <p className="mb-4 text-lg select-none"><strong>Email: {emailMascara}</strong></p>}

                    {/* Input para el código y botón de enviar */}
                    <div className="flex flex-col lg:flex-row w-full items-center gap-2">
                        <label className="w-full rounded-full border-analista bg-white p-2 flex input text-left">
                            <input
                                type="text"
                                placeholder="Código"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                className="max-w-xs flex-1 appearance-none border-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 leading-tight placeholder-analista placeholder-opacity-100 negrita"
                            />
                        </label>
                        <button
                            onClick={handleSubmit}
                            disabled={contador > 0}
                            className="ml-2 analista-button font-bold py-2 px-4 rounded-full w-full max-w-xs focus:outline-none focus:shadow-outline"
                        >
                            {contador > 0 ? `Reenviar en ${contador}s` : 'Enviar código'}
                        </button>
                    </div>

                    {/* Botón de aceptar */}
                    <div className="flex flex-col items-center w-full">
                        <button
                            onClick={manejarAceptar}
                            className="mt-4 analista-button font-bold py-2 px-4 rounded-full w-full max-w-xs focus:outline-none focus:shadow-outline mb-4"
                        >
                            Aceptar
                        </button>
                        <Link
                            className="mt-2 analista-button font-bold py-2 px-4 rounded-full w-full max-w-xs focus:outline-none focus:shadow-outline mb-4 text-center"
                            to="/">
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendCode;
