import React, { useState } from 'react';
import Logout from './Logout';
import Userprofile from './Userprofile';
import ContractList from './ContractList';
import Weather from './Weather';
import { Container, Grid } from '@mui/material';

function Profile() {
  const [showContractList, setShowContractList] = useState(false);

  const toggleContractList = () => {
    setShowContractList(prevState => !prevState);
  };

  return (
    <>
      <Logout />
      <Userprofile />
      <Container>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '50vh' }}>
          <Grid item>
            <button className="btn btn-primary" onClick={toggleContractList}>Show offers</button>
          </Grid>
        </Grid>
      </Container>
      {showContractList && <ContractList />}
      <Weather />
    </>
  );
}

export default Profile;
