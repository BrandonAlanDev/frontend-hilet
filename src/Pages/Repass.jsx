import React from 'react';
import logoHilet from '../assets/Image/HiletWEBP.webp';
import logoUsuario from '../assets/Image/user.png';
import logoPassword from '../assets/Image/password.png';

const Repass = () => {
    let urlAPI="";
    return (
        <div className="min-h-screen flex items-center justify-evenly bg-hilet py-20 lg:py-32">
            <div className="bg-blanco p-4 rounded-lg w-11/12 sm:w-3/4 lg:w-2/5 flex flex-col lg:flex-row items-center lg:space-x-8 min-h-[55vh] shadow-2xl shadow-black">
                <div className="flex flex-col m-auto justify-between items-center activo">
                    <h1 className="text-2xl font-bold mb-12 text-center text-analista titulo">Cambio de contraseña</h1>
                    <form /* action={urlAPI} method="POST" */ className="flex flex-col justify-between items-center w-full max-w-xs">

                        <label htmlFor="password" className="mb-10 w-full rounded-full border-analista bg-white p-2 flex input text-left">
                            <img src={logoPassword} alt="Logo Hilet" className="w-6 h-6 aspect-square rounded-full mr-2" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Nueva contraseña"
                                className="flex-1 appearance-none border-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 leading-tight placeholder-analista placeholder-opacity-100 negrita"
                            />
                        </label>
                        
                        <label htmlFor="password" className="mb-10 w-full rounded-full border-analista bg-white p-2 flex input text-left">
                            <img src={logoPassword} alt="Logo Hilet" className="w-6 h-6 aspect-square rounded-full mr-2" />
                            <input
                                id="repassword"
                                name="repassword"
                                type="password"
                                placeholder="Confirme su contraseña"
                                className="flex-1 appearance-none border-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 leading-tight placeholder-analista placeholder-opacity-100 negrita"
                            />
                        </label>
                        <div className="flex flex-col items-center w-full">
                            <button
                            type="submit"
                            className="mt-2 analista-button font-bold py-2 px-4 rounded-full w-full max-w-xs focus:outline-none focus:shadow-outline mb-4"
                            >
                            Aceptar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Repass;