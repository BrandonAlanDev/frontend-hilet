import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Submenu from './Submenu';
import logoUsuario from '../Assets/Image/UserWhite.webp';
import logoHilet from '../Assets/Image/HiletWEBP.webp';

const Navbar = ({ nombre, carrera}) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [fondoOpaco, setFondoOpaco] = useState('');
    const [direcciones,setDirecciones]=useState([]);
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
        if(carrera !=="Administración"){
            setDirecciones([
                { titulo: "Inicio", path: "/inicio" },
                { titulo: "Programa", path: "/programa" }
            ]);
        }else{
            setDirecciones([
                { titulo: "Inicio", path: "/inicio" },
                { titulo: "Profesores", path: "/profesores" },
                { titulo: "Finales", path: "/finales" },
                { titulo: "Cargar notas", path: "/addnotas" },
                { titulo: "Cargar alumno", path: "/addalumno" },
                { titulo: "Cargar profesor", path: "/addprofesor" },
                { titulo: "Cargar carrera", path: "/addcarrera" },
                { titulo: "Cargar materias", path: "/addmaterias" }
            ]);
        }
        
    }, [carrera]);



    return (
        <div className={`fixed select-none top-0 left-0 w-full ${fondoOpaco} z-50 flex items-center justify-between p-4 shadow-lg border-b border-white`}>
            <div className="flex items-center">
                <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`side-menu ${fondoOpaco} ${isMenuOpen ? 'open' : ''}`}>
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