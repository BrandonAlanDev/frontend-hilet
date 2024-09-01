import React from 'react';
import { useNavigate } from 'react-router-dom';

const Mosaico = ({ carrera, titulo, open, path}) => {
    const navigate = useNavigate();
    const Logout=()=>{
        sessionStorage.clear();
        navigate("/");
    }
    let estilo = 'submenu';
    const direcciones=[
    ];
    if (!open) {
        if (carrera === "Analista de Sistemas") {
            estilo += " analista-button";
        } else if (carrera === "Publicidad") {
            estilo += " publicidad-button";
        } else if (carrera === "Administración") {
            estilo += " analista-button";
        } else {
            estilo += " otro-button";
        }
    } else {
        if (carrera === "Analista de Sistemas") {
            estilo += " bg-white text-analista select-none";
        } else if (carrera === "Publicidad") {
            estilo += " bg-white text-publicidad select-none";
        } else if (carrera === "Administración") {
            estilo += " bg-white text-analista select-none";
        } else {
            estilo += " bg-white text-otro select-none";
        }
    }

    return (
        <>
            {open ? (
                <div className={estilo}>
                    {titulo}
                </div>
            ) : (
                <button 
                    className={estilo}
                    onClick={titulo === "Cerrar sesion" ? () => Logout() : () => {navigate(path)}}
                >
                    {titulo}
                </button>
            )}
        </>
    );
};

export default Mosaico;