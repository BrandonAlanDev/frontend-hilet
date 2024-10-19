import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';

//Layouts
import Frontend from './Layouts/Frontend';
import Backoffice from './Layouts/Backoffice';

//Pages
import AddCarrera from "./Pages/Administradores/AddCarrera.jsx";
import Indice from "./Pages/Indice.jsx";
import LoginForm from "./Pages/LoginForm.jsx";
import AddMateria from "./Pages/Administradores/AddMateria.jsx";
import AddProfesor from "./Pages/Administradores/AddProfesor.jsx";
import AddAlumnos from "./Pages/Administradores/AddAlumnos.jsx"
import Programa from "./Pages/Usuarios/Programa.jsx";

//De ajustes
import SendCode from "./Pages/Usuarios/Repass/SendCode.jsx";
import Repass from "./Pages/Usuarios/Repass/Repass.jsx";
import Configuraciones from "./Pages/Configuraciones.jsx";

const RouterApp = (props) => {
  const [user, setUser] = useState(null);
  const [protectedRoutes, setProtectedRoutes] = useState(<></>);

  const baseFrontRoutes = (route, children) => {
    return (
      <Route 
        path={route} 
        element={
          <Frontend 
            children={children} 
          />
        } 
      />
    );
  }

  const baseBakendRoutes = (route, children) => {
    return (
      <Route 
        path={route} 
        element={
          <Backoffice 
            children={children} 
          />
        } 
      />
    )
  }

  useEffect(() => {
    if (true) {
      setProtectedRoutes(
        <>
          
        </>
      );
    } else {
      setProtectedRoutes(<></>);
    }
  }, [user])


  return (
    <>
      <BrowserRouter>
          <Routes>
            {protectedRoutes}
            {baseFrontRoutes("/login",<LoginForm/>)}
            {baseFrontRoutes("/",<Indice/>)}
            {baseFrontRoutes("/inicio",<Indice/>)}
            {baseFrontRoutes("/sendcode",<SendCode/>)}
            {baseFrontRoutes("/repass",<Repass/>)}
            {baseFrontRoutes("/addcarrera",<AddCarrera/>)}
            {baseFrontRoutes("/addmaterias",<AddMateria/>)}
            {baseFrontRoutes("/addprofesor",<AddProfesor/>)}
            {baseFrontRoutes("/historialacademico",<Programa/>)}
            {baseFrontRoutes("/addalumno",<AddAlumnos/>)}
            {baseFrontRoutes("/configuraciones",<Configuraciones/>)}
          </Routes>
      </BrowserRouter>
    </>

  );
}
export default RouterApp;
