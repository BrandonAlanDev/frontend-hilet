import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Layouts
import Frontend from './Layouts/Frontend';
import Backoffice from './Layouts/Backoffice';

// Pages
import AddCarrera from "./Pages/Administradores/AddCarrera.jsx";
import Indice from "./Pages/Indice.jsx";
import LoginForm from "./Pages/LoginForm.jsx";
import AddMateria from "./Pages/Administradores/AddMateria.jsx";
import AddProfesor from "./Pages/Administradores/AddProfesor.jsx";
import AddAlumnos from "./Pages/Administradores/AddAlumnos.jsx";
import AddFinales from "./Pages/Administradores/AddFinales.jsx";
import Programa from "./Pages/Usuarios/Programa.jsx";
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
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        sessionStorage.clear();
        location.replace("/login");
      } else if (decodedToken.carrera === "Administracion") {
        setProtectedRoutes(
          <>
          </>
        );
      } else {
        setProtectedRoutes(
          <>
          </>
        );
      }
    } else {
      setProtectedRoutes(<></>);
    }
  }, []);



  return (
    <>
      <BrowserRouter>
        <Routes>
          {protectedRoutes}
          {baseFrontRoutes("/", <LoginForm />)}
          {baseFrontRoutes("/login", <LoginForm />)}
          {baseFrontRoutes('/inicio', <Indice />)}
          {baseFrontRoutes('/addcarrera', <AddCarrera />)}
          {baseFrontRoutes('/addmaterias', <AddMateria />)}
          {baseFrontRoutes('/addprofesor', <AddProfesor />)}
          {baseFrontRoutes('/addalumno', <AddAlumnos />)}
          {baseFrontRoutes('/configuraciones', <Configuraciones />)}
          {baseFrontRoutes('/finales', <AddFinales />)}
          {baseFrontRoutes('/historialacademico', <Programa />)}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterApp;