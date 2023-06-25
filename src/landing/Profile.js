import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import Userprofile from './Userprofile';
import ContractList from './ContractList';
import Weather from './Weather';
import SelectContracts from './SelectContracts';
import Logout from './Logout';

function Profile() {
  const [showContractList, setShowContractList] = useState(false);

  const toggleContractList = () => {
    setShowContractList(prevState => !prevState);
  };

  const scrollToComponent = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg" style={{ backgroundColor: "#b9defe" }}>
        <div className="container-fluid">
          <span
            className="navbar-brand"
            role="button"
            tabIndex={0}
            onClick={() => scrollToComponent('home')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                scrollToComponent('home');
              }
            }}
          >
            NexTalk
          </span>
          <span
            className="navbar-brand"
            role="button"
            tabIndex={0}
            onClick={() => scrollToComponent('logout')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                scrollToComponent('logout');
              }
            }}
          >
            <Logout />
          </span>
        </div>
      </nav>

      <div id="home">
        <Userprofile />
        <Container>
          <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '50vh' }}>
            <Grid item>
              <button className="btn btn-primary" onClick={toggleContractList}>
                Show offers
              </button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div id="contractlist">{showContractList && <ContractList />}</div>

      <div id="weather">
        <Weather />
      </div>

      <div id="selectcontracts">
        <SelectContracts />
      </div>
    </>
  );
}

export default Profile;
