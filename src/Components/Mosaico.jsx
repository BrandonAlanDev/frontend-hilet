import React from 'react';
import { useNavigate } from 'react-router-dom';

const Mosaico = (props) => {
    const navigate = useNavigate();

    const {
        titulo = "", // Texto superior
        colorText = "text-analista", // Color del texto, por defecto azul analista
        colorBg = "bg-blanco", // Fondo, por defecto blanco
        imagen = "src/Assets/Image/formas-colores.webp", // Imagen, por defecto las figuras
        texto = "",// Texto inferior
        anchoImagen = "w-[65%]",
        altoImagen = "h-[auto]",
        callback = () => { }, // Funcion que se dispara al hacerle click
        navigateTo = ""
    } = props;

    const navegarAdmin = () => {
        if (navigateTo) {
            navigate(navigateTo);
        }
    }

    const eventoClick = ()=>{
        callback();
        if(navigateTo) navegarAdmin();
    }
    return (
        <>
            <button
                className={`${colorBg} ${colorText} text-2xl font-bold text-center text-mosaico p-4 rounded-lg flex flex-col flex-grow items-center justify-between mosaicos shadow-2xl shadow-black`}
                onClick={eventoClick}
            >
                <div className="items-center activo">
                    {titulo}
                </div>
                {imagen && <img className={`flex select-none justify-center items-center activo ${anchoImagen} ${altoImagen}`} src={imagen} />}
                <div className="text-mosaico">
                    <h4>{texto}</h4>
                </div>
            </button>
        </>
    );
};

export default Mosaico;