import React from 'react';
import { Typography, Button } from '@mui/material';

const CustomerCenter = () => {
  const handleContactSupport = () => {
    // Handle contact support logic
  };

  const handleViewOrders = () => {
    // Handle view orders logic
  };

  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom>
        Customer Center
      </Typography>
      <Button variant="contained" color="primary" onClick={handleContactSupport}>
      Premium System Contract
      </Button>
      <Button variant="contained" color="secondary" onClick={handleViewOrders}>
      Standard System Contract
      </Button>
      <Button variant="contained" color="primary" onClick={handleContactSupport}>
      Advanced System Contract
      </Button>
      {/* Add more components and functionality as needed */}
    </div>
  );
};

export default CustomerCenter;
