import React,{ useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  let navigate = useNavigate();

  const [user , setUser] = useState({email:"" , password:""});
  
  const handelChange= (e) => {
    setUser({...user , [e.target.name]: e.target.value });
     console.log(user);
  }

  const submitForm=(e) =>{
    e.preventDefault();
    const sendData = {
       email:user.email,
       password:user.password,
    }
    console.log(sendData);
    axios.post("http://localhost/api-Somaya/Login.php" , sendData )
    .then((result) => {
       if(result.data.Status == '200') {
        window.localStorage.setItem('email' , result.data.user.email);
        window.localStorage.setItem('userName' , result.data.user.password);
          if(result.data.user.role_id == '2'){
            navigate(`/Login`); 
          } else {
        navigate(`/free`); 
          }
       }
       else 
      {  alert("Invalid User"); }
      console.log(result.data.user.id);
    }
     
    ) .catch((error) => {
      console.error(error);
      alert("An error occurred. Please try again.");
    });
   
   }


  return (
    <>
     <form onSubmit={submitForm}> 
      <div className="Login">
       <h1> Login</h1>
       <p>Email:</p>
       <input type="email" 
        name="email"
        onChange={handelChange}
        value={user.email}
       />

       <p>Password:</p>
       <input type="password"
        name="password"
        onChange={handelChange}
        value={user.password}
       />
      </div>


      <input type="submit"
       name="submit"
      /> 

      </form> 
    </>
  );
};

export default Login;
