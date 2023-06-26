import React, { useState } from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
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

  const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
      title: 'Features',
      description: [
        'Cool stuff',
        'Random feature',
        'Team feature',
        'Developer stuff',
        'Another one',
      ],
    },
    {
      title: 'Resources',
      description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
      title: 'Legal',
      description: ['Privacy policy', 'Terms of use'],
    },
  ];

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg" style={{ backgroundColor: "#f5f5f5" }}>
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
          <Grid container justifyContent="center" alignItems="center" style={{ Height: '10px' }}>
            <Grid item>
              <button className="btn btn-primary" onClick={toggleContractList}>
                Show offers
              </button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div id="contractlist">{showContractList && <ContractList />}</div>

      <div id="weather" style={{marginLeft: '700px'}}>
        <Weather />
      </div>

      <div id="selectContracts">
        <SelectContracts />
      </div>

      <footer>
        <Container maxWidth="md" component="footer" sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}>
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link href="#" variant="subtitle1" color="text.secondary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
            Your copyright information here
          </Typography>
        </Container>
      </footer>
    </>
  );
}

export default Profile;
