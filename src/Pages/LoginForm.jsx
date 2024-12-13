import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Asegúrate de importar jwtDecode correctamente
import logoHilet from '../Assets/Image/HiletWEBP.webp';
import logoUsuario from '../Assets/Image/user.png';
import logoPassword from '../Assets/Image/password.png';
import InputField from '../Components/InputField';
import { POST } from '../Services/fetch';

const LoginForm = () => {
    const [userInput, setUserInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [userErrorMessage, setUserErrorMessage] = useState('');
    const [passErrorMessage, setPassErrorMessage] = useState('');
    const navigate = useNavigate();

    const userRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{1,20}$/;
    const passRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{1,20}$/;

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

    const Log = async (e) => {
        e.preventDefault();

        let valid = true;

        if (!userRegex.test(userInput)) {
            setUserErrorMessage(
                'El usuario debe contener entre 6 y 20 caracteres permitidos (Letras, Números, - _ @ .)'
            );
            valid = false;
        } else {
            setUserErrorMessage('');
        }

        if (!passRegex.test(passInput)) {
            setPassErrorMessage(
                'La contraseña debe contener entre 6 y 20 caracteres permitidos (Letras, Números, - _ @ .)'
            );
            valid = false;
        } else {
            setPassErrorMessage('');
        }

        if (!valid) return;

        try {
            const response = await POST('AuthController/Login', { dni: userInput, password: passInput });

            if (response && response.message === 'JWT Creado') {
                const token = response.data;
                sessionStorage.setItem('jwtToken', token);

                const decoded = jwtDecode(token);  // Usar jwtDecode aquí
                sessionStorage.setItem('id', decoded.id);
                sessionStorage.setItem('user', decoded.usuario);
                sessionStorage.setItem('nombre', decoded.nombre);
                sessionStorage.setItem('apellido', decoded.apellido);
                sessionStorage.setItem('carrera', decoded.carrera);
                sessionStorage.setItem('resolucion', decoded.resolucion);
                sessionStorage.setItem('correo', decoded.correo);
                sessionStorage.setItem('tipo_usuario', decoded.tipo_usuario);

                // Deja lo de carreras que agrega "Analista de sistemas" y "Publicidad"
                let carreras = ["Analista de sistemas", "Publicidad"];
                sessionStorage.setItem('carreras', JSON.stringify(carreras));

                navigate('/inicio'); // Redirige a la página de índice
            } else {
                setPassErrorMessage('Error de autenticación');
            }
        } catch (error) {
            console.error('Error en la solicitud: ', error.message);
            setPassErrorMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen select-none flex items-center justify-evenly bg-hilet py-20 lg:py-32">
            <div className="bg-blanco p-8 rounded-lg w-11/12 sm:w-3/4 lg:w-3/5 flex flex-col lg:flex-row items-center lg:space-x-8 min-h-[65vh] shadow-2xl shadow-black">
                <div className="w-2/3 lg:w-1/2 aspect-square flex justify-center lg:justify-center m-auto bg-figuras activo">
                    <div className="rounded-full w-2/3 aspect-square flex justify-center lg:justify-center m-auto bg-analista border-blanco p-8">
                        <img src={logoHilet} alt="Logo Hilet" className="m-auto"/>
                    </div>
                </div>
                <div className="lg:w-1/2 flex flex-col m-auto justify-between items-center activo">
                    <h1 className="text-2xl font-bold mb-6 text-center text-analista titulo">Finales HILET</h1>
                    <form method="POST" className="flex flex-col justify-between items-center w-full max-w-xs gap-5">
                        <InputField
                            id="user"
                            label="Usuario"
                            type="text"
                            placeholder="Usuario"
                            value={userInput}
                            onChange={handleInputChangeUsuario}
                            errorMessage={userErrorMessage}
                            icon={logoUsuario}
                        />
                        <InputField
                            id="password"
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            value={passInput}
                            onChange={handleInputChangePassword}
                            errorMessage={passErrorMessage}
                            icon={logoPassword}
                        />
                        <div className="flex flex-col items-center w-full">
                            <button
                                type="submit"
                                className="analista-button font-bold py-2 px-4 rounded-full w-full max-w-xs focus:outline-none focus:shadow-outline mb-4"
                                onClick={Log}
                            >
                                Login
                            </button>
                            <a
                                href="/sendcode"
                                className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-700"
                            >
                                ¿Has olvidado tu contraseña?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
