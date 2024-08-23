import React from 'react';
import LoginForm from './components/LoginForm';
import Repass from './components/Repass';
import Indice from './components/Indice';
import AddCarrera from './components/AddCarrera';

export function LoginFormJSX() {
  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}
export function RepassJSX() {
  return (
    <div className="App">
      <Repass />
    </div>
  );
}

export function IndiceJSX() {
  return (
    <div className="App">
      <Indice />
    </div>
  );
}

export function AddCarreraJSX(){
  return(
    <div className="App">
      <AddCarrera/>
    </div>
  );
}
