import React, {useEffect, useState} from 'react'
import { database } from '../firebase/firebase';
import {push, ref, set} from 'firebase/firebase';
import { onValue } from 'firebase/database';

const Practise = () => {
  const[data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmpassword: ''
  })
  const[users, setUsers] = useState([])
  const handleChange = (e) => {
    e.target.value();
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleCreate = async() => {
    try{
     const userdata =  push(ref(database, 'users'))
     await set(userdata, data)
    }
    catch(e){
     console.log(e)
    }
  }

  useEffect(()=>{
    const retrieve_data = ref(database, 'users')
    const snapshot_value = onValue(retrieve_data, (snapshot)=>{
       const snapshot_data = snapshot.val()
       if (snapshot_data){
         const array_value = Object.values(snapshot_data);
         setUsers(array_value)
       }
    })
    return()=>snapshot_value()
  })
  return (
    <div>
        <div>
            {users.map((users,index)=>{
                return(
                    <>
                    <p key={index}>First Name: {users.fname}</p>
                    <p>Last Name: {users.lname}</p>
                    <p>Email: {users.email}</p>
                    <p>Password: {users.password}</p>
                    <p>Confirm Password: {users.confirmpassword}</p>
                    </>
                )
            })}
        </div>
        <input type='text' name="fname" value={data.fname} onChange={handleChange}/>
        <input type='text' name="lname" value={data.lname} onChange={handleChange}/>
        <input type='text' name="email" value={data.email} onChange={handleChange}/>
        <input type='text' name="password" value={data.password} onChange={handleChange}/>
        <input type='text' name="confirmpassword" value={data.confirmpassword} onChange={handleChange}/>
        <button onClick={handleCreate}>Create</button>
    </div>
  )
}

export default Practise