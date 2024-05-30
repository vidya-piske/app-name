import React, { useState, useEffect } from 'react';
import { database } from '../firebase/firebase'; // Ensure the path is correct
import { ref, set, push, onValue } from 'firebase/database';

const Crudoperations = () => {
  const [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newUserRef = push(ref(database, 'users'));//This generates a new, unique key under the users node.
      await set(newUserRef, data); //write new user data to a specific location in your Firebase Realtime 
      alert('Data Submitted Successfully');
    } catch (error) {
      alert('Error submitting data. Please try again later.');
    }
  };

  useEffect(() => {
    const usersRef = ref(database, 'users');
    // Set up listener for changes to the users node
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val(); // Retrieve data from snapshot
      // Update your state or do something with the data
       if (usersData) {
        const usersArray = Object.values(usersData); // Convert object to array
        setUsers(usersArray); // Update state with users array
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [users]); // Run this effect only once, on component mount
  
  return (
    <div>
         <div>
            {users.map((user, index) => { 
                return ( 
                    <div key={index}>
                        <p>First Name: {user.fname}</p> 
                        <p>Last Name: {user.lname}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: {user.password}</p>
                        <p>Confirm Password: {user.confirmpassword}</p>
                    </div>
                );
            })}
        </div>
      <input
        type='text'
        name='fname'
        value={data.fname}
        onChange={handleChange}
        placeholder='First Name'
      />
      <input
        type='text'
        name='lname'
        value={data.lname}
        onChange={handleChange}
        placeholder='Last Name'
      />
      <input
        type='email'
        name='email'
        value={data.email}
        onChange={handleChange}
        placeholder='Email'
      />
      <input
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        placeholder='Password'
      />
      <input
        type='password'
        name='confirmpassword'
        value={data.confirmpassword}
        onChange={handleChange}
        placeholder='Confirm Password'
      />
      <button type='button' onClick={submitHandler}>
        Create
      </button>
    </div>
  );
};

export default Crudoperations;
