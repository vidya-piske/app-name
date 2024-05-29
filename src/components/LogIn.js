import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successfully");
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log("Login failed:", err);
    }
  };  

  return (
    <div className='signup-container'>
      <form className='signup-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor='email'>
          Email:
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor='password'>
          Password:
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type='submit'>Login</button>
        <p>Don't have an account? <Link to='/signup'>Register</Link></p>
      </form>
    </div>
  );
};

export default LogIn;
