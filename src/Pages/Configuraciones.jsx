import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoHilet from '../Assets/Image/HiletWEBP.webp';
import logoUsuario from '../Assets/Image/user.png';
import logoPassword from '../Assets/Image/password.png';
import InputField from '../Components/InputField';

const Configuraciones = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [colorText, setColorText] = useState('');
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [fondoDegradado, setFondoDegradado] = useState('');
    const [userInput, setUserInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [userErrorMessage, setUserErrorMessage] = useState('');
    const [passErrorMessage, setPassErrorMessage] = useState('');
    const navigate = useNavigate();

    const userRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{1,20}$/;
    const passRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{1,20}$/;



    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (!user) {
            navigate('/login'); 
        } else {
            setNombre(user);
        }
    }, [navigate]);

    useEffect(() => {
        if (nombre === "rama2024") {
            setCarrera("Analista de Sistemas");
        } else if (nombre === "juanperez") {
            setCarrera("Publicidad");
        } else if (nombre === "sandra2024") {
            setCarrera("Administración");
        } else {
            setCarrera("Yoga de gluteos");
        }
    }, [nombre]);

    useEffect(() => {
        if (carrera === "Publicidad") {
            setColorText("text-publicidad");
            setFondoOpaco("bg-publicidad");
            setFondoDegradado("bg-hilet-publicidad");
            setBoton("publicidad-button");
            setColorBorde("border-publicidad");
        } else if (carrera === "Analista de Sistemas" || carrera === "Administración") {
            setColorText("text-analista");
            setFondoOpaco("bg-analista");
            setFondoDegradado("bg-hilet");
            setBoton("analista-button");
            setColorBorde("border-analista");
        }
        else {
            setColorText("text-otro");
            setFondoOpaco("bg-otro");
            setFondoDegradado("bg-hilet-otro");
            setBoton("otro-button");
            setColorBorde("border-otro");
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
        <div className="min-h-screen flex items-center justify-evenly bg-hilet py-20 lg:py-32 gap-8">
            <div className="bg-blanco p-8 rounded-lg w-11/12 sm:w-3/4 lg:w-3/5 flex flex-col lg:flex-row items-center lg:space-x-8 min-h-[65vh] shadow-2xl shadow-black">
                <div className="lg:w-1/2 flex flex-col m-auto justify-between items-center activo">
                    <h1 className="text-2xl font-bold mb-6 text-center text-analista titulo">Configuraciones</h1>
                    <form method="POST" className="flex flex-col justify-between items-center w-full max-w-xs">
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
                        <h2 className='text-analista'>Contraseña : </h2>
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
                        <InputField
                            id="rpassword"
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

export default Configuraciones;
