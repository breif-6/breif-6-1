import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

const SelectContracts = () => {
  const [data, setData] = useState([]);
  const user_id = window.localStorage.getItem('id');

  useEffect(() => {
    fetch(`http://localhost/breif-6-1/api-mohammad/contracts/${user_id}`)
      .then(response => response.json())
      .then(data => {
        const filteredData = data.contracts.filter(contract => contract.status === 'open');
        setData(filteredData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user_id]);

  return (
    <Container style={{ textAlign: 'center' }}>
      <MainCard
        title="Contracts That Work Now"
        secondary={<SecondaryAction  />}
      >
        <Grid container spacing={gridSpacing} id="selectcontracts">
          {data.map(item => (
            <Grid item xs={6} sm={3} key={item.id}>
              <SubCard title="Fetched Data">
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    {/* <Typography variant="subtitle1" gutterBottom>
                      ID: {item.id}
                    </Typography> */}
                    {/* <Typography variant="subtitle1" gutterBottom>
                      Status: {item.status}
                    </Typography> */}
                    <Typography variant="subtitle1" gutterBottom>
                      Signing Date: {item.signing_date}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Expiration Date: {item.expiration_date}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Contract Name: {item.contract_name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      User Name: {item.user_name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Email: {item.email}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Employee Name: {item.employee_name}
                    </Typography>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          ))}
        </Grid>
      </MainCard>
    </Container>
  );
};

export default SelectContracts;
