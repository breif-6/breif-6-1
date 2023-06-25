import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(true); // Added isLoading state

  useEffect(() => {
    setIsLoading(false); // Set isLoading to false when the component mounts
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  }

  const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      email: user.email,
      password: user.password,
    }
    console.log(sendData);
    axios.post("http://localhost/breif-6-1/api-Somaya/Login.php", sendData)
      .then((result) => {
        if (result.data.Status === '200') {
          window.localStorage.setItem('email', result.data.user.email);
          window.localStorage.setItem('name', result.data.user.name);
          window.localStorage.setItem('address', result.data.user.address);
          window.localStorage.setItem('user id', result.data.user.id);
          window.localStorage.setItem('role_id', result.data.user.role_id);
          if (result.data.user.role_id == '2') {
            navigate(`/profile`);
          } else if(result.data.user.role_id == '1') {
            navigate(`/dashboard/default`);
          } else {
            navigate(`/login`);
          }
          setIsLoading(true); // Set isLoading to true before the refresh
          window.location.reload(); // Add page refresh
        } else {
          alert("Invalid User");
        }
        console.log(result.data.user.id);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again.");
      });
  }

  if (isLoading) {
    return null; // Render nothing while isLoading is true
  }

  return (
    <div style={styles.container}>
      <form onSubmit={submitForm}>
        <div className="Login">
          <h1>Login</h1>
          <p>Email:</p>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={user.email}
            style={styles.input}
          />

          <p>Password:</p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
            style={styles.input}
          />
        </div>

        <input
          type="submit"
          name="submit"
          style={styles.button}
        />
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  input: {
    padding: '8px',
    marginBottom: '16px',
    width: '200px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Login;
