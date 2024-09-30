import React from 'react';

const Mosaico = (props) => {
    const {
        titulo = "", // Texto superior
        colorText = "text-analista", // Color del texto, por defecto azul analista
        colorBg = "bg-blanco", // Fondo, por defecto blanco
        imagen = "src/Assets/Image/formas-colores.webp", // Imagen, por defecto las figuras
        texto = "",// Texto inferior
        anchoImagen="w-[65%]",
        altoImagen="h-[auto]",
        callback = ()=>{} // Funcion que se dispara al hacerle click
      } = props;

    return (
        <>
        <button
            className={`${colorBg} ${colorText} text-2xl font-bold text-center text-mosaico p-4 rounded-lg flex flex-col flex-grow items-center justify-between mosaicos shadow-2xl shadow-black`}
            onClick={callback}
        >
            <div className="items-center activo">
            {titulo}
            </div>
            {imagen && <img className={`flex select-none justify-center items-center activo ${anchoImagen} ${altoImagen}`} src={imagen}/> }
            <div className="text-mosaico">
                <h4>{texto}</h4>
            </div>
        </button>
        </>
    );
};

export default Mosaico;