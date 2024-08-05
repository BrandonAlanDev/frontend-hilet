import React from 'react';
import { useNavigate } from 'react-router-dom';

const Submenu = ({ carrera, titulo, open }) => {
    const navigate = useNavigate();
    const Logout=()=>{
        sessionStorage.clear();
        navigate("/");
    }
    let estilo = 'submenu';

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
            estilo += "bg-analista text-white";
        } else if (carrera === "Publicidad") {
            estilo += " bg-publicidad text-blanco";
        } else if (carrera === "Administración") {
            estilo += " bg-analista text-blanco";
        } else {
            estilo += " bg-otro text-blanco";
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
                    onClick={titulo === "Cerrar sesion" ? () => Logout() : () => navigate(`/${titulo}`)}
                >
                    {titulo}
                </button>
            )}
        </>
    );
};

export default Submenu;