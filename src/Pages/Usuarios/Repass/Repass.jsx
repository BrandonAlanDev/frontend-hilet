import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoPassword from '../../../Assets/Image/password.png';
import { Link } from 'react-router-dom';

const Repass = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "email"; // Accede al estado pasado

    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const passRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{6,20}$/; // regex

    useEffect(() => {
        // Verifica si el email es el valor por defecto y navega a inicio
        if (email === "email") {
            navigate('/inicio');
        }
    }, [email, navigate]);

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRepasswordChange = (e) => setRepassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validar
        if (!passRegex.test(password)) {
            setErrorMessage('La contraseña debe contener entre 6 y 20 caracteres permitidos.');
            return;
        }
        if (password !== repassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }
    
        // Fetch 
        const storedUsers = JSON.parse(sessionStorage.getItem('users') || '{}');
        const user = Object.values(storedUsers).find(user => user.email === email);
    
        if (user) {
            const userKey = Object.keys(storedUsers).find(key => storedUsers[key].email === email); // Encuentra la clave del usuario
            storedUsers[userKey].password = password; // Actualiza la contraseña
            sessionStorage.setItem('users', JSON.stringify(storedUsers));
            alert('Contraseña actualizada con éxito');
            navigate('/login');
        } else {
            setErrorMessage('No se encontró el usuario.');
        }
    };

    return (
        <div className="min-h-screen select-none flex items-center justify-evenly bg-hilet py-20 lg:py-32">
            <div className="bg-blanco p-4 rounded-lg w-11/12 sm:w-3/4 lg:w-2/5 flex flex-col lg:flex-row items-center lg:space-x-8 min-h-[55vh] shadow-2xl shadow-black">
                <div className="flex flex-col m-auto justify-between items-center activo">
                    <h1 className="text-2xl font-bold mb-12 text-center text-analista titulo">Cambio de contraseña</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-between items-center w-full max-w-xs">
                        <label htmlFor="password" className="mb-10 w-full rounded-full border-analista bg-white p-2 flex input text-left">
                            <img src={logoPassword} alt="Logo Hilet" className="w-6 h-6 aspect-square rounded-full mr-2" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Nueva contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                                className="flex-1 appearance-none border-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 leading-tight placeholder-analista placeholder-opacity-100 negrita"
                            />
                        </label>
                        
                        <label htmlFor="repassword" className="mb-10 w-full rounded-full border-analista bg-white p-2 flex input text-left">
                            <img src={logoPassword} alt="Logo Hilet" className="w-6 h-6 aspect-square rounded-full mr-2" />
                            <input
                                id="repassword"
                                name="repassword"
                                type="password"
                                placeholder="Confirme su contraseña"
                                value={repassword}
                                onChange={handleRepasswordChange}
                                className="flex-1 appearance-none border-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 leading-tight placeholder-analista placeholder-opacity-100 negrita"
                            />
                        </label>

                        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                        <div className="flex flex-col items-center w-full">
                            <button
                                type="submit"
                                className="mt-2 analista-button font-bold py-2 px-4 rounded-full w-full max-w-xs focus:outline-none focus:shadow-outline mb-4"
                            >
                                Aceptar
                            </button>
                        </div>
                    </form>
                    <Link
                        className="mt-2 analista-button font-bold py-2 px-4 rounded-full w-full max-w-xs focus:outline-none focus:shadow-outline mb-4 text-center"
                        to="/">
                        Volver
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Repass;
