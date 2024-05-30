import React, { useState, useEffect } from 'react';
import { database } from '../firebase/firebase'; // Ensure the path is correct
import { ref, set, push, onValue, remove } from 'firebase/database';

const Crudoperations = () => {
    const [data, setData] = useState({
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirmpassword: ''
    });
  
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
  
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        if (selectedUserId) {
          // If a user is selected, update their data
          await updateData(selectedUserId, data);
        } else {
          // If no user is selected, create a new user
          await createData(data);
        }
        alert('Data Submitted Successfully');
        // Clear input fields after submission
        setData({
          fname: '',
          lname: '',
          email: '',
          password: '',
          confirmpassword: ''
        });
        setSelectedUserId(null); // Clear selected user ID
      } catch (error) {
        alert('Error submitting data. Please try again later.');
      }
    };
  
    useEffect(() => {
      const usersRef = ref(database, 'users');
      const unsubscribe = onValue(usersRef, (snapshot) => {
        const usersData = snapshot.val();
        if (usersData) {
          const usersArray = Object.entries(usersData).map(([userId, userData]) => ({ userId, ...userData }));
          setUsers(usersArray);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    const updateData = async (userId, userData) => {
      try {
        const userRef = ref(database, `users/${userId}`);
        await set(userRef, userData);
      } catch (error) {
        alert("Data not updated");
      }
    };
  
    const createData = async (userData) => {
      try {
        const newUserRef = push(ref(database, 'users'));
        await set(newUserRef, userData);
      } catch (error) {
        alert("Error creating user");
      }
    };
  
    const deleteData = async (userId) => {
      try {
        const userRef = ref(database, `users/${userId}`);
        await remove(userRef);
        alert("Data Deleted Successfully");
      } catch (error) {
        alert("Error deleting data");
      }
    };
  
    const handleUpdateClick = (userId, userData) => {
      setSelectedUserId(userId); // Set the selected user ID
      setData(userData); // Prefill the input fields with user data
    };
  
    return (
      <div>
        <div>
          {users.map((user, index) => (
            <div key={index}>
              <p>First Name: {user.fname}</p>
              <p>Last Name: {user.lname}</p>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
              <p>Confirm Password: {user.confirmpassword}</p>
              <button onClick={() => handleUpdateClick(user.userId, user)}>Update</button>
              <button onClick={() => deleteData(user.userId)}>Delete</button>
            </div>
          ))}
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
          {selectedUserId ? 'Update' : 'Create'}
        </button>
      </div>
    );
  };
  
  export default Crudoperations;
  
