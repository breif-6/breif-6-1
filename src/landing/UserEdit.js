import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UserEdit() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    mobile: '',
    password: ''
  });

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`http://localhost/userupdate.php?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      const user = {
        name: data.name,
        email: data.email,
        age: data.age,
        address: data.address,
        mobile: data.mobile,
        password: data.password
      };

      setUserData(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost/update.php?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      // Handle success, display a success message, etc.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input type="text" className="form-control" name="name" value={userData.name} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="age">Age</label>
      <input type="text" className="form-control" name="age" value={userData.age} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="address">Address</label>
      <input type="text" className="form-control" name="address" value={userData.address} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="mobile">Mobile</label>
      <input type="text" className="form-control" name="mobile" value={userData.mobile} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" className="form-control" name="password" value={userData.password} onChange={handleChange} />
    </div>

    <button type="button" className="btn btn-primary" onClick={updateUser}>Send</button>
  </div>
  );
}
