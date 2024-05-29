import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signupform from './components/Signupform';
import Loginform from './components/Loginform';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signupform />} />
        <Route path='/login' element={<Loginform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
