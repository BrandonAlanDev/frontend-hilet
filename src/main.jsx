import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { IndiceJSX, LoginFormJSX, RepassJSX } from './App.jsx';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginFormJSX />} />
        <Route path="/repass" element={<RepassJSX />} />
        <Route path="/inicio" element={<IndiceJSX/>} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
