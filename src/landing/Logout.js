import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role_id');
    navigate('/free');
    window.location.reload();
  };

  const buttonStyles = {
    color: 'white',
  };

  return (
    <Button onClick={handleLogout} variant="contained" startIcon={<LogoutIcon />} sx={buttonStyles}>
      Logout
    </Button>
  );
};

export default Logout;
