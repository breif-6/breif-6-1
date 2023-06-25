import React, { useState } from 'react';
import Logout from './Logout';
import ContractList from './ContractList';
// import Weather from './Weather';
import { Container, Grid } from '@mui/material';

// import AuthRegister from './authentication/auth-forms/AuthRegister';
// import { Routes, Route } from 'react-router-dom';
import Weather from "./Weather";
import Userprofile from "./Userprofile";
import SelectContracts from "./SelectContracts";

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
      <SelectContracts/>
    </>
  );
}

export default Profile;
