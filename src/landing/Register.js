import axios from 'axios';

import React,{ useState } from "react";
import { useNavigate } from 'react-router';

const Register = () => {

  let history = useNavigate();
   const [data , setData] = useState({
    name:"",
    email:"",
    password:"",

   })

   const handelChange=(e)=>{
     setData({ ...data , [e.target.name]: e.target.value });
    //  console.log(data);
   }
    
   const submitForm=(e) =>{
    e.preventDefault();
    const sendData = {
       name:data.name,
       email:data.email,
       password:data.password,
    }
    console.log(sendData);
    axios.post("http://localhost/api-Somaya/register.php" , sendData )
    .then((result) => {
       if(result.data.Status == 'Invalid')
       {alert("Invalid User");}
       else 
      { history(`/Login`); }
    })
   }
  return (
    <div className='Register'>
      <h2>Sign Up</h2>
      <form  onSubmit={submitForm}>
        <div>
          <p>Name:</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handelChange}  />
        </div>
        <div>
          <p>Email:</p>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handelChange} 
          />
        </div>
        <div>
          <p>Password:</p>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handelChange} 
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {/* {response && <p>{response}</p>} */}
    </div>
  );
};

export default Register;
