import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signupform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account Created");
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='signup-container'>
      <form className='signup-form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor='email'>
          Email:
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor='password'>
          Password:
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type='submit'>Sign Up</button>
        <p>Already Registered? <Link to='/login'>Login</Link></p>
      </form>
    </div>
  );
};

export default Signupform;
