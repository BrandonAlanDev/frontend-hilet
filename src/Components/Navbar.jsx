import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Submenu from './Submenu';
import logoUsuario from '../Assets/Image/UserWhite.webp';
import logoHilet from '../Assets/Image/HiletWEBP.webp';

const Navbar = ({ nombre, carrera }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [direcciones, setDirecciones] = useState([]);

    const menuRef = useRef(null);
    const userMenuRef = useRef(null);
    const navbarRef = useRef(null);

    const toggleMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsMenuOpen((prev) => !prev);
        setIsUserMenuOpen(false);
    };

    const toggleUserMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsUserMenuOpen((prev) => !prev);
        setIsMenuOpen(false);
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

        if (carrera !== "Administración") {
            setDirecciones([
                { titulo: "Inicio", path: "/inicio" },
                { titulo: "Programa", path: "/programa" }
            ]);
        } else {
            setDirecciones([
                { titulo: "Inicio", path: "/inicio" },
                { titulo: "Finales", path: "/finales" },
                { titulo: "Gestion de Alumno", path: "/addalumno" },
                { titulo: "Gestion de Profesor", path: "/addprofesor" },
                { titulo: "Gestion de Carreras", path: "/addcarrera" },
                { titulo: "Gestion de Materias", path: "/addmaterias" }
            ]);
        }
    }, [carrera]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                navbarRef.current && 
                !navbarRef.current.contains(event.target) && 
                !menuRef.current?.contains(event.target) && 
                !userMenuRef.current?.contains(event.target)
            ) {
                setIsMenuOpen(false);
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div 
            ref={navbarRef}
            className={`fixed select-none top-0 left-0 w-full ${fondoOpaco} z-50 flex items-center justify-between p-4 shadow-lg border-b border-white`}
        >
            <div className="flex items-center">
                <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div 
                    ref={menuRef} 
                    className={`side-menu ${fondoOpaco} ${isMenuOpen ? 'open' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mt-20">
                        {direcciones.map((direccion) => (
                            <Submenu
                                key={direccion.titulo}
                                carrera={carrera}
                                titulo={direccion.titulo}
                                path={direccion.path}
                                open={location.pathname === direccion.path}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="logo">
                <a href="/"><img src={logoHilet} alt="Logo" className="h-12 w-auto" /></a>
            </div>
            <div className="flex items-center relative">
                <span className="text-white mr-2">{nombre}</span>
                <button className={`user-menu ${isUserMenuOpen ? 'open' : ''}`} onClick={toggleUserMenu}>
                    <img src={logoUsuario} alt="User Menu" className="w-8 h-8" />
                    <span className={`arrow ${isUserMenuOpen ? 'open' : ''}`}>&gt;</span>
                </button>
                <div 
                    ref={userMenuRef} 
                    className={`side-menu-user ${fondoOpaco} ${isUserMenuOpen ? 'open' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='mt-20'>
                        <Submenu carrera={carrera} titulo="Configuraciones" open={location.pathname === "/configuraciones"} path={"/configuraciones"} />
                        <Submenu carrera={carrera} titulo="Cerrar sesion" open={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
