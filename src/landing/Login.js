// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   let navigate = useNavigate();
//   const [user, setUser] = useState({ email: "", password: "" });
//   const [isLoading, setIsLoading] = useState(true); // Added isLoading state

//   useEffect(() => {
//     setIsLoading(false); // Set isLoading to false when the component mounts
//   }, []);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//     console.log(user);
//   }

//   const submitForm = (e) => {
//     e.preventDefault();
//     const sendData = {
//       email: user.email,
//       password: user.password,
//     }
//     console.log(sendData);
//     axios.post("http://localhost/breif-6-1/api-Somaya/Login.php", sendData)
//       .then((result) => {
//         if (result.data.Status === '200') {
//           window.localStorage.setItem('email', result.data.user.email);
//           window.localStorage.setItem('name', result.data.user.name);
//           window.localStorage.setItem('address', result.data.user.address);
//           window.localStorage.setItem('user id', result.data.user.id);
//           window.localStorage.setItem('role_id', result.data.user.role_id);
//           if (result.data.user.role_id == '2') {
//             navigate(`/profile`);
//           } else if(result.data.user.role_id == '1') {
//             navigate(`/dashboard/default`);
//           } else {
//             navigate(`/login`);
//           }
//           setIsLoading(true); // Set isLoading to true before the refresh
//           window.location.reload(); // Add page refresh
//         } else {
//           alert("Invalid User");
//         }
//         console.log(result.data.user.id);
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("An error occurred. Please try again.");
//       });
//   }

//   if (isLoading) {
//     return null; // Render nothing while isLoading is true
//   }

//   return (
//     <div style={styles.container}>
//       <form onSubmit={submitForm}>
//         <div className="Login">
//           <h1>Login</h1>
//           <p>Email:</p>
//           <input
//             type="email"
//             name="email"
//             onChange={handleChange}
//             value={user.email}
//             style={styles.input}
//           />

//           <p>Password:</p>
//           <input
//             type="password"
//             name="password"
//             onChange={handleChange}
//             value={user.password}
//             style={styles.input}
//           />
//         </div>

//         <input
//           type="submit"
//           name="submit"
//           style={styles.button}
//         />
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//   },
//   input: {
//     padding: '8px',
//     marginBottom: '16px',
//     width: '200px',
//   },
//   button: {
//     padding: '8px 16px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
// };

// export default Login;


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
          window.localStorage.setItem('id', result.data.user.id);
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
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Login</h1>
        <form onSubmit={submitForm}>
          <div className="Login">
            <div style={styles.inputContainer}>
              <label htmlFor="email" style={styles.label}>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={user.email}
                style={styles.input}
              />
            </div>

            <div style={styles.inputContainer}>
              <label htmlFor="password" style={styles.label}>Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={user.password}
                style={styles.input}
              />
            </div>
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh',
    // marginBottom: '20%'
  },
  formContainer: {
    width: '300px',
    padding: '24px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
  heading: {
    marginBottom: '16px',
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '16px',
  },
  label: {
    marginBottom: '8px',
    color: '#555',
    fontSize: '16px',
  },
  input: {
    padding: '8px',
    width: '100%',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 24px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Login;
