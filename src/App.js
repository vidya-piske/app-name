import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import './App.css';
import FileUploader from './components/FileUploader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/fileupload' element={<FileUploader/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
