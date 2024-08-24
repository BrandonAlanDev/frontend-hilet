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
import Repass from "./Pages/Repass.jsx";

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
            {baseFrontRoutes("/repass",<Repass/>)}
            {baseFrontRoutes("/addcarrera",<AddCarrera/>)}
          </Routes>
      </BrowserRouter>
    </>

  );
}
export default RouterApp;
