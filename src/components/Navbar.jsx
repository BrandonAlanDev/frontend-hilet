import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Submenu from './Submenu';
import logoUsuario from '../resources/img/UserWhite.webp';
import logoHilet from '../resources/img/HiletWEBP.webp';

const Navbar = ({ nombre, carrera}) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [fondoOpaco, setFondoOpaco] = useState('');

    const toggleMenu = () => {
        if (isUserMenuOpen) {
            setIsUserMenuOpen(false);
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleUserMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    useEffect(() => {
        if (carrera === "Publicidad") {
            setFondoOpaco("bg-publicidad");
        } else if (carrera === "Analista de Sistemas") {
            setFondoOpaco("bg-analista");
        } else if (carrera === "Administración") {
            setFondoOpaco("bg-analista");
        } else {
            setFondoOpaco("bg-otro");
        }
    }, [carrera]);

    return (
        <div className={`fixed top-0 left-0 w-full ${fondoOpaco} z-50 flex items-center justify-between p-4 shadow-lg border-b border-white`}>
            <div className="flex items-center">
                <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`side-menu ${fondoOpaco} ${isMenuOpen ? 'open' : ''}`}>
                    <div className="mt-20">
                        {(carrera==="Administración") ? (
                            <>
                                <Submenu carrera={carrera} titulo="Inicio" open={location.pathname === "/inicio"} />
                                <Submenu carrera={carrera} titulo="Profesores" open={location.pathname === "/profesores"} />
                                <Submenu carrera={carrera} titulo="Finales" open={location.pathname === "/finales"} />
                                <Submenu carrera={carrera} titulo="Cargar notas" open={location.pathname === "/newnotas"} />
                                <Submenu carrera={carrera} titulo="Cargar alumno" open={location.pathname === "/newalumno"} />
                                <Submenu carrera={carrera} titulo="Cargar profesor" open={location.pathname === "/newprofesor"} />
                                <Submenu carrera={carrera} titulo="Cargar carrera" open={location.pathname === "/newcarrera"} />
                                <Submenu carrera={carrera} titulo="Cargar materias" open={location.pathname === "/newmaterias"} />
                            </>
                        ) : (
                            <>
                                <Submenu carrera={carrera} titulo="Inicio" open={location.pathname === "/inicio"} />
                                <Submenu carrera={carrera} titulo="Programa" open={location.pathname === "/programa"} />
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="logo">
                <img src={logoHilet} alt="Logo" className="h-12 w-auto" />
            </div>
            <div className="flex items-center relative">
                <span className="text-white mr-2">{nombre}</span>
                <button className={`user-menu ${isUserMenuOpen ? 'open' : ''}`} onClick={toggleUserMenu}>
                    <img src={logoUsuario} alt="User Menu" className="w-8 h-8" />
                    <span className={`arrow ${isUserMenuOpen ? 'open' : ''}`}>&gt;</span>
                </button>
                <div className={`side-menu-user ${fondoOpaco} ${isUserMenuOpen ? 'open' : ''}`}>
                    <div className='mt-20'>
                        <Submenu carrera={carrera} titulo="Configuraciones" open={location.pathname === "/configuraciones"} />
                        <Submenu carrera={carrera} titulo="Cerrar sesion" open={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;