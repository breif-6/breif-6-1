import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('role_id');
    window.location.reload();
  };

  const buttonStyles = {
    // Add your desired styles here
    color: 'white', // Example color
  };

  return (
    <Button onClick={handleLogout} variant="contained" startIcon={<LogoutIcon />} sx={buttonStyles}>
      Logout
    </Button>
  );
};

export default Logout;
